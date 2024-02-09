import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'kt-locataire-edit',
  templateUrl: './locataire-edit.component.html',
  styleUrls: ['./locataire-edit.component.scss']
})
export class LocataireEditComponent implements OnInit {
  // ======================================================
  //
  // ======================================================
  loading = false;
  locataireForm: FormGroup;
  id: number;
  // ======================================================
  //
  // ======================================================
  constructor(private service: BienscommunalService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    console.log('ID: ' + this.id);
    this.locataireForm = this.fb.group({
      id: [this.id],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: [null, Validators.required],
      adresse: [null],
      observation: [null],
    })

    this.service.getLocataireById(this.id).subscribe(data => {
      //    console.log('data :' +JSON.stringify(data,null,4));
      this.locataireForm.patchValue(data[0]);
    })

  }
  // ======================================================
  //
  // ======================================================
  ngOnInit() {
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

    this.service.updateLocataire(locataire, this.id)
      .subscribe(data => {
        this.router.navigate(['locataire/locataire-index/'])
      }, error => console.log(error)
      );
  }
  // ======================================================
  //
  // ======================================================
  back() {
    //this.location.back
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
