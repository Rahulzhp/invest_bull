export interface Stock {
    symbol: string;
    ltp: number;
    stockMomentumRank: number;
    stockOutperformanceRank: number;
    open: number;
    low: number;
    high: number;
    openHighLowSignal: string;
    intradayScans: any[];
    change: number;
}
