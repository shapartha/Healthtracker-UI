import { Component, HostListener, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConstants } from 'src/app/app.constant';
import { BloodPressureListRequestModel, BloodPressureListResponseModel } from 'src/app/models/blood-pressure.model';
import { ApiResponseModel } from 'src/app/models/common.model';
import { BloodPressureService } from 'src/app/services/blood-pressure/blood-pressure.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrl: './blood-pressure.component.scss'
})
export class BloodPressureComponent implements OnInit {
  isLoadingResults = false;
  notSupported: boolean = false;
  addNewForm: FormGroup;
  readonly panelOpenState = signal(false);
  accordion = viewChild.required(MatAccordion);
  displayedColumns: string[] = ['statusIndicator', 'systolic', 'diastolic', 'pulse', 'record_date', 'actions'];
  tableData: MatTableDataSource<BloodPressureListResponseModel> = new MatTableDataSource();
  resultsLength = 0;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder, private bloodPressureService: BloodPressureService, private commonService: CommonService, private dialog: MatDialog) {
    this.addNewForm = this.formBuilder.group({
      sys: [0, [Validators.required, Validators.min(1), Validators.max(999)]],
      dia: [0, [Validators.required, Validators.min(1), Validators.max(999)]],
      pulse: [0, [Validators.required, Validators.min(1), Validators.max(999)]],
      record_date: [new Date(), Validators.required]
    });
    this.getScreenSize();
  }

  ngOnInit(): void {
    if (!this.notSupported) {
      this.isLoadingResults = true;
      this.modifyStylings();
      this.loadData();
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.commonService.screenHeight.set(window.innerHeight);
    this.commonService.screenWidth.set(window.innerWidth);
    if (this.commonService.screenWidth() <= 380) {
      this.notSupported = true;
    }
  }

  modifyStylings() {
    this.styleModifier('.mat-mdc-paginator-container .mat-mdc-paginator-page-size-select', 'width: 60px');
    this.styleModifier('.mat-mdc-paginator-container .mat-mdc-paginator-touch-target', 'width: 60px; height: 30px;');
    this.styleModifier('.mat-mdc-paginator-container .mat-mdc-form-field-infix', 'padding-top: 2px; padding-bottom: 2px; min-height: 0px;');
    this.styleModifier('.mat-mdc-paginator-range-actions button.mat-mdc-paginator-navigation-first', 'margin: 0 !important; width: 30px; height: 30px;');
    this.styleModifier('.mat-mdc-paginator-range-actions button.mat-mdc-paginator-navigation-previous', 'margin: 0 !important; width: 30px; height: 30px;');
    this.styleModifier('.mat-mdc-paginator-range-actions button.mat-mdc-paginator-navigation-next', 'margin: 0 !important; width: 30px; height: 30px;');
    this.styleModifier('.mat-mdc-paginator-range-actions button.mat-mdc-paginator-navigation-last', 'margin: 0 !important; width: 30px; height: 30px;');
    this.styleModifier('.mat-mdc-paginator-range-label', 'margin: 0 10px 0 0;');
    this.styleModifier('.mat-mdc-paginator-container button.mat-mdc-paginator-navigation-first .mat-mdc-button-touch-target', 'width: 30px; height: 30px;');
    this.styleModifier('.mat-mdc-paginator-container button.mat-mdc-paginator-navigation-previous .mat-mdc-button-touch-target', 'width: 30px; height: 30px;');
    this.styleModifier('.mat-mdc-paginator-container button.mat-mdc-paginator-navigation-next .mat-mdc-button-touch-target', 'width: 30px; height: 30px;');
    this.styleModifier('.mat-mdc-paginator-container button.mat-mdc-paginator-navigation-last .mat-mdc-button-touch-target', 'width: 30px; height: 30px;');
  }

  styleModifier(elementSelector: any, style: string) {
    document.querySelector(elementSelector)?.setAttribute('style', style);
  }

  loadData() {
    let inputParams: BloodPressureListRequestModel = { user_id: this.commonService.getAppUserId! };
    this.bloodPressureService.getBpRecords(inputParams).subscribe((data: ApiResponseModel<BloodPressureListResponseModel>) => {
      data.dataArray.forEach(element => {
        element.record_date_d = this.commonService.formatDateToString(element.record_date, AppConstants.CORRECT_TIMEZONE);
      });
      this.tableData.data = data.dataArray;
      this.isLoadingResults = false;
      this.resultsLength = this.tableData.data.length;
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
      this.modifyStylings();
    });
  }

  getClassVal(data: any) {
    let finalClassVal = 'check_circle';
    let className = 'red-val';
    let goodnessVal = this.bloodPressureService.calculateBpGoodness(data.systolic, data.diastolic, data.pulse);
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
    let highLowVal = this.bloodPressureService.calculateBpHighLow(data.systolic, data.diastolic, data.pulse, goodnessVal);
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

  submitData() {
    const formData = this.addNewForm.getRawValue();
    if ((formData.sys === undefined || formData.sys === null || formData.sys === 0) &&
      (formData.dia === undefined || formData.dia === null || formData.dia === 0) &&
      (formData.pulse === undefined || formData.pulse === null || formData.pulse === 0)) {
      this.commonService.showAlert("Please enter a valid NON-ZERO value");
      return;
    }
    let inpData = {
      systolic: (formData.sys === undefined || formData.sys === null) ? 0 : formData.sys,
      diastolic: (formData.dia === undefined || formData.dia === null) ? 0 : formData.dia,
      pulse: (formData.pulse === undefined || formData.pulse === null) ? 0 : formData.pulse,
      record_date: (formData.record_date === undefined || formData.record_date === null) ? this.commonService.convertDateForSQL(new Date().toLocaleString('en-US', { timeZone: AppConstants.CORRECT_TIMEZONE })) : this.commonService.convertDateForSQL(new Date(formData.record_date).toLocaleString('en-US', { timeZone: AppConstants.CORRECT_TIMEZONE })),
      check_sum: this.commonService.generateUUID(),
      user_id: this.commonService.getAppUserId
    }
    this.isLoadingResults = true;
    this.bloodPressureService.saveBpRecord(inpData).subscribe((data: ApiResponseModel<any>) => {
      if (data.success === true) {
        this.accordion().closeAll();
        this.commonService.showAlert("Record Added Successfully", "success");
        this.addNewForm.reset({
          sys: 0,
          dia: 0,
          pulse: 0,
          record_date: new Date()
        });
        this.loadData();
      }
      this.isLoadingResults = false;
    });
  }

  deleteData(row: BloodPressureListResponseModel) {
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
        this.bloodPressureService.deleteBpRecord(row).subscribe((data: ApiResponseModel<any>) => {
          if (data.success === true) {
            this.commonService.showAlert("Record Deleted Successfully", "success");
            this.loadData();
          } else {
            this.commonService.showAlert(data.responseDescription);
          }
          this.isLoadingResults = false;
        });
      }
    });
  }

  editData(row: BloodPressureListResponseModel, editMode: number = 1) {
    // const dialogRef = this.dialog.open(UpdateBloodSugarComponent, {
    //   data: { record: row, mode: editMode },
    //   width: '50vw',
    //   disableClose: true,
    //   closeOnNavigation: true
    // });
    // dialogRef.afterClosed().subscribe(d => {
    //   if (!!d && d.simplyClose) {
    //     return;
    //   }
    //   this.loadData();
    // });
  }
}
