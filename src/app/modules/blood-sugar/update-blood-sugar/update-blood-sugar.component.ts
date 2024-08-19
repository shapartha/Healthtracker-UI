import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppConstants } from 'src/app/app.constant';
import { BloodSugarListResponseModel } from 'src/app/models/blood-sugar.model';
import { ApiResponseModel } from 'src/app/models/common.model';
import { BloodSugarService } from 'src/app/services/blood-sugar/blood-sugar.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-update-blood-sugar',
  templateUrl: './update-blood-sugar.component.html',
  styleUrl: './update-blood-sugar.component.scss'
})
export class UpdateBloodSugarComponent implements OnInit {

  updateForm: FormGroup;
  showOnlyFBS: boolean = false;
  showOnlyPP: boolean = false;
  showAll: boolean = true;
  record: BloodSugarListResponseModel;
  disableButton: boolean = false;

  constructor(public dialogRef: MatDialogRef<UpdateBloodSugarComponent>, private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private bloodSugarService: BloodSugarService, private commonService: CommonService) {
    this.record = this.data.record;
    this.showAll = (this.data.mode == 1) ? false : true;
    this.updateForm = this.formBuilder.group({
      fbs: [this.record.fbs, [Validators.min(1), Validators.required]],
      record_date_fst: [new Date(new Date(this.record.record_date_fst).toLocaleString('en-us', { timeZone: AppConstants.RELEVANT_TIMEZONE })), Validators.required],
      postprandial: [this.record.postprandial, [Validators.min(1), Validators.required]],
      record_date_pp: [new Date(new Date(this.record.record_date_pp).toLocaleString('en-us', { timeZone: AppConstants.RELEVANT_TIMEZONE })), Validators.required]
    });
    if (this.record.fbs === '0') {
      this.updateForm.patchValue({ 'record_date_fst': '' });
    }
    if (this.record.postprandial === '0') {
      this.updateForm.patchValue({ 'record_date_pp': '' });
    }
  }

  ngOnInit(): void {
    if (!this.showAll) {
      if (this.record.fbs == undefined || this.record.fbs == null || this.record.fbs === '0') {
        this.showOnlyFBS = true;
      } else if (this.record.postprandial == undefined || this.record.postprandial == null || this.record.postprandial === '0') {
        this.showOnlyPP = true;
      }
    }
  }

  submitData() {
    this.disableButton = true;
    const formData = this.updateForm.value;
    this.record.fbs = (formData.fbs > 0) ? formData.fbs : this.record.fbs;
    this.record.postprandial = (formData.postprandial > 0) ? formData.postprandial : this.record.postprandial;
    this.record.record_date_fst = (new Date(formData.record_date_fst).toLocaleString('en-US') !== 'Invalid Date') ? this.commonService.convertDateForSQL(formData.record_date_fst) : this.record.record_date_fst;
    this.record.record_date_pp = (new Date(formData.record_date_pp).toLocaleString('en-US') !== 'Invalid Date') ? this.commonService.convertDateForSQL(formData.record_date_pp) : this.record.record_date_pp;
    this.bloodSugarService.updateBsRecord(this.record).subscribe((data: ApiResponseModel<any>) => {
      if (data.success === true) {
        this.commonService.showAlert("Record Updated Successfully");
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
