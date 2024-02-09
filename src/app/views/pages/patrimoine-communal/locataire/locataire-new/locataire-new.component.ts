import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-locataire-new',
  templateUrl: './locataire-new.component.html',
  styleUrls: ['./locataire-new.component.scss']
})
export class LocataireNewComponent implements OnInit {
  // ======================================================
  //
  // ======================================================
  loading = false;
  locataireForm: FormGroup;
  // ======================================================
  //
  // ======================================================
  constructor(
    private service: BienscommunalService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }
  // ======================================================
  //
  // ======================================================
  ngOnInit() {

    this.locataireForm = this.fb.group({

      nom: ['', Validators.compose([
        Validators.required,
      ])
      ],
      prenom: ['', Validators.required],
      cin: [null, Validators.required],
      adresse: [null],
      observation: [null],
    })
  }
  // ======================================================
  //
  // ======================================================
  get f() { return this.locataireForm ? this.locataireForm.controls : null; }
  // ======================================================
  //
  // ======================================================
  onSubmit() {

    const formValues = this.locataireForm.value
    const controls = this.locataireForm.controls;
    /** check form */
    if (this.locataireForm.invalid) {

      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    const locataire: any = Object.assign({}, formValues);
    console.log(locataire)

    this.service.saveLocataire(locataire)
      .subscribe(data => {
        this.router.navigate(['locataire/locataire-index/'])
      }, error => console.log(error)
      );
  }
  // ======================================================
  //
  // ======================================================
  back() {
    this.router.navigate(['locataire/locataire-index']);
  }
  // ======================================================
  //
  // ======================================================
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.locataireForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
