import { AxiosRequestConfig } from "axios";
declare type ErrorBasic = {
    name: string;
    message: string;
};
declare type ErrorFull = ErrorBasic & {
    stack: string;
    cause: string;
};
export declare type Config = {
    apiKey?: string;
    network?: string;
    returnRejectedPromiseOnError?: Boolean;
    verbose?: boolean;
    api: Partial<AxiosRequestConfig>;
};
export declare type AdapterRequestMeta = {
    availableFunds?: number;
    eligibleToSubmit?: boolean;
    latestAnswer?: number;
    oracleCount?: number;
    paymentAmount?: number;
    reportableRoundID?: number;
    startedAt?: number;
    timeout?: number;
};
export declare type AdapterRequest = {
    id: string;
    data: Record<string, unknown>;
    meta?: AdapterRequestMeta;
};
export declare type AdapterResponse = {
    jobRunID: string;
    statusCode: number;
    data: any;
    result: any;
};
export declare type AdapterErrorResponse = {
    jobRunID: string;
    status: string;
    statusCode: number;
    error: ErrorBasic | ErrorFull;
};
export declare type Execute = (input: AdapterRequest) => Promise<AdapterResponse>;
export declare type ExecuteWithConfig<C extends Config> = (input: AdapterRequest, config: C) => Promise<AdapterResponse>;
export declare type ExecuteFactory<C extends Config> = (config?: C) => Execute;
export declare type ExecuteWithJobId = (input: AdapterRequest, jobRunID: string) => Promise<AdapterResponse>;
export declare type ExecuteWithConfigAndJobId<C extends Config> = (input: AdapterRequest, config: C, jobRunID: string) => Promise<AdapterResponse>;
export declare type DockConfig = {
    NODE_ENDPOINT: string;
    ORACLE_SK: string;
    ORACLE_ADDRESS: string;
    PROXY_ADDRESS: string;
    PROXY_ABI: Array<Record<string, any>>;
    AGGREGATOR_ABI: Array<Record<string, any>>;
};
export declare type PriceUpdateParams = {
    forceWrite: boolean;
    currentPrice: number;
    thresholdPct: number;
    idleTime: number;
};
export {};
//# sourceMappingURL=types.d.ts.map