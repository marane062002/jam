import { environment } from "./../../../../../../environments/environment";
import { SubventionsService } from "./../../../utils/subventions.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { Location, DatePipe } from "@angular/common";
import { first } from "rxjs/operators";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";

@Component({
	selector: "kt-edit-hebergement",
	templateUrl: "./edit-hebergement.component.html",
	styleUrls: ["./edit-hebergement.component.scss"],
	providers: [DatePipe],
})
export class EditHebergementComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	statuts: any;
	organismes: any;
	repo: string = "PjHebergement";
	files: Observable<any>;
	start: boolean = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	myDate = new Date();
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
		private translate: TranslateService,
		private datePipe: DatePipe
	) {
		this.getData();
		//this.dateNow = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
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
		//console.log("date now : "+ this.dateNow)

		console.log("DATA :: " + JSON.stringify(this.addForm.value, null, 4));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.updateObject("/hebergement/edit/", this.addForm.value)
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

	compare(val1, val2) {
		if(val1 && val2)
		return val1.id === val2.id;

	  }
	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	async formBuilder() {
		let assocId = window.localStorage.getItem("assocId");
		var user = window.localStorage.getItem("fullnameUser");
		// let hebergId = window.localStorage.getItem("hebergId");
		let id = this.route.snapshot.params["id"];
		if (id !== null) {
			this.addForm = this.fb.group({
				id: [id],
				nombrePersonne: [""],
				nombreNuitee: [""],
				nombreChambre: [""],
				totalHt: [""],
				totalTTC: [""],
				organismeAccueil: [],
				subvention: this.fb.group({
					id: [],
					anneeSubvention: [""],
					note: [""],
					dateSortSubvention: [""],
					idAssociation: [assocId],
					montantSubvention: [""],
					/*typeSubvention: this.fb.group({
						id: [2],
					}),*/
					/*	etatSubvention: this.fb.group({
						id: [Validators.required],
					}),*/
					sousTypeSub: ["الإقامة"],
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
					createurUser: [""],
					creationDate: [""],
					modificateurUser: [user],
				}),
			});
			console.log(this.addForm.value);
			this.service
				.getObjectById("/hebergement/showBy/", +id)
				.subscribe((data) => {
					
					console.log(this.addForm.controls['organismeAccueil']);
					this.addForm.patchValue(Object.assign(data, {}));
				/*	this.addForm.controls['organismeAccueil'].setValue({id:1,adresse: "",
					rc:"",
					fax: "",
					gsm: "",
					mail: "",
					nom: "جامعة القاضي عياض"
					});
					*/
					
					//this.addForm.get('organismeAccueil').patchValue(1);
					console.log(this.addForm.get("organismeAccueil").value);
					//this.addForm.get('organismeAccueil').patchValue({id:1});

					//this.addForm.get(['subvention','dateSubvention']).patchValue(new Date(data.subvention.dateSubvention).toISOString());
					//this.addForm.get(['subvention','dateSortSubvention']).patchValue(new Date(data.subvention.dateSortSubvention).toISOString());
					//this.addForm.get(['subvention','dateDepotDemande']).patchValue(new Date(data.subvention.dateDepotDemande).toISOString());
					//this.addForm.get(['subvention','updateDate']).patchValue(this.dateNow);
					//this.addForm.get(['subvention','modificateurUser']).patchValue(user);
				});

			setTimeout(() => {
				if (id != null)
					this.files = this.service.getByIdFiles(id, "PjHebergement");
				this.start = false;
			}, 1000);
		}
		/*
			this.service.getObjectById("/hebergement/show/", id).subscribe(
				(data) => {
					setTimeout(() => {
						if (data!=null)
						this.files = this.service.getByIdFiles(id,'PjHebergement');
						this.start = false;
					}, 1000);
				},
				(error) => console.log(error)
			);*/
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.statuts = data[0];
				this.organismes = data[3];
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
		window.open(environment.API_ALFRESCO_URL + "/PjHebergement/" + r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(row: any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			console.log("Delete file ID: " + row);
			this.service
				.deletefiles("/PjHebergement/", row)
				.subscribe((data) => {
					console.log("File courrier deleted : " + row);
				});
			// Refresh
			let id = this.route.snapshot.params["id"];
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
