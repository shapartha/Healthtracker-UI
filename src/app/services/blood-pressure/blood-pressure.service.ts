import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { CommonService } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class BloodPressureService {

  constructor(private commonService: CommonService) { }

  getBpRecords(apiFuncParams: any) {
    return this.commonService.callRestApi(AppConstants.API_GET_ALL_BP_DATA, apiFuncParams);
  }

  saveBpRecord(apiFuncParams: any) {
    return this.commonService.callRestApi(AppConstants.API_SAVE_BP_DATA, apiFuncParams);
  }

  updateBpRecord(apiFuncParams: any) {
    return this.commonService.callRestApi(AppConstants.API_UPDATE_BP_DATA, apiFuncParams);
  }

  deleteBpRecord(apiFuncParams: any) {
    return this.commonService.callRestApi(AppConstants.API_DELETE_BP_DATA, apiFuncParams);
  }

  /**
   * Returns -1 if GOOD, 0 if HIGH, 1 if LOW
   * 
   * @param sys Systolic Value
   * @param dia Diastolic Value
   * @param pulse Pulse Value
   */
  calculateBpHighLow(sys: number, dia: number, pulse: number, goodnessVal: number) {
    if (goodnessVal === 1) {
      return -1;
    }
    let constVal = AppConstants.BLOOD_PRESSURE_VALUE;
    let badSysVals = constVal.BAD.SYS;
    let badDiaVals = constVal.BAD.DIA;
    let badPulseVals = constVal.BAD.PULSE;
    let avgSysVals = constVal.AVG.SYS;
    let avgDiaVals = constVal.AVG.DIA;
    let avgPulseVals = constVal.AVG.PULSE;
    var sysRes = 1, diaRes = 1, pulseRes = 1;
    if (goodnessVal == 0) {
      for (let i = 0; i < avgSysVals.length; i++) {
        if (sys <= avgSysVals[i].HIGH && sys >= avgSysVals[i].LOW) {
          sysRes = i;
          break;
        }
      }
      for (let i = 0; i < avgDiaVals.length; i++) {
        if (dia <= avgDiaVals[i].HIGH && dia >= avgDiaVals[i].LOW) {
          diaRes = i;
          break;
        }
      }
      for (let i = 0; i < avgPulseVals.length; i++) {
        if (pulse <= avgPulseVals[i].HIGH && pulse >= avgPulseVals[i].LOW) {
          pulseRes = i;
          break;
        }
      }
      if (sysRes == 0 || diaRes == 0 || pulseRes == 0) {
        return 0;
      } else {
        return 1;
      }
    } else {
      for (let i = 0; i < badSysVals.length; i++) {
        if (sys <= badSysVals[i].HIGH && sys >= badSysVals[i].LOW) {
          sysRes = i;
          break;
        }
      }
      for (let i = 0; i < badDiaVals.length; i++) {
        if (dia <= badDiaVals[i].HIGH && dia >= badDiaVals[i].LOW) {
          diaRes = i;
          break;
        }
      }
      for (let i = 0; i < badPulseVals.length; i++) {
        if (pulse <= badPulseVals[i].HIGH && pulse >= badPulseVals[i].LOW) {
          pulseRes = i;
          break;
        }
      }
      if (sysRes == 0 || diaRes == 0 || pulseRes == 0) {
        return 0;
      } else {
        return 1;
      }
    }
  }

  /**
  * Returns -1 if BAD, 0 if AVERAGE, 1 if GOOD
  * 
  * @param sys Systolic Value
  * @param dia Diastolic Value
  * @param pulse Pulse Value
  */
  calculateBpGoodness(sys: number, dia: number, pulse: number) {
    let constVal = AppConstants.BLOOD_PRESSURE_VALUE;
    let goodSysVals = constVal.GOOD.SYS;
    let goodDiaVals = constVal.GOOD.DIA;
    let goodPulseVals = constVal.GOOD.PULSE;
    let avgSysVals = constVal.AVG.SYS;
    let avgDiaVals = constVal.AVG.DIA;
    let avgPulseVals = constVal.AVG.PULSE;
    var sysRes = -1, diaRes = -1, pulseRes = -1;
    for (let i = 0; i < goodSysVals.length; i++) {
      if (sys <= goodSysVals[i].HIGH && sys >= goodSysVals[i].LOW) {
        sysRes = 1;
        break;
      }
    }
    for (let i = 0; i < goodDiaVals.length; i++) {
      if (dia <= goodDiaVals[i].HIGH && dia >= goodDiaVals[i].LOW) {
        diaRes = 1;
        break;
      }
    }
    for (let i = 0; i < goodPulseVals.length; i++) {
      if (pulse <= goodPulseVals[i].HIGH && pulse >= goodPulseVals[i].LOW) {
        pulseRes = 1;
        break;
      }
    }
    if (sysRes == 1 && diaRes == 1 && pulseRes == 1) {
      return 1;
    } else {
      if (sysRes !== 1) {
        for (let i = 0; i < avgSysVals.length; i++) {
          if (sys <= avgSysVals[i].HIGH && sys >= avgSysVals[i].LOW) {
            sysRes = 0;
            break;
          }
        }
      }
      if (diaRes !== 1) {
        for (let i = 0; i < avgDiaVals.length; i++) {
          if (dia <= avgDiaVals[i].HIGH && dia >= avgDiaVals[i].LOW) {
            diaRes = 0;
            break;
          }
        }
      }
      if (pulseRes !== 1) {
        for (let i = 0; i < avgPulseVals.length; i++) {
          if (pulse <= avgPulseVals[i].HIGH && pulse >= avgPulseVals[i].LOW) {
            pulseRes = 0;
            break;
          }
        }
      }
      if (sysRes >= 0 && diaRes >= 0 && pulseRes >= 0) {
        return 0;
      } else {
        return -1;
      }
    }
  }
}
