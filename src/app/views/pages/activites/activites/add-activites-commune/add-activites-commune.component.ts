import { Router } from "@angular/router";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrganisationService } from "../../../organisation/organisation.service";
import { MatRadioChange, MatRadioButton } from "@angular/material";
import * as $ from "jquery";
import { ActivitesService } from "../../../utils/activites.service";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: "kt-add-activites-commune",
	templateUrl: "./add-activites-commune.component.html",
	styleUrls: ["./add-activites-commune.component.scss"],
})
export class AddActivitesCommuneComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	partenariatInstitution = null;
	loading = false;
	test: string;
	submitted = false;
	addForm: FormGroup;
	addFileForm: FormGroup;
	statuts: any;
	types: any;
	selectedRadButt: string;
	associations: any;
	institutions: any;
	arrondissements: any;
	public uploadFiles: Array<File>;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() change: EventEmitter<MatRadioChange>;

	constructor(
		private service: ActivitesService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private filesUtil: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService,
	) {
		this.getData();
	}

	ngOnInit() {
		document.getElementById("association").style.display = "none";
		document.getElementById("institution").style.display = "none";
		document.getElementById("enPartenariat").style.display = "none";
		this.formBuilder();
		this.addFileForm = this.fb.group({
			_file: [],
		});

		this.filesUtil.fileSizeDetector();
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;
		console.log(JSON.stringify(this.addForm.value,null,2))
		this.addActivities();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addActivities() {
		console.log(JSON.stringify(this.addForm.value));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.createObject("/activite/new", this.addForm.value)
			.subscribe(
				(data) => {
					// upload files to alfresco GED
					//console.log("ID DE COURRIER -data: " +JSON.stringify(data) +	" OU BIEN -data.id: " +data);
					if (this.uploadFiles)
						this.service.updloadFile(this.uploadFiles, data).subscribe(
							(res) =>
								console.log("File inserted " + JSON.stringify(res)),
							(err) =>
							console.log("File not inserted " + JSON.stringify(err))
					);
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
					);
					this.router.navigate(["activites/list-activites-commune"]);
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
		this.addForm = this.fb.group({
			dateActivite: [""],
			//lieu: ["",
			populationImpactee: [""],
			//idCommune: ["", Validators.required], // arrondissement
			arrondissements: [{}, Validators.required],
			objet: [""],
			numAutorisation: [""],
			note: [""],
			idAssociation: [0],
			typeActivites: ["", Validators.required],
			pmActiv:[null],
			enPartenariat:[null],
			partenariat:[""],
			isCommune:[1],
			createurUser: [window.localStorage.getItem("fullnameUser")],
		});
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				if(data[0] != null)
					this.types = data[0];
				if(data[1] != null)
					this.associations = data[1];
				if(data[2] != null)
					this.institutions = data[2];
				if(data[3] != null)
					this.arrondissements = data[3];
			},
			(err) => {
				console.log(err);
			}
		);
		/*
		this.service2.getRessource("/arrondissements/index").subscribe((data) => {
			(this.arrondissements = data), console.log(data);
		});
		*/
	}
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
		this.router.navigate(["activites/list-activites-commune"]);
	}
	// ============================================
	// OnChange mode d'aquisition -> marche / BC
	// ============================================
	selectionChanged1() {
		document.getElementById("association").style.display = "none";
		document.getElementById("institution").style.display = "none";
		this.addForm.get('enPartenariat').reset();
		this.addForm.get('idAssociation').reset();
		this.addForm.get('pmActiv').reset();
		let part = this.addForm.get('partenariat').value
		if (part == true) {
			document.getElementById("enPartenariat").style.display = "inline";
		} else if(part == false) {
			document.getElementById("enPartenariat").style.display = "none";

		}
	}

	selectionChanged2(event2: MatRadioChange) {
		if (event2.value == "association") {
			document.getElementById("association").style.display = "inline";
			document.getElementById("institution").style.display = "none";
		} else if(event2.value == "institution"){
			document.getElementById("institution").style.display = "inline";
			document.getElementById("association").style.display = "none";
		}
		this.onChangeVal(event2);
	}

	// test radio button
	onChangeVal(mrChange: MatRadioChange) {
		console.log("change value" + mrChange.value);
		let mrButton: MatRadioButton = mrChange.source;
		console.log(mrButton.name);
		console.log(mrButton.checked);
		console.log(mrButton.inputId);
	}

	// ControlValueAccessor Implementation
	onChange: any = () => {};
	onTouched: any = () => {};
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

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
