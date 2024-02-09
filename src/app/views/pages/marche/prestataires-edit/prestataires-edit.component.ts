import { Component, OnInit } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-prestataires-edit",
	templateUrl: "./prestataires-edit.component.html",
	styleUrls: ["./prestataires-edit.component.scss"],
})
export class PrestatairesEditComponent implements OnInit {
	// ========================================================
	//
	// ========================================================
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// ========================================================
	//
	// ========================================================
	idPrest;
	prestataireForm: {
		id: 0;
		nom: "";
		tel: "";
		rc: "";
		mail: "";
		adresse: "";
		ice: "";
		idFisc: "";
	};
	// ========================================================
	//
	// ========================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idPrest = params["id"];
		});
		console.log("ID PRESTATAIRE: " + this.idPrest);

		this.service.getPrestataireById(this.idPrest).subscribe((data) => {
			console.log("PRESTATAIRE: " + JSON.stringify(data, null, 2));
			this.prestataireForm = data;
		});
	}
	// ========================================================
	//
	// ========================================================
	onSubmit() {
		this.service
			.updatePrestataire(this.prestataireForm)
			.subscribe((res) => {
				this.router.navigate(["/marches/prestataires-list"]);
			});
	}
	// ========================================================
	//
	// ========================================================
	back() {
		this.router.navigate(["/marches/prestataires-list"]);
	}
}
