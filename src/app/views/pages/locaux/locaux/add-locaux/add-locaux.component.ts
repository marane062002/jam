import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { OrganisationService } from "../../../organisation/organisation.service";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { LaucauxService } from "../../../utils/locaux.service";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: "kt-add-locaux",
	templateUrl: "./add-locaux.component.html",
	styleUrls: ["./add-locaux.component.scss"],
})
export class AddLocauxComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	test: string;
	submitted = false;
	addForm: FormGroup;
	addFileForm: FormGroup;
	statuts: any;
	types: any;
	arrondissements: any;
	public uploadFiles: Array<File>;
	constructor(
		private service: LaucauxService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private location: Location,
		private filesUtil: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService,
	) {
		this.getData();
	}

	ngOnInit() {
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
		this.addLocaux();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addLocaux() {
		let assocId = window.localStorage.getItem("assocId");
		console.log(JSON.stringify(this.addForm.value));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service.createObject("/locaux/new", this.addForm.value).subscribe(
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
				this.router.navigate([
					"associations/show-association/" + assocId,
				]);
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
			nomLocal: ["", Validators.required],
			dateDemrrageGestion: [""],
			dateFinGestion: [""],
			adresseLocal: [""],
			idCommune: [""],
			localisation: [""],
			duree: [""],
			idAssociation: [assocId],
			statutGestion: [""],
			typeLocal: [""],
			remarque: [""],
			createurUser: [window.localStorage.getItem("fullnameUser")],
		});
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.types = data[0];
				this.statuts = data[1];
				console.log(data[0]);
			},
			(err) => {
				console.log(err);
			}
		);
		this.service2.getRessource("/arrondissements/index").subscribe((data) => {
			(this.arrondissements = data), console.log(data);
		});
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
		//this.location.back();
		let assocId = window.localStorage.getItem("assocId");
		this.router.navigate([
			"../../../associations/show-association/" + assocId,
		]);
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

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
