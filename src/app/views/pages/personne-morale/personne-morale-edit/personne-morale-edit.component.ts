import { Component, OnInit } from "@angular/core";
import { PersonneMoraleService } from "../../shared/personne-morale.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
	selector: "app-personne-morale-edit",
	templateUrl: "./personne-morale-edit.component.html",
	styleUrls: ["./personne-morale-edit.component.css"],
})
export class PersonneMoraleEditComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	constructor(
		private service: PersonneMoraleService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// ====================================================================
	//
	// ====================================================================
	idpm;
	formData = {
		id: "",
		nom:"",
		contact: "",
		siteWeb: "",
		fax: "",
		eMail: "",
		teleGsm: "",
		teleFixe: "",
		adresse: "",
		numeroPatente: "",
		identifiantFiscal: "",
		rc: "",
	};
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idpm = params["id"];
		});
		this.service.getByIdpm(this.idpm).subscribe((data) => {
			this.formData = data;
		});
	}
	// ====================================================================
	//
	// ====================================================================
	onSubmit(form: NgForm) {
		this.service.sendpm(this.formData).subscribe((res) => {
			console.log(this.formData);
			this.router.navigate(["/personne-morale/personne-morale-list"]);
		});
	}
	// ====================================================================
	//
	// ====================================================================
	back() {
		this.router.navigate(["/personne-morale/personne-morale-list"]);
	}
}
