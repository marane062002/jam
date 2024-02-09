import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'kt-receptions',
  templateUrl: './receptions.component.html',
  styleUrls: ['./receptions.component.scss']
})
export class ReceptionsComponent implements OnInit {
  // ======================================================================
  //
  // ======================================================================
  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private notification: NotificationService,
  ) { }
  showRadio = 0;
  showCreateOrdrePhase = 0;
  receptionMarche = { id: null, receptionProvisoire: "", receptionDefinitive: "", marche: { id:null } };
  receptionPhase = { id: 1, receptionPhaseMarche: "", phase: { id: 1 } };
  selectedStatus: number;
  eventEditForm: FormGroup;
  dataSource: MatTableDataSource<any>;
  dataSourceOM: MatTableDataSource<any>;
  dataSourceOP: MatTableDataSource<any>;
  sizeData = 0;
  sizeDataOM = 0;
  sizeDataOP = 0;
  isLoading: boolean = true;
  isLoadingOM: boolean = true;
  isLoadingOP: boolean = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ======================================================================
  //
  // ======================================================================
  displayedColumns = [
    "intitule",
    "budget",
    "dateDebut",
    "dateEcheance",
    "actions",
  ];
  displayedColumnsOM = ["receptionProvisoire", "receptionDefinitive", "actions"];
  displayedColumnsOP = [
    "numPhaseMarche",
    "receptionPhaseMarche",
    "actions",
  ];
  idmarche;
  showListeOrdreService = 0;
  showListeOrdreServicePhase = 0;
  showListeOrdreServiceMarche = 0;
  RadioOSM = false;
  showCreateFacturePhase = 0;
  // ======================================================================
  //
  // ======================================================================
  ngOnInit() {
    this.eventEditForm = new FormGroup({
      completed: new FormControl(),
    });
    this.selectedStatus = 1;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idmarche = params["id"];
    });
    this.populate();
  }
  // ======================================================================
  //
  // ======================================================================


  populate() {
    const _this = this;
    // ################################################
    this.service.getReceptionMarche(this.idmarche).pipe(delay(300)).subscribe((r) => {
      //console.log("Activate order service marche :: " + JSON.stringify(r, null, 2));
      // this.isLoadingOM = true;
      if (r != null) {
        console.log("RECEPTIONS : " + JSON.stringify(r, null, 2));
        this.RadioOSM = true;
        this.showListeOrdreServiceMarche = 1;
        var x = [r];
		this.receptionMarche = Object.assign(r,{});
        _this.sizeDataOM = x.length;
        this.dataSourceOM = new MatTableDataSource(x);
      } else {
        this.dataSourceOM = new MatTableDataSource(null);
        _this.sizeDataOM = 0;
      }
      this.isLoadingOM = false;
    }, (err) => {
      _this.sizeDataOM = 0;
      this.isLoadingOM = false;
      this.dataSourceOM = new MatTableDataSource(null);
      console.log(err);
    });
    // ################################################
    this.service.getAllReceptionsPhaseMarche(this.idmarche).pipe(delay(300)).subscribe((r) => {
      console.log("RECEPTION PHASE MARCHE : " + JSON.stringify(r, null, 2));
      // this.isLoadingOP = true;
      if (r.length) {
        this.showListeOrdreServicePhase = 1;
        _this.sizeDataOP = r.length;
        this.dataSourceOP = new MatTableDataSource(r);
      } else {
        this.dataSourceOP = new MatTableDataSource(null);
        _this.sizeDataOP = 0;
      }
      this.isLoadingOP = false;
    }, (err) => {
      _this.sizeDataOP = 0;
      this.isLoadingOP = false;
      this.dataSourceOP = new MatTableDataSource(null);
      console.log(err);
    });
    // ################################################
    this.service.getAllPhaseNotReception(this.idmarche).pipe(delay(300)).subscribe((r) => {
      // this.isLoadingOM = true;
      console.log("NOT RECEPT : " + JSON.stringify(r, null, 2));
      if (r.length) {
        this.showListeOrdreService = 1;
        _this.sizeData = r.length;
        this.dataSource = new MatTableDataSource(r);
      } else {
        this.dataSource = new MatTableDataSource(null);
        _this.sizeData = 0;
      }
      this.isLoading = false;
    }, (err) => {
      _this.sizeData = 0;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(null);
      console.log(err);
    });
    //console.log("RADIO SM :: " + this.RadioOSM);
  }
  // ======================================================================
  //
  // ======================================================================
  nouveauOrdreService() {
    this.showRadio = 1;
  }
  // ======================================================================
  //
  // ======================================================================
  onClickPhase(id) {
    this.showCreateOrdrePhase = 1;
    this.receptionPhase.phase.id = id;
  }
  // ======================================================================
  //
  // ======================================================================
  onClickOM() {
    this.showRadio = 0;
    this.receptionMarche.marche.id = this.idmarche;
    this.selectedStatus = 1;
    this.service
      .sendReceptionMarche(this.receptionMarche)
      .subscribe((r) => {
        this.populate();
        this.receptionMarche = Object.assign(r,{});
      }, (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  onClickOP() {
    this.showRadio = 0;
    this.showCreateOrdrePhase = 0;
    this.service
      .sendReceptionPhase(this.receptionPhase)
      .subscribe((r) => {
        this.populate();
        this.receptionPhase = { id: 1, receptionPhaseMarche: "", phase: { id: 1 } };
      }, (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  editReceptionMarche(id) {
    this.service.getReceptionMarcheById(id).subscribe(data => {
      console.log("#DATA# ID: " + JSON.stringify(data, null, 2))
      this.showRadio = 1;
      this.selectedStatus = 0;

      this.receptionMarche.id = data.id;
      this.receptionMarche.marche.id = data.marche.id;
      if (data.receptionProvisoire != null)
        this.receptionMarche.receptionProvisoire = new Date(data.receptionProvisoire).toISOString();
      if (data.receptionDefinitive != null)
        this.receptionMarche.receptionDefinitive = new Date(data.receptionDefinitive).toISOString();
    },
      (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  deleteReceptionMarche(id) {
    console.log("#ID: " + id);
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteReceptionMarcheById(id)
        .subscribe((r) => {
          this.populate();
          this.receptionMarche = { id: null, receptionProvisoire: "", receptionDefinitive: "", marche: { id: null } };
          console.log("Reception marche deleted : " + id);
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
  editReceptionPhaseMarche(id) {
    this.service.getReceptionsPhaseMarcheById(id).subscribe(data => {
      console.log("#DATA# ID: " + JSON.stringify(data, null, 2))
      this.showRadio = 1;
      this.selectedStatus = 1;
      this.showCreateOrdrePhase = 1;
      this.receptionPhase.id = data.id;
      this.receptionPhase.phase.id = data.phase.id;
      if (data.receptionPhaseMarche != null)
        this.receptionPhase.receptionPhaseMarche = new Date(data.receptionPhaseMarche).toISOString();
    },
      (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  deleteReceptionPhaseMarche(id) {
    console.log("#ID: " + id);
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteReceptionPhaseMarcheById(id)
        .subscribe((r) => {
          this.populate();
          this.receptionPhase = { id: 1, receptionPhaseMarche: "", phase: { id: 1 } };
          console.log("Reception phase marche deleted : " + id);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }


  generatePvreceptionDefinitive(id) {
    this.service.generatePvreceptionDefinitive(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "PvreceptionDefinitive.docx";
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
      console.log("PvreceptionDefinitive generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }

  generatePvreceptionProvisoire(id) {
    this.service.generatePvreceptionProvisoire(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "PvreceptionProvisoire.docx";
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
      console.log("PvreceptionProvisoire generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }


  
  
}
