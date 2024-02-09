import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-souche',
  templateUrl: './position-souche.component.html',
  styleUrls: ['./position-souche.component.scss']
})
export class PositionSoucheComponent implements OnInit {

  souches:any[];

  constructor() { }

  ngOnInit() {
    this.souches=[
      {
        "reference":"01",
        "date":"14/10/2021",
        "montant":"200",
        "prixUnitaire":"1100 MAD",
        "l":"200",
        "km":"3000",
      }
    ]
  }

}
