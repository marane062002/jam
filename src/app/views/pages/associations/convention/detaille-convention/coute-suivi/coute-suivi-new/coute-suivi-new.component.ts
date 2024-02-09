import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CouteSuiviService } from '../../../../../shared/CouteSuiviService';
import { PartiePreneurService } from '../../../../../shared/PartiePreneurService';
@Component({
  selector: 'kt-coute-suivi-new',
  templateUrl: './coute-suivi-new.component.html',
  styleUrls: ['./coute-suivi-new.component.scss']
})
export class CouteSuiviNewComponent implements OnInit {

  listPP;
  formButs:FormGroup;
	constructor(
		public dialogRef: MatDialogRef<CouteSuiviNewComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
   private partiePreneurService:PartiePreneurService,
   private CouteSuiviService:CouteSuiviService,
   private router:Router

	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
      this.formButs= new FormGroup({
        partiePreneur:  new FormGroup({
          id: new FormControl('')
        }), 
        convention:  new FormGroup({
          id: new FormControl('')
        }), 
        object: new FormControl('')
        });
    
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
  this.CouteSuiviService.save(this.formButs.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
 Swal.fire({

    icon: 'success',
    title: ' été bien enregistré',
    showConfirmButton: false,
    timer: 1500
  })
  this.router.navigate(["convention/detailleConvention/audit"], {
    queryParams: { id: this.formData },
  });
  },err=>{console.log(err)})
  }

}



