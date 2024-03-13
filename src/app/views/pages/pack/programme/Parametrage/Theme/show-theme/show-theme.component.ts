import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';

import * as _ from 'lodash';
import * as $ from "jquery";
import { Observable } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { Location } from '@angular/common';
import { themeService } from '../../../../../shared/theme.service';
@Component({
  selector: 'kt-show-theme',
  templateUrl: './show-theme.component.html',
  styleUrls: ['./show-theme.component.scss']
})
export class ShowThemeComponent implements OnInit {
  checkLang = window.localStorage.getItem("language");
  id;
  programme
 

  constructor(private router: Router,private location:Location,
    private translate: TranslateService,

    private fB: FormBuilder,
    private activatedRoute: ActivatedRoute,private service : themeService) {}

  theme_Id
  theme
  ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
			  this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
			  this.checkLang = 'fr';
			}
		  });

    this.activatedRoute.queryParams.subscribe(params => {
      this.theme_Id = params['id'];

      
   
        this.service.findById(this.theme_Id).subscribe((res: any) => {
       
        this.theme=res
    
          

        }, err => {
          console.log(err);
        })
      }
    
    
    );


  }


}
