import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ArreteFiscal } from '../../../../core/_base/layout/models/abattoir/arrete-fiscal';
import { ArreteFiscalService } from '../service/arrete-fiscal.service';
import { EspeceService } from '../service/espece.service';
import { HttpResponse } from '@angular/common/http';
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'kt-add-tarifs',
  templateUrl: './add-tarifs.component.html',
  styleUrls: ['./add-tarifs.component.scss']
})




export class AddTarifsComponent implements OnInit {
  arreteFiscal: ArreteFiscal;
  type: Espece[];
  constructor(private router: Router,
    private arreteFiscalService: ArreteFiscalService,
    private especeService: EspeceService,
    private translate: TranslateService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.especeService.query().subscribe({
      next: (res: HttpResponse<Espece[]>) => {
        this.type = res.body;
      },

      error: () => { },
    })
  }
  back() {
    this.router.navigate(["audiences/list-tarifs"]);
  }


  arreteFiscalSaveForm = new FormGroup({
    codeNature: new FormControl('', [Validators.required]),
    libelle: new FormControl('', [Validators.required]),

    espece: new FormGroup({
      id: new FormControl('', Validators.required),
    }),

    tarif: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log("nnnn");
    console.log("test", this.arreteFiscalSaveForm.value);
    const controls = this.arreteFiscalSaveForm.controls;

    if (this.arreteFiscalSaveForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    console.log("test tarif:" + JSON.stringify(this.arreteFiscalSaveForm.value));
    console.log("arreteFiscal--------------------:" + JSON.stringify(this.arreteFiscalSaveForm.value));
    this.saveArreteFiscal(this.arreteFiscalSaveForm.value);
  }

  saveArreteFiscal(arreteFiscal) {
    this.arreteFiscalService.createArreteFiscal(arreteFiscal)
      .subscribe(data => {
        console.log(data),
          Swal.fire({
            position: "center",
            icon: "success",
            title: this.translate.instant("AUTH.GENERAL.AJOUT_REUSSI"),
            showConfirmButton: false,
            timer: 2500
          })
        this.back()
      },
        error => {
          console.log(error),
            Swal.fire({
              position: "center",
              icon: "error",
              title: this.translate.instant("AUTH.GENERAL.ECHEC_AJOUT"),
              showConfirmButton: false,
              timer: 2500
            });
        }
      );
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    var result;
    const control = this.arreteFiscalSaveForm.controls[controlName];

    if (!control) {
      return false;
    }
    result = control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }



}
