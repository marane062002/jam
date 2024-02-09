import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-dialog-es',
  templateUrl: './dialog-es.component.html',
  styleUrls: ['./dialog-es.component.scss']
})
export class DialogEsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEsComponent>,) { }

  ngOnInit() {
  }

}
