import { Component, OnInit } from "@angular/core";
import { ConsultationService } from "../../shared/consultation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { forkJoin } from "rxjs";
import { NgForm } from "@angular/forms";
import { OrganisationService } from "../../organisation/organisation.service";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
	selector: "kt-consultation-form-service-bc",
	templateUrl: "./consultation-form-service-bc.component.html",
	styleUrls: ["./consultation-form-service-bc.component.scss"],
})
export class ConsultationFormServiceBCComponent implements OnInit {
	checkLang: string;
	// ==================================================================
	//
	// ==================================================================
	constructor(
		private service: ConsultationService,
		private router: Router,
		private service2: OrganisationService,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
	) {
		this.checkLang = window.localStorage.getItem("language");
	}
	// ==================================================================
	//
	// ==================================================================
	modePassationAll = [
		{ id: true, libelle: "Valorisation technique" },
		{ id: false, libelle: "Sans valorisation technique" },
	];
	// ==================================================================
	//
	// ==================================================================
	showSeuilMin = 0;
	idConsultation;
	typeConsultationAll;
	divisions: any;
	services: any;
	// ==================================================================
	//
	// ==================================================================
	formData = {
		numConsultation: "",
		dateDebutConsultation: null,
		id: 1,
		seuilMinimal: 0,
		description: "",
		statut: { id: 1, libelle: "" },
		service: 0,
		division: 0,
		budgetGlobalPropose: 0,
		type: { id: 0, libelle: "" },
		objet: "",
		modePassation: null,
	};
	// ==================================================================
	//
	// ==================================================================
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});

		this.activatedRoute.queryParams.subscribe((params) => {
			this.idConsultation = params["id"];
		});
		this.getDivisions();

		forkJoin(
			this.service.getAllTypeConsultation(),
			this.service.getConsultationById(this.idConsultation)
		).subscribe((res) => {
			this.populate(res[0], res[1]);
		});
	}
	// ==================================================================
	//
	// ==================================================================
	populate(a, b) {
		this.typeConsultationAll = a;
		this.service2
			.getRessourceById(b.division, "/services/divisions/")
			.subscribe((data) => {
				this.services = data;
			});
		console.log(b);
		if (b.modePassation) {
			this.showSeuilMin = 1;
		}
		this.formData = b;
		if (this.formData) {
			if (this.formData.dateDebutConsultation != null)
				this.formData.dateDebutConsultation = new Date(b.dateDebutConsultation).toISOString();
		}
	}
	// ==================================================================
	//
	// ==================================================================
	onChangeofModePassation(a) {
		this.showSeuilMin = a.value * 1;
		if (!a) {
			this.formData.seuilMinimal = 0;
		}
	}
	// ==================================================================
	//
	// ==================================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ==================================================================
	//
	// ==================================================================
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
	// ==================================================================
	//
	// ==================================================================
	onSubmit(form: NgForm) {
		this.formData.statut.id = 2;
		if (this.showSeuilMin) {
			this.formData.modePassation = true;
		} else {
			this.formData.modePassation = false;
		}
		this.service.editconsultation(this.formData).subscribe((data) => {
			this.router.navigate(["/marches/consultation-list"]);
		});
	}
	// ==================================================================
	//
	// ==================================================================
	backList() {
		this.router.navigate(["/marches/consultation-list"]);
	}
}
