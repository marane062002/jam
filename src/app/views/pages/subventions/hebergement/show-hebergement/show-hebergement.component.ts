import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SubventionsService } from "./../../../utils/subventions.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from '@ngx-translate/core';
import { Location, formatDate } from "@angular/common";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { NotificationService } from '../../../shared/notification.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: "kt-show-hebergement",
	templateUrl: "./show-hebergement.component.html",
	styleUrls: ["./show-hebergement.component.scss"],
})
export class ShowHebergementComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	id: number;
	details: any;
	pjs;
	isLoading = true;
	files : Observable<any>;
	start:boolean=true;
	history:boolean = false;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"designation",
		"quantite",
		"prixUnitaire",
		"totalHT",
		"totalTTC",
		"actions"
	];
	// ============================================
	//
	// ============================================
	constructor(
		private service: SubventionsService,
		private router: Router,
		private route: ActivatedRoute,
		private translate: TranslateService,
		private location: Location,
		private serviceFile : FilesUtilsService,
		private notification: NotificationService
	) {
		this.getAllTypeChambre();
		/*
		this.id = this.route.snapshot.params["id"];
		this.service.getObjectById("/hebergement/showBy/", this.id).subscribe(
			(data) => {
				setTimeout(() => {
					if (data!=null)
					this.files = this.service.getByIdFiles(data.subvention.id,'PjHebergement');
					this.start = false;
				}, 1000);
					},
			(error) => console.log(error)
		);
					*/
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.serviceFile.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.serviceFile.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r=e.substring(0,e.length-4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjHebergement/"+r);
	}
	// ============================================
	//
	// ============================================
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.service.getObjectById("/hebergement/show/", this.id).subscribe(
			(data) => {
				this.details = data;
				console.log('Heberg :: '+ JSON.stringify(this.details,null,2))
				setTimeout(() => {
					if (data!=null)
					this.files = this.service.getByIdFiles(this.id,'PjHebergement');
					this.start = false;
				}, 1000);
			},
			(error) => console.log(error)
		);
	}
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Recuperer tous les association
	// ============================================
	public getAllTypeChambre() {
		this.id = this.route.snapshot.params["id"];
		this.service
			.getAllSubventionListById("/typeChambre/hebergement/", this.id)
			.subscribe(
				(data) => {
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
					console.log(err);
					this.isLoading = false;
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
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================
	//
	// ============================================
	addTypeChambre(){
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("hebergId");
		window.localStorage.setItem("hebergId",""+this.id);
		this.router.navigate(["hebergement/add-type-chambre/"]);
	}
	// ============================================
	//
	// ============================================
	editTypeChambre(idType: number){
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("hebergId");
		window.localStorage.setItem("hebergId",""+this.id);
		this.router.navigate(["hebergement/edit-type-chambre/"+idType]);
	}
	// ============================================
	//
	// ============================================
	deteleTypeChambre(id: number): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
			.deleteSubvention("/typeChambre/delete/", id)
			.subscribe(data => {
				console.log("Type Deleted  : " + id);
			});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.serviceFile.exportToExcel("exportData",this.translate.instant("PAGES.HEBERGEMENT.TYPE_CHAMBRE.TITRE_INDEX"));
	}
	// ============================================
	// Methode de modification
	// ============================================
	editHebergement() {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["hebergement/edit-hebergement/" + this.id]);
	}
	/*
	showHitory(){
		this.history = !this.history;
	 }
	*/
	// ============================================
	// Historique
	// ============================================
	showHitory() {

		Swal.fire({
			title: 'معلومات',
			icon: 'info',
			confirmButtonText: 'حسنا',
			html: '<table width="100%" style="direction: rtl;">' +
				'<tbody>' +
				'<tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">أنشأ من طرف :</th>' +
				'<td style="font-size: 15px;" class="donnee_show">' + this.getCreator(this.details.fullName) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ الإنشاء :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.details.creationDate) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ التعديل :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.details.updateDate) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تم التعديل من طرف :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getModificator(this.details.modificateurUser) + '</td>' +
				'</tr>' +
				'</tbody>' +
				'</table>',
		})
	}
	 // ============================================
	// get Creator
	// ============================================
	getCreator(user): string {
		var result = "لا توجد معلومات";
		if (user != null) {
			result = this.details.fullName;
		}
		return result;
	}
	// ============================================
	// get Modificator
	// ============================================
	getModificator(user): string {
		var result = "لا توجد معلومات";
		if (user != null) {
			result = this.details.modificateurUser;
		}
		return result;
	}
	// ============================================
	// Date format
	// ============================================
	getDates(date): string {
		var result = "لا توجد معلومات";
		if (date != null) {
			result = formatDate(date, 'dd/MM/yyyy HH:mm', 'ar-MA');
		}
		return result;
	}
}
