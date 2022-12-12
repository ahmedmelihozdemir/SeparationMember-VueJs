/**
 * @name HttpRequestParamsInterface
 * @description
 * HttpClient requests parameters for get/post/put etc operations
 */
export interface HttpRequestParamsInterface {
    url: string;
    payload?: any;
    id?: number;
    /* requiresToken: boolean; */
}
