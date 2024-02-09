import { Component, OnInit } from "@angular/core";
import { AttestationService } from "../../services/attestation.service";
import { PersonnelService } from "../../services/personnel.service";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-print-page",
	templateUrl: "./print-page.component.html",
	styleUrls: ["./print-page.component.scss"],
})
export class PrintPageComponent implements OnInit {
	id: number;
	demande: any;
	constructor(
		private service: AttestationService ,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute
	) {
		console.log("test: ")
		this.route.queryParams.subscribe((params) => {
			this.id = params["id"];
		});


	}

	getAttestation() {
		this.service.getDataShowAttestation(1).then(
			(data) => {
				this.demande = data[0];
				console.log("out: "+ JSON.stringify(this.demande,null,2))
			},
			(error) => console.log(error)
		);
	}

	ngOnInit() {
		this.getAttestation();
	}
}
