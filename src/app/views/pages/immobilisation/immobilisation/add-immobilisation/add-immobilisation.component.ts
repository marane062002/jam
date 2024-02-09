import { Subscription } from 'rxjs';
import { TranslationService } from './../../../../../core/_base/layout/services/translation.service';
import {
	Component,
	OnInit,
	ViewChild,
	Output,
	EventEmitter,
	OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
	MatSelect,
	MatSelectChange,
	MatDatepickerInputEvent,
} from "@angular/material";
import {
	MatRadioChange,
	MatRadioButton,
} from "@angular/material/radio";
import { Location } from "@angular/common";
import * as $ from "jquery";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { ImmobilisationService } from "../../../utils/immobilisation.service";
import { FilesUtilsService } from '../../../utils/files-utils.service';

interface coleur {
	libelle: string;
}

@Component({
	selector: "kt-add-immobilisation",
	templateUrl: "./add-immobilisation.component.html",
	styleUrls: ["./add-immobilisation.component.scss"],
})
export class AddImmobilisationComponent implements OnInit , OnDestroy {

	private unsubscribe: Subscription[] = [];
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	addForm: FormGroup;
	addFileForm: FormGroup;
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
	selected: number;
	uploadFileForm: FormGroup;
	upform: any;
	public file;
	public uploadFiles: Array<File>;
	now: Date;
	diffTime: number;
	diffDay: number;
	dateSelect: Date;
	dateAquisition : Date;
	selectedFiles: any;
	formData: any;
	x: any;
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
		private router: Router,
		private formBuilder: FormBuilder,
		private location: Location,
		private notification: NotificationService,
		private translate: TranslateService,
		private fileService: FilesUtilsService,
	) {
		this.getData();
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
		this.formBuild();

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});

		this.fileService.fileSizeDetector();

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
	}
	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		console.log('in destroy')
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		console.log(JSON.stringify(this.addForm.value));
		const controls = this.addForm.controls;
		/** check form */
		if (this.addForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.addImmobilisation();
	}

	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}

	// ============================================
	// Fourmulaire
	// ============================================
	formBuild() {
		this.addForm = this.formBuilder.group({
			id: [],
			designation: ["", Validators.required],
			descriptif: [""],
			marque: ["", Validators.required],
			reference: ["", Validators.required],
			couleur: ["", Validators.required],
			longueur: ["", Validators.required],
			largeur: ["", Validators.required],
			poids: ["", Validators.required],
			prixAchat: ["", Validators.required],
			dateReforme: ["", Validators.required],
			sousTypeImmobilisation: ["", Validators.required],
			dureeVie: ["", Validators.required],
			modeAcquisition: ["", Validators.required],
			numBC: [""],
			numMarche: [""],
			emplacement: ["", Validators.required],
			statutImmobilisation: ["", Validators.required],
			dateAcquisition: ["", Validators.required],
		});
	}

	// ============================================
	// Ajouter un immobilisation
	// ============================================
	addImmobilisation() {
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.immoService
			.createObject("/immobilisation/new", this.addForm.value)
			.subscribe(
				(data) => {
					this.router.navigate([
						"immobilisation/list-immobilisation",
					]);

					// upload files to alfresco GED
					if (this.uploadFiles)
						this.immoService
							.updloadFileImmobilisation(this.uploadFiles, data)
							.subscribe(
								(res) => console.log(res),
								(err) => console.log(err)
							);
					this.notification.warn(
						this.translate.instant(
							"PAGES.GENERAL.MSG_SAVED_CONFIRMED"
						)
					);
				},
				(error) => {
					alert(error);
				}
			);
	}

	// ============================================
	// Upload file event
	// ============================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		console.log("test !! : ");

		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			const file = event.target.files[0];
			this.addFileForm.patchValue(this.uploadFiles);
			console.log("OK get");
		}

		/*
		this.folderService.updloadFileCourrierEntrant(this.uploadFiles,1).subscribe(
			res => console.log(res),
			err => console.log(err)
		);
		console.log("sent ...");
			*/
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
	// Date changed
	// ============================================
	dateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
		console.log("touched date");
		this.addForm.get("dureeVie").setValue(this.getDayBetwinTwoDate());
		//this.addForm.get("dureeVie").patchValue(this.getDayBetwinTwoDate());
		/* if (this.addForm.get("dateReforme").touched) {
			console.log("touched date");
			this.getDayBetwinTwoDate();
		} */
	}
	dateAquisitionChange(){
		this.addForm.get("dateReforme").reset();
		this.addForm.get("dureeVie").reset();
	}
	// ============================================
	// OnChange mode d'aquisition -> marche / BC
	// ============================================
	selectionChanged(event: MatRadioChange) {
		console.log("value changed : " + event.value);
		if (event.value == "marche") {
			this.marche = true;
			this.bc = false;
			this.addForm.get("numBC").reset();
			this.addForm.get("numMarche").setValidators(Validators.required);
			this.addForm.get("numBC").setValidators(null);
		} else {
			this.marche = false;
			this.bc = true;
			this.addForm.get("numMarche").reset();

			this.addForm.get("numBC").setValidators(Validators.required);
			this.addForm.get("numMarche").setValidators(null);
		}
		this.addForm.get('numBC').updateValueAndValidity();
		this.addForm.get('numMarche').updateValueAndValidity();
	}

	// test radio button
	onChangeVal(mrChange: MatRadioChange) {
		console.log("change value" + mrChange.value);
		let mrButton: MatRadioButton = mrChange.source;
		console.log(mrButton.name);
		console.log(mrButton.checked);
		console.log(mrButton.inputId);
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
	// Liste des sous types
	// ============================================
	private getAllSousTypeByType(type: any) {
		this.immoService
			.getAllObjectListById("/typeImmobilisation/sousType/", type)
			.subscribe(
				(data) => {
					this.sousTypes = data;
				},
				(err) => {
					console.log(err);
				}
			);
	}
	// ============================================
	// Calcul days betwin two dates
	// ============================================
	getDayBetwinTwoDate() {
		this.dateAquisition = this.addForm.get('dateAcquisition').value;
		if(this.dateAquisition != null){
		this.dateSelect = this.addForm.get("dateReforme").value;
		this.diffTime = Math.round(this.dateSelect.getTime() - this.dateAquisition.getTime());
		this.diffDay = Math.round(this.diffTime / (1000 * 3600 * 24));
		console.log("Diffirence entre deux date by time " + this.diffTime);
		console.log("Diffirence entre deux date by day " + this.diffDay);
	}
		return this.diffDay + 1;
	}
	// ============================================
	// Checking control validation
	// ============================================
	/**
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
}
