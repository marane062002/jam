import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Import the necessary modules for FormBuilder and FormGroup
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '../../../utils/spinner.service';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { parse } from 'path';
import { DatePipe } from '@angular/common';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PeseeService } from '../../../pesee/Services/pesee.service';
import { TransactionsModalComponent } from '../transactions-modal/transactions-modal.component';
@Component({
  selector: 'kt-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  language=localStorage.getItem('language');

  today: number = Date.now();

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumnsALL: string[] = ["nOrdinal", "typeMarchandise", "quantite", "moyennePU", "somme"];

  displayedColumns1: string[] = ["typeMarchandise", "quantite", "moyennePU", "somme"];
  displayedColumns2: string[] = ["nOrdinal", "quantite", "moyennePU", "somme"];
  displayedColumns3: string[] = ["nOrdinal", "typeMarchandise", "moyennePU", "somme"];
  displayedColumns4: string[] = ["nOrdinal", "typeMarchandise", "quantite", "somme"];
  displayedColumns5: string[] = ["nOrdinal", "typeMarchandise", "quantite", "moyennePU"];

  displayedColumns6: string[] = ["quantite", "moyennePU", "somme"];
  displayedColumns7: string[] = ["typeMarchandise", "moyennePU", "somme"];
  displayedColumns8: string[] = ["typeMarchandise", "quantite", "somme"];
  displayedColumns9: string[] = ["typeMarchandise", "quantite", "moyennePU"];
  displayedColumns10: string[] = ["nOrdinal", "moyennePU", "somme"];
  displayedColumns11: string[] = ["nOrdinal", "quantite", "somme"];
  displayedColumns12: string[] = ["nOrdinal", "quantite", "moyennePU"];
  displayedColumns13: string[] = ["nOrdinal", "typeMarchandise", "somme"];
  displayedColumns14: string[] = ["nOrdinal", "typeMarchandise", "moyennePU"];
  displayedColumns15: string[] = ["nOrdinal", "typeMarchandise", "quantite"];

  displayedColumns16: string[] = ["moyennePU", "somme"];
  displayedColumns17: string[] = ["quantite", "somme"];
  displayedColumns18: string[] = ["quantite", "moyennePU"];
  displayedColumns19: string[] = ["nOrdinal", "somme"];
  displayedColumns20: string[] = ["nOrdinal", "moyennePU"];
  displayedColumns21: string[] = ["typeMarchandise", "somme"];
  displayedColumns22: string[] = ["nOrdinal", "typeMarchandise"];
  displayedColumns23: string[] = ["nOrdinal", "quantite"];
  displayedColumns24: string[] = ["typeMarchandise", "quantite"];
  displayedColumns25: string[] = ["typeMarchandise", "moyennePU"];

  displayedColumns26: string[] = ["somme"];
  displayedColumns27: string[] = ["moyennePU"];
  displayedColumns28: string[] = ["nOrdinal"];
  displayedColumns29: string[] = ["quantite"];
  displayedColumns30: string[] = ["typeMarchandise"];

  dataPesee: any;

  transactionsForm = new FormGroup({
    transactionTime: new FormControl(this.getCurrentDateTime()),
    timeDebut: new FormControl('', Validators.required),
    timeFin: new FormControl('', Validators.required),
    numeroOrdinal: new FormControl(true, [Validators.required,]),
    typeMarch: new FormControl(true, [Validators.required,]),
    poidMarch: new FormControl(true, [Validators.required,]),
    moyPrix: new FormControl(true, [Validators.required,]),
    total: new FormControl(true, [Validators.required,]),

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
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialog,
    private modalService: NgbModal,
    private translate: TranslateService,
    private spinnerService: SpinnerService,
    private peseeService: PeseeService,
    private datePipe: DatePipe) {
  }
  currentTime: string;
  ngOnInit() {
    this.transactionsForm.controls['transactionTime'].setValue(this.getCurrentDateTime());
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


  }
  toggleCheckbox(controlName: string) {
    const control = this.transactionsForm.get(controlName);

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
    if (this.transactionsForm.value.timeDebut != '' && this.transactionsForm.value.timeFin != '') {
      this.dialogRef.open(TransactionsModalComponent, {
        width:'100%',
        data: { transactions: this.transactionsForm },
        panelClass: 'custom-modalbox'
      });
    }
  }

}
