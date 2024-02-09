import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ContributionService } from '../../../../../shared/ContributionService';
import { PartiePreneurService } from '../../../../../shared/PartiePreneurService';
import { AddAutorisationComponent } from '../../autorisation/add-autorisation/add-autorisation.component';

@Component({
  selector: 'kt-contribution-new',
  templateUrl: './contribution-new.component.html',
  styleUrls: ['./contribution-new.component.scss']
})
export class ContributionNewComponent implements OnInit {

  listPP;
  formGroup:FormGroup;
	constructor(
		public dialogRef: MatDialogRef<AddAutorisationComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any,
   private partiePreneurService:PartiePreneurService,
   private contributionService:ContributionService,
  private router:Router
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
      this.formGroup= new FormGroup({
        partiePreneur:  new FormGroup({
          id: new FormControl('')
        }), 
        convention:  new FormGroup({
          id: new FormControl('')
        }), 
        description: new FormControl(''),
        type: new FormControl(''),
        date: new FormControl('') 
      });
    
    this.partiePreneurService.all().subscribe(res=>{
      this.listPP=res;
    })
	console.log(this.formData )
	this.formGroup.get("convention").patchValue(this.formData);
	}


	onChangeofQte($event) {
		console.log(event);
	}
  onSubmit(){

    console.log(this.formGroup.value)
  this.contributionService.save(this.formGroup.value).subscribe(res=>{
    console.log(res);
    this.onNoClick();
    this.router.navigate(["convention/detailleConvention/Contribution"], {
      queryParams: { id: this.formData.id },
    });
    window.location.reload();
  },err=>{console.log(err)})
  }
}

