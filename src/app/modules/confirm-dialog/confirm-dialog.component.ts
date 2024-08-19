import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/common.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  title: string;
  messages: string[];
  confirmBtnLabel: string;
  closeBtnLabel: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.title = data.title;
    this.messages = data.message.split("<br>");
    this.confirmBtnLabel = data.confirmBtnLabel;
    this.closeBtnLabel = data.closeBtnLabel;
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onDismiss() {
    this.dialogRef.close(false);
  }
}
