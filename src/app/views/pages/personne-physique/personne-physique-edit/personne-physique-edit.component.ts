import { Component, OnInit } from "@angular/core";
import { PersonnePhysiqueService } from "../../shared/personne-physique.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
	selector: "app-personne-physique-edit",
	templateUrl: "./personne-physique-edit.component.html",
	styleUrls: ["./personne-physique-edit.component.css"],
})
export class PersonnePhysiqueEditComponent implements OnInit {
	// =============================================================
	//
	// =============================================================
	constructor(
		private service: PersonnePhysiqueService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// =============================================================
	//
	// =============================================================
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
	idpp;
	// =============================================================
	//
	// =============================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idpp = params["id"];
		});
		this.service.getByIdpp(this.idpp).subscribe((data) => {
			console.log(data);
			this.formData = data;
		});
	}
	// =============================================================
	//
	// =============================================================
	onSubmit(form: NgForm) {
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
