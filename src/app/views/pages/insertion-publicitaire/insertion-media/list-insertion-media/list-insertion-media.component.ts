import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { InsertPubService } from '../../../utils/insert-pub.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { delay } from 'rxjs/operators';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
  selector: 'kt-list-insertion-media',
  templateUrl: './list-insertion-media.component.html',
  styleUrls: ['./list-insertion-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListInsertionMediaComponent implements OnInit {

	id:number;
	url:string;
	// ============================================
	// Presentation de datasource
	// ============================================

	displayedColumns: string[] = [
		"nom",
		"typeMedia",
		"contact",
		"tel",
		"site",
		"mail",
		"actions"
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: InsertPubService,
		private service1: FilesUtilsService,
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private notification: NotificationService
	) {
		this.getMedias();
	}

	ngOnInit() {}
	// ============================================
	// Recuperer tous les Medias
	// ============================================
	public getMedias() {
		this.service.getAllObject("/MediaPublicitaires/index")
		.pipe(delay(300))
		.subscribe(
			data => {
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
			err => {
				this.isLoading = false;
				console.log(err);
			}
		);
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

	// ============================================
	// Methode de suppression des Medias
	// ============================================
	deleteMedias(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteObject("/MediaPublicitaires/delete/", id)
			.subscribe(data => {
				//console.log("getId :" + id);
				this.getMedias();
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}

	}
	// ============================================
	// Methode d'insertion des Medias
	// ============================================
	addMedias(): void {
		this.router.navigate(["/insertion-media/add-insertion-media"]);
	}
	// ============================================
	// Methode de modification Medias
	// ============================================
	editMedias(row:any){
		window.localStorage.removeItem("medId");
		window.localStorage.setItem("medId",""+row.id);
		this.router.navigate(["/insertion-media/edit-insertion-media"]);
	}
	// ============================================
	// Methode details medias
	// ============================================
	detailsMedias(media: any): void {
		window.localStorage.removeItem("medId");
		window.localStorage.setItem("medId", media.id.toString());
		this.router.navigate([
			"/insertion-media/show-insertion-media",
		]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.service1.exportToExcel("exportData",this.translate.instant("PAGES.INSERT_PUB.MEDIA.TITRE_INDEX"));
	}
}
