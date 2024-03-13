import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
import { ImageScan } from "../../courriers-entrants/scanned-image/image-scan";
import { SafeUrl } from "@angular/platform-browser";
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
	pjForm: FormGroup = this.formBuilder.group({
		fileName: [""],
		fileInput: ["", Validators.required],
	});
	public file;
	selectedFileName?: string;
	pjExist: Boolean;
	@Output() onSaveScannedImage = new EventEmitter<any>();
	@Input() width: Number = 200;

	@Input() wsServerPort: number = 61024;
	imageScan : ImageScan;
	private wsUrl: string = `ws://localhost:${this.wsServerPort}`;

	base64Img: any = "";
	scannedImageUrl: SafeUrl = "";
	private ws: WebSocket = null;
	startScanning: boolean;
	showImageCropper: boolean = false;
	tableScane:any =[]
	tableuPdf: any = [];
	isConnectedToScanner: boolean = false;
	@Output() onScannerConnectionStateChange = new EventEmitter<boolean>(false);
	errorMessage: String = "";
	private reconnecteOnWSClose: boolean = true;
	private wsReconnectDuration: number = 100;
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
				this.editForm.controls['typeOrigine'].patchValue(data.typeOrigine);

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
			typeOrigine: [""],

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
	pdf() {
		let pdf = new PdfClass(this.file, this.pjForm.value.fileName);
		this.tableuPdf.push(pdf);
		console.log(this.tableuPdf)
		console.log(this.file)

		this.pjForm.value.file = "";
		this.pjForm.value.fileName = "";
	}
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
			var num = this.editForm.get("numero").value;
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
				this.files
				this.tableScane
				this.tableuPdf
			

			}
		} catch (error) {
			// this.errorMessage = "Allumez votre scanner";
		}
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
		this.connectToSocket();

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
					if(this.tableScane.length >0){

						for(let j=0;j<this.tableScane.length ; j++){
							this.service.uploadSejoursScanCS(this.tableScane[j],id).subscribe(
								(res)=>{
									this.notification.sendMessage({
										message: 'تمت إضافة المرفقات بنجاح',
										type: NotificationType.info
									}),
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
							this.service.updloadFiles2(this.tableuPdf[i].file,  id).subscribe(
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
					// upload file
					// if (this.uploadFiles)
					// 	this.service.updloadFiles2(this.uploadFiles, id)
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


					// this.router.navigate([
					// 	"courriers-sortants/list-courriers-sortants",
					// ]);
					// this.notification.sendMessage({
					// 	message: this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED"),
					// 	type: NotificationType.success
					// });
				},
				(error) => {
					alert(error);
				}
			);
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
}
