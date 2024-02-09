import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from 'rxjs/operators';

@Component({
  selector: 'kt-mise-en-demeure-resiliation',
  templateUrl: './mise-en-demeure-resiliation.component.html',
  styleUrls: ['./mise-en-demeure-resiliation.component.scss']
})
export class MiseEnDemeureResiliationComponent implements OnInit {

  // ======================================================================
  //
  // ======================================================================
  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  // ======================================================================
  //
  // ======================================================================
  med = 0;
  rez = 0;
  misendemeure = { id: "", numMiseEnDemeure: "", dateMiseEnDemeure: "", type: "med", marche: { id: 1 } };
  resiliationData = { id: "", dateResiliation: "", type: "res", marche: { id: 1 } };

  dataSourceMed: MatTableDataSource<any>;
  dataSourceRes: MatTableDataSource<any>;
  sizeDataMed = 0;
  sizeDataRes = 0;
  isLoadingMed: boolean = true;
  isLoadingRes: boolean = true;

  idmarche;
  showMed = 0;
  showRes = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ======================================================================
  //
  // ======================================================================
  displayedColumnsRes = ["dateResiliation", "actions"];
  displayedColumnsMed = ["numMiseEnDemeure", "dateMiseEnDemeure", "actions"];
  // ======================================================================
  //
  // ======================================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idmarche = params["id"];
    });
    this.populateMed();
    this.populateRes();
  }
  // ======================================================================
  //
  // ======================================================================
  populateMed() {
    const _this = this;
    this.isLoadingMed = true;
    this.service.getMiseEnDemeureEtResiliation(this.idmarche, "med").pipe(delay(300)).subscribe((r) => {
      if (r.length > 0) {
        this.showMed = 1;
        _this.sizeDataMed = r.length;
        this.dataSourceMed = new MatTableDataSource(r);
      } else {
        this.showMed = 0;
        this.dataSourceMed = new MatTableDataSource(null);
        _this.sizeDataMed = 0;
      }
      this.isLoadingMed = false;
    }, (err) => {
      this.showMed = 0;
      _this.sizeDataMed = 0;
      this.isLoadingMed = false;
      console.log(err);
    });
  }
  /** Loading data  */
  populateRes() {
    const _this = this;
    this.isLoadingRes = true;
    this.service.getMiseEnDemeureEtResiliation(this.idmarche, "res").pipe(delay(300)).subscribe((r) => {
      if (r.length > 0) {
        this.showRes = 1;
        _this.sizeDataRes = r.length;
        this.dataSourceRes = new MatTableDataSource(r);
      } else {
        this.showRes = 0;
        this.dataSourceRes = new MatTableDataSource(null);
        _this.sizeDataRes = 0;
      }
      this.isLoadingRes = false;
    }, (err) => {
      this.showRes = 0;
      _this.sizeDataRes = 0;
      this.isLoadingRes = false;
      console.log(err);
    });
  }
  // ======================================================================
  //
  // ======================================================================
  EditmiseEnDemeure(idMed) {
    this.med = 1;
    this.rez = 0;
    this.service.getMiseEnDemeureEtResiliationById(idMed).subscribe((r) => {
      if (r != null) {
        this.misendemeure.id = r.id;
        this.misendemeure.numMiseEnDemeure = r.numMiseEnDemeure;
        if (r.dateMiseEnDemeure != null)
          this.misendemeure.dateMiseEnDemeure = new Date(r.dateMiseEnDemeure).toISOString();
      }
    }, (err) => {
      console.log(err);
    });
  }
  // ======================================================================
  //
  // ======================================================================
  miseEnDemeureForm() {
    this.med = 1;
    this.rez = 0;
  }
  // ======================================================================
  //
  // ======================================================================
  Editresiliation(idRes) {
    this.med = 0;
    this.rez = 1;
    this.service.getMiseEnDemeureEtResiliationById(idRes).subscribe((r) => {
      if (r != null) {
        this.resiliationData.id = r.id;
        if (r.dateResiliation != null)
          this.resiliationData.dateResiliation = new Date(r.dateResiliation).toISOString();
      }
    }, (err) => {
      console.log(err);
    });
  }
  // ======================================================================
  //
  // ======================================================================
  resiliationForm() {
    this.med = 0;
    this.rez = 1;
  }
  // ======================================================================
  //
  // ======================================================================
  valideMed() {
    this.med = 0;
    this.rez = 0;
    this.misendemeure.marche.id = this.idmarche;
    this.misendemeure.type = "med";
    this.showMed = 1;
    this.service
      .sendMiseEnDemeureEtResiliation(this.misendemeure)
      .subscribe((r) => {
        this.populateMed();
        this.misendemeure = { id: "", numMiseEnDemeure: "", dateMiseEnDemeure: "", type: "med", marche: { id: 1 } };
      }, (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  valideRes() {
    this.med = 0;
    this.rez = 0;
    this.resiliationData.marche.id = this.idmarche;
    this.resiliationData.type = "res";
    this.showRes = 1;
    this.service
      .sendMiseEnDemeureEtResiliation(this.resiliationData)
      .subscribe((r) => {
        this.populateRes();
        this.resiliationData = { id: "", dateResiliation: "", type: "", marche: { id: 1 } };
      }, (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  deleteMed(id) {
    this.service
      .deleteMiseEnDemeureEtResiliation(id)
      .subscribe((r) => {
        this.populateMed();
      }, (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  deleteRes(id) {
    this.service
      .deleteMiseEnDemeureEtResiliation(id)
      .subscribe((r) => {
        this.populateRes();
      }, (err) => {
        console.log(err);
      });
  }


  generateMiseEnDemeure(id) {
    this.service.generateMiseEnDemeure(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "MiseEnDemeure.docx";
      link.href = readfile;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(() => {
        window.URL.revokeObjectURL(file);
        link.remove();
      }, 100);
      console.log("MiseEnDemeure generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }

  generateResiliation(id) {
    this.service.generateResiliation(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "Resiliation.docx";
      link.href = readfile;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(() => {
        window.URL.revokeObjectURL(file);
        link.remove();
      }, 100);
      console.log("Resiliation generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }



}
