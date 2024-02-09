import { Router } from "@angular/router";
import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrganisationService } from "../../../organisation/organisation.service";
import * as $ from "jquery";
import { ActivitesService } from "../../../utils/activites.service";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: "kt-add-activites",
	templateUrl: "./add-activites.component.html",
	styleUrls: ["./add-activites.component.scss"],
})
export class AddActivitesComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	test: string;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	types: any;
	associations: any;
	arrondissements: any;
	addFileForm: FormGroup;
	public uploadFiles: Array<File>;
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
		this.addActivities();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addActivities() {
		let assocId = window.localStorage.getItem("assocId");
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
			dateActivite: [""],
			populationImpactee: [""],
			arrondissements: [{}, Validators.required],
			objet: [""],
			numAutorisation: [""],
			note: [""],
			idAssociation: [assocId],
			typeActivites: [""],
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
				if(data[3] != null)
					this.arrondissements = data[3];
			},
			(err) => {
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
	// =====================================
	// back to list
	// =====================================
	back() {
		//this.location.back();
		let assocId = window.localStorage.getItem("assocId");
		this.router.navigate(["associations/show-association/" + assocId]);
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
