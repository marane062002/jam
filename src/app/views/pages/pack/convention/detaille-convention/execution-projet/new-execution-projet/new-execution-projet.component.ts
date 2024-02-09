import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExecutionProjetService } from '../../../../../../../views/pages/shared/execution-projet.service';

@Component({
  selector: 'kt-new-execution-projet',
  templateUrl: './new-execution-projet.component.html',
  styleUrls: ['./new-execution-projet.component.scss']
})
export class NewExecutionProjetComponent implements OnInit {
  isUpdate=false;
  listPP;
  formExecutionProjet:FormGroup;
  Visible=0;
  isSelected=true;
	constructor(
		public dialogRef: MatDialogRef<NewExecutionProjetComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
   private executionProjetService:ExecutionProjetService,
   private fb:FormBuilder,
   private router:Router
	) {
    this.formExecutionProjet= new FormGroup({
      id: new FormControl(''),
      proprietaireAssigne: new FormControl(''),
      proprietaire: new FormControl(''), 
      convention:  new FormGroup({
        id: new FormControl('')
      }),
      });
  }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
  /*   if(this.formData.audit_id!=0){
      this.isUpdate=true;
      this.executionProjetService.findById(this.formData.audit_id).subscribe(res=>{
        this.formExecutionProjet.patchValue(res);
          })
    } */
	this.formExecutionProjet.get("convention").patchValue(this.formData);
  if(this.formData.con_id!=0){
    this.isUpdate=true;
  
    this.executionProjetService.findById(this.formData.con_id).subscribe(res=>{
      this.formExecutionProjet.patchValue(res);
        })
      }

	}


	onChangeofQte($event) {
		console.log(event);
	}
  

  onSubmit(){

    console.log(this.formExecutionProjet.value)
  this.executionProjetService.save(this.formExecutionProjet.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
    Swal.fire({
      icon: 'success',
      title: ' été bien enregistré',
      showConfirmButton: false,
      timer: 1500
    })
    /* this.router.navigate(["convention/detailleConvention/executionProjet"], {
      queryParams: { id: this.formData.id },
    }); */
    this.router.navigate(["convention/detailleConvention/Autorisation"], {
      queryParams: { id: this.formData.id },
    });
   // window.location.reload();
  },err=>{console.log(err)})
  }
}




