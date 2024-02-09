import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PatrimoineNewComponent } from '../patrimoine-new/patrimoine-new.component';

@Component({
  selector: 'kt-model-add-type',
  templateUrl: './model-add-type.component.html',
  styleUrls: ['./model-add-type.component.scss']
})
export class ModelAddTypeComponent  {


  constructor(
    public dialogRef: MatDialogRef<ModelAddTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
  ) {
    console.log(data)
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
}
