import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-sortir-obstacles",
	templateUrl: "./sortir-obstacles.component.html",
	styleUrls: ["./sortir-obstacles.component.scss"],
})
export class SortirObstaclesComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}
	RetourEmbalages(): void {
		this.router.navigate(["pages/Obstacles/detaille-obstacles"]);
	}
	Enterrement(): void {
		this.router.navigate(["pages/Obstacles/enterrement-obstacles"]);
	}
	Transfert(): void {
		this.router.navigate(["pages/Obstacles/transfert-obstacles"]);
	}
}
