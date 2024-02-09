import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSelectChange } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { finalize, first } from "rxjs/operators";
import { NotificationService } from "../../shared/notification.service";
import { FestivaleService } from "../../utils/festivale.service";
import { SpinnerService } from "../../utils/spinner.service";
import { Location } from "@angular/common";

@Component({
	selector: "kt-updat-festivales",
	templateUrl: "./updat-festivales.component.html",
	styleUrls: ["./updat-festivales.component.scss"],
})
export class UpdatFestivalesComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	id: any;
	loading = false;
	submitted = false;
	addForm: FormGroup;
	addFileForm1: FormGroup;
	addFileForm2: FormGroup;
	addFileForm3: FormGroup;
	addFileForm4: FormGroup;
	addFileForm5: FormGroup;
	public uploadFiles1: Array<File>;
	public uploadFiles2: Array<File>;
	public uploadFiles3: Array<File>;
	public uploadFiles4: Array<File>;
	public uploadFiles5: Array<File>;
	// Listes
	arrondissements: any;
	statuts: any;
	typeActivites: any;
	villes: any;
	annexesAdmin: any;
	organisateurs: any;
	ChampOrganisation: any;
	isVisibleNature: boolean=false;

	isVisibleNomass: boolean=false;

	isVisibleAss: boolean=false;

	// Liste des classements

	constructor(private festivale: FestivaleService, private service: FestivaleService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private location: Location, private notification: NotificationService, private translate: TranslateService, private spinnerService: SpinnerService) {
		this.formBuilder();
		this.getData();
	}

	nomChanged(event: any) {
		if (event.value.libelle == 'مؤسسة خاصة' || event.value.libelle == 'مؤسسة عمومية') {
			this.isVisibleNomass = true;
			this.isVisibleAss = false;
		} 
		else if (event.value.libelle == 'جمعية') {
			this.isVisibleAss = true;
			this.isVisibleNomass=false
		}
		else {
			this.isVisibleNomass = false;
			this.isVisibleAss = false;
		}
		console.log(event);
		this.addForm.get('nomOrg').reset();
	}
	natureChanged(event: any) {
		let ville = this.addForm.get("champOrganisation").value;
		console.log(event);
		console.log(event.value.libelle);
		if (event.value.libelle == "رياضي") {
			this.isVisibleNature = true;
		} else {
			this.isVisibleNature = false;
		}
	}

	ngOnInit() {
		this.isVisibleNature = false;
		this.isVisibleNomass = false;
		this.isVisibleAss = false;
		// document.getElementById("autreAnnxe").style.display = "none";
		// document.getElementById("autreSpecialite").style.display = "none";
		this.fileBuilder();
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/festivales/showBy/", this.id)
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			)
			.subscribe((data) => {
				console.log("Fetch data  : " + JSON.stringify(data, null, 2));
				//this.addForm.patchValue(data);
				this.addForm.patchValue({ ...data });
				if (data.nature != null && data.nature != "") {
					this.isVisibleNature = true;
				}
				if (data.nomOrg != null && data.nomOrg != "") {
					this.isVisibleNomass = true;
				}
				if (data.nomChoix != null && data.nomChoix != "") {
					this.isVisibleAss = true;
				}
				//  if (data) {
				//
				//  	this.addForm.controls["id"].patchValue(data.id);

				// 	this.addForm.controls["nomFestival"].patchValue(data.nomFestival);
				// 	this.addForm.controls["numAcquisition"].patchValue(data.numAcquisition);
				// 	this.addForm.controls["nomAssociation"].patchValue(data.nomAssociation);
				// 	this.addForm.controls["local"].patchValue(data.local);
				// 	this.addForm.controls["nomProjet"].patchValue(data.nomProjet);
				// 	this.addForm.controls["champActivite"].patchValue(data.champActivite);
				// 	this.addForm.controls["natureActivite"].patchValue(data.natureActivite);
				// 	this.addForm.controls["cible"].patchValue(data.cible);
				// 	this.addForm.controls["activite_de_rayonnement"].patchValue(data.activite_de_rayonnement);
				// 	// this.addForm.controls['champActivite'].patchValue(data.champActivite);
				// 	this.addForm.controls["durre"].patchValue(data.durre);
				// 	this.addForm.controls["paiement"].patchValue(data.paiement);
				// 	this.addForm.controls["montantDemande"].patchValue(data.montantDemande);
				//  }
			});
	}
	valueAssociation: any = "";
	nomAssociation: string;

	campareWithId(p1: any, p2: any): boolean {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	// ============================================
	// OnSubmit
	// ============================================
	getData() {
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
	onSubmit() {
		//console.log("Association :: " + JSON.stringify(this.addForm.value,null, 2))
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
			return;
		}

		this.loading = true;

		this.addFestivale();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addFestivale() {
		if (this.addForm.value.champOrganisation.libelle != 'رياضي') {
			this.addForm.value.nature = null;
		}
		if (this.addForm.value.organisateurs.libelle != 'مؤسسة خاصة' && this.addForm.value.organisateurs.libelle != 'مؤسسة عمومية') {
			this.addForm.value.nomOrg = null;
		}
		this.addForm.value.nomAssociation = this.nomAssociation;

		console.log("Submit : " + JSON.stringify(this.addForm.value, null, 2));

		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.updateObject("/festivale/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.router.navigate(["festivales/list-festivales"]);
					this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED"));
					window.localStorage.removeItem("associationId");
					window.localStorage.setItem("associationId", data.toString());
				},
				(error) => {
					alert(error);
				}
			);
	}

	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		let assocId = window.localStorage.getItem("assocId");
		this.addForm = this.fb.group({
			nomFestival: [""],
			organisateurs: [null],
			dateOrganisation: [""],
			localOrganisation: [""],
			champOrganisation: [null],
			budgetEvenement: [""],
			subventionCommunMar: [""],
			numLocalAssociation: [""],
			nature: [""],
			nomOrg: [""],
			nomChoix:[""],
			id: [""],
		});
	}

	selectedValueOrganisateur(p1: any, p2: any) {
		if (p1.id && p2.id) {
			return p1.libelle === p2.libelle;
		}

		return false;
	}

	selectedValueChampOrganisation(p1: any, p2: any) {
		if (p1.id && p2.id) {
			return p1.libelle === p2.libelle;
		}

		return false;
	}
	// ============================================
	// Files upload
	// ============================================
	fileBuilder() {
		this.addFileForm1 = this.fb.group({
			statut_file: [],
		});
		this.addFileForm2 = this.fb.group({
			pvConstitution_file: [],
		});
		this.addFileForm3 = this.fb.group({
			dernierPv_file: [],
		});
		this.addFileForm4 = this.fb.group({
			recipisse_file: [],
		});
		this.addFileForm5 = this.fb.group({
			membreBureau_file: [],
		});
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	disabled: boolean = true;
	listAssociations: any[];

	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["festivales/list-festivales"]);
	}
	// ============================================
	// Upload file event fileChangePjStatut
	// ============================================
	fileChangePjStatut(event) {
		this.uploadFiles1 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target statut : " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm1.patchValue(this.uploadFiles1);
			console.log("OK get pj statut");
		}
	}
	// ============================================
	// Upload file event fileChangePjPvConstitution
	// ============================================
	fileChangePjPvConstitution(event) {
		this.uploadFiles2 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target constitution: " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm2.patchValue(this.uploadFiles2);
			console.log("OK get pj pv constitution");
		}
	}
	// ============================================
	// Upload file event fileChangePjDernierPv
	// ============================================
	fileChangePjDernierPv(event) {
		this.uploadFiles3 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target dernier pv: " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm3.patchValue(this.uploadFiles3);
			console.log("OK get pj dernier pv");
		}
	}
	// ============================================
	// Upload file event fileChangePjRecipisse
	// ============================================
	fileChangePjRecipisse(event) {
		this.uploadFiles4 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target recipisse: " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm4.patchValue(this.uploadFiles4);
			console.log("OK get pj recipisse");
		}
	}
	// ============================================
	// Upload file event fileChangePjMembreBureau
	// ============================================
	fileChangePjMembreBureau(event) {
		this.uploadFiles5 = event.target.files;
		if (event.target.files.length > 0) {
			console.log("target membre bureau: " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm5.patchValue(this.uploadFiles5);
			console.log("OK get pj membre bureau :");
		}
	}
	// ============================================

	// ============================================
	// annexeChanged events
	// ============================================
	annexeChanged() {
		let annexeAdm = this.addForm.get("annexeAdministratif").value;
		console.log("Id annexe: " + annexeAdm.id);
		this.addForm.get("autreAnnxe").reset();
		if (annexeAdm.id == 31) {
			document.getElementById("autreAnnxe").style.display = "inline";
			this.addForm.get("autreAnnexe").setValue(null);
		} else {
			document.getElementById("autreAnnxe").style.display = "none";
			this.addForm.get("autreAnnexe").setValue(null);
		}
	}
	// ============================================
	// type changed events
	// ============================================
	typeChanged(event: MatSelectChange) {
		this.valueAssociation = event.value.id;
		this.nomAssociation = event.value.nom;
	}
	// ============================================
	// villeChanged events
	// ============================================
	villeChanged(event: any) {
		let ville = this.addForm.get("villeActivite").value;
		document.getElementById("autreAnnxe").style.display = "none";
		if (ville.id == "1") {
			this.addForm.get("communeActivite").enable();
			this.addForm.get("communeActivite").reset();
			this.addForm.get("annexeAdministratif").enable();
			this.addForm.get("annexeAdministratif").reset();
			this.addForm.get("autreAnnexe").reset();
			// this.addForm.get("communeActivite").setValidators(Validators.required);
			// this.addForm.get("annexeAdministratif").setValidators(Validators.required);
		} else {
			this.addForm.get("communeActivite").disable();
			this.addForm.get("communeActivite").reset();
			this.addForm.get("annexeAdministratif").disable();
			this.addForm.get("annexeAdministratif").reset();
			this.addForm.get("autreAnnexe").reset();
			// this.addForm.get("communeActivite").setValidators(null);
			// this.addForm.get("annexeAdministratif").setValidators(null);
		}
		// this.addForm.get('communeActivite').updateValueAndValidity();
		// this.addForm.get('annexeAdministratif').updateValueAndValidity();
	}
	// ============================================
	// ArrondissementChanged events

	// ============================================================
	// field validation
	// ============================================================
	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.addForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
