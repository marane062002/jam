
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableau-bord-parcAuto',
  templateUrl: './tableau-bord-parcAuto.component.html',
  styleUrls: ['./tableau-bord-parcAuto.component.scss']
})
export class TableauBordParcAutoComponent implements OnInit {

  chartsOption: any = {
    color: ['#324987', '#4e6298', '#5d72a9'],
    tooltip: {
      show: true,
      backgroundColor: 'rgba(0, 0, 0, .8)',
    },
    series: [
      {
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: [
          {
            value: 48,
            name: 'Véhicules/jour',
          },
          {
            value: 310,
            name: 'Carburant/jour',
          },
          {
            value: 234,
            name: 'Carte autoroute/jour',
          },
        ],
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

}
