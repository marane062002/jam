import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { HttpResponse } from '@angular/common/http';
import { HangarService } from '../../../marcheGros/Service/hangar.service';
import { Hangar } from "../../../../../core/_base/layout/models/Hangar";
import { MatDialog} from '@angular/material';
import { RecettesParPeriodeEtCarreauModalComponent } from '../recettes-par-periode-et-carreau-modal/recettes-par-periode-et-carreau-modal.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'kt-recettes-par-periode-et-carreau',
  templateUrl: './recettes-par-periode-et-carreau.component.html',
  styleUrls: ['./recettes-par-periode-et-carreau.component.scss']
})
export class RecettesParPeriodeEtCarreauComponent implements OnInit {

  language=localStorage.getItem('language');

  
  today: number = Date.now();
  Hangar: Hangar[];

  PeriodeForm = new FormGroup({
    transactionNumber: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    transactionTime: new FormControl(this.getCurrentDateTime()),
    transactionEnd: new FormControl("",Validators.required),
    transactionDebut: new FormControl("",Validators.required),
    transactionAmount: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    transactionDate: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    numTransaction: new FormControl("", [Validators.required, Validators.minLength(5)]),
    heureTransaction: new FormControl("", [Validators.required, Validators.minLength(5)]),
    sommeTransaction: new FormControl("", [Validators.required, Validators.minLength(5)]),
    partDue: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    partCarreau: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    partCommune: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    prenomUser: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    hangar: new FormGroup({
      id: new FormControl("", Validators.required),
    }),
  });
  getCurrentDateTime(): string {
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());

    return `${dayOfWeek} ${day} ${month} ${year} ${hours}:${minutes}`;
  }

  getCurrentDateTimeArabic(): string {
    const daysOfWeek = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
  
    return `${dayOfWeek} ${day} ${month} ${year} ${hours}:${minutes}`;
  }
  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
  constructor(private translate: TranslateService,
    private dialogRef: MatDialog,
    private hangarService: HangarService,) {
  }
  currentTime: string;
  ngOnInit() {
    this.PeriodeForm.controls['transactionTime'].setValue(this.getCurrentDateTime());
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.language = "ar";
			} else if (event.lang == "fr") {
				this.language = "fr";
			}
		});
    if(this.language=='fr'){
    this.currentTime = this.getCurrentDateTime();

    setInterval(() => {
      this.currentTime = this.getCurrentDateTime();
    }, 60000);
  }
    if(this.language=='ar'){
    this.currentTime = this.getCurrentDateTimeArabic();

    setInterval(() => {
      this.currentTime = this.getCurrentDateTimeArabic();
    }, 60000);
  }

    this.hangarService.getAllHangars().subscribe({
      next: (res: HttpResponse<Hangar[]>) => {
        this.Hangar = res.body;
        console.log("hangar", this.Hangar);
      },

      error: () => { },
    });
  }
  toggleCheckbox(controlName: string) {
    const control = this.PeriodeForm.get(controlName);

    if (control) {
      control.setValue(!control.value);
      if (control.value) {
        control.enable();
      } else {
        control.enable();
      }
    }
  }

  openModal() {
    if (this.PeriodeForm.value.transactionDebut!='' && this.PeriodeForm.value.transactionEnd!='' && this.PeriodeForm.value.timeFin!='') {
      this.dialogRef.open(RecettesParPeriodeEtCarreauModalComponent, {
        data: { recettesParPeriodeCarreau: this.PeriodeForm,language:this.language},
      });
    }
  }

}