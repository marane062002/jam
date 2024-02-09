import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { HangarService } from '../../../marcheGros/Service/hangar.service';
import { Hangar } from "../../../../../core/_base/layout/models/Hangar";
import { MatDialog } from '@angular/material';
import { NombreParGenreEtQuantiteModalComponent } from '../nombre-par-genre-et-quantite-modal/nombre-par-genre-et-quantite-modal.component';
@Component({
  selector: 'kt-nombre-par-genre-et-quantite',
  templateUrl: './nombre-par-genre-et-quantite.component.html',
  styleUrls: ['./nombre-par-genre-et-quantite.component.scss']
})
export class NombreParGenreEtQuantiteComponent implements OnInit {

  language = localStorage.getItem('language');

  today: number = Date.now();
  Hangar: Hangar[];

  nombreForm = new FormGroup({
    transactionTime: new FormControl(this.getCurrentDateTime()),
    timeDebut: new FormControl('', Validators.required),
    timeFin: new FormControl('', Validators.required),
    genreVehicule: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    totalMarchandise: new FormControl(true, [Validators.required, Validators.minLength(5)]),
    nombreVehicule: new FormControl(true, [Validators.required, Validators.minLength(5)]),

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
  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
  constructor(
    private hangarService: HangarService,
    private dialogRef: MatDialog) {
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


  currentTime: string;
  ngOnInit() {
    this.nombreForm.controls['transactionTime'].setValue(this.getCurrentDateTime());

    if (this.language == 'fr') {
      this.currentTime = this.getCurrentDateTime();

      setInterval(() => {
        this.currentTime = this.getCurrentDateTime();
      }, 60000);
    }
    if (this.language == 'ar') {
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
    const control = this.nombreForm.get(controlName);

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
    if (this.nombreForm.value.timeDebut != '' && this.nombreForm.value.timeFin != '' && this.nombreForm.value.hangar.id != '') {
      this.dialogRef.open(NombreParGenreEtQuantiteModalComponent, {
        data: { nombreParGenresQantites: this.nombreForm },
      });
    }
  }
}