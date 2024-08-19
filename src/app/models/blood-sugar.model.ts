export interface BloodSugarListRequestModel {
    user_id: string
}

export interface BloodSugarListResponseModel {
    record_id: number,
    record_date_fst: string,
    record_date_fst_d: string,
    fbs: string,
    record_date_pp: string,
    record_date_pp_d: string,
    postprandial: string,
    check_sum: string,
    user_id: string,
    add_update_dttm: string
}