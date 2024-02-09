import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../gestion-parc-auto/common/constants/pagination.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../shared/consultation.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kt-modal-show-calendrier-bc',
  templateUrl: './modal-show-calendrier-bc.component.html',
  styleUrls: ['./modal-show-calendrier-bc.component.scss']
})
export class ModalShowCalendrierBcComponent implements OnInit {

  language: string = localStorage.getItem("language") || 'ar';
	niveau;
	dateDayNow: any; 
	dateDayNow1: any;
	dateDayNow2: any;
	user: any;
	myDateFormat = 'dd/MM/yyyy';
	dataSource = new MatTableDataSource<any>();
	columns: any[];
	page?: number;
	currentDate: Date;

	predicate!: string;
	ascending!: boolean;
	totalItems = 0;
	ngbPaginationPage = 1;
	pageSize: number = 5;
	pageIndex: number = 0;
	isLoading = false;
	itemsPerPage = ITEMS_PER_PAGE;
	// recharche Avance  et normale ;
	idRegion: number = undefined;
	idProvince: number = undefined;
	idCommune: number = undefined;
	idAvocat: number = undefined;
	displayedColumns: string[] = [
		"ref",
		"Objet",
		// "date",
		// "type",
		// "etatAudience",
		"actions",
	];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	constructor(private router: Router,
		private service: ConsultationService,
		private translate: TranslateService,
		public datepipe: DatePipe,
		protected activatedRoute: ActivatedRoute,
		public dialogRef: MatDialogRef<ModalShowCalendrierBcComponent>,
		@Inject(MAT_DIALOG_DATA) public data?: { dateToday: string }
	) {

		this.currentDate = new Date();
	}


	compareDates(date1: Date, date2: Date): boolean {
		return date1.getTime() >= date2.getTime();
	}
	ngOnInit() {
		this.dateDayNow = this.data.dateToday;
		const originalDate = new Date(this.dateDayNow);
		const timeZoneOffsetMinutes = originalDate.getTimezoneOffset();
		originalDate.setMinutes(originalDate.getMinutes() - timeZoneOffsetMinutes);
		const convertedDate = originalDate.toISOString().slice(0, -1) + 'Z';
		// this.dateDayNow = convertedDate.toString().substring(0, 10);
		this.language = this.translate.defaultLang;
		// this.userInfoService.getUser().subscribe(res => {
		// 	this.user = res
		// 	this.niveau = res.niveau;
		// })
		// if (this.user.niveau! == Niveau.AVOCAT) {
		// 	this.idCommune = undefined
		// 	this.idProvince = undefined
		// 	this.idRegion = undefined
		// 	this.idAvocat = this.user.idUser;
		// }

		// if (this.user.niveau! == Niveau.COMMUNE || this.user.niveau! == Niveau.SUPER_COMMUNE) {
		// 	this.idCommune = this.user.communeUser
		// 	this.idProvince = undefined
		// 	this.idRegion = undefined
		// }
		// if (this.user.niveau! == Niveau.DGCT || this.user.niveau! == Niveau.SUPER_DGCT) {

		// 	this.idCommune = undefined
		// 	this.idProvince = undefined
		// 	this.idRegion = undefined
		// }
		// if (this.user.niveau! === Niveau.PROVINCE || this.user.niveau! === Niveau.SUPER_PROVINCE) {

		// 	this.idCommune = undefined
		// 	this.idProvince = this.user.provinceUser
		// 	this.idRegion = undefined
		// }
		// if (this.user.niveau! == Niveau.REGION) {
		// 	this.idCommune = undefined
		// 	this.idProvince = undefined
		// 	this.idRegion = this.user.regionuser
		// }
		this.dataSource = new MatTableDataSource();

		this.handleNavigation()
		this.columns = [

			"objetAudience",
			"tribunal",
			"dateAudience",
			"type_audience",
			"etatAudience",
		];

	}
	ngAfterViewInit() {

		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			this.language = event.lang;
		});
	}
	addAudience(): void {
		this.router.navigate(["pages/audiences/add-ao"]);
	}





	pageChanged(event: PageEvent) {
		this.itemsPerPage = event.pageSize;
		this.loadPage(event.pageIndex, true);
	}

	protected onSuccess(
		data: any[] | null,
		headers: HttpHeaders,
		page: number,
		navigate: boolean
	): void {
		this.totalItems = Number(headers.get("X-Total-Count"));
		this.page = page;
		if (navigate) {
			this.router.navigate(
				["/pages/affaires/dashboard"],
				{
					queryParams: {
						page: this.page,
						size: this.itemsPerPage,
						sort:
							this.predicate +
							"," +
							(this.ascending ? ASC : DESC),
					},
				}
			);
		}
		this.dataSource.data = data || [];
		this.ngbPaginationPage = this.page;
	}
	protected handleNavigation(): void {
		combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap])
			.pipe(
				map(([data, paramMap]) => {
					const page = paramMap.get('page');
					const pageNumber = +(page || 0);
					const sort = paramMap.get(SORT) || data['defaultSort'];
					const sortArray = sort ? sort.split(',') : null;
					const predicate = sortArray ? sortArray[0] : null;
					const ascending = sortArray ? sortArray[1] === ASC : null;
					return { pageNumber, predicate, ascending };
				})
			)
			.subscribe(({ pageNumber, predicate, ascending }) => {
				if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
					this.predicate = predicate;
					this.ascending = ascending;
					this.loadPage(pageNumber, true);
				}
			});
	}


	protected sort(): string[] {
		const result = [this.predicate + "," + (this.ascending ? ASC : DESC)];
		if (this.predicate !== "id") {
			result.push("id");
		}
		return result;
	}
	protected onError(): void { }

	loadPage(page?: number, dontNavigate?: boolean): void {
		this.isLoading = true;
		let pageToLoad: number = 0;
		if (page) {
			pageToLoad = page;
		} else {
			pageToLoad = 0;
		}
    this.service.findBcByDateOuverturePlisOrderByIdDesc(this.dateDayNow).then((res)=>{
      				this.isLoading = false;
              this.totalItems = res.content.length

              this.dataSource.data = res.content
              
          
    })
  
	

	}


	show(ao: any): void {
   
   this.router.navigate(["/marches/bon-commande-detail"], {
    queryParams: { id: ao.id, page: 1 },
  });
  this.dialogRef.close();

					// this.router.navigate(["pages/affaires/espace-affaire/" + ao.id]);
					// this.dialogRef.close();

	}
	onNoClick(): void {
		this.router.navigate(["/marches/calendrier-bc"]);
    
		this.dialogRef.close();

	}

}
