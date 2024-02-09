import { Component, OnInit } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
	selector: "kt-membre-bureau-add",
	templateUrl: "./membre-bureau-add.component.html",
	styleUrls: ["./membre-bureau-add.component.scss"],
})
export class MembreBureauAddComponent implements OnInit {
	loading = false;
	rolesAll;
	formData = {
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
			actif: 0,
			niveauScolaire: 0,
			situationFamiliale: 0,
			profession: "",
		},
		mondat: { id: 0 },
		role: {},
	};
	membresConseil = [];
	idMondat;
	// ===========================================
	// Statuts elus
	// ===========================================
	statutElu = [
		{ id: 1, libelle: "مزاول لمهامه" },
		{ id: 0, libelle: "غير مزاول لمهامه" },
	];

	// ===========================================
	// Situalions familiale
	// ===========================================
	situationFamill = [
		{ id: 1, libelle: "عازب (ة)" },
		{ id: 2, libelle: "متزوج (ة)" },
		{ id: 3, libelle: "مطلق(ة)" },
		{ id: 4, libelle: "أرمل(ة)" },
	];
	// ===========================================
	//Niveaux scolaires
	// ===========================================
	niveauScolaire = [
		{ id: 1, libelle: "ابتدائي" },
		{ id: 2, libelle: "ثانوي" },
		{ id: 3, libelle: "عالي" },
	];

	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idMondat = params["id"];
		});
		this.service.getAllRoleMembreConseil().subscribe((data) => {
			console.log(data);
			this.rolesAll = data;
		});
	}

	onSubmit(form: NgForm) {
		console.log("Info membre: "+ JSON.stringify(this.formData,null,2));
		this.loading = true;
		this.formData.mondat.id = this.idMondat;
		this.membresConseil.push(this.formData);
		this.service.sendMembreConseil(this.membresConseil).subscribe((res) => {
			this.router.navigate(["affaires-conseil/mondat-detail"], {
				queryParams: { id: this.idMondat },
			});
		});
	}
	// ==========================================
	// back to liste
	// ==========================================
	back() {
		this.formData.mondat.id = this.idMondat;
		this.router.navigate(["affaires-conseil/mondat-detail"], {
			queryParams: { id: this.idMondat },
		});
	}
}
