import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';

import * as _ from 'lodash';

import { NatureService } from '../../../../../shared/Nature.service';
import { themeService } from '../../../../../shared/theme.service';
@Component({
  selector: 'kt-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.scss']
})
export class AddThemeComponent implements OnInit {
  arabicPattern = /^[\u0600-\u06FF\s]+$/;


  language = localStorage.getItem('language');
  formGroup: FormGroup;


  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute, private natureService: NatureService,private service:themeService) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      libelleArab: new FormControl(''),
      libelleFrancais: new FormControl(''),
      nature:new FormGroup({
        id: new FormControl("", Validators.required),
      }),
    });


  }

  nature_Id
  isUpdate
  natures
  ngOnInit() {
    this.natureService.findAll().then((res)=>{
this.natures=res
    })

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
let e={
  libelleArab:this.formGroup.value.libelleArab,
  libelleFrancais:this.formGroup.value.libelleFrancais,
  nature:[this.formGroup.value.nature],

}

    this.service.save(e).subscribe((res: any) => {

      Swal.fire({
        icon: 'success',
        title: ' été bien enregistré',
        showConfirmButton: false,
        timer: 1500
      })

      this.router.navigate(['/programme/list-theme']);
    }, err => {
      console.log(err)
    })
  }




}
