import { FilesUtilsService } from './../../../utils/files-utils.service';
import { PersonnelService } from './../../../rh/services/personnel.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import * as $ from "jquery";
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProjetUrbanismeService } from '../../../utils/projet-urbanisme.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { Router } from '@angular/router';
import { MatSelectChange, MatSelect } from '@angular/material';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
	selector: 'kt-add-projet-urbanisme',
	templateUrl: './add-projet-urbanisme.component.html',
	styleUrls: ['./add-projet-urbanisme.component.scss']
})
export class AddProjetUrbanismeComponent implements OnInit {

	// ============================================
	// Declarations
	// ============================================
	loading = false;
	submitted = false;
	addForm: FormGroup;
	addFileForm: FormGroup;
	adressages: FormArray;
	statuts: any;
	types: any;
	statAdressages: any;
	divisions: any;
	services: any;
	personnels: any;
	selectedList: number;
	checkLang: string;
	public uploadFiles: Array<File>;
	constructor(
		private service: ProjetUrbanismeService,
		private service1: PersonnelService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private notification: NotificationService,
		private translate: TranslateService,
		private fileUtil: FilesUtilsService,
	) {
		this.checkLang = window.localStorage.getItem("language");

		this.getData();
	}
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

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
		
		this.fileUtil.fileSizeDetector();
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.types = data[0];
				this.statuts = data[1];
				this.statAdressages = data[2];
				//console.log(data[0]);
			},
			(err) => {
				console.log(err);
			}
		);
		this.service2.getRessource("/divisions/index").subscribe((data) => {
			(this.divisions = data);
		});
	}

	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		this.addForm = this.fb.group({
			dateDemarrageTravaux: [""],
			dateFinTravaux: [""],
			dateReception: [""],
			numProjet: [""],
			objet: ["", Validators.required],
			promotteur: [""],
			budgetProjet: [""],
			responsableReception: [""],
			divison: [""],
			service: [""],
			nomProjet: [""],
			idMarche: [""],
			typeProjetUrbanisme: ["", Validators.required],
			statutProjetUrbanisme: ["", Validators.required],
			adressages: this.fb.array([])
		});
	}

	createItem() {
		return this.fb.group({
			numVoix: [''],
			nomPropose: [''],
			statutAdressage: ['']
		});
	}


	get formData() { return <FormArray>this.addForm.get('adressages'); }

	addGroup() {
		this.adressages = this.addForm.get('adressages') as FormArray;
		this.adressages.push(this.createItem());
	}

	removeGroup(i: number) {
		this.adressages = this.addForm.get('adressages') as FormArray;
		this.adressages.removeAt(i);
	}
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
		// this.loading = true;
		//console.log(JSON.stringify(this.addForm.value));
		//alert(JSON.stringify(this.addForm.value));
		this.addIntervention();
	}
	// ============================================
	// Ajouter une association
	// ============================================
	addIntervention() {
		//console.log(JSON.stringify(this.addForm.value));
		this.submitted = true;
		if (this.addForm.invalid) {
			return;
		}
		this.service
			.createObject("/projetUrbanisme/new", this.addForm.value)
			.subscribe(
				(data) => {
					this.router.navigate([
						"/projet-urbanisme/list-projet-urbanisme",
					]);

					// upload files to alfresco GED
					this.service.updloadFile(this.uploadFiles, data).subscribe(
						(res) => console.log(res),
						(err) => console.log(err)
					);
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
					);
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
		this.addForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["/projet-urbanisme/list-projet-urbanisme"]);
	}
	// ============================================
	// Upload file event
	// ============================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}
	// ============================================
	// Liste des services
	// ============================================
	private getAllServiceByDivision(id: number) {
		this.service2.getRessourceById(id, "/services/divisions/").subscribe(
			data => {
				this.services = data;
				//console.log("result service division : "+ data)
			},
			err => {
				console.log(err);
			}
		);
	}
	// ============================================
	// Select changed
	// ============================================
	selectionChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		//console.log("value changed : "+ event.value);
		this.selectedList = event.value;
		this.getAllServiceByDivision(this.selectedList);
	}

	// ControlValueAccessor Implementation
	onChange: any = () => { };
	onTouched: any = () => { };

	// ========================================
	//
	// ========================================
	onChangeService(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		//console.log("value changed : "+ event.value);
		this.selectedList = event.value;
		this.service1.getRessourceById(this.selectedList, '/personnels/service/').then(data => { this.personnels = data },
			error => console.log(error)
		);
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
	dateDemarrageChange() {
		this.addForm.get("dateFinTravaux").reset();
	}
}
