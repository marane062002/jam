import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { HangarService } from '../../../marcheGros/Service/hangar.service';
import { Hangar } from "../../../../../core/_base/layout/models/Hangar";
import { MatDialog} from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalculDixJoursModalComponent } from '../calcul-dix-jours-modal/calcul-dix-jours-modal.component';



@Component({
  selector: 'kt-calcul-dix-jours',
  templateUrl: './calcul-dix-jours.component.html',
  styleUrls: ['./calcul-dix-jours.component.scss'],
})
export class CalculDixJoursComponent implements OnInit {
  language=localStorage.getItem('language');

  today: number = Date.now();
  Hangar: Hangar[];

  calculForm = new FormGroup({
    transactionNumber: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    transactionTime: new FormControl(this.getCurrentDateTime()),
    timeDebut: new FormControl('', Validators.required),
    transactionAmount: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    numTransaction: new FormControl('', [Validators.required, Validators.minLength(5)]),
    heureTransaction: new FormControl('', [Validators.required, Validators.minLength(5)]),
    sommeTransaction: new FormControl('', [Validators.required, Validators.minLength(5)]),
    partDue: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    partCarreau: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    partCommune: new FormControl(true, [Validators.required, Validators.minLength(5)]),
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

  getCurrentDateTimeForArabic(): string {
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
  constructor(
    private hangarService: HangarService,
    private dialogRef: MatDialog) {
  }
  currentTime: string;
  ngOnInit() {
    this.calculForm.controls['transactionTime'].setValue(this.getCurrentDateTime());

    if(this.language=='fr'){
      this.currentTime = this.getCurrentDateTime();
      setInterval(() => {
        this.currentTime = this.getCurrentDateTime();
      }, 60000);
    }

    if(this.language=='ar'){
      this.currentTime = this.getCurrentDateTimeForArabic();
      setInterval(() => {
        this.currentTime = this.getCurrentDateTimeForArabic();
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
    const control = this.calculForm.get(controlName);

    if (control) {
      control.setValue(!control.value);
      if (control.value) {
        control.enable();
      } else {
        control.enable();
      }
    }
  }


  transformDate(inputDate: string): string {
    const dateParts = inputDate.split(' ');
    const day = dateParts[1];
    const month = dateParts[2];
    const year = dateParts[3];
    if (parseInt(day) < 10) {
      return '0' + day + '-' + this.getMonthNumber(month) + '-' + year;
    }
    else {
      return day + '-' + this.getMonthNumber(month) + '-' + year;
    }
  }

  getMonthNumber(monthName: string): string {
    const months = {
      janvier: '01', février: '02', mars: '03', avril: '04',
      mai: '05', juin: '06', juillet: '07', août: '08',
      septembre: '09', octobre: '10', novembre: '11', décembre: '12'
    };

    return months[monthName.toLowerCase()];
  }


  openModal() {
    if (this.calculForm.value.timeDebut != '' && this.calculForm.value.hangar.id != '') {
      this.dialogRef.open(CalculDixJoursModalComponent, {
        data: { calculDixJours: this.calculForm},
      });
    }
  }
}