import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '../../../utils/spinner.service';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PeseeService } from '../../../pesee/Services/pesee.service';
@Component({
  selector: 'kt-quantite-par-type-et-periode-modal',
  templateUrl: './quantite-par-type-et-periode-modal.component.html',
  styleUrls: ['./quantite-par-type-et-periode-modal.component.scss']
})
export class QuantiteParTypeEtPeriodeModalComponent implements OnInit {

  today: number = Date.now();

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumnsALL: string[] = ["nOrdinal", "typeMarchandise", "quantite", "somme"];

  displayedColumns1: string[] = ["typeMarchandise", "quantite", "somme"];
  displayedColumns2: string[] = ["nOrdinal", "quantite", "somme"];
  displayedColumns3: string[] = ["nOrdinal", "typeMarchandise", "somme"];
  displayedColumns4: string[] = ["nOrdinal", "typeMarchandise", "quantite"];

  displayedColumns5: string[] = ["quantite", "somme"];
  displayedColumns6: string[] = ["typeMarchandise", "somme"];
  displayedColumns7: string[] = ["typeMarchandise", "quantite"];
  displayedColumns8: string[] = ["nOrdinal", "somme"];
  displayedColumns9: string[] = ["nOrdinal", "quantite"];
  displayedColumns10: string[] = ["nOrdinal", "typeMarchandise"];

  displayedColumns11: string[] = ["somme"];
  displayedColumns12: string[] = ["quantite"];
  displayedColumns13: string[] = ["typeMarchandise"];
  displayedColumns14: string[] = ["nOrdinal"];

  dataPesee: any;

  quantiteForm = new FormGroup({
    numOrdinal: new FormControl(true, [Validators.required]),
    transactionTime: new FormControl(this.getCurrentDateTime()),
    transactionEnd: new FormControl('', Validators.required),
    transactionDebut: new FormControl('', Validators.required),
    somme: new FormControl(true, [Validators.required]),
    quantite: new FormControl(true, [Validators.required]),
    typeMarchandise: new FormControl(true, [Validators.required]),
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
    private translate: TranslateService,
    private spinnerService: SpinnerService,
    private peseeService: PeseeService,
    private dialogRef: MatDialogRef<QuantiteParTypeEtPeriodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { quantiteParTypeProduit: any },
  ) {
  }
  currentTime: string;
  ngOnInit() {
    this.quantiteForm = this.data.quantiteParTypeProduit;
    if (this.quantiteForm.value.transactionDebut != '' && this.quantiteForm.value.transactionEnd != '' && this.quantiteForm.value.timeFin != '') {
      this.apply();
    }
    this.quantiteForm.controls['transactionTime'].setValue(this.getCurrentDateTime());

    this.currentTime = this.getCurrentDateTime();

    setInterval(() => {
      this.currentTime = this.getCurrentDateTime();
    }, 60000);


  }

  isAllTrue: boolean = false;

  isNotNumOrdinal: boolean = false;
  isNotTypeMarchandise: boolean = false;
  isNotQuantite: boolean = false;
  isNotSomme: boolean = false;

  isNotNumOrdinalisNotTypeMarchandise: boolean = false;
  isNotNumOrdinalisNotQuantite: boolean = false;
  isNotNumOrdinalisNotSomme: boolean = false;
  isNotTypeMarchandiseisNotQuantite: boolean = false;
  isNotTypeMarchandiseisNotSomme: boolean = false;
  isNotQuantiteisNotSomme: boolean = false;

  isNotNumOrdinalisNotTypeMarchandiseisNotQuantite: boolean = false;
  isNotNumOrdinalisNotTypeMarchandiseisNotSomme: boolean = false;
  isNotNumOrdinalisNotQuantiteisNotSomme: boolean = false;
  isNotTypeMarchandiseisNotQuantiteisNotSomme: boolean = false;



  apply() {
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const daysOfWeek = [
      'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
    ];
    let date1 = this.quantiteForm.get('transactionDebut').value;
    let date2 = this.quantiteForm.get('transactionEnd').value;
    let idHangar = this.quantiteForm.value.hangar.id;
    let quantiteTotale = 0.0;
    let sommeChiffreAffaires = 0.0;
    let partDue = 0.0;
    let partCommune = 0.0;
    let partCarreau = 0.0;
    let data;
    let resultObject;
    if (date1 != '') {
      this.peseeService.getRessourceByIdHangarBetweenTwoDates('getMarchandiseParTypeByIdHangarBetweenTwoDates/', idHangar, date1, date2).subscribe(res => {
        console.log(res);
        if (this.quantiteForm.value.numOrdinal == true && this.quantiteForm.value.typeMarchandise == true && this.quantiteForm.value.quantite == true && this.quantiteForm.value.somme == true) {
          this.isAllTrue=true

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              somme: somme,
              chiffreTransaction: chiffreTransaction
            };
          });
          const uniqueChiffres = {}
          data.forEach(item => {
            uniqueChiffres[item.chiffreTransaction] = true;
          });
          sommeChiffreAffaires = Object.keys(uniqueChiffres).reduce((acc, chiffre) => {
            return acc + parseInt(chiffre, 10);
          }, 0);
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            quantiteTotale: quantiteTotale,
            sommeChiffreAffaires: sommeChiffreAffaires,
            partDue: partDue.toFixed(2),
            partCommune: partCommune.toFixed(2),
            partCarreau: partCarreau.toFixed(2),
            idHangar: idHangar
          };
        }


        if (this.quantiteForm.value.numOrdinal == false && this.quantiteForm.value.typeMarchandise == true && this.quantiteForm.value.quantite == true && this.quantiteForm.value.somme == true) {
          this.isAllTrue=false

          this.isNotNumOrdinal=true
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              somme: somme,
              chiffreTransaction: chiffreTransaction
            };
          });
          const uniqueChiffres = {}
          data.forEach(item => {
            uniqueChiffres[item.chiffreTransaction] = true;
          });
          sommeChiffreAffaires = Object.keys(uniqueChiffres).reduce((acc, chiffre) => {
            return acc + parseInt(chiffre, 10);
          }, 0);
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            quantiteTotale: quantiteTotale,
            sommeChiffreAffaires: sommeChiffreAffaires,
            partDue: partDue.toFixed(2),
            partCommune: partCommune.toFixed(2),
            partCarreau: partCarreau.toFixed(2),
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == true && this.quantiteForm.value.typeMarchandise == false && this.quantiteForm.value.quantite == true && this.quantiteForm.value.somme == true) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=true
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              nOrdinal: nOrdinal,
              quantite: quantite,
              somme: somme,
              chiffreTransaction: chiffreTransaction
            };
          });
          const uniqueChiffres = {}
          data.forEach(item => {
            uniqueChiffres[item.chiffreTransaction] = true;
          });
          sommeChiffreAffaires = Object.keys(uniqueChiffres).reduce((acc, chiffre) => {
            return acc + parseInt(chiffre, 10);
          }, 0);
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            quantiteTotale: quantiteTotale,
            sommeChiffreAffaires: sommeChiffreAffaires,
            partDue: partDue.toFixed(2),
            partCommune: partCommune.toFixed(2),
            partCarreau: partCarreau.toFixed(2),
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == true && this.quantiteForm.value.typeMarchandise == true && this.quantiteForm.value.quantite == false && this.quantiteForm.value.somme == true) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=true
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              somme: somme,
              chiffreTransaction: chiffreTransaction
            };
          });
          const uniqueChiffres = {}
          data.forEach(item => {
            uniqueChiffres[item.chiffreTransaction] = true;
          });
          sommeChiffreAffaires = Object.keys(uniqueChiffres).reduce((acc, chiffre) => {
            return acc + parseInt(chiffre, 10);
          }, 0);
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sommeChiffreAffaires: sommeChiffreAffaires,
            partDue: partDue.toFixed(2),
            partCommune: partCommune.toFixed(2),
            partCarreau: partCarreau.toFixed(2),
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == true && this.quantiteForm.value.typeMarchandise == true && this.quantiteForm.value.quantite == true && this.quantiteForm.value.somme == false) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=true

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              chiffreTransaction: chiffreTransaction
            };
          });
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            quantiteTotale: quantiteTotale,
            idHangar: idHangar
          };
        }


        if (this.quantiteForm.value.numOrdinal == false && this.quantiteForm.value.typeMarchandise == false && this.quantiteForm.value.quantite == true && this.quantiteForm.value.somme == true) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=true
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              quantite: quantite,
              somme: somme,
              chiffreTransaction: chiffreTransaction
            };
          });
          const uniqueChiffres = {}
          data.forEach(item => {
            uniqueChiffres[item.chiffreTransaction] = true;
          });
          sommeChiffreAffaires = Object.keys(uniqueChiffres).reduce((acc, chiffre) => {
            return acc + parseInt(chiffre, 10);
          }, 0);
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            quantiteTotale: quantiteTotale,
            sommeChiffreAffaires: sommeChiffreAffaires,
            partDue: partDue.toFixed(2),
            partCommune: partCommune.toFixed(2),
            partCarreau: partCarreau.toFixed(2),
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == false && this.quantiteForm.value.typeMarchandise == true && this.quantiteForm.value.quantite == false && this.quantiteForm.value.somme == true) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=true
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              typeMarchandise: typeMarchandise,
              somme: somme,
              chiffreTransaction: chiffreTransaction
            };
          });
          const uniqueChiffres = {}
          data.forEach(item => {
            uniqueChiffres[item.chiffreTransaction] = true;
          });
          sommeChiffreAffaires = Object.keys(uniqueChiffres).reduce((acc, chiffre) => {
            return acc + parseInt(chiffre, 10);
          }, 0);
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sommeChiffreAffaires: sommeChiffreAffaires,
            partDue: partDue.toFixed(2),
            partCommune: partCommune.toFixed(2),
            partCarreau: partCarreau.toFixed(2),
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == false && this.quantiteForm.value.typeMarchandise == true && this.quantiteForm.value.quantite == true && this.quantiteForm.value.somme == false) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=true
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              typeMarchandise: typeMarchandise,
              quantite: quantite,
              chiffreTransaction: chiffreTransaction
            };
          });
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            quantiteTotale: quantiteTotale,
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == true && this.quantiteForm.value.typeMarchandise == false && this.quantiteForm.value.quantite == false && this.quantiteForm.value.somme == true) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=true
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              nOrdinal: nOrdinal,
              somme: somme,
              chiffreTransaction: chiffreTransaction
            };
          });
          const uniqueChiffres = {}
          data.forEach(item => {
            uniqueChiffres[item.chiffreTransaction] = true;
          });
          sommeChiffreAffaires = Object.keys(uniqueChiffres).reduce((acc, chiffre) => {
            return acc + parseInt(chiffre, 10);
          }, 0);
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sommeChiffreAffaires: sommeChiffreAffaires,
            partDue: partDue.toFixed(2),
            partCommune: partCommune.toFixed(2),
            partCarreau: partCarreau.toFixed(2),
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == true && this.quantiteForm.value.typeMarchandise == false && this.quantiteForm.value.quantite == true && this.quantiteForm.value.somme == false) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=true
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              nOrdinal: nOrdinal,
              quantite: quantite,
              chiffreTransaction: chiffreTransaction
            };
          });
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            quantiteTotale: quantiteTotale,
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == true && this.quantiteForm.value.typeMarchandise == true && this.quantiteForm.value.quantite == false && this.quantiteForm.value.somme == false) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=true

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              nOrdinal: nOrdinal,
              typeMarchandise: typeMarchandise,
              chiffreTransaction: chiffreTransaction
            };
          });
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            idHangar: idHangar
          };
        }

        if (this.quantiteForm.value.numOrdinal == false && this.quantiteForm.value.typeMarchandise == false && this.quantiteForm.value.quantite == false && this.quantiteForm.value.somme == true) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=true
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              somme: somme,
              chiffreTransaction: chiffreTransaction
            };
          });
          const uniqueChiffres = {}
          data.forEach(item => {
            uniqueChiffres[item.chiffreTransaction] = true;
          });
          sommeChiffreAffaires = Object.keys(uniqueChiffres).reduce((acc, chiffre) => {
            return acc + parseInt(chiffre, 10);
          }, 0);
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            sommeChiffreAffaires: sommeChiffreAffaires,
            partDue: partDue.toFixed(2),
            partCommune: partCommune.toFixed(2),
            partCarreau: partCarreau.toFixed(2),
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == false && this.quantiteForm.value.typeMarchandise == false && this.quantiteForm.value.quantite == true && this.quantiteForm.value.somme == false) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=true
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              quantite: quantite,
              chiffreTransaction: chiffreTransaction
            };
          });
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            quantiteTotale: quantiteTotale,
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == false && this.quantiteForm.value.typeMarchandise == true && this.quantiteForm.value.quantite == false && this.quantiteForm.value.somme == false) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=true
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=false

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              typeMarchandise: typeMarchandise,
              chiffreTransaction: chiffreTransaction
            };
          });
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            idHangar: idHangar
          };
        }
        if (this.quantiteForm.value.numOrdinal == true && this.quantiteForm.value.typeMarchandise == false && this.quantiteForm.value.quantite == false && this.quantiteForm.value.somme == false) {
          this.isAllTrue=false

          this.isNotNumOrdinal=false
          this.isNotTypeMarchandise=false
          this.isNotQuantite=false
          this.isNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandise=false
          this.isNotNumOrdinalisNotQuantite=false
          this.isNotNumOrdinalisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantite=false
          this.isNotTypeMarchandiseisNotSomme=false
          this.isNotQuantiteisNotSomme=false

          this.isNotNumOrdinalisNotTypeMarchandiseisNotQuantite=false
          this.isNotNumOrdinalisNotTypeMarchandiseisNotSomme=false
          this.isNotNumOrdinalisNotQuantiteisNotSomme=false
          this.isNotTypeMarchandiseisNotQuantiteisNotSomme=true

          data = res.map((str) => {
            const [chiffreTransaction, nOrdinal, typeMarchandise, quantite, somme] = str.split(',');
            quantiteTotale += parseFloat(quantite);
            return {
              nOrdinal: nOrdinal,
              chiffreTransaction: chiffreTransaction
            };
          });
          partDue = sommeChiffreAffaires * 0.07;
          partCommune = sommeChiffreAffaires * 0.0525;
          partCarreau = sommeChiffreAffaires * 0.0175;
          resultObject = {
            currentTime: this.currentTime,
            dateDebut: date1.split('T')[0],
            dateFin: date2.split('T')[0],
            data: data,
            idHangar: idHangar
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
  stillHavePages: boolean = false;
  Recu(): void {
    console.log(this.toPrint);
    const itemsPerPage1 = 20;
    const itemsPerPage = 33;
    const totalItems = this.dataPesee.data.length;

    if (totalItems > itemsPerPage1) {
      this.toPrint1 = {
        currentTime: this.currentTime,
        dateDebut: this.dataPesee.dateDebut,
        dateFin: this.dataPesee.dateFin,
        data: this.dataPesee.data.slice(0, 20),
        quantiteTotale: this.dataPesee.quantiteTotale,
        sommeChiffreAffaires: this.dataPesee.sommeChiffreAffaires,
        partDue: this.dataPesee.partDue,
        partCommune: this.dataPesee.partCommune,
        partCarreau: this.dataPesee.partCarreau,
        idHangar: this.dataPesee.idHangar
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
              currentTime: this.currentTime,
              dateDebut: this.dataPesee.dateDebut,
              dateFin: this.dataPesee.dateFin,
              data: this.dataPesee.data.slice(0, 20),
              quantiteTotale: this.dataPesee.quantiteTotale,
              sommeChiffreAffaires: this.dataPesee.sommeChiffreAffaires,
              partDue: this.dataPesee.partDue,
              partCommune: this.dataPesee.partCommune,
              partCarreau: this.dataPesee.partCarreau,
              idHangar: this.dataPesee.idHangar
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
            PDF.save("Quantité de marchandise écoulée par type de produit selon une certaine période pour chaque carreau.pdf");
            this.spinnerService.stop(spinnerRef);
          }
        };
        generatePage();
      }, 250);
    }
    else {
      this.toPrint = {
        currentTime: this.currentTime,
        dateDebut: this.dataPesee.dateDebut,
        dateFin: this.dataPesee.dateFin,
        data: this.dataPesee.data.slice(0, 15),
        quantiteTotale: this.dataPesee.quantiteTotale,
        sommeChiffreAffaires: this.dataPesee.sommeChiffreAffaires,
        partDue: this.dataPesee.partDue,
        partCommune: this.dataPesee.partCommune,
        partCarreau: this.dataPesee.partCarreau,
        idHangar: this.dataPesee.idHangar
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
          PDF.save("Quantité de marchandise écoulée par type de produit selon une certaine période pour chaque carreau" + ".pdf");
          this.spinnerService.stop(spinnerRef);
        });
      }, 250);
    }
  }



  close() {
    this.dialogRef.close();
  }
}