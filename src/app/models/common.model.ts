export interface ApiResponseModel<T> {
    success: boolean,
    response: number | string,
    responseDescription: string,
    dataArray: T[]
}