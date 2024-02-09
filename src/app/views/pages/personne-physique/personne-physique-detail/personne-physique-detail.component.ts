import { Component, OnInit } from "@angular/core";
import { PersonnePhysiqueService } from "../../shared/personne-physique.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-personne-physique-detail",
	templateUrl: "./personne-physique-detail.component.html",
	styleUrls: ["./personne-physique-detail.component.css"],
})
export class PersonnePhysiqueDetailComponent implements OnInit {
	// =================================================================
	//
	// =================================================================
	constructor(
		private service: PersonnePhysiqueService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// =================================================================
	//
	// =================================================================
	idpp;
	formData = {
		//id: 0,
		fax: "",
		eMail: "",
		telephoneGsm: "",
		telephoneFixe: "",
		adresse: "",
		cin: "",
		nom: "",
		prenom: "",
	};
	// =================================================================
	//
	// =================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			console.log("this is rec 1");
			console.log(params["id"]);
			this.idpp = params["id"];
		});
		this.service.getByIdpp(this.idpp).subscribe((data) => {
			console.log(data);
			this.formData = data;
		});
	}
	// =================================================================
	//
	// =================================================================
	back() {
		this.router.navigate(["/personne-physique/personne-physique-list"]);
	}
}
