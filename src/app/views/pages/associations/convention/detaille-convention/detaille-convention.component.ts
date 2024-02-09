
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource, MatAccordion } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Observer, BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';
import { delay, map, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { AssociationService } from "../../../utils/association.service";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { SpinnerService } from "../../../utils/spinner.service";
import { ConventionMarcheService } from "../../../shared/conventionService";

@Component({
  selector: 'kt-detaille-convention',
  templateUrl: './detaille-convention.component.html',
  styleUrls: ['./detaille-convention.component.scss']
})
export class DetailleConventionComponent implements OnInit {

	@ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
	// ============================================
	// Datasource mandat
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	history: boolean = false;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"dateDebut",
		"dateFin",
		"dureeMandat",
		"president",
		//"vicePresident",
		"nbrMmbr",
		"nbrH",
		"nbrF",
		"actions",
	];


	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =====================================
	// Declarations
	// =====================================

	selected = new FormControl(0);
	id: number;
	details;
	isLoadingResults = true;
	files: Observable<any>;
	start: boolean = true;
	assocInfo: boolean = false;
	nbMembre: number = 0;
	nbrH: number = 0;
	nbrF: number = 0;
	mandatDatasource: MANDATS[] = [];
	mandatList: Array<{ id: string, dateD: string, dateF: String, mandat: string, duree: string, totalMmbre: number, totalMmbreH: number, totalMmbreF: number }> = [];
	tab: Array<{ totalMmbreH: number, totalMmbreF: number }> = [];
	mandatdata: any;
	public obs$: Observable<any[]>
	myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	varData: any;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: AssociationService,
		private router: Router,
		private route: ActivatedRoute,
		private translate: TranslateService,
		private fileService: FilesUtilsService,
		private spinnerService: SpinnerService,
		private fileUtils:FilesUtilsService,
		private conventionMarcheService:ConventionMarcheService
	) {
		// Charger la liste des mandats
	//	this.getMandatBureau();

		//this.getConvention();


	}
	// =====================================
	// Afficher les details association
	// =====================================
	ngOnInit() {

		
		this.route.queryParams.subscribe(params => {
			this.id = params['id'];
		});
		this.conventionMarcheService.findById(this.id).subscribe(res=>{
			console.log(res);
			this.details=res;
			var b = { index: 0 };
					this.changeTab(b);
		},err=>{
			console.log(err)
		})
		this.files = this.conventionMarcheService.getByIdFiles(this.id);
	} 
	// =====================================
	// back to list
	// =====================================
	back() {
		//this.location.back();
		this.router.navigate(["pages/Convention/list-convention"]);
	}
	// ============================================
	//
	// ============================================
	private getMandatBureau() {
	/*	var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

		this.mandatDatasource = [];
		this.mandatList = [];
		this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/mandatBureau/association/", this.id)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			}))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.mandatdata = data;
					console.log('Mandat liste : ' + JSON.stringify(data, null, 2))
					this.dataSource = new MatTableDataSource(data);
					this.isLoadingResults = false;
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
					this.isLoadingResults = false;
				}
			);
			*/
	}
	createMandat(i: number): MANDATS {
		let th = 2;
		let tf = 1;
		return {
			id: this.mandatdata[i][5],
			dateD: this.mandatdata[i][1],
			dateF: this.mandatdata[i][2],
			mandat: this.mandatdata[i][3],
			duree: this.mandatdata[i][4],
			totalMmbre: this.mandatdata[i][0],
			totalMmbreH: th,
			totalMmbreF: tf,
		};
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
	// Ajouter mandat
	// ============================================
	addMandat() {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["associations/add-mandat/" + this.id]);
	}

	// ============================================
	// Methode de suppression des mandats
	// ============================================
	deleteMandat(id): void {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service
				.deleteObject("/mandatBureau/delete/", id)
				.subscribe((data) => {
					console.log("getId :" + id);
					this.getMandatBureau();
				});

		}
	}
	// ============================================
	// Methode de modification des associations
	// ============================================
	editAssociation(): void {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["associations/edit-association/" + this.id]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.fileService.exportToExcel("exportDataMandat", this.translate.instant("PAGES.MANDAT.TITRE_INDEX"));
	}
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
	// ============================================
	// Show info panel
	// ============================================
	openInfo() {
		this.assocInfo = !this.assocInfo;
	}
	changeTab(a) {
		console.log(a)
		if (a.index == 0) {
			this.router.navigate(["convention/detailleConvention/Autorisation"], {
				queryParams: { id: this.id },
			});
		}
		if (a.index == 1) {
			this.router.navigate(["convention/detailleConvention/engagement"], {
				queryParams: { id: this.id },
			});
		}
		if (a.index == 2) {
			this.router.navigate(["convention/detailleConvention/Buts"], {
				queryParams: { id: this.id },
			});
		}

		if (a.index == 3) {
			this.router.navigate(["convention/detailleConvention/Contribution"], {
				queryParams: { id: this.id },
			});
		}

		if (a.index == 4) {
			this.router.navigate(["convention/detailleConvention/avance"], {
				queryParams: { id: this.id },
			});
		}
		if (a.index == 5) {
			this.router.navigate(["convention/detailleConvention/Suivi"], {
				queryParams: { id: this.id },
			});
		}
		if (a.index == 6) {
			this.router.navigate(["convention/detailleConvention/Conflit"], {
				queryParams: { id: this.id },
			});
		}
		if (a.index == 7) {
			this.router.navigate(["/convention/detailleConvention/audit"], {
				queryParams: { id: this.id },
			});
		}

		
	
	}
	FileName(file){
		return this.fileUtils.getFileName(file);
	}
		// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.fileUtils.getExtensionFile(file);
	}
}
export interface MANDATS {
	id: string;
	dateD: string;
	dateF: String;
	mandat: string;
	duree: string;
	totalMmbre: number;
	totalMmbreH: number;
	totalMmbreF: number;
}
