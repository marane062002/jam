import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';

@Component({
	selector: "kt-ordre-service",
	templateUrl: "./ordre-service.component.html",
	styleUrls: ["./ordre-service.component.scss"],
})
export class OrdreServiceComponent implements OnInit {
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
	// ======================================================================
	//
	// ======================================================================
	selectedStatusOSM: number = 0;
	showRadio = 0;
	showCreateOrdrePhase = 0;
	ordreServiceMarche = { id: 1, numOrdre: "", objet: "", dateEffet: "", marche: { id: 1 } };
	ordreServicePhase = { id: 1, numOrdre: "", objet: "", dateEffet: "", phaseMarche: { id: 1 } };
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
	displayedColumnsOM = ["numOrdre", "dateEffet", "objet", "actions"];
	displayedColumnsOP = [
		//"id",
		"numOrdre",
		"numPhaseMarche",
		"dateEffet",
		"objet",
		"actions",
	];
	idmarche;
	showListeOrdreService = 0;
	showListeOrdreServicePhase = 0;
	showListeOrdreServiceMarche = 0;
	RadioOSM = false;
	disableBtnPhase: boolean = false;
	showCreateFacturePhase = 0;
	// ======================================================================
	//
	// ======================================================================
	ngOnInit() {
		this.eventEditForm = new FormGroup({
			completed: new FormControl(),
		});
		// this.selectedStatus = 1;
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
		console.log("#ID MARCHE : " + this.idmarche);
		// ################################################
		this.service.getOrdreServiceMarche(this.idmarche).pipe(delay(300)).subscribe((r) => {
			if (r.length > 0) {
				this.showListeOrdreServiceMarche = 1;
				//var x = [r];
				_this.sizeDataOM = r.length;
				this.dataSourceOM = new MatTableDataSource(r);
				this.RadioOSM = false;
				if (r.length == 3)
					this.RadioOSM = true;
			} else {
				this.dataSourceOM = new MatTableDataSource(null);
				this.RadioOSM = false;
				this.showListeOrdreServiceMarche = 0;
			}
			this.isLoadingOM = false;
		}, (err) => {
			_this.sizeDataOM = 0;
			this.isLoadingOM = false;
			console.log(err);
		});
		// ################################################
		this.service.getAllOrdreServicePhase(this.idmarche).pipe(delay(300)).subscribe((r) => {
			console.log("OSP : " + JSON.stringify(r, null, 2));
			// this.isLoadingOP = true;
			if (r.length > 0) {
				this.showListeOrdreServicePhase = 1;
				_this.sizeDataOP = r.length;
				this.dataSourceOP = new MatTableDataSource(r);
			} else {
				this.showListeOrdreServicePhase = 0;
				this.dataSourceOP = new MatTableDataSource(null);
			}
			this.isLoadingOP = false;
		}, (err) => {
			_this.sizeDataOP = 0;
			this.isLoadingOP = false;
			console.log(err);
		});
		// ################################################
		this.service.getAllPhaseNotOS(this.idmarche).pipe(delay(300)).subscribe((r) => {
			// this.isLoadingOM = true;
			console.log("NOT OS : " + JSON.stringify(r, null, 2));
			if (r.length > 0) {
				this.showListeOrdreService = 1;
				this.disableBtnPhase = false;
				_this.sizeData = r.length;
				this.dataSource = new MatTableDataSource(r);
			} else {
				this.dataSource = new MatTableDataSource(null);
				this.showListeOrdreService = 0;
				this.disableBtnPhase = true;
			}
			this.isLoading = false;
		}, (err) => {
			_this.sizeData = 0;
			this.isLoading = false;
			console.log(err);
		});
		//console.log("RADIO SM :: " + this.RadioOSM);
	}
	// ======================================================================
	//
	// ======================================================================
	nouveauOrdreService() {
		//this.showRadio = 1;
		this.selectedStatusOSM = 1;
		this.selectedStatus = 0;
	}
	nouveauOrdreServicePahse() {
		this.selectedStatus = 1;
		this.selectedStatusOSM = 0;
	}
	// ======================================================================
	//
	// ======================================================================
	onClickPhase(id) {
		this.showCreateOrdrePhase = 1;
		this.ordreServicePhase.phaseMarche.id = id;
	}
	// ======================================================================
	//
	// ======================================================================
	onClickOM() {
		this.showRadio = 0;
		this.ordreServiceMarche.marche.id = this.idmarche;
		this.selectedStatus = 0;
		this.selectedStatusOSM = 0;
		this.service
			.sendOrdreServiceMarche(this.ordreServiceMarche)
			.subscribe((r) => {
				this.populate();
				this.ordreServiceMarche = { id: 1, numOrdre: "", objet: "", dateEffet: "", marche: { id: 1 } };

			}, (err) => {
				console.log(err);
			});
	}
	// ======================================================================
	//
	// ======================================================================
	onClickOP() {
		this.showRadio = 0;
		this.selectedStatus = 0;
		this.selectedStatusOSM = 0;
		this.showCreateOrdrePhase = 0;
		this.service
			.sendOrdreServicePhase(this.ordreServicePhase)
			.subscribe((r) => {
				this.populate();
				this.ordreServicePhase = { id: 1, numOrdre: "", objet: "", dateEffet: "", phaseMarche: { id: 1 } };
			}, (err) => {
				console.log(err);
			});
	}
	// ======================================================================
	//
	// ======================================================================
	deleteOrdreService(id) {
		console.log("#ID: " + id);
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
				.deleteOrdreServiceMarcheById(id)
				.subscribe((r) => {
					this.populate();
					console.log("Ordre service marche deleted : " + id);
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
	editOrdreService(f) {
		//console.log("#ID OR: " + f)
		this.service.getOrdreServiceById(f).subscribe(data => {
			this.selectedStatusOSM = 1;
			this.selectedStatus = 0;

			this.RadioOSM = true;
			this.ordreServiceMarche.id = data.id;
			this.ordreServiceMarche.marche.id = data.marche.id;
			this.ordreServiceMarche.numOrdre = data.numOrdre;
			this.ordreServiceMarche.objet = data.objet;
			if (data.dateEffet != null)
				this.ordreServiceMarche.dateEffet = new Date(data.dateEffet).toISOString();
		},
			(err) => {
				this.selectedStatus = 0;
				this.RadioOSM = false;
				console.log(err);
			});
	}
	// ======================================================================
	//
	// ======================================================================
	editOrdrePhase(f) {
		//console.log("#ID OR: " + f)
		this.service.getOrdreServicePhaseMarcheById(f).subscribe(data => {
			this.selectedStatusOSM = 0;
			this.selectedStatus = 1;

			this.showCreateOrdrePhase = 1;
			this.ordreServicePhase.id = data.id;
			this.ordreServicePhase.phaseMarche.id = data.phaseMarche.id;
			this.ordreServicePhase.numOrdre = data.numOrdre;
			this.ordreServicePhase.objet = data.objet;
			if (data.dateEffet != null)
				this.ordreServicePhase.dateEffet = new Date(data.dateEffet).toISOString();
		},
			(err) => {
				this.selectedStatus = 1;
				this.showCreateOrdrePhase = 0;
				console.log(err);
			});
	}
	// ======================================================================
	//
	// ======================================================================
	deleteOrdrePhase(id) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
				.deleteOrdreServicePhaseMarcheById(id)
				.subscribe((r) => {
					this.populate();
					console.log("Ordre service phase marche deleted : " + id);
				}, (err) => {
					console.log(err);
				});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}

	generateOrdreService(id) {
		this.service.generateOrdreService(id).subscribe(data => {
		  const file: any = new Blob([data as unknown as BlobPart], {
			type: "application/pdf",
		  });
		  const readfile = URL.createObjectURL(file);
		  const link = document.createElement("a");
		  link.download = "OrdreService.docx";
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
		  console.log("OrdreService generated !! " )
		 
	 
		},
		  (err) => {
			console.log(err);
		  });
	  }

	
}
