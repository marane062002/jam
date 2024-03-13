import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-localisation-flotte",
	templateUrl: "./localisation-flotte.component.html",
	styleUrls: ["./localisation-flotte.component.scss"],
})
export class LocalisationFlotteComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	backList() {
		this.router.navigate(["/pages/proprete-flotte/list-flotte"]);
	}
}
