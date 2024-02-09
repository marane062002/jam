import { Component, Inject, OnInit } from '@angular/core';
import { PartiePreneurService } from '../../../../../shared/PartiePreneurService';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AvanceService } from '../../../../../shared/AvanceService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'kt-avance-new',
  templateUrl: './avance-new.component.html',
  styleUrls: ['./avance-new.component.scss']
})
export class AvanceNewComponent implements OnInit {
  listPP;
  formButs: FormGroup;
  isUpdate: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AvanceNewComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any,
    private partiePreneurService: PartiePreneurService,
    private avanceService: AvanceService,
    private router: Router,

  ) {
    this.formButs = new FormGroup({
      id: new FormControl(''),
      object: new FormControl(''),
      montant: new FormControl(''),
      duree: new FormControl(''),
      suiviFn: new FormControl(''),
      suiviph: new FormControl(''),
      date: new FormControl(''),
      convention: new FormGroup({
        id: new FormControl('')
      }),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if (this.formData.avance_id != 0) {
      this.isUpdate = true;
      this.avanceService.findById(this.formData.avance_id).subscribe((res: any) => {
        if (res.montant != null) {
          res.montant = res.montant.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        }
        this.formButs.patchValue(res);
      })
    }
    this.partiePreneurService.all().subscribe(res => {
      this.listPP = res;
    })
    console.log(this.formData)
    this.formButs.get("convention").patchValue(this.formData);
  }


  onChangeofQte($event) {
    console.log(event);
  }
  onSubmit() {
    if (this.formButs.value.id != null) {
      if(this.formButs.value.montant!=null){
			this.formButs.value.montant = parseFloat((this.formButs.value.montant).replace(/\s/, ''));
      }
		}
    console.log(this.formButs.value)
    this.avanceService.save(this.formButs.value).subscribe(res => {
      console.log(res);
      this.onNoClick();
      Swal.fire({

        icon: 'success',
        title: ' été bien enregistré',
        showConfirmButton: false,
        timer: 1500
      })
     /*  this.router.navigate(["convention/detailleConvention/avance"], {
        queryParams: { id: this.formData.id },
      }); */
      this.router.navigate(["convention/detailleConvention/Autorisation"], {
        queryParams: { id: this.formData.id },
      });
      // window.location.reload();
    }, err => { console.log(err) })
  }

}
