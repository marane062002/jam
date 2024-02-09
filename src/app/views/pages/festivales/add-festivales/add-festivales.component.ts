import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MatSelectChange } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { FestivaleService } from "../../utils/festivale.service";

@Component({
	selector: "kt-add-festivales",
	templateUrl: "./add-festivales.component.html",
	styleUrls: ["./add-festivales.component.scss"],
})
export class AddFestivalesComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	addFileForm: FormGroup;
	public uploadFiles: Array<File>;
	organisateurs: any;
	ChampOrganisation: any;
	isVisibleNature: boolean;
	isVisibleNomass: boolean;
	isVisibleAss: boolean;
	disabled: boolean = true;
	listAssociations: any[];
	valueAssociation: any = "";
	nomAssociation: string;

	constructor(private festivale: FestivaleService, private notification: NotificationService, private router: Router, private fb: FormBuilder, private translate: TranslateService, private dateAdapter: DateAdapter<Date>) {
		this.dateAdapter.setLocale("fr");
		this.getData();
		this.formBuilder();
	}

	ngOnInit() {
		this.isVisibleNature = false;
		this.isVisibleNomass = false;
		this.isVisibleAss = false;
	}

	onSubmit() {
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
			return;
		}
		//console.log("Result assoc!! " + this.addForm.get('communeActivite').value)
		this.addFestivale();
	}

	natureChanged(event: any) {
		console.log(event);
		console.log(event.value.libelle);
		if (event.value.libelle == "رياضي") {
			this.isVisibleNature = true;
			console.log("true");
		} else {
			this.isVisibleNature = false;
			console.log("false");
		}
	}

	nomChanged(event: any) {
		console.log(event);
		console.log(event.value.libelle);
		if (event.value.libelle == "مؤسسة عمومية" || event.value.libelle == " جماعة ترابية " || event.value.libelle == "مؤسسة خاصة") {
			console.log("true");
			this.isVisibleNomass = true;
		} else {
			this.isVisibleNomass = false;
		}

		if (event.value.libelle == "جمعية") {
			this.isVisibleAss = true;
		} else {
			this.isVisibleAss = false;
		}
	}

	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		this.addForm = this.fb.group({
			nomFestival: ["", Validators.required],
			organisateurs: [null],
			dateOrganisation: [""],
			localOrganisation: [""],
			champOrganisation: [null],
			budgetEvenement: [""],
			subventionCommunMar: [""],
			numLocalAssociation: [""],
			nature: [""],
			nomChoix: [""],
			nomOrg: [""],
			test: [""],

			// createurUser: [window.localStorage.getItem("fullnameUser")],
		});
	}

	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.disabled = false;
		this.festivale.getData().subscribe(
			(data) => {
				this.organisateurs = data[0];

				this.ChampOrganisation = data[1];
				//this.annexesAdmin = data[3];
				console.log(data[1]);
				console.log(data[0]);
			},
			(err) => {
				console.log(err);
			}
		);

		this.festivale.getAssociation().subscribe(
			(data) => {
				this.listAssociations = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	typeChanged(event: MatSelectChange) {
		this.valueAssociation = event.value.prioriter;
		this.nomAssociation = event.value.nom;
	}

	// ============================================
	// Ajouter un festivale
	// ============================================
	addFestivale() {
		console.log(this.addForm.value);
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.loading = true;
		this.addForm.value.nomChoix = this.nomAssociation;

		//this.addForm.get('communeActivite').setValue(this.addForm.get('communeActivite.id'))
		this.festivale.createObject("/festivale/new", this.addForm.value).subscribe(
			(data) => {
				this.loading = false;
				window.localStorage.removeItem("festivalesId");
				window.localStorage.setItem("festivalesId", data.toString());

				// upload files to alfresco GED
				//console.log("ID DE COURRIER -data: " +JSON.stringify(data) +	" OU BIEN -data.id: " +data);
				// if (this.uploadFiles)
				// 	this.service.updloadFile(this.uploadFiles, data).subscribe(
				// 		(res) => console.log("File inserted " + JSON.stringify(res)),
				// 		(err) => console.log("File not inserted " + JSON.stringify(err))
				// 	);
				this.router.navigate(["festivales/list-festivales"]);
				this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"));
			},
			(error) => {
				alert(error);
				this.loading = false;
			}
		);
	}
	// ============================================
	// type changed events
	// ============================================
	// organisateursChanged() {
	// 	let type = this.addForm.get("organisateurs").value;
	// 	if (type != null) {
	// 		if (type.libelle == "جمعية") {
	// 			document.getElementById("autreSpecialite").style.display = "inline";
	// 			this.addForm.get("autreType").setValue(null);
	// 		} else {
	// 			document.getElementById("autreSpecialite").style.display = "none";
	// 			this.addForm.get("autreType").setValue(null);
	// 		}
	// 	}
	// }

	Back(): void {
		this.router.navigate(["festivales/list-festivales"]);
	}

	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// back to list
	// =====================================
	back() {
		this.router.navigate(["festivales/list-festivales"]);
	}

	// ============================================
	// organisateursChanged events
	// ============================================
	// organisateursChanged() {
	// 	document.getElementById("autreAnnxe").style.display = "none";
	// 	this.addForm.get("annexeAdministratif").reset();
	// 	let arr = this.addForm.get("communeActivite").value;
	// 	this.festivale.getAllObjectListById("/annexeAdministratif/arrondissement/", arr).subscribe((data) => {
	// 		(this.annexesAdmin = data), console.log(data);
	// 	});
	// }
}
