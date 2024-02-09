import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { BoServiceService } from "../../../utils/bo-service.service";
import { TranslateService } from "@ngx-translate/core";
import { delay, first, finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from '../../../shared/notification.service';
// Ar lang
import { DatePipe, registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-MA';
import { NotificationType } from '../../../shared/NotificationMessage.service';
import { Page } from '../../../utils/pagination/page';
import { CustomPaginationService } from '../../../utils/pagination/services/custom-pagination.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pageable } from '../../../utils/pagination/pageable';
import { SpinnerService } from '../../../utils/spinner.service';
import Swal from 'sweetalert2';
import { ExcelServiceService } from "../../../utils/excel-service.service";
registerLocaleData(localeAr, 'ar');

@Component({
	selector: "kt-list-courriers-sortants",
	templateUrl: "./list-courriers-sortants.component.html",
	styleUrls: ["./list-courriers-sortants.component.scss"],
})
export class ListCourriersSortantsComponent implements OnInit {
	data: any[] = [];
	columns: any[];
	footerData: any[][] = [];
	// ============================================
	// Datasource
	// ============================================
	displayedColumns: string[] = [
		"numero",
		"refrence",
		"objet",
		"dateExpedetion",
		//"nombreCopie",
		//"criticiteCourrier",
		"typeCourrier",
		"destinataire",
		// "statut",
		"actions",
	];
	// ============================================
	// Declaration
	// ============================================
	page: Page<any> = new Page();
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	courrier = [];
	editForm: FormGroup;
	// ============================================
	// Pagination option & export data
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild('inputFile', { static: true }) inputFile: ElementRef;
	courr: any[];
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService,
		private notification: NotificationService,
		private fb: FormBuilder,
		private paginationService: CustomPaginationService,
		// private SpinnerService: NgxSpinnerService,
		private spinnerService: SpinnerService,
		private excelService: ExcelServiceService,
		private datePipe: DatePipe,
	) {
		// this.getCourriersSortants();
		this.formBuild();
	}
	// ============================================================
	//
	// ============================================================
	formBuild() {
		this.editForm = this.fb.group({
			id: [""],
			statut: [""],
		});
	}
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		window.localStorage.removeItem("csId22");
		this.columns = ['رقم المراسلة', 'الموضوع', 'تاريخ الإستلام', 'نوع المراسلة', 'القسم', 'المصلحة', 'الموظف', 'المرسل إليه', 'وضعية المراسلة',];
		this.footerData.push(['Total', '', '', 100]);
		this.service
			.getAllObject("/courrierSortants/excel")
			.pipe(finalize(() => {
			})).subscribe((data) => {
				this.courr = data;
				for (let i = 0; i < this.courr.length; i++) {
					this.data.push(this.createDataJson(i));
				}
				//console.log("CS :: " + JSON.stringify(this.data, null,2))
			},
				(err) => {
					console.log(err);
				});
	}
	// ============================================
	// ngAfterViewInit
	// ============================================
	ngAfterViewInit() {
		this.getCourriersSortants();
	}
	// ============================================
	// Recuperer tous les courriers sortants
	// ============================================
	private getCourriersSortants() {
		// setTimeout(() => { this.SpinnerService.show() }, 25);
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.service
			.getAllObjectByPage("/courrierSortants/index", this.page.pageable)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			})).subscribe((data) => {
				this.page = data;
				this.isLoading = false;
				this.dataSource.data = this.page.content;
			},
				(err) => {
					// setTimeout(() => { this.SpinnerService.hide() }, 500);
					this.isLoading = false;
					console.log(err);
				});
	}
	// ============================================
	// Navigation
	// ============================================
	public getNextPage(): void {
		//console.log("Filter : " + this.dataSource.filter)
		this.page.pageable = this.paginationService.getNextPage(this.page);
		this.isLoading = true;
		if (this.dataSource.filter == null) {
			this.getCourriersSortants();
		} else {
			this.getFilterData(this.dataSource.filter);
		}
	}

	public getPreviousPage(): void {
		this.page.pageable = this.paginationService.getPreviousPage(this.page);
		this.isLoading = true;
		if (this.dataSource.filter == null) {
			this.getCourriersSortants();
		} else {
			this.getFilterData(this.dataSource.filter);
		}
	}

	public getPageInNewSize(pageSize: number): void {
		this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
		this.isLoading = true;
		if (this.dataSource.filter == null) {
			this.getCourriersSortants();
		} else {
			this.getFilterData(this.dataSource.filter);
		}
	}

	public updateProjectsList(): void {
		this.dataSource.filter = '';
		this.inputFile.nativeElement.value = '';
		this.dataSource.data = null;
		this.page.pageable.pageNumber = Pageable.FIRST_PAGE_NUMBER;
		this.getCourriersSortants();
	}
	// ============================================
	// Methode de suppression des courrier sortants
	// ============================================
	deleteCourrierSortant(id: number): void {
		Swal.fire({
			title: 'هل تريد مسح هذه المراسلة ؟',
			icon: 'question',
			iconHtml: '؟',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'نعم',
			cancelButtonText: 'لا',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service
					.deleteObject("/courrierSortants/delete/", id)
					.subscribe(data => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.getCourriersSortants();
					});
				this.service
					.deletefiles("/PjCourriersSortants/ByIdCourriersSortants/", id)
					.subscribe(data => {
						console.log("File courrier deleted : " + id);
					});
			}
		})
	}
	// ============================================
	// Methode de modification des courriers sortants
	// ============================================
	editCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrier.id.toString());
		this.router.navigate(["courriers-sortants/edit-courriers-sortants"]);
	}
	// ============================================
	// Methode d'insertion des courriers sortants
	// ============================================
	addNewCourrierSortant(): void {
		this.router.navigate(["courriers-sortants/add-courriers-sortants"]);
	}
	// ============================================
	// Methode details 2
	// ============================================
	detailsCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrier.id.toString());
		this.router.navigate(["courriers-sortants/courriers-sortants-show"]);
	}
	// ============================================
	// filter datasource
	// ============================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		this.getFilterData(this.dataSource.filter);
	}
	// ============================================
	// Filter 
	// ============================================
	getFilterData(filter): void {
		this.service
			.getAllObjectByFilterPage("/courrierSortants/index", filter, this.page.pageable)
			.subscribe((data) => {
				this.page = data;
				this.dataSource.data = this.page.content;
				// this.dataSource.paginator = this.paginator;
				// this.dataSource.sort = this.sort;
				// setTimeout(() => { this.SpinnerService.hide() }, 500);
				this.isLoading = false;
			},
				(err) => {
					// setTimeout(() => { this.SpinnerService.hide() }, 500);
					this.isLoading = false;
					console.log(err);
				});
	}
	// ============================================
	// Refresh methode
	// ============================================
	refresh() {
		this.service
			.getAllObject("/courrierSortants/index")
			.subscribe((data) => {
				this.courrier = data;
			});
	}
	// ============================================
	// Destinataire courrier details
	// ============================================
	destinataireCourrierSortant(courrier: any): void {
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrier.id.toString());
		this.router.navigate(["partenaires-externe/add-partenaires-externe"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	/*
	exportTable() {
		this.service.exportToExcel("exportData", this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_SORTANT.TITRE_INDEX"));
	}
	*/
	exportTable() {
		this.excelService.exportAsExcelFile('المراسلات الصادرة', '', this.columns, this.data, this.footerData, 'Liste-courriers-sortants', this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_SORTANT.TITRE_INDEX"))
	}
	// ============================================================
	//
	// ============================================================
	dispatching(id) {
		this.editForm.get("id").setValue(id);
		this.editForm.get("statut").setValue('تم التوزيع');
		console.log("statut :" + JSON.stringify(this.editForm.value, null, 2));
		this.service
			.updateObject(
				"/courrierSortants/dispatching/",
				this.editForm.value
			)
			.pipe(first())
			.subscribe(
				(data) => {
					this.notification.sendMessage({
						message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
						type: NotificationType.info
					});
					this.getCourriersSortants();
				},
				(error) => {
					alert(error);
				}
			);
	}
	createDataJson(i: number): excelData {
		return {
			numero: this.courr[i].numero,
			objet: this.courr[i].objet,
			dateExpedetion: this.datePipe.transform(this.courr[i].dateExpedetion, "dd/MM/yyyy"),
			typeCourrier: this.courr[i].typeCourrier,
			division: this.courr[i].division,
			service: this.courr[i].service,
			personnel: this.courr[i].personnel,
			destinataire: this.courr[i].destinataire,
			statut: this.courr[i].statut,
		};
	}
}
export interface excelData {
	numero: string;
	objet: string;
	dateExpedetion: String;
	division: string;
	service: string;
	personnel: string;
	typeCourrier: string;
	destinataire: string;
	statut: string;
}