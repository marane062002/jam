import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-tableau-bord-dialog',
  templateUrl: './tableau-bord-dialog.component.html',
  styleUrls: ['./tableau-bord-dialog.component.scss']
})
export class TableauBordDialogComponent implements OnInit {
  // ========================================================================
  //
  // ========================================================================
  arabicPattern = /^[\u0600-\u06FF\s]+$/;

  constructor(public dialogRef: MatDialogRef<TableauBordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any) { }
  // ========================================================================
  //
  // ========================================================================
  ngOnInit() {
  }
  // ========================================================================
  //
  // ========================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
  // ========================================================================
  //
  // ========================================================================
}
