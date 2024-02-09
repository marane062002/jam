import { Component, OnInit } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-prestataires-show",
	templateUrl: "./prestataires-show.component.html",
	styleUrls: ["./prestataires-show.component.scss"],
})
export class PrestatairesShowComponent implements OnInit {
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
	prestataire: {
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
		//console.log('ID PRESTATAIRE: '+ this.idPrest)
		this.service.getPrestataireById(this.idPrest).subscribe((data) => {
			console.log("PRESTATAIRE: " + JSON.stringify(data, null, 2));
			this.prestataire = data;
		});
	}
	// ========================================================
	//
	// ========================================================
	editPrestataire(idPrest) {
		this.router.navigate(["/marches/prestataire-edit"], {
			queryParams: { id: idPrest },
		});
	}
	// ========================================================
	//
	// ========================================================
	back() {
		this.router.navigate(["/marches/prestataires-list"]);
	}
}
