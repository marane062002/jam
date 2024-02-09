import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ConsistanceConventionService } from '../../../../../../../views/pages/shared/consistance-convention.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-new-consistance-convention',
  templateUrl: './new-consistance-convention.component.html',
  styleUrls: ['./new-consistance-convention.component.scss']
})
export class NewConsistanceConventionComponent implements OnInit {
  isUpdate = false;
  listPP;
  formConsistanceConvention: FormGroup;
  Visible = 0;
  isSelected = true;
  constructor(
    public dialogRef: MatDialogRef<NewConsistanceConventionComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any,
    private consistanceConventionService: ConsistanceConventionService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.formConsistanceConvention = new FormGroup({
      id: new FormControl(''),
      composante: new FormControl(''),
      cout: new FormControl(''),
      convention: new FormGroup({
        id: new FormControl('')
      }),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    /* if (this.formData.audit_id != 0) {
      this.isUpdate = true;
      this.consistanceConventionService.findById(this.formData.audit_id).subscribe(res => {
        this.formConsistanceConvention.patchValue(res);
      })
    } */
    this.formConsistanceConvention.get("convention").patchValue(this.formData);
    if (this.formData.con_id != 0) {
      this.isUpdate = true;

      this.consistanceConventionService.findById(this.formData.con_id).subscribe((res: any) => {
        if (res.cout != null) {
          res.cout = res.cout.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        }
        this.formConsistanceConvention.patchValue(res);
      })
    }

  }


  onChangeofQte($event) {
    console.log(event);
  }


  onSubmit() {
    if (this.formConsistanceConvention.value.id != null) {
      if(this.formConsistanceConvention.value.cout!=null){
			this.formConsistanceConvention.value.cout = parseFloat((this.formConsistanceConvention.value.cout).replace(/\s/, ''));
      }
		}
    console.log(this.formConsistanceConvention.value)
    this.consistanceConventionService.save(this.formConsistanceConvention.value).subscribe(res => {
      console.log(res);
      this.onNoClick();
      Swal.fire({
        icon: 'success',
        title: ' été bien enregistré',
        showConfirmButton: false,
        timer: 1500
      })
    /*   this.router.navigate(["convention/detailleConvention/consistanceConvention"], {
        queryParams: { id: this.formData.id },
      }); */
       this.router.navigate(["convention/detailleConvention/Autorisation"], {
        queryParams: { id: this.formData.id },
      });
      // window.location.reload();
    }, err => { console.log(err) })
  }
}




