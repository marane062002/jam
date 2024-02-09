import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSelect, MatSelectChange } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { AcquisitionService } from "../../utils/acquisition.service";
import { Location } from "@angular/common";
import * as $ from "jquery";
import { PieceJointeAutorisationService } from "../../utils/piece-jointe-autorisation.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-add-acquisition",
	templateUrl: "./add-acquisition.component.html",
	styleUrls: ["./add-acquisition.component.scss"],
})
export class AddAcquisitionComponent implements OnInit {
	// ============================================isSelected
	// Declarations
	// ============================================
	allpjs = [];
	formPj = { type: 0, selecetedFile: {} };

	isVisibleNature: boolean;
	isVisibleNature2: boolean;
	isVisibleAssociation: boolean;
	isVisiblemorale: boolean;
	isVisiblephysique: boolean;
	isVisibleetablissement: boolean;

	listArrondissements: any[];
	isSelected: boolean = true;
	loading = false;
	isVisible: any;
	test: string;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	listAssociations: any[];
	types: any;
	sousTypes: any;
	selected: any;
	selectedIndex: any;
	organismes: any;
	fournisseurs: any;
	fournisseurs_impression: any;
	addFileForm: FormGroup;
	public uploadFiles: Array<File>;
	repo: string = "PjSubvention";
	type: string;
	disabled: boolean = true;
	constructor(private service: AcquisitionService, private router: Router, private pieceJointeAutorisation: PieceJointeAutorisationService, private fb: FormBuilder, private location: Location, private filesutils: FilesUtilsService, private notification: NotificationService, private translate: TranslateService) {
		this.formBuilder();
		this.getData();
		this.getArrondissements();
		//this.isVisible = [""];

		// let input = this.addForm.get("test");
		// input.disable();
	}
	getArrondissements() {
		this.service.getArrondissements().subscribe(
			(data) => {
				this.listArrondissements = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	ngOnInit() {
		this.isVisible = 0;
		this.formBuilder();
		this.addFileForm = this.fb.group({
			_file: [],
		});

		this.filesutils.fileSizeDetector();
	}

	// Select change paramettre
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	// ControlValueAccessor Implementation
	onChange: any = () => {};
	onTouched: any = () => {};
	// ============================================
	// Select changed type
	// ============================================
	valueAssociation: any = "";
	nomAssociation: string;
	nomas: any;
	suiviExecution: string[] = ["Oui", "Non"];
	suiviRapportsList: any[] = [];
	onchangeRapportfinancier(event: any) {
		if (event == "Oui") {
			this.suiviRapportsList.push("FINANCIERE");
		}
		if (event == "Non") {
			if (this.suiviRapportsList.includes("FINANCIERE")) {
				const index = this.suiviRapportsList.indexOf("FINANCIERE");
				if (index !== -1) {
					this.suiviRapportsList.splice(index, 1);
				}
			}
		}
	}
	onchangeRapportLitteraire(event: any) {
		if (event == "Oui") {
			this.suiviRapportsList.push("LITTERALE");
		}
		if (event == "Non") {
			if (this.suiviRapportsList.includes("LITTERALE")) {
				const index = this.suiviRapportsList.indexOf("LITTERALE");
				if (index !== -1) {
					this.suiviRapportsList.splice(index, 1);
				}
			}
		}
	}
	getData() {
		this.disabled = false;
		this.service.getAssociation().subscribe(
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

	selectionTypeChanged(event: MatSelectChange) {
		document.getElementById("Heberg").style.display = "none";
		document.getElementById("Resto").style.display = "none";
		document.getElementById("SousType").style.display = "none";
		document.getElementById("Montant").style.display = "none";
		document.getElementById("Print").style.display = "none";

		this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		console.log("value changed : " + event.value);
		this.selected = event.value;
		console.log("touched type");

		if (this.selected.id === 1) {
			document.getElementById("SousType").style.display = "none";
			document.getElementById("Montant").style.display = "inline";
			console.log("touched sous type" + this.selectedIndex);
		} else if (this.selected.id === 2) {
			document.getElementById("SousType").style.display = "inline";
			document.getElementById("Montant").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
		} else if (this.selected.id === 3) {
			document.getElementById("SousType").style.display = "inline";
			document.getElementById("Montant").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
		} else {
			document.getElementById("SousType").style.display = "none";
			document.getElementById("Montant").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
		}
	}
	// ============================================
	// Select changed sous type
	// ============================================
	selectionSousTypeChanged(event: MatSelectChange) {
		this.selectionChange.emit(new MatSelectChange(this.matSelect, event.value));
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		console.log("value changed : " + event.value);
		console.log("value index : " + this.selectedIndex);
		this.selected = event.value;
		console.log("touched sous type" + this.selected);

		if (this.selectedIndex === "خدمات الطعام") {
			document.getElementById("Heberg").style.display = "none";
			document.getElementById("Resto").style.display = "inline";
			document.getElementById("Print").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
			this.repo = "PjRestauration";
		} else if (this.selectedIndex === "الإقامة") {
			document.getElementById("Heberg").style.display = "inline";
			document.getElementById("Resto").style.display = "none";
			document.getElementById("Print").style.display = "none";
			console.log("touched sous type" + this.selectedIndex);
			this.repo = "PjHebergement";
		} else if (this.selectedIndex === "خدمات الطباعة") {
			document.getElementById("Heberg").style.display = "none";
			document.getElementById("Resto").style.display = "none";
			document.getElementById("Print").style.display = "inline";
			console.log("touched sous type" + this.selectedIndex);
			this.repo = "PjImpression";
		}
	}
	// ============================================
	// Liste des sous types
	// ============================================

	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.addForm.controls;

		/** check form */
		/*if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}*/

		this.loading = true;
		this.addAcquisition();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addAcquisition() {
		let assocId = window.localStorage.getItem("assocId");
		console.log(JSON.stringify(this.addForm.value, null, 4));
		this.submitted = true;
		this.addForm.value.nomAssociation = this.nomAssociation;
		if(this.addForm.value.arrondissement!=null){
		this.addForm.value.arrondissement=this.addForm.value.arrondissement.libelle;
		}
		console.log(this.addForm.value);

		this.service.createObject("/acquisition/new", this.addForm.value).subscribe(
			(data) => {
				console.log("saved successfuly ... ID : " + data);
				// upload files to alfresco GED
				//console.log("ID DE COURRIER -data: " +JSON.stringify(data) +	" OU BIEN -data.id: " +data);

				if (this.allpjs.length > 0 && data != undefined) {
					for (var i = 0; i < this.allpjs.length; i++) {
						// data.id;
						this.pieceJointeAutorisation.nouvellepj(this.allpjs[i].selecetedFile, data, "PieceJointeAcquisition").subscribe((data) => {
							console.log("C: " + JSON.stringify(data, null, 2));
						});
					}
				}

				this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"));
				//this.location.back();
				this.router.navigate(["/acquisition/list-acquisition"]);
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
			test: [""],
			numAcquisition: [""],
			nomAssociation: [""],
			local: [""],
			nomProjet: [""],
			champActivite: [""],
			natureActivite: [""],
			cible: [""],
			activite_de_rayonnement: [""],
			duree: [""],
			paiement: [""],
			montantDemande: [""],
			arrondissement: [""],
			nomEspace:[""],

			cin: [""],
			prenom: [""],
			nom: [""],
			beneficier: [""],
			raisonsociale: [""],
			rc: [""],
			etablissement: [""],
		});
	}

	// ============================================
	// ============================================
	localChanged(event: any) {
		console.log(event);
		console.log(event.value);
		if (event.value == "المقاطعة") {
			this.isVisibleNature = true;
			this.isVisibleNature2 = false;
			console.log("true");
		} else {
			this.isVisibleNature = false;
			this.isVisibleNature2 = true;
			console.log("false");
		}
	}

	beneficierChanged(event: any) {
		console.log(event);
		console.log(event.value);
		if (event.value == "0") {
			this.isVisibleAssociation = true;
			console.log(this.isVisibleAssociation);
		} else {
			this.isVisibleAssociation = false;
		}

		if (event.value == "1") {
			this.isVisiblemorale = true;
			console.log("isVisiblemorale");
		} else {
			this.isVisiblemorale = false;
		}
		if (event.value == "2") {
			this.isVisiblephysique = true;
			console.log("isVisiblephysique");
		} else {
			this.isVisiblephysique = false;
		}
		if (event.value == "3") {
			this.isVisibleetablissement = true;
			console.log("isVisibleetablissement");
		} else {
			this.isVisibleetablissement = false;
		}
	}
	// Charger les liste externe
	// ============================================

	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
		this.addFileForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================================
	// Upload files
	// ============================================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			console.log("file size !! " + event.target.files.length);
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}

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
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
		this.allpjs.push(this.formPj);
	}
}
