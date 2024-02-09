import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Emballage, IEmballage } from '../../../../core/_base/layout/models/emballage';
import { EmballageService } from '../Service/emballage.service';
import { HangarService } from '../Service/hangar.service';

@Component({
  selector: 'kt-add-type-embalage',
  templateUrl: './modification-type-embalage.component.html',
  styleUrls: ['./modification-type-embalage.component.scss']
})
export class ModificationTypeEmbalageComponent implements OnInit {

  // loading:boolean=false
  emballageForm = new FormGroup({
    numEmballage: new FormControl('', [Validators.required]),
    categori: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    lib: new FormControl('', [Validators.required]),
    poidEmballage: new FormControl('', [Validators.required]),
    // numEmballage1: new FormControl('', [Validators.required]),
    // numEmballage2: new FormControl('', [Validators.required]),
    // numEmballageImm: new FormControl('', [Validators.required]),


  });

  // 	 emballage={
  // id:
  // 	 }

  isSelected: boolean = false
  constructor(private router: Router, protected EmbService: EmballageService, protected activatedRoute: ActivatedRoute, private translate: TranslateService) {
  }
  emb: any
  series: any[]
  ngOnInit() {
    this.series = [
      { idCity: 1, name: "أ" },
      { idCity: 2, name: "ب" },
      { idCity: 3, name: "ج" },
      { idCity: 4, name: "د" },
    ];
    this.activatedRoute.data.subscribe(({ emballage }) => {
    //   let num1 = emballage.numEmballage2;
    //   let num3 = emballage.numEmballageImm;
    //   let num = emballage.numEmballage1;
      this.emballageForm.patchValue({ ...emballage })
    //   this.emballageForm.patchValue({
    //     numEmballage2: num1,
    //     numEmballageImm: num3,
    //     numEmballage1: num,
    //   })
      console.log(this.emballageForm.value);
      this.emb = emballage
    });
    // this.emballageService.getById(this.data.id).subscribe((res)=>{
    // 	console.log(res);
    // 	this.emballageForm.patchValue({...res.body})
    // })
  }
  RetourEmbalages() {
    this.router.navigate(['marcheGros/list-type-embalage']);

  }
  editEmbalage() {

    let Emballage = {
      id: this.emb.id,
      // numEmballage: this.emballageForm.get("numEmballage").value,

      categori: this.emballageForm.get("categori").value,
      description: this.emballageForm.get("description").value,
      poidEmballage: this.emballageForm.get("poidEmballage").value,
      numEmballage: this.emballageForm.get("numEmballage").value,

    }

    const emballage = this.createFromForm();
    if (emballage !== undefined) {

      //   if (this.emballageForm.valid) {
      this.EmbService.update(Emballage).subscribe(
        (res) => {
          console.log('res ==> ', res.body);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: this.translate.instant(
              'PAGES.GENERAL.MSG_UPDATE_CONFIRMED'
            ),
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            this.router.navigate(['marcheGros/list-type-embalage']);
          });
        },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: this.translate.instant(
              'PAGES.GENERAL.MSG_UPDATE_NOCONFIRMED'
            ),
            showConfirmButton: false,
            timer: 1500,
          });
          console.log('error ===> ', error);
        }
      );

    }

  }

  protected createFromForm(): IEmballage {
    return {
      ...new Emballage(),
      numEmballage: this.emballageForm.get(['numEmballage'])!.value,
      categori: this.emballageForm.get(['categori'])!.value,
      description: this.emballageForm.get(['description'])!.value,
      poidEmballage: this.emballageForm.get(['poidEmballage'])!.value,
    }
  };
}

