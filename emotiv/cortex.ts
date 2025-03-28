import WebSocket from "ws";

/**
 * The one-thing-fits-all for Cortex API.
 */
class Cortex {
    private socket: WebSocket;
    private user: CortexUser;
    private metricCallback?: (metData: any) => void;
    private messageHandler?: (data: WebSocket.Data) => void;
    private lastMetricTimestamp: number = 0;
    private lastMetricData: any = null;

    constructor(user: CortexUser, socketUrl: string = "wss://localhost:6868") {
        this.socket = new WebSocket(socketUrl, { rejectUnauthorized: false });
        this.user = user;
    }

    /**
     * Ensure that the WS service is available for concurrent requests.
     *
     * @returns
     */
    async epoch(): Promise<void> {
        const epochRequest = {
            id: 1,
            jsonrpc: "2.0",
            method: "getCortexInfo"
        };

        this.socket.once("open", () => {
            this.socket.send(JSON.stringify(epochRequest));
        });

        return new Promise((resolve, _reject) => {
            this.socket.once("message", () => {
                resolve();
            });
        });
    }

    /**
     * Send the OIDC request access.
     */
    async requestAccess(): Promise<void> {
        const requestAccessRequest = {
            id: 1,
            jsonrpc: "2.0",
            method: "requestAccess",
            params: {
                clientId: this.user.client_id,
                clientSecret: this.user.client_secret
            }
        };

        this.socket.send(JSON.stringify(requestAccessRequest));

        return new Promise((resolve, _reject) => {
            resolve();
        });
    }

    /**
     * Authorize the client.
     */
    async authorize(): Promise<string> {
        const authorizeRequest = {
            id: 1,
            jsonrpc: "2.0",
            method: "authorize",
            params: {
                clientId: this.user.client_id,
                clientSecret: this.user.client_secret,
                debit: 99
            }
        };

        this.socket.send(JSON.stringify(authorizeRequest));

        return new Promise((resolve, _reject) => {
            this.socket.on("message", (data) => {
                const res: AuthorizationResponse = JSON.parse(data.toString());
                if (res.result?.cortexToken !== undefined) resolve(res.result.cortexToken);
            });
        });
    }

    /**
     * Get FIRST connected headset ID.
     * @returns
     */
    async queryFirstHeadsetID(): Promise<string> {
        const queryHeadsetRequest = {
            id: 1,
            jsonrpc: "2.0",
            method: "queryHeadsets"
        };

        this.socket.send(JSON.stringify(queryHeadsetRequest));

        return new Promise((resolve, _reject) => {
            this.socket.on("message", (data) => {
                const res: HeadsetDigestionResponse = JSON.parse(data.toString());
                if (
                    res.result?.length !== undefined &&
                    res.result.length > 0 &&
                    res.result[0]?.id !== undefined
                )
                    resolve(res.result[0].id);
            });
        });
    }

    /**
     * In case not everything goes like the simulation.
     *
     * @param headsetId
     * @returns
     */
    async initiateConnectionToHeadset(headsetId: string): Promise<void> {
        const controlDeviceRequest = {
            id: 1,
            jsonrpc: "2.0",
            method: "controlDevice",
            params: {
                command: "connect",
                headset: headsetId
            }
        };

        this.socket.send(JSON.stringify(controlDeviceRequest));

        return new Promise((resolve, _reject) => {
            resolve();
        });
    }

    /**
     * Create a session.
     *
     * @param authToken
     * @param headsetId
     * @returns Session ID.
     */
    async createSession(authToken: string, headsetId: string): Promise<string> {
        const createSessionRequest = {
            id: 1,
            jsonrpc: "2.0",
            method: "createSession",
            params: {
                cortexToken: authToken,
                headset: headsetId,
                status: "active"
            }
        };

        this.socket.send(JSON.stringify(createSessionRequest));

        return new Promise((resolve, _reject) => {
            this.socket.on("message", (data) => {
                const parsedData: SessionCreationResponse = JSON.parse(data.toString());
                if (parsedData.result?.id !== undefined) resolve(parsedData.result.id);
            });
        });
    }

    /**
     * Subscribe to data stream.
     */
    subscribe(token: string, sessionId: string, callback?: (metData: any) => void): void {
        const subRequest = {
            id: 1,
            jsonrpc: "2.0",
            method: "subscribe",
            params: {
                cortexToken: token,
                session: sessionId,
                streams: ["met"]
            }
        };

        // Store the callback if provided
        this.metricCallback = callback;

        // Remove previous message handler if it exists
        if (this.messageHandler) {
            this.socket.removeListener("message", this.messageHandler);
        }

        // Create a new message handler
        this.messageHandler = (data) => {
            try {
                const parsedData = JSON.parse(data.toString());
                if (parsedData["met"]) {
                    // Check if this is a duplicate message
                    const isDuplicate = this.isDuplicateMetric(parsedData["met"]);

                    if (!isDuplicate && this.metricCallback) {
                        // Only process unique metric data
                        this.metricCallback(parsedData["met"]);
                    }
                }
            } catch (error) {
                console.error("Error processing Emotiv data:", error);
            }
        };

        // Add the new message handler
        this.socket.on("message", this.messageHandler);

        // Send the subscription request
        this.socket.send(JSON.stringify(subRequest));
    }

    /**
     * Check if a metric data point is a duplicate of the previous one
     */
    private isDuplicateMetric(metricData: any): boolean {
        if (!metricData || !Array.isArray(metricData)) return false;

        // Convert metric data to string for comparison
        const dataString = JSON.stringify(metricData);

        // If this is the same as the last data point, it's a duplicate
        const isDuplicate = dataString === JSON.stringify(this.lastMetricData);

        // Update last metric data for next comparison
        this.lastMetricData = metricData;

        // Current timestamp for rate limiting
        const now = Date.now();

        // Also consider minimum time between valid data points (100ms)
        // Emotiv headsets typically provide data at 8Hz or slower
        const isTooSoon = now - this.lastMetricTimestamp < 100;

        if (!isDuplicate) {
            // Update timestamp for non-duplicate data
            this.lastMetricTimestamp = now;
        }

        return isDuplicate || isTooSoon;
    }

    /**
     * Unsubscribe from data stream.
     */
    unsubscribe(token: string, sessionId: string): void {
        const unsubRequest = {
            id: 1,
            jsonrpc: "2.0",
            method: "unsubscribe",
            params: {
                cortexToken: token,
                session: sessionId,
                streams: ["met"]
            }
        };

        this.socket.send(JSON.stringify(unsubRequest));

        // Remove the message handler
        if (this.messageHandler) {
            this.socket.removeListener("message", this.messageHandler);
            this.messageHandler = undefined;
        }

        // Remove the callback reference
        this.metricCallback = undefined;
    }
}

export default Cortex;
