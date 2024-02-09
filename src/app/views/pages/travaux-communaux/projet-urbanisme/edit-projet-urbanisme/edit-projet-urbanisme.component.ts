import { environment } from './../../../../../../environments/environment';
import {
	Component,
	OnInit,
	ViewChild,
	Output,
	EventEmitter,
	TemplateRef,
	ChangeDetectorRef,
} from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { ProjetUrbanismeService } from "../../../utils/projet-urbanisme.service";
import { OrganisationService } from "../../../organisation/organisation.service";
import { Router } from "@angular/router";
import {
	MatSelect,
	MatSelectChange,
	MatDialogConfig,
	MatDialog,
	MatTableDataSource,
	MatPaginator,
	MatSort,
} from "@angular/material";
import { first, delay } from "rxjs/operators";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { NotificationService } from "../../../shared/notification.service";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { Observable } from 'rxjs';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
	selector: "kt-edit-projet-urbanisme",
	templateUrl: "./edit-projet-urbanisme.component.html",
	styleUrls: ["./edit-projet-urbanisme.component.scss"],
})
export class EditProjetUrbanismeComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	IsForUpdate = false;
	newItem: any = {};
	adrs;
	updatedItem;
	formName: string;
	isLoading = true;
	loading = false;
	submitted = false;
	editForm: FormGroup;
	editAdressageForm: FormGroup;
	adressages: FormArray;
	statuts: any;
	types: any;
	statAdressages: any;
	divisions: any;
	services: any;
	personnels: any;
	selectedList: number;
	sizeData: number = 0;
	files: Observable<any>;
	start: boolean = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	checkLang: string;

	constructor(
		private service: ProjetUrbanismeService,
		private service1: PersonnelService,
		private service2: OrganisationService,
		private router: Router,
		private fb: FormBuilder,
		private _dialog: MatDialog,
		private cd: ChangeDetectorRef,
		private translate: TranslateService,
		private notification: NotificationService,
		private fileUtils: FilesUtilsService,
	) {
		this.checkLang = window.localStorage.getItem("language");
		this.getData();
		this.getAllItems();
	}

	// ====================================
	//
	//=====================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = [
		"numVoix",
		"nomPropose",
		"statutAdressage",
		"actions",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================
	// get data
	// ====================================
	public getRessource() {
		const _this = this;
		let proId = window.localStorage.getItem("proId");
		this.service
			.getObjectById("/projetUrbanisme/adressage/", +proId)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					_this.sizeData = data.length;
					//console.log('data size: '+ _this.sizeData);
					this.dataSource = new MatTableDataSource(data);
					this.isLoading = false;
					this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
					this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
					this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
					this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
					this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
	}
	// ====================================
	//
	//=====================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
	}

	// ====================================
	//
	//=====================================
	onCreate(templateRef: TemplateRef<any>) {
		this.editAdressageForm.reset();
		let proId = window.localStorage.getItem("proId");
		this.editAdressageForm.patchValue({
			projetUrbanisme: this.editForm.value,
		});
		this.formName = "ADD";
		this.IsForUpdate = !this.IsForUpdate;
		let DialogConfig = new MatDialogConfig();
		DialogConfig.disableClose = true;
		this._dialog.open(templateRef, DialogConfig);

		this._dialog.afterAllClosed.subscribe((result) => {
			this.getRessource();
		});
	}
	// ====================================
	//
	//=====================================
	onEdit(row, templateRef: TemplateRef<any>) {
		this.editAdressageForm.reset();
		this.updatedItem = row.id;
		//console.log("id adressage: " + this.updatedItem);
		this.service
			.getObjectById("/adressage/show/", +this.updatedItem)
			.subscribe((data) => {
				//console.log('Liste adressage: ' + JSON.stringify(data,null,4));
				this.editAdressageForm.patchValue({
					id: data.id,
					numVoix: data.numVoix,
					nomPropose: data.nomPropose,
					statutAdressage: data.statutAdressage,
					projetUrbanisme: data.projetUrbanisme,
				});
			});
		this.formName = "EDIT";
		this.IsForUpdate = !this.IsForUpdate;
		let DialogConfig = new MatDialogConfig();
		DialogConfig.disableClose = true;
		//console.log("log dilog : " + row.id);
		this._dialog.open(templateRef, DialogConfig);

		this._dialog.afterAllClosed.subscribe((result) => {
			this.getRessource();
		});
	}
	// ====================================
	//
	//=====================================
	onDelete(id: number) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
				.deleteObjet("/adressage/delete/", id)
				.subscribe(data => {
					this.getRessource();
				});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}

	updateemp() {
		this.IsForUpdate = false;
		let DialogConfig = new MatDialogConfig();
		DialogConfig.disableClose = true;
		//alert("Data Uploaded Successfully!");
		this._dialog.closeAll();
		//console.log("Edit adressage : " + JSON.stringify(this.editAdressageForm.value));
		if (this.formName == "EDIT") {
			this.editAdressages();
		} else if ((this, this.formName == "ADD")) {
			this.addAdressages();
		}
	}

	OnCancel() {
		this.IsForUpdate = false;
		//this.ngOnInit();
		this._dialog.closeAll();

		this.router.navigate(["/projet-urbanisme/edit-projet-urbanisme"]);
	}
	// --------------------------------------------------------------------------------
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<
		MatSelectChange
	>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	// =============================================
	//
	// =============================================
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});
		this.getRessource();
		this.formBuilder();
		const _this = this; // important !!!
		this.editForm.get("divison").valueChanges.subscribe((value) => {
			if (value != 0) {
				// service
				this.service2.getRessourceById(value, "/services/divisions/")
					.subscribe((serv) => {
						_this.services = serv;
						//console.log(data);
					});
				this.service1
					.getRessourceById(value, "/personnels/division/")
					.then(
						(per1) => {
							_this.personnels = per1;
						},
						(error) => console.log(error)
					);

				this.editForm.get("service").valueChanges.subscribe((value1) => {
					if (value1 != 0) {
						this.service1
							.getRessourceById(value1, "/personnels/service/")
							.then(
								(per2) => {
									_this.personnels = per2;
								},
								(error) => console.log(error)
							);
					}
				});
			}
		});
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
		// division
		this.service2.getRessource("/divisions/index").subscribe((data) => {
			this.divisions = data;
			//console.log(data);
		});
		// service
		// this.service2.getRessource("/services/index").subscribe((data) => {
		// 	this.services = data;
		// 	//console.log(data);
		// });
		// personnls
		// this.service1.getRessource().subscribe((data) => {
		// 	this.personnels = data;
		// 	//console.log(data);
		// });
	}

	// ============================================
	// Charger les elements du fourmulaire
	// ============================================
	formBuilder() {
		let proId = window.localStorage.getItem("proId");
		this.editForm = this.fb.group({
			id: [proId],
			dateDemarrageTravaux: [""],
			dateFinTravaux: [""],
			dateReception: [""],
			numProjet: [""],
			objet: ["",Validators.required],
			promotteur: [""],
			budgetProjet: [""],
			nomProjet: [""],
			idMarche: [""],
			divison: [""],
			service: [""],
			responsableReception: [""],
			typeProjetUrbanisme: this.fb.group({
				id: [,Validators.required],
			}),
			statutProjetUrbanisme: this.fb.group({
				id: [,Validators.required],
			}),
		});

		this.service
			.getObjectById("/projetUrbanisme/show/edit/", +proId)
			.subscribe((data) => {
				//console.log('Liste projet : '+ JSON.stringify(data,null,4));
				this.editForm.patchValue({
					dateDemarrageTravaux: new Date(data.dateDemarrageTravaux).toISOString(),
					dateFinTravaux: new Date(data.dateFinTravaux).toISOString(),
					dateReception: new Date(data.dateReception).toISOString(),
					numProjet: data.numProjet,
					objet: data.objet,
					promotteur: data.promotteur,
					budgetProjet: data.budgetProjet,
					responsableReception: data.responsableReception,
					divison: data.divison,
					service: data.service,
					nomProjet: data.nomProjet,
					idMarche: data.idMarche,
					typeProjetUrbanisme: data.typeProjetUrbanisme,
					statutProjetUrbanisme: data.statutProjetUrbanisme,
				});

				//this.adrs = data.adressages;
				//console.log("Liste: "+ JSON.stringify(data,null,4));
			});

		this.fileUtils.fileSizeDetector();

		this.addFileForm = this.fb.group({
			_file: [],
		});
	}

	getAllItems() {
		let proId = window.localStorage.getItem("proId");
		this.editAdressageForm = this.fb.group({
			id: [],
			numVoix: [""],
			nomPropose: [""],
			statutAdressage: this.fb.group({
				id: [],
			}),
			projetUrbanisme: this.fb.group({
				id: [proId],
			}),
		});

		if (!proId) {
			alert("Invalid action.");
			return;
		}

		setTimeout(() => {
			if (proId != null)
				this.files = this.service.getByIdFiles(proId);
			this.start = false;
		}, 1000);



		// this.service
		// 	.getObjectById("/projetUrbanisme/adressage/", +proId)
		// 	.subscribe((data) => {
		// 		//this.adrs = null,
		// 		this.cd.detectChanges();
		// 		this.adrs = data;
		// 		console.log(
		// 			"Adressages details : " + JSON.stringify(this.adrs)
		// 		);
		// 	});
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.editForm.controls;

		if (this.editForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.editIntervention();
	}
	// ============================================
	//
	// ============================================
	editIntervention() {

		if (this.editForm.invalid) {
			return;
		}

		this.service
			.updateObject("/projetUrbanisme/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				(data) => {


					this.loading = true;
					var id = this.editForm.get('id').value;
					console.log("ID : " + id);
					// upload file
					if (this.uploadFiles)
						this.service.updloadFile(this.uploadFiles, id).subscribe(
							(res) =>
								console.log("File inserted " + JSON.stringify(res)),
							(err) =>
								console.log("File not inserted " + JSON.stringify(err))
						);

					this.router.navigate([
						"/projet-urbanisme/list-projet-urbanisme",
					]);

					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_UPDATE_CONFIRMED")
					);
				},
				(error) => {
					alert(error);
				}
			);
	}
	// ============================================
	// Edit items
	// ============================================
	editAdressages() {
		this.submitted = true;
		if (this.editAdressageForm.invalid) {
			return;
		}
		let proId = window.localStorage.getItem("proId");
		this.service
			.updateObject("/adressage/edit/", this.editAdressageForm.value)
			.pipe(first())
			.subscribe(
				(data) => {
					console.log(
						"Updated adressage items successfuly ... ID : " + data
					);
					this.cd.detectChanges();

					this.service
						.getObjectById("/projetUrbanisme/adressage/", +proId)
						.subscribe((res) => {
							this.adrs = null;
							this.adrs = res;
							//console.log("Adressages details : " +JSON.stringify(this.adrs));
							this.adrs.data.push(data);
							this.adrs.data = this.adrs.data.slice();
						});
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
	// Add items
	// ============================================
	addAdressages() {
		this.submitted = true;
		if (this.editAdressageForm.invalid) {
			return;
		}
		this.service
			.createObject("/adressage/new", this.editAdressageForm.value)
			.subscribe(
				(data) => {
					//console.log("Updated items successfuly ... ID : " + data);
					this.cd.detectChanges();
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
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.editForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["/projet-urbanisme/list-projet-urbanisme"]);
	}
	// ============================================
	// Liste des services
	// ============================================
	private getAllServiceByDivision(id: number) {
		this.service2.getRessourceById(id, "/services/divisions/").subscribe(
			(data) => {
				this.services = data;
				//console.log("result service division : " + data);
			},
			(err) => {
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
		//console.log("value changed : " + event.value);
		this.selectedList = event.value;
		this.getAllServiceByDivision(this.selectedList);
	}
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
		this.service1
			.getRessourceById(this.selectedList, "/personnels/service/")
			.then(
				(data) => {
					this.personnels = data;
				},
				(error) => console.log(error)
			);
	}

	// ControlValueAccessor Implementation
	onChange: any = () => { };
	onTouched: any = () => { };

	/** ================================================
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

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.fileUtils.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.fileUtils.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjProjetUrbanisme/" + r);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id: any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			console.log("Delete file ID: " + id);
			this.service
				.deletefiles("/PjProjetUrbanisme/", id)
				.subscribe(data => {
					console.log("File courrier deleted : " + id);
				});
			// Refresh
			let proId = window.localStorage.getItem("proId");
			if (!proId) {
				alert("Invalid action.");
				this.back();
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
				if (proId != null)
					this.files = this.service.getByIdFiles(proId);
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
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}

	dateDemarrageChange() {
		this.editForm.get("dateFinTravaux").reset();
	}
}
