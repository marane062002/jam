import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { Location, formatDate } from "@angular/common";
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from "@angular/material";
import { BoServiceService } from "../../../utils/bo-service.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../../shared/notification.service";
import { Observable, throwError } from 'rxjs';
import * as $ from "jquery";

// Ar lang
import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-MA';
import Swal from 'sweetalert2';
import { PdfviewerDialogComponent } from '../../dialog/pdfviewer-dialog/pdfviewer-dialog.component';
import { SpinnerService } from '../../../utils/spinner.service';
import { finalize } from 'rxjs/operators';
import { User, currentUser } from '../../../../../../app/core/auth';
import { AppState } from '../../../../../../app/core/reducers';
import { Store, select } from '@ngrx/store';
import { FonctionnaireEntityResponse, FonctionnaireService } from '../../../../../../app/core/_base/layout/services/fonctionnaire.service';
import { FonctionnaireDTO } from '../../../../../../app/core/_base/layout/models/fonctionnaire-dto';
registerLocaleData(localeAr, 'ar');

@Component({
	selector: "kt-courriers-entrants-show",
	templateUrl: "./courriers-entrants-show.component.html",
	styleUrls: ["./courriers-entrants-show.component.scss"],
})
export class CourriersEntrantsShowComponent implements OnInit {
	language=localStorage.getItem('language');

	// 	user : Observable<User>;
	//   idFonctionniare=0;
	//   fonctionnaireDTO : FonctionnaireDTO = {};
	// PDF
	formPj = { type: 0, selecetedFile: {} };
	renderText = true;
	originalSize = false;
	fitToPage = false;
	showAll = true;
	autoresize = false;
	showBorders = true;
	renderTextModes = [0, 1, 2];
	renderTextMode = 1;
	rotation = 0;
	zoom = 1;
	zoomScale = 'page-width';
	zoomScales = ['page-width', 'page-fit', 'page-height'];
	pdfQuery = '';
	totalPages: number;
	allpjs = []
	motif
	// =================================================================
	// Declarations
	// =================================================================
	pdfUrl: string
	pdfSrc: string = '';
	detailscourrier;
	pjs;
	isLoading = true;
	files: Observable<any>;
	fileHistorique: Observable<any>;
	start: boolean = true;
	courrierId
	// =================================================================
	// Datasource
	// =================================================================
	displayedColumns: string[] = [
		"idDivision",
		"idService",
		"idPersonne",
		"typeDestinataire",
		"designation",
		"comment"
	];
	dataSource = new MatTableDataSource<any>();
	// =================================================================
	// Controles pagination
	// =================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	infos: any;
	// =================================================================
	// Constructeur
	// =================================================================
	constructor(
		private service: BoServiceService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private location: Location,
		// private SpinnerService: NgxSpinnerService,
		private spinnerService: SpinnerService,
		private _dialog: MatDialog,
		private store: Store<AppState>,
		private fonctionnaireService: FonctionnaireService,
	) {
		// this.user =  this.store.pipe(select(currentUser));
		//this.SpinnerService.show();
		this.courrierId = window.localStorage.getItem("courrId");
		if (!this.courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-entrants"]);
			return;
		}

		setTimeout(() => {
			if (this.courrierId != null)
				this.files = this.service.getByIdCourrierFiles(this.courrierId);
			this.start = false;
		}, 1000);
	}
	// loadFonctionnaire(idFonctionnaire: any) : void {
	//
	// 	 this.fonctionnaireService.getFonctionnaireById(idFonctionnaire).subscribe((res: FonctionnaireEntityResponse) => {
	//
	// 	   console.log("res/////",res)
	// 	   this.fonctionnaireDTO = res.body ;
	// 	   console.log("[fonctionnaireDTO]: ", this.fonctionnaireDTO);
	// 	 })
	//    }
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		if (file == null) {
			return "-";
		} else {
			return this.service.getFileName(file);
		}
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		if (file == null) {
			return "-";
		} else {
			return this.service.getExtensionFile(file);
		}
	}
	// showSpinner() {
	// 	this.SpinnerService.show();
	// 	setTimeout(() => {
	// 		this.SpinnerService.hide();
	// 	}, 3000);
	// }
	// =================================================================
	//
	// =================================================================
	ngOnInit() {
		// this.user.subscribe(res=>{
		// 	console.log(res)
		// 	  this.idFonctionniare=res.id;
		// 	  console.log("[idUSER]: ",this.idFonctionniare)
		// 	  this.loadFonctionnaire(this.idFonctionniare)
		// 	})

		let courrierId = window.localStorage.getItem("courrId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-entrants"]);
			return;
		}
		// setTimeout(() => { this.SpinnerService.show() }, 25);
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.service
			.getObjectById("/courrierEntrants/show/", +courrierId)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			})).subscribe(
				(data) => {
					console.log(JSON.stringify(data, null, 2));
					this.detailscourrier = data;
					// setTimeout(() => { this.SpinnerService.hide() }, 2000);
				},
				(error) => {
					// setTimeout(() => { this.SpinnerService.hide() }, 1000);
					//this.SpinnerService.hide();
					console.log(error);
				}
			);
		this.fileHistorique = this.service.getFileByIdCourrier(this.courrierId);
		this.getCourriersEntrants(courrierId);

	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjCourriersEntrants/" + r);
	}
	onClickPjName1(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PJCourrierController/" + r);
	}
	// =================================================================
	//
	// =================================================================
	back() {
		let courrId33 = parseInt(localStorage.getItem("courrId33"));
		let idPers = parseInt(localStorage.getItem("idPers"));
		let idDiv = parseInt(localStorage.getItem("idDiv"));
		if (!isNaN(courrId33) && !isNaN(idPers) && !isNaN(idDiv)) {
			this.router.navigate(["personnel-courriers/show-courriers"], { queryParams: { id: idPers, div: idDiv } });
		}
		if(isNaN(courrId33) && isNaN(idPers) && isNaN(idDiv)) {
			this.router.navigate(["courriers-entrants/list-courriers-entrants"]);
		}
		/* this.location.back(); */
	}
	// =================================================================
	//
	// =================================================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// =================================================================
	// Recuperer tous les destinataire des courriers entrants
	// =================================================================
	private getCourriersEntrants(ce: any) {
		document.getElementById("destinataire").style.display = "none";
		this.service
			.getAllObjectById("/destinataireCouriers/find/", +ce)
			.subscribe(
				(data) => {
					if (data.length > 0) {
						document.getElementById("destinataire").style.display = "inline";
						this.isLoading = false;
						this.dataSource = new MatTableDataSource(data);
						// this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
						this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
						this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
						this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
						this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					}
				},
				(error) => console.log(error)
			);
	}
	// ============================================
	// Methode de modification des courriers entrants
	// ============================================
	editCourrierEntrant(): void {
		let courrierId = window.localStorage.getItem("courrId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-entrants"]);
			return;
		}
		window.localStorage.removeItem("courrId");
		window.localStorage.removeItem("courrId22");
		window.localStorage.setItem("courrId", courrierId);
		window.localStorage.setItem("courrId22", courrierId);
		this.router.navigate(["courriers-entrants/edit-courriers-entrants"]);
	}

	// ============================================
	// Destinataire courrier details
	// ============================================
	destinataireCourrierEntrant(): void {
		let courrierId = window.localStorage.getItem("courrId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-entrants"]);
			return;
		}
		//this.router.navigate(["destinataire-courrier/add-destinataire-courrier"]);
		this.router.navigate(["destinataire-courrier/add-destinataire"]);
	}
	// ===============================================
	// print reports
	// ===============================================
	printGenerator(): void {
		let courrierId = window.localStorage.getItem("courrId");
		this.service.PrintGenerator(courrierId).subscribe((res) => {
			const file = new Blob([res as unknown as BlobPart], { type: 'application/pdf' });
			const fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		})
	}
	// ============================================
	// File size converter
	// ============================================
	getFormattedFileSize(Fsize) {
		return this.service.getFormattedFileSizeService(Fsize);
	}
	// ============================================
	// File viewer
	// ============================================
	openDoc(pdfUrl: string, templateRef: TemplateRef<any>) {
		var r = pdfUrl.substring(0, pdfUrl.length - 4);
		this.pdfSrc = environment.API_ALFRESCO_URL + "/PjCourriersEntrants/" + r;
		let DialogConfig = new MatDialogConfig();
		DialogConfig.width = '600px';
		DialogConfig.height = '800px';
		DialogConfig.disableClose = true;
		this._dialog.open(templateRef, DialogConfig);

		this._dialog.afterAllClosed.subscribe((result) => {
		});
	}

	openDialog(pdfUrl: string, num: string) {
		console.log(pdfUrl, num)
		var r = pdfUrl.substring(0, pdfUrl.length - 4);
		this.pdfSrc = environment.API_ALFRESCO_URL + "/PjCourriersEntrants/" + r;
		const dialogRef = this._dialog.open(PdfviewerDialogComponent, {
			height: '500px',
			data: { title: num.substr(5, num.length - 5), pdfUrl: this.pdfSrc }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	openDialog1(pdfUrl: string, num: string) {
		console.log(pdfUrl, num)
		var r = pdfUrl.substring(0, pdfUrl.length - 4);
		this.pdfSrc = environment.API_ALFRESCO_URL + "/PJCourrierController/" + r;
		const dialogRef = this._dialog.open(PdfviewerDialogComponent, {
			height: '500px',
			data: { title: num.substr(5, num.length - 5), pdfUrl: this.pdfSrc }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	delete(id) {
		Swal.fire({
			title: "Voulez vous supprimer cet enregistrement ?",
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service.delete(id)
					.subscribe((data) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant(
								"PAGES.GENERAL.MSG_DEL_CONFIRMED"
							),
							showConfirmButton: false,
							timer: 1500,
						}).then(() => {
							this.ngOnInit();
						});
					}, (error) => {
						Swal.fire({
							position: 'center',
							icon: 'error',
							title: this.translate.instant(
								'PAGES.GENERAL.MSG_SAVED_NOCONFIRMED'
							),
							showConfirmButton: false,
							timer: 1500,
						});
					});

			}
		});

	}
	// ============================================
	// Historique courrier
	// ============================================
	historique(): void {
		Swal.fire({
			title: 'معلومات عن المراسلة',
			icon: 'info',
			confirmButtonText: 'حسنا',
			html: '<table width="100%" style="direction: rtl;">' +
				'<tbody>' +
				'<tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">أنشأ من طرف :</th>' +
				'<td style="font-size: 15px;" class="donnee_show">' + this.getCreator(this.detailscourrier.createurUser) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ الإنشاء :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.detailscourrier.creationDate) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ التعديل :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.detailscourrier.updateDate) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ التوجيه :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.detailscourrier.dispatchingDate) + '</td>' +
				'</tr>' +
				'</tbody>' +
				'</table>',
		})
	}
	getCreator(user): string {
		var result = "لا توجد معلومات";
		if (user != null) {
			result = this.detailscourrier.createurUser;
		}
		return result;
	}

	getDates(date): string {
		var result = "لا توجد معلومات";
		if (date != null) {
			result = formatDate(date, 'dd/MM/yyyy HH:mm', 'ar-MA');
		}
		return result;
	}
	selecetedFile = null;
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
		this.selecetedFile = event.target.files;
		this.allpjs.push(this.formPj);
	}
	saveinAlfreco() {

		let createurUser = window.localStorage.getItem("fullnameUser");

		console.log(this.allpjs.length)
		if (this.allpjs.length > 0) {
			for (var i = 0; i < this.allpjs.length; i++) {
				this.service.nouvellepj(this.allpjs[i].selecetedFile, this.courrierId, this.motif, "Courrier", createurUser)
					.subscribe((data) => {
						this.motif = "";
						this.allpjs = [];
						this.service.updateSatutCourrie(this.courrierId, 2).subscribe((data) => {

						});
						this.ngOnInit();
					});
			}
		}

		else {

			this.service.nouvellepj(null, this.courrierId, this.motif, "Courrier", createurUser)
				.subscribe((data) => {

					this.motif = "";
					this.allpjs = [];
					this.service.updateSatutCourrie(this.courrierId, 2).subscribe((data) => {

					});
					this.ngOnInit();
				});
		}

	}
	keyup(event) {
		this.motif = event.target.value;
		console.log("motif: " + this.motif);
	}
	cloture() {
		Swal.fire({
			icon: 'info',
			title: 'Souhaitez-vous cloturé cette courriel entrant ?',
			showDenyButton: false,
			showCancelButton: false,
			confirmButtonText: 'OUi',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service.updateSatutCourrie(this.courrierId, 3).subscribe((data) => {
					Swal.fire(' ', '', 'success')
				});

			}
		})

	}
}

