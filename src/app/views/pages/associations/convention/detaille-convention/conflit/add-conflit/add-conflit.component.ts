import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConflitMarcheService } from '../../../../../shared/ConflitMarcheService';
import { AutorisationMarcheService } from '../../../../../shared/AutorisationMarcheService';
import { PartiePreneurService } from '../../../../../shared/PartiePreneurService';
import { AddAutorisationComponent } from '../../autorisation/add-autorisation/add-autorisation.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-conflit',
  templateUrl: './add-conflit.component.html',
  styleUrls: ['./add-conflit.component.scss']
})
export class AddConflitComponent implements OnInit {

  listPP;
  formAutorisation:FormGroup;
  isUpdate:boolean=false;
	constructor(
		public dialogRef: MatDialogRef<AddAutorisationComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
   private partiePreneurService:PartiePreneurService,
   private conflitMarcheService:ConflitMarcheService,
   private fb:FormBuilder,
   private router:Router
	) {
    this.formAutorisation= new FormGroup({
      id: new FormControl(''),
      partiePreneur:  new FormGroup({
        id: new FormControl('')
      }), 
      convention:  new FormGroup({
        id: new FormControl('')
      }), 
      autorisation: new FormControl('')
      });
  }

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
    if(this.formData.conflit_id!=0){
      this.isUpdate=true;
      this.conflitMarcheService.findById(this.formData.conflit_id).subscribe(res=>{
        this.formAutorisation.patchValue(res);
          })
        }
    this.partiePreneurService.all().subscribe(res=>{
      this.listPP=res;
    })
	console.log(this.formData )
	this.formAutorisation.get("convention").patchValue(this.formData);
	}


	onChangeofQte($event) {
		console.log(event);
	}
  onSubmit(){

    console.log(this.formAutorisation.value)
  this.conflitMarcheService.save(this.formAutorisation.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
    Swal.fire({

      icon: 'success',
      title: ' été bien enregistré',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(["convention/detailleConvention/conflit"], {
      queryParams: { id: this.formData.id },
    });
  },err=>{console.log(err)})
  }
}
