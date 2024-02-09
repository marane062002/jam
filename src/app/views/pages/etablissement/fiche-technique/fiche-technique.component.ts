import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-fiche-technique",
	templateUrl: "./fiche-technique.component.html",
	styleUrls: ["./fiche-technique.component.scss"],
})
export class FicheTechniqueComponent implements OnInit {
	isVisible: any = 0;
	Visible: any = 0;

	isSelected: boolean = false;
	constructor(private router: Router) {}

	ngOnInit() {}

	Suivant() {
		this.router.navigate(["/etablissement/list-visite"]);
	}
}
