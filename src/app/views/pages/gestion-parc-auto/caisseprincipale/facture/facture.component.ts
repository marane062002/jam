import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

  headerData:any=[
    { name: "Date de départ", content: "dateDepart" },
    { name: "Numéro facture", content: "numeroFacture" },
    { name: "Monatant facture", content: "montantFacture" },
    { name: "Émetteur", content: "emetteur" },
    { name: "Objet facture", content: "objetFacture" }
  ]

  listeFactures:any[];
  actions: any = { canModify:true ,canAdd:true,withAction:true}


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.listeFactures=[
      {
        "dateDepart": "2021-10-14",
        "numeroFacture": "1/2021",
        "montantFacture": "500 MAD",
        "emetteur": "SNTL",
        "objetFacture":"objet 1"
      },
      {
        "dateDepart": "2021-12-14",
        "numeroFacture": "2/2021",
        "montantFacture": "300 MAD",
        "emetteur": "ONCF",
        "objetFacture":"objet 2"
      },
      {
        "dateDepart": "2021-11-14",
        "numeroFacture": "3/2021",
        "montantFacture": "1000 MAD",
        "emetteur": "ADM",
        "objetFacture":"objet 3"
      },
    ]
  }

  modalAjouterFacture(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierFacture(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerFacture(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

  ajouterInfoFacture() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Facture a été ajoutée avec succés',
      icon: 'success',
    });
  }
  
  modifierInfoFacture() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Facture a été modifié avec succés',
      icon: 'success',
    });
  }

}
