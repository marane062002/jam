import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EspeceService } from '../service/espece.service';
import { TranslateService } from '@ngx-translate/core';
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import Swal from 'sweetalert2';


@Component({
  selector: 'kt-edit-espece',
  templateUrl: './edit-espece.component.html',
  styleUrls: ['./edit-espece.component.scss']
})


export class EditEspeceComponent implements OnInit {

  id: number;
  espece: Espece;
  constructor(private router: Router,
    protected activatedRoute: ActivatedRoute,
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
    this.activatedRoute.data.subscribe(({ especeD }) => {
      this.especeUpdateForm.patchValue({ ...especeD })
      console.log(this.especeUpdateForm.value);

    });
  }
  back() {
    this.router.navigate(["audiences/list-espece"]);
  }

  especeUpdateForm = this.fb.group({
    id: '',
    espece: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });


  getData() {
    this.especeService.getEspeceById(this.id)
      .then(data => {
        console.log(data);
        this.especeUpdateForm.patchValue(data);
      });
  }


  edit() {
    const formValues = this.especeUpdateForm.value
    const espece: any = Object.assign({}, formValues);
    console.log('espece: ' + JSON.stringify(espece));
    const controls = this.especeUpdateForm.controls;

    if (this.especeUpdateForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    // this.loading = true;
    this.editEspece(espece);

  }

  editEspece(espece) {
    this.especeService.updateEspece(espece)
      .subscribe(data => {
        console.log(data),
          Swal.fire({
            position: "center",
            icon: "success",
            title: this.translate.instant("AUTH.GENERAL.MODIFICATION_REUSSIE"),
            showConfirmButton: false,
            timer: 2500
          })
        this.back()
      },
      error =>{
        console.log(error),
        Swal.fire({
          position:"center",
          icon:"error",
          title:this.translate.instant("AUTH.GENERAL.ECHEC_MODIFICATION"),
          showConfirmButton: false,
          timer: 2500
        });
      }
    );
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    var result;
    const control = this.especeUpdateForm.controls[controlName];
    if (!control) {
      return false;
    }
    result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}