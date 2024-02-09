import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { HangarService } from '../../../marcheGros/Service/hangar.service';
import { Hangar } from "../../../../../core/_base/layout/models/Hangar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { SpinnerService } from '../../../utils/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { PeseeService } from '../../../pesee/Services/pesee.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'kt-nombre-par-genre-et-quantite-modal',
  templateUrl: './nombre-par-genre-et-quantite-modal.component.html',
  styleUrls: ['./nombre-par-genre-et-quantite-modal.component.scss']
})
export class NombreParGenreEtQuantiteModalComponent implements OnInit {
  today: number = Date.now();

  dataSource = new MatTableDataSource<any>();

  dataPesee: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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

  displayedColumnsALL: string[] = ["genreVehicule", "quantiteMarchandise", "nombreVehicules"];
  displayedColumns1: string[] = ["quantiteMarchandise", "nombreVehicules"];
  displayedColumns2: string[] = ["genreVehicule", "nombreVehicules"];
  displayedColumns3: string[] = ["genreVehicule", "quantiteMarchandise",];
  displayedColumns4: string[] = ["nombreVehicules"];
  displayedColumns5: string[] = ["quantiteMarchandise"];
  displayedColumns6: string[] = ["genreVehicule"];
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
    private spinnerService: SpinnerService,
    private translate: TranslateService,
    private peseeService: PeseeService,
    private dialogRef: MatDialogRef<NombreParGenreEtQuantiteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { nombreParGenresQantites: any },) {
  }


  currentTime: string;
  ngOnInit() {
    this.nombreForm = this.data.nombreParGenresQantites;
    if (this.nombreForm.value.timeDebut != '' && this.nombreForm.value.timeFin != '' && this.nombreForm.value.hangar.id != '') {
      this.apply();
    }
    this.nombreForm.controls['transactionTime'].setValue(this.getCurrentDateTime());

    this.currentTime = this.getCurrentDateTime();

    setInterval(() => {
      this.currentTime = this.getCurrentDateTime();
    }, 60000);
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

  onSubmit() {

  }

  resetForm() {

  }
  isAllTrue: boolean = false;
  isNotGenreVehicule: boolean = false;
  isNotNbVehicule: boolean = false;
  isNotTotalMarch: boolean = false;
  isNotGenreVehiculeAndisNotNbVehicule: boolean = false;
  isNotGenreVehiculeAndIsNotTotalMarch: boolean = false;
  isNotNbVehiculeAndIsNotTotalMarch: boolean = false;
  apply() {
    let date1 = this.nombreForm.get('timeDebut').value;
    let date2 = this.nombreForm.get('timeFin').value;
    let idHangar = this.nombreForm.value.hangar.id;
    let data;
    if (date1 != '' && date2 != '') {
      this.peseeService.getRessourceByIdHangarBetweenTwoDates('getAllPeseesByHangarBetweenTwoDates/', idHangar, date1, date2).subscribe(res => {
        console.log(res);
        if (this.nombreForm.value.genreVehicule == true && this.nombreForm.value.nombreVehicule == true && this.nombreForm.value.totalMarchandise == true) {
          this.isAllTrue = true;
          this.isNotGenreVehicule = false;
          this.isNotNbVehicule = false;
          this.isNotTotalMarch = false;
          this.isNotNbVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndisNotNbVehicule = false;
          data = res.map((str) => {
            const [nomVehicule, sumChiffreTransaction, countVehicule] = str.split(',');
            return {
              nomVehicule,
              sumChiffreTransaction: +sumChiffreTransaction,
              countVehicule: +countVehicule
            };
          });
        }
        if (this.nombreForm.value.genreVehicule == false && this.nombreForm.value.nombreVehicule == true && this.nombreForm.value.totalMarchandise == true) {
          this.isNotGenreVehicule = true;
          this.isAllTrue = false;
          this.isNotNbVehicule = false;
          this.isNotTotalMarch = false;
          this.isNotNbVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndisNotNbVehicule = false;
          data = res.map((str) => {
            const [nomVehicule, sumChiffreTransaction, countVehicule] = str.split(',');
            return {
              sumChiffreTransaction: +sumChiffreTransaction,
              countVehicule: +countVehicule
            };
          });
        }
        if (this.nombreForm.value.genreVehicule == true && this.nombreForm.value.nombreVehicule == false && this.nombreForm.value.totalMarchandise == true) {
          this.isNotNbVehicule = true;
          this.isAllTrue = false;
          this.isNotGenreVehicule = false;
          this.isNotTotalMarch = false;
          this.isNotNbVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndisNotNbVehicule = false;
          data = res.map((str) => {
            const [nomVehicule, sumChiffreTransaction, countVehicule] = str.split(',');
            return {
              nomVehicule,
              sumChiffreTransaction: +sumChiffreTransaction,
            };
          });
        }
        if (this.nombreForm.value.genreVehicule == true && this.nombreForm.value.nombreVehicule == true && this.nombreForm.value.totalMarchandise == false) {
          this.isNotTotalMarch = true;
          this.isAllTrue = false;
          this.isNotGenreVehicule = false;
          this.isNotNbVehicule = false;
          this.isNotNbVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndisNotNbVehicule = false;
          data = res.map((str) => {
            const [nomVehicule, sumChiffreTransaction, countVehicule] = str.split(',');
            return {
              nomVehicule,
              countVehicule: +countVehicule
            };
          });
        }
        if (this.nombreForm.value.genreVehicule == false && this.nombreForm.value.nombreVehicule == false && this.nombreForm.value.totalMarchandise == true) {
          this.isNotGenreVehiculeAndisNotNbVehicule = true;
          this.isNotNbVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndIsNotTotalMarch = false;
          this.isAllTrue = false;
          this.isNotGenreVehicule = false;
          this.isNotNbVehicule = false;
          this.isNotTotalMarch = false;
          data = res.map((str) => {
            const [nomVehicule, sumChiffreTransaction, countVehicule] = str.split(',');
            return {
              sumChiffreTransaction: +sumChiffreTransaction,
            };
          });
        }
        if (this.nombreForm.value.genreVehicule == false && this.nombreForm.value.nombreVehicule == true && this.nombreForm.value.totalMarchandise == false) {
          this.isNotGenreVehiculeAndIsNotTotalMarch = true;
          this.isNotNbVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndisNotNbVehicule = false;
          this.isAllTrue = false;
          this.isNotGenreVehicule = false;
          this.isNotNbVehicule = false;
          this.isNotTotalMarch = false;
          data = res.map((str) => {
            const [nomVehicule, sumChiffreTransaction, countVehicule] = str.split(',');
            return {
              countVehicule: +countVehicule
            };
          });
        }
        if (this.nombreForm.value.genreVehicule == true && this.nombreForm.value.nombreVehicule == false && this.nombreForm.value.totalMarchandise == false) {
          this.isNotNbVehiculeAndIsNotTotalMarch = true;
          this.isNotGenreVehiculeAndIsNotTotalMarch = false;
          this.isNotGenreVehiculeAndisNotNbVehicule = false;
          this.isAllTrue = false;
          this.isNotGenreVehicule = false;
          this.isNotNbVehicule = false;
          this.isNotTotalMarch = false;
          data = res.map((str) => {
            const [nomVehicule, sumChiffreTransaction, countVehicule] = str.split(',');
            return {
              nomVehicule,
            };
          });
        }
        const resultObject = {
          idHangar: idHangar,
          currentTime: this.currentTime,
          dateDebut: date1.split('T')[0],
          dateFin: date2.split('T')[0],
          data: data
        };
        this.dataPesee = resultObject;
        this.dataSource = new MatTableDataSource(data);
        this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
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
        PDF.save("Nombre de véhicules par genres et quantités de marchandises pour chaque carreau" + ".pdf");
        this.spinnerService.stop(spinnerRef);
      });
    }, 250);
  }


  close() {
    this.dialogRef.close();
  }
}