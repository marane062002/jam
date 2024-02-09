import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieProduit } from '../../../../../core/_base/layout/models/categorie-produit';
import { CatService } from '../../Service/cat-service.service';
@Component({
  selector: 'kt-dialog-add-categorie',
  templateUrl: './dialog-add-categorie.component.html',
  styleUrls: ['./dialog-add-categorie.component.scss']
})
export class DialogAddCategorieComponent implements OnInit {
  categori:CategorieProduit
  loading:boolean=false
  catsaveform=new FormGroup({
    refCategori:new FormControl('' , [Validators.required] ),
    nomCategori:new FormControl('' , [Validators.required] ),



   });
   isSelected:boolean=false
  constructor(public dialogRef: MatDialogRef<DialogAddCategorieComponent>,private router: Router,private catService:CatService) { }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  ngOnInit() {

  }

  resetForm(){
    this.loading=false;
    this.catsaveform.reset();
	this.dialogRef.close();
  }
  onSubmit(){
if(this.catsaveform.valid){
	this.catService.createCategori(this.catsaveform.value)
    .subscribe(data => console.log(data), error => console.log(error));
    this.dialogRef.close();
    location.reload()}


  }

}
