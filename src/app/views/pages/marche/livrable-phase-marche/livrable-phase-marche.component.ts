import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AoService } from '../../shared/ao.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { forkJoin, concat, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'kt-livrable-phase-marche',
  templateUrl: './livrable-phase-marche.component.html',
  styleUrls: ['./livrable-phase-marche.component.scss']
})
export class LivrablePhaseMarcheComponent implements OnInit {
  // =============================================================
  //
  // =============================================================
  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private notification: NotificationService,
  ) { }
  // =============================================================
  //
  // =============================================================
  sizeData: number = 0;
  sizeDataLivrable: number = 0;
  selectedStatus = false;
  statut = ["Validé", "Rejeté", "Sous reserve"];
  formatLivrable = ["Electronique", "Papier"];
  livrable = { "id": 1, "intitule": "", "nbrExemplaire": "", "statut": "", "formatLivrable": "", "phase": { "id": 0 } };
  idmarche;
  tableLivrables = false;
  showFormLivrable = false;
  // =============================================================
  //
  // =============================================================
  dataSource: MatTableDataSource<any>;
  dataSourceLivrable: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['intitule', 'duree', 'budget', 'dateDebut', 'dateEcheance', 'remarques', 'actions'];
  displayedColumnsLivrable = ['intitule', 'formatLivrable', 'nbrExemplaire', 'statut', 'actions'];
  // =============================================================
  //
  // =============================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idmarche = params['id'];
    });
    const _this = this;
    forkJoin(
      this.service.getAllPhasesMarche(this.idmarche), this.service.getAllLivrable(this.idmarche)
    ).subscribe((res) => {
      this.populateInit(_this, res[0], res[1]);
    });

  }
  // =============================================================
  //
  // =============================================================
  populateInit(_this, a, b) {
    if (a.length) {
      _this.sizeData = a.length;
      console.log("Liste phase :: " + JSON.stringify(a, null, 2))
      this.dataSource = new MatTableDataSource(a);
    }

    if (b.length) {
      _this.sizeDataLivrable = b.length;
      console.log("Liste livrable :: " + JSON.stringify(b, null, 2))
      this.dataSourceLivrable = new MatTableDataSource(b);
      this.tableLivrables = true;
    } else {
      this.tableLivrables = false;
    }
    document.getElementById("myCheck").click();
  }
  // =============================================================
  //
  // =============================================================
  nouveauLivrable() {
    this.selectedStatus = !this.selectedStatus;
  }
  // =============================================================
  //
  // =============================================================
  onClickPhase(idPhase) {
    this.livrable.phase.id = idPhase;
    this.showFormLivrable = !this.showFormLivrable;
  }
  // =============================================================
  //
  // =============================================================
  onClick() {
    this.selectedStatus = false;
    this.showFormLivrable = false;
    this.service.sendLivrable(this.livrable).pipe(
      flatMap((res1) => this.service.getAllLivrable(this.idmarche))
    ).subscribe((res3) => {
      this.populate(res3);
      this.tableLivrables = true;
    });
  }
  // =============================================================
  //
  // =============================================================
  populate(a) {
    this.livrable = { "id": 1, "intitule": "", "nbrExemplaire": "", "statut": "", "formatLivrable": "", "phase": { "id": 0 } };
    this.dataSourceLivrable = new MatTableDataSource(a);
    //document.getElementById("myCheck1").click(); 
  }
  // =============================================================
  //
  // =============================================================
  editLivrablePhase(f) {
    console.log("#ID OR: " + f)
    this.service.getLivrablePhaseMarcheById(f).subscribe(data => {
      console.log("#DATA# ID: " + JSON.stringify(data, null, 2))
      this.showFormLivrable = true;
      this.livrable.id = data.id;
      this.livrable.phase.id = data.phase.id;
      this.livrable.intitule = data.intitule;
      this.livrable.nbrExemplaire = data.nbrExemplaire;
      this.livrable.statut = data.statut;
      this.livrable.formatLivrable = data.formatLivrable;
    },
      (err) => {
        this.showFormLivrable = false;
        console.log(err);
      });
  }
  // =============================================================
  //
  // =============================================================
  deleteLivrablePhase(id) {
    console.log("#ID: " + id);
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteDeleteLivrablePhaseMarcheById(id)
        .subscribe((r) => {
          this.ngOnInit();
          console.log("Livrable phase marche deleted : " + id);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
}
