import { Component, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BloodSugarListRequestModel, BloodSugarListResponseModel } from 'src/app/models/blood-sugar.model';
import { ApiResponseModel } from 'src/app/models/common.model';
import { BloodSugarService } from 'src/app/services/blood-sugar/blood-sugar.service';
import { CommonService } from 'src/app/services/common/common.service';
import { UpdateBloodSugarComponent } from './update-blood-sugar/update-blood-sugar.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-blood-sugar',
  templateUrl: './blood-sugar.component.html',
  styleUrl: './blood-sugar.component.scss'
})
export class BloodSugarComponent implements OnInit {
  addNewForm: FormGroup;
  readonly panelOpenState = signal(false);
  @ViewChild('pickerA') pickerA: any;
  accordion = viewChild.required(MatAccordion);

  displayedColumns: string[] = ['statusIndicator', 'fbs', 'record_date_fst', 'postprandial', 'record_date_pp', 'actions'];
  tableData: MatTableDataSource<BloodSugarListResponseModel> = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder, private bloodSugarService: BloodSugarService, private commonService: CommonService, private dialog: MatDialog) {
    this.addNewForm = this.formBuilder.group({
      fbs: [0],
      record_date_fst: [new Date(), Validators.required],
      postprandial: [0],
      record_date_pp: [new Date()]
    });
  }

  ngOnInit(): void {
    this.isLoadingResults = true;
    this.addNewForm.controls['postprandial'].valueChanges.subscribe(value => {
      if (value > 0) {
        this.addNewForm.controls['record_date_pp'].addValidators([Validators.required]);
        this.addNewForm.controls['record_date_pp'].updateValueAndValidity();
      } else {
        this.addNewForm.controls['record_date_pp'].removeValidators([Validators.required]);
        this.addNewForm.controls['record_date_pp'].updateValueAndValidity();
      }
    });
    this.addNewForm.controls['fbs'].valueChanges.subscribe(value => {
      if (value > 0) {
        this.addNewForm.controls['record_date_fst'].addValidators([Validators.required]);
        this.addNewForm.controls['record_date_fst'].updateValueAndValidity();
      } else {
        this.addNewForm.controls['record_date_fst'].removeValidators([Validators.required]);
        this.addNewForm.controls['record_date_fst'].updateValueAndValidity();
      }
    });

    this.loadData();
  }

  loadData() {
    let inputParams: BloodSugarListRequestModel = { user_id: this.commonService.getAppUserId! };
    this.bloodSugarService.getBsRecords(inputParams).subscribe((data: ApiResponseModel<BloodSugarListResponseModel>) => {
      data.dataArray.forEach(element => {
        element.record_date_fst_d = (element.fbs == '0') ? '' : this.commonService.formatDateToString(element.record_date_fst);
        element.record_date_pp_d = (element.postprandial == '0') ? '' : this.commonService.formatDateToString(element.record_date_pp);
      });
      this.tableData.data = data.dataArray;
      this.isLoadingResults = false;
      this.resultsLength = this.tableData.data.length;
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort
    });
  }

  submitData() {
    const formData = this.addNewForm.getRawValue();
    if ((formData.fbs === undefined || formData.fbs === null || formData.fbs === 0) &&
      (formData.postprandial === undefined || formData.postprandial === null || formData.postprandial === 0)) {
      this.commonService.showAlert("Please enter a valid NON-ZERO value");
      return;
    }
    let inpData = {
      fbs: (formData.fbs === undefined || formData.fbs === null) ? 0 : formData.fbs,
      postprandial: (formData.postprandial === undefined || formData.postprandial === null) ? 0 : formData.postprandial,
      record_date_fst: (formData.fbs === undefined || formData.fbs === null) ? this.commonService.convertDateForSQL() : formData.record_date_fst,
      record_date_pp: (formData.postprandial === undefined || formData.postprandial === null) ? this.commonService.convertDateForSQL() : formData.record_date_pp,
      check_sum: this.commonService.generateUUID(),
      user_id: this.commonService.getAppUserId
    }
    this.isLoadingResults = true;
    this.bloodSugarService.saveBsRecord(inpData).subscribe((data: ApiResponseModel<any>) => {
      if (data.success === true) {
        this.accordion().closeAll();
        this.commonService.showAlert("Record Added Successfully");
        this.addNewForm.reset({
          fbs: 0,
          postprandial: 0
        });
        this.loadData();
      }
      this.isLoadingResults = false;
    });
  }

  deleteData(row: BloodSugarListResponseModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete Action',
        message: 'Record would get deleted permanently. Are you sure you want to delete this record ?',
        confirmBtnLabel: 'Yes',
        closeBtnLabel: 'No'
      },
      disableClose: true
    });
    confirmDialog.afterClosed().subscribe(data => {
      if (data) {
        this.isLoadingResults = true;
        this.bloodSugarService.deleteBsRecord(row).subscribe((data: ApiResponseModel<any>) => {
          if (data.success === true) {
            this.commonService.showAlert("Record Deleted Successfully");
            this.loadData();
          } else {
            this.commonService.showAlert(data.responseDescription);
          }
          this.isLoadingResults = false;
        });
      }
    });
  }

  addFbsOrPP(row: BloodSugarListResponseModel, editMode: number = 1) {
    const dialogRef = this.dialog.open(UpdateBloodSugarComponent, {
      data: { record: row, mode: editMode },
      width: '50vw',
      disableClose: true,
      closeOnNavigation: true
    });
    dialogRef.afterClosed().subscribe(d => {
      if (!!d && d.simplyClose) {
        return;
      }
      this.loadData();
    });
  }

  getClassVal(data: any) {
    let finalClassVal = 'check_circle';
    let className = 'red-val';
    let goodnessVal = this.bloodSugarService.calculateBsGoodness(data.fbs, data.postprandial);
    switch (goodnessVal) {
      case 1:
        className = 'darkgreen-bg';
        break;
      case 0:
        className = 'orange-bg';
        break;
      default:
        className = 'red-bg';
    }
    let highLowVal = this.bloodSugarService.calculateBsHighLow(data.fbs, data.postprandial, goodnessVal);
    switch (highLowVal) {
      case -1:
        finalClassVal = 'check';
        break;
      case 0:
        finalClassVal = 'arrow_upward';
        break;
      default:
        finalClassVal = 'arrow_downward';
    }
    return {
      icon: finalClassVal,
      colorClass: className
    };
  }
}
