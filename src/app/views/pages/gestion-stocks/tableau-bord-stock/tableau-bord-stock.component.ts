import { Component, OnInit } from '@angular/core';
import { TableauDordService } from '../../../../core/_base/layout/services/tableau-dord.service';

@Component({
  selector: 'tableau-bord-stock',
  templateUrl: './tableau-bord-stock.component.html',
  styleUrls: ['./tableau-bord-stock.component.scss']
})
export class TableauBordStockComponent implements OnInit {
  donnesStatistique:any=null;
 

  constructor(private tbleauDordService:TableauDordService) {}

  ngOnInit(): void {
   
  }

}
