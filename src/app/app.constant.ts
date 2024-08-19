export class AppConstants {
    static API_GET_TOKEN: string = "getToken";
    static API_KEY: string = "d7e1a3d7dd2a43a4";
    static API_LOGIN_USER = "getUserDataEmailPassword";
    static API_GET_ALL_BS_DATA = "getBsDataUserId";
    static API_GET_ALL_BP_DATA = "getBpDataUserId";
    static API_SAVE_BP_DATA = "storeBpData";
    static API_UPDATE_BP_DATA = "updateBpData";
    static API_DELETE_BP_DATA = "deleteBpData";
    static API_SAVE_BS_DATA = "storeBsData";
    static API_UPDATE_BS_DATA = "updateBsData";
    static API_DELETE_BS_DATA = "deleteBsData";
    static RELEVANT_TIMEZONE = "Asia/Magadan";

    static BLOOD_PRESSURE_VALUE = {
        GOOD : {
            SYS: [
                {
                    HIGH: 129,
                    LOW: 110
                }
            ],
            DIA: [
                {
                    HIGH: 89,
                    LOW: 70
                }
            ],
            PULSE: [
                {
                    HIGH: 100,
                    LOW: 70
                }
            ]
        },
        AVG : {
            SYS: [
                {
                    HIGH: 159,
                    LOW: 130
                },
                {
                    HIGH: 109,
                    LOW: 95
                }
            ],
            DIA: [
                {
                    HIGH: 105,
                    LOW: 90
                },
                {
                    HIGH: 69,
                    LOW: 60
                }
            ],
            PULSE: [
                {
                    HIGH: 129,
                    LOW: 101
                },
                {
                    HIGH: 69,
                    LOW: 60
                }
            ]
        },
        BAD : {
            SYS: [
                {
                    HIGH: 999,
                    LOW: 160
                },
                {
                    HIGH: 94,
                    LOW: 0
                }
            ],
            DIA: [
                {
                    HIGH: 999,
                    LOW: 106
                },
                {
                    HIGH: 59,
                    LOW: 0
                }
            ],
            PULSE: [
                {
                    HIGH: 999,
                    LOW: 130
                },
                {
                    HIGH: 59,
                    LOW: 0
                }
            ]
        }
    };
    static BLOOD_SUGAR_VALUE = {
        GOOD : {
            FBS: [
                {
                    HIGH: 120,
                    LOW: 80
                }
            ],
            PP: [
                {
                    HIGH: 160,
                    LOW: 110
                }
            ]
        },
        AVG : {
            FBS: [
                {
                    HIGH: 150,
                    LOW: 121
                },
                {
                    HIGH: 79,
                    LOW: 65
                }
            ],
            PP: [
                {
                    HIGH: 199,
                    LOW: 161
                },
                {
                    HIGH: 109,
                    LOW: 80
                }
            ]
        },
        BAD : {
            FBS: [
                {
                    HIGH: 999,
                    LOW: 151
                },
                {
                    HIGH: 64,
                    LOW: 0
                }
            ],
            PP: [
                {
                    HIGH: 999,
                    LOW: 200
                },
                {
                    HIGH: 79,
                    LOW: 0
                }
            ]
        }
    };
}