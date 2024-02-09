import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Import the necessary modules for FormBuilder and FormGroup
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '../../../utils/spinner.service';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PeseeService } from '../../../pesee/Services/pesee.service';
import { TmplAstRecursiveVisitor } from '@angular/compiler';

@Component({
  selector: 'kt-transactions-modal',
  templateUrl: './transactions-modal.component.html',
  styleUrls: ['./transactions-modal.component.scss'],
})
export class TransactionsModalComponent implements OnInit {

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

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
  constructor(
    private translate: TranslateService,
    private spinnerService: SpinnerService,
    private peseeService: PeseeService,
    private dialogRef: MatDialogRef<TransactionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { transactions: any }
  ) {
  }
  currentTime: string;
  ngOnInit() {
    this.transactionsForm = this.data.transactions;
    if (this.transactionsForm.value.timeDebut != '' && this.transactionsForm.value.timeFin != '') {
      this.apply();
    }
    this.transactionsForm.controls['transactionTime'].setValue(this.getCurrentDateTime());

    this.currentTime = this.getCurrentDateTime();

    setInterval(() => {
      this.currentTime = this.getCurrentDateTime();
    }, 60000);


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

  onSubmit() {

  }

  resetForm() {

  }

  isAllTrue: boolean = false;

  isNotNumOrdinal: boolean = false;
  isNotTypeMarch: boolean = false;
  isNotQuantite: boolean = false;
  isNotMoyennePU: boolean = false;
  isNotSomme: boolean = false;

  isNotNumOrdinalAndIsNotTypeMarch: boolean = false;
  isNotNumOrdinalAndIsNotQuantite: boolean = false;
  isNotNumOrdinalAndIsNotMoyennePU: boolean = false;
  isNotNumOrdinalAndIsNotSomme: boolean = false;
  isNotTypeMarchAndIsNotQuantite: boolean = false;
  isNotTypeMarchAndIsNotMoyennePU: boolean = false;
  isNotTypeMarchAndIsNotSomme: boolean = false;
  isNotQuantiteAndIsNotMoyennePU: boolean = false;
  isNotQuantiteAndIsNotSomme: boolean = false;
  isNotMoyennePUAndIsNotSomme: boolean = false;

  isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite: boolean = false;
  isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU: boolean = false;
  isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme: boolean = false;
  isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU: boolean = false;
  isNotTypeMarchAndIsNotQuantiteAndIsNotSomme: boolean = false;
  isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal: boolean = false;
  isNotMoyennePUAndIsNotQuantiteAndIsNotSomme: boolean = false;
  isNotSommAndIsNotMoyennePUAndIsNotTypeMarch: boolean = false;
  isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal: boolean = false;
  isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme: boolean = false;

  isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU: boolean = false;
  isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme: boolean = false;
  isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme: boolean = false;
  isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme: boolean = false;
  isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme: boolean = false;


  apply() {
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const daysOfWeek = [
      'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
    ];
    let date1 = this.transactionsForm.get('timeDebut').value;
    let date2 = this.transactionsForm.get('timeFin').value;
    let sumQuantite = 0.0;
    let sumSomme = 0.0;
    let data;
    let resultObject;
    if (date1 != '' && date2 != '') {
      this.peseeService.getRessourceBetweenTwoDates('getAllPeseesBetweenTwoDates', date1, date2).subscribe(res => {
        console.log(res);
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == true) {
          this.isAllTrue = true;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              moyennePU: moyennePU,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }

        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = true;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              moyennePU: moyennePU,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = true;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              quantite: quantite,
              moyennePU: moyennePU,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = true;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              moyennePU: moyennePU,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = true;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = true;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              moyennePU: moyennePU,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }

        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = true;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              quantite: quantite,
              moyennePU: moyennePU,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = true;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              typeMarchandise: typeMarchandise,
              moyennePU: moyennePU,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = true;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = true;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              moyennePU: moyennePU,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = true;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              moyennePU: moyennePU,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = true;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              quantite: quantite,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = true;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              quantite: quantite,
              moyennePU: moyennePU,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = true;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = true;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              moyennePU: moyennePU,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = true;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              quantite: quantite,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }

        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = true;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              moyennePU: moyennePU,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = true;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              quantite: quantite,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = true;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              quantite: quantite,
              moyennePU: moyennePU,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = true;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = true;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              moyennePU: moyennePU,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = true;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              typeMarchandise: typeMarchandise,
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = true;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = true;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
              quantite: quantite,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = true;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              typeMarchandise: typeMarchandise,
              quantite: quantite,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = true;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              typeMarchandise: typeMarchandise,
              moyennePU: moyennePU,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
          };
        }

        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == true) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = true;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              somme: somme,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumSomme: sumSomme
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == true && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = true;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              moyennePU: moyennePU,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == true && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = true;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              nOrdinal: nOrdinal,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == false && this.transactionsForm.value.poidMarch == true && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = true;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              quantite: quantite,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sumQuantite: sumQuantite,
          };
        }
        if (this.transactionsForm.value.numeroOrdinal == false && this.transactionsForm.value.typeMarch == true && this.transactionsForm.value.poidMarch == false && this.transactionsForm.value.moyPrix == false && this.transactionsForm.value.total == false) {
          this.isAllTrue = false;

          this.isNotNumOrdinal = false;
          this.isNotTypeMarch = false;
          this.isNotQuantite = false;
          this.isNotMoyennePU = false;
          this.isNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarch = false;
          this.isNotNumOrdinalAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantite = false;
          this.isNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotSomme = false;
          this.isNotQuantiteAndIsNotMoyennePU = false;
          this.isNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantite = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotNumOrdinal = false;
          this.isNotMoyennePUAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotSommAndIsNotMoyennePUAndIsNotTypeMarch = false;
          this.isNotSommeAndIsNotMoyennePUAndIsNotNumOrdinal = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotSomme = false;

          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePU = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotQuantiteAndIsNotSomme = false;
          this.isNotTypeMarchAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotTypeMarchAndIsNotMoyennePUAndIsNotSomme = false;
          this.isNotNumOrdinalAndIsNotQuantiteAndIsNotMoyennePUAndIsNotSomme = true;

          data = res.map((str) => {
            const [nOrdinal, typeMarchandise, quantite, moyennePU, somme] = str.split(',');
            sumQuantite += parseFloat(quantite);
            sumSomme += parseFloat(somme);
            return {
              typeMarchandise: typeMarchandise,
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
          };
        }
        this.dataPesee = resultObject;
        this.dataSource = new MatTableDataSource(this.dataPesee.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

      })
    }
  }

  toPrint: any;
  toPrint1: any;
  toPrint2: any;
  stillHavePages:boolean= true;
  Recu(): void {
    console.log(this.toPrint);
    const itemsPerPage1 = 20;
    const itemsPerPage = 33;
    const totalItems = this.dataPesee.data.length;

    if (totalItems > itemsPerPage1) {
      this.toPrint1 = {
        currentTime: this.dataPesee.currentTime,
        data: this.dataPesee.data.slice(0, 20),
        dateDebut: this.dataPesee.dateDebut,
        dateFin: this.dataPesee.dateFin,
      };
      const PDF = new jsPDF("p", "mm", "a4");
      setTimeout(() => {
        const spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
        let dataIndex = 0;
        let i = 20;
        const generatePage = () => {
          const endIndex = Math.min(dataIndex + itemsPerPage, totalItems);
          if (dataIndex < totalItems) {
            this.toPrint2 = {
              data: this.dataPesee.data.slice(i, i + itemsPerPage),
              sumQuantite: this.dataPesee.sumQuantite,
              sumSomme: this.dataPesee.sumSomme
            };
            const elementId = dataIndex === 0 ? "htmlData1" : "htmlData2";
            const canvasPromise = html2canvas(document.getElementById(elementId), {});
            canvasPromise.then((canvas) => {
              const FILEURI = canvas.toDataURL("image/png");
              let fileWidth = PDF.internal.pageSize.getWidth();
              let fileHeight = (canvas.height * fileWidth) / canvas.width;
              if (dataIndex > 0) {
                PDF.addPage();
              }
              PDF.addImage(FILEURI, "PNG", 0, 0, fileWidth, fileHeight);
              dataIndex += itemsPerPage;
              i += 33;
              generatePage();
            });
          } else {
            PDF.save("Transactions.pdf");
            this.spinnerService.stop(spinnerRef);
          }
        };
        generatePage();
      }, 250);
    }
    else {
      this.toPrint = {
        currentTime: this.dataPesee.currentTime,
        data: this.dataPesee.data,
        dateDebut: this.dataPesee.dateDebut,
        dateFin: this.dataPesee.dateFin,
        sumQuantite: this.dataPesee.sumQuantite,
        sumSomme: this.dataPesee.sumSomme
      };
      setTimeout(() => {
        var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
        let DATA: any = document.getElementById("htmlData");

        html2canvas(DATA, {}).then((canvas) => {
          const FILEURI = canvas.toDataURL("image/png");
          let PDF = new jsPDF("p", "mm", "a4");
          let fileWidth = PDF.internal.pageSize.getWidth();
          let fileHeight = (canvas.height * fileWidth) / canvas.width;
          let position = 0;
          PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
          PDF.save("Transactions" + ".pdf");
          this.spinnerService.stop(spinnerRef);
        });
      }, 250);
    }
  }


  close() {
    this.dialogRef.close();
  }
}