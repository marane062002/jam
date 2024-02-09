import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Chevillard } from '../../../../core/_base/layout/models/abattoir/chevillard';
import { ChevillardService } from '../service/chevillard.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-add-type-chevillard',
  templateUrl: './add-type-chevillard.component.html',
  styleUrls: ['./add-type-chevillard.component.scss']
})
export class AddTypeChevillardComponent implements OnInit {
  chevillard: Chevillard;
  constructor(private router: Router,
    private chevillardService: ChevillardService,
    private fb: FormBuilder,
    private translate: TranslateService) {

  }

  ngOnInit() {

  }
  back() {
    this.router.navigate(["audiences/list-audiences"]);
  }


  chevillardSaveForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    // prenom: new FormControl('', [Validators.required]),
    // dateNaissance: new FormControl('', [Validators.required]),
    telephone: new FormControl(''),
    cin: new FormControl(''),
    adresse: new FormControl(''),

  });

  // formatDate(){
  //   this.chevillardSaveForm.value.dateNaissance.setDate(this.chevillardSaveForm.value.dateNaissance.getDate()+1);
  //   this.chevillardSaveForm.value.dateNaissance.setUTCHours('00');
  // }

  onSubmit() {
    console.log("nnnn");
    console.log("test", this.chevillardSaveForm.value);
    const controls = this.chevillardSaveForm.controls;

    if (this.chevillardSaveForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    // this.formatDate();
    this.saveChevillard(this.chevillardSaveForm.value);
  }



  editChevillard(chevillard) {
    this.chevillardService.updateChevillard(chevillard).subscribe(data => { console.log(data), this.back() }, error => console.log(error));
  }


  isControlHasError(controlName: string, validationType: string): boolean {
    var result;
    const control = this.chevillardSaveForm.controls[controlName];
    if (!control) {
      return false;
    }
    result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  saveChevillard2(chevillard) {
    this.chevillardService.createChevillard(chevillard)
      .subscribe(data => { console.log(data), this.back() }, error => console.log(error));
  }

  saveChevillard(chevillard) {
    this.chevillardService.createChevillard(chevillard)
      .subscribe(data => {
        console.log(data),
          Swal.fire({
            position: "center",
            icon: "success",
            title: this.translate.instant("AUTH.GENERAL.AJOUT_REUSSI"),
            showConfirmButton: false,
            timer: 2500
          });
        this.back();
      }, error => {
        console.log(error),
          Swal.fire({
            position: "center",
            icon: "error",
            title: this.translate.instant("AUTH.GENERAL.ECHEC_AJOUT"),
            showConfirmButton: false,
            timer: 2500
          });
      }
      )
  }
}

/*
title: this.translate.instant(
          "PAGES.GENERAL.MSG_SAVED_CONFIRMED"
        ),

*/