import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-edit-lot-ao',
  templateUrl: './edit-lot-ao.component.html',
  styleUrls: ['./edit-lot-ao.component.scss']
})
export class EditLotAoComponent implements OnInit {
  // ========================================================================
  //
  // ========================================================================
  arabicPattern = /^[\u0600-\u06FF\s]+$/;

  constructor(public dialogRef: MatDialogRef<EditLotAoComponent>,
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
