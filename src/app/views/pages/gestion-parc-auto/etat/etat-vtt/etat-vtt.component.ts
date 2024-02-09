import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etat-vtt',
  templateUrl: './etat-vtt.component.html',
  styleUrls: ['./etat-vtt.component.scss']
})
export class EtatVttComponent implements OnInit {

  headerData:any=[
    { name: "Date", content: "date" },
    { name: "Libelle", content: "libelle" },
    { name: "E/Montant (MAD)", content: "eMontant" },
    { name: "E/Cumul", content: "eCumul" },
    { name: "E/Piéces Justificative", content: "eIecesJustificative" },
    { name: "S/Montant (MAD)", content: "sMontant" },
    { name: "S/Cumul", content: "sCumul" },
    { name: "S/Piéces Justificative", content: "sIecesJustificative" },
    { name: "Solde", content: "solde" }
  ]

  listVtt:any[];


  constructor() { }

  ngOnInit() {
    this.listVtt=[
      {
        "date": "2021-10-14",
        "libelle": "Avance n°01",
        "eMontant": "1 000.00",
        "eCumul": "1 000.00",
        "eIecesJustificative": "1 000.00",
        "sMontant": "1 000.00",
        "sCumul": "3 000,00",
        "sIecesJustificative": "1 000.00",
        "solde": "1 000.00",
      },
      {
        "date": "2021-10-14",
        "libelle": "Avance n°01",
        "eMontant": "3 000,00",
        "eCumul": "2 000.00",
        "eIecesJustificative": "1 000.00",
        "sMontant": "1 000.00",
        "sCumul": "3 000.00",
        "sIecesJustificative": "1 000.00",
        "solde": "1 000.00",
      },
      {
        "date": "2021-10-14",
        "libelle": "Avance n°01",
        "eMontant": "2 000.00",
        "eCumul": "1 000.00",
        "eIecesJustificative": "1 000.00",
        "sMontant": "1 000.00",
        "sCumul": "3 000.00",
        "sIecesJustificative": "1 000.00",
        "solde": "1 000.00",
      }
    ]
  }

}
