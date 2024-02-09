import { Component, OnInit } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { OrganisationService } from "../../organisation/organisation.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { flatMap } from "rxjs/operators";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
	selector: "kt-marche-new",
	templateUrl: "./marche-new.component.html",
	styleUrls: ["./marche-new.component.scss"],
})
export class MarcheNewComponent implements OnInit {
	// ==========================================================
	//
	// ==========================================================
	formData = {
		id: 1,
		ao: null,
		numAo: "",
		prestataire: {
			id: 1,
			nom: "",
			prenom: "",
			rc: "",
			mail: "",
			adresse: "",
		},
		adjucataire: {
			id: 1,
			nom: "",
			prenom: "",
			adresse: "",
			mail: "",
			rc: "",
		},
		statutMarche: { id: 1, libelle: "" },
		descriptif: "",
		responsableMarche: 0,
		service: 0,
		division: 0,
		dateNotification: null,
		mntEngage: 0,
		plafondRetenu: 0,
		prctRetenu: 0,
		cautionDefinitive: 0,
		delaisExecution: 0,
		dateDebutMarche: null,
		modePassation: { id: 0, libelle: "" },
		objet: "",
		mntAdjucataire: 0,
		numMarche: "",
		createurUser: "",
	};
	prestataire = {
		nom: "",
		prenom: "",
		adresse: "",
		mail: "",
		rc: "",
		ice: "",
		idFisc: "",
		tel: "",
	};
	// ==========================================================
	//
	// ==========================================================
	AllModePassation = [];
	divisions;
	services;
	checkLang: string;
	// ==========================================================
	//
	// ==========================================================
	constructor(
		private service: AoService,
		private service2: OrganisationService,
		private router: Router,
		private translate: TranslateService,
	) {
		this.checkLang = window.localStorage.getItem("language");
	}
	// ==========================================================
	//
	// ==========================================================
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});
		this.service.getAllModePassationMarche().subscribe((data) => {
			this.AllModePassation = data;
			this.AllModePassation.shift();
			console.log(this.AllModePassation);
			this.getDivisions();
		});
	}
	// ==========================================================
	//
	// ==========================================================
	getDivisions() {
		this.service2.getRessource("/divisions/index").subscribe((data) => {
			this.divisions = data;
		});
	}
	// ==========================================================
	//
	// ==========================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formData.service = 0;
		if (idDivision != 0) {
			this.service2
				.getRessourceById(idDivision, "/services/divisions/")
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
		}
	}
	// ==========================================================
	//
	// ==========================================================
	// this.service.sendReservePrestataire(this.formDataPrestataire).subscribe(res => {
	onSubmit(form: NgForm) {
		this.service
			.sendReservePrestataire(this.prestataire)
			.subscribe((res1) => {
				this.formData.adjucataire.id = res1.id;
				this.formData.createurUser = window.localStorage.getItem("fullnameUser");

				//console.log("marche :: " + JSON.stringify(this.formData,null,2))
				this.service.sendMarche(this.formData).subscribe((data) => {
					this.router.navigate(["/marches/marches-list"]);
				});
			});
	}
}
