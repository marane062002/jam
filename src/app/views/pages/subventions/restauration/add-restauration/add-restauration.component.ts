import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SubventionsService } from "../../../utils/subventions.service";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "kt-add-restauration",
	templateUrl: "./add-restauration.component.html",
	styleUrls: ["./add-restauration.component.scss"],
})
export class AddRestaurationComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	organismes: any;
	addFileForm: FormGroup;
	public uploadFiles: Array<File>;
	repo: string = "PjRestauration";
	fournisseurs: any;
	// ============================================
	//
	// ============================================
	constructor(
		private service: SubventionsService,
		private fb: FormBuilder,
		private location: Location,
		private filesutils: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService,
	) {
		this.getData();
	}
	// ============================================
	//
	// ============================================
	ngOnInit() {
		this.formBuilder();
		this.addFileForm = this.fb.group({
			_file: [],
		});

		this.filesutils.fileSizeDetector();
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
		this.addSubvention();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addSubvention() {
		console.log(JSON.stringify(this.addForm.value, null, 4));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.createObject("/subvention/new", this.addForm.value)
			.subscribe(
				(data) => {
					console.log("saved successfuly ... ID : " + data);
					// upload files to alfresco GED
					//console.log("ID DE COURRIER -data: " +JSON.stringify(data) +	" OU BIEN -data.id: " +data);
					if (this.uploadFiles)
					this.service.updloadFile(this.uploadFiles, data,this.repo).subscribe(
						(res) =>
							console.log("File inserted " + JSON.stringify(res)),
							(err) =>
							console.log("File not inserted " + JSON.stringify(err))
					);
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
					);
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
			typePrestAo: [""],
			anneeSubvention: [""],
			note: [""],
			dateSortSubvention: [""],
			montantSubvention: [""],
			idAssociation: [assocId],
			typeSubvention: this.fb.group({
				id: [2],
			}),
			//etatSubvention: ["", Validators.required],
			sousTypeSub: ["خدمات الطعام"],
			restauration: this.fb.group({
				nombrepersonne: [""],
				totalHT: [""],
				totalTTC: [""],
				fournisseurRestauration: [null, Validators.required],
			}),
			// added 30.07.20
			dateDepotDemande: [""],
			nomProjet: [""],
			adresse: [""],
			responsableProjet: [""],
			telResProjet: [""],
			dureeprojet: [""],
			//dateConseil: [""],
			// decisionSub: [""],
			montantDemande: [""],
			fullName: [window.localStorage.getItem("fullnameUser")],
		});
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.statuts = data[0];
				this.organismes = data[3];
				this.fournisseurs = data[4];
				console.log(data[1]);
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

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
