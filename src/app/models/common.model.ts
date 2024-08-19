export interface ApiResponseModel<T> {
    success: boolean,
    response: number | string,
    responseDescription: string,
    dataArray: T[]
}

export interface DialogData {
    title: string,
    message: string,
    confirmBtnLabel: string,
    closeBtnLabel: string
}