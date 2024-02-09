import { environment } from "./../../../../../../environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location, formatDate } from "@angular/common";
import { BoServiceService } from "../../../utils/bo-service.service";
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from '../../../shared/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Ar lang
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-MA';
import Swal from 'sweetalert2';
import { SpinnerService } from '../../../utils/spinner.service';
import { PdfviewerDialogComponent } from '../../dialog/pdfviewer-dialog/pdfviewer-dialog.component';
registerLocaleData(localeAr, 'ar');

@Component({
	selector: "kt-courriers-sortants-show",
	templateUrl: "./courriers-sortants-show.component.html",
	styleUrls: ["./courriers-sortants-show.component.scss"],
})
export class CourriersSortantsShowComponent implements OnInit {
	// =================================================================
	// declaration des Attributs
	// =================================================================
	pdfUrl: string
	pdfSrc: string = '';
	loading = false;
	btnloading = false;
	detailscourrier;
	pjs;
	_data;
	data_size: number;
	editForm: FormGroup;
	validate:number;
	// file varriable
	files : Observable<any>;
	start:boolean=true;
	isFile:boolean=false;
	// =================================================================
	// Constructeur
	// =================================================================
	constructor(
		private service: BoServiceService,
		private translate: TranslateService,
		private router: Router,
		private location: Location,
		private notification: NotificationService,
		private fb: FormBuilder,
		private spinnerService: SpinnerService,
		private _dialog: MatDialog,
	) {
		this.formBuild();
		// get all files by id courrier
		let courrierId = window.localStorage.getItem("csId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortants"]);
			return;
		}
		setTimeout(() => {
			if (courrierId!=null)
				this.files = this.service.getByIdCourrierFiles2(courrierId);
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.service.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.service.getExtensionFile(file);
	}
	// ============================================================
	//
	// ============================================================
	formBuild() {
		let courrierId = +window.localStorage.getItem("csId");
		this.editForm = this.fb.group({
			id: [courrierId],
			statut: [""],
		});
		this.editForm.get("statut").setValue('تم التوزيع');
	}
	// ====================================
	//
	//=====================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = [
		"idDivision",
		"idService",
		"idPersonne",
		"partenaire",
	];
	// ====================================
	//
	//=====================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================
	//
	//=====================================
	ngOnInit() {
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		let courrierId = window.localStorage.getItem("csId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortants"]);
			return;
		}
		const _this = this;
		this.service
			.getObjectById("/courrierSortants/show/", +courrierId)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			})).subscribe(
				(data) => {
					console.log(data)
					if(data.statut.length > 10){
						_this.validate = 1;
					}else{
						_this.validate = 0;
					}
					this.detailscourrier = data;
				},
				(error) => console.log(error)
			);
			//console.log('======= ' + courrierId);
		// if (courrierId!=null)
		// 	this.service.getByIdCourrierFiles2(courrierId).subscribe((m) => {
		// 		this.pjs = m;
		// 		//console.log("file log :" + this.pjs.id);
		// 	});
		this.getData(+courrierId);
	}
	// =================================================================
	// Recuperer tous les destinataire des courriers entrants
	// =================================================================
	private getData(courrierId: number) {
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortant"]);
			return;
		}
		const _this = this;
		/*document.getElementById("destinataire").style.display = "none";
		this.service
			.getAllObjectById("/partenaire/find/", courrierId)
			.subscribe(
				(data) => {
					_this.data_size = data.length;
					if (_this.data_size > 0) {
						//document.getElementById("destinataire").style.display ="inline";
						this.loading = false;
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
					}
				},
				(error) => console.log(error)
			);
			*/
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
	onClickPjName(a,e, id) {
		console.log("You clicked: " + e);
		var r = e.substring(0,e.length-4);
		console.log("id file: " + r);
		this.service.downoldFile(r,e);
		// window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/"+r);
	}
	// ============================================================
	// PDF view
	// ============================================================
	openDialog(pdfUrl: string, num: string) {
		var r = pdfUrl.substring(0, pdfUrl.length - 4);
		this.pdfSrc = environment.API_ALFRESCO_URL + "/PjCourriersSortants/" + r;
		const dialogRef = this._dialog.open(PdfviewerDialogComponent, {
			height: '500px',
			data: { title: num.substr(5, num.length - 5), pdfUrl: this.pdfSrc }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}
	// ============================================================
	//
	// ============================================================
	dispatching() {
		//console.log("statut :" + JSON.stringify(this.editForm.value, null, 2));
		this.btnloading = true;
		this.service
			.updateObject(
				"/courrierSortants/dispatching/",
				this.editForm.value
			)
			.pipe(first())
			.subscribe(
				(data) => {
					this.btnloading = false;
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
					);
					this.router.navigate([
						"courriers-sortants/list-courriers-sortants",
					]);

				},
				(error) => {
					alert(error);
				}
			);
	}
	// ====================================
	//
	//=====================================
	back() {
		this.router.navigate(["courriers-sortants/list-courriers-sortants"]);
	}
	// ============================================
	// Methode de modification des courriers sortants
	// ============================================
	editCourrierSortant(): void {
		let courrierId = window.localStorage.getItem("csId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortants"]);
			return;
		}
		window.localStorage.removeItem("csId");
		window.localStorage.setItem("csId", courrierId);
		window.localStorage.setItem("csId22", courrierId)
		this.router.navigate(["courriers-sortants/edit-courriers-sortants"]);
	}
	// ============================================
	// File size converter
	// ============================================
	getFormattedFileSize(Fsize){
		return this.service.getFormattedFileSizeService(Fsize);
	}

		// ============================================
	// Historique courrier
	// ============================================
	historique():void {
		Swal.fire({
			title: 'معلومات عن المراسلة',
			icon: 'info',
			confirmButtonText: 'حسنا',
			html:'<table width="100%" style="direction: rtl;">'+
					'<tbody>'+
						'<tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">أنشأ من طرف :</th>'+
						'<td style="font-size: 15px;" class="donnee_show">'+this.getCreator(this.detailscourrier.createurUser)+'</td>'+
						'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ الإنشاء :</th>'+
						'<td style="font-size: 15px; direction: initial;" class="donnee_show">'+this.getDates(this.detailscourrier.creationDate)+'</td>'+
						'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ التعديل :</th>'+
						'<td style="font-size: 15px; direction: initial;" class="donnee_show">'+this.getDates(this.detailscourrier.updateDate)+'</td>'+
						'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ التوجيه :</th>'+
						'<td style="font-size: 15px; direction: initial;" class="donnee_show">'+this.getDates(this.detailscourrier.dispatchingDate)+'</td>'+
						'</tr>'+
					'</tbody>'+
				'</table>',
		  })
	}
	getCreator(user) : string{
		var result = "لا توجد معلومات";
		if(user != null){
			result = this.detailscourrier.createurUser;
		}
		return result;
	}

	getDates(date) : string{
		var result = "لا توجد معلومات";
		if(date != null){
			result = formatDate(date, 'dd/MM/yyyy HH:mm','ar-MA');
		}
		return result;
	}
}
