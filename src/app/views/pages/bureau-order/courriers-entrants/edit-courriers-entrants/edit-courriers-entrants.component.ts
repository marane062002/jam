import { Component, OnInit, ViewChild, EventEmitter, Output } from "@angular/core";
import {
	FormGroup,
	Validators,
	FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { first, finalize } from "rxjs/operators";
import { MatSelectChange, MatSelect } from "@angular/material/select";
import { BoServiceService } from '../../../utils/bo-service.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { PersonnelService } from '../../../rh/services/personnel.service';
import { Observable } from 'rxjs';
import { environment } from './../../../../../../environments/environment';
import { NotificationType } from '../../../shared/NotificationMessage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../../../utils/spinner.service';

@Component({
	selector: "kt-edit-courriers-entrants",
	templateUrl: "./edit-courriers-entrants.component.html",
	styleUrls: ["./edit-courriers-entrants.component.scss"]
})
export class EditCourriersEntrantsComponent implements OnInit {
	// ============================================================
	//
	// ============================================================
	language=localStorage.getItem('language');
	showRefOrigine = 0;
	loading = false;
	divisions: any;
	services: any;
	personnels: any;
	showInterne = false;
	showExterne = false;
	showExternePM = false;
	showExternePP = false;
	typeCourrier: any;
	originCourrier: any;
	criticiteCourrier: any;
	originCourrierPM: any;
	originCourrierPP: any;
	editForm: FormGroup;

	files: Observable<any>;
	start: boolean = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	// ============================================================
	//
	// ============================================================
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	// ============================================================
	//
	// ============================================================
	constructor(
		private service: BoServiceService,
		private service1: PersonnelService,
		private service2: OrganisationService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private formBuilder: FormBuilder,
		// private SpinnerService: NgxSpinnerService,
		private spinnerService: SpinnerService,
	) {
		let courrierId = window.localStorage.getItem("courrId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["courriers-entrants"]);
			return;
		}
		// setTimeout(() => { this.SpinnerService.show() }, 25);
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.service
			.getObjectById("/courrierEntrants/edit/show/", +courrierId)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			})).subscribe(data => {
				//console.log(JSON.stringify(data,null,4));
				//this.editForm.patchValue(data);
				this.editForm.controls['id'].patchValue(data.id);
				this.editForm.controls['reference'].patchValue(data.reference!=undefined ?data.reference:null);
				this.editForm.controls['numero'].patchValue(data.numero);
				this.editForm.controls['dateReception'].patchValue(new Date(data.dateReception).toISOString());
				this.editForm.controls['objet'].patchValue(data.objet);
				this.editForm.controls['responsableDispatching'].patchValue(data.responsableDispatching);
				this.editForm.controls['president'].patchValue(data.president);
				this.editForm.controls['criticiteCourrier'].patchValue(data.criticiteCourrier);
				this.editForm.controls['typeCourrier'].patchValue(data.typeCourrier);
				if (data.origineCourierEntrant != null) {
					this.editForm.controls['origineCourierEntrant'].patchValue(data.origineCourierEntrant);
					this.showRefOrigine = 1;
				}
				if (data.dateEmissionOrigine != null)
					this.editForm.controls['dateEmissionOrigine'].patchValue(new Date(data.dateEmissionOrigine).toISOString());
				this.editForm.controls['refOrigine'].patchValue(data.refOrigine);

				this.editForm.controls['typeOrigine'].patchValue(data.typeOrigine);
				this.editForm.controls['idDivision'].patchValue(data.idDivision);
				this.editForm.controls['idService'].patchValue(data.idService);
				this.editForm.controls['idPersonnelInterne'].patchValue(data.idPersonnelInterne);
				this.editForm.controls['statut'].patchValue(data.statut);
				this.editForm.controls['typePersonne'].patchValue(data.typePersonne);
				this.editForm.controls['personnePhysique'].patchValue(data.personnePhysique);

				this.editForm.controls['createurUser'].patchValue(data.createurUser);
				this.editForm.controls['creationDate'].patchValue(new Date(data.creationDate).toISOString());
				this.editForm.controls['updateDate'].patchValue(new Date(data.updateDate).toISOString());
				this.editForm.controls['dispatchingDate'].patchValue(new Date(data.dispatchingDate).toISOString());
			
				this.editForm.controls['dateLimiteTraitement'].patchValue(data.dateLimiteTraitement)

				if (data.typeOrigine == "in") {
					this.showExterne = false;
					this.showInterne = true;
					this.showExternePM = false;
					this.showExternePP = false;

					this.editForm.get("idDivision").setValidators(Validators.required);
					this.editForm.get('origineCourierEntrant').setValidators(null);
					this.editForm.get("typePersonne").setValidators(null);
					this.editForm.get('personnePhysique').setValidators(null);
				} else if (data.typeOrigine == "out") {

					this.editForm.get("idDivision").setValidators(null);
					this.editForm.get("origineCourierEntrant").setValidators(Validators.required);
					this.editForm.get("typePersonne").setValidators(Validators.required);

					this.showExterne = true;
					this.showInterne = false;
					if (data.typePersonne == "pm") {
						this.showExternePM = true;
						this.showExternePP = false;
						this.editForm.get('personnePhysique').setValidators(null);
					} else if (data.typePersonne == "pp") {
						this.showExternePM = false;
						this.showExternePP = true;
						this.editForm.get("personnePhysique").setValidators(Validators.required);
					}

				}
				this.editForm.get('origineCourierEntrant').updateValueAndValidity();
				this.editForm.get('personnePhysique').updateValueAndValidity();
				this.editForm.get('idDivision').updateValueAndValidity();
				this.editForm.get('typePersonne').updateValueAndValidity();
				// setTimeout(() => { this.SpinnerService.hide() }, 2000);
			},
				(err) => {
					// setTimeout(() => { this.SpinnerService.hide() }, 2000);
					console.log(err);
				});


		this.formBuild();

		this.getDivisions();

		//this.selectionChanged();

		setTimeout(() => {
			if (courrierId != null)
				this.files = this.service.getByIdCourrierFiles(courrierId);
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// Origine changed
	// ============================================================
	origineChanged() {
		let origine = this.editForm.get('origineCourierEntrant').value;
		if (origine != null) {
			this.showRefOrigine = 1;
		} else {
			this.showRefOrigine = 0;
		}
		this.editForm.get('refOrigine').setValue(null);
		this.editForm.get('dateEmissionOrigine').setValue(null);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.service.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.service.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjCourriersEntrants/" + r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id: any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			console.log("Delete file ID: " + id);
			this.service
				.deletefiles("/PjCourriersEntrants/", id)
				.subscribe(data => {
					console.log("File courrier deleted : " + id);
				});
			// Refresh
			let courrierId = window.localStorage.getItem("courrId");
			if (!courrierId) {
				alert("Invalid action.");
				this.router.navigate(["courriers-entrants"]);
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
				if (courrierId != null)
					this.files = this.service.getByIdCourrierFiles(courrierId);
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
			this.notification.sendMessage({
				message: 'الملف جاهز للتحميل ... ',
				type: NotificationType.info
			});
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}
	// ============================================================
	//
	// ============================================================
	getDivisions() {
		this.service.getAllObject("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ============================================================
	//
	// ============================================================
	onChangeDivision() {
		const idDivision = this.editForm.get("idDivision").value;
		this.editForm.get("idService").setValue(0);
		this.editForm.get("idPersonnelInterne").setValue(0);

		if (idDivision != 0 && idDivision != null) {
			this.service1
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
			this.service
				.getDivisionById("/services/divisions/", idDivision)
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
			this.personnels = null;
		}
	}
	// ============================================================
	//
	// ============================================================
	onChangeService() {
		const idService = this.editForm.get("idService").value;
		const idDivision = this.editForm.get("idDivision").value;
		this.editForm.get("idPersonnelInterne").setValue(0);

		if (idService != 0 && idService != null) {
			this.service1
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		} else if (idDivision != 0) this.onChangeDivision();
	}
	// ============================================================
	//
	// ============================================================
	formBuild() {
		this.editForm = this.formBuilder.group({
			id: [],
			numero: [""],
			dateReception: ["", Validators.required],
			objet: ["", Validators.required],
			responsableDispatching: ["", Validators.required],
			president: ["", Validators.required],
			criticiteCourrier: this.formBuilder.group({
				id: ["", Validators.required],
			}),
			typeCourrier: this.formBuilder.group({
				id: ["", Validators.required],
			}),
			origineCourierEntrant: this.formBuilder.group({
				id: []
			}),
			typeOrigine: ["", Validators.required],
			idDivision: [""],
			idService: [""],
			idPersonnelInterne: [""],
			statut: [""],
			typePersonne: [""],
			personnePhysique: ["", Validators.required],
			creationDate: [""],
			updateDate: [""],
			dispatchingDate: [""],
			createurUser: [""],
			dateEmissionOrigine: [null],
			refOrigine: [null],
			reference: [null],
			dateLimiteTraitement:[null]
		});
	}
	// ============================================================
	//
	// ============================================================
	selectionChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.showRefOrigine = 0;
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		this.editForm.get("typePersonne").setValue(null);
		this.editForm.get("personnePhysique").setValue(null);

		this.editForm.get('idDivision').setValidators(null);
		this.editForm.get("idDivision").setValue(null);
		this.editForm.get("idService").setValue(null);
		this.editForm.get("idPersonnelInterne").setValue(null);

		if (event.value == "out") {
			this.showExterne = true;
			this.showExternePM = true;
			this.showExternePP = false;
			this.showInterne = false;
			this.editForm.get("origineCourierEntrant").setValidators(Validators.required);
			this.editForm.get("personnePhysique").setValidators(Validators.required);
			// this.editForm.get('idDivision').setValidators(null);
			// this.editForm.get("idDivision").setValue(null);
			// this.editForm.get("idService").setValue(null);
			// this.editForm.get("idPersonnelInterne").setValue(null);
			// this.editForm.get("typePersonne").setValue(null);
			this.editForm.get("typePersonne").setValidators(Validators.required);
		} else {
			this.showExterne = false;
			this.showExternePM = false;
			this.showExternePP = false;
			this.showInterne = true;
			// this.editForm.get("origineCourierEntrant").setValue(null);
			// this.editForm.get("personnePhysique").setValue(null);
			this.editForm.get("idDivision").setValidators(Validators.required);
			this.editForm.get('origineCourierEntrant').setValidators(null);
			this.editForm.get('personnePhysique').setValidators(null);
			// this.editForm.get("typePersonne").setValue(null);
			this.editForm.get("typePersonne").setValidators(null);

			this.editForm.removeControl('origineCourierEntrant');
			this.editForm.addControl('origineCourierEntrant', this.formBuilder.control(null));
		}
		this.editForm.get('origineCourierEntrant').updateValueAndValidity();
		this.editForm.get('personnePhysique').updateValueAndValidity();
		this.editForm.get('idDivision').updateValueAndValidity();
		this.editForm.get('typePersonne').updateValueAndValidity();
	}
	// ControlValueAccessor Implementation
	onChange: any = () => { };
	onTouched: any = () => { };
	// ============================================================
	// Type personne pp / pm
	// ============================================================
	typePersonneChanged() {
		let typeP = this.editForm.get('typePersonne').value;
		if (typeP != null)
			if (typeP == "pm") {
				this.showExternePM = true;
				this.showExternePP = false;
				this.editForm.get('origineCourierEntrant').enable();
				this.editForm.get("personnePhysique").setValue(null);
				this.editForm.get('personnePhysique').setValidators(null);
				this.editForm.get("origineCourierEntrant").setValidators(Validators.required);
				this.editForm.removeControl('origineCourierEntrant');
				this.editForm.addControl('origineCourierEntrant', this.formBuilder.group({ id: [] }));
			} else {
				this.showExternePM = false;
				this.showExternePP = true;
				this.editForm.get('origineCourierEntrant').enable();
				this.editForm.get("origineCourierEntrant").reset();
				this.editForm.get("personnePhysique").setValidators(Validators.required);
				this.editForm.get('origineCourierEntrant').setValidators(null);
				this.editForm.removeControl('origineCourierEntrant');
				this.editForm.addControl('origineCourierEntrant', this.formBuilder.control(null));
			}
		this.showRefOrigine = 0;
		this.editForm.get('origineCourierEntrant').updateValueAndValidity();
		this.editForm.get('personnePhysique').updateValueAndValidity();
	}
	// ============================================================
	//
	// ============================================================
	ngOnInit() {

		this.service.fileSizeDetector();

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});

		this.editForm.get("responsableDispatching").setValue("الموزع");

		this.editForm.get("statut").setValue(this.translate.instant("PAGES.BUREAU_ORDRE.EN_ATTENTE_DISPATCHING"));

		this.formBuild()

		this.getData();

		const _this = this; // important !!!
		this.editForm.get('idDivision').valueChanges.subscribe(
			value => {
				if (value != 0 && value != null) {
					this.service
						.getDivisionById("/services/divisions/", value)
						.subscribe(data => {
							_this.services = data;
						},
							error => console.log(error)
						);
				}
			}
		);
		this.editForm.get('idService').valueChanges.subscribe(
			value => {
				if (value != 0 && value != null) {
					this.service1.getRessourceById(value, '/personnels/service/')
						.then(data => {
							_this.personnels = data;
						},
							error => console.log(error)
						);
				}
				this.editForm.get('idDivision').valueChanges.subscribe(
					value => {
						if (value != 0 && value != null) {
							this.service1.getRessourceById(value, '/personnels/division/')
								.then(data => {
									_this.personnels = data;
								},
									error => console.log(error)
								);
						}
					}
				);
			}
		);

	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.typeCourrier = data[0];
				this.originCourrierPM = data[1];
				//this.originCourrierPP = data[2];
				this.criticiteCourrier = data[3];
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================================
	//
	// ============================================================
	onSubmit() {
		const controls = this.editForm.controls;
		//console.log("Controls :: " + controls);
		/** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		//console.log("BEFORE :: " + JSON.stringify(this.editForm.value));
		if (this.editForm.get('typeOrigine').value == 'in') {
			this.editForm.removeControl('origineCourierEntrant');
			this.editForm.addControl('origineCourierEntrant', this.formBuilder.control(null));
		}


		if (this.editForm.get('typePersonne').value == 'pp') {
			this.editForm.removeControl('origineCourierEntrant');
			this.editForm.addControl('origineCourierEntrant', this.formBuilder.control(null));
		}


		//console.log("AFTER :: " + JSON.stringify(this.editForm.value));

		this.service
			.updateObject(
				"/courrierEntrants/edit/",
				this.editForm.value
			)
			.pipe(first())
			.subscribe(
				data => {
					this.loading = true;
					var id = this.editForm.get('id').value;
					//console.log("ID courrier: " + id);
					// upload file
					if (this.uploadFiles)
						this.service.updloadFiles(this.uploadFiles, id)
							.subscribe(
								(res) =>
									this.notification.sendMessage({
										message: 'تمت إضافة المرفقات بنجاح',
										type: NotificationType.info
									}),
								(err) =>
									this.notification.sendMessage({
										message: 'عملية رفع المرفقات خاطئة',
										type: NotificationType.error
									}),
							);

					this.router.navigate([
						"courriers-entrants/list-courriers-entrants"
					]);
					/*
										this.notification.warn(
											this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED")
										);
					*/
					this.notification.sendMessage({
						message: this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED"),
						type: NotificationType.success
					});
				},
				error => {
					alert(error);
				}
			);
	}
	// ============================================================
	//
	// ============================================================
	backList() {
		let courrId22=parseInt(window.localStorage.getItem('courrId22'));
		if(!isNaN(courrId22)){
			this.router.navigate(["courriers-entrants/courriers-entrants-show"])
		}
		else{
			this.router.navigate(["courriers-entrants/list-courriers-entrants"]);
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
		const control = this.editForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
	// ============================================
	// File size converter
	// ============================================
	getFormattedFileSize(Fsize) {
		return this.service.getFormattedFileSizeService(Fsize);
	}
}
