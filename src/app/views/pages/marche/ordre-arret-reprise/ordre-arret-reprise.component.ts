import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'kt-ordre-arret-reprise',
  templateUrl: './ordre-arret-reprise.component.html',
  styleUrls: ['./ordre-arret-reprise.component.scss']
})
export class OrdreArretRepriseComponent implements OnInit {
  sizeOAR: number = 0;
  reprise: number = 0;
  // ==============================================================
  //
  // ==============================================================
  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private notification: NotificationService,
  ) { }
  // ==============================================================
  //
  // ==============================================================
  sizeData = 0;
  sizeDataOA = 0;
  selectedStatus = 0;
  idmarche;
  RadioOSM;
  showListeOrdreArretMarche;
  showListeAllOrdreArretMarche = false;
  showButtonAdd = true;
  ordreReprise = { "id": 1, "numOrdre": "", "objet": "", "dateEffet": "" };
  showCreateOrdreReprise = 0;
  x = { "id": 1, "ordreReprise": { "id": 1 } };
  ordreArretMarche = { "id": 1, "marche": { "id": 1 }, "numOrdre": "", "objet": "", "dateEffet": "" };
  ordreArretMarcheUpdate = { "id": 1, "marche": { "id": 1 }, "numOrdre": "", "objet": "", "dateEffet": "", "ordreReprise": { "id": 1 } };
  //ordreRepriseMarche = { "id": 1, "numOrdre": "", "objet": "", "dateEffet": "" };
  // ==============================================================
  //
  // ==============================================================
  dataSourceOM: MatTableDataSource<any>;
  dataSourceOP: MatTableDataSource<any>;
  // ==============================================================
  //
  // ==============================================================
  @ViewChild(MatPaginator, { static: true }) paginatorOA: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortOA: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginatorOR: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortOR: MatSort;
  // ==============================================================
  //
  // ==============================================================
  displayedColumnsOM = ['numOrdre', 'objet', 'dateEffet', 'flag', 'actions'];
  displayedColumnsOP = ['numOrdre', 'objet', 'numPhaseMarche', 'dateEffet', 'actions'];
  // ==============================================================
  //
  // ==============================================================
  ngAfterViewInit() {
    this.populate();
  }
  // ==============================================================
  //
  // ==============================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idmarche = params['id'];
    });

  }
  // ==============================================================
  // Ajout ordre arret
  // ==============================================================
  nouveauOrdreService() {
    this.selectedStatus = 1;
  }
  // ==============================================================
  // Delete ordre arret
  // ==============================================================
  deleteOrderArret(id) {
    console.log("#ID: " + id);
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteOrderArretById(id)
        .subscribe((r) => {
          this.populate();
          console.log("Ordre arret deleted : " + id);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
  // ==============================================================
  // Modifier ordre arret
  // ==============================================================
  editOrderArret(f) {
    //console.log("#ID: " + f)
    this.selectedStatus = 1;
    this.showCreateOrdreReprise = 0;
    this.service.getOrdreArretMarcheById(f).subscribe(data => {
      //console.log("#DATA# ID: " + JSON.stringify(data, null, 2))
      this.ordreArretMarche.id = data.id;
      this.ordreArretMarche.marche.id = data.marche.id;
      this.ordreArretMarche.numOrdre = data.numOrdre;
      this.ordreArretMarche.objet = data.objet;
      if (data.dateEffet != null)
        this.ordreArretMarche.dateEffet = new Date(data.dateEffet).toISOString();
    });
  }
  // ==============================================================
  // Modifier ordre reprise
  // ==============================================================
  editOrderReprise(f) {
    //console.log("#ID OR: " + f)
    this.service.getOrdreRepriseMarcheById(f).subscribe(data => {
      //console.log("#DATA# ID: " + JSON.stringify(data, null, 2))
      this.reprise = 1;
      this.selectedStatus = 0;
      this.showCreateOrdreReprise = 1;
      this.ordreReprise.id = data.id;
      this.ordreReprise.numOrdre = data.numOrdre;
      this.ordreReprise.objet = data.objet;
      if (data.dateEffet != null)
        this.ordreReprise.dateEffet = new Date(data.dateEffet).toISOString();

    },
      (err) => {
        this.reprise = 0;
        this.showCreateOrdreReprise = 0;
        console.log(err);
      });
  }
  // ==============================================================
  // Delete ordre reprise
  // ==============================================================
  deleteOrdreReprise(id) {
    console.log("#ID: " + id);
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteOrderRepriseById(id)
        .subscribe((r) => {
          this.populate();
          console.log("Ordre reprise deleted : " + id);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
  // ==============================================================
  //
  // ==============================================================
  AddOrdreReprise(f) {
    this.reprise = 0;
    this.showCreateOrdreReprise = 1;
    this.x.id = f;
    this.ordreReprise.numOrdre = "OREP-" + f;
    // console.log("ID :: " + f)
    this.service.getOrdreArretMarcheById(f).subscribe(data => {
      //console.log("#DATA#: " + JSON.stringify(data, null, 2))
      this.ordreArretMarcheUpdate.marche.id = data.marche.id;
      this.ordreArretMarcheUpdate.numOrdre = data.numOrdre;
      this.ordreArretMarcheUpdate.objet = data.objet;
      this.ordreArretMarcheUpdate.dateEffet = data.dateEffet;
    },
      (err) => {
        console.log(err);
      });

  }
  // ==============================================================
  //
  // ==============================================================
  populate() {
    this.showListeAllOrdreArretMarche = false;
    this.showButtonAdd = true;
    this.sizeOAR = 0;
    const _this = this;
    this.service.getAllOrdreArretMarche(this.idmarche).subscribe(data1 => {
      //console.log("Liste des orders reprise : " + JSON.stringify(data1, null, 2))
      _this.sizeData = data1.length;
      console.log('size :: ' + data1.length)
      if (data1.length) {
        this.dataSourceOP = new MatTableDataSource(data1);
        this.dataSourceOP.paginator = this.paginatorOR;
        this.dataSourceOP.sort = this.sortOR;
        this.showListeAllOrdreArretMarche = true;
        document.getElementById("myCheck").click();
      }
    },
      (err) => {
        _this.sizeData = 0;
        console.log(err);
      })
    this.service.getListOrdreArretMarche(this.idmarche).subscribe(r => {
      //this.service.getOrdreArretMarche(this.idmarche).subscribe(r => {
      // console.log("Liste des orders arret : " + JSON.stringify(r, null, 2))
      _this.sizeDataOA = r.length;
      console.log('size OARR :: ' + r.length)
      if (r != null) {
        this.showListeOrdreArretMarche = 1;
        this.showButtonAdd = false;
        // console.log("Resultat :: " + JSON.stringify(r, null, 2))
        this.dataSourceOM = new MatTableDataSource(r);
        this.dataSourceOM.paginator = this.paginatorOA;
        this.dataSourceOM.sort = this.sortOA;
      }
    },
      (err) => {
        _this.sizeDataOA = 0;
        console.log(err);
      })
  }
  // ==============================================================
  //
  // ==============================================================
  onClickOM() {
    this.selectedStatus = 0;
    this.ordreArretMarche.marche.id = this.idmarche;
    //this.ordreArretMarche.numOrdre = "OARR-" + this.sizeOAR + 1;
    // console.log("Liste des orders arret : " + JSON.stringify(this.ordreArretMarche, null, 2))
    this.service.sendOrdreArretMarche(this.ordreArretMarche).subscribe(r => {
      this.populate();
      // this.ordreArretMarche = { "marche": { "id": 1 } };
      this.ordreArretMarche = { "id": 1, "marche": { "id": 1 }, "numOrdre": "", "objet": "", "dateEffet": "" };
    },
      (err) => {
        console.log(err);
      })
  }
  // ==============================================================
  //
  // ==============================================================
  onClickOP() {
    this.showButtonAdd = true;
    this.selectedStatus = 0;
    this.showCreateOrdreReprise = 0;
    if (this.reprise) {
      this.service.sendOrdreRepriseMarche(this.ordreReprise).subscribe(r => {
        this.ordreReprise = { "id": 1, "numOrdre": "", "objet": "", "dateEffet": "" };
        this.populate();
      },
        (err) => {
          console.log(err);
        })
    } else {
      this.service.sendOrdreRepriseMarche(this.ordreReprise).subscribe(r => {
        this.ordreReprise = { "id": 1, "numOrdre": "", "objet": "", "dateEffet": "" };
        this.ordreArretMarcheUpdate.id = this.x.id;
        this.ordreArretMarcheUpdate.ordreReprise.id = r.id;
        console.log("#OARR# : " + JSON.stringify(this.ordreArretMarcheUpdate, null, 2))
        this.service.sendOrdreArretRMarche(this.ordreArretMarcheUpdate).subscribe(re => {
          this.ordreArretMarcheUpdate = { "id": 1, "marche": { "id": 1 }, "numOrdre": "", "objet": "", "dateEffet": "", "ordreReprise": { "id": 1 } };
          this.dataSourceOM = new MatTableDataSource([]);
          this.populate();
        },
          (err) => {
            console.log(err);
          })
      },
        (err) => {
          console.log(err);
        })
    }
  }

  generateOrdreArret(id) {
    this.service.generateOrdreArret(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "OrdreArret.docx";
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
      console.log("Ordre Arret !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }

  
  generateOrdreReprise(id) {
    this.service.generateOrdreReprise(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "OrdreReprise.docx";
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
      console.log("OrdreReprise generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }


}
