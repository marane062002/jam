import { MatSelect, MatSelectChange } from "@angular/material";
import { SubventionsService } from "./../../../utils/subventions.service";
import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { PieceJointeSubventionService } from "../../../utils/piece-jointe-subvention.service";
import { environment } from "../../../../../../environments/environment";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { AssociationService } from "../../../utils/association.service";
import { SpinnerService } from "../../../utils/spinner.service";
import { finalize } from "rxjs/operators";

@Component({
	selector: "kt-add-subventions",
	templateUrl: "./add-subventions.component.html",
	styleUrls: ["./add-subventions.component.scss"],
})
export class AddSubventionsComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	allpjs = [];
	formPj = { type: 0, selecetedFile: {} };
	isVisibleNature: boolean;
	loading = false;
	test: string;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	listAssociations: any[];
	originalListAssociations :any[];
	listArrondissements: any[];
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
	constructor(private associationService: AssociationService,private spinnerService:SpinnerService, private pieceJointeSubventionService: PieceJointeSubventionService, private service: SubventionsService, private router: Router, private fb: FormBuilder, private location: Location, private filesutils: FilesUtilsService, private notification: NotificationService, private translate: TranslateService) {
		this.getData();
		this.getArrondissements();
		this.formBuilder();
		// let input = this.addForm.get("test");
		// input.disable();
	}

	ngOnInit() {
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

	typeChanged(event: MatSelectChange) {
		this.valueAssociation = event.value.prioriter;
		this.nomAssociation = event.value.nom;
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
		this.getAllSousTypeByType(this.selected.id);
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
	private getAllSousTypeByType(id: number) {
		this.service.getAllSubventionListById("/typeSubvention/sousType/", id).subscribe(
			(data) => {
				this.sousTypes = data;
				console.log("result sous type subvention : " + id);
			},
			(err) => {
				console.log(err);
			}
		);
	}
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
		this.addSubvention();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addSubvention() {
		let assocId = window.localStorage.getItem("assocId");
		console.log(JSON.stringify(this.addForm.value, null, 4));

		this.submitted = true;
		this.addForm.value.nomAssociation = this.nomAssociation;

		this.addForm.value.suiveeExec = this.suiviRapportsList;
		this.addForm.value.numeroLocalAssociation=this.valueAssociation;
		console.log(this.addForm.value);
		this.addForm.value.durre=this.addForm.value.durre;
		this.service.createObject("/subvention/new", this.addForm.value).subscribe(
			(data) => {
				console.log("saved successfuly ... ID : " + data);
				// upload files to alfresco GED
				//console.log("ID DE COURRIER -data: " +JSON.stringify(data) +	" OU BIEN -data.id: " +data);

				if (this.allpjs.length > 0 && data != undefined) {
					for (var i = 0; i < this.allpjs.length; i++) {
						this.pieceJointeSubventionService.nouvellepj(this.allpjs[i].selecetedFile, data, "PieceJointeSubvention").subscribe((data) => {
							console.log("C: " + JSON.stringify(data, null, 2));
						});
					}
				}
				this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"));
				this.location.back();
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
			numSubvention: [""],
			anneeSubvention: [""],
			nomAssociation: [""],
			numeroLocalAssociation:[""],
			nomProjet: [""],
			champActivite: [""],
			natureActivite: [""],
			cible: [""],
			local: [""],
			durre: [""],

			date: [""],
			activite_de_rayonnement: [""],
			montantDemande: [""],
			dateDepotDemande: [""],
			montantSubvention: [""],
			montantSubventionAutre: [""],
			suiveeExec: [""],
			suiveeExec1: [""],
			arrondissement: [""],

			// natureSubvention: [""],
		});
	}
	// ============================================
	localChanged(event: any) {
		console.log(event);
		console.log(event.value);
		if (event.value == "المقاطعة") {
			this.isVisibleNature = true;
			console.log("true");
		} else {
			this.isVisibleNature = false;
			console.log("false");
		}
	}
	// Charger les liste externe
	// ============================================

	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.statuts = data[0];
				this.types = data[1];
				// this.nomAssociation = data[10];

				console.log("Liste de status: " + data[0]);
				console.log("Liste des associations: " + data[10]);
			},
			(err) => {
				console.log(err);
			}
		);

		this.getAssociation()
	}
	isLoading:boolean=true;
	async getAssociation() {
        this.isLoading = true;
        var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
        await this.associationService
            .getRessource("/association/index2")
            .pipe(
                finalize(() => {
                    this.spinnerService.stop(spinnerRef); // stop spinner
                })
            )
            .subscribe(
                (data) => {
                    //console.log('Liste Ass : ' + JSON.stringify(data, null, 2))
                    this.isLoading = false;
                    this.listAssociations = data;
					this.originalListAssociations=data;
                },
                (err) => {
                    this.isLoading = false;
                    console.log(err);
                }
            );
    }
	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
		this.addFileForm.reset();
	}

	filtrerAssociations(event: any) {
		const filterValue = event.target.value.trim().toLocaleLowerCase();
		if (event.target.value != '') {
			console.log(event.target.value);
			this.listAssociations = this.originalListAssociations.filter(association =>
				association.nom.toLocaleLowerCase().includes(filterValue)
			);
		}
		if (event.target.value == '') {
			this.listAssociations =this.originalListAssociations;
		}

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
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjSubvention/" + r);
	}
}
