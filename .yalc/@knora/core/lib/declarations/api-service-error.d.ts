/**
 * Error class used as API response in ApiService
 */
export declare class ApiServiceError {
    /**
     * Header contains the Knora / Server version
     */
    header?: any;
    /**
     * Status number
     */
    status: number;
    /**
     * Status text
     */
    statusText: string;
    /**
     * API url
     */
    url: string;
    /**
     * Additional error info
     */
    errorInfo: string;
}
