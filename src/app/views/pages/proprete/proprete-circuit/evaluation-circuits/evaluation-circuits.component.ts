import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "kt-evaluation-circuits",
	templateUrl: "./evaluation-circuits.component.html",
	styleUrls: ["./evaluation-circuits.component.scss"],
})
export class EvaluationCircuitsComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit() {}

	backList() {
		this.router.navigate(["/pages/proprete-circuit/list-circuit"]);
	}
}
