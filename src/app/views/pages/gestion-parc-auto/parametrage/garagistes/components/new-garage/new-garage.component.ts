import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { GaragisteService } from '../../service/garagiste.service';

import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertResult } from "sweetalert2";
import { Garagiste, IGaragiste } from "../../../../common/models/garagiste.model";


@Component({
  selector: 'kt-new-garage',
  templateUrl: './new-garage.component.html',
  styleUrls: ['./new-garage.component.scss']
})
export class NewGarageComponent implements OnInit {
  garageForm:FormGroup;
  garagiste: IGaragiste;
  isSaving:boolean=false;
  constructor(   protected fb: FormBuilder,
    private garagisteService:GaragisteService,
    private  translate:TranslateService, protected modalService: NgbModal) { }

  ngOnInit() {
    this.garageForm = this.fb.group({
      id: [],
      nomFr: [null, [Validators.required]],
      telephone: [null, [Validators.required,Validators.pattern('[- +()0-9]+')]],
      contact: [],
      adresse: [],
      rc: [],
    });
  }
  ajouterGarage(){
   //this.isSaving = true;
    const garagiste = this.createFromForm();
    if (garagiste.id != null && garagiste.id !== undefined) {
      this.subscribeToSaveResponse(this.garagisteService.update(garagiste));
    } else {
      this.subscribeToSaveResponse(this.garagisteService.create(garagiste));
    }
  
  }
  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IGaragiste>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }
  protected onSaveError(): void {
    // Api for inheritance.
  }
  
  protected createFromForm(): IGaragiste {
    return {
      ...new Garagiste(),
      id: this.garageForm.get(["id"])!.value,
      nomFr: this.garageForm.get(["nomFr"])!.value,
      telephone: this.garageForm.get(["telephone"])!.value,
      contact: this.garageForm.get(["contact"])!.value,
      adresse: this.garageForm.get(["adresse"])!.value,
      rc: this.garageForm.get(["rc"])!.value,
    };
  }
  
  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSaveSuccess(): void {
    this.modalService.dismissAll();
    let id = this.garageForm.get(["id"])!.value;
    let title: String =
      id != null && id !== undefined
        ? "Garagiste a été modifié avec succés"
        : "Garagiste a été ajoutée avec succés";
    Swal.fire({
      title: "title",
      icon: "success",
    })
      .then((sweetAlert: SweetAlertResult) => {
        if (sweetAlert.isConfirmed) {
        }
        if (sweetAlert.isDenied) {
        }
        if (sweetAlert.isDismissed) {
        }
        if (sweetAlert.dismiss) {
        }
        this.garageForm.reset();
  
      })
      .catch((err) => {
        console.log(err);
      });
  }


}
