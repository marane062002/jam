import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-prelevement",
	templateUrl: "./prelevement.component.html",
	styleUrls: ["./prelevement.component.scss"],
})
export class PrelevementComponent implements OnInit {
	Visible: any = 1;
	isVisible: any = 1;
	isSelected: boolean = true;
	constructor(private router: Router) {}

	ngOnInit() {}

	RetourEmbalages(): void {
		this.router.navigate(["/etablissement/list-visite"]);
	}
}
