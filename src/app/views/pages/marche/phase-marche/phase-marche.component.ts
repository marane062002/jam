import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AoService } from '../../shared/ao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'kt-phase-marche',
  templateUrl: './phase-marche.component.html',
  styleUrls: ['./phase-marche.component.scss']
})
export class PhaseMarcheComponent implements OnInit {

  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private notification: NotificationService, ) { }
  // ===========================================================
  //
  // ===========================================================
  formData = { "id": 1, "intitule": "", "budget": "", "duree": "", "dateDebut": "", "dateEcheance": "", "remarques": "", "statut": { "id": 1 }, "marche": { "id": 1 } };
  showPhaseForm = 0;
  showPhaseTable = 0;
  idmarche;
  dataSource: MatTableDataSource<any>;
  sizeData = 0;
  // ===========================================================
  //
  // ===========================================================
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ===========================================================
  //
  // ===========================================================
  displayedColumns = ['intitule', 'duree', 'budget', 'dateDebut', 'dateEcheance', 'remarques', 'actions'];
  // ===========================================================
  //
  // ===========================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idmarche = params['id'];
    });
    this.populate();
  }
  // ===========================================================
  //
  // ===========================================================
  populate() {
    const _this = this;
    this.service.getAllPhasesMarche(this.idmarche).subscribe(r => {
      _this.sizeData = r.length;
      if (r != []) {
        this.showPhaseTable = 1;
        this.dataSource = new MatTableDataSource(r);
        document.getElementById("myCheck").click();
      }
    },
    (err) => {
      _this.sizeData = 0;
      console.log(err);
    })
  }
  // ===========================================================
  //
  // ===========================================================
  nouvelleLigne() {
    this.showPhaseForm = 1;
  }
  // ===========================================================
  //
  // ===========================================================
  onSubmit(form: NgForm) {
    this.formData.marche.id = this.idmarche;
    console.log(this.formData)
    this.service.sendPhaseMarche(this.formData).subscribe(r => {
      this.showPhaseForm = 0;
      this.formData = { "id": 1, "intitule": "", "budget": "", "duree": "", "dateDebut": "", "dateEcheance": "", "remarques": "", "statut": { "id": 1 }, "marche": { "id": 1 } };
      this.populate();
    })
  }
  // ===========================================================
  //
  // ===========================================================
  editPhase(f) {
    console.log("#ID: " + f)
    this.showPhaseForm = 1;
    this.service.getPhaseMarcheById(f).subscribe(data => {
      console.log("#SHOW-DATA # ID: " + JSON.stringify(data, null, 2))

      this.formData.id = data.id;
      this.formData.marche.id = data.marche.id;
      this.formData.intitule = data.intitule;
      this.formData.duree = data.duree;
      this.formData.budget = data.budget;
      this.formData.remarques = data.remarques;
      this.formData.statut.id = data.statut.id;
      if (data.dateDebut != null)
        this.formData.dateDebut = new Date(data.dateDebut).toISOString();
      if (data.dateEcheance != null)
        this.formData.dateEcheance = new Date(data.dateEcheance).toISOString();

    });
  }
  // ===========================================================
  //
  // ===========================================================
  deletePhase(id) {
    console.log("#ID: " + id);
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deletePhaseMarcheById(id)
        .subscribe((r) => {
          this.populate();
          console.log("Phase marche deleted : " + id);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
}
