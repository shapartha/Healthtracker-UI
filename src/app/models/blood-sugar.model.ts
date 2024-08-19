export interface BloodSugarListRequestModel {
    user_id: string
}

export interface BloodSugarListResponseModel {
    record_id: number,
    record_date_fst: string,
    fbs: string,
    record_date_pp: string,
    postprandial: string,
    check_sum: string,
    user_id: string,
    add_update_dttm: string
}