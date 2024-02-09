import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chauffeurs',
  templateUrl: './chauffeurs.component.html',
  styleUrls: ['./chauffeurs.component.scss']
})
export class ChauffeursComponent implements OnInit {

  headerData:any=[
    { name: "Nom", content: "nom" },
    { name: "Prénom", content: "prenom" },
    { name: "CIN", content: "cin" },
    { name: "Email", content: "email" },
    { name: "Nombre de Jours en Mission", content: "nombreJoursMission" }
  ]

  listCartesJawaz:any[];
/*   actions: any = { canDetail:true, canModify:true ,canAdd:true,withAction:true} */


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.listCartesJawaz=[
      {
        "nom": "MPLl",
        "prenom": "OHJT",
        "cin": "NH20367",
        "email": "chauffeur2@gmail.com",
        "nombreJoursMission": "30j",
      },
      {
        "nom": "ERIA",
        "prenom": "MLkn",
        "cin": "DB1235",
        "email": "chauffeur1@gmail.com",
        "nombreJoursMission": "20j",
      },
      {
        "nom": "LLL",
        "prenom": "KKKK",
        "cin": "KH23564",
        "email": "chauffeur3@gmail.com",
        "nombreJoursMission": "10j",
      },
      {
        "nom": "BBB",
        "prenom": "SSS",
        "cin": "MP251968",
        "email": "chauffeur5@gmail.com",
        "nombreJoursMission": "5j",
      },
    ]
  }

  modalAjouterChauffeur(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailChauffeur(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierChauffeur(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerChauffeur(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

}
