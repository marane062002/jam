import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';

import { NatureService } from '../../../../../shared/Nature.service';
import { sousThemeService } from '../../../../../shared/sous-theme.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'kt-show-sous-theme',
  templateUrl: './show-sous-theme.component.html',
  styleUrls: ['./show-sous-theme.component.scss']
})
export class ShowSousThemeComponent implements OnInit {
  checkLang = localStorage.getItem('language');
  id;
  programme
 

  constructor( private activatedRoute: ActivatedRoute,private service : sousThemeService  ,  private translate: TranslateService,
    ) {}

  soustheme_Id
  soustheme
  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
			  this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
			  this.checkLang = 'fr';
			}
		  });
    this.activatedRoute.queryParams.subscribe(params => {
      this.soustheme_Id = params['id'];
        this.service.findById(this.soustheme_Id).subscribe((res: any) => {
        this.soustheme=res
        }, err => {
          console.log(err);
        })
      }
    
    
    );


  }


}
