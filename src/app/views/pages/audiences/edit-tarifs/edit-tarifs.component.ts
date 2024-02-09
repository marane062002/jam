import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ArreteFiscal } from '../../../../core/_base/layout/models/abattoir/arrete-fiscal';
import { ArreteFiscalService } from '../service/arrete-fiscal.service';
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import { EspeceService } from '../service/espece.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-edit-tarifs',
  templateUrl: './edit-tarifs.component.html',
  styleUrls: ['./edit-tarifs.component.scss']
})
export class EditTarifsComponent implements OnInit {

  id: number;
  type: Espece[];
  arreteFiscal: ArreteFiscal;
  constructor(private router: Router,
    protected activatedRoute: ActivatedRoute,
    private arreteFiscalService: ArreteFiscalService,
    private especeService: EspeceService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id']
    })
    console.log("Id:" + this.id);
    this.getData();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ arreteFiscalD }) => {
      this.arreteFiscalUpdateForm.patchValue({ ...arreteFiscalD })
      console.log(this.arreteFiscalUpdateForm.value);

    });
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

  arreteFiscalUpdateForm = this.fb.group({
    id: '',
    codeNature: ['', Validators.required],
    libelle: ['', Validators.required],
    espece: new FormGroup({
      id: new FormControl('', Validators.required),
    }),
    tarif: ['', Validators.required],
  });


  getData() {
    this.arreteFiscalService.getArreteFiscalById(this.id)
      .then(data => {
        console.log(data);
        this.arreteFiscalUpdateForm.patchValue(data);
      });
  }


  edit() {
    const formValues = this.arreteFiscalUpdateForm.value
    const arreteFiscal: any = Object.assign({}, formValues);
    console.log('chevillard: ' + JSON.stringify(arreteFiscal));
    const controls = this.arreteFiscalUpdateForm.controls;

    if (this.arreteFiscalUpdateForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    // this.loading = true;
    this.editArreteFiscal(arreteFiscal);

  }

  editArreteFiscal(arreteFiscal) {
    this.arreteFiscalService.updateArreteFiscal(arreteFiscal)
      .subscribe(data => {
        console.log(data),
          Swal.fire({
            position: "center",
            icon: "success",
            title: this.translate.instant("AUTH.GENERAL.MODIFICATION_REUSSIE"),
            showConfirmButton: false,
            timer: 2500,
          })
        this.back()
      },
        error => {
          console.log(error),
            Swal.fire({
              position: "center",
              icon: "error",
              title: this.translate.instant("AUTH.GENERAL.ECHEC_MODIFICATION"),
              showConfirmButton: false,
              timer: 2500
            });
        }
      );
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    var result;
    const control = this.arreteFiscalUpdateForm.controls[controlName];

    if (!control) {
      return false;
    }
    result = control.hasError(validationType) && (control.dirty || control.touched);

    return result;
  }


}

