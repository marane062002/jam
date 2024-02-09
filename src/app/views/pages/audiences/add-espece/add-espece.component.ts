import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import { EspeceService } from '../service/espece.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-add-espece',
  templateUrl: './add-espece.component.html',
  styleUrls: ['./add-espece.component.scss']
})
export class AddEspeceComponent implements OnInit {
  espece: Espece;

  constructor(private router: Router, private especeService: EspeceService, 
    private translate:TranslateService,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(["audiences/list-espece"]);
  }

  especeSaveForm = new FormGroup({
    espece: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log("nnnn");
    console.log("test", this.especeSaveForm.value);
    const controls = this.especeSaveForm.controls;

    if (this.especeSaveForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.saveEspece(this.especeSaveForm.value);
  }

  saveEspece(espece) {
    this.especeService.createEspece(espece)
      .subscribe(
        data => {
          console.log(data),
            Swal.fire({
              position: "center",
              icon: "success",
              title: this.translate.instant("AUTH.GENERAL.AJOUT_REUSSI"),
              showConfirmButton: false,
              timer: 2500
            });
          this.back()
        },
        error =>{
          console.log(error),
          Swal.fire({
            position:"center",
            icon:"error",
            title:this.translate.instant("AUTH.GENERAL.ECHEC_AJOUT"),
            showConfirmButton: false,
            timer: 2500
          });
        }
      )
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    var result;
    const control = this.especeSaveForm.controls[controlName];
    if (!control) {
      return false;
    }
    result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
