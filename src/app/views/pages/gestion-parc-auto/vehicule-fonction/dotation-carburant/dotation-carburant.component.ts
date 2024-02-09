import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'dotation-carburant',
  templateUrl: './dotation-carburant.component.html',
  styleUrls: ['./dotation-carburant.component.scss']
})
export class DotationCarburantComponent implements OnInit {

  headerData:any=[
    { name: "Fonctionnaire", content: "fonctionnaire" },
    { name: "Véhicule", content: "vehicule" },
    { name: "Date de début", content: "dateDebut" }, 
    { name: "Montant", content: "montant" },
  ]

  listAffectationCarburant:any[];
  actions: any = { canModify:true,withAction:true}

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.listAffectationCarburant=[
      {
        "fonctionnaire": "fonctionnaire 1",
        "vehicule": "PEUGEOT M-102030",
        "dateDebut": "2021-10-14",
        "montant": "100 MAD",
      },
      {
        "fonctionnaire": "fonctionnaire 2",
        "vehicule": "PEUGEOT M-102030",
        "dateDebut": "2021-10-14",
        "montant": "100 MAD",
      },
      {
        "fonctionnaire": "Visiteur DRA",
        "vehicule": "PEUGEOT M-102030",
        "dateDebut": "2021-10-14",
        "montant": "100 MAD",
      }
    ]
  }

  modalModifierAffectationMontant(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  close(){
    this.modalService.dismissAll();
  }

  affectationCarburantFonction() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Carburant a été affecter avec succés',
      icon: 'success',
    });
  }
  
  modifierCarburantFonction() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Affectation a été modifié avec succés',
      icon: 'success',
    });
  }

}
