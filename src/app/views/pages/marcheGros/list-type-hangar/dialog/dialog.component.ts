import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Hangar } from '../../../../../core/_base/layout/models/Hangar';
import { HangarService } from '../../Service/hangar.service';

@Component({
  selector: 'kt-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  maxId: number;
  hangar: Hangar
  loading: boolean = false
  hangarForm = new FormGroup({
    numHangar: new FormControl('', [Validators.required]),
    lib: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])


  });

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, private router: Router, private hangarService: HangarService,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public data: { maxId: number }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

    if (this.data.maxId === null) {
      this.maxId = 1;
    }
    else {
      this.maxId = this.data.maxId + 1;
    }
    //this.maxId = this.data.maxId + 1;
  }
  AddHangar() {
    this.hangarForm.value.numHangar = this.maxId;

    this.hangarService.createHangar(this.hangarForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
    this.dialogRef.close();
    location.reload()
  }
  Retour() {
    this.loading = false;
    this.hangarForm.reset();
    this.dialogRef.close();
  }
}
// export interface DialogData {
//   animal: string;
//   name: string;
// } 