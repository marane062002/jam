import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
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
import { ImageScan } from "../../courriers-entrants/scanned-image/image-scan";
import { SafeUrl } from "@angular/platform-browser";
import { ImageTypes } from "../../courriers-entrants/scanned-image/image-types";
import { ScannedImageComponent } from "../../courriers-entrants/scanned-image/scanned-image.component";
import { MatDialog } from "@angular/material";
import { AfficheComponent } from "../../courriers-entrants/affiche/affiche.component";
import Swal from "sweetalert2";
export interface Pdf {
	file: File;
	fileName: string;
}
export class Scan {
	file: string;
	fileName: string;
}

export class PdfClass implements Pdf {
	file: File;
	fileName: string;

	constructor(file: File, fileName: string) {
		this.file = file;
		this.fileName = fileName;
	}
}

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
	selectedList: string;

	refuser: boolean = false;

	@Output() onSaveScannedImage = new EventEmitter<any>();
	@Input() width: Number = 200;

	@Input() wsServerPort: number = 61024;
	imageScan : ImageScan;
	private wsUrl: string = `ws://localhost:${this.wsServerPort}`;

	base64Img: any = "";
	scannedImageUrl: SafeUrl = "";
	private ws: WebSocket = null;
	startScanning: boolean;

	private reconnecteOnWSClose: boolean = true;
	private wsReconnectDuration: number = 100;
	isConnectedToScanner: boolean = false;
	@Output() onScannerConnectionStateChange = new EventEmitter<boolean>(false);

	errorMessage: String = "";

	@Input() enableImageCropper: boolean = false;
	cropperImageType: ImageTypes = ImageTypes.JPEG;
	showImageCropper: boolean = false;
	// @ViewChild('imageCropperC') imageCropper: ImageCropperComponent;
		@ViewChild("imageCropperC", { static: false }) imageCropper : ScannedImageComponent;
		tableScane:any =[]
		tableuPdf: any = [];
		pjForm: FormGroup = this.formBuilder.group({
			fileName: [""],
			fileInput: ["", Validators.required],
		});
		fond: string;

	// ============================================================
	//
	// ============================================================
	constructor(
		public dialog: MatDialog,

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
		this.connectToSocket();

		//document.getElementById("num").style.display = "inline";
		this.selectedList = "out";

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
			typeOrigine: ["", Validators.required],

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
	private  connectToSocket = (): void => {
		try {
			this.ws = null;
			if(!this.ws){
				try {
					this.ws = new WebSocket(this.wsUrl);
				} catch (error) {
					
				}
				
				this.ws.onopen = (e) => {
					this.changeScannerConnectionState(true);
					this.errorMessage = '';
				}
				
				this.ws.onerror = (e) => {
					this.errorMessage = "Lancez l'application middleware du scanner";
					this.ws.close();
				}
				
				this.ws.onmessage = (e) => {
					if (e.data instanceof Blob) {
						var reader = new FileReader();
						reader.readAsDataURL(e.data);
						reader.onloadend = () => {
							this.base64Img = reader.result;
							if (this.base64Img != null) {
								this.imageScan = {
									imageBase64: this.base64Img
								}
								
							}
							// this.gestionDocumentService.Add("detect-face",this.imageScan).subscribe(res=>{
							// 	let f = res.body as ImageScan;
							// 	this.base64Img = f.imageBase64;
							// 	this.scannedImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.base64Img + "");
							// 	if(this.enableImageCropper){
							// 		this.showImageCropper = true;
							// 	}
							// 	this.startScanning = false;

							// },  (error) => {
							// 	let errorMessage;
							// 	if (error.status === 500 || error.status === 404) {
							// 	  errorMessage = 'Une erreur est survenue, merci de réessayer plus tard';
							// 	} else if (error.error && error.error.message) {
							// 	  errorMessage = error.error.message;
							// 	}

							// 	this.messageService.add({
							// 	  severity: 'error',
							// 	  summary: errorMessage,
							// 	  life: 5000
							// 	});
							//   });
							
							this.tableScane.push({file: this.base64Img,
								fileName: this.addFileForm.value.fileName})
						  console.log(this.tableScane)
						  
						}
					}
					// else{
					//     let msg = JSON.parse(e.data);
					// }
				};
				this.ws.onclose = (e) => {
					this.changeScannerConnectionState(false);
					if(this.reconnecteOnWSClose){
						setTimeout(() => {
							this.connectToSocket();
						}, this.wsReconnectDuration);
					}
				}
			}
		} catch (error) {
			setTimeout(() => {
				this.connectToSocket();
			}, this.wsReconnectDuration);
		}
	}


	private changeScannerConnectionState(state: boolean): void {
		this.isConnectedToScanner = state;
		this.onScannerConnectionStateChange.emit(this.isConnectedToScanner);
	}
	removeScannedImage(): void {
		this.base64Img = "";
		this.scannedImageUrl = "";
	}
	startScan(): void {
		try {this.removeScannedImage();
			if(this.ws.readyState == WebSocket.OPEN){
				this.showImageCropper = false;
				this.removeScannedImage();
				this.ws.send("1100");
				this.startScanning = true;
				
			}
		} catch (error) {
			
			// this.errorMessage = "Allumez votre scanner";
		}
	}
	
	  
	pdf() {
		let pdf = new PdfClass(this.file, this.pjForm.value.fileName);
		this.tableuPdf.push(pdf);
		console.log(this.tableuPdf)
		console.log(this.file)

		this.pjForm.value.file = "";
		this.pjForm.value.fileName = "";
	}
	supimerPdf(index) {
		this.tableuPdf.splice(index, 1);
	}
	
	constration(row:any): void {
		const dialogRef = this.dialog.open(AfficheComponent, {
			width: "75%",
			data : { Data: row.file },
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			this.fond = result;
		});
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
				// if (this.uploadFiles)
				// 	this.service.updloadFiles2(this.uploadFiles, data)
				// 		.subscribe(
				// 			(res) =>
				// 				this.notification.sendMessage({
				// 					message: 'تمت إضافة المرفقات بنجاح',
				// 					type: NotificationType.info
				// 				}),
				// 			(err) =>
				// 				this.notification.sendMessage({
				// 					message: 'عملية رفع المرفقات خاطئة',
				// 					type: NotificationType.error
				// 				}),
				// 		);
				// this.notification.sendMessage({
				// 	message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
				// 	type: NotificationType.success
				// });

				// let pId = window.localStorage.getItem("pId");
				// if (!pId) {
				// 	this.router.navigate(["courriers-sortants/list-courriers-sortants"]);
				// } else {
				// 	this.location.back();
				// }
				// window.localStorage.removeItem("pId");
				if(this.tableScane.length >0){

					for(let j=0;j<this.tableScane.length ; j++){
						this.service.uploadSejoursScanCS(this.tableScane[j],data).subscribe(
							(res)=>{
								this.notification.sendMessage({
									message: 'تمت إضافة المرفقات بنجاح',
									type: NotificationType.info
								}),
								this.router.navigate(["courriers-sortants/list-courriers-sortants"]);

								console.log(res)
							},(err)=>{
								this.notification.sendMessage({
									message: 'عملية رفع المرفقات خاطئة',
									type: NotificationType.error
								}),
								
								console.log(err)
							}
						)


					}



				}
				if (this.tableuPdf.length > 0) {
					for (let i = 0; i < this.tableuPdf.length; i++) {
						this.service.updloadFiles2(this.tableuPdf[i].file,  data).subscribe(
							(res) => {
								console.log(res);
								this.Association();
							},
							(error) => {
								console.log(error);
								this.Association();
							}
						);
					}
				// // upload files to alfresco GED
				// if (this.uploadFiles){
					
				// }
				// 	this.service.updloadFiles(this.uploadFiles, data)
				// 		.subscribe(
				// 			(res) =>
				// 				this.notification.sendMessage({
				// 					message: 'تمت إضافة المرفقات بنجاح',
				// 					type: NotificationType.info
				// 				}),
				// 			(err) =>
				// 				this.notification.sendMessage({
				// 					message: 'عملية رفع المرفقات خاطئة',
				// 					type: NotificationType.error
				// 				}),
				// 		);
				this.notification.sendMessage({
					message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
					type: NotificationType.success
				});
			}
			},err=>{
				this.loading = false;
			});

		//});
	}
	selectedFileName?: string;
	pjExist: Boolean;
	handleFile(e?: any) {
		this.file = undefined;
		this.file = e.target.files[0];
		e.target.value = "";
		this.selectedFileName = this.file.name;

		this.pjExist = true;
		this.uploadFiles = e.target.files;
		if (e.target.files.length > 0) {
			console.log("file size :: " + e.target.files.length);
			console.log("file name :: " + e.target.files[0].name);
			var file = e.target.files[0].name;
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
	Association(): void {
		Swal.fire({
			position: "center",
			icon: "success",
			title: "Enregistre Succes",
			showConfirmButton: false,
			timer: 1500,
		});
		this.router.navigate(["courriers-sortants/list-courriers-sortants"]);
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
