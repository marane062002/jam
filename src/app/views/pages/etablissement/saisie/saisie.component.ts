import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-saisie",
	templateUrl: "./saisie.component.html",
	styleUrls: ["./saisie.component.scss"],
})
export class SaisieComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	RetourEmbalages(): void {
		this.router.navigate(["/etablissement/list-visite"]);
	}
}
