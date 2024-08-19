export interface LoginRequestModel {
    email_id: string,
    password: string
}

export interface LoginResponseModel {
    user_id: string,
    email_id: string,
    display_name: string,
    check_sum: string,
    password: string
}