import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { BoServiceService } from '../../../utils/bo-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { delay } from 'rxjs/operators';
import { Observable, Subscription } from "rxjs";
import { currentUserPermissions, Permission } from "../../../../../core/auth";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../../../core/reducers";
import { NgxPermissionsService } from "ngx-permissions";

@Component({
	selector: "kt-tab-courrier-convocations",
	templateUrl: "./tab-courrier-convocations.component.html",
	styleUrls: ["./tab-courrier-convocations.component.scss"],
})
export class TabCourrierConvocationsComponent implements OnInit {
	@Input() persoId: number;
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	idDivision;
	private unsubscribe: Subscription[] = [];
	private currentUserPermissions$: Observable<Permission[]>;

	displayedColumns: string[] = [
		"date",
		"heure",
		"lieu",
		"delai",
		"ordreJour",
		"actions",
	];

	constructor(
		private service: BoServiceService,
		private router: Router,
		private store: Store<AppState>,
		private translate: TranslateService,
		private route: ActivatedRoute,
		private permissionsService: NgxPermissionsService
	) { }

	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;

	ngOnInit() {
		this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		console.log(this.currentUserPermissions$)
		this.currentUserPermissions$.subscribe(res => {
			if (res.find(e => e.id == 38) != null) {
				this.getCourriersConvocations(this.persoId, true);
			} else {
				this.getCourriersConvocations(this.persoId, false);
			}
		});
	}
	
	private getCourriersConvocations(id: number, cas: boolean) {
		if (cas) {
			this.service.getAllObjectById("/courrierConvocations/personnelchef/", id).pipe(delay(300)).subscribe((data) => {
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(data);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				console.log("Liste des CEs personnel : " + JSON.stringify(data, null, 2))
			},
				(err) => {
					this.isLoading = false;
					console.log(err);
				});
		} else {
			this.service.getAllObjectById("/courrierConvocations/personnel/", id).pipe(delay(300)).subscribe((data) => {
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(data);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				console.log("Liste des CEs personnel : " + JSON.stringify(data, null, 2))
			},
				(err) => {
					this.isLoading = false;
					console.log(err);
				});
		}
	}

	repondreCourrierConvocation(courrier: any): void {
		this.router.navigate(["destinataire-courrier/repondre-courrier-convocation"]);
		window.localStorage.setItem("courrier_conv_id", courrier.id.toString());
		window.localStorage.setItem("courrier_conv_dispatchingDate", courrier.dispatchingDate.toString());	
	}
	
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	exportTable() {
		this.service.exportToExcel("exportData", this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_ENTRANT.TITRE_INDEX"));
	}

	destinataireCourrierEntrant(courrier: any): void {
		this.route.queryParams.subscribe(params => { this.idDivision = params['div']; });

		this.router.navigate(["destinataire-courrier/show-destinataire-interne"], {
			queryParams: { id: courrier, idPers: this.persoId, div: this.idDivision },
		});
	}
}
