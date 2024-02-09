import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etat-carburant',
  templateUrl: './etat-carburant.component.html',
  styleUrls: ['./etat-carburant.component.scss']
})
export class EtatCarburantComponent implements OnInit {

  headerData:any=[
    { name: "Date", content: "date" },
    { name: "E/Libelle", content: "libelle" },
    { name: "E/Montant (MAD)", content: "eMontant" },
    { name: "E/Cumul", content: "eCumul" },
    { name: "S/Ordre P.J", content: "sOrdre" },
    { name: "S/Type", content: "sType" },
    { name: "S/Véhicule", content: "sVehicule" },
    { name: "S/Montant (MAD)", content: "sMontant" },
    { name: "S/Cumul", content: "sCumul" },
    { name: "S/Bénéficiaire", content: "sBeneficiaire" },
    { name: "Solde", content: "solde" }
  ]

  listCarburant:any[];


  constructor() { }

  ngOnInit() {
    this.listCarburant=[
      {
        "date": "2021-12-25",
        "libelle": "2 000.00",
        "eMontant": "1 000.00",
        "eCumul": "0.00",
        "sOrdre": "6/2021",
        "sType":"Facture",
        "sVehicule":"",
        "sMontant":"0.00",
        "sCumul":"500.00",
        "sBeneficiaire":"SNTL (Carbucarte Achat)",
        "solde":"-500,00"
      },
      {
        "date": "2021-03-05",
        "libelle": "2 000.00",
        "eMontant": "0.00",
        "eCumul": "0.00",
        "sOrdre": "6/2021",
        "sType":"Facture",
        "sVehicule":"",
        "sMontant":"500,00",
        "sCumul":"500.00",
        "sBeneficiaire":"SNTL (Carbucarte Achat)",
        "solde":"-500,00"
      },
      {
        "date": "2021-6-23",
        "libelle": "2 000.00",
        "eMontant": "0.00",
        "eCumul": "0.00",
        "sOrdre": "6/2021",
        "sType":"Facture",
        "sVehicule":"",
        "sMontant":"500,00",
        "sCumul":"500.00",
        "sBeneficiaire":"SNTL (Carbucarte Achat)",
        "solde":"	-500,00"
      }
    ]
  }

}
