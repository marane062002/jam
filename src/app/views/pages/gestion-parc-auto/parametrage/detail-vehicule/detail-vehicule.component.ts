import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-vehicule',
  templateUrl: './detail-vehicule.component.html',
  styleUrls: ['./detail-vehicule.component.scss']
})
export class DetailVehiculeComponent implements OnInit {

  tabID: number = 1;
  missionsVehicule: any []
  reparationsVehicule:any[]
  constructor() { }

  ngOnInit() {
    this.missionsVehicule = [
      {
          id: 1,
          objMission: "REUNION",
          dateDebutMission: "2021-10-14	",
          dateFinMission:"2021-11-01",
          kmDebut: "2000",
          kmFin: "3000",
          distanceParcou: "1000",
          montant: "200 MAD",
          conducteur: "admin",
      },
      {
        id: 2,
        objMission: "REUNION",
        dateDebutMission: "2021-10-14	",
        dateFinMission:"2021-11-01",
        kmDebut: "2000",
        kmFin: "3000",
        distanceParcou: "1000",
        montant: "200 MAD",
        conducteur: "admin",
    },
    {
      id: 3,
      objMission: "REUNION",
      dateDebutMission: "2021-11-15	",
      dateFinMission:"2021-12-01",
      kmDebut: "2000",
      kmFin: "3000",
      distanceParcou: "1000",
      montant: "200 MAD",
      conducteur: "admin",
  },
    ];
    this.reparationsVehicule = [
      {
        id: 1,
        vehicule: "Dacia",
        garage: "aaa",
        dateEnvoieReparation: "2021-10-14	",
        compteur: "3000",
        commentaire: "commentaire 1",
        montant: "300 MAD",
      },
      {
        id: 2,
        vehicule: "HYUNDAI",
        garage: "aaa",
        dateEnvoieReparation: "2021-10-14	",
        compteur: "3000",
        commentaire: "commentaire 2",
        montant: "300 MAD",
      },
      {
        id: 3,
        vehicule: "TOYOTA",
        garage: "aaa",
        dateEnvoieReparation: "2021-10-14	",
        compteur: "3000",
        commentaire: "commentaire 3",
        montant: "300 MAD",
      },
    ];
  }

  displayTab(id: number) {
    this.tabID = id;
  }

}
