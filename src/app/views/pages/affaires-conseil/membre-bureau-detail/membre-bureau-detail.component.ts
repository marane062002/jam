import { Component, OnInit } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-membre-bureau-detail",
	templateUrl: "./membre-bureau-detail.component.html",
	styleUrls: ["./membre-bureau-detail.component.scss"],
})
export class MembreBureauDetailComponent implements OnInit {
	formData = {
		id: 0,
		membre: {
			tele: 0,
			mail: "",
			adresse: "",
			cin: "",
			nom: "",
			prenom: "",
			parti: "",
			arrondissement: "",
			remarques: "",
			profession: "",
			situationFamiliale: 0,
			niveauScolaire: 0,
			actif: 0,
		},
		mondat: { id: 0 },
		role: { libelle: "" },
	};
	membresConseil = [];
	idMondat;
	statutElu = [
		{ id: 1, libelle: "مزاول لمهامه" },
		{ id: 0, libelle: "غير مزاول لمهامه" },
	];
	idElus;

	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idElus = params["id"];
		});
		this.service.getEluById(this.idElus).subscribe((res) => {
			this.formData = res;
			console.log(JSON.stringify(res))
		});
	}

	// =====================================================
	// get situation famill
	// =====================================================
	getSituationFamiliale(id: number) {
		if (id != null) {
			switch (id) {
				case 1:
					return "عازب (ة)";
				case 2:
					return "متزوج (ة)";
				case 3:
					return "مطلق(ة)";
				case 4:
					return "أرمل(ة)";
				default:
					return "";
			}
		} else return "";
	}
	// =====================================================
	// get niveau scolaire
	// =====================================================
	getNiveauScolaire(id: number) {
		if (id != null) {
			switch (id) {
				case 1:
					return "ابتدائي";
				case 2:
					return "ثانوي";
				case 3:
					return "عالي";
				default:
					return "";
			}
		} else return "";
	}
	// =====================================================
	// get statut elus
	// =====================================================
	getStatutElus(id: number) {
		if (id != null) {
			switch (id) {
				case 0:
					return "غير مزاول لمهامه";
				case 1:
					return "مزاول لمهامه";
				default:
					return "";
			}
		} else return "";
	}

	back(){
		this.idMondat = this.formData.mondat.id;
		console.log('id: '+ this.idMondat)
		this.router.navigate(["affaires-conseil/mondat-detail"], {
			queryParams: { id: this.idMondat },
		});
	}
}
