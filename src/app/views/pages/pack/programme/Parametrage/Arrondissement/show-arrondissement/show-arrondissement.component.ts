import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';

import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ArrondissementService } from '../../../../../shared/arrondissement.service';
@Component({
  selector: 'kt-show-arrondissement',
  templateUrl: './show-arrondissement.component.html',
  styleUrls: ['./show-arrondissement.component.scss']
})
export class ShowArrondissementComponent implements OnInit {
  checkLang = localStorage.getItem('language');
  id;
  programme
 

  constructor( private activatedRoute: ActivatedRoute,private service : ArrondissementService  ,  private translate: TranslateService,
    ) {}

  arrondissementId
  arrondissement
  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
			  this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
			  this.checkLang = 'fr';
			}
		  });
    this.activatedRoute.queryParams.subscribe(params => {
      this.arrondissementId = params['id'];
        this.service.findById(this.arrondissementId).subscribe((res: any) => {
        this.arrondissement=res
        }, err => {
          console.log(err);
        })
      }
    
    
    );


  }


}
