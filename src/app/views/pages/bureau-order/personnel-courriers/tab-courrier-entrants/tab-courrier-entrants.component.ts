import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { BoServiceService } from "../../../utils/bo-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { delay } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { currentUser, currentUserPermissions, Permission, User } from "../../../../../core/auth";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../../../core/reducers";
import { NgxPermissionsService } from "ngx-permissions";
import { Page } from "../../../utils/pagination/page";
import { CustomPaginationService } from "../../../utils/pagination/services/custom-pagination.service";

@Component({
	selector: "kt-tab-courrier-entrants",
	templateUrl: "./tab-courrier-entrants.component.html",
	styleUrls: ["./tab-courrier-entrants.component.scss"],
})
export class TabCourrierEntrantsComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	language=localStorage.getItem('language');
	@Input() persoId: number;
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	idDivision;
	page: Page<any> = new Page();
	user$: Observable<User>;
	user

	// Private properties
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
	private currentUserPermissions$: Observable<Permission[]>;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = ["numero", "reference", "objet", "dateReception", "criticiteEntr", "typeOrigine", "origineCourierEntrant", "traite", "actions"];
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private paginationService: CustomPaginationService,

		private service: BoServiceService,
		private router: Router,
		private store: Store<AppState>,
		private translate: TranslateService,
		private route: ActivatedRoute,
		private permissionsService: NgxPermissionsService
	) {
		this.user$ = this.store.pipe(select(currentUser));

	}
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
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
		//console.log("tab id personne: " + this.user.idPersonnel);
		this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		console.log(this.currentUserPermissions$);
		this.currentUserPermissions$.subscribe((res) => {
			if (res.find((e) => e.id == 38) != null) {
				this.getCourriersEntrants(this.user.idPersonnel, true);
			} else {
				this.getCourriersEntrants(this.user.idPersonnel, false);
			}
		});
	}
	ngOnDestroy() {
		this.paginationService.updateMessage(this.page);
		// localStorage.setItem('page',JSON.stringify(this.page))
	}
	sizeData = 0;
	// ============================================
	// Recuperer les courriers personnel
	// ============================================
	private getCourriersEntrants(id: number, cas: boolean) {
		if (cas) {
			this.service 
				.findByMotCle( this.page.pageable,this.motCle, id)
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
		} else {
			this.service
				.getAllObjectById("/courrierEntrants/personnel/", id)
				.pipe(delay(300))
				.subscribe(
					(data:any) => {
						this.isLoading = false;
						this.page = data;
						this.dataSource = new MatTableDataSource(data);
						this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
						this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
						this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
						this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
						this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
						console.log("Liste des CEs personnel : " + JSON.stringify(data, null, 2));
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
            if (res.find((e) => e.id == 38) != null) {
                this.getCourriersEntrants(this.user.idPersonnel, true);
            } else {
                this.getCourriersEntrants(this.user.idPersonnel, false);
            }
        });
    }

    public getPreviousPage(): void {
        this.user.idPersonnel=parseInt(localStorage.getItem('idPers'));
        this.page.pageable = this.paginationService.getPreviousPage(this.page);
        this.isLoading = true;
        this.currentUserPermissions$.subscribe((res) => {
            if (res.find((e) => e.id == 38) != null) {
                this.getCourriersEntrants(this.user.idPersonnel, true);
            } else {
                this.getCourriersEntrants(this.user.idPersonnel, false);
            }
        });
    }

    public getPageInNewSize(pageSize: number): void {
        this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
        this.isLoading = true;
        this.currentUserPermissions$.subscribe((res) => {
            if (res.find((e) => e.id == 38) != null) {
                this.getCourriersEntrants(this.user.idPersonnel, true);
            } else {
                this.getCourriersEntrants(this.user.idPersonnel, false);
            }
        });
    }
	// ============================================
	// Details courriers
	// ============================================
	detailsCourrierEntrant(courrier: any): void {
		window.localStorage.removeItem("courrId");
		window.localStorage.setItem("courrId", courrier.id.toString());
		window.localStorage.setItem("courrId33", courrier.id.toString());
		this.router.navigate(["courriers-entrants/courriers-entrants-show"]);
	}
	// ============================================
	// Filter datasource
	// ============================================
	motCle=''
	applyFilter(filterValue: string) {
	this.motCle=filterValue
		this.service.findByMotCle(this.page.pageable,this.motCle,this.user.idPersonnel).subscribe((data:any)=>{
			
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
		this.service.exportToExcel("exportData", this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_ENTRANT.TITRE_INDEX"));
	}
	// ============================================
	// Destinataire courrier details
	// ============================================
	destinataireCourrierEntrant(courrier: any): void {
        localStorage.setItem("nameUserCreator", courrier.createurUser.toString());

        this.route.queryParams.subscribe(params => {this.idDivision= params['div'];});

        this.router.navigate(["destinataire-courrier/show-destinataire-interne"], {
            queryParams: { id: courrier.id, idPers : this.user.idPersonnel, div: this.idDivision },
        });
    }
}
