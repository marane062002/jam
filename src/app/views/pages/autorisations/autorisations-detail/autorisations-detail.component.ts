import { Component, OnInit } from "@angular/core";
import { AutorisationsService } from "../../shared/autorisations.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PersonnePhysiqueService } from "../../shared/personne-physique.service";
import { PersonneMoraleService } from "../../shared/personne-morale.service";
import { environment } from "../../../../../environments/environment";
import { PdfviewerComponent } from "../pdfviewer/pdfviewer.component";
import { MatDialog } from "@angular/material";

@Component({
	selector: "kt-autorisations-detail",
	templateUrl: "./autorisations-detail.component.html",
	styleUrls: ["./autorisations-detail.component.scss"],
})
export class AutorisationsDetailComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	constructor(		private _dialog: MatDialog,
		private router: Router,

		private service: AutorisationsService,
		private service1: PersonnePhysiqueService,
		private service2: PersonneMoraleService,
		private activatedRoute: ActivatedRoute
	) { }
	// ====================================================================
	//
	// ====================================================================
	id;
	pjs;
	pjstraitement;
	allStatAut;
	timeDebutAutorisation = { hour: 10, minute: 10 };
	timeFinAutorisation = { hour: 10, minute: 10 };
	tableResponsable: any;
	details: any;
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
		respSuiviTravaux: [null],
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
	pageIndex
	pageSize
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		document.getElementById("pmmm").style.display = "none";
		document.getElementById("pppp").style.display = "none";

		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["reclam"];
			this.pageIndex = params['pageIndex'];
			this.pageSize = params['pageSize'];
		});

		
		this.service.getByIdAutorisation(this.id).subscribe((data) => {
			console.log("Autorisation : " + JSON.stringify(data, null, 2));
			this.details = data;
			this.tableResponsable = data.respSuiviTravaux;
			console.log("[AutorisationDetails] : " + JSON.stringify(this.details, null, 2));
			if (data.ppsourceautorisation == 0) {
				data.ppsourceautorisation = {
					nom: "",
					prenom: "",
					cin: "",
					adresse: "",
					telephoneFixe: "",
					telephoneGsm: "",
					eMail: "",
					fax: "",
				};
				
				if(data.pmsourceautorisation!=0){
					this.service2
					.getByIdpm(data.pmsourceautorisation)
					.subscribe((res) => {
						data.pmsourceautorisation = res;
						console.log("[PMSource] : " + JSON.stringify(res, null, 2));
					});
				}
			

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
						data.ppsourceautorisation = res;
					});
				data.pmsourceautorisation = {
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
			}
			this.autorisation = data;
			// this.details = data;
			// this.tableResponsable = data.respSuiviTravaux;
			// console.log("[AutorisationDetails] : " + JSON.stringify(this.details, null, 2));
			if (this.autorisation.dateDebut != null) {
				var m = new Date(this.autorisation.dateDebut);
				this.timeDebutAutorisation = {
					hour: m.getHours(),
					minute: m.getMinutes(),
				};
			}
			if (this.autorisation.dateFin != null) {
				var m = new Date(this.autorisation.dateFin);
				this.timeFinAutorisation = {
					hour: m.getHours(),
					minute: m.getMinutes(),
				};
			}
			//console.log(this.timeDebutAutorisation);
			//console.log(this.timeFinAutorisation);
		});
		this.service.getAllStatutAut().subscribe((da) => {
			//console.log(da);
			// this.statutTraitement=data.slice(1).slice(-3);
			this.allStatAut = da.slice(1).slice(-2);
			//console.log(this.allStatAut);
		});
		this.service.getByIdautorisationpjs(this.id).subscribe((m) => {
			this.pjs = m;
		});
		this.service
			.getByIdautorisationpjsTraitement(this.id)
			.subscribe((k) => {
				this.pjstraitement = k;
			});
	}
	pdfSrc: string = '';

	openDialog(pdfUrl: string) {
		console.log(pdfUrl)
		var r = pdfUrl.substring(0, pdfUrl.length - 4);
		this.pdfSrc = environment.API_ALFRESCO_URL + "/PjAutorisations/" + r;
		const dialogRef = this._dialog.open(PdfviewerComponent, {
			height: '500px',
			data: { pdfUrl: this.pdfSrc }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}
	// ====================================================================
	//
	// ====================================================================
	onClickPjName(e, id) {
		var r = e.substring(0, e.length - 4);
		window.open(environment.API_ALFRESCO_URL + "/PjAutorisations/" + r, "_blank");
	}
	// ====================================================================
	//
	// ====================================================================
	onClickPjTraitementName(e, id) {
		var r = e.substring(0, e.length - 4);
		window.open(
			environment.API_ALFRESCO_URL + "/PjAutorisations/traitement/" + r,
			"_blank"
		);
	}
	// ====================================================================
	// print reports
	// ====================================================================
	printGenerator(): void {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["reclam"];
		});
		this.service.PrintGenerator(this.id).subscribe((res) => {
			const file = new Blob([(res as unknown) as BlobPart], {
				type: "application/pdf",
			});
			const fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		});
	}
	retour(){
		this.router.navigate(["/autorisations/autorisations-list"], { queryParams: { pageIndex: parseInt(this.pageIndex) } });
	}
}
