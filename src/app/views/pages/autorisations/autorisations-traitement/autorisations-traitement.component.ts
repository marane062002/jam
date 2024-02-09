import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AutorisationsService } from "../../shared/autorisations.service";
import { PersonnePhysiqueService } from "../../shared/personne-physique.service";
import { PersonneMoraleService } from "../../shared/personne-morale.service";
import { environment } from "../../../../../environments/environment";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationType } from '../../shared/NotificationMessage.service';

@Component({
	selector: "kt-autorisations-traitement",
	templateUrl: "./autorisations-traitement.component.html",
	styleUrls: ["./autorisations-traitement.component.scss"],
})
export class AutorisationsTraitementComponent implements OnInit {
	showFormResp: number = 0;
	autorisationData: any;
	// ====================================================================
	//
	// ====================================================================
	constructor(
		private service: AutorisationsService,
		private service1: PersonnePhysiqueService,
		private service2: PersonneMoraleService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private fileService: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService,
	) { }
	// ====================================================================
	//
	// ====================================================================
	tableResponsable:any;
	submitted = false;
	id;
	selectedFiles = [];
	pjs = [];
	allStatAut;
	timeDebutAutorisation = { hour: 10, minute: 10 };
	timeFinAutorisation = { hour: 10, minute: 10 };
	// ====================================================================
	//
	// ====================================================================
	autorisation = {
		dateDemande: null,
		arrondissement: null,
		zone: null,
		adresseAuto: null,
		dateDebut: null,
		dateFin: null,
		statutdemandeautorisation: { id: 0, libelle: "" },
		typeAutorisation: { typeAutorisation: "" },
		objet: "",
		id: 0,
		ppsourceautorisation: {
			prenom: "",
			nom: "",
			cin: "",
			telephoneGsm: "",
		},
		pmsourceautorisation: {
			nom: "",
			rc: "",
			identifiantFiscal: "",
			numeroPatente: "",
			teleGsm: "",
		},
		objetdemandeautorisation: {
			objetDemandeAutorisation: "",
			typeObjetReservation: { typeObjetAutorisation: "" },
			adresse: "",
		},
		espace: { espace: "" },
		note: "",
	};
	ppSourceAutorisation = {
		nom: "",
		prenom: "",
		cin: "",
		adresse: "",
		telephoneFixe: "",
		telephoneGsm: "",
		eMail: "",
		fax: "",
	};
	pmSourceAutorisation = {
		nom: "",
		rc: "",
		identifiantFiscal: "",
		numeroPatente: "",
		adresse: "",
		teleFixe: "",
		teleGsm: "",
		contact: "",
		eMail: "",
		siteWeb: "",
		fax: "",
		idvilleRegistreCommerce: 0,
	};
	respForm = {
		locale: "",
		responsable: "",
		telResponsable: "",
		demandeAutorisation: { id: 0, libelle: ""  }
	}
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		this.fileService.fileSizeDetector();
		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["reclam"];
		});
		this.service.getByIdAutorisation(this.id).subscribe((data) => {
			this.tableResponsable = data.respSuiviTravaux;
			this.autorisationData = data;
			this.autorisation = data;
			console.log("Traitement : " + JSON.stringify(this.autorisationData, null, 2));
			if (data.ppsourceautorisation == 0) {
				this.service2
					.getByIdpm(data.pmsourceautorisation)
					.subscribe((res) => {
						this.pmSourceAutorisation = res;
					});

				document.getElementById("pmmm").style.display = "inline";
				/* document.getElementById("btnAddpm").style.display="inline";
         		   document.getElementById("btnChangepm").style.display="inline";
         		   document.getElementById("btnDetailpm").style.display="inline";*/
			}
			if (data.pmsourceautorisation == 0) {
				document.getElementById("pppp").style.display = "inline-table";
				/* document.getElementById("btnAddpp").style.display="inline";
         		   document.getElementById("btnChangepp").style.display="inline";
         		   document.getElementById("btnDetailpp").style.display="inline";*/
				this.service1
					.getByIdpp(data.ppsourceautorisation)
					.subscribe((res) => {
						this.ppSourceAutorisation = res;
					});
			}
			
			if (this.autorisationData.dateDebut != null) {
				var m = new Date(this.autorisationData.dateDebut);
				this.timeDebutAutorisation = {
					hour: m.getHours(),
					minute: m.getMinutes(),
				};
			}
			if (this.autorisationData.dateFin != null) {
				var m = new Date(this.autorisationData.dateFin);
				this.timeFinAutorisation = {
					hour: m.getHours(),
					minute: m.getMinutes(),
				};
			}
		});
		this.service.getAllStatutAut().subscribe((da) => {
			//console.log("STATUS: " + JSON.stringify(da, null, 2));
			// this.statutTraitement=data.slice(1).slice(-3);
			//this.allStatAut=da.slice(1).slice(-2);
			this.allStatAut = da;
			//console.log("All Status: " + this.allStatAut);
		});
		this.service
			.getByIdautorisationpjsTraitement(this.id)
			.subscribe((m) => {
				this.pjs = m;
			});
	}
	// ====================================================================
	//
	// ====================================================================
	save(event: any): void {
		this.selectedFiles = event.target.files;
	}
	// ====================================================================
	//
	// ====================================================================
	onClickPjName(e, id) {
		var r = e.substring(0, e.length - 4);
		window.open(
			environment.API_ALFRESCO_URL + "/PjAutorisations/traitement/" + r,
			"_blank"
		);
	}
	// ====================================================================
	//
	// ====================================================================
	onSubmit() {
		this.service.process(this.autorisation).subscribe((res) => {
			if (this.selectedFiles.length > 0) {
				this.service
					.nouvellepjtraitement(this.selectedFiles, res.id)
					.subscribe((res) => { });
			}
			this.router.navigate(["/autorisations/autorisations-list"]);
		});
	}
	// ====================================================================
	//
	// ====================================================================
	addResponsable() {
		this.showFormResp = 1;
	}
	// ====================================================================
	//
	// ====================================================================
	onSaveResp() {
		this.submitted = true;
		this.respForm.demandeAutorisation.id = this.autorisation.id;
		//console.log("AUTO : " + this.autorisation.id)
		console.log("RESPONSABLE :: " + JSON.stringify(this.respForm, null, 2))
		this.service.createReponsable(this.respForm).subscribe((res) => {
			console.log("DATA :: " + JSON.stringify(res, null, 2))
			this.service.getByIdAutorisation(this.id).subscribe((data) => {
				this.tableResponsable = data.respSuiviTravaux;
			},
			(err) => {
				console.log(err);
			})
			this.notification.sendMessage({
				message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
				type: NotificationType.success
			});
		});
		this.respForm = { locale: "", responsable: "", telResponsable: "", demandeAutorisation: { id:0, libelle: ""  } }
		this.showFormResp = 0;
	}
}
