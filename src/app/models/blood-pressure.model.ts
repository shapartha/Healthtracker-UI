export interface BloodPressureListRequestModel {
    user_id: string
}

export interface BloodPressureListResponseModel {
    record_id: number,
    record_date: string,
    record_date_d: string,
    systolic: string,
    diastolic: string,
    pulse: string,
    check_sum: string,
    user_id: string
}