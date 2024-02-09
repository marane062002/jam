import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-upd-visite",
	templateUrl: "./upd-visite.component.html",
	styleUrls: ["./upd-visite.component.scss"],
})
export class UpdVisiteComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	RetourEmbalages() {
		this.router.navigate(["/etablissement/list-visite"]);
	}
}
