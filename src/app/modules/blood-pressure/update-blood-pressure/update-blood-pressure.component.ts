import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstants } from 'src/app/app.constant';
import { BloodPressureListResponseModel } from 'src/app/models/blood-pressure.model';
import { ApiResponseModel } from 'src/app/models/common.model';
import { BloodPressureService } from 'src/app/services/blood-pressure/blood-pressure.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-update-blood-pressure',
  templateUrl: './update-blood-pressure.component.html',
  styleUrl: './update-blood-pressure.component.scss'
})
export class UpdateBloodPressureComponent {
  updateForm: FormGroup;
  record: BloodPressureListResponseModel;
  disableButton: boolean = false;

  constructor(public dialogRef: MatDialogRef<UpdateBloodPressureComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private bloodPressureService: BloodPressureService, private commonService: CommonService) {
    this.record = this.data.record;
    this.updateForm = this.formBuilder.group({
      sys: [this.record.systolic, [Validators.required, Validators.min(1), Validators.max(999)]],
      dia: [this.record.diastolic, [Validators.required, Validators.min(1), Validators.max(999)]],
      pulse: [this.record.pulse, [Validators.required, Validators.min(1), Validators.max(999)]],
      record_date: [new Date(new Date(this.record.record_date).toLocaleString('en-us', { timeZone: AppConstants.CORRECT_TIMEZONE }))]
    });
  }

  submitData() {
    this.disableButton = true;
    const formData = this.updateForm.value;
    this.record.systolic = (formData.sys > 0) ? formData.sys : this.record.systolic;
    this.record.diastolic = (formData.dia > 0) ? formData.dia : this.record.diastolic;
    this.record.pulse = (formData.pulse > 0) ? formData.pulse : this.record.pulse;
    this.record.record_date = (new Date(formData.record_date).toLocaleString('en-US', { timeZone: AppConstants.CORRECT_TIMEZONE }) !== 'Invalid Date') ? this.commonService.convertDateForSQL(formData.record_date) : this.record.record_date;
    this.bloodPressureService.updateBpRecord(this.record).subscribe((data: ApiResponseModel<any>) => {
      if (data.success === true) {
        this.commonService.showAlert("Record Updated Successfully", "success");
        this.dialogRef.close();
      } else {
        this.commonService.showAlert(data.responseDescription);
      }
      this.disableButton = true;
    });
  }

  close() {
    this.dialogRef.close({ simplyClose: true });
  }
}
