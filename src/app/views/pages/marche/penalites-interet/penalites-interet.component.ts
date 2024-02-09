import { Component, OnInit, ViewChild } from '@angular/core';
import { AoService } from '../../shared/ao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'kt-penalites-interet',
  templateUrl: './penalites-interet.component.html',
  styleUrls: ['./penalites-interet.component.scss']
})
export class PenalitesInteretComponent implements OnInit {
  // ======================================================================
  //
  // ======================================================================
  showListeInterets = 0;
  showListePenalites = 0;
  ShowFormPenalites = 0;
  ShowFormInterets = 0;
  showListeTravauxSupp = 0;
  penaliteData = { id: 1, nbrJour: "", mtPenalite: "", marche: { id: 1 } };
  interetData = { id: 1, nbrJour: "", mtPenalite: "", marche: { id: 1 } };
  idmarche: any;
  sizeDataPnt = 0;
  sizeDataInt = 0;
  isLoading: boolean = true;
  isLoading2: boolean = true;
  dataSourcePenalite: MatTableDataSource<any>;
  dataSourceInterets: MatTableDataSource<any>;
  // ======================================================================
  //
  // ======================================================================
  displayedColumnsPenalite = [
    "nbrJour",
    "mtPenalite",
    "actions",
  ];
  displayedColumnsInteret = [
    "nbrJour",
    "mtPenalite",
    "actions",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ======================================================================
  //
  // ======================================================================
  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private notification: NotificationService, ) { }
  // ======================================================================
  //
  // ======================================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idmarche = params["id"];
    });
    this.populateInteretsMoratoires();
    this.populatePenalites();
  }
  // ======================================================================
  //
  // ======================================================================
  nouveauPenalite() {
    this.ShowFormPenalites = 1;
    this.ShowFormInterets = 0;
  }
  // ======================================================================
  //
  // ======================================================================
  nouveauInterets() {
    this.ShowFormInterets = 1;
    this.ShowFormPenalites = 0;
  }
  // ======================================================================
  //
  // ======================================================================
  onClickPenalites() {
    this.penaliteData.marche.id = this.idmarche;
    this.ShowFormPenalites = 0;
    this.ShowFormInterets = 0;
    console.log('Penalite pour retard :: ' + JSON.stringify(this.penaliteData, null, 2))
    this.service
      .sendModuleMarche(this.penaliteData,"PenaliteRetard")
      .subscribe((r) => {
        this.populatePenalites();
        this.isLoading = true;
        this.penaliteData = { id: 1, nbrJour: "", mtPenalite: "", marche: { id: 1 } };
      }, (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  onClickInterets(event) {
    this.interetData.marche.id = this.idmarche;
    this.ShowFormPenalites = 0;
    this.ShowFormInterets = 0;
    console.log('Interets moratoires :: ' + JSON.stringify(this.interetData, null, 2))
    this.service
      .sendModuleMarche(this.interetData, "InteretsMoratoires")
      .subscribe((r) => {
        this.populateInteretsMoratoires();
        this.isLoading2 = true;
        this.interetData = { id: 1, nbrJour: "", mtPenalite: "", marche: { id: 1 } };
      }, (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  populatePenalites() {
    const _this = this;
    this.service.getAllModuleMarche(this.idmarche, "PenaliteRetard/")
      .pipe(delay(300))
      .subscribe((r) => {
        // console.log("Travaux Supp : " + JSON.stringify(r, null, 2));
        if (r.length) {
          this.showListePenalites = 1;
          _this.sizeDataPnt = r.length;
          this.dataSourcePenalite = new MatTableDataSource(r);
        } else {
          this.dataSourcePenalite = new MatTableDataSource(null);
          _this.sizeDataPnt = 0;
        }
        this.isLoading = false;
      }, (err) => {
        _this.sizeDataPnt = 0;
        this.isLoading = false;
        this.dataSourcePenalite = new MatTableDataSource(null);
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  populateInteretsMoratoires() {
    const _this = this;
    this.service.getAllModuleMarche(this.idmarche, "InteretsMoratoires/")
      .pipe(delay(300))
      .subscribe((r) => {
        // console.log("Travaux Supp : " + JSON.stringify(r, null, 2));
        if (r.length) {
          this.showListeInterets = 1;
          _this.sizeDataInt = r.length;
          this.dataSourceInterets = new MatTableDataSource(r);
        } else {
          this.dataSourceInterets = new MatTableDataSource(null);
          _this.sizeDataInt = 0;
        }
        this.isLoading2 = false;
      }, (err) => {
        _this.sizeDataInt = 0;
        this.isLoading2 = false;
        this.dataSourceInterets = new MatTableDataSource(null);
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  editPenalites(rowId) {
    this.service.getModuleMarcheById(rowId, "PenaliteRetardById/").subscribe(data => {
      // console.log("#DATA# ID: " + JSON.stringify(data, null, 2))
      this.ShowFormPenalites = 1;
      this.penaliteData.id = data.id;
      this.penaliteData.marche.id = data.marche.id;
      this.penaliteData.mtPenalite = data.mtPenalite;
      this.penaliteData.nbrJour = data.nbrJour;
    },
      (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  deletePenalites(rowId) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteModuleMarcheById(rowId, "DeletePenaliteRetard/")
        .subscribe((r) => {
          this.populatePenalites();
          this.isLoading = true;
          this.penaliteData = { id: 1, nbrJour: "", mtPenalite: "", marche: { id: 1 } };
          console.log("Record deleted : " + rowId);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
  // ======================================================================
  //
  // ======================================================================
  editInteretsMoratoires(rowId) {
    this.service.getModuleMarcheById(rowId, "InteretsMoratoiresById/").subscribe(data => {
      // console.log("#DATA# ID: " + JSON.stringify(data, null, 2))
      this.ShowFormInterets = 1;
      this.interetData.id = data.id;
      this.interetData.marche.id = data.marche.id;
      this.interetData.mtPenalite = data.mtPenalite;
      this.interetData.nbrJour = data.nbrJour;
    },
      (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  deleteInteretsMoratoires(rowId) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteModuleMarcheById(rowId, "DeleteInteretsMoratoires/")
        .subscribe((r) => {
          this.populateInteretsMoratoires();
          this.isLoading2 = true;
          this.interetData = { id: 1, nbrJour: "", mtPenalite: "", marche: { id: 1 } };
          console.log("Record deleted : " + rowId);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }

  generateOrdreRecette(id) {
    this.service.generateOrdreRecette(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "OrdreRecette.docx";
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
      console.log("OrdreRecette generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }




}
