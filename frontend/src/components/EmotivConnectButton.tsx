import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import "../assets/stylesheets/EmotivConnectButton.css";
import { isCortexServerRunning } from "../utils/CortexServerUtils";

// Define type for ref methods
export interface EmotivConnectRef {
    startCollection: () => Promise<boolean>;
    stopCollection: () => void;
}

interface EmotivConnectButtonProps {
    trackDuration?: number;
    onConnectStart?: () => void;
    onDataCollectionComplete?: (success: boolean) => void;
    onStatusUpdate?: (status: string) => void;
    disabled?: boolean;
}

const EmotivConnectButton = forwardRef<EmotivConnectRef, EmotivConnectButtonProps>(
    (
        {
            trackDuration,
            onConnectStart,
            onDataCollectionComplete,
            onStatusUpdate,
            disabled = false
        },
        ref
    ) => {
        const [isConnecting, setIsConnecting] = useState(false);
        const [isCollecting, setIsCollecting] = useState(false);
        const [countdown, setCountdown] = useState<number | null>(null);
        const [serverAvailable, setServerAvailable] = useState(false);
        const endTimeRef = useRef<number | null>(null);

        // Check server availability
        useEffect(() => {
            let mounted = true;

            const checkServer = async () => {
                const running = await isCortexServerRunning();
                if (mounted) {
                    setServerAvailable(running);
                }
            };

            checkServer();
            const interval = setInterval(checkServer, 5000);

            return () => {
                mounted = false;
                clearInterval(interval);
            };
        }, []);

        // New countdown updater using target endTime rather than decrementing a counter
        useEffect(() => {
            if (isCollecting && endTimeRef.current) {
                const interval = setInterval(() => {
                    const remaining = Math.ceil((endTimeRef.current! - Date.now()) / 1000);
                    setCountdown(remaining);
                    if (remaining <= 0) {
                        clearInterval(interval);
                        onStatusUpdate?.("Track finished, processing brain data...");
                        setIsCollecting(false);
                        setIsConnecting(false);
                        setCountdown(0);
                        onDataCollectionComplete?.(true);
                    }
                }, 250);
                return () => clearInterval(interval);
            }
        }, [isCollecting, onDataCollectionComplete, onStatusUpdate]);

        // Function to start data collection
        const startDataCollection = useCallback(async () => {
            if (isCollecting) {
                console.log("Already collecting data");
                return false;
            }

            setIsConnecting(true);
            onStatusUpdate?.("Initializing Emotiv connection...");
            onConnectStart?.();

            // Check server status first
            const serverRunning = await isCortexServerRunning();
            if (!serverRunning) {
                setIsConnecting(false);
                onStatusUpdate?.("Cortex server not running");
                return false;
            }

            // Use the trackDuration exactly without buffer limits
            const duration = trackDuration ? trackDuration : 30;
            endTimeRef.current = Date.now() + duration * 1000; // NEW: Save target end time
            setCountdown(duration);
            setIsCollecting(true);
            onStatusUpdate?.(`Starting brain data collection for ${duration} seconds`);

            console.log(`Starting Emotiv data collection for ${duration} seconds`);

            // Let's trigger a fetch to the health check endpoint
            try {
                await fetch("http://localhost:8687", {
                    method: "GET",
                    headers: { Accept: "application/json" }
                });
                return true;
            } catch (error) {
                console.error("Error connecting to Emotiv server:", error);
                onStatusUpdate?.("Error connecting to Emotiv server");
                return false;
            }
        }, [trackDuration, onConnectStart, onStatusUpdate, isCollecting]);

        // Stop data collection manually
        const stopDataCollection = useCallback(() => {
            if (!isCollecting) {
                return; // Nothing to stop
            }

            console.log("Stopping Emotiv data collection");
            onStatusUpdate?.("Stopping data collection...");
            setIsCollecting(false);
            setIsConnecting(false);
            setCountdown(null);

            // This will trigger processing of whatever data we've collected so far
            onDataCollectionComplete?.(false);
        }, [onDataCollectionComplete, onStatusUpdate, isCollecting]);

        // Expose methods to parent component
        useImperativeHandle(ref, () => ({
            startCollection: startDataCollection,
            stopCollection: stopDataCollection
        }));

        return (
            <div className="emotiv-connect-container">
                {!isCollecting ? (
                    <button
                        className={`emotiv-connect-button ${!serverAvailable ? "server-offline" : ""}`}
                        onClick={startDataCollection}
                        disabled={disabled || isConnecting || !serverAvailable}
                    >
                        {isConnecting
                            ? "Connecting..."
                            : serverAvailable
                              ? "Start Brain Analysis"
                              : "Cortex Server Offline"}
                    </button>
                ) : (
                    <div className="emotiv-collecting">
                        <div className="emotiv-collecting-status">
                            Collecting brain data
                            {countdown !== null && (
                                <span className="emotiv-countdown"> ({countdown}s)</span>
                            )}
                        </div>
                        <button className="emotiv-stop-button" onClick={stopDataCollection}>
                            Stop Collection
                        </button>
                    </div>
                )}
            </div>
        );
    }
);

export default EmotivConnectButton;
