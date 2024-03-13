import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { BoServiceService } from "../../../utils/bo-service.service";
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { delay, finalize } from 'rxjs/operators';

// Ar lang
import { DatePipe, registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-MA';
import { Page } from "../../../utils/pagination/page";
import { CustomPaginationService } from '../../../utils/pagination/services/custom-pagination.service';
import { Pageable } from '../../../utils/pagination/pageable';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { SpinnerService } from '../../../utils/spinner.service';
import { ExcelServiceService } from "../../../utils/excel-service.service";
import { ThrowStmt } from "@angular/compiler";
registerLocaleData(localeAr, 'ar');

@Component({
	selector: "kt-list-courriers-entrants",
	templateUrl: "./list-courriers-entrants.component.html",
	styleUrls: ["./list-courriers-entrants.component.scss"],
})
export class ListCourriersEntrantsComponent implements OnInit {

	language=localStorage.getItem('language');
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"numero",
		"refrence",
		"objet",
		"dateReception",
		"criticiteEntr",
		"typeOrigine",
		"origineCourierEntrant",
		"traite",
		"statut", 
		"actions"
	];
	// ============================================
	// Declarations
	// ============================================
	sizeData = 0;
	divisionLibelle;
	serviceLibelle;
	page: Page<any> = new Page();
	dataSource = new MatTableDataSource<any>();
	courrier = [];
	type: any;
	now: any;
	start: any;
	diff: any;
	oneDay: any;
	day: any;
	reference: any;
	isLoading = true;
	isLoading2 = true;
	//TotalElements: number = 0;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild('inputFile', { static: true }) inputFile: ElementRef;
	courr: any;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService,
		private notification: NotificationService,
		private paginationService: CustomPaginationService,
		// private SpinnerService: NgxSpinnerService,
		private spinnerService: SpinnerService,
		private excelService: ExcelServiceService,
		private datePipe: DatePipe,
	) {

	}
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		window.localStorage.removeItem("courrId22");
		window.localStorage.removeItem("idDiv");
		window.localStorage.removeItem("idPers");
		window.localStorage.removeItem("courrId33");
		this.columns = ['رقم المراسلة', 'الموضوع', 'تاريخ الإستلام', 'الأهمية', 'مصدر المراسلة', 'نوع المراسلة', 'الشركاء الخارجيين', 'القسم', 'المرتفقين', 'وضعية المراسلة',];
		this.footerData.push(['Total', '', '', 100]);
		this.paginationService.currentMessage.subscribe(message => {
			this.page = message

		})
		this.getCourriersEntrants();
		this.service
			.getAllObject("/courrierEntrants/excel")
			.pipe(finalize(() => {
			})).subscribe((data) => {
				this.courr = data;
				console.log("B4 :: " + JSON.stringify(this.courr, null, 2))
				for (let i = 0; i < this.courr.length; i++) {
					this.data.push(this.createDataJson(i));
				}
				console.log("CS :: " + JSON.stringify(this.data, null, 2))
			},
				(err) => {
					console.log(err);
				});
	}
	// ============================================
	// ngAfterViewInit
	// ============================================
	ngAfterViewInit() {
		//this.getCourriersEntrants();
	}
	ngOnDestroy() {
		this.paginationService.updateMessage(this.page);
		// localStorage.setItem('page',JSON.stringify(this.page))

	}
	// ============================================
	// Recuperer tous les courriers entrants
	// ============================================
	private getCourriersEntrants() {
		// this.page = JSON.parse(localStorage.getItem('page'))
		// setTimeout(() => { this.SpinnerService.show() }, 25);
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.service.getAllObjectByPage("/courrierEntrants/index", this.page.pageable).pipe(finalize(() => {
			this.spinnerService.stop(spinnerRef);// stop spinner
		})).subscribe((data) => {
			this.page = data;
			this.isLoading = false;
			this.dataSource.data = this.page.content;
			this.sizeData = data.content.length;
		},
			(err) => {
				this.sizeData = 0;
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
			this.getCourriersEntrants();
		} else {
			this.getFilterData(this.dataSource.filter);
		}
	}

	public getPreviousPage(): void {
		this.page.pageable = this.paginationService.getPreviousPage(this.page);
		this.isLoading = true;
		if (this.dataSource.filter == null) {
			this.getCourriersEntrants();
		} else {
			this.getFilterData(this.dataSource.filter);
		}
	}

	public getPageInNewSize(pageSize: number): void {
		this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
		this.isLoading = true;
		if (this.dataSource.filter == null) {
			this.getCourriersEntrants();
		} else {
			this.getFilterData(this.dataSource.filter);
		}
	}

	public updateProjectsList(): void {
		this.dataSource.filter = '';
		this.inputFile.nativeElement.value = '';
		this.dataSource.data = null;
		this.page.pageable.pageNumber = Pageable.FIRST_PAGE_NUMBER;
		this.getCourriersEntrants();

	}

	// ============================================
	// Methode de suppression des courrier entrants
	// ============================================
	deleteCourrierEntrant(id: number): void {
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
					.deleteObject("/destinataireCouriers/deleteByIdCourrier/", id)
					.subscribe(data => {
						console.log("Destinataire Deleted  : " + id);
					});
				this.service
					.deleteObject("/courrierEntrants/delete/", id)
					.subscribe(data => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.getCourriersEntrants();
					});
				this.service
					.deletefiles("/PjCourriersEntrants/ByIdCourriersEntrants/", id)
					.subscribe(data => {
						console.log("File courrier deleted : " + id);
					});
			}
		})
	}
	// ============================================
	// Methode de modification des courriers entrants
	// ============================================
	editCourrierEntrant(courrier: any): void {
		window.localStorage.removeItem("courrId");
		window.localStorage.setItem("courrId", courrier.id.toString());
		this.router.navigate(["courriers-entrants/edit-courriers-entrants"]);
	}
	// ============================================
	// Methode d'insertion des courriers entrants
	// ============================================
	addCourrierEntrant(): void {
		this.router.navigate(["add-courrier-entrant"]);
	}
	// ============================================
	// Details courriers
	// ============================================
	detailsCourrierEntrant(courrier: any): void {
		console.log("courrier")
		console.log(courrier)
		console.log("courrier")
		window.localStorage.removeItem("courrId");
		window.localStorage.setItem("courrId", courrier.id.toString());
		console.log("courrierlocalStorage")
		this.router.navigate(["courriers-entrants/courriers-entrants-show"]);
		console.log("courrierrouter")
	}
	// ============================================
	// Destinataire courrier details
	// ============================================
	destinataireCourrierEntrant(courrier: any): void {
		window.localStorage.removeItem("courrId");
		window.localStorage.setItem("courrId", courrier.id.toString());
		this.router.navigate(["destinataire-courrier/add-destinataire-courrier"]);
	}
	// ============================================
	// Filter datasource
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
			.getAllObjectByFilterPage("/courrierEntrants/index", filter, this.page.pageable)
			.subscribe((data) => {
				this.page = data;
				this.dataSource.data = this.page.content;
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
	// Methode refresh
	// ============================================
	refresh() {
		this.service
			.getAllObject("/courrierEntrants/index")
			.subscribe((data) => {
				this.courrier = data;
			});
	}
	// ============================================
	//
	// ============================================
	getNumeroCourrier(): string {
		this.now = new Date();
		this.start = new Date(this.now.getFullYear(), 0, 0);
		this.diff = this.now - this.start;
		this.oneDay = 1000 * 60 * 60 * 24;
		this.day = Math.floor(this.diff / this.oneDay);
		console.log("Day of year" + this.day);
		return new Date().getFullYear() + "-" + this.day;
	}
	// ============================================
	// Ajouter un nouveau courrier avec un numéro enérique
	// ============================================
	addNewCourrierEntrant() {
		this.router.navigate(["courriers-entrants/add-courriers-entrants"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.service.exportToExcel("exportData", this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_ENTRANT.TITRE_INDEX"));
	}

	exportExcel() {
		this.excelService.exportAsExcelFile('المراسلات الواردة', '', this.columns, this.data, this.footerData, 'Liste-courriers-entrants', this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_ENTRANT.TITRE_INDEX"))
	}

	createDataJson(i: number): excelData {
		return {
			numero: this.courr[i].numero,
			objet: this.courr[i].objet,
			dateReception: this.datePipe.transform(this.courr[i].dateReception, "dd-MM-yyyy"),
			criticiteCourrier: this.courr[i].criticiteCourrier.libelle,
			typeOrigine: this.courr[i].typeOrigine,
			typeCourrier: this.courr[i].typeCourrier,
			origineCourierEntrant: this.courr[i].origineCourierEntrant,
			division: this.courr[i].division,
			personnePhysique: this.courr[i].personnePhysique,
			statut: this.courr[i].statut,
		};
	}

}
export interface excelData {
	numero: string;
	objet: string;
	dateReception: String;
	typeOrigine: string;
	typeCourrier: string;
	criticiteCourrier: string;
	origineCourierEntrant: string;
	division: string;
	personnePhysique: string;
	statut: string;
}
