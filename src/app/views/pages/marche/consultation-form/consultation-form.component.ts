import { Component, OnInit } from "@angular/core";
import { ConsultationService } from "../../shared/consultation.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { OrganisationService } from "../../organisation/organisation.service";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
	selector: "kt-consultation-form",
	templateUrl: "./consultation-form.component.html",
	styleUrls: ["./consultation-form.component.scss"],
})
export class ConsultationFormComponent implements OnInit {

	// ==================================================================
	//
	// ==================================================================
	typeConsultationAll;
	divisions: any;
	services: any;
	checkLang: string;
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
	};
	// ==================================================================
	//
	// ==================================================================
	constructor(
		private service: ConsultationService,
		private service2: OrganisationService,
		private router: Router,
		private translate: TranslateService,
	) {
		this.checkLang = window.localStorage.getItem("language");
	}
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

		this.service.getAllTypeConsultation().subscribe((data) => {
			this.typeConsultationAll = data;
		});
		this.getDivisions();
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
		this.service.sendconsultation(this.formData).subscribe((data) => {
			this.router.navigate(["/marches/consultation-list"]);
		});
	}
	// ==================================================================
	//
	// ==================================================================
	onReset() {

	}
	// ==================================================================
	//
	// ==================================================================
	backList() {
		this.router.navigate(["/marches/consultation-list"]);
	}
}
