import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { SuiviContributionService } from '../../../../../../../views/pages/shared/suivi-contribution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-new-suivi-contribution',
  templateUrl: './new-suivi-contribution.component.html',
  styleUrls: ['./new-suivi-contribution.component.scss']
})
export class NewSuiviContributionComponent implements OnInit {
  isUpdate=false;
  listPP;
  formconflit:FormGroup;
  Visible=0;
  isSelected=true;
	constructor(
		public dialogRef: MatDialogRef<NewSuiviContributionComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
   private suiviContributionService:SuiviContributionService,
   private fb:FormBuilder,
   private router:Router
	) {
    this.formconflit= new FormGroup({
      id: new FormControl(''),
      objet: new FormControl(''),
      etat: new FormControl(''),
      commentaire: new FormControl(''), 
      date: new FormControl(''),
      convention:  new FormGroup({
        id: new FormControl('')
      }), 
      });
  }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
    /* if(this.formData.audit_id!=0){
      this.isUpdate=true;
      this.suiviContributionService.findById(this.formData.audit_id).subscribe(res=>{
        this.formconflit.patchValue(res);
          })
    } */
	this.formconflit.get("convention").patchValue(this.formData);
  if(this.formData.con_id!=0){
    this.isUpdate=true;
  
    this.suiviContributionService.findById(this.formData.con_id).subscribe(res=>{
      this.formconflit.patchValue(res);
        })
      }

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
  this.suiviContributionService.save(this.formconflit.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
    Swal.fire({
      icon: 'success',
      title: ' été bien enregistré',
      showConfirmButton: false,
      timer: 1500
    })
   /*  this.router.navigate(["convention/detailleConvention/suiviContrubition"], {
      queryParams: { id: this.formData.id },
    }); */
    this.router.navigate(["convention/detailleConvention/Autorisation"], {
      queryParams: { id: this.formData.id },
    });
   // window.location.reload();
  },err=>{console.log(err)})
  }
}




