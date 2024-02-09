import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CatService } from '../../Service/cat-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieProduit } from '../../../../../core/_base/layout/models/categorie-produit';


@Component({
  selector: 'kt-dialog-edit-categorie',
  templateUrl: './dialog-edit-categorie.component.html',
  styleUrls: ['./dialog-edit-categorie.component.scss']
})
export class DialogEditCategorieComponent implements OnInit {
	categori:CategorieProduit
	loading:boolean=false

	catsaveform=new FormGroup({
	  refCategori:new FormControl('' , [Validators.required] ),
	  nomCategori:new FormControl('' , [Validators.required] ),
	 });

	 isSelected:boolean=false
	constructor(public dialogRef: MatDialogRef<DialogEditCategorieComponent>,private router: Router,private catService:CatService,@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {

		console.log('edit', this.data.id)
		if(this.data.id){
			this.catService.getById(this.data.id).subscribe((res)=>{
				console.log(res);
				this.catsaveform.patchValue({...res.body})

			})
		}
		// this.autreFormEdit.patchValue({
		//   numAutre: this.data.Autre.refAutre
		// })


  }

  resetForm(){
    this.loading=false;
    this.catsaveform.reset();
	this.dialogRef.close();
  }

  onSubmit(){
console.log("form====>",this.catsaveform.value);
let categori={
	id:this.data.id,
	refCategori:this.catsaveform.get("refCategori").value,
	nomCategori:this.catsaveform.get("nomCategori").value
}
    this.catService.update(categori)
    .subscribe(data => console.log(data), error => console.log(error));
    this.dialogRef.close();
    location.reload()

  }

}
