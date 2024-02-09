import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GestionPartsService } from '../Services/gestion-des-parts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-gestion-des-parts',
  templateUrl: './gestion-des-parts.component.html',
  styleUrls: ['./gestion-des-parts.component.scss']
})

export class GestionPartsComponent implements OnInit {
  partsForm: FormGroup;

  language=localStorage.getItem('language');

  constructor(
    private router: Router,
    private translate: TranslateService,
    private gestionPartsService: GestionPartsService,
  ) {
    this.partsForm = new FormGroup({

      partMondataire: new FormControl("", [Validators.required]),
      partCommune: new FormControl("", [Validators.required]),
      partMontant: new FormControl("", [Validators.required]),
      id: new FormControl("")
    });
  }

  onEdit() {
    if (this.partsForm.valid && this.partsForm.value.partMontant == this.partsForm.value.partCommune + this.partsForm.value.partMondataire) {
      const partsData = this.partsForm.value;
      this.gestionPartsService.updateParts(partsData).subscribe(
        response => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: 'Les parts ont été modifiées avec succès',
            showConfirmButton: false,
            timer: 2500,
          })
        },
        error => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: 'Erreur de modification',
            showConfirmButton: false,
            timer: 2500,
          })
        }
      );
    }
    else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: 'Erreur de saisie: le montant total dout être égale à la somme de la part mondataire et la part de la commune',
        showConfirmButton: false,
        timer: 2500,
      })
    }
  }

  ngOnInit() {
    this.gestionPartsService.getParts().subscribe(res => {
      console.log(res);
      this.partsForm.patchValue({
        partMondataire: res.body[0].partMondataire,
        partCommune: res.body[0].partCommune,
        partMontant: res.body[0].partMontant,
        id: res.body[0].id
      })
    })
  }
}
