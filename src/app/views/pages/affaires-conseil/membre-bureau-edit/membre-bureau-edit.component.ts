import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-membre-bureau-edit",
	templateUrl: "./membre-bureau-edit.component.html",
	styleUrls: ["./membre-bureau-edit.component.scss"],
})
export class MembreBureauEditComponent implements OnInit {
	loading =  false;
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
			actif: 0,
			remarques: "",
			niveauScolaire: 0,
			situationFamiliale: 0,
			profession: "",
		},
		mondat: { id: 0 },
		role: { id: 0 },
	};
	membresConseil = [];
	idMondat;
	idElus;
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
			this.idElus = params["id"];
		});
		this.service.getEluById(this.idElus).subscribe((res) => {
			console.log(res);
			this.formData = res;
		});
		this.service.getAllRoleMembreConseil().subscribe((data) => {
			console.log(data);
			this.rolesAll = data;
		});
	}

	onSubmit(form: NgForm) {
		this.loading = true;
		this.membresConseil.push(this.formData);
		this.service.sendMembreConseil(this.membresConseil).subscribe((res) => {
			this.router.navigate(["affaires-conseil/mondat-detail"], {
				queryParams: { id: this.formData.mondat.id },
			});
		});
	}

	// ==========================================
	// back to liste
	// ==========================================
	back() {
		this.router.navigate(["affaires-conseil/mondat-detail"], {
			queryParams: { id: this.formData.mondat.id },
		});
	}
}
