import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';

import * as _ from 'lodash';
import * as $ from "jquery";
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { Location } from '@angular/common';
import { NatureService } from '../../../../../shared/Nature.service';
@Component({
  selector: 'kt-show-nature',
  templateUrl: './show-nature.component.html',
  styleUrls: ['./show-nature.component.scss']
})
export class ShowNatureComponent implements OnInit {
  language = localStorage.getItem('language');
  id;
  programme
 

  constructor(private router: Router,private location:Location,
    private translate: TranslateService,

    private fB: FormBuilder,
    private activatedRoute: ActivatedRoute,private service : NatureService) {}

  nature_Id
  nature
  ngOnInit() {

    localStorage.removeItem("eventCC");
    localStorage.removeItem("eventCP");
    this.activatedRoute.queryParams.subscribe(params => {
      this.nature_Id = params['id'];

      
   
        this.service.findById(this.nature_Id).subscribe((res: any) => {
       
        this.nature=res
    
          

        }, err => {
          console.log(err);
        })
      }
    
    
    );


  }


}
