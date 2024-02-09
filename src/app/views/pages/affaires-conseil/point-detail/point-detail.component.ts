import { Component, OnInit } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-point-detail",
	templateUrl: "./point-detail.component.html",
	styleUrls: ["./point-detail.component.scss"],
})
export class PointDetailComponent implements OnInit {
	// =====================================================================================
	//
	// =====================================================================================
	point = {
		id: 0,
		source: "",
		type: { libelle: "" },
		//dateRealisation: null,
		//budget: 0,
		typeVote: "",
		objet: "",
		statut: { libelle: "" },
		pasVote: 0,
		voteNon: 0,
		voteOui: 0,
		observations: "",
		//impacte: "",
		commission: { nomCommission: "" },
		session: { id: 0 },
	};
	// =====================================================================================
	//
	// =====================================================================================
	idPoint;
	choix1 = false;
	choix2 = false;
	choix4 = false;
	nomCommissions;
	// =====================================================================================
	//
	// =====================================================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// =====================================================================================
	//
	// =====================================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idPoint = params["id"];
		});
		this.service.getCommByPoint(this.idPoint).subscribe((data) => {
			this.nomCommissions = data;
		});
		this.service.getPointById(this.idPoint).subscribe((data) => {
			if (data.commission == null) {
				data.commission = { nomCommission: "" };
			}
			if (data.type == null) {
				data.type = { libelle: "" };
			}
			if (data.source == "داخلي") {
				this.choix1 = true;
			}
			if (data.source == "المكتب") {
				this.choix2 = true;
			}
			if (data.source == "مصدر آخر") {
				this.choix4 = true;
			}
			this.point = data;
		});
	}
}
