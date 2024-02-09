import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fonctionnaires',
  templateUrl: './fonctionnaires.component.html',
  styleUrls: ['./fonctionnaires.component.scss']
})
export class FonctionnairesComponent implements OnInit {

  headerData:any=[
    { name: "CIN Fonctionnaire", content: "cinFonctionnaire" },
    { name: "Nom", content: "nom" },
    { name: "Prénom", content: "prenom" },
    { name: "Mission", content: "mission" },
    { name: "Adresse", content: "adresse" },
    { name: "Téléphone", content: "telephone" }
  ]

  listFonctionnaires:any[];
  actions: any = { canDetail:true, canModify:true ,canAdd:true,withAction:true}


  constructor(
    private modalService: NgbModal) { }

  ngOnInit() {
    this.listFonctionnaires=[
      {
        "cinFonctionnaire": "AB1020",
        "nom": "PEUGEOT",
        "prenom": "2018",
        "mission": "2021-10-14",
        "adresse": "DRA",
        "telephone":"0625361478"
      },
      {
        "cinFonctionnaire": "AC2030",
        "nom": "PEUGEOT",
        "prenom": "2018",
        "mission": "2021-10-14",
        "adresse": "DRA",
        "telephone":"0695135748"
      },
      {
        "cinFonctionnaire": "AD1030",
        "nom": "PEUGEOT",
        "prenom": "2018",
        "mission": "2021-10-14",
        "adresse": "DRA",
        "telephone":"0652897413"
      },
      {
        "cinFonctionnaire": "AE2030",
        "nom": "PEUGEOT",
        "prenom": "2018",
        "mission": "2021-10-14",
        "adresse": "DRA",
        "telephone":"0689653214"
      },
    ]
  }

  modalAjouterFonctionnaire(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailFonctionnaire(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierFonctionnaire(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerFonctionnaire(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

  ajouterInfoFonctionnaire() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Fonctionnaire a été ajoutée avec succés',
      icon: 'success',
    });
  }
  
  modifierInfoFonctionnaire() {
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Fonctionnaire a été modifié avec succés',
      icon: 'success',
    });
  }

}
