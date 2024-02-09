import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ContributionService } from '../../../../../shared/ContributionService';
import { PartiePreneurService } from '../../../../../shared/PartiePreneurService';
import { AddAutorisationComponent } from '../../autorisation/add-autorisation/add-autorisation.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-contribution-new',
  templateUrl: './contribution-new.component.html',
  styleUrls: ['./contribution-new.component.scss']
})
export class ContributionNewComponent implements OnInit {
  isUpdate = false;
  listPP;
  formGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddAutorisationComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any,
    private partiePreneurService: PartiePreneurService,
    private contributionService: ContributionService,
    private router: Router,

  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      partiePreneur: new FormGroup({
        id: new FormControl('')
      }),
      convention: new FormGroup({
        id: new FormControl('')
      }),
      contributionFinanciere: new FormControl(''),
      description: new FormControl(''),
      type: new FormControl(''),
      date: new FormControl('')
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    if (this.formData.con_id != 0) {
      this.isUpdate = true;

      this.contributionService.findById(this.formData.con_id).subscribe((res: any) => {
        if (res.contributionFinanciere != null) {
          res.contributionFinanciere = res.contributionFinanciere.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        }
        if (res.type == 'Finance') {
          this.showInputCF = true;
          this.showInputDesc = false;
        }
        if (res.type == 'Autre') {
          this.showInputCF = false;
          this.showInputDesc = true;
        }
        this.formGroup.patchValue(res);
      })

    }
    this.partiePreneurService.all().subscribe(res => {
      this.listPP = res;
    })
    console.log(this.formData)
    this.formGroup.get("convention").patchValue(this.formData);
  }

  showInputDesc: boolean = false;
  showInputCF: boolean = false;
  getValueType(event: any) {
    if (event == 'Autre') {
      this.showInputCF = false;
      this.showInputDesc = true;
    }
    if (event == 'Finance') {
      this.showInputCF = true;
      this.showInputDesc = false;
    }
  }

  onChangeofQte($event) {
    console.log(event);
  }
  onSubmit() {
    if (this.formGroup.value.id != null) {
      if(this.formGroup.value.contributionFinanciere!=null){
			this.formGroup.value.contributionFinanciere = parseFloat((this.formGroup.value.contributionFinanciere).replace(/\s/, ''));
      }
		}
    console.log(this.formGroup.value)
    this.contributionService.save(this.formGroup.value).subscribe(res => {
      console.log(res);
      this.onNoClick();
      Swal.fire({

        icon: 'success',
        title: ' été bien enregistré',
        showConfirmButton: false,
        timer: 1500
      })
         /* this.router.navigate(["convention/detailleConvention/Contribution"], {
           queryParams: { id: this.formData.id },
         }); */
         this.router.navigate(["convention/detailleConvention/Autorisation"], {
          queryParams: { id: this.formData.id },
        });
         // window.location.reload();
    }, err => { console.log(err) })
  }
}

