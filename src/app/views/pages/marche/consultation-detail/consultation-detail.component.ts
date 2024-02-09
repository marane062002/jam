import { Component, OnInit } from "@angular/core";
import { ConsultationService } from "../../shared/consultation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { OrganisationService } from "../../organisation/organisation.service";

@Component({
	selector: "kt-consultation-detail",
	templateUrl: "./consultation-detail.component.html",
	styleUrls: ["./consultation-detail.component.scss"],
})
export class ConsultationDetailComponent implements OnInit {
	constructor(
		private service: ConsultationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service1: OrganisationService
	) {}
	consultation = {
		numConsultation: "",
		dateDebutConsultation: null,
		id: 1,
		seuilMinimal: 0,
		description: "",
		statut: { id: 1, libelle: "" },
		service: 0,
		division: 0,
		budgetGlobalPropose: 0,
		type: { id: 0, libelle: "" },
		objet: "",
	};
	idConsultation;
	mdPassation = "";
	divisionLibelle;
	serviceLibelle;
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idConsultation = params["id"];
		});
		this.service
			.getConsultationById(this.idConsultation)
			.subscribe((data) => {
				console.log(data);
				this.consultation = data;
				this.getDivisionEtService();
				if (data.modePassation) {
					this.mdPassation = "المرور بالتقييم التقني";
				} else {
					this.mdPassation = "دون المرور بالتقييم التقني";
				}
				var b = { index: 0 };
				this.changeTab(b);
			});
	}

	async getDivisionEtService() {
		await this.service1
			.findEntityById(this.consultation.division, "/divisions/find/")
			.subscribe((d) => {
				this.divisionLibelle = d.libelle;
				console.log(this.divisionLibelle);
			});

		await this.service1
			.findEntityById(this.consultation.service, "/services/find/")
			.subscribe((s) => {
				this.serviceLibelle = s.libelle;
			});
	}

	changeTab(a) {
		if (a.index == 0) {
			this.router.navigate(["marches/consultation-detail/commande"], {
				queryParams: { id: this.idConsultation },
			});
		}
		if (a.index == 1) {
			this.router.navigate(["marches/articles-list"]);
		}
		if (a.index == 2) {
			this.router.navigate(["marches/consultation-detail/prestataires"], {
				queryParams: { id: this.idConsultation },
			});
		}
		if (a.index == 3) {
			this.router.navigate(["marches/consultation-detail/commission"], {
				queryParams: { id: this.idConsultation },
			});
		}
	}

	AddCommande() {
		this.router.navigate(["marches/consultation-detail/commande"], {
			queryParams: { id: this.idConsultation },
		});
	}

	AddArticle() {
		this.router.navigate(["marches/articles-list"]);
	}

	AddCommission() {
		this.router.navigate(["marches/consultation-detail/commission"], {
			queryParams: { id: this.idConsultation },
		});
	}

	AddPrestataire() {
		this.router.navigate(["marches/consultation-detail/prestataires"], {
			queryParams: { id: this.idConsultation },
		});
	}
}
