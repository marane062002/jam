import { Component, OnInit } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { OrganisationService } from "../../organisation/organisation.service";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SpinnerService } from '../../utils/spinner.service';
import { finalize } from 'rxjs/operators';

@Component({
	selector: "kt-marche-form",
	templateUrl: "./marche-form.component.html",
	styleUrls: ["./marche-form.component.scss"],
})
export class MarcheFormComponent implements OnInit {
	checkLang: string;
	// =======================================================
	//
	// =======================================================
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service2: OrganisationService,
		private translate: TranslateService,
		private spinnerService: SpinnerService,
	) {
		this.checkLang = window.localStorage.getItem("language");
	}
	// =======================================================
	//
	// =======================================================
	formData = {
		id: 1,
		ao: { id: 1 },
		numAo: "",
		prestataire: {
			id: 1,
			nom: "",
			tel: "",
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
		createurUser:"",
	};

	typeBien = [
		{ id: 1, libelle: "service1" },
		{ id: 2, libelle: "service2" },
	];
	typeBien1 = [
		{ id: 1, libelle: "division 1" },
		{ id: 2, libelle: "division 2" },
	];
	personnel = [
		{ id: 1, libelle: " pers1" },
		{ id: 2, libelle: "pers2" },
	];
	// =======================================================
	//
	// =======================================================
	idao;
	AllModePassation;
	idOffreDeposee;
	ao;
	offreAdjucataire;
	divisions;
	services;
	// =======================================================
	//
	// =======================================================
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
			this.idOffreDeposee = params["idO"];
		});

		this.getDivisions();

		var spinnerRef = this.spinnerService.start('...جاري التحميل'); // start spinner

		this.service.getAoById(this.idao)
		.pipe(finalize(() => {
			this.spinnerService.stop(spinnerRef);// stop spinner
		}))
		.subscribe((data) => {
			this.ao = data;
			//console.log("DATA 1: " + JSON.stringify(this.ao, null, 2));
			this.formData.ao.id = this.idao;
			this.formData.numAo = this.ao.numAo;
			this.formData.objet = this.ao.objet;
			this.formData.descriptif = this.ao.descriptif;
			this.formData.service = this.ao.serviceGestionnaire;
			this.formData.division = this.ao.division;
			if (this.ao.modePassation != "" || this.ao.modePassation != null) {
				if (this.ao.modePassation == "Mieux disant") {
					this.formData.modePassation.id = 1;
				} else {
					this.formData.modePassation.id = 2;
				}
			}

			this.service2
				.getRessourceById(
					this.formData.division,
					"/services/divisions/"
				)
				.subscribe((data) => {
					this.services = data;
				});
		});

		this.service.OffreById(this.idOffreDeposee).subscribe((data) => {
			//console.log("DATA 2: " + JSON.stringify(data, null, 2));
			this.offreAdjucataire = data;
			this.formData.adjucataire.id = this.offreAdjucataire.prestataire.id;
			this.formData.mntAdjucataire = this.offreAdjucataire.montantPropose;
			this.formData.cautionDefinitive =
				(this.offreAdjucataire.montantPropose * 3) / 100;
			this.formData.prestataire.nom = this.offreAdjucataire.prestataire.nom;
			this.formData.prestataire.tel = this.offreAdjucataire.prestataire.tel;
			this.formData.prestataire.adresse = this.offreAdjucataire.prestataire.adresse;
			this.formData.prestataire.mail = this.offreAdjucataire.prestataire.mail;
			this.formData.prestataire.rc = this.offreAdjucataire.prestataire.rc;
		});

		this.service.getAllModePassationMarche().subscribe((data) => {
			//console.log("DATA 3: " + JSON.stringify(data, null, 2));
			this.AllModePassation = data;
		});
	}
	// =======================================================
	//
	// =======================================================
	getDivisions() {
		this.service2.getRessource("/divisions/index").subscribe((data) => {
			this.divisions = data;
		});
	}
	// =======================================================
	//
	// =======================================================
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
	// =======================================================
	//
	// =======================================================
	onSubmit(form: NgForm) {
		this.formData.createurUser = window.localStorage.getItem("fullnameUser");
		this.service.sendMarche(this.formData).subscribe((data) => {
			this.router.navigate(["/marches/marches-list"]);
		});
	}
	// =======================================================
	//
	// =======================================================
	backAo() {
		this.router.navigate(["/marches/marches-list"]);
	}
}
