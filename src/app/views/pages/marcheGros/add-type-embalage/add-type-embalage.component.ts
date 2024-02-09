import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from "@angular/router";
import { Emballage } from '../../../../core/_base/layout/models/emballage';
import { EmballageService } from '../Service/emballage.service';

@Component({
  selector: 'kt-add-type-embalage',
  templateUrl: './add-type-embalage.component.html',
  styleUrls: ['./add-type-embalage.component.scss']
})
export class AddTypeEmbalageComponent implements OnInit {
	numEmballage: number = JSON.parse(localStorage.getItem("numEmballage")) | 1;

  emballage:Emballage
  loading:boolean=false
  emballageForm:FormGroup
  constructor(private router: Router,private emballageService:EmballageService) {
	this.emballageForm=new FormGroup({
		numEmballage:new FormControl(this.numEmballage , [Validators.required] ),
		categori:new FormControl('' , [Validators.required] ),
		description:new FormControl('' , [Validators.required] ),
		// lib:new FormControl('' , [Validators.required] ),
		poidEmballage:new FormControl('' , [Validators.required] ),
		// numEmballage1:new FormControl('' , [Validators.required] ),
		// numEmballage2:new FormControl('' , [Validators.required] ),
		// numEmballageImm:new FormControl('' , [Validators.required] )

	   });
   }
  isSelected:Boolean
  series:any[]

  ngOnInit() {
	this.emballageService.count().subscribe ((res) => {
		let p=res.body
		// this.Pesee = res.body;
		  this.numEmballage=p + 1

		  localStorage.setItem("numEmballage", JSON.stringify(this.numEmballage));

	},);

    this.series = [
      { idCity: 1, name: "أ" },
      { idCity: 2, name: "ب" },
      { idCity: 3, name: "ج" },
      { idCity: 4, name: "د" },
     ];
  }
	RetourEmbalages(): void {
    this.emballageForm.reset()
	this.router.navigate(["marcheGros/list-type-embalage"]);
}
AddEmbalage(): void{
//   var num = (<HTMLInputElement>document. getElementById("numerOrderEmballage")). value;
//   var num1 = (<HTMLInputElement>document. getElementById("numPrefecture")). value;
//   var p =this.emballageForm.value.numEmballageImm
//   const somme: string ="\u202A"+num+"\u202A"+p+"\u202C"+num1;
//   this.emballageForm.value.numEmballage=somme;
//   this.emballageForm.value.numEmballage2=parseInt(num);
//   this.emballageForm.value.numEmballage1=parseInt(num1);
//   this.emballageForm.value.numEmballageImm=p;
let e:Emballage={
	poidEmballage:this.emballageForm.value.poidEmballage,
	categori:this.emballageForm.value.categori,
	description:this.emballageForm.value.description,
	numEmballage:this.numEmballage
}
this.emballageForm.value

  this.emballageService.createEmballage(e)
    .subscribe(data =>  {
		  localStorage.setItem("numEmballage", JSON.stringify(this.numEmballage));

		console.log('data==============>',data), this.RetourEmbalages()}, error => console.log(error));

    // this.router.navigate(["marcheGros/list-type-embalage"]);

}
}
