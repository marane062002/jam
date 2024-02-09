import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Import the necessary modules for FormBuilder and FormGroup
import { HangarService } from '../../../marcheGros/Service/hangar.service';
import { Hangar } from "../../../../../core/_base/layout/models/Hangar";
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PeseeService } from '../../../pesee/Services/pesee.service';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '../../../utils/spinner.service';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";



@Component({
  selector: 'kt-calcul-dix-jours-modal',
  templateUrl: './calcul-dix-jours-modal.component.html',
  styleUrls: ['./calcul-dix-jours-modal.component.scss'],
})
export class CalculDixJoursModalComponent implements OnInit {

  today: number = Date.now();

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataPesee: any;

  displayedColumnsALL: string[] = ["jour", "nbreTransactions", "totalTransactions", "part1", "part2", "part3"];

  displayedColumns1: string[] = ["jour", "totalTransactions", "part1", "part2", "part3"];
  displayedColumns2: string[] = ["jour", "nbreTransactions", "part1", "part2", "part3"];
  displayedColumns3: string[] = ["jour", "nbreTransactions", "totalTransactions", "part2", "part3"];
  displayedColumns4: string[] = ["jour", "nbreTransactions", "totalTransactions", "part1", "part3"];
  displayedColumns5: string[] = ["jour", "nbreTransactions", "totalTransactions", "part1", "part2"];

  displayedColumns6: string[] = ["jour", "part1", "part2", "part3"];
  displayedColumns7: string[] = ["jour", "totalTransactions", "part2", "part3"];
  displayedColumns8: string[] = ["jour", "totalTransactions", "part1", "part3"];
  displayedColumns9: string[] = ["jour", "totalTransactions", "part1", "part2"];
  displayedColumns10: string[] = ["jour", "nbreTransactions", "part2", "part3"];
  displayedColumns11: string[] = ["jour", "nbreTransactions", "part1", "part3"];
  displayedColumns12: string[] = ["jour", "nbreTransactions", "part1", "part2"];
  displayedColumns13: string[] = ["jour", "nbreTransactions", "totalTransactions", "part3"];
  displayedColumns14: string[] = ["jour", "nbreTransactions", "totalTransactions", "part2",];
  displayedColumns15: string[] = ["jour", "nbreTransactions", "totalTransactions", "part1",];


  displayedColumns16: string[] = ["jour", "part2", "part3"];
  displayedColumns17: string[] = ["jour", "part1", "part3"];
  displayedColumns18: string[] = ["jour", "part1", "part2"];
  displayedColumns19: string[] = ["jour", "nbreTransactions", "part3"];
  displayedColumns20: string[] = ["jour", "nbreTransactions", "part2"];
  displayedColumns21: string[] = ["jour", "totalTransactions", "part3"];
  displayedColumns22: string[] = ["jour", "nbreTransactions", "totalTransactions"];
  displayedColumns23: string[] = ["jour", "nbreTransactions", "part1"];
  displayedColumns24: string[] = ["jour", "totalTransactions", "part1"];
  displayedColumns25: string[] = ["jour", "totalTransactions", "part2"];


  displayedColumns26: string[] = ["jour", "part3"];
  displayedColumns27: string[] = ["jour", "part2"];
  displayedColumns28: string[] = ["jour", "nbreTransactions"];
  displayedColumns29: string[] = ["jour", "part1"];
  displayedColumns30: string[] = ["jour", "totalTransactions"];

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
  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
  constructor(
    private peseeService: PeseeService,
    private translate: TranslateService,
    private spinnerService: SpinnerService,
    private dialogRef:MatDialogRef<CalculDixJoursModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { calculDixJours: any }
   ) {
  }
  currentTime: string;
  ngOnInit() {
    this.calculForm=this.data.calculDixJours;
    if (this.calculForm.value.timeDebut != '' && this.calculForm.value.hangar.id != '') {
      this.apply();
    }
    this.calculForm.controls['transactionTime'].setValue(this.getCurrentDateTime());

    this.currentTime = this.getCurrentDateTime();

    setInterval(() => {
      this.currentTime = this.getCurrentDateTime();
    }, 60000);
  }

  isAllTrue

  isNotNbTransactions: boolean = false;
  isNotTotalTransaction: boolean = false;
  isNotPart1: boolean = false;
  isNotPart2: boolean = false;
  isNotPart3: boolean = false;

  isNotNbTransactionsAndIsNotTotalTransaction: boolean = false;
  isNotNbTransactionsAndIsNotPart1: boolean = false;
  isNotNbTransactionsAndIsNotPart2: boolean = false;
  isNotNbTransactionsAndIsNotPart3: boolean = false;
  isNotTotalTransactionAndIsNotPart1: boolean = false;
  isNotTotalTransactionAndIsNotPart2: boolean = false;
  isNotTotalTransactionAndIsNotPart3: boolean = false;
  isNotPart1AndIsNotPart2: boolean = false;
  isNotPart1AndIsNotPart3: boolean = false;
  isNotPart2AndIsNotPart3: boolean = false;

  isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1: boolean = false;
  isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2: boolean = false;
  isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3: boolean = false;
  isNotTotalTransactionAndIsNotPart1AndIsNotPart2: boolean = false;
  isNotTotalTransactionAndIsNotPart1AndIsNotPart3: boolean = false;
  isNotNbTransactionsAndIsNotPart1AndIsNotPart2: boolean = false;
  isNotPart1AndIsNotPart2AndIAndIsNotPart3: boolean = false;
  isNotTotalTransactionAndIsNotPart2AndIsNotPart3: boolean = false;
  isNotNbTransactionsAndIsNotPart2AndIsNotPart3: boolean = false;
  isNotNbTransactionsAndIsNotPart1AndIsNotPart3: boolean = false;

  isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2: boolean = false;
  isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3: boolean = false;
  isNotTotalTransactionisNotPart1isNotPart2isNotPart3: boolean = false;
  isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3: boolean = false;
  isNotNbTransactionsisNotPart1isNotPart2isNotPart3: boolean = false;

  apply() {
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const daysOfWeek = [
      'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
    ];
    let date1 = this.calculForm.get('timeDebut').value;
    let idHangar = this.calculForm.value.hangar.id;
    let lastJour;
    let sumJour = 0;
    let sumNbTransactions = 0;
    let sumTotalTransactions = 0;
    let sumPart1 = 0;
    let sumPart2 = 0;
    let sumPart3 = 0;
    let data;
    let resultObject;
    if (date1 != '') {
      this.peseeService.getRessourceByIdHangarAndDateDebut('getAllPeseesByHangarAndDateDebut/', idHangar, date1).subscribe(res => {
        console.log(res);
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == true) {
          this.isAllTrue = true;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumTotalTransactions: sumTotalTransactions,
            sumPart1: sumPart1,
            sumPart2: sumPart2,
            sumPart3: sumPart3,
          };
        }



        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = true;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumTotalTransactions: sumTotalTransactions,
            sumPart1: sumPart1,
            sumPart2: sumPart2,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = true;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumPart1: sumPart1,
            sumPart2: sumPart2,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = true;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumTotalTransactions: sumTotalTransactions,
            sumPart2: sumPart2,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = true;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumTotalTransactions: sumTotalTransactions,
            sumPart1: sumPart1,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = true;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumTotalTransactions: sumTotalTransactions,
            sumPart1: sumPart1,
            sumPart2: sumPart2,
          };
        }



        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = true;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumPart1: sumPart1,
            sumPart2: sumPart2,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = true;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              totalTransactions: +parseInt(totalTransactions),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumTotalTransactions: sumTotalTransactions,
            sumPart2: sumPart2,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = true;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumTotalTransactions: sumTotalTransactions,
            sumPart1: sumPart1,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = true;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumTotalTransactions: sumTotalTransactions,
            sumPart1: sumPart1,
            sumPart2: sumPart2,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = true;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumPart2: sumPart2,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = true;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              part1: +parseInt(part1),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumPart1: sumPart1,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = true;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              part1: +parseInt(part1),
              part2: +parseInt(part2),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumPart1: sumPart1,
            sumPart2: sumPart2,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = true;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumTotalTransactions: sumTotalTransactions,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = true;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part2: +parseInt(part2),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumTotalTransactions: sumTotalTransactions,
            sumPart2: sumPart2,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = true;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumTotalTransactions: sumTotalTransactions,
            sumPart1: sumPart1,
          };
        }



        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = true;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              part2: +parseInt(part2),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumPart2: sumPart2,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = true;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              part1: +parseInt(part1),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumPart1: sumPart1,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = true;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              part1: +parseInt(part1),
              part2: +parseInt(part2)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumPart1: sumPart1,
            sumPart2: sumPart2,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = true;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = true;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              part2: +parseInt(part2),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumPart2: sumPart2,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = true;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              totalTransactions: +parseInt(totalTransactions),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumTotalTransactions: sumTotalTransactions,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = true;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              totalTransactions: +parseInt(totalTransactions),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumTotalTransactions: sumTotalTransactions,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = true;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
              part1: +parseInt(part1),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
            sumPart1: sumPart1,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = true;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              totalTransactions: +parseInt(totalTransactions),
              part1: +parseInt(part1)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumTotalTransactions: sumTotalTransactions,
            sumPart1: sumPart1,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = true;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              totalTransactions: +parseInt(totalTransactions),
              part2: +parseInt(part2),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumTotalTransactions: sumTotalTransactions,
            sumPart2: sumPart2,
          };
        }



        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == true && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = true;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              part3: +parseInt(part3)
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumPart3: sumPart3,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == true) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = true;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              part2: +parseInt(part2),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumPart2: sumPart2,
          };
        }
        if (this.calculForm.value.transactionNumber == true && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = true;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              nbreTransactions: +parseInt(nbreTransactions),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumNbTransactions: sumNbTransactions,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == false && this.calculForm.value.partDue == true && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = true;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = false;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              part1: +parseInt(part1),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumPart1: sumPart1,
          };
        }
        if (this.calculForm.value.transactionNumber == false && this.calculForm.value.transactionAmount == true && this.calculForm.value.partDue == false && this.calculForm.value.partCarreau == false && this.calculForm.value.partCommune == false) {
          this.isAllTrue = false;

          this.isNotNbTransactions = false;
          this.isNotTotalTransaction = false;
          this.isNotPart1 = false;
          this.isNotPart2 = false;
          this.isNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransaction = false;
          this.isNotNbTransactionsAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1 = false;
          this.isNotTotalTransactionAndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart3 = false;
          this.isNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart3 = false;
          this.isNotPart2AndIsNotPart3 = false;

          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart1 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart2 = false;
          this.isNotNbTransactionsAndIsNotTotalTransactionAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart2 = false;
          this.isNotTotalTransactionAndIsNotPart1AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart2 = false;
          this.isNotPart1AndIsNotPart2AndIAndIsNotPart3 = false;
          this.isNotTotalTransactionAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart2AndIsNotPart3 = false;
          this.isNotNbTransactionsAndIsNotPart1AndIsNotPart3 = false;

          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart2 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart1isNotPart3 = false;
          this.isNotTotalTransactionisNotPart1isNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotTotalTransactionisNotPart2isNotPart3 = false;
          this.isNotNbTransactionsisNotPart1isNotPart2isNotPart3 = true;
          data = res.map((str) => {
            const [jour, nbreTransactions, totalTransactions, part1, part2, part3] = str.split(',');
            const inputDate = new Date(jour);
            sumJour += 1;
            sumNbTransactions += parseInt(nbreTransactions);
            sumTotalTransactions += parseInt(totalTransactions);
            sumPart1 += parseInt(part1);
            sumPart2 += parseInt(part2)
            sumPart3 += parseInt(part3);
            return {
              jour: daysOfWeek[inputDate.getDay()] + ' ' + inputDate.getDate() + ' ' + months[inputDate.getMonth()] + ' ' + inputDate.getFullYear(),
              totalTransactions: +parseInt(totalTransactions),
            };
          });
          lastJour = data[data.length - 1].jour;
          resultObject = {
            idHangar: idHangar,
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: this.transformDate(lastJour),
            data: data,
            sumJour: sumJour,
            sumTotalTransactions: sumTotalTransactions,
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

  toPrint: any;
  Recu(): void {
    this.toPrint = this.dataPesee;
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
        PDF.save("Calcul sur période de 10 jours" + ".pdf");
        this.spinnerService.stop(spinnerRef);
      });
    }, 250);
  }



  close() {
    this.dialogRef.close();
  }
}