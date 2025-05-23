export interface MetricData {
    isActive: boolean;
    value: number;
}

export interface SongProperties {
    title: string;
    id: string;
    trackUrl: string;
    imgUrl: string;
    artists: string;
    danceability: number;
    energy: number;
    valence: number;
    tempo: number;
    loudness: number;
    duration: number;
}

export interface IdealRange {
    low: number;
    upper: number;
}

export interface IdealRanges {
    focus: IdealRange;
    engage: IdealRange;
    excited: IdealRange;
    interest: IdealRange;
    relax: IdealRange;
    stress: IdealRange;
}
