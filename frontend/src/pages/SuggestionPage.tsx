import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "../assets/stylesheets/SuggestionPage.css";
import EmotivConnectButton, { EmotivConnectRef } from "../components/EmotivConnectButton";
import SpotifyPlayer from "../components/SpotifyPlayer";
import StartCortexButton from "../components/StartCortexButton";
import SuggestionHeaderBar from "../components/SuggestionHeaderBar";
import { loadSongData } from "../recsystem/csvLoader";
import type { MetricData, SongProperties } from "../recsystem/met";
import { SongRecommendationModel } from "../recsystem/modellogic";
import { idealRanges } from "../recsystem/sampledata";
import SpotifyService from "../services/SpotifyService";
import { isCortexServerRunning } from "../utils/CortexServerUtils";

function SuggestionPage() {
    // ===== State Organization =====
    // Song and recommendation state
    const [currentSong, setCurrentSong] = useState<SongProperties | null>(null);
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [songs, setSongs] = useState<SongProperties[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<SongProperties[]>([]);
    const [recommendedSongIds, setRecommendedSongIds] = useState<string[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [updateCounter, setUpdateCounter] = useState(0);

    // Filter and UI state
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [moodDropdownOpen, setMoodDropdownOpen] = useState(false);
    const [spotifyError, setSpotifyError] = useState<string | null>(null);

    // Brain metrics state
    const [emaMetrics, setEmaMetrics] = useState<number[]>([0.5, 0.5, 0.5, 0.5, 0.5, 0.4]);
    const [idealSongProps, setIdealSongProps] = useState<number[]>([0.5, 0.5, 0.5, 120, -10]);
    const [metricsData, setMetricsData] = useState<MetricData[][]>([]);
    const [lastProcessedMetrics, setLastProcessedMetrics] = useState<number[]>([]);

    // Connection state
    const [connectionStatus, setConnectionStatus] = useState("Not connected");
    const [serverAvailable, setServerAvailable] = useState(false);
    const [isCollectingData, setIsCollectingData] = useState(false);

    // ===== Refs =====
    const modelRef = useRef<SongRecommendationModel | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const emotivConnectRef = useRef<EmotivConnectRef>(null);
    const cortexTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // ===== Memoized Values =====
    const moodOptions = useMemo(
        () => [
            { value: "", label: "-- MOOD --" },
            { value: "0.00-0.15", label: "Deeply Melancholic" },
            { value: "0.16-0.30", label: "Sad & Somber" },
            { value: "0.31-0.45", label: "Melancholic & Emotional" },
            { value: "0.46-0.60", label: "Neutral & Chill" },
            { value: "0.61-0.75", label: "Uplifting & Warm" },
            { value: "0.76-0.90", label: "Cheerful & Energetic" },
            { value: "0.91-1.00", label: "Euphoric & Exuberant" }
        ],
        []
    );

    // ===== Initialization =====
    // Initialize recommendation model
    useEffect(() => {
        modelRef.current = new SongRecommendationModel({
            engage: idealRanges.engagement,
            excited: idealRanges.excitement,
            relax: idealRanges.relaxation,
            focus: idealRanges.focus,
            interest: idealRanges.interest,
            stress: idealRanges.stress
        });

        return () => {
            if (socketRef.current) socketRef.current.close();
            if (cortexTimeoutRef.current) clearTimeout(cortexTimeoutRef.current);
        };
    }, []);

    // Load song data
    useEffect(() => {
        loadSongData()
            .then((result) => {
                setSongs(result);
                if (result.length > 0) {
                    setCurrentSong(result[0]);
                    setCurrentSongIndex(0);
                    setFilteredSongs(result);
                }
            })
            .catch((error) => {
                console.error("Failed to load song data:", error);
                setSongs([]);
            });
    }, []);

    // Initialize Spotify
    useEffect(() => {
        const tokenData = localStorage.getItem("spotify_token");
        if (tokenData) {
            try {
                const data = JSON.parse(tokenData);
                if (data.expiry > Date.now()) {
                    SpotifyService.onPlayerStateChange((state) => {
                        setIsPlaying(state && !state.paused);
                    });
                }
            } catch (error) {
                console.error("Error parsing stored token:", error);
            }
        }
    }, []);

    // Create audio element
    useEffect(() => {
        if (!document.getElementById("spotify-audio-player")) {
            const audioElement = document.createElement("audio");
            audioElement.id = "spotify-audio-player";
            audioElement.style.display = "none";
            audioElement.setAttribute("playsinline", "true");
            audioElement.setAttribute("webkit-playsinline", "true");
            audioElement.preload = "auto";
            audioElement.src =
                "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            document.body.appendChild(audioElement);
            audioRef.current = audioElement;
        }
    }, []);

    // Check server availability
    useEffect(() => {
        let mounted = true;

        const checkServer = async () => {
            const running = await isCortexServerRunning();
            if (mounted) setServerAvailable(running);
        };

        checkServer();
        const interval = setInterval(checkServer, 5000);

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    // ===== Helper Functions =====
    // Metrics deduplication
    const deduplicateMetrics = useCallback((metrics: MetricData[][]): MetricData[][] => {
        if (!metrics || metrics.length === 0) return [];

        const uniqueMetrics: MetricData[][] = [];
        let lastMetricStr = "";

        for (const metric of metrics) {
            const metricStr = JSON.stringify(metric);

            if (metricStr !== lastMetricStr) {
                uniqueMetrics.push(metric);
                lastMetricStr = metricStr;
            }
        }

        return uniqueMetrics;
    }, []);

    // Filter current song from recommendations
    const filterCurrentSongFromRecommendations = useCallback(
        (songIds: string[]): string[] => {
            if (songIds.length === 0 || !currentSong) return songIds;

            if (songIds[0] === currentSong.id) {
                // Create a new array without the current song
                const filteredIds = songIds.filter((id) => id !== currentSong.id);

                // Add the current song to the very end of the recommendation list
                filteredIds.push(currentSong.id);
                return filteredIds;
            }

            return songIds;
        },
        [currentSong]
    );

    // Apply filters to songs
    const applyFilters = useCallback(
        (sourceList: SongProperties[]) => {
            let filtered = [...sourceList];

            if (selectedMood) {
                const [minValence, maxValence] = selectedMood.split("-").map(Number);
                filtered = filtered.filter(
                    (song) => song.valence >= minValence && song.valence <= maxValence
                );
            }

            if (searchQuery.trim()) {
                const fuseOptions = { keys: ["title", "artists"], threshold: 0.3 };
                const fuse = new Fuse(filtered, fuseOptions);
                filtered = fuse.search(searchQuery).map((result) => result.item);
            }

            return filtered;
        },
        [selectedMood, searchQuery]
    );

    // Sort songs by recommendation
    const sortByRecommendation = useCallback(
        (filteredList: SongProperties[]) => {
            if (recommendedSongIds.length === 0) return filteredList;

            const songMap = new Map(filteredList.map((song) => [song.id, song]));
            const recommendedSongs: SongProperties[] = [];

            for (const id of recommendedSongIds) {
                const song = songMap.get(id);
                if (song) recommendedSongs.push(song);
            }

            const otherSongs = filteredList.filter((song) => !recommendedSongIds.includes(song.id));

            return [...recommendedSongs, ...otherSongs];
        },
        [recommendedSongIds]
    );

    // Get color for difficulty values
    const getDifficultyColor = useCallback((difficulty: number) => {
        const hue = Math.max(0, 120 - difficulty * 12);
        return `hsl(${hue}, 70%, 50%)`;
    }, []);

    // ===== Model Processing =====
    // Recalculate when EMA metrics change
    useEffect(() => {
        const isDefault = emaMetrics.every((val, idx) => (idx < 5 ? val === 0.5 : val === 0.4));

        if (
            !isDefault &&
            metricsData.length > 0 &&
            !emaMetrics.every((val, idx) => val === lastProcessedMetrics[idx])
        ) {
            refreshModelCalculations();
            setLastProcessedMetrics([...emaMetrics]);
        }
    }, [emaMetrics]);

    // Update filtered songs
    useEffect(() => {
        if (songs.length === 0) return;

        const filtered = applyFilters(songs);
        const sortedFiltered = sortByRecommendation(filtered);

        setFilteredSongs(sortedFiltered);
    }, [songs, searchQuery, selectedMood, recommendedSongIds, applyFilters, sortByRecommendation]);

    // Refresh model calculations
    const refreshModelCalculations = useCallback(() => {
        if (!modelRef.current || songs.length === 0) {
            console.error("Cannot refresh calculations - model or songs not available");
            return;
        }

        setConnectionStatus("Refreshing song recommendations...");

        try {
            // Calculate target mental state
            const target = modelRef.current.calculateTargetMentalState();

            // Calculate weight matrix
            const deltaT = target.map((t, i) => t - emaMetrics[i]);
            const weightMatrix = modelRef.current.computeWeightMatrix(deltaT, songs[0]);

            // Calculate ideal song properties
            const idealProps = modelRef.current.computeIdealSongProps(
                weightMatrix,
                deltaT,
                emaMetrics
            );
            setIdealSongProps(idealProps);

            // Find best matching songs
            const { sortedSongIds } = modelRef.current.findBestMatchingSong(idealProps, songs);

            // Filter out current song from top recommendation
            const filteredSongIds = filterCurrentSongFromRecommendations(sortedSongIds);
            setRecommendedSongIds(filteredSongIds);

            setConnectionStatus(`Recommendations updated based on your mental state`);
            setUpdateCounter((prev) => prev + 1);
        } catch (error) {
            console.error("Error refreshing model calculations:", error);
            setConnectionStatus("Error updating recommendations");
        }
    }, [emaMetrics, songs, filterCurrentSongFromRecommendations]);

    // Process metrics data
    const processMetrics = useCallback(
        async (metrics: MetricData[][]): Promise<void> => {
            if (!modelRef.current || songs.length === 0) {
                setConnectionStatus("Error: Model or songs not available");
                throw new Error("Model or songs not loaded");
            }

            // Check if we have actual metrics to process
            if (!metrics || metrics.length === 0) {
                setConnectionStatus("Error: No metrics data to process");
                throw new Error("No metrics data to process");
            }

            setConnectionStatus(`Processing ${metrics.length} data points`);
            console.log(
                `Processing ${metrics.length} actual data points for song: ${currentSong?.title}`
            );

            try {
                // Step 1: Calculate EWMA using the actual metrics data
                const ema = modelRef.current.calculateEWMA(metrics);
                console.log("Calculated EMA from metrics:", ema);
                setEmaMetrics(ema);
                setLastProcessedMetrics(ema);

                // Calculate target state
                const target = modelRef.current.calculateTargetMentalState();
                console.log("Target mental state:", target);

                // Use the actual EMA for all calculations
                const deltaT = target.map((t, i) => t - ema[i]);
                console.log("Delta T (using actual metrics):", deltaT);

                // Get weight matrix and ideal properties
                // Use the first song as base for calculations, but we'll keep this dynamic
                const weightMatrix = modelRef.current.computeWeightMatrix(
                    deltaT,
                    currentSong || songs[0]
                );
                const idealProps = modelRef.current.computeIdealSongProps(
                    weightMatrix,
                    deltaT,
                    ema
                );
                console.log("NEW Ideal song properties for current song:", idealProps);
                setIdealSongProps(idealProps);

                // Find matching songs
                const { sortedSongIds } = modelRef.current.findBestMatchingSong(idealProps, songs);
                const filteredSongIds = filterCurrentSongFromRecommendations(sortedSongIds);
                setRecommendedSongIds(filteredSongIds);

                // Force UI update
                setUpdateCounter((prev) => prev + 1);
                setConnectionStatus(
                    `Analysis complete - ${filteredSongIds.length} songs recommended for your mental state`
                );

                return Promise.resolve();
            } catch (error) {
                console.error("Error in model logic workflow:", error);
                setConnectionStatus(`Error processing brain data: ${error}`);
                return Promise.reject(error);
            }
        },
        [songs, currentSong, filterCurrentSongFromRecommendations]
    );

    // ===== Data Collection =====
    // Start Cortex data collection
    const startCortexDataCollection = useCallback(async () => {
        setMetricsData([]);
        setConnectionStatus("Connecting to Cortex server...");

        // Check if server is running
        if (!(await isCortexServerRunning())) {
            setConnectionStatus("Cortex server not running - please start the server");
            return;
        }

        // If already collecting, don't start again
        if (socketRef.current?.readyState === WebSocket.OPEN && isCollectingData) {
            return;
        }

        // If connected but not collecting, start collection
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(
                JSON.stringify({
                    op: "start",
                    duration: currentSong?.duration
                })
            );
            setIsCollectingData(true);
            setConnectionStatus("Collecting data");
            return;
        }

        // Create new WebSocket connection
        try {
            const ws = new WebSocket("ws://localhost:8686");
            socketRef.current = ws;

            // Set connection timeout
            const connectionTimeout = setTimeout(() => {
                if (ws.readyState !== WebSocket.OPEN) {
                    setConnectionStatus("Connection timeout - please try again");
                }
            }, 500000);

            ws.onopen = () => {
                clearTimeout(connectionTimeout);
                const message = { op: "start", duration: currentSong?.duration };
                ws.send(JSON.stringify(message));
                setIsCollectingData(true);
                setConnectionStatus("Connected to server - collecting data");
            };

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);

                    if (message.op === "status") {
                        setConnectionStatus(message.message);
                    } else if (message.op === "data" && Array.isArray(message.metrics)) {
                        // Only add unique metrics
                        setMetricsData((prev) => {
                            const lastMetric = prev.length > 0 ? prev[prev.length - 1] : null;
                            if (lastMetric) {
                                const currentMetricStr = JSON.stringify(message.metrics);
                                const lastMetricStr = JSON.stringify(lastMetric);

                                if (currentMetricStr === lastMetricStr) {
                                    return prev;
                                }
                            }
                            return [...prev, message.metrics];
                        });
                    } else if (message.op === "end" && message.allData) {
                        console.log(`Received end message with ${message.allData.length} metrics`);
                        // Deduplicate metrics
                        const uniqueMetrics = deduplicateMetrics(message.allData);
                        setConnectionStatus(
                            `Processing ${uniqueMetrics.length} unique data points`
                        );

                        // Always process the metrics that came from the server
                        // This ensures we use the actual Emotiv data
                        processMetrics(uniqueMetrics)
                            .then(() => {
                                setConnectionStatus("Analysis complete using actual metrics");
                                setIsCollectingData(false);
                            })
                            .catch(() => {
                                setConnectionStatus("Error in analysis");
                            });
                    } else if (message.op === "error") {
                        setConnectionStatus(`Server error: ${message.error}`);
                    }
                } catch (error) {
                    // Silent catch to avoid console spam
                }
            };

            ws.onerror = () => {
                clearTimeout(connectionTimeout);
                setIsCollectingData(false);
                setConnectionStatus("Connection error - please restart the server and try again");
            };

            ws.onclose = () => {
                setIsCollectingData(false);
                setConnectionStatus("Disconnected");

                if (metricsData.length > 0 && !recommendedSongIds.length) {
                    processMetrics(metricsData);
                }
            };
        } catch (error) {
            setConnectionStatus("Failed to create connection - please restart the server");
        }
    }, [
        isCollectingData,
        metricsData,
        currentSong,
        recommendedSongIds.length,
        processMetrics,
        deduplicateMetrics
    ]);

    // Stop data collection
    const stopCortexDataCollection = useCallback(() => {
        console.log("Stopping Cortex data collection...");

        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            console.log("No active WebSocket connection");
            // Process any collected data even without active connection
            if (metricsData.length > 0) {
                console.log(`Processing ${metricsData.length} metrics from local storage`);
                processMetrics(metricsData)
                    .then(() => {
                        console.log("Successfully processed metrics from local store");
                        setIsCollectingData(false);
                    })
                    .catch((err) => {
                        console.error("Failed to process metrics:", err);
                        setConnectionStatus(`Failed to process metrics: ${err}`);
                        setIsCollectingData(false);
                    });
            } else {
                console.warn("No metrics data available to process");
                setConnectionStatus("No metrics collected - ensure headset is properly connected");
                setIsCollectingData(false);
            }
            return;
        }

        setConnectionStatus("Stopping data collection");
        socketRef.current.send(JSON.stringify({ op: "stop" }));

        // Ensure metrics are processed even if server doesn't respond
        if (metricsData.length > 0) {
            setTimeout(() => {
                if (isCollectingData) {
                    console.log("Forcing metrics processing after stop request");
                    setIsCollectingData(false);
                    processMetrics(metricsData).catch((err) => {
                        console.error("Error processing metrics after force stop:", err);
                        setConnectionStatus(`Error processing metrics: ${err}`);
                    });
                }
            }, 3000);
        } else {
            setConnectionStatus("No metrics collected - ensure headset is properly connected");
            setIsCollectingData(false);
        }
    }, [metricsData, isCollectingData, processMetrics]);

    // ===== Event Handlers =====
    // Playback handlers
    const handlePlaybackStart = useCallback(() => {
        setIsPlaying(true);

        // Clear previous metrics when starting a new song
        setMetricsData([]);
        setLastProcessedMetrics([]);
        setConnectionStatus("Starting new metrics collection...");

        startCortexDataCollection();

        // Start Emotiv data collection
        if (emotivConnectRef.current && serverAvailable) {
            emotivConnectRef.current.startCollection().then((success) => {
                if (success) console.log("Emotiv data collection started automatically");
            });
        }

        // Set timeout to stop data collection based on song duration
        if (currentSong?.duration) {
            if (cortexTimeoutRef.current) clearTimeout(cortexTimeoutRef.current);

            const durationMs = Math.min(currentSong.duration * 1000, 600000);
            setConnectionStatus(`Will collect for ${Math.round(durationMs / 1000)}s`);

            cortexTimeoutRef.current = setTimeout(() => {
                console.log("Song duration reached, stopping collection and processing metrics");
                stopCortexDataCollection();
                if (emotivConnectRef.current) {
                    emotivConnectRef.current.stopCollection();
                }
            }, durationMs);
        }
    }, [currentSong, startCortexDataCollection, stopCortexDataCollection, serverAvailable]);

    const handlePlaybackChange = useCallback(
        (isPlaying: boolean) => {
            if (isPlaying) {
                handlePlaybackStart();
            } else {
                setIsPlaying(false);
            }
        },
        [handlePlaybackStart]
    );

    const handlePlaybackError = useCallback(
        (message: string) => {
            setSpotifyError(message);
            setIsPlaying(false);
            stopCortexDataCollection();

            setTimeout(() => setSpotifyError(null), 5000);
        },
        [stopCortexDataCollection]
    );

    // Song selection handler
    const handleSongItemClick = useCallback(
        (index: number) => {
            if (isPlaying) {
                if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.src = "";
                }
                setIsPlaying(false);
            }

            // Stop any active brain data collection
            if (emotivConnectRef.current) {
                emotivConnectRef.current.stopCollection();
            }

            // Stop data collection if active
            if (isCollectingData) {
                stopCortexDataCollection();
            }

            // Clear metrics data when changing songs
            setMetricsData([]);
            setLastProcessedMetrics([]);

            setCurrentSongIndex(index);
            setCurrentSong(filteredSongs[index]);
        },
        [isPlaying, filteredSongs, isCollectingData, stopCortexDataCollection]
    );

    // UI handlers
    const handleMoodSelect = useCallback((value: string, _label: string) => {
        setSelectedMood(value);
        setMoodDropdownOpen(false);
    }, []);

    // Emotiv handlers
    const handleEmotivConnectStart = useCallback(() => {
        setConnectionStatus("Starting Emotiv data collection...");
        setMetricsData([]);
        startCortexDataCollection();
    }, [startCortexDataCollection]);

    const handleEmotivDataComplete = useCallback(
        (success: boolean) => {
            if (success) {
                setConnectionStatus("Emotiv data collection complete, processing results...");

                if (metricsData.length > 0) {
                    console.log(
                        `Processing ${metricsData.length} metrics after Emotiv collection completed`
                    );
                    processMetrics(metricsData)
                        .then(() => {
                            setConnectionStatus(
                                "Brain analysis complete - song recommendations updated"
                            );
                        })
                        .catch((error) => {
                            console.error("Error in metric processing:", error);
                            setConnectionStatus("Error in analysis - please try again");
                        });
                } else {
                    setConnectionStatus(
                        "No metrics collected - please ensure headset is connected"
                    );
                }
            } else {
                setConnectionStatus("Emotiv data collection stopped manually");
                if (metricsData.length > 0) {
                    processMetrics(metricsData);
                }
            }
        },
        [metricsData, processMetrics]
    );

    const handleCortexServerStarted = useCallback(() => {
        if (isPlaying) startCortexDataCollection();
    }, [isPlaying, startCortexDataCollection]);

    // ===== Component Rendering =====
    return (
        <>
            <SuggestionHeaderBar />

            <div className="songpage">
                <div className="content-layer">
                    <div className="background-image">
                        <img src={currentSong?.imgUrl || ""} alt="Background" />
                    </div>

                    {/* Left Column */}
                    <div className="left-column">
                        {/* Track Card */}
                        <div className="track-card">
                            <div className="track-card-background">
                                <img src={currentSong?.imgUrl || ""} alt="Song" />
                                <div className="overlay-top"></div>
                                <div className="overlay-bottom"></div>
                            </div>
                            <div className="track-card-content">
                                <div className="track-info">
                                    <h1>{currentSong?.title}</h1>
                                    <p>{currentSong?.artists}</p>
                                    <p>ID: {currentSong?.id}</p>
                                </div>
                                <div className="performance-info">
                                    <div className="performance-column">
                                        <p className="tier-label">Match</p>
                                        <p className="grade-card">
                                            {recommendedSongIds.includes(currentSong?.id || "")
                                                ? "A"
                                                : "C"}
                                        </p>
                                    </div>
                                    <div className="performance-column">
                                        <p>Danceability: {currentSong?.danceability.toFixed(2)}</p>
                                        <p>Energy: {currentSong?.energy.toFixed(2)}</p>
                                        <p>Valence: {currentSong?.valence.toFixed(2)}</p>
                                    </div>
                                    <div className="performance-column">
                                        <p>Tempo: {currentSong?.tempo.toFixed(0)}</p>
                                        <p>Loudness: {currentSong?.loudness.toFixed(2)}</p>
                                        <p>Duration: {Math.floor(currentSong?.duration || 0)}s</p>
                                    </div>
                                </div>

                                {currentSong?.trackUrl && (
                                    <SpotifyPlayer
                                        trackUrl={currentSong.trackUrl}
                                        onPlaybackChange={handlePlaybackChange}
                                        onError={handlePlaybackError}
                                        duration={currentSong.duration}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Score Panel */}
                        <div className="score-panel" key={updateCounter}>
                            <h2 className="score-panel-header">Current Mental State</h2>

                            <div className="stats-grid">
                                {[
                                    "FOCUS",
                                    "ENGAGEMENT",
                                    "EXCITEMENT",
                                    "INTEREST",
                                    "RELAXATION",
                                    "STRESS"
                                ].map((label, i) => (
                                    <div key={label}>
                                        <span>{label}</span>
                                        <strong>{(emaMetrics[i] * 100).toFixed(2)}%</strong>
                                    </div>
                                ))}
                            </div>

                            <div className="grade-grid" key={`grade-${updateCounter}`}>
                                <div className="critical-perfect">
                                    <span>IDEAL DANCE</span>
                                    <strong>{idealSongProps[0].toFixed(2)}</strong>
                                </div>
                                <div className="perfect">
                                    <span>IDEAL ENERGY</span>
                                    <strong>{idealSongProps[1].toFixed(2)}</strong>
                                </div>
                                <div className="good">
                                    <span>IDEAL VALENCE</span>
                                    <strong>{idealSongProps[2].toFixed(2)}</strong>
                                </div>
                                <div className="bad">
                                    <span>IDEAL TEMPO</span>
                                    <strong>{idealSongProps[3].toFixed(1)}</strong>
                                </div>
                                <div className="miss">
                                    <span>IDEAL LOUD</span>
                                    <strong>{idealSongProps[4].toFixed(1)}</strong>
                                </div>
                            </div>

                            <div className="played-date">
                                {isCollectingData
                                    ? `${connectionStatus}: ${metricsData.length} points collected...`
                                    : recommendedSongIds.length > 0
                                      ? `${recommendedSongIds.length} songs recommended based on your mental state`
                                      : "Use Emotiv Connect to start mental state analysis"}
                            </div>

                            <StartCortexButton onServerStarted={handleCortexServerStarted} />

                            <EmotivConnectButton
                                ref={emotivConnectRef}
                                trackDuration={currentSong?.duration}
                                onConnectStart={handleEmotivConnectStart}
                                onDataCollectionComplete={handleEmotivDataComplete}
                                disabled={!serverAvailable}
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="suggestion-container" key={updateCounter}>
                        {/* Search & Filter */}
                        <div className="search-filter-container">
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="-- SEARCH ME --"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <i className="search-icon">🔍</i>
                            </div>
                            <div className="filter-selects">
                                <div className="dropdown-container" style={{ width: "100%" }}>
                                    <button
                                        className="dropdown-button mood-dropdown-button"
                                        onClick={() => setMoodDropdownOpen(!moodDropdownOpen)}
                                    >
                                        {selectedMood
                                            ? moodOptions.find((o) => o.value === selectedMood)
                                                  ?.label || "-- MOOD --"
                                            : "-- MOOD --"}
                                        <span className="dropdown-arrow">▼</span>
                                    </button>
                                    {moodDropdownOpen && (
                                        <div className="dropdown-menu mood-dropdown">
                                            {moodOptions.map((option) => (
                                                <div
                                                    key={option.value}
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        handleMoodSelect(option.value, option.label)
                                                    }
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Track List */}
                        <div className="track-list-container">
                            <div className="track-list-header">
                                <h2>NEXT TRACK</h2>
                                <div className="track-header-details">
                                    <span className="header-genre">Danceability</span>
                                    <span className="header-melody">Energy</span>
                                    <span className="header-difficulty">Valence</span>
                                    <span className="header-metric">Tempo</span>
                                </div>
                            </div>

                            <div className="track-list">
                                {filteredSongs.length > 0 ? (
                                    filteredSongs.map((song, index) => (
                                        <div
                                            key={song.id}
                                            className={`track-list-item ${
                                                currentSongIndex === index ? "active" : ""
                                            } ${recommendedSongIds.includes(song.id) ? "recommended" : ""}`}
                                            onClick={() => handleSongItemClick(index)}
                                        >
                                            <div className="track-thumbnail">
                                                <img src={song.imgUrl} alt={song.title} />
                                                {recommendedSongIds.includes(song.id) && (
                                                    <div className="recommendation-badge">🧠</div>
                                                )}
                                            </div>
                                            <div className="track-info">
                                                <div className="track-title">
                                                    {song.title || `Song ${index + 1}`}
                                                </div>
                                                <div className="track-artist">
                                                    {song.artists || "Artist name"}
                                                </div>
                                            </div>
                                            <div className="track-details">
                                                <div className="track-genre">
                                                    {song.danceability.toFixed(2)}
                                                </div>
                                                <div className="track-melody">
                                                    {song.energy.toFixed(2)}
                                                </div>
                                                <div
                                                    className="track-difficulty"
                                                    style={{
                                                        color: getDifficultyColor(song.valence * 10)
                                                    }}
                                                >
                                                    {song.valence.toFixed(2)}
                                                </div>
                                                <div className="track-metric">
                                                    {song.tempo.toFixed(0)}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-songs">
                                        No songs found matching your criteria
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error & Connection UI */}
            {spotifyError && (
                <div className="spotify-error-message">
                    <p>{spotifyError}</p>
                    <div className="spotify-error-actions">
                        <button onClick={() => setSpotifyError(null)}>Dismiss</button>
                        {!SpotifyService.isAuthenticated() && (
                            <button
                                className="spotify-retry-button"
                                onClick={() => SpotifyService.authenticate()}
                            >
                                Connect to Spotify
                            </button>
                        )}
                    </div>
                </div>
            )}

            {!SpotifyService.isAuthenticated() && (
                <div className="spotify-connect-button">
                    <p>Listen to complete songs with your Spotify Premium account</p>
                    <button onClick={() => SpotifyService.authenticate()}>
                        Connect to Spotify
                    </button>
                    <p className="note">Don't have Premium? App will use audio previews</p>
                </div>
            )}
        </>
    );
}

export default SuggestionPage;
