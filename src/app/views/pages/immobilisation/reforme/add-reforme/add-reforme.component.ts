import { ImmobilisationService } from './../../../utils/immobilisation.service';
import {
	Component,
	OnInit,
	ViewChild,
	EventEmitter,
	Output
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
	MatSelect,
	MatSelectChange,
	MatTableDataSource,
	MatPaginator,
	MatSort
} from "@angular/material";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs/operators';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
	selector: "kt-add-reforme",
	templateUrl: "./add-reforme.component.html",
	styleUrls: ["./add-reforme.component.scss"]
})
export class AddReformeComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	addForm: FormGroup;
	submitted = true;
	typeImmobilisation: any;
	motifs: any;
	sousTypes: any;
	selected: number;
	filterSelect: string;
	// Select change paramettre
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<
		MatSelectChange
	>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"reference",
		"typeImmobilisation",
		"sousType",
		"designation",
		//"emplacement",
		//"modeAcquisition",
		//"marque",
		//"prixAchat",
		"dateReformeFinal",
		"dureeVie",
		"actions"
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = false;
	constructor(
		private immoService: ImmobilisationService,
		private router: Router,
		private formBuilder: FormBuilder,
		private location: Location,
		private notification: NotificationService,
		private translate: TranslateService,
		private fileUtils:FilesUtilsService
	) {
		//this.getImmobilisation();
	}
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// OnInit
	// ============================================
	ngOnInit() {

		this.dataSource.filterPredicate = function(
			data,
			filter: string
		): boolean {
			return (
				data.reference.toLowerCase().includes(filter) ||
				data.typeImmobilisation.toLowerCase().includes(filter)||
				data.sousType.toLowerCase().includes(filter)
			);
		};

		this.getAllMotifs();

		this.getAllTypeImmobilisation();

		this.formBuild();

		//this.getImmobilisation();

		this.addForm.get('sousType').disable();
	}
	// ============================================
	// Filter de recherche
	// ============================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	applyFilter2(event: MatSelectChange) {

		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		console.log("value changed : " + event.value);
		this.filterSelect = event.value;

		console.log("***** Filter ****** :" + this.filterSelect);
		this.filterSelect = this.filterSelect.trim();
		this.filterSelect = this.filterSelect.toLowerCase();
		this.dataSource.filter = this.filterSelect;
	}
	// ============================================
	// Recuperer tous les immobilisation
	// ============================================
	private getImmobilisation() {
		this.immoService
			.getAllObject("/immobilisation/index")
			.pipe(delay(500))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.paginator._intl.itemsPerPageLabel = this.translate.instant(
						"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
					);
					this.paginator._intl.nextPageLabel = this.translate.instant(
						"PAGES.GENERAL.NEXT_PAGE_LABEL"
					);
					this.paginator._intl.previousPageLabel = this.translate.instant(
						"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
					);
					this.paginator._intl.lastPageLabel = this.translate.instant(
						"PAGES.GENERAL.LAST_PAGE_LABEL"
					);
					this.paginator._intl.firstPageLabel = this.translate.instant(
						"PAGES.GENERAL.FIRST_PAGE_LABEL"
					);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
	}
	// ============================================
	// OnReset
	// ============================================
	onReset() {
		//this.getImmobilisation();
		this.submitted = false;
		this.addForm.reset();
		this.addForm.get('sousType').setValue(null);
		this.addForm.get('sousType').disable();
		this.dataSource.data = [];
	}
	// ============================================
	// Fourmulaire
	// ============================================
	formBuild() {
		this.addForm = this.formBuilder.group({
			reference:[""],
			sousType: [""],
			typeImmobilisation: [""],
		});
	}
	// ============================================
	// Methode reforme immobilisation
	// ============================================
	reformeImmobilisation(immo: any): void {
		window.localStorage.removeItem("immobilisation-showId");
		window.localStorage.setItem(
			"immobilisation-showId",
			immo.id.toString()
		);
		this.router.navigate(["immobilisation/add-to-reforme"]);
	}
	// ============================================
	// Liste des type immobilisation
	// ============================================
	private getAllTypeImmobilisation() {
		this.immoService.getAllObject("/typeImmobilisation/index").subscribe(
			data => {
				this.typeImmobilisation = data;
			},
			err => {
				console.log(err);
			}
		);
	}

	// ============================================
	// Liste des motifs
	// ============================================
	private getAllMotifs() {
		this.immoService.getAllObject("/motifReforme/index").subscribe(
			data => {
				this.motifs = data;
			},
			err => {
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
		this.selected = event.value.id;
		this.getAllImmobilisationByTypeOrBySubTypeId("/immobilisation/type/",this.selected);

		this.getAllSousTypeByType(this.selected);

		this.addForm.controls['sousType'].enable();
	}
	// ============================================
	// Select changed sub type
	// ============================================
	selectionSubTypeChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		this.selected = event.value.id;
		let type = this.addForm.controls['typeImmobilisation'].value;
		this.getAllObjectListByTwoParams("/immobilisation/type/soustype/",type.id,this.selected);
	}
	// ============================================
	// get all immobilisation by type and sub type id
	// ============================================
	getAllObjectListByTwoParams(path : string,p1 : number,p2 : number){
		this.immoService
			.getAllObjectListByTwoParams(path,p1,p2)
			.pipe(delay(500))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.datasourceOption();
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
	}
	// ============================================
	// get all immobilisation by type or sub type id
	// ============================================
	getAllImmobilisationByTypeOrBySubTypeId(path : string,id : number){
		this.immoService
			.getAllObjectListById(path,id)
			.pipe(delay(500))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.datasourceOption();
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
	}
	// ============================================
	// option pagination & sorting
	// ============================================
	datasourceOption(){
		this.paginator._intl.itemsPerPageLabel = this.translate.instant(
			"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
		);
		this.paginator._intl.nextPageLabel = this.translate.instant(
			"PAGES.GENERAL.NEXT_PAGE_LABEL"
		);
		this.paginator._intl.previousPageLabel = this.translate.instant(
			"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
		);
		this.paginator._intl.lastPageLabel = this.translate.instant(
			"PAGES.GENERAL.LAST_PAGE_LABEL"
		);
		this.paginator._intl.firstPageLabel = this.translate.instant(
			"PAGES.GENERAL.FIRST_PAGE_LABEL"
		);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	// ============================================
	// Liste des sous types
	// ============================================
	private getAllSousTypeByType(id: number) {
		this.immoService
			.getAllObjectListById("/typeImmobilisation/sousType/", id)
			.subscribe(
				data => {
					this.sousTypes = data;
				},
				err => {
					console.log(err);
				}
			);
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
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileUtils.exportToExcel("exportData",this.translate.instant("PAGES.IMMOBILISATION.REFORME.TITRE_INDEX"));
	}
}
