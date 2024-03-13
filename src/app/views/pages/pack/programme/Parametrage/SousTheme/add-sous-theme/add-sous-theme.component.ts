import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';

import * as _ from 'lodash';

import { themeService } from '../../../../../shared/theme.service';
import { sousThemeService } from '../../../../../shared/sous-theme.service';
import { NatureService } from '../../../../../shared/Nature.service';
@Component({
  selector: 'kt-add-sous-theme',
  templateUrl: './add-sous-theme.component.html',
  styleUrls: ['./add-sous-theme.component.scss']
})
export class AddSousThemeComponent implements OnInit {
  arabicPattern = /^[\u0600-\u06FF\s]+$/;


  language = localStorage.getItem('language');
  formGroup: FormGroup;


  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute, private service: sousThemeService,private Themeservice:themeService,private Natureservice:NatureService) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      libelleArab: new FormControl(''),
      libelleFrancais: new FormControl(''),
      theme:new FormGroup({
        id: new FormControl("", Validators.required),
      }),
      nature:new FormGroup({
        id: new FormControl("", Validators.required),
      }),
    });


  }

  nature_Id
  isUpdate
  themes
  natures
  ngOnInit() {
    this.Natureservice.findAll().then((res)=>{
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
  NatureChange(e){
    this.Themeservice.findByNature_Id(e).subscribe((res)=>{
      this.themes=res
      
    })
  }

  onSubmit() {

    let e={
      libelleArab:this.formGroup.value.libelleArab,
      libelleFrancais:this.formGroup.value.libelleFrancais,
      theme:[this.formGroup.value.theme],
    
    }
    this.service.save(e).subscribe((res: any) => {

      Swal.fire({
        icon: 'success',
        title: ' été bien enregistré',
        showConfirmButton: false,
        timer: 1500
      })

      this.router.navigate(['/programme/list-sous-theme']);
    }, err => {
      console.log(err)
    })
  }




}
