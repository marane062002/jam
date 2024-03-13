import {
	Component,
	OnInit,
	EventEmitter,
	Output,
	ViewChild,
	ElementRef,
	Input,
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
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ImageScan } from "../scanned-image/image-scan";
import { ImageTypes } from "../scanned-image/image-types";
import { ScannedImageComponent } from "../scanned-image/scanned-image.component";
import { MatDialog } from "@angular/material";
import { AfficheComponent } from "../affiche/affiche.component";
import jsPDF from "jspdf";
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
	loading1= false;
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
	pjForm: FormGroup = this.formBuilder.group({
		fileName: [""],
		fileInput: ["", Validators.required],
	});
	fond: string;

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
		private spinnerService: SpinnerService,
		private sanitizer: DomSanitizer

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
						  
						  this.loading1 = false
						//   this.convertToPdf()
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
	startScan(): void {
		try {this.removeScannedImage();
			if(this.ws.readyState == WebSocket.OPEN){
				this.showImageCropper = false;
				this.removeScannedImage();
				this.ws.send("1100");
				this.startScanning = true;
				this.loading1 = true
				
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
	convertToPdf() {
        if (this.base64Img) {
          const pdf = new jsPDF();
          pdf.addImage(this.base64Img, 'JPEG', 10, 10, 180, 180);
          pdf.save(this.base64Img);
        }
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
	// getDone(): void {
	// 	if(this.enableImageCropper && this.showImageCropper){
	// 		if(this.imageCropper){
	// 			this.base64Img = this.imageCropper.getCroppedImageAsBase64();
	// 			this.onSaveScannedImage.emit(this.base64Img);
	// 		}
	// 	}
	// 	else{
	// 		this.onSaveScannedImage.emit( this.sanitizer.bypassSecurityTrustUrl(this.base64Img + ""));
	// 	}
	// }
	compressImage(src, newX, newY) {
		return new Promise((res, rej) => {
		  const img = new Image();
		  img.src = src;
		  img.onload = () => {
			const elem = document.createElement('canvas');
			elem.width = newX;
			elem.height = newY;
			const ctx = elem.getContext('2d');
			ctx.drawImage(img, 0, 0, newX, newY);
			const data = ctx.canvas.toDataURL();
			res(data);
		  }
		  img.onerror = error => rej(error);
		})
	  }
	removeScannedImage(): void {
		this.base64Img = "";
		this.scannedImageUrl = "";
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
		this.connectToSocket();

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
			fileName: [],
		});

		this.service.fileSizeDetector();
	}
	
	ngAfterViewInit(): void {
	}

	ngOnDestroy(): void {
		this.closeWebSocketConnection();
	}
	private closeWebSocketConnection(): void {
		this.reconnecteOnWSClose = false;

		if(this.ws.OPEN){
			setTimeout(() => {
				this.ws.close();
			}, this.wsReconnectDuration);
		}
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

					if(this.tableScane.length >0){

						for(let j=0;j<this.tableScane.length ; j++){
							this.service.uploadSejoursScan(this.tableScane[j],data).subscribe(
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
							this.service.updloadFiles(this.tableuPdf[i].file,  data).subscribe(
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
				}}
			});
		//});
	}
	Association(): void {
		Swal.fire({
			position: "center",
			icon: "success",
			title: "Enregistre Succes",
			showConfirmButton: false,
			timer: 1500,
		});
		this.router.navigate(["courriers-entrants/list-courriers-entrants"]);
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