import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { OrganisationService } from "../../../organisation/organisation.service";
import { InterventionRapideService } from "../../../utils/intervention-rapide.service";
import { NotificationService } from '../../../shared/notification.service';
import { first } from "rxjs/operators";
import { JsonPipe } from "@angular/common";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
	selector: "kt-edit-intervention-rapide",
	templateUrl: "./edit-intervention-rapide.component.html",
	styleUrls: ["./edit-intervention-rapide.component.scss"],
})
export class EditInterventionRapideComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	editForm: FormGroup;
	statuts: any;
	types: any;
	arrondissement: any;
	time1 = { hour: 13, minute: 30 };
	time2 = { hour: 13, minute: 30 };
	heur1: number = 17;
	min1: number = 30;
	heur2: number = 17;
	min2: number = 30;
	resource: any;
	dateDebutSelected: Date;

	files: Observable<any>;
	start: boolean = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	checkLang: string;
	// ============================================
	//
	// ============================================
	constructor(
		private service: InterventionRapideService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private notification: NotificationService,
		private translate: TranslateService,
		private fileUtils: FilesUtilsService,
	) {
		this.checkLang = window.localStorage.getItem("language");
		this.getData();
		let interId = window.localStorage.getItem("interId");
		if (!interId) {
			alert("Invalid action.");
			this.router.navigate(["intervention-rapide/list-intervention-rapide"]);
			return;
		}
		setTimeout(() => {
			if (interId != null)
				this.files = this.service.getByIdFiles(interId);
			this.start = false;
		}, 1000);
	}
	// ============================================
	//
	// ============================================
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});
		this.formBuilder();
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.types = data[0];
				this.statuts = data[1];
				//console.log(data[0]);
			},
			(err) => {
				console.log(err);
			}
		);
		// Liste des arrondissements
		this.service2.getRessource("/arrondissements/index").subscribe((data) => {
			this.arrondissement = data;
			//console.log(data);
		});
	}
	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		let interId = window.localStorage.getItem("interId");
		this.editForm = this.fb.group({
			id: [interId],
			datePriseEnCharge: ["", Validators.required],
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			heurDebutIntervention: ["", Validators.required],
			heurFinIntervention: ["", Validators.required],
			objet: ["", Validators.required],
			resultatIntervention: [""],
			typeIntervention: this.fb.group({
				id: ["", Validators.required],
			}),
			statutIntervention: this.fb.group({
				id: ["", Validators.required],
			}),
			adresseIntervention: [""],
			remarque: [""],
			idCommune: ["", Validators.required],
		});
		this.service
			.getObjectByIdEdit("/interventionRapide/showBy/", +interId)
			.subscribe((data) => {
				this.resource = data;
				this.heur1 = Number(this.resource.heurDebutIntervention.slice(0, 2)); // heur ex: 16
				this.min1 = Number(this.resource.heurDebutIntervention.slice(3, 5)); // min ex: 30
				this.heur2 = Number(this.resource.heurFinIntervention.slice(0, 2)); // heur ex: 16
				this.min2 = Number(this.resource.heurFinIntervention.slice(3, 5)); // min ex: 30
				//alert("SUCCESS!! :-)\n\n" + JSON.stringify(data,null,2));
				this.editForm.patchValue(data);

				this.editForm.get("heurDebutIntervention").setValue({ hour: this.heur1, minute: this.min1 });
				this.editForm.get("heurFinIntervention").setValue({ hour: this.heur2, minute: this.min2 });

				this.editForm.controls['datePriseEnCharge'].patchValue(new Date(data.datePriseEnCharge).toISOString());
				this.editForm.controls['dateDebut'].patchValue(new Date(data.dateDebut).toISOString());
				this.editForm.controls['dateFin'].patchValue(new Date(data.dateFin).toISOString());
			});

		this.fileUtils.fileSizeDetector();

		this.addFileForm = this.fb.group({
			_file: [],
		});
	}
	// ============================================
	//
	// ============================================
	get h1() {
		return this.editForm.get("heurDebutIntervention").value;
	}
	get getDateDebut() {
		return this.editForm.get("dateDebut");
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.editForm.controls;
		/** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.editForm
			.get("heurDebutIntervention")
			.setValue(this.time1.hour + ":" + this.time1.minute + ":" + "00");
		this.editForm
			.get("heurFinIntervention")
			.setValue(this.time2.hour + ":" + this.time2.minute + ":" + "00");
		this.editIntervention();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	editIntervention() {
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.service
			.updateObject("/interventionRapide/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				(data) => {

					this.loading = true;
					var id = this.editForm.get('id').value;
					// upload file
					if (this.uploadFiles)
						this.service.updloadFile(this.uploadFiles, id).subscribe(
							(res) =>
								console.log("File inserted " + JSON.stringify(res)),
							(err) =>
								console.log("File not inserted " + JSON.stringify(err))
						);

					this.router.navigate([
						"/intervention-rapide/list-intervention-rapide",
					]);

					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED")
					);
				},
				(error) => {
					alert(error);
				}
			);
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["/intervention-rapide/list-intervention-rapide"]);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.fileUtils.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.fileUtils.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjInterventionRapide/" + r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id: any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			console.log("Delete file ID: " + id);
			this.service
				.deletefiles("/PjInterventionRapide/", id)
				.subscribe(data => {
					console.log("File deleted : " + id);
				});
			// Refresh
			let interId = window.localStorage.getItem("interId");
			if (!interId) {
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
				if (interId != null)
					this.files = this.service.getByIdFiles(interId);
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
	/** ================================================
 * Checking control validation
 *
 * @param controlName: string => Equals to formControlName
 * @param validationType: string => Equals to valitors name
 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.editForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	// =============================================
	// date debut change
	// =============================================
	dateDebutchange() {
		this.editForm.get("dateFin").reset();
		this.editForm.get("dateDebut").patchValue(this.getDateDebut.value);
		//this.dateDebutSelected = this.editForm.get("dateDebut").value;
		//console.log("Date debut: "+ this.dateDebutSelected);
	}
}
