import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'kt-edit-lot-marche',
  templateUrl: './edit-lot-marche.component.html', 
  styleUrls: ['./edit-lot-marche.component.scss']
})
export class EditLotMarcheComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditLotMarcheComponent>,
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