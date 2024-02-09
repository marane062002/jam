import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { engagementService } from '../../../../../shared/engagementService';
import Swal from 'sweetalert2';
import { AutorisationMarcheService } from '../../../../../shared/AutorisationMarcheService';
import { PartiePreneurService } from '../../../../../shared/PartiePreneurService';

@Component({
  selector: 'kt-new-engagement',
  templateUrl: './new-engagement.component.html',
  styleUrls: ['./new-engagement.component.scss']
})
export class NewEngagementComponent implements OnInit {

  listPP;
  formconflit:FormGroup;
  Visible=0;
  isUpdate=false;
  isSelected=true;
	constructor(
		public dialogRef: MatDialogRef<NewEngagementComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
   private partiePreneurService:PartiePreneurService,
   private AutorisationServie:engagementService,
   private fb:FormBuilder,
   private router:Router
	) {  this.formconflit= new FormGroup({
    id: new FormControl(''),
        partiePreneur:  new FormGroup({
          id: new FormControl('')
        }), 
        pexternal:  new FormGroup({
          nom: new FormControl(''),
          prenom: new FormControl(''),
        }), 
        convention:  new FormGroup({
          id: new FormControl('')
        }), 
        object: new FormControl('')
        });}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
    if(this.formData.engagemnt_id!=0){
      this.isUpdate=true;
      this.AutorisationServie.findById(this.formData.engagemnt_id).subscribe(res=>{
        this.formconflit.patchValue(res);
          })
    }
    
    this.partiePreneurService.all().subscribe(res=>{
      this.listPP=res;
    })
	console.log(this.formData )
	this.formconflit.get("convention").patchValue(this.formData);
	}


	onChangeofQte($event) {
		console.log(event);
	}
  selectedConvontion($event){
    this.formconflit.removeControl('partiePreneur');
  }
  selectedConvontion1($even){
    this.formconflit.registerControl("partiePreneur",  this.fb.group({  id: ['']  }));
  }
  onSubmit(){

    console.log(this.formconflit.value)
  this.AutorisationServie.save(this.formconflit.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
    Swal.fire({
      icon: 'success',
      title: ' été bien enregistré',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(["convention/detailleConvention/engagement"], {
      queryParams: { id: this.formData.id },
    });
   // window.location.reload();
  },err=>{console.log(err)})
  }
}

