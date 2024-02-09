import { Component, OnInit } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-prestataires-form",
	templateUrl: "./prestataires-form.component.html",
	styleUrls: ["./prestataires-form.component.scss"],
})
export class PrestatairesFormComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	formDataPrestataire = {
		nom: null,
		rc: null,
		ice: null,
		idFisc: null,
		tel: null,
		mail: null,
		adresse: null,
	};
	// ====================================================================
	//
	// ====================================================================
	constructor(private service: AoService, private router: Router) {}
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {}
	// ====================================================================
	//
	// ====================================================================
	onSubmit() {
		//console.log("JSON OUT: " + JSON.stringify(this.formDataPrestataire, null, 2));

		this.service
			.sendReservePrestataire(this.formDataPrestataire)
			.subscribe((res) => {
				this.router.navigate(["/marches/prestataires-list"]);
			});
	}
	// ====================================================================
	//
	// ====================================================================
	back() {
		this.router.navigate(["/marches/prestataires-list"]);
	}
}
