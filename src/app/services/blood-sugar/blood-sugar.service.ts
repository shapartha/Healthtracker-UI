import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { AppConstants } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class BloodSugarService {

  constructor(private commonService: CommonService) { }

  getBsRecords(apiFuncParams: any) {
      return this.commonService.callRestApi(AppConstants.API_GET_ALL_BS_DATA, apiFuncParams);
  }

  saveBsRecord(apiFuncParams: any) {
      return this.commonService.callRestApi(AppConstants.API_SAVE_BS_DATA, apiFuncParams);
  }

  deleteBsRecord(apiFuncParams: any) {
      return this.commonService.callRestApi(AppConstants.API_DELETE_BS_DATA, apiFuncParams);
  }

  /**
   * Returns -1 if GOOD, 0 if HIGH, 1 if LOW
   * 
   * @param fbs Fasting Sugar Value
   * @param pp Postprandial Sugar Value
   * @param goodnessVal Result of @function calculateBsGoodness
   */
  calculateBsHighLow(fbs: number, pp: number, goodnessVal: number) {
        if (goodnessVal === 1) {
            return -1;
        }
        let constVal = AppConstants.BLOOD_SUGAR_VALUE;
        let badFbsVals = constVal.BAD.FBS;
        let badPpVals = constVal.BAD.PP;
        let avgFbsVals = constVal.AVG.FBS;
        let avgPpVals = constVal.AVG.PP;
        var fbsRes = 1, ppRes = 1;
        if (goodnessVal == 0) {
            for (let i = 0; i < avgFbsVals.length; i++) {
                if (fbs <= avgFbsVals[i].HIGH && fbs >= avgFbsVals[i].LOW) {
                    fbsRes = i;
                    break;
                }
            }
            for (let i = 0; i < avgPpVals.length; i++) {
                if (pp <= avgPpVals[i].HIGH && pp >= avgPpVals[i].LOW) {
                    ppRes = i;
                    break;
                }
            }
            if (fbsRes == 0 || ppRes == 0) {
                return 0;
            } else {
                return 1;
            }
        } else {
            for (let i = 0; i < badFbsVals.length; i++) {
                if (fbs <= badFbsVals[i].HIGH && fbs >= badFbsVals[i].LOW) {
                    fbsRes = i;
                    break;
                }
            }
            for (let i = 0; i < badPpVals.length; i++) {
                if (pp <= badPpVals[i].HIGH && pp >= badPpVals[i].LOW) {
                    ppRes = i;
                    break;
                }
            }
            if (fbsRes == 0 || ppRes == 0) {
                return 0;
            } else {
                return 1;
            }
        }
  }

  /**
   * Returns -1 if BAD, 0 if AVERAGE, 1 if GOOD
   * 
   * @param fbs Fasting Sugar Value
   * @param pp Postprandial Sugar Value
   */
  calculateBsGoodness(fbs: number, pp: number) {
      let constVal = AppConstants.BLOOD_SUGAR_VALUE;
      let goodFbsVals = constVal.GOOD.FBS;
      let goodPpVals = constVal.GOOD.PP;
      let avgFbsVals = constVal.AVG.FBS;
      let avgPpVals = constVal.AVG.PP;
      var fbsRes = -1, ppRes = -1;
      for (let i = 0; i < goodFbsVals.length; i++) {
            if (fbs == 0) {
                fbsRes = 1;
                break;
            }
            if (fbs <= goodFbsVals[i].HIGH && fbs >= goodFbsVals[i].LOW) {
                fbsRes = 1;
                break;
            }
      }
      for (let i = 0; i < goodPpVals.length; i++) {
            if (pp == 0) {
                ppRes = 1;
                break;
            }
            if (pp <= goodPpVals[i].HIGH && pp >= goodPpVals[i].LOW) {
                ppRes = 1;
                break;
            }
      }
      if (fbsRes == 1 && ppRes == 1) {
            return 1;
      } else {
            if (fbsRes !== 1) {
                for (let i = 0; i < avgFbsVals.length; i++) {
                    if (fbs <= avgFbsVals[i].HIGH && fbs >= avgFbsVals[i].LOW) {
                        fbsRes = 0;
                        break;
                    }
                }
            }
            if (ppRes !== 1) {
                for (let i = 0; i < avgPpVals.length; i++) {
                    if (pp <= avgPpVals[i].HIGH && pp >= avgPpVals[i].LOW) {
                        ppRes = 0;
                        break;
                    }
                }
            }
            if (fbsRes >= 0 && ppRes >= 0) {
                  return 0;
            } else {
                return -1;
            }
      }
  }
}
