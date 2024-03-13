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
import { NatureService } from '../../../../../../../views/pages/shared/Nature.service';
@Component({
  selector: 'kt-add-nature',
  templateUrl: './add-nature.component.html',
  styleUrls: ['./add-nature.component.scss']
})
export class AddNatureComponent implements OnInit {
  arabicPattern = /^[\u0600-\u06FF\s]+$/;


  language = localStorage.getItem('language');
  formGroup: FormGroup;


  constructor(private router: Router, private location: Location,
    private translate: TranslateService,

    private fB: FormBuilder,
    private activatedRoute: ActivatedRoute, private service: NatureService) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      libelleArab: new FormControl(''),
      libelleFrancais: new FormControl(''),

    });


  }

  nature_Id
  isUpdate
  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.nature_Id = params['id'];


      if (this.nature_Id != undefined && this.nature_Id != 0) {
        this.isUpdate = true;
        this.service.findById(this.nature_Id).subscribe((res: any) => {


          this.formGroup.patchValue(_.pickBy(res));




        }, err => {
          console.log(err);
        })
      }

    }
    );


  }


  onSubmit() {


    this.service.save(this.formGroup.value).subscribe((res: any) => {

      Swal.fire({
        icon: 'success',
        title: ' été bien enregistré',
        showConfirmButton: false,
        timer: 1500
      })

      this.router.navigate(['/programme/list-nature']);
    }, err => {
      console.log(err)
    })
  }




}
