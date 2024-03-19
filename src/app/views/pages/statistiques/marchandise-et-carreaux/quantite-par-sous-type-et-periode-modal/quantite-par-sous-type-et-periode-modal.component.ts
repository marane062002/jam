import { Component, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PeseeService } from '../../../pesee/Services/pesee.service';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '../../../utils/spinner.service';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'kt-quantite-par-sous-type-et-periode-modal',
  templateUrl: './quantite-par-sous-type-et-periode-modal.component.html',
  styleUrls: ['./quantite-par-sous-type-et-periode-modal.component.scss']
})
export class QuantiteParSousTypeEtPeriodeModalComponent implements OnInit {

  today: number = Date.now();

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataPesee: any;

  displayedColumnsALL: string[] = ["total", "sousType", "referenceProduit"];
  displayedColumns1: string[] = ["sousType", "referenceProduit"];
  displayedColumns2: string[] = ["total", "referenceProduit"];
  displayedColumns3: string[] = ["total", "sousType"];
  displayedColumns4: string[] = ["referenceProduit"];
  displayedColumns5: string[] = ["sousType"];
  displayedColumns6: string[] = ["total"];

  quantiteForm = new FormGroup({
    transactionTime: new FormControl(this.getCurrentDateTime()),
    transactionEnd: new FormControl('', Validators.required),
    transactionDebut: new FormControl('', Validators.required),
    total: new FormControl(true, [Validators.required]),
    refProduit: new FormControl(true, [Validators.required]),
    sousTypeMarchandise: new FormControl(true, [Validators.required]),
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
    private dialogRef: MatDialogRef<QuantiteParSousTypeEtPeriodeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: { quantiteParSousType: any ,language}) {
  }
  currentTime: string;
  @HostBinding('dir') dir 

  ngOnInit() {
    if(this.data.language=='fr'){
      this.dir='ltr'
    }else{
      this.dir= 'rtl'; 
    }
    this.quantiteForm = this.data.quantiteParSousType;
    if (this.quantiteForm.value.transactionDebut != '' && this.quantiteForm.value.transactionEnd != '' && this.quantiteForm.value.hangar.id != '') {
      this.apply();
    }
    this.quantiteForm.controls['transactionTime'].setValue(this.getCurrentDateTime());

    this.currentTime = this.getCurrentDateTime();

    setInterval(() => {
      this.currentTime = this.getCurrentDateTime();
    }, 60000);
  }

  toggleCheckbox(controlName: string) {
    const control = this.quantiteForm.get(controlName);

    if (control) {
      control.setValue(!control.value);
      if (control.value) {
        control.enable();
      } else {
        control.enable();
      }
    }
  }


  isAllTrue: boolean = false;
  isNotTotal: boolean = false;
  isNotRefProd: boolean = false;
  isNotSousType: boolean = false;
  isNotTotalAndIsNotRefProd: boolean = false;
  isNotTotalAndIsNotSousType: boolean = false;
  isNotRefProdAndIsNotSousType: boolean = false;

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
    let data
    if (date1 != '') {
      this.peseeService.getRessourceByIdHangarBetweenTwoDates('getMarchandiseParSousTypeByIdHangarBetweenTwoDates/', idHangar, date1, date2).subscribe(res => {
        console.log(res);
        if (this.quantiteForm.value.total == true && this.quantiteForm.value.refProduit == true && this.quantiteForm.value.sousTypeMarchandise == true) {
          this.isAllTrue = true;
          this.isNotTotal = false;
          this.isNotRefProd = false;
          this.isNotSousType = false;
          this.isNotTotalAndIsNotRefProd = false;
          this.isNotTotalAndIsNotSousType = false;
          this.isNotRefProdAndIsNotSousType = false;
          data = res.map((str) => {
            const [total, referenceProduit, sousType] = str.split(',');
            return {
              total: +total,
              referenceProduit: referenceProduit,
              sousType: sousType,
            };
          });
        }
        if (this.quantiteForm.value.total == false && this.quantiteForm.value.refProduit == true && this.quantiteForm.value.sousTypeMarchandise == true) {
          this.isAllTrue = false;
          this.isNotTotal = true;
          this.isNotRefProd = false;
          this.isNotSousType = false;
          this.isNotTotalAndIsNotRefProd = false;
          this.isNotTotalAndIsNotSousType = false;
          this.isNotRefProdAndIsNotSousType = false;
          data = res.map((str) => {
            const [total, referenceProduit, sousType] = str.split(',');
            return {
              referenceProduit: referenceProduit,
              sousType: sousType,
            };
          });
        }
        if (this.quantiteForm.value.total == true && this.quantiteForm.value.refProduit == false && this.quantiteForm.value.sousTypeMarchandise == true) {
          this.isAllTrue = false;
          this.isNotTotal = false;
          this.isNotRefProd = true;
          this.isNotSousType = false;
          this.isNotTotalAndIsNotRefProd = false;
          this.isNotTotalAndIsNotSousType = false;
          this.isNotRefProdAndIsNotSousType = false;
          data = res.map((str) => {
            const [total, referenceProduit, sousType] = str.split(',');
            return {
              total: +total,
              sousType: sousType,
            };
          });
        }
        if (this.quantiteForm.value.total == true && this.quantiteForm.value.refProduit == true && this.quantiteForm.value.sousTypeMarchandise == false) {
          this.isAllTrue = false;
          this.isNotTotal = false;
          this.isNotRefProd = false;
          this.isNotSousType = true;
          this.isNotTotalAndIsNotRefProd = false;
          this.isNotTotalAndIsNotSousType = false;
          this.isNotRefProdAndIsNotSousType = false;
          data = res.map((str) => {
            const [total, referenceProduit, sousType] = str.split(',');
            return {
              total: +total,
              referenceProduit: referenceProduit,
            };
          });
        }
        if (this.quantiteForm.value.total == false && this.quantiteForm.value.refProduit == false && this.quantiteForm.value.sousTypeMarchandise == true) {
          this.isAllTrue = false;
          this.isNotTotal = false;
          this.isNotRefProd = false;
          this.isNotSousType = false;
          this.isNotTotalAndIsNotRefProd = true;
          this.isNotTotalAndIsNotSousType = false;
          this.isNotRefProdAndIsNotSousType = false;
          data = res.map((str) => {
            const [total, referenceProduit, sousType] = str.split(',');
            return {
              sousType: sousType,
            };
          });
        }
        if (this.quantiteForm.value.total == false && this.quantiteForm.value.refProduit == true && this.quantiteForm.value.sousTypeMarchandise == false) {
          this.isAllTrue = false;
          this.isNotTotal = false;
          this.isNotRefProd = false;
          this.isNotSousType = false;
          this.isNotTotalAndIsNotRefProd = false;
          this.isNotTotalAndIsNotSousType = true;
          this.isNotRefProdAndIsNotSousType = false;
          data = res.map((str) => {
            const [total, referenceProduit, sousType] = str.split(',');
            return {
              referenceProduit: referenceProduit,
            };
          });
        }
        if (this.quantiteForm.value.total == true && this.quantiteForm.value.refProduit == false && this.quantiteForm.value.sousTypeMarchandise == false) {
          this.isAllTrue = false;
          this.isNotTotal = false;
          this.isNotRefProd = false;
          this.isNotSousType = false;
          this.isNotTotalAndIsNotRefProd = false;
          this.isNotTotalAndIsNotSousType = false;
          this.isNotRefProdAndIsNotSousType = true;
          data = res.map((str) => {
            const [total, referenceProduit, sousType] = str.split(',');
            return {
              total: +total,
            };
          });
        }
        const resultObject = {
          idHangar: idHangar,
          currentTime: this.currentTime,
          dateDebut: date1.split('T')[0],
          dateFin: date2.split('T')[0],
          data: data,
        };
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
  Recu(): void {
    console.log(this.toPrint);
    const itemsPerPage1 = 20;
    const itemsPerPage = 33;
    const totalItems = this.dataPesee.data.length;

    if (totalItems > itemsPerPage1) {
      this.toPrint1 = {
        idHangar: this.dataPesee.idHangar,
        currentTime: this.dataPesee.currentTime,
        dateDebut: this.dataPesee.dateDebut,
        dateFin: this.dataPesee.dateFin,
        data: this.dataPesee.data,
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
              idHangar: this.dataPesee.idHangar,
              currentTime: this.dataPesee.currentTime,
              dateDebut: this.dataPesee.dateDebut,
              dateFin: this.dataPesee.dateFin,
              data: this.dataPesee.data,
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
            PDF.save(this.translate.instant("PAGES.QUANTITE_MARCHANDISE_SOUS_TYPE.TITLE")+".pdf");
            this.spinnerService.stop(spinnerRef);
          }
        };
        generatePage();
      }, 250);
    }
    else {
      this.toPrint = {
        idHangar: this.dataPesee.idHangar,
        currentTime: this.dataPesee.currentTime,
        dateDebut: this.dataPesee.dateDebut,
        dateFin: this.dataPesee.dateFin,
        data: this.dataPesee.data,
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
          PDF.save(this.translate.instant("PAGES.QUANTITE_MARCHANDISE_SOUS_TYPE.TITLE")+".pdf");
          this.spinnerService.stop(spinnerRef);
        });
      }, 250);
    }
  }



  close() {
    this.dialogRef.close();
  }
}