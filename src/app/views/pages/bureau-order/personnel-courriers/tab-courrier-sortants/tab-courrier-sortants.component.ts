import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { BoServiceService } from "../../../utils/bo-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { delay } from "rxjs/operators";
import { Page } from "../../../utils/pagination/page";
import { Observable } from "rxjs";
import { Permission, User, currentUser, currentUserPermissions } from "../../../../../core/auth";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../../../core/reducers";
import { CustomPaginationService } from "../../../utils/pagination/services/custom-pagination.service";

@Component({
	selector: "kt-tab-courrier-sortants",
	templateUrl: "./tab-courrier-sortants.component.html",
	styleUrls: ["./tab-courrier-sortants.component.scss"],
})
export class TabCourrierSortantsComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	@Input() persoId: number;
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"numero",
		"objet",
		"reference",
		// "dateExpedetion",
		// "nombreCopie",
		// "criticiteCourrier",
		"typeCourrier",
		"destinataire",
		"actions",
	];
	page: Page<any> = new Page();
	user$: Observable<User>;
	user
	private currentUserPermissions$: Observable<Permission[]>;

	// ============================================
	// Constructeur
	// ============================================
	constructor(		private store: Store<AppState>,
		private paginationService: CustomPaginationService,

		private service: BoServiceService,
		private router: Router,
		private translate: TranslateService,
		private route: ActivatedRoute
	) {
		this.user$ = this.store.pipe(select(currentUser));

	}
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// ngOnInit
	// ============================================
	ngOnInit() {


		this.user$ = this.store.pipe(select(currentUser));

		this.paginationService.currentMessage.subscribe((message) => {
			this.page = message;
		});
		// this.user.idPersonnel=parseInt(localStorage.getItem('idPers'));
		this.user$.subscribe((user: User) => {
			this.user=user
		}) 
		this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		this.currentUserPermissions$.subscribe((res) => {
			if (res.find((e) => e.id == 2667) != null) {
				this.getCourriersSortant(this.user.idPersonnel, true);
			} else {
				this.getCourriersSortant(this.user.idPersonnel, false);
			}
		});
	
	}
	// ============================================
	// Recuperer les courriers personnel
	// ============================================

	private getCourriersSortant(id: number, cas: boolean) {
		if(cas){
			this.service 
			.findCSByMotCle( this.page.pageable,this.motCle, id)
			.pipe(delay(300))
			.subscribe(
				(data: any) => {
					this.isLoading = false;
					this.page = data;
					this.dataSource.data = this.page.content;
					this.sizeData = data.content.length;
				},
				(err) => {
					this.sizeData=0;
					this.isLoading = false;
					console.log(err);
				}
			);
		}else{
			this.service
			.getAllObjectById("/courrierSortants/personnel/", id)
			.pipe(delay(300))
			.subscribe(
				(data:any) => {
					this.isLoading = false;
					this.page = data;

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
	
	}
	public getNextPage(): void {
        //console.log("Filter : " + this.dataSource.filter)
        this.user.idPersonnel=parseInt(localStorage.getItem('idPers'));
        this.page.pageable = this.paginationService.getNextPage(this.page);
        this.isLoading = true;
        this.currentUserPermissions$.subscribe((res) => {
            if (res.find((e) => e.id == 2667) != null) {
                this.getCourriersSortant(this.user.idPersonnel, true);
            } else {
                this.getCourriersSortant(this.user.idPersonnel, false);
            }
        });
    }
	ngOnDestroy() {
		this.paginationService.updateMessage(this.page);
		// localStorage.setItem('page',JSON.stringify(this.page))
	}
    public getPreviousPage(): void {
        this.user.idPersonnel=parseInt(localStorage.getItem('idPers'));
        this.page.pageable = this.paginationService.getPreviousPage(this.page);
        this.isLoading = true;
        this.currentUserPermissions$.subscribe((res) => {
            if (res.find((e) => e.id == 2667) != null) {
                this.getCourriersSortant(this.user.idPersonnel, true);
            } else {
                this.getCourriersSortant(this.user.idPersonnel, false);
            }
        });
    }

    public getPageInNewSize(pageSize: number): void {
        this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
        this.isLoading = true;
        this.currentUserPermissions$.subscribe((res) => {
            if (res.find((e) => e.id == 2667) != null) {
                this.getCourriersSortant(this.user.idPersonnel, true);
            } else {
                this.getCourriersSortant(this.user.idPersonnel, false);
            }
        });
    }
	// ============================================
	// Details courriers
	// ============================================
	detailsCourrierSortants(courrier: any): void {
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrier.id.toString());
		this.router.navigate(["courriers-sortants/courriers-sortants-show"]);
	}
	// ============================================
	// Filter datasource
	// ============================================
	// applyFilter(filterValue: string) {
	// 	this.dataSource.filter = filterValue.trim().toLowerCase();
	// 	if (this.dataSource.paginator) {
	// 		this.dataSource.paginator.firstPage();
	// 	}
	// }
	motCle=''
	sizeData = 0;

	applyFilter(filterValue: string) {
	this.motCle=filterValue
		this.service.findCSByMotCle(this.page.pageable,this.motCle,this.user.idPersonnel).subscribe((data:any)=>{
			
			this.isLoading = false;
						this.page = data;
						this.dataSource.data = this.page.content;
						this.sizeData = data.content.length;
		})
		// this.dataSource.filter = filterValue.trim().toLowerCase();
		// if (this.dataSource.paginator) {
		// 	this.dataSource.paginator.firstPage();
		// }
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.service.exportToExcel(
			"exportData",
			this.translate.instant(
				"PAGES.BUREAU_ORDRE.COURRIER_SORTANT.TITRE_INDEX"
			)
		);
	}

		// ============================================
	// Destinataire courrier details
	// ============================================
	destinataireCourrierSortant(): void {
		let courrierId = window.localStorage.getItem("courrId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortants"]);
			return;
		}
		//this.router.navigate(["destinataire-courrier/add-destinataire-courrier"]);
		this.router.navigate(["partenaires-externe/add-destinataire"]);
	}
}
