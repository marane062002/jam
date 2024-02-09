import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ProgrammePhase } from '../../../../../pages/shared/ProgrammePhase';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-new-phase',
  templateUrl: './new-phase.component.html',
  styleUrls: ['./new-phase.component.scss']
})
export class NewPhaseComponent implements OnInit {


  listPhase;
  formGroup:FormGroup;
	constructor(
		public dialogRef: MatDialogRef<NewPhaseComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
    private programmePhase:ProgrammePhase,
   private router:Router
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
      this.formGroup= new FormGroup({
        programme:  new FormGroup({
          id: new FormControl('')
        }), 
        programmePhass:  new FormGroup({
          id: new FormControl('')
        }), 
        contributionCommune: new FormControl(''),
       contributionPartenaires: new FormControl('')
        });
    
    this.programmePhase.getPhases().subscribe(res=>{
      this.listPhase=res;
    })
	console.log(this.formData )
	this.formGroup.get("programme").patchValue(this.formData);
	}


	onChangeofQte($event) {
		console.log(event);
	}
  onSubmit(){

    console.log(this.formGroup.value)
  this.programmePhase.save(this.formGroup.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
    Swal.fire({
      icon: 'success',
      title: ' été bien enregistré',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(["/programme/detaille-programme"], {
			queryParams: { id: this.formGroup.value.programme.id},
		});
  },err=>{console.log(err)})
  }
}


