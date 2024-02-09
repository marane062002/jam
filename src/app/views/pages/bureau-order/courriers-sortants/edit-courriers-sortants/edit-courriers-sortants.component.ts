import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first, finalize } from "rxjs/operators";
import { BoServiceService } from "../../../utils/bo-service.service";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { OrganisationService } from "../../../organisation/organisation.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import { environment } from './../../../../../../environments/environment';
import { NotificationType } from '../../../shared/NotificationMessage.service';
import { SpinnerService } from '../../../utils/spinner.service';

@Component({
	selector: "kt-edit-courriers-sortants",
	templateUrl: "./edit-courriers-sortants.component.html",
	styleUrls: ["./edit-courriers-sortants.component.scss"],
})
export class EditCourriersSortantsComponent implements OnInit {
	// ============================================================
	//
	// ============================================================
	loading = false;
	typeCourrier: any;
	originCourrier: any;
	criticiteCourrier: any;
	editForm: FormGroup;
	divisions: any;
	services: any;
	personnels: any;

	// file varriable
	files: Observable<any>;
	start: boolean = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
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
		private spinnerService: SpinnerService,
	) {
		let courrierId = window.localStorage.getItem("csId");
		if (!courrierId) {
			this.router.navigate([
				"courriers-sortants/list-courriers-sortants"]);
			return;
		}
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.service
			.getObjectById("/courrierSortants/edit/show/", +courrierId)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			})).subscribe(data => {
				this.editForm.patchValue(data);

				//console.log('Date expedition: '+ data.dateExpedetion)
				if (data.dateExpedetion)
					this.editForm.controls['dateExpedetion'].patchValue(new Date(data.dateExpedetion).toISOString());

			});

		this.editForm = this.formBuilder.group({
			id: [courrierId],
			numero: ["", Validators.required],
			dateExpedetion: ["", Validators.required],
			objet: ["", Validators.required],
			//coursier: [""],
			destinataire: ["", Validators.required],
			//responsableDispatching: ["", Validators.required],
			//nombreCopie: ["", Validators.required],
			criticiteCourrier: this.formBuilder.group({
				id: [],
			}),
			typeCourrier: this.formBuilder.group({
				id: [],
			}),
			idDivision: [""],
			idService: [""],
			idPersonnel: [""],
			statut: [""],
			reference: [""],
		});

		this.getDivisions();
		//this.getServices();

		// get all files by id
		setTimeout(() => {
			if (courrierId != null)
				this.files = this.service.getByIdCourrierFiles2(courrierId);
			this.start = false;
		}, 1000);
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
		window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/" + r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id: any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			console.log("Delete file ID: " + id);
			this.service
				.deletefiles("/PjCourriersSortants/", id)
				.subscribe(data => {
					console.log("File courrier deleted : " + id);
				});
			// Refresh
			let courrierId = window.localStorage.getItem("csId");
			if (!courrierId) {
				alert("Invalid action.");
				this.router.navigate(["courriers-sortants"]);
				return;
			}
			// reset object
			this.files = null;
			// start progress bar
			this.start = true;

			// Notification
			this.notification.sendMessage({
				message: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
				type: NotificationType.success
			});

			// fill datatable
			setTimeout(() => {
				if (courrierId != null)
					this.files = this.service.getByIdCourrierFiles2(courrierId);
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
	resetFileField() {
		this.addFileForm.get("_file").setValue("");
	}
	// ============================================================
	//
	// ============================================================
	ngOnInit() {
		this.service.fileSizeDetector();

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});

		this.getData();

		const _this = this; // important !!!
		this.editForm.get('idDivision').valueChanges.subscribe(
			value => {
				if (value != 0) {
					this.service2.getRessourceById(value, '/services/divisions/')
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
				if (value != 0) {
					this.service1.getRessourceById(value, '/personnels/service/')
						.then(data => {
							_this.personnels = data;
						},
							error => console.log(error)
						);
				}
				this.editForm.get('idDivision').valueChanges.subscribe(
					value => {
						if (value != 0) {
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
		/*
	 this.editForm.get('coursier').valueChanges.subscribe(
		value=> {
			if(value!=0){
				document.getElementById("coursier").style.display = "inline";
			}else{
				document.getElementById("coursier").style.display = "none";
				this.editForm.get("coursier").reset;
			}});
			*/
	}
	// ============================================================
	//
	// ============================================================
	onChangeTypeCourrier() {
		/*
		const typeC = this.editForm.get("typeCourrier").value.id;
		if (typeC == 1) {
			document.getElementById("coursier").style.display = "inline";
			this.editForm.get("coursier").setValue("موزع المراسلات الإدارية");
		} else {
			document.getElementById("coursier").style.display = "none";
			this.editForm.get("coursier").reset;
		}
		*/
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.typeCourrier = data[0];
				this.originCourrier = data[1];
				//this.criticiteCourrier = data[3];
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
		/** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.service
			.updateObject("/courrierSortants/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.loading = true;
					var id = this.editForm.get('id').value;
					console.log("ID courrier: " + id);
					// upload file
					if (this.uploadFiles)
						this.service.updloadFiles2(this.uploadFiles, id)
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
						"courriers-sortants/list-courriers-sortants",
					]);
					this.notification.sendMessage({
						message: this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED"),
						type: NotificationType.success
					});
				},
				(error) => {
					alert(error);
				}
			);
	}
	// ============================================================
	//
	// ============================================================
	getServices() {
		this.service2
			.getRessource("/services/index")
			.subscribe((data) => {
				this.services = data
			});
	}
	// ============================================================
	//
	// ============================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ============================================================
	//
	// ============================================================
	onChangeDivision() {
		const idDivision = this.editForm.get("idDivision").value;
		this.editForm.get("idService").setValue(0);
		this.editForm.get("idPersonnel").setValue(0);

		if (idDivision != 0) {
			this.service1
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
			this.service2
				.getRessourceById(idDivision, "/services/divisions/")
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
		this.editForm.get("idPersonnel").setValue(0);

		if (idService != 0) {
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
	backList() {
		let csId22=parseInt(localStorage.getItem("csId22"));
		if(!isNaN(csId22)){
			this.router.navigate(["courriers-sortants/courriers-sortants-show"]);
		}
		else{
		this.router.navigate(["courriers-sortants/list-courriers-sortants"]);
		}
	}
	// ============================================
	// File size converter
	// ============================================
	getFormattedFileSize(Fsize) {
		return this.service.getFormattedFileSizeService(Fsize);
	}
}
