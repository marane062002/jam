import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ButsServices } from '../../../../../shared/ButsServices';
import { PartiePreneurService } from '../../../../../shared/PartiePreneurService';
import { AddAutorisationComponent } from '../../autorisation/add-autorisation/add-autorisation.component';

@Component({
  selector: 'kt-add-but',
  templateUrl: './add-but.component.html',
  styleUrls: ['./add-but.component.scss']
})
export class AddButComponent implements OnInit {

  listPP;
  formButs:FormGroup;
  isUpdate:boolean=false;
	constructor(
		public dialogRef: MatDialogRef<AddButComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
   private partiePreneurService:PartiePreneurService,
   private ButsService:ButsServices,
   private router:Router

	) {
    this.formButs= new FormGroup({
      id: new FormControl(''),
      convention:  new FormGroup({
        id: new FormControl('')
      }), 
      object: new FormControl('')
      });
  }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
   
        if(this.formData.but_id!=0){
          this.isUpdate=true;
          this.ButsService.findById(this.formData.but_id).subscribe(res=>{
            this.formButs.patchValue(res);
              })
            }
    this.partiePreneurService.all().subscribe(res=>{
      this.listPP=res;
    })
	console.log(this.formData )
	this.formButs.get("convention").patchValue(this.formData);
	}


	onChangeofQte($event) {
		console.log(event);
	}
  onSubmit(){

    console.log(this.formButs.value)
  this.ButsService.save(this.formButs.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
    Swal.fire({

      icon: 'success',
      title: ' été bien enregistré',
      showConfirmButton: false,
      timer: 1500
    })
   /*  this.router.navigate(["convention/detailleConvention/Buts"], {
      queryParams: { id: this.formData.id },
    }); */
   // window.location.reload();

  },err=>{console.log(err)})
  }

}
