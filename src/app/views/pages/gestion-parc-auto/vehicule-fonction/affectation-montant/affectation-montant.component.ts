import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'affectation-montant',
  templateUrl: './affectation-montant.component.html',
  styleUrls: ['./affectation-montant.component.scss']
})
export class AffectationMontantComponent implements OnInit {

  headerData:any=[
    { name: "Fonctionnaire", content: "fonctionnaire" },
    { name: "Véhicule", content: "vehicule" },
    { name: "Date de début", content: "dateDebut" }, 
    { name: "Date de fin", content: "dateFin" },
    { name: "Montant", content: "montant" },
  ]

  listAffectationMontant:any[];
  actions: any = { canModify:true,withAction:true,canAdd:true}

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.listAffectationMontant=[
      {
        "fonctionnaire": "fonctionnaire 1",
        "vehicule": "PEUGEOT M-102030",
        "dateDebut": "2021-10-14",
        "dateFin": "2021-11-15",
        "montant": "100 MAD",
      },
      {
        "fonctionnaire": "fonctionnaire 2",
        "vehicule": "PEUGEOT M-102030",
        "dateDebut": "2021-10-14",
        "dateFin": "2021-11-15",
        "montant": "100 MAD",
      },
      {
        "fonctionnaire": "Visiteur DRA",
        "vehicule": "PEUGEOT M-102030",
        "dateDebut": "2021-10-14",
        "dateFin": "2021-11-15",
        "montant": "100 MAD",
      }
    ]
  }

  modalAjouterAffectationMontant(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierAffectationMontant(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerAffectationMontant(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

  affectationMontantFonction() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Montant a été affecter avec succés',
      icon: 'success',
    });
  }
  
  modifierMontantFonction() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Affectation a été modifié avec succés',
      icon: 'success',
    });
  }

}
