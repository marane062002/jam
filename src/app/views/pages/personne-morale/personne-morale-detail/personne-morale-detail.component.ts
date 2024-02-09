import { Component, OnInit } from "@angular/core";
import { PersonneMoraleService } from "../../shared/personne-morale.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-personne-morale-detail",
	templateUrl: "./personne-morale-detail.component.html",
	styleUrls: ["./personne-morale-detail.component.css"],
})
export class PersonneMoraleDetailComponent implements OnInit {
	// ========================================================
	//
	// ========================================================
	constructor(
		private service: PersonneMoraleService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// ========================================================
	//
	// ========================================================
	idpm;
	formData = {
		id: 0,
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
	// ========================================================
	//
	// ========================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idpm = params["id"];
		});
		this.service.getByIdpm(this.idpm).subscribe((data) => {
			this.formData = data;
		});
	}
		// =======================================================
	//
	// ===========================================================
	back() {
		this.router.navigate(["/personne-morale/personne-morale-list"]);
	}
}
