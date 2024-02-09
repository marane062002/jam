import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonneMoraleService } from "../../shared/personne-morale.service";
import { NgForm, FormControl, Validators } from "@angular/forms";

@Component({
	selector: "app-personne-morale-form",
	templateUrl: "./personne-morale-form.component.html",
	styleUrls: ["./personne-morale-form.component.css"],
})
export class PersonneMoraleFormComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	constructor(
		private service: PersonneMoraleService,
		private router: Router
	) {}
	// ====================================================================
	//
	// ====================================================================
	formData = {
		nom: "",
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
	
	/*
	email = new FormControl("", [Validators.required, Validators.email]);
	getErrorMessage() {
		return this.email.hasError("required")
			? "You must enter a value"
			: this.email.hasError("email")
			? "Not a valid email"
			: "";
	}
	*/
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {}
	// ====================================================================
	//
	// ====================================================================
	onSubmit(form: NgForm) {
		this.service.sendpm(this.formData).subscribe((res) => {
			console.log("this is res1 ");
			console.log(this.formData);
			this.router.navigate(["/personne-morale/personne-morale-list"]);
		}),
			(err) => {
				alert("err lors de l'ajout");
			};
	}
	// ====================================================================
	//
	// ====================================================================
	back() {
		this.router.navigate(["/personne-morale/personne-morale-list"]);
	}
}
