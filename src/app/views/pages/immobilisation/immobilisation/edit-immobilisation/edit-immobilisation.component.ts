import { ImmobilisationService } from "./../../../utils/immobilisation.service";
import {
	Component,
	OnInit,
	ViewChild,
	Output,
	EventEmitter,
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
	MatSelect,
	MatSelectChange,
	MatDatepickerInputEvent,
} from "@angular/material";
import {
	MatRadioModule,
	MatRadioChange,
	MatRadioButton,
} from "@angular/material/radio";
import { Location } from "@angular/common";
import { first } from "rxjs/operators";
import * as $ from "jquery";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { Observable } from 'rxjs';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { environment } from './../../../../../../environments/environment';

interface coleur {
	libelle: string;
}

@Component({
	selector: "kt-edit-immobilisation",
	templateUrl: "./edit-immobilisation.component.html",
	styleUrls: ["./edit-immobilisation.component.scss"],
})
export class EditImmobilisationComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	editForm: FormGroup;
	submitted = false;
	emplacements: any;
	statuts: any;
	types: any;
	motifs: any;
	marques: any;
	sousTypes: any;
	marche: boolean;
	bc: boolean;
	selectedList: string;
	now: Date;
	diffTime: number;
	diffDay: number;
	dateSelect: Date;
	selected: number;
	selectedOption: string;

	// file varriable
	files : Observable<any>;
	start:boolean=true;
	isFile:boolean=false;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	dateAquisition : Date;
	// liste des coleurs
	colors: coleur[];

	// Select change paramettre
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<
		MatSelectChange
	>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() change: EventEmitter<MatRadioChange>;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private immoService: ImmobilisationService,
		private fileService: FilesUtilsService,
		private router: Router,
		private formBuilder: FormBuilder,
		private location: Location,
		private notification: NotificationService,
		private translate: TranslateService
	) {
		// get all files by id
		let immoId = window.localStorage.getItem("editImmobilisationId");
		this.formBuild();
		if (!immoId) {
			this.router.navigate(["immobilisation"]);
			return;
		}
		setTimeout(() => {
			if (immoId!=null)
				this.files = this.immoService.getByIdImmobilisationFiles(immoId);
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.fileService.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.fileService.getExtensionFile(file);
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
	//
	// ============================================================
	resetFileField(){
		this.addFileForm.get("_file").setValue("");
	}
	// ============================================================
	// download file
	// ============================================================
	onClickPjName(e,id) {
		console.log('You clicked: '+e) ;
		var r=e.substring(0,e.length-4);
		console.log(environment.API_ALFRESCO_URL+'/PjImmobilisation/'+r)
		window.open(environment.API_ALFRESCO_URL+'/PjImmobilisation/'+r);
	  }
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.immoService.getData().subscribe(
			(data) => {
				this.statuts = data[0];
				this.types = data[1];
				this.emplacements = data[2];
				this.motifs = data[3];
				this.marques = data[4];
				this.sousTypes = data[5];
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================
	// OnInit
	// ============================================
	ngOnInit() {

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});

		// liste des coleurs
		this.colors = [
			{ libelle: "أحمر" },
			{ libelle: "أخضر" },
			{ libelle: "أزرق" },
			{ libelle: "برتقالي" },
			{ libelle: "أسود" },
			{ libelle: "أبيض" },
			{ libelle: "لون آخر" },
			];

		this.translate.onLangChange.subscribe((event: LangChangeEvent) =>
		{
			if(event.lang == 'ar')
			{
				// liste des coleurs
				this.colors = [
				{ libelle: "أحمر" },
				{ libelle: "أخضر" },
				{ libelle: "أزرق" },
				{ libelle: "برتقالي" },
				{ libelle: "أسود" },
				{ libelle: "أبيض" },
				{ libelle: "لون آخر" },
				];
			}
			else if(event.lang == 'fr')
			{
				// liste des coleurs
				this.colors = [
					{ libelle: "Rouge" },
					{ libelle: "Vert" },
					{ libelle: "Bleu" },
					{ libelle: "Orange" },
					{ libelle: "Noire" },
					{ libelle: "Blanc" },
					{ libelle: "Autre" },
					];
			}
		});

		this.fileService.fileSizeDetector();

		this.getData();

		let immoId = window.localStorage.getItem("editImmobilisationId");
		this.formBuild();
		if (!immoId) {
			this.router.navigate(["immobilisation/List-immobilisation"]);
			return;
		}
		this.immoService
			.getObjectById("/immobilisation/show/", +immoId)
			.subscribe((data) => {
				this.editForm.patchValue(data);
			});
		document.getElementById("marche").style.display = "none";
		document.getElementById("bc").style.display = "none";
		//this.selectionModeChanged();

		this.editForm.get("modeAcquisition").valueChanges.subscribe((value) => {
			if (value != 0) {
				console.log("Mode acquisition: " + value);
					if (value == "bc") {
						document.getElementById("marche").style.display ="none";
						document.getElementById("bc").style.display = "inline";

						this.editForm.get('numBC').setValidators(Validators.required);
						this.editForm.get('numMarche').setValidators(null);
					} else {
						document.getElementById("marche").style.display ="inline";
						document.getElementById("bc").style.display = "none";

						this.editForm.get('numMarche').setValidators(Validators.required);
						this.editForm.get('numBC').setValidators(null);
					}
					this.editForm.get('numBC').updateValueAndValidity();
					this.editForm.get('numMarche').updateValueAndValidity();
			}
		});
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id:any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
		console.log("Delete file ID: " + id);
		this.immoService
			.deletefiles("/PjImmobilisation/", id)
			.subscribe(data => {
				console.log("File courrier deleted : " + id);
			});

		// reset object
		this.files = null;
		// start progress bar
		this.start = true;

		// Notification
		this.notification.warn(
			this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
		);

		let idImmo = this.editForm.get('id').value;
		setTimeout(() => {
			if (idImmo!=null)
				this.files = this.immoService.getByIdImmobilisationFiles(idImmo);
			this.start = false;
		}, 1000);
		}
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		console.log("Resultat: " + JSON.stringify(this.editForm.value));
		const controls = this.editForm.controls;
		if (this.editForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.immoService
			.updateObject("/immobilisation/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					this.loading = true;
					var id = this.editForm.get('id').value;
					console.log("ID courrier: " + id);
					// upload file
					if (this.uploadFiles)
						this.immoService.updloadFileImmobilisation(this.uploadFiles, id).subscribe(
					(res) =>
						console.log("File inserted " + JSON.stringify(res)),
					(err) =>
						console.log("File not inserted " + JSON.stringify(err))
					);

					this.router.navigate([
						"immobilisation/list-immobilisation",
					]);
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
	// ============================================
	// Fourmulaire
	// ============================================
	formBuild() {
		this.editForm = this.formBuilder.group({
			id: [],
			designation: ["", Validators.required],
			descriptif: [""],
			marque: [""],
			reference: ["", Validators.required],
			couleur: ["", Validators.required],
			longueur: ["", Validators.required],
			largeur: ["", Validators.required],
			poids: ["", Validators.required],
			prixAchat: ["", Validators.required],
			dateReforme: ["", Validators.required],
			//sousType: ["", Validators.required],
			dureeVie: ["", Validators.required],
			modeAcquisition: ["", Validators.required],
			numBC: [""],
			numMarche: [""],
			emplacement: this.formBuilder.group({
				id: [],
			}),
			sousTypeImmobilisation: this.formBuilder.group({
				id: [],
				typeImmobilisation: this.formBuilder.group({
					id: [],
				}),
			}),
			statutImmobilisation: this.formBuilder.group({
				id: [],
			}),
			dateAcquisition: ["", Validators.required],
		});
	}
	dateAquisitionChange(){
		this.editForm.get("dateReforme").reset();
		this.editForm.get("dureeVie").reset();
	}
	// ============================================
	// Ajouter un immobilisation
	// ============================================
	editImmobilisation() {
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}

		console.log("Resultat: " + JSON.stringify(this.editForm.value));

		this.immoService
			.updateObject("/immobilisation/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					console.log(
						"saved: " + JSON.stringify(this.editForm.value)
					);
					this.router.navigate([
						"immobilisation/list-immobilisation",
					]);
					this.notification.warn(
						this.translate.instant(
							"PAGES.GENERAL.MSG_UPDATE_CONFIRMED"
						)
					);
					console.log("Updated successfuly ... ID : " + data);
				},
				(error) => {
					alert(error);
				}
			);
	}
	// ============================================
	// Liste des sous types by type
	// ============================================
	private getAllSousTypeByType(id: number) {
		this.immoService
			.getAllObjectListById("/typeImmobilisation/sousType/", id)
			.subscribe(
				(data) => {
					this.sousTypes = data;
					console.log("result sous type immobilisation : " + id);
				},
				(err) => {
					console.log(err);
				}
			);
	}

	// ============================================
	// Select changed type
	// ============================================
	selectionTypeChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		console.log("value changed : " + event.value);
		this.selected = event.value;
		console.log("touched type");
		this.getAllSousTypeByType(this.selected);
	}
	// ============================================
	// OnChange mode d'aquisition -> marche / BC
	// ============================================
	selectionModeChanged() {
		const modeAcquisition = this.editForm.get("modeAcquisition").value;
		//console.log("Mode acquisition: " + modeAcquisition);
		if (modeAcquisition != "") {
			if (modeAcquisition == "bc") {
				this.editForm.get("numMarche").reset();
				document.getElementById("marche").style.display = "none";
				document.getElementById("bc").style.display = "inline";
				//console.log("Modebc: " + modeAcquisition);
				this.editForm.get("numBC").setValidators(Validators.required);
				this.editForm.get("numMarche").setValidators(null);
			} else {
				this.editForm.get("numBC").reset();
				document.getElementById("marche").style.display = "inline";
				document.getElementById("bc").style.display = "none";
				//console.log("Mode marche: " + modeAcquisition);
				this.editForm.get("numMarche").setValidators(Validators.required);
				this.editForm.get("numBC").setValidators(null);
			}
			this.editForm.get('numBC').updateValueAndValidity();
			this.editForm.get('numMarche').updateValueAndValidity();
		}
	}

	// ControlValueAccessor Implementation
	onChange: any = () => {};
	onTouched: any = () => {};
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================
	// Date changed
	// ============================================
	dateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
		//console.log("touched date");
		this.editForm.get("dureeVie").setValue(this.getDayBetwinTwoDate());
	}
	// ============================================
	// Calcul days betwin two dates
	// ============================================
	getDayBetwinTwoDate() {
		this.dateAquisition = this.editForm.get('dateAcquisition').value;
		if(this.dateAquisition != null){
		this.dateSelect = this.editForm.get("dateReforme").value;
		this.diffTime = Math.round(this.dateSelect.getTime() - this.dateAquisition.getTime());
		this.diffDay = Math.round(this.diffTime / (1000 * 3600 * 24));
		console.log("Diffirence entre deux date by time " + this.diffTime);
		console.log("Diffirence entre deux date by day " + this.diffDay);
		}
		return this.diffDay;
	}
	// ============================================
	// Checking control validation
	// ============================================
	/**
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
}
