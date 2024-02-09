import { Component, OnInit, ViewChild } from '@angular/core';
import { AoService } from '../../shared/ao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'kt-facture-phase-marche',
  templateUrl: './facture-phase-marche.component.html',
  styleUrls: ['./facture-phase-marche.component.scss']
})
export class FacturePhaseMarcheComponent implements OnInit {
  // ========================================================
  //
  // ========================================================
  sizeData = 0;
  sizeDataPM = 0;
  sizeDataPNF = 0;
  sizeDataDD = 0;
  idmarche;
  selectedStatus = 0;
  selectedStatusDecomptes = 0;
  showCreateFacturePhase = 0;
  showCreateDecompteDefinitif = 0;
  showCreateDecomptesMarche = 0;
  mntTTcMarche;
  prctRetenu;
  showPhaseTable = 0;
  showDecompteTable: number = 0;
  showDecomptesMarche: number = 0;
  dataSource: MatTableDataSource<any>; // dataSource phase marche
  dataSourceFacture: MatTableDataSource<any>; // dataSource Decompte phase marche
  dataSourceDecompteDefinitif: MatTableDataSource<any>; // dataSource Decompte definitif
  dataSourceDecomptesMarche: MatTableDataSource<any>; // dataSource Decompte marche
  // ========================================================
  //
  // ========================================================
  displayedColumns = ['budget', 'dateDebut', 'dateEcheance', 'statut', 'actions'];
  displayedColumnsFacture = ['NumFacture', 'mntTtc', 'mntRetenu', 'mntApayer', 'echeancePaiement', 'statut', 'actions'];
  displayedColumnsDecompteDef = ['numFacture', 'mntTtc', 'echeancePaiement', 'statutFacture', 'actions'];
  displayedColumnsDecomptesMarche = ['numFacture', 'mntTtc', 'mntRetenu', 'mntApayer', 'echeancePaiement', 'statutFacture', 'actions'];

  facturePhase = { "phase": { "id": 1 }, "statutFacture": "", "mntTtc": 0, "mntRetenu": 0, "mntApayer": 0 , "dateReception":"","numFacture":"","delaisPaiement":"","echeancePaiement":"","remarques":""};
  marche = { "mntEngage": 0, "mntAdjucataire": 0, "plafondRetenu": 0 };
  decompteDefinitif = { "id": "", "marche": { "id": 1 }, "statutFacture": "", "mntTtc": 0, "numFacture": "", "echeancePaiement": "", "decompteDefinitif": "Oui" };
  decomptesMarche = { "id": "", "marche": { "id": 1 }, "statutFacture": "", "mntTtc": 0, "mntRetenu": 0, "mntApayer": 0, "numFacture": "", "echeancePaiement": "", "decompteDefinitif": "Non" };
  statutFacture = ["payé", "non payé"]
  tabPhase = 0;
  noAction1: boolean = false;
  noAction2: boolean = false;
  // ========================================================
  //
  // ========================================================
  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private notification: NotificationService) {
  }
  // ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  // ========================================================
  //
  // ========================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idmarche = params['id'];
    });

    this.service.getMarcheById(this.idmarche).subscribe(r => {
      console.log("££££ : "+ JSON.stringify(r));
      this.marche = r;
      this.mntTTcMarche = r.mntAdjucataire;
      this.prctRetenu = r.prctRetenu;
    })
    this.populate();
    // Liste decompte définitif
    this.getDecompte();
    // Liste decomptes marché
    this.getDecomptesMarche();
  }
  // ========================================================
  //
  // ========================================================
  nouvelleLigne() {
    this.selectedStatus = 1;
    this.showCreateDecompteDefinitif = 0;
    this.showCreateDecomptesMarche = 0;
  }
  // ========================================================
  // update on 17.12.20
  // ========================================================
  addLigneDecompte() {
    this.selectedStatusDecomptes = 1;
    this.showCreateDecomptesMarche = 1;
    this.showCreateDecompteDefinitif = 0;
    this.selectedStatus = 0;
    this.decomptesMarche.marche.id = this.idmarche;
  }
  // ========================================================
  //
  // ========================================================
  onClickDecompteDefinitForm() {
    this.selectedStatus = 0;
    this.showCreateDecompteDefinitif = 1;
    this.showCreateDecomptesMarche = 0;
    this.decompteDefinitif.marche.id = this.idmarche;
  }
  // ========================================================
  //
  // ========================================================
  populate() {
    const _this = this;
    this.service.getAllFacture(this.idmarche).subscribe(r => {
      _this.sizeDataPM = r.length;
      if (r.length != 0) {
        //console.log("getALLFactures :: " + JSON.stringify(r, null, 2));
        this.showPhaseTable = 1;
        this.dataSourceFacture = new MatTableDataSource(r);
      }
      //console.log("ZERO FACTURE !!");
      this.service.getAllPhaseNotFacture(this.idmarche).subscribe(rr => {
        _this.sizeDataPNF= rr.length;
        if (rr.length) {
          this.tabPhase = 1;
          this.dataSource = new MatTableDataSource(rr);
        } else {
          this.noAction1 = true;
        }
      })
    })

  }
  // ========================================================
  // Decompte définitif
  // ========================================================
  getDecompte() {
    const _this = this;
    this.service.getDecompteById(this.idmarche, "Oui").subscribe(data => {
      _this.sizeDataDD= data.length;
      // console.log("getDecompte marché :: " + JSON.stringify(data, null, 2));
      this.dataSourceDecompteDefinitif = new MatTableDataSource(data);
      if (data.length != 0) {
        this.showDecompteTable = 1;
        this.noAction2 = true;
      }
    });
  }
  // ========================================================
  // Decomptes marché
  // ========================================================
  getDecomptesMarche() {
    const _this = this;
    this.service.getDecompteById(this.idmarche, "Non").subscribe(data => {
      _this.sizeData = data.length;
      // console.log("getDecompte marché :: " + JSON.stringify(data, null, 2));
      this.dataSourceDecomptesMarche = new MatTableDataSource(data);
      this.dataSourceDecomptesMarche.paginator = this.paginator;
				//this.dataSourceDecomptesMarche.sort = this.sort;
      if (data.length != 0) {
        this.showDecomptesMarche = 1;
      }
    });
  }
  // ========================================================
  //
  // ========================================================
  onClickDecompteDefinitif() {
    this.showCreateDecompteDefinitif = 1;
    this.decompteDefinitif.marche.id = this.idmarche;
  }
  // ========================================================
  //
  // ========================================================
  onClickPhase(id, prct) {
    this.showCreateFacturePhase = 1;
    this.facturePhase.mntTtc = (this.mntTTcMarche * prct) / 100;
    this.facturePhase.phase.id = id;
    var x = (this.facturePhase.mntTtc * this.prctRetenu) / 100;
    var y = (this.marche.mntAdjucataire * this.marche.plafondRetenu) / 100;
    var m = this.marche.mntEngage + x;
    if (m > y) {
      if (this.marche.mntEngage == y) {
        this.facturePhase.mntRetenu = 0;
      }
      else {
        this.facturePhase.mntRetenu = y - this.marche.mntEngage;
      }
    }
    else {
      this.facturePhase.mntRetenu = (this.facturePhase.mntTtc * this.prctRetenu) / 100;
    }

    this.facturePhase.mntApayer = this.facturePhase.mntTtc - this.facturePhase.mntRetenu;

  }
  // ========================================================
  //  Decompte phase marche
  // ========================================================
  onClickOP(f) {
    this.marche.mntEngage = this.marche.mntEngage + this.facturePhase.mntRetenu;
    this.service.updateMntEngageMarche(this.marche).subscribe(r => {
    })
    this.service.sendFacture(this.facturePhase).subscribe(r => {
      this.selectedStatus = 0;
      this.populate();
      this.facturePhase = { "phase": { "id": 1 }, "statutFacture": "", "mntTtc": 0, "mntRetenu": 0, "mntApayer": 0 , "dateReception":"","numFacture":"","delaisPaiement":"","echeancePaiement":"","remarques":""};
    })
  }

  // ========================================================
  // SAVE DECOMPTE DEFINITIF
  // ========================================================
  onSaveDecompteDefinitif(f) {
    // console.log("DECOMPTE :: " + JSON.stringify(this.decompteDefinitif, null, 2))
    this.service.sendDecompteDefinitif(this.decompteDefinitif).subscribe(r => {
      this.decompteDefinitif = { "id": "", "marche": { "id": 1 }, "statutFacture": "", "mntTtc": 0, "numFacture": "", "echeancePaiement": "", "decompteDefinitif": "Oui" };
      this.getDecompte();
      this.showCreateDecompteDefinitif = 0;
    })
  }

  // ========================================================
  // SAVE DECOMPTES MARCHE
  // ========================================================
  onSaveDecomptesMarche(f) {
    //console.log("DECOMPTE :: " + JSON.stringify(this.decomptesMarche, null, 2))
    this.service.sendDecompteDefinitif(this.decomptesMarche).subscribe(r => {
      this.decomptesMarche = { "id": "", "marche": { "id": 1 }, "statutFacture": "", "mntTtc": 0, "mntRetenu": 0, "mntApayer": 0, "numFacture": "", "echeancePaiement": "", "decompteDefinitif": "Non" };
      this.getDecomptesMarche();
      this.showCreateDecomptesMarche = 0;
    })
  }
  // ========================================================
  //  Edit Decomptes Marche
  // ========================================================
  editDecomptesMarche(id) {
    this.showCreateDecomptesMarche = 1;
    this.showCreateDecompteDefinitif = 0;
    this.showCreateFacturePhase = 0;
    this.service.showDecompteById(id).subscribe(data => {
      if (data.length != 0) {
        //console.log("Edit décompte :: " + JSON.stringify(data, null, 2));
        let decompte = data;
        this.decomptesMarche.id = decompte.id;
        this.decomptesMarche.marche.id = decompte.marche.id;
        this.decomptesMarche.statutFacture = decompte.statutFacture;
        this.decomptesMarche.mntTtc = decompte.mntTtc;
        this.decomptesMarche.mntApayer = decompte.mntApayer;
        this.decomptesMarche.mntRetenu = decompte.mntRetenu;
        this.decomptesMarche.numFacture = decompte.numFacture;
        if (decompte.echeancePaiement != null)
          this.decomptesMarche.echeancePaiement = new Date(decompte.echeancePaiement).toISOString();
        //console.log("EDIT FORM - décompte :: " + JSON.stringify(this.decompteDefinitif, null, 2));
      }
    });
  }
  // ========================================================
  // 
  // ========================================================
  editDecompteDefinitif(id) {
    this.showCreateDecompteDefinitif = 1;
    this.showCreateDecomptesMarche = 0;
    this.showCreateFacturePhase = 0;
    this.service.showDecompteById(id).subscribe(data => {
      if (data.length != 0) {
        //console.log("Edit décompte :: " + JSON.stringify(data, null, 2));
        let decompte = data;
        this.decompteDefinitif.id = decompte.id;
        this.decompteDefinitif.marche.id = decompte.marche.id;
        this.decompteDefinitif.statutFacture = decompte.statutFacture;
        this.decompteDefinitif.mntTtc = decompte.mntTtc;
        this.decompteDefinitif.numFacture = decompte.numFacture;
        if (decompte.echeancePaiement != null)
          this.decompteDefinitif.echeancePaiement = new Date(decompte.echeancePaiement).toISOString();
        //console.log("EDIT FORM - décompte :: " + JSON.stringify(this.decompteDefinitif, null, 2));
      }
    });
  }
  // ========================================================
  // 
  // ========================================================
  deleteDecompteDefinitif(id) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteDecompteById(id)
        .subscribe(data => {
          //console.log("Décompte supprimer : " + id);
          this.getDecompte();
          this.getDecomptesMarche();
          this.showDecompteTable = 0;
          this.showDecomptesMarche = 0;
          this.noAction2 = false;
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
}
