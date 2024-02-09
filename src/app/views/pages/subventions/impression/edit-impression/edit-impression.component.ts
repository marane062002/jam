import { environment } from "./../../../../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SubventionsService } from "../../../utils/subventions.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { first } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
	selector: "kt-edit-impression",
	templateUrl: "./edit-impression.component.html",
	styleUrls: ["./edit-impression.component.scss"],
})
export class EditImpressionComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	organismes: any;
	repo: string = "PjImpression";
	fournisseurs_impression: any;
	files: Observable<any>;
	start: boolean = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	dateNow: string;
	// ============================================
	//
	// ============================================
	constructor(
		private service: SubventionsService,
		private router: Router,
		private fb: FormBuilder,
		private location: Location,
		private filesutils: FilesUtilsService,
		private route: ActivatedRoute,
		private notification: NotificationService,
		private translate: TranslateService
	) {
		this.getData();
		this.dateNow = new Date().toISOString();
	}
	// ============================================
	//
	// ============================================
	ngOnInit() {
		this.formBuilder();
		this.filesutils.fileSizeDetector();

		this.addFileForm = this.fb.group({
			_file: [],
		});
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

		this.addSubvention();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addSubvention() {
		let assocId = window.localStorage.getItem("assocId");
		console.log(JSON.stringify(this.addForm.value, null, 4));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.updateObject("/impression/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.loading = true;
					var id = this.addForm.get("id").value;
					console.log("ID courrier: " + id);
					// upload file
					if (this.uploadFiles)
						this.service
							.updloadFile(this.uploadFiles, id, this.repo)
							.subscribe(
								(res) =>
									console.log(
										"File inserted " + JSON.stringify(res)
									),
								(err) =>
									console.log(
										"File not inserted " +
											JSON.stringify(err)
									)
							);

					this.location.back();
					// Notification
					this.notification.warn(
						this.translate.instant(
							"PAGES.GENERAL.MSG_UPDATE_CONFIRMED"
						)
					);
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
		var user = window.localStorage.getItem("fullnameUser");
		let id = window.localStorage.getItem("printId");
		this.addForm = this.fb.group({
			id: [id],
			quantite: [""],
			totalHt: [""],
			totalTTC: [""],
			fournisseurImpression: this.fb.group({
				id: [Validators.required],
			}),
			subvention: this.fb.group({
				id:[],
				anneeSubvention: [""],
				note: [""],
				dateSortSubvention: [""],
				idAssociation: [assocId],
				montantSubvention: [""],
				/*typeSubvention: this.fb.group({
					id: [2],
				}),
				etatSubvention: this.fb.group({
					id: [Validators.required],
				}),*/
				sousTypeSub: ["خدمات الطباعة"],
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
				updateDate: [""],
				createurUser:[""],
				creationDate:[""],
				modificateurUser: [user],
			}),
		});

		this.service
			.getObjectById("/impression/showBy/", +id)
			.subscribe((data) => {
				//console.log("ID++++ " + id);
				//console.log(JSON.stringify(data, null, 4));
				this.addForm.patchValue(data);
				//this.addForm.get(['subvention','dateSubvention']).patchValue(new Date(data.subvention.dateSubvention).toISOString());
				this.addForm.get(['subvention','dateSortSubvention']).patchValue(new Date(data.subvention.dateSortSubvention).toISOString());
				this.addForm.get(['subvention','dateDepotDemande']).patchValue(new Date(data.subvention.dateDepotDemande).toISOString());
				this.addForm.get(['subvention','updateDate']).patchValue(this.dateNow);
				this.addForm.get(['subvention','modificateurUser']).patchValue(user);
			});
		setTimeout(() => {
			if (id != null)
				this.files = this.service.getByIdFiles(id, "PjImpression");
			this.start = false;
		}, 1000);
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.statuts = data[0];
				//this.types = data[1];
				//this.sousTypes = data[2];
				this.organismes = data[3];
				//this.fournisseurs = data[4];
				this.fournisseurs_impression = data[5];
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
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.filesutils.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.filesutils.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjImpression/" + r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(row: any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			console.log("Delete file ID: " + row);
			this.service
				.deletefiles("/PjImpression/", row)
				.subscribe((data) => {
					console.log("File courrier deleted : " + row);
				});
			// Refresh
			let id = window.localStorage.getItem("printId");
			if (!id) {
				alert("Invalid action.");
				this.back();
				return;
			}
			// reset object
			this.files = null;
			// start progress bar
			this.start = true;

			// Notification
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
			// fill datatable
			setTimeout(() => {
				if (id != null)
					this.files = this.service.getByIdFiles(id, this.repo);
				this.start = false;
			}, 1000);
		}
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
