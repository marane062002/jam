import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'detail-carburant',
  templateUrl: './detail-carburant.component.html',
  styleUrls: ['./detail-carburant.component.scss']
})
export class DetailCarburantComponent implements OnInit {

  tabID: number = 1;
  vignettes: any []
  carbuCartes:any[]

  addVectorielle:number
  addVignette:number
  updateVectorielle:number
  updateVignette:number
  ajouterVectorielles:any[] = [];
  modifierVectorielles:any[] = [];
  ajouterLisVignettes:any[] = [];
  modifierLisVignettes:any[] = [];
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.vignettes = [
      {
          id: 1,
          montant: "REUNION",
          codeBarre: "2021-10-14	"
      },
      {
        id: 2,
        montant: "REUNION",
        codeBarre: "2021-10-14	"
      },
      {
        id: 3,
        montant: "REUNION",
        codeBarre: "2021-10-14	"
      }
    ];
    this.carbuCartes = [
      {
        id: 1,
        carte: "REUNION",
        soldeInitial: "2021-10-14	",
        soldeDepart: "2021-10-14	"
      },
      {
        id: 2,
        carte: "REUNION",
        soldeInitial: "2021-10-14	",
        soldeDepart: "2021-10-14	"
      },
      {
        id: 3,
        carte: "REUNION",
        soldeInitial: "2021-10-14	",
        soldeDepart: "2021-10-14	"
      }
    ];
  }

  displayTab(id: number) {
    this.tabID = id;
  }

  openModalAjouterVignettes(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  openModalAjouterCarburant(content:any){
    this.modalService.open(content, {
      size: "xl",
    });
  }

  openModalModifierCarburant(content:any){
    this.modalService.open(content, {
      size: "xl",
    });
  }

  openModalModifierVignettes(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  close(){
    this.modalService.dismissAll();
  }

  ajouterNombreVectorielle(){
    this.ajouterVectorielles=[]
    for(let i=0;i<this.addVectorielle;i++){
      this.ajouterVectorielles.push(1)  
    }
  }

  modifierNombreVectorielle(){
    this.modifierVectorielles=[]
    for(let i=0;i<this.updateVectorielle;i++){
      this.modifierVectorielles.push(1)  
    }
  }

  ajouterNombreVignette(){
    this.ajouterLisVignettes=[]
    for(let i=0;i<this.addVignette;i++){
      this.ajouterLisVignettes.push(1)  
    }
  }

  modifierNombreVignette(){
    this.modifierLisVignettes=[]
    for(let i=0;i<this.updateVignette;i++){
      this.modifierLisVignettes.push(1)  
    }
  }

}
