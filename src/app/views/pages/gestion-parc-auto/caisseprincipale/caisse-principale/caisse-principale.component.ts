import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'caisse-principale',
  templateUrl: './caisse-principale.component.html',
  styleUrls: ['./caisse-principale.component.scss']
})
export class CaissePrincipaleComponent implements OnInit {

  caissePrincipale:any[];
  vectorielle:number
  vignette:number
  vectorielles:any[] = [];
  vignettes:any[] = [];

  formConvention:FormGroup;
  constructor(private modalService: NgbModal) { 
    this.formConvention= new FormGroup({
      type: new FormControl('',Validators.required),
      categorie: new FormControl('',Validators.required),
      numero: new FormControl('',Validators.required),
      annee: new FormControl('',Validators.required),
      dateConvention: new FormControl('',Validators.required),
      montant: new FormControl(0,Validators.required),
      
  })
  }

  ngOnInit() {
    this.caissePrincipale=[
      {
        typeVignette:"Carburant",
        totalAvance: "2021-10-14",
        totalVignette: "1/2021",
        montantRestant: "500 MAD",
        montantConsomme: "SNTL",
      },
      {
        typeVignette:"Reparation",
        totalAvance: "2021-10-14",
        totalVignette: "1/2021",
        montantRestant: "500 MAD",
        montantConsomme: "SNTL",
      },
      {
        typeVignette:"VTA",
        totalAvance: "2021-10-14",
        totalVignette: "1/2021",
        montantRestant: "500 MAD",
        montantConsomme: "SNTL",
      },
    ]
  }

  modalAlimentationCaisse(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  close(){
    this.modalService.dismissAll();
  }

  nombreVectorielle(){
    this.vectorielles=[]
    for(let i=0;i<this.vectorielle;i++){
      this.vectorielles.push(1)  
    }
  }

  nombreVignette(){
    this.vignettes=[]
    for(let i=0;i<this.vignette;i++){
      this.vignettes.push(1)  
    }
  }

}
