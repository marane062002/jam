import { ProjetService } from "./../../../utils/projet-part.service";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { OrganisationService } from "../../../organisation/organisation.service";
import * as $ from "jquery";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
	selector: "kt-add-projet-partenariat",
	templateUrl: "./add-projet-partenariat.component.html",
	styleUrls: ["./add-projet-partenariat.component.scss"],
})
export class AddProjetPartenariatComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	test: string;
	submitted = false;
	addForm: FormGroup;
	addFileForm: FormGroup;
	statuts: any;
	types: any;
	arrondissements: any;
	loading = false;
	public uploadFiles: Array<File>;
	constructor(
		private service: ProjetService,
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
		this.addProjetPartenariat();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addProjetPartenariat() {
		let assocId = window.localStorage.getItem("assocId");
		console.log(JSON.stringify(this.addForm.value));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.createObject("/projetPartenariat/new", this.addForm.value)
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
			nomProjet: ["", Validators.required],
			dateDemarrage: [""],
			dateFin: [""],
			budgetAlloue: [""],
			idCommune: ["", Validators.required],
			finaliteProjet: [""],
			objet: [""],
			populationImpactee: [""],
			idAssociation: [assocId],
			typeProjetPartenariat: [""],
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
