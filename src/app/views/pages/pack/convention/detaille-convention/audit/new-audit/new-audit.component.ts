import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuditMarche } from '../../../../../shared/AuditMarche';
import { PartiePreneurService } from '../../../../../shared/PartiePreneurService';
import { AddAutorisationComponent } from '../../autorisation/add-autorisation/add-autorisation.component';

@Component({
  selector: 'kt-new-audit',
  templateUrl: './new-audit.component.html',
  styleUrls: ['./new-audit.component.scss']
})
export class NewAuditComponent implements OnInit {

  listPP;
  formGroup:FormGroup;
  isUpdate:boolean=false;
	constructor(
		public dialogRef: MatDialogRef<AddAutorisationComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
   private partiePreneurService:PartiePreneurService,
   private auditMarche:AuditMarche,
   private router:Router
	) {
    this.formGroup= new FormGroup({
      id: new FormControl(''),
      partiePreneur:  new FormGroup({
        id: new FormControl('')
      }), 
      convention:  new FormGroup({
        id: new FormControl('')
      }), 
      object: new FormControl(''),
    //  type: new FormControl('')
      });
  }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
    if(this.formData.audit_id!=0){
      this.isUpdate=true;
      this.auditMarche.findById(this.formData.audit_id).subscribe(res=>{
        this.formGroup.patchValue(res);
          })
    }
   
   
    
    this.partiePreneurService.all().subscribe(res=>{
      this.listPP=res;
    })
	console.log(this.formData.id )
	this.formGroup.get("convention").patchValue(this.formData);
	}


	onChangeofQte($event) {
		console.log(event);
	}
  onSubmit(){

    console.log(this.formGroup.value)
  this.auditMarche.save(this.formGroup.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
    Swal.fire({
      icon: 'success',
      title: ' été bien enregistré',
      showConfirmButton: false,
      timer: 1500
    })
   /*  this.router.navigate(["convention/detailleConvention/audit"], {
      queryParams: { id: this.formData.id },
    }); */
    this.router.navigate(["convention/detailleConvention/Autorisation"], {
      queryParams: { id: this.formData.id },
    });
  },err=>{console.log(err)})
  }
}




