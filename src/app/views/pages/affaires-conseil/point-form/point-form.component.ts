import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { OrganisationService } from "../../organisation/organisation.service";
import { PersonnelService } from "../../rh/services/personnel.service";

@Component({
	selector: "kt-point-form",
	templateUrl: "./point-form.component.html",
	styleUrls: ["./point-form.component.scss"],
})
export class PointFormComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	formData = {
		id: 0,
		source: "",
		description: "",
		session: { id: 0 },
		statut: { id: 1, libelle: "مقترحة" },
		membreBureau: null,
		//dateRealisation: null,
		//budget: 0,
		typeVote: "",
		objet: "",
		pasVote: 0,
		voteNon: 0,
		voteOui: 0,
		observations: "",
		//impacte: "",
		ordre: 0,
		sourceExterne: null,
		division: 0,
		service: 0,
		personnel: 0,
		type: { id: -1 },
	};
	statuts = [{ id: 1, libelle: "مقترحة" }];
	sources = [
		"داخلي",
		"المكتب",
		"الولاية",
		"المقاطعات",
		"الجمعيات",
		"مصدر آخر",
	];
    // ====================================================================
	//
	// ====================================================================
	//sources = ["المقاطعات", "الجمعيات"];
	loading = false;
	commissions11: any;
	sessionIds = [];
	services = [];
	divisions = [];
	personnels = [];
	choix1 = false;
	choix2 = false;
	choix4 = false;
	membresCommission;
	typesPoints;
	commissions;
	// ====================================================================
	//
	// ====================================================================
	constructor(
		private service: AffairesConseilService,
		private service2: OrganisationService,
		private service3: PersonnelService,
		private router: Router
	) {}
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		this.service.getSessionOperationnelle().subscribe((data) => {
			console.log("Data :::: " + JSON.stringify(data, null, 4));
			for (var i = 0; i < data.length; i++) {
				this.sessionIds.push(data[i]);
				console.log("Session :::: " + this.sessionIds);
			}
		});
		this.service.getAllMembreConseilByMondatActuel().subscribe((data) => {
			this.membresCommission = data;
		});
		this.service.getAllTypePoint().subscribe((data) => {
			this.typesPoints = data;
			console.log(data);
		});
		this.service.getAllCommissionActuelles().subscribe((data) => {
			console.log("commissions: " + JSON.stringify(data,null,2));
			this.commissions = data;
		});

		this.getDivisions();
	}
	// ====================================================================
	//
	// ====================================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ====================================================================
	//
	// ====================================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formData.service = 0;
		if (idDivision != 0) {
			this.service3
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
			this.service2
				.getRessourceById(idDivision, "/services/divisions/")
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
			this.personnels = null;
		}
	}
	// ====================================================================
	//
	// ====================================================================
	onChangeService(f) {
		const idService = f.value;
		if (idService != 0) {
			this.service3
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		}
	}
	// ====================================================================
	//
	// ====================================================================
	onChangeofOptionsComm(f) {
		console.log(this.commissions11);
	}
	// ====================================================================
	//
	// ====================================================================
	onChangeofOptionsSource(f) {
		this.formData.membreBureau = null;
		this.formData.sourceExterne = null;
		this.formData.division = 0;
		this.formData.service = 0;
		this.formData.personnel = 0;
		this.choix1 = false;
		this.choix2 = false;
		this.choix4 = false;
		if (f.value == "داخلي") {
			this.choix1 = true;
		}
		if (f.value == "المكتب") {
			this.choix2 = true;
		}
		if (f.value == "الولاية") {
		}
		if (f.value == "مصدر آخر") {
			this.choix4 = true;
		}
	}
	// ====================================================================
	//
	// ====================================================================
	send() {
		this.loading = true;
		var form = this.formData;
		//console.log('Point : '+ JSON.stringify(form,null,2));
		this.service.countPoint(this.formData.session.id).subscribe((res) => {
			//console.log('CountPoint : '+ JSON.stringify(res,null,2));
			this.formData.ordre = res + 1;
			console.log('Form : '+ JSON.stringify(form,null,2));
			this.service.sendPoint(form).subscribe((data) => {
				console.log('SendPoint : '+ JSON.stringify(data,null,2));
				for (var i = 0; i < this.commissions11.length; i++) {
					var commPoint = {
						point: { id: data.id },
						commission: { id: this.commissions11[i] },
					};
					this.service
						.sendPointCommission(commPoint)
						.subscribe((res1) => {
							console.log(res1);
						});
				}
				this.router.navigate(
					["/affaires-conseil/session-detail/point-list-session"],
					{ queryParams: { id: this.formData.session.id } }
				);
			});
		});
	}
	// ====================================================================
	//
	// ====================================================================
	onReset() {
		this.formData.session.id = 0;
		this.formData.source = "";
		this.formData.description = "";
		this.formData.statut.id = 1;
		this.formData.membreBureau = null;
		this.formData.typeVote = "";
		this.formData.objet = "";
		this.formData.pasVote = 0;
		this.formData.voteNon = 0;
		this.formData.voteOui = 0;
		this.formData.observations = "";
		this.formData.ordre = 0;
		this.formData.sourceExterne = null;
		this.formData.division = 0;
		this.formData.service = 0;
		this.formData.personnel = 0;
		this.formData.type.id = -1;
	}
}
