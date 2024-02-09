import {
	Component,
	OnInit,
	EventEmitter,
	Output,
	ViewChild,
	ElementRef,
} from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormBuilder,
	Validators,
	NgForm,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSelectChange, MatSelect } from "@angular/material/select";
import { BoServiceService } from "../../../utils/bo-service.service";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { OrganisationService } from "../../../organisation/organisation.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationType } from '../../../shared/NotificationMessage.service';
import Swal from 'sweetalert2';
import { SpinnerService } from '../../../utils/spinner.service';
import { finalize } from 'rxjs/operators';

@Component({
	selector: "kt-add-courriers-entrants",
	templateUrl: "./add-courriers-entrants.component.html",
	styleUrls: ["./add-courriers-entrants.component.scss"],
})
export class AddCourriersEntrantsComponent implements OnInit {
	// ============================================================
	//
	// ============================================================
	language = localStorage.getItem('language');
	loading = false;
	president: boolean;
	showInterne = false;
	showExterne = true;
	showExternePM = true;
	showExternePP = false;
	showRefOrigine = 0;
	nbrCourrier = [];
	typeCourrier: any;
	originCourrierPM: any;
	originCourrierPP: any;
	criticiteCourrier: any;
	selectedValue: String;
	submitted = false;
	thisYear: string;
	// upload file attributes
	uploadFileForm: FormGroup;
	upform: any;
	public file;
	public uploadFiles: Array<File>;
	selectedList: string;
	divisions: any;
	compareDiv : any;
	services: any;
	personnels: any;
	addForm: FormGroup;
	addFileForm: FormGroup;

	todayDate: Date = new Date();
	typ_courrier = 1;

	num_courrier: string;
	// ============================================================
	//
	// ============================================================
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	snackBarRef: any;
	@ViewChild('origineSearch', { static: false }) origineSearchInput: ElementRef;
	origineList = [];
	private _origineList: Array<any> = [];
	@ViewChild('inputFile', { static: true }) inputFile: ElementRef;
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
		private spinnerService: SpinnerService
	) {
		this.getDivisions();
		//this.thisYear = new Date().getFullYear() + "-";
	}
	// ============================================================
	//
	// ============================================================
	getDivisions() {
		this.service.getAllObject("/divisions/index")
			.subscribe((data) => {this.divisions = data;
								  this.compareDiv= data;});
	}
	// ============================================================
	//
	// ============================================================
	onChangeDivision() {
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idService").setValue(0);
		this.addForm.get("idPersonnelInterne").setValue(0);

		if (idDivision != 0) {
			this.service1
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
			this.service
				.getDivisionById("/services/divisions/",idDivision)
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
			this.personnels = null;
			this.onChangePersonnel();
		}
	}
	// ============================================================
	//
	// ============================================================
	onChangePersonnel() {
		const personnel = this.addForm.get("idPersonnelInterne").value;
	}
	// ============================================================
	//
	// ============================================================
	onChangeService() {
		const idService = this.addForm.get("idService").value;
		const idDivision = this.addForm.get("idDivision").value;
		this.addForm.get("idPersonnelInterne").setValue(0);

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
	formBuild() {
		const currentDate = new Date().toISOString().substring(0, 10);

		this.addForm = this.formBuilder.group({
			id: [],
			numero: [""],
			dateReception: [currentDate, Validators.required],
			objet: ["", Validators.required],
			responsableDispatching: ["", Validators.required],
			president: [""],
			//criticiteCourrier: ["", Validators.required],
			criticiteCourrier: this.formBuilder.group({
				id: [2, Validators.required],
			}),
			typeCourrier: this.formBuilder.group({
				id: ["", Validators.required],
			}),
			origineCourierEntrant: ["", Validators.required],
			typeOrigine: ["", Validators.required],
			idDivision: [],
			idService: [],
			idPersonnelInterne: [],
			statut: [],
			typePersonne: ["", Validators.required],
			personnePhysique: ["", Validators.required],
			createurUser: [window.localStorage.getItem("fullnameUser")],
			dateEmissionOrigine: [null],
			reference: [null],
			dateLimiteTraitement:[null]
			
		});

		this.addForm.get('origineCourierEntrant').disable();
		this.addForm.get('personnePhysique').disable();
		//this.addForm.get(['criticiteCourrier','id']).patchValue(1);
	}
	// ============================================================
	//
	// ============================================================
	ngOnInit() {

		document.getElementById("num").style.display = "inline";

		//const currentDate = new Date().toISOString().substring(0, 10);
		//this.addForm.get('dateReception').setValue(currentDate);

		this.thisYear = "" + new Date().getFullYear();
		this.getNumCourrier(this.thisYear);

		//this.findFirstByOrderByIdDesc();

		this.selectedList = "out";

		this.formBuild();


		this.addForm.get("responsableDispatching").setValue("المدير العام للمصالح الجماعية");

		this.addForm
			.get("statut")
			.setValue(
				this.translate.instant(
					"PAGES.BUREAU_ORDRE.EN_ATTENTE_DISPATCHING"
				)
			);

		this.getData();

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});

		this.service.fileSizeDetector();
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.typeCourrier = data[0];
				this.origineList = data[1];
				this.originCourrierPM = data[2]; /** top 10 */
				//this._origineList = data[1];
				this.criticiteCourrier = data[3];
			},
			(err) => {
				console.log(err);
			}
		);
	}
	onInputChange(value: string) {
		//console.log("Filter value : "+ value + "  / to lower case : " + value.toLowerCase.toString);
		let filter = value.toLowerCase();
		for (let i = 0; i < this.origineList.length; i++) {
			let option = this.origineList[i];
			//console.log("Option value : "+ JSON.stringify(option));
			if (option.raisonSociale.toLowerCase().indexOf(filter) >= 0) {
				this.originCourrierPM.push(option);
			}
		}
	}
	onInputDivChange(value: string) {
		//console.log("Filter value : "+ value + "  / to lower case : " + value.toLowerCase.toString);
		
		let filter = value.toLowerCase();
		for (let i = 0; i < this.compareDiv.length; i++) {
			let option = this.compareDiv[i];
			//console.log("Option value : "+ JSON.stringify(option));
			
			if (option.libelle.toLowerCase().indexOf(filter) >= 0) {
				this.divisions.push(option);
			}
		}
	}

	onKey(value) {
		this.originCourrierPM = [];
		if (value != null) {
			this.onInputChange(value);
		} else {
			this.service.getData().subscribe(
				(data) => {
					this.originCourrierPM = data[2]; /** top 10 */
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}


	
	onKeyDiv(value) {
		this.divisions = [];
		if (value != null) {
			this.onInputDivChange(value);
		} else {
			this.getDivisions();
		}
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
		if (event.value == "out") {
			this.showExterne = true;
			this.showExternePM = true;
			this.showExternePP = false;
			this.showInterne = false;
			this.addForm.get("origineCourierEntrant").setValidators(Validators.required);
			this.addForm.get("personnePhysique").setValidators(Validators.required);
			this.addForm.get('idDivision').setValidators(null);
			this.addForm.get("idDivision").setValue(null);
			this.addForm.get("idService").setValue(null);
			this.addForm.get("idPersonnelInterne").setValue(null);
			this.addForm.get("typePersonne").setValue(null);
			this.addForm.get("typePersonne").setValidators(Validators.required);
		} else {
			this.showExterne = false;
			this.showExternePM = false;
			this.showExternePP = false;
			this.showInterne = true;
			this.addForm.get("origineCourierEntrant").setValue(null);
			this.addForm.get("personnePhysique").setValue(null);
			this.addForm.get("idDivision").setValidators(Validators.required);
			this.addForm.get('origineCourierEntrant').setValidators(null);
			this.addForm.get('personnePhysique').setValidators(null);
			this.addForm.get("typePersonne").setValue(null);
			this.addForm.get("typePersonne").setValidators(null);
		}
		this.addForm.get('origineCourierEntrant').updateValueAndValidity();
		this.addForm.get('personnePhysique').updateValueAndValidity();
		this.addForm.get('idDivision').updateValueAndValidity();
		this.addForm.get('typePersonne').updateValueAndValidity();
	}
	// ControlValueAccessor Implementation
	onChange: any = () => { };
	onTouched: any = () => { };
	// ============================================================
	// Origine changed
	// ============================================================
	origineChanged() {
		let origine = this.addForm.get('origineCourierEntrant').value;
		if (origine != null) {
			this.showRefOrigine = 1;
		} else {
			this.showRefOrigine = 0;
		}
		this.addForm.get('refOrigine').setValue(null);
		this.addForm.get('dateEmissionOrigine').setValue(null);
	}
	// ============================================================
	// Type personne pp / pm
	// ============================================================
	typePersonneChanged() {
		let typeP = this.addForm.get('typePersonne').value;
		if (typeP != null)
			if (typeP == "pm") {
				this.showExternePM = true;
				this.showExternePP = false;
				this.addForm.get('origineCourierEntrant').enable();
			} else {
				this.showExternePM = false;
				this.showExternePP = true;
				//this.addForm.get('origineCourierEntrant').enable();
				this.addForm.get('personnePhysique').enable();
			}
		this.showRefOrigine = 0;
		this.addForm.get('origineCourierEntrant').setValue(null);
		this.addForm.get('personnePhysique').setValue(null);
		this.addForm.get('refOrigine').setValue(null);
		this.addForm.get('dateEmissionOrigine').setValue(null);
	}
	// ============================================================
	//
	// ============================================================
	presidentChanged() {
		this.president = this.addForm.get("president").value;
		if (this.president) {
			this.addForm.get("statut").setValue("موجه للرئيس إسمياً");
		} else {
			this.addForm
				.get("statut")
				.setValue(
					this.translate.instant(
						"PAGES.BUREAU_ORDRE.EN_ATTENTE_DISPATCHING"
					)
				);
		}
	}
	// ============================================================
	//
	// ============================================================
	onSubmit() {
		
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		// affectation du numero de courrier
		//this.thisYear = "" + new Date().getFullYear();
		//this.getNumCourrier(this.thisYear);
		//console.log("NUM COURRIER: "+ this.num_courrier);
		//console.log("[Recupération du N de courrier]: "+ this.addForm.get("numero").value)
		this.addCourrierEntrant();
	}
	// ============================================================
	//
	// ============================================================
	private findFirstByOrderByIdDesc() {
		this.service
			.getAllObject("/courrierEntrants/findLastOne")
			.subscribe((data) => {
				this.nbrCourrier = data;
				this.addForm
					.get("numero")
					.patchValue(this.thisYear + this.nbrCourrier);
				//this.addForm.get("numero").disabled;
			});
	}
	// ============================================================
	//
	// ============================================================
	private getNumCourrier(year: String) {
		const _this = this;
		this.service
			.getNumCorrierByAnnee("/courrierEntrants/count/", year)
			.subscribe((data) => {
				console.log("N: " + data);
				_this.num_courrier = data;
			this.addForm.controls['numero'].setValue(data);
				this.addForm.get("numero").updateValueAndValidity();
				//console.log("set value numéro !!");
				//this.addForm.get("numero").disabled;
			});
	}
	// ============================================================
	//
	// ============================================================
	addCourrierEntrant() {
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}

		this.loading = true;
		//var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
		//this.thisYear = "" + new Date().getFullYear();
		//this.service.getNumCorrierByAnnee("/courrierEntrants/count/", this.thisYear).subscribe((data) => {
		//this.addForm.get('numero').setValue(data);
		this.service
			.createObject("/courrierEntrants/new", this.addForm.value)
			.subscribe((data) => {
				if (data == 0) {
					alert('رقم المراسلة مكرر!! المرجوا التحقق من خلال قائمة المراسلات الواردة .');
				//	this.spinnerService.stop(spinnerRef);
					this.loading = false;
				} else {
				//	this.spinnerService.stop(spinnerRef);
					this.loading = false;
					this.router.navigate([
						"courriers-entrants/list-courriers-entrants",
					]);
					// upload files to alfresco GED
					if (this.uploadFiles){
						
					}
						this.service.updloadFiles(this.uploadFiles, data)
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
				}
			});
		//});
	}
	// ============================================================
	//
	// ============================================================
	backList() {
		this.router.navigate(["courriers-entrants/list-courriers-entrants"]);
	}
	// ============================================================
	//
	// ============================================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
		this.addFileForm.reset();
		// Swal.fire(
		// 	'Good job!',
		// 	'You clicked the button!',
		// 	'success'
		//   )
	}
	// ============================================================
	// Upload files
	// ============================================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			console.log("file size :: " + event.target.files.length);
			console.log("file name :: " + event.target.files[0].name);
			var file = event.target.files[0].name;
			//console.log("file name SE :: " + file.substr(0, file.lastIndexOf('.')));
			var num = this.addForm.get("numero").value;
			//console.log("Num : " + num + " /" + num.substr(5, num.length))
			var fileName = file.substr(0, file.lastIndexOf('.'));
			if (num.indexOf(fileName) !== -1) {
				this.notification.sendMessage({
					message: 'الملف جاهز للتحميل ... ',
					type: NotificationType.info
				});
			} else {

				this.notification.sendMessage({
					message: 'الملف جاهز للتحميل ... ',
					type: NotificationType.info
				});
		/* 		Swal.fire({
					title: 'انتباه !',
					text: "هذه المراسلة المرفقة لا تحمل الرقم : " + num.substr(5, num.length - 5),
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					cancelButtonText: 'إلغاء',
					confirmButtonText: 'تأكيد'
				}).then((result) => {
					if (result.isConfirmed) {
						this.notification.sendMessage({
							message: 'الملف جاهز للتحميل ... ',
							type: NotificationType.info
						});
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						this.addFileForm.reset();
						this.inputFile.nativeElement.value = '';
					}
				}) */
			}


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
	// ==========================================
	// Auto-Upload multi files to alfresco 
	// ==========================================
	AutoUploadFiles() {
		if (this.uploadFiles)
			this.notification.sendMessage({
				message: 'File size : ' + this.uploadFiles.length,
				type: NotificationType.info
			});


		var idCE: number = 80278;
		//this.service.updloadFilesSC(this.uploadFiles,idCE);

		for (var i = 0; i < this.uploadFiles.length; i++) {
			//console.info("ID_COURRIER :: " + idCE + " & File :: " + this.uploadFiles[i].name);
			this.service.updloadFilesToServer(this.uploadFiles[i], idCE)
				.subscribe(
					(res) => {
						console.info(JSON.stringify(res)),
							this.notification.sendMessage({
								message: 'تمت إضافة المرفقات بنجاح',
								type: NotificationType.info
							})
					},
					(err) => {
						console.log(err),
							this.notification.sendMessage({
								message: 'عملية رفع المرفقات خاطئة',
								type: NotificationType.error
							})
					});

			idCE = idCE + 1;
		}



		//const tabIdCE = [80182, 80183, 80184, 80185, 80186];
		/*
		for (let index = 80182; index <= 80186; index++) {
			const element = index;
			for (let f = 0; f < this.uploadFiles.length; f++) {
				const elementFile = this.uploadFiles[index];
				console.info("ID_COURRIER :: " + element + " & File :: " + elementFile)
			}
		}
		*/
	}

	// spinner dialog
	loadSpinner() {
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

		this.service2.getRessource("/divisions/index").pipe(finalize(() => {
			this.spinnerService.stop(spinnerRef);// stop spinner
		})).subscribe(data => {
			this.divisions = data
		}, err => {
			console.log(err)
		});
	}
}