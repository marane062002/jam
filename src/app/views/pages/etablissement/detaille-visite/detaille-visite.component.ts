import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-detaille-visite",
	templateUrl: "./detaille-visite.component.html",
	styleUrls: ["./detaille-visite.component.scss"],
})
export class DetailleVisiteComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	prelevement() {
		this.router.navigate(["/etablissement/prelevement"]);
	}

	saisie() {
		this.router.navigate(["/etablissement/saisie"]);
	}
}
