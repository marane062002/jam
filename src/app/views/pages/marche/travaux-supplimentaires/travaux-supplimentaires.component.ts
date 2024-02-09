import { Component, OnInit, ViewChild } from '@angular/core';
import { AoService } from '../../shared/ao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'kt-travaux-supplimentaires',
  templateUrl: './travaux-supplimentaires.component.html',
  styleUrls: ['./travaux-supplimentaires.component.scss']
})
export class TravauxSupplimentairesComponent implements OnInit {
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
  travauxSupp = { id: 1, mtTravaux: "", delaiSupplimentaire: "", purcentageTravaux: "", marche: { id: 1 }, type:"" };
  ShowForm: number = 0;
  sizeData = 0;
  isLoading: boolean = true;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ======================================================================
  //
  // ======================================================================
  displayedColumns = [
    "purcentageTravaux",
    "mtTravaux",
    "delaiSupplimentaire",
    "type",
    "actions",
  ];
  idmarche;
  showListeTravauxSupp = 0;
  RadioOSM = false;
  showCreateFacturePhase = 0;
  travaux: number = 0;
  amt: number = 0;
  // ======================================================================
  //
  // ======================================================================
  ngOnInit() {
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
    this.service.getAllTravauxSuppMarche(this.idmarche)
      .pipe(delay(300))
      .subscribe((r) => {
        console.log("Travaux Supp : " + JSON.stringify(r, null, 2));
        if (r.length) {
          this.showListeTravauxSupp = 1;
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
  }
  // ======================================================================
  //
  // ======================================================================
  nouveauTravaux() {
    this.ShowForm = 1;
    this.travaux = 1;
    this.amt = 0;
    this.travauxSupp.type = "Travaux";
  }
  // ======================================================================
  //
  // ======================================================================
  newAMT(){
    this.ShowForm = 1;
    this.amt = 1;
    this.travaux = 0;
    this.travauxSupp.type = "AMT";
  }
  // ======================================================================
  //
  // ======================================================================
  onClickTS() {
    this.travauxSupp.marche.id = this.idmarche;
    this.ShowForm = 0;
    this.showListeTravauxSupp = 1;
    console.log("travauxSupp: " + JSON.stringify(this.travauxSupp, null, 2))
    this.service
      .sendTravauxSuppMarche(this.travauxSupp)
      .subscribe((r) => {
        this.populate();
        this.isLoading = true;
        this.travauxSupp = { id: 1, mtTravaux: "", delaiSupplimentaire: "", purcentageTravaux: "", marche: { id: 1 }, type:"" };
      }, (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  editTravauxSupp(id) {
    this.service.getTravauxSuppMarcheById(id).subscribe(data => {
      console.log("#DATA# ID: " + JSON.stringify(data, null, 2))
      this.ShowForm = 1;
      this.travauxSupp.id = data.id;
      this.travauxSupp.marche.id = data.marche.id;
      this.travauxSupp.delaiSupplimentaire = data.delaiSupplimentaire;
      this.travauxSupp.mtTravaux = data.mtTravaux;
      this.travauxSupp.purcentageTravaux = data.purcentageTravaux;
    },
      (err) => {
        console.log(err);
      });
  }
  // ======================================================================
  //
  // ======================================================================
  deleteTravauxSupp(id) {
    console.log("#ID: " + id);
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteTravauxSuppMarcheById(id)
        .subscribe((r) => {
          this.populate();
          this.isLoading = true;
          this.travauxSupp = { id: 1, mtTravaux: "", delaiSupplimentaire: "", purcentageTravaux: "", marche: { id: 1 }, type:"" };
          console.log("Record deleted : " + id);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }


  generateDecisionAugmentation(id) {
    this.service.generateDecisionAugmentation(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "DecisionAugmentation.docx";
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
      console.log("DecisionAugmentation generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }

  generateAvenant(id) {
    this.service.generateAvenant(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "Avenant.docx";
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
      console.log("Avenant generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }

  generateCertifAvenant(id) {
    this.service.generateCertifAvenant(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "CertifAvenant.docx";
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
      console.log("CertifAvenant generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }

  
}