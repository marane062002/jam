import { Component, OnInit } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-audience-edit",
	templateUrl: "./audience-edit.component.html",
	styleUrls: ["./audience-edit.component.scss"],
})
export class AudienceEditComponent implements OnInit {
	// =============================================================
	//
	// =============================================================
	idAudience;
	timeDebutAudience = { hour: 10, minute: 10 };
	timeFinAudience = { hour: 10, minute: 10 };
	sessionIds = [];
	// =============================================================
	//
	// =============================================================
	formData = {
		heureDebut: null,
		heureFin: null,
		dateAudience: null,
		numAudience: "",
		session: { id: 0 },
	};
	// =============================================================
	//
	// =============================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// =============================================================
	//
	// =============================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idAudience = params["id"];
		});
		this.service.getSessionOperationnelle().subscribe((data) => {
			for (var i = 0; i < data.length; i++) {
				this.sessionIds.push(data[i]);
			}
		});
		this.service.getAudienceById(this.idAudience).subscribe((data) => {
			this.formData = data;
			var m = new Date(data.heureDebut);
			var m1 = new Date(data.heureFin);
			this.timeDebutAudience = {
				hour: m.getHours(),
				minute: m.getMinutes(),
			};
			this.timeFinAudience = {
				hour: m1.getHours(),
				minute: m1.getMinutes(),
			};
		});
	}
	// =============================================================
	//
	// =============================================================
	send() {
		this.formData.heureDebut = new Date(
			"2000/12/12" +
				" " +
				this.timeDebutAudience.hour +
				":" +
				this.timeDebutAudience.minute
		);
		this.formData.heureFin = new Date(
			"2000/12/12" +
				" " +
				this.timeFinAudience.hour +
				":" +
				this.timeFinAudience.minute
		);
		this.service.editAudience(this.formData).subscribe((resfork) => {
			this.router.navigate(["/affaires-conseil/audience-list"]);
		});
	}
	// =============================================================
	//
	// =============================================================
	backList(){
		this.router.navigate(["/affaires-conseil/audience-list"]);
	}
}
