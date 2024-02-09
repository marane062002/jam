import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BoServiceService } from "../../../utils/bo-service.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { OrganisationService } from "../../../organisation/organisation.service";
import { Location } from "@angular/common";
import { NotificationType } from '../../../shared/NotificationMessage.service';

@Component({
	selector: "kt-add-courriers-sortants",
	templateUrl: "./add-courriers-sortants.component.html",
	styleUrls: ["./add-courriers-sortants.component.scss"],
})
export class AddCourriersSortantsComponent implements OnInit {
	// ============================================================
	//
	// ============================================================
	num_courrier: string;
	loading = false;
	typeCourrier: any;
	originCourrier: any;
	criticiteCourrier: any;
	selectedValue: String;
	submitted = false;
	nbrCourrier = [];
	thisYear: string;
	// upload file attributes
	uploadFileForm: FormGroup;
	upform: any;
	public file;
	public uploadFiles: Array<File>;

	now: any;
	start: any;
	diff: any;
	oneDay: any;
	day: any;
	addForm: FormGroup;
	addFileForm: FormGroup;

	divisions: any;
	services: any;
	personnels: any;

	refuser: boolean = false;
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
		private location: Location
	) {
		this.getDivisions();
		this.thisYear = new Date().getFullYear() + "-";
	}

	// ============================================================
	//
	// ============================================================
	ngOnInit() {
		//document.getElementById("num").style.display = "inline";

		// document.getElementById("hideNum").style.display = "none";
		document.getElementById("dateRefuse").style.display = "none";
		document.getElementById("motif").style.display = "none";
		document.getElementById("dateExpidition").style.display = "inline";

		const currentDate = new Date().toISOString().substring(0, 10);

		//this.findFirstByOrderByIdDesc();
		this.thisYear = "" + new Date().getFullYear();
		this.getNumCourrier(this.thisYear);

		this.addForm = this.formBuilder.group({
			id: [],
			numero: ["", Validators.required],
			dateExpedetion: [currentDate, Validators.required],
			objet: ["", Validators.required],
			//coursier: [""],
			destinataire: ["", Validators.required],
			//responsableDispatching: ["", Validators.required],
			//nombreCopie: ["", Validators.required],
			criticiteCourrier: this.formBuilder.group({
				id: [2],
			}),
			typeCourrier: ["", Validators.required],
			idDivision: ["", Validators.required],
			idService: [""],
			idPersonnel: [""],
			statut: [""],
			refuser: [""],
			dateRefuse: [currentDate, Validators.required],
			motif: [""],
			reference: [""],
			createurUser: [window.localStorage.getItem("fullnameUser")],
		});

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});

		this.service.fileSizeDetector();

		//this.addForm.get("responsableDispatching").setValue("المكلف بالإرسال");
		this.addForm.get("statut").setValue("Envoyer");
		this.addForm.get('dateRefuse').setValidators(null);
		this.addForm.get('motif').setValidators(null);
		//this.addForm.get('dateExpedetion').setValidators(Validators.required);

		this.addForm.get('dateRefuse').updateValueAndValidity();
		this.addForm.get('motif').updateValueAndValidity();
		//this.addForm.get('dateExpedetion').updateValueAndValidity();

		let pId = window.localStorage.getItem("pId");
		if (pId) {
			this.service1.getPersonnelById(+pId).then(p => {
				this.addForm.get("idDivision").setValue(p.idDivision);
				this.addForm.get("idService").setValue(p.idService);
				this.addForm.get("idPersonnel").setValue(p.id);
			})
			document.getElementById("pId").style.display = "none";
		}
		//window.localStorage.removeItem("pId");

		this.getData();
		document.getElementById("coursier").style.display = "none";
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
	onChangeTypeCourrier() {
		const typeC = this.addForm.get("typeCourrier").value.id;
		//console.log("Type courrier : "+ typeC);
		if (typeC == 1) {
			document.getElementById("coursier").style.display = "inline";
			this.addForm.get("coursier").setValue("موزع المراسلات الإدارية");
		} else {
			document.getElementById("coursier").style.display = "none";
			this.addForm.get("coursier").reset;
		}
	}
	// ============================================================
	//
	// ============================================================
	onSubmit() {
		const controls = this.addForm.controls;
		if (!controls['refuser'].value) {
			this.addForm.controls['dateRefuse'].clearValidators();
			this.addForm.controls['motif'].clearValidators();
			this.addForm.controls['dateRefuse'].setValue(null);
			this.addForm.controls['motif'].setValue(null);
			this.addForm.get('dateRefuse').updateValueAndValidity();
			this.addForm.get('motif').updateValueAndValidity();
		} else {
			this.addForm.controls['dateExpedetion'].clearValidators();
			this.addForm.controls['dateExpedetion'].setValue(null);
			this.addForm.get('dateExpedetion').updateValueAndValidity();
		}
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.addCourrierSortant();
	}
	// ============================================================
	//
	// ============================================================
	private findFirstByOrderByIdDesc() {
		this.service
			.getAllObject("/courrierSortants/findLastOne")
			.subscribe((data) => {
				this.nbrCourrier = data;
				this.addForm
					.get("numero")
					.setValue(this.thisYear + this.nbrCourrier);
			});
	}
	// ============================================================
	//
	// ============================================================
	private getNumCourrier(year: String) {
		const _this = this;
		this.service
			.getNumCorrierByAnnee("/courrierSortants/count/", year)
			.subscribe((data) => {
				_this.num_courrier = data;
				this.addForm.get("numero").setValue(data);
			});
	}
	// ============================================================
	//
	// ============================================================
	backList() {
		let pId = window.localStorage.getItem("pId");
		if (!pId) {
			this.router.navigate(["courriers-sortants/list-courriers-sortants"]);
		} else {
			this.location.back();
		}
		window.localStorage.removeItem("pId");
	}
	// ============================================================
	//
	// ============================================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// ============================================================
	//
	// ============================================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}
	// ============================================================
	//
	// ============================================================
	addCourrierSortant() {
		this.loading = true;
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.refuser = this.addForm.get("refuser").value;
		//this.thisYear = "" + new Date().getFullYear();
		//this.service
		//.getNumCorrierByAnnee("/courrierSortants/count/", this.thisYear)
		//.subscribe((data) => {
		console.log("COURRIER REFUSE: " + this.refuser);
		if (this.refuser) {
			this.addForm.get('numero').setValue(null);
		} 
		//else {
			//this.addForm.get('numero').setValue(data);
		//}
		//console.log("ID DE COURRIER -data: " + JSON.stringify(this.addForm.value));

		this.service
			.createObject("/courrierSortants/new", this.addForm.value)
			.subscribe((data) => {
				// upload files to alfresco GED
				this.loading = false;
				if (this.uploadFiles)
					this.service.updloadFiles2(this.uploadFiles, data)
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
				this.notification.sendMessage({
					message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
					type: NotificationType.success
				});

				let pId = window.localStorage.getItem("pId");
				if (!pId) {
					this.router.navigate(["courriers-sortants/list-courriers-sortants"]);
				} else {
					this.location.back();
				}
				window.localStorage.removeItem("pId");

			},err=>{
				this.loading = false;
			});

		//});
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
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idService").setValue(0);
		this.addForm.get("idPersonnel").setValue(0);

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
		const idService = this.addForm.get("idService").value;
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idPersonnel").setValue(0);

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
	// ============================================================
	//
	// ============================================================
	refuserChanged() {
		const currentDate = new Date().toISOString().substring(0, 10);

		this.refuser = this.addForm.get("refuser").value;
		this.addForm.get("dateRefuse").reset();
		this.addForm.get("motif").reset();
		this.addForm.get("dateExpedetion").reset();
		this.addForm.get("statut").reset();

		if (this.refuser) {
			this.addForm.get("dateRefuse").setValidators(Validators.required);
			this.addForm.get("motif").setValidators(Validators.required);
			this.addForm.get("dateExpedetion").setValidators(null);

			this.addForm.get("dateRefuse").setValue(currentDate);

			document.getElementById("dateExpidition").style.display = "none";
			document.getElementById("dateRefuse").style.display = "inline";
			document.getElementById("motif").style.display = "inline";

			this.addForm.get("statut").setValue("Refuser");

			this.addForm.get("numero").setValue(null);
		} else {
			this.addForm.get("dateRefuse").setValidators(null);
			this.addForm.get("motif").setValidators(null);
			this.addForm.get("dateExpedetion").setValidators(Validators.required);

			this.addForm.get("dateExpedetion").setValue(currentDate);

			document.getElementById("dateExpidition").style.display = "inline";
			document.getElementById("dateRefuse").style.display = "none";
			document.getElementById("motif").style.display = "none";

			this.addForm.get("statut").setValue("Envoyer");

			this.thisYear = "" + new Date().getFullYear();
			this.getNumCourrier(this.thisYear);
		}
		this.addForm.get('dateRefuse').updateValueAndValidity();
		this.addForm.get('motif').updateValueAndValidity();
		this.addForm.get('dateExpedetion').updateValueAndValidity();
	}
}
