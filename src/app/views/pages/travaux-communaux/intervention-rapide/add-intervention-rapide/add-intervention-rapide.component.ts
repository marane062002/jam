import { InterventionRapideService } from "./../../../utils/intervention-rapide.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrganisationService } from "../../../organisation/organisation.service";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
	selector: "kt-add-intervention-rapide",
	templateUrl: "./add-intervention-rapide.component.html",
	styleUrls: ["./add-intervention-rapide.component.scss"],
})
export class AddInterventionRapideComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	addFileForm: FormGroup;
	statuts: any;
	types: any;
	arrondissement: any;
	public uploadFiles: Array<File>;
	time1: any;
	time2: any;
	checkLang: string;
	//today's date
	todayDate: Date = new Date();
	constructor(
		private service: InterventionRapideService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private notification: NotificationService,
		private translate: TranslateService,
		private fileUtils: FilesUtilsService,
	) {
		this.getData();
		var currentDate: Date = new Date();
		this.time1 = { hour: currentDate.getHours(), minute: currentDate.getMinutes() };
		this.time2 = { hour: currentDate.getHours(), minute: currentDate.getMinutes() };

		let assocId = window.localStorage.getItem("language");
		this.checkLang = assocId;
	}

	ngOnInit() {
		this.formBuilder();
		this.addFileForm = this.fb.group({
			_file: [],
		});

		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});
		this.fileUtils.fileSizeDetector();
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
		this.addForm = this.fb.group({
			datePriseEnCharge: ["", Validators.required],
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			heurDebutIntervention: ["", Validators.required],
			heurFinIntervention: ["", Validators.required],
			objet: ["", Validators.required],
			resultatIntervention: [""],
			typeIntervention: ["", Validators.required],
			statutIntervention: ["", Validators.required],
			adresseIntervention: [""],
			remarque: [""],
			idCommune: ["", Validators.required], // Arrondissement
		});
	}

	// getter pour acceder au champs fourmulaire
	get f() { return this.addForm.controls; }
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
		this.addForm.get("heurDebutIntervention").setValue(this.time1.hour + ':' + this.time1.minute + ':' + '00');
		this.addForm.get("heurFinIntervention").setValue(this.time2.hour + ':' + this.time2.minute + ':' + '00');
		this.loading = true;
		//console.log(JSON.stringify(this.addForm.value));
		//alert(JSON.stringify(this.addForm.value));
		this.addIntervention();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addIntervention() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.createObject("/interventionRapide/new", this.addForm.value)
			.subscribe(data => {
				console.log("Id intervention :::: " + data);
				if (this.uploadFiles)
					this.service.updloadFile(this.uploadFiles, data).subscribe(
						(res) => console.log(res),
						(err) => console.log(err)
					);
				this.router.navigate(["/intervention-rapide/list-intervention-rapide",]);
				this.notification.warn(this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"));
			},
				(error) => {
					alert(error);
				}
			);
	}
	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.get('datePriseEnCharge').setValue(null);
		this.addForm.get('datePriseEnCharge').setValue(null);
		this.addForm.get('dateDebut').setValue(null);
		this.addForm.get('dateFin').setValue(null);
		this.addForm.get('objet').setValue(null);
		this.addForm.get('resultatIntervention').setValue(null);
		this.addForm.get('typeIntervention').setValue(null);
		this.addForm.get('statutIntervention').setValue(null);
		this.addForm.get('adresseIntervention').setValue(null);
		this.addForm.get('remarque').setValue(null);
		this.addForm.get('idCommune').setValue(null);
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["/intervention-rapide/list-intervention-rapide"]);
	}
	// ============================================
	// Upload file event
	// ============================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			//const file = event.target.files[0];
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}
	//get formData() { return this.addForm.get(''); }
	// =============================================
	// date debut change
	// =============================================
	dateDebutchange() {
		this.addForm.get("dateFin").reset();
	}
	/** ================================================
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

}
