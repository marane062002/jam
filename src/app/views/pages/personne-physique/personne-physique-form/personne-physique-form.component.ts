import { Component, OnInit } from "@angular/core";
import { NgForm, FormControl, Validators } from "@angular/forms";
import { PersonnePhysiqueService } from "../../shared/personne-physique.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-personne-physique-form",
	templateUrl: "./personne-physique-form.component.html",
	styleUrls: ["./personne-physique-form.component.css"],
})
export class PersonnePhysiqueFormComponent implements OnInit {
	// ============================================================
	//
	// ============================================================
	formData = {
		fax: "",
		eMail: "",
		telephoneGsm: "",
		telephoneFixe: "",
		adresse: "",
		cin: "",
		nom: "",
		prenom: "",
	};
	// ============================================================
	//
	// ============================================================
	//email = new FormControl("", [Validators.required, Validators.email]);
	// ============================================================
	//
	// ============================================================
	/*
	getErrorMessage() {
		return this.email.hasError("required")
			? "You must enter a value"
			: this.email.hasError("email")
			? "Not a valid email"
			: "";
	}
	*/
	// ============================================================
	//
	// ============================================================
	constructor(
		private service: PersonnePhysiqueService,
		private router: Router
	) {}
	// ============================================================
	//
	// ============================================================
	ngOnInit() {}
	// ============================================================
	//
	// ============================================================
	somethingChanged() {
		console.log(this.formData);
	}
	// ============================================================
	//
	// ============================================================
	onSubmit(form: NgForm) {
		console.log('pp : '+ JSON.stringify(this.formData,null,2) )
		this.service.sendpp(this.formData).subscribe((res) => {
			this.router.navigate(["/personne-physique/personne-physique-list"]);
		});
	}
	// =============================================================
	//
	// =============================================================
	back() {
		this.router.navigate(["/personne-physique/personne-physique-list"]);
	}
}
