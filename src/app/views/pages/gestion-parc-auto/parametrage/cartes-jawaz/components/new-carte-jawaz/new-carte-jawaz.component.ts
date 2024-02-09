import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { CarteJawaz, ICarteJawaz } from '../../../../common/models/carte-jawaz.model';
import { CarteJawazService } from '../../service/carte-jawaz.service';

@Component({
  selector: 'kt-new-carte-jawaz',
  templateUrl: './new-carte-jawaz.component.html',
  styleUrls: ['./new-carte-jawaz.component.scss']
})
export class NewCarteJawazComponent implements OnInit {
  editForm:FormGroup;
  constructor(
    protected carteJawazService: CarteJawazService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: [],
      reference: [null, [Validators.required]],
      soldedepart: [null, [Validators.required, Validators.min(0)]],
      soldeactuel: [null, [Validators.required, Validators.min(0)]],
    });
   }

  ngOnInit() {
  }
  save(): void {
    //this.isSaving = true;
    const carteJawaz = this.createFromForm();
    if (carteJawaz.id != null && carteJawaz.id !== undefined) {
      this.subscribeToSaveResponse(this.carteJawazService.update(carteJawaz));
    } else {
      this.subscribeToSaveResponse(this.carteJawazService.create(carteJawaz));
    }
  }
  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<ICarteJawaz>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }
  previousState(): void {}

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    //this.isSaving = false;
  }
  protected onSaveSuccess(): void {
    let id = this.editForm.get(["id"])!.value;
    let title: String =
      id != null && id !== undefined
        ? "La Carte Jawaz a été modifié avec succés"
        : "La Carte Jawaz a été ajoutée avec succés";
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
        this.editForm.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  protected createFromForm(): ICarteJawaz {
    return {
      ...new CarteJawaz(),
      id: this.editForm.get(["id"])!.value,
      reference: this.editForm.get(["reference"])!.value,
      soldedepart: this.editForm.get(["soldedepart"])!.value,
      soldeactuel: this.editForm.get(["soldeactuel"])!.value,
    };
  }
  ajouterInfoCarteJawaz() {
    this.save();
  }

}
