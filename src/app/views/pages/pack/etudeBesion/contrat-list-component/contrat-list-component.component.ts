import { Component, OnInit, ViewChild } from '@angular/core';
import { ExcelFrService } from '../../../utils/excel-FR.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { User, currentUser } from '../../../../../core/auth';
import { ContratService } from '../../../shared/contrat.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../../core/reducers';

@Component({
  selector: 'kt-contrat-list-component',
  templateUrl: './contrat-list-component.component.html',
  styleUrls: ['./contrat-list-component.component.scss']
})
export class ContratListComponentComponent implements OnInit {
	data: any[] = [];
	sizeData2;
	columns: any[];
	footerData: any[][] = [];
	dataSource: MatTableDataSource<any>;
	user$: Observable<User>;
	isLoading2 = true;
	sizeData = 0;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(			private service: ContratService,
	private excelService: ExcelFrService,			private store: Store<AppState>,
	private translate: TranslateService,		private router: Router,


    ) { }
	displayedColumns = [
		"objet",
		// "raisonSociale", 
		"typePrestation",
	
		

		"actions",
	];
  ngOnInit() {
	this.user$ = this.store.pipe(select(currentUser));

	this.user$.subscribe((user: User) => {

		//var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
		// if (user) {
			
			console.log("lllllllllllllllllllllll", user.fullname);
			// console.log(user.fullname);
			
			this.service.getAllContratByCreateurUser(user.fullname).then((data) => {
				this.data = data.content;
				this.isLoading2 = false;
				this.sizeData = data.length;
				this.dataSource = new MatTableDataSource(data.content);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				
				//this.spinnerService.stop(spinnerRef);
			}, 
				(err) => {
					console.log(err);
					this.isLoading2 = false;
					//this.spinnerService.stop(spinnerRef);
				});
		// } else {
		// 	this.service.getAllAo().then((data) => {
		// 		this.data = data;
		// 		this.isLoading = false;
		// 		this.sizeData = data.length;
		// 		this.dataSource = new MatTableDataSource(data);
		// 		this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
		// 		this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
		// 		this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
		// 		this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
		// 		this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
		// 		this.dataSource.paginator = this.paginator;
		// 		this.dataSource.sort = this.sort;
		// 		;

		// 		//	this.spinnerService.stop(spinnerRef);// stop spinner
		// 	},
		// 		(err) => {
		// 			console.log(err);
		// 			this.isLoading = false;
		// 			//this.spinnerService.stop(spinnerRef);// stop spinner
		// 		});
		// }
	});
  }
  applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
  nouvelleao() {
		this.router.navigate(["/programme/add-BesionConsultationContrat"]);
	}

	handlePageEvent(event){
		
	}
  exportTable() {
		let data2: any[] = this.data;
		let json = data2.map((item) => new excelDataLB(item));
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.any.TITRE_INDEX"));
		this.excelService.exportAsExcelFile('Liste des besoins', '', this.columns, json, this.footerData, 'Liste-Besoins', this.translate.instant("PAGES.MARCHE.any.TITRE_INDEX"))
	}

	showBC(row) {
		this.router.navigate(["/marches/contrat-consultation-detail"], {
			queryParams: { id: row },
		});
	}
	editBonCommand(row) {
		this.router.navigate(["/programme/contrat-edit"], {
			queryParams: { id: row },
		});
	}
}
export class excelDataLB {
	numeroAO: string;
	objet: string;
	objetAr: string;
	budget: string;
	caution: string;
	dateReception: string;
	dateOuverturePlis: string;
	typeMarche: string;
	natureAO: string;
	statut: string;
	modePassation: string;
	seuilMinimal: string;
	typeAO: string;
	naturePrix: string;
	typePrestation: string;
	sousTypePrestation: string;
	motifAnnulation: string;

	constructor(item: any) {
		if (item[0] != '') {
			this.numeroAO = item[0];
		}
		else {
			this.numeroAO = '';
		}

		if (item[1] != '') {
			this.objet = item[1];
		}
		else {
			this.objet = '';
		}

		if (item[8] != '') {
			this.objetAr = item[8];
		}
		else {
			this.objetAr = '';
		}

		if (item[2] != '') {
			this.budget = item[2];
		}
		else {
			this.budget = '';
		}

		if (item[9] != '') {
			this.caution = item[9];
		}
		else {
			this.caution = '';
		}

		this.dateReception = '';

		this.dateOuverturePlis = '';

		if (item[4] != '') {
			this.typeMarche = item[4];
		}
		else {
			this.typeMarche = '';
		}

		if (item[5] != '') {
			this.natureAO = item[5];
		}
		else {
			this.natureAO = '';
		}

		if (item[3] != '') {
			this.statut = item[3];
		}
		else {
			this.statut = '';
		}

		if (item[5] != '') {
			this.modePassation = item[5];
		}
		else {
			this.modePassation = '';
		}

		this.seuilMinimal = '';

		if (item[17] != '') {
			this.typeAO = item[17];
		}
		else {
			this.typeAO = '';
		}

		if (item[18] != '') {
			this.naturePrix = item[18];
		}
		else {
			this.naturePrix = '';
		}

		if (item[20] != '') {
			this.typePrestation = item[20];
		}
		else {
			this.typePrestation = '';
		}

		if (item[19] != '') {
			this.sousTypePrestation = item[19];
		}
		else {
			this.sousTypePrestation = '';
		}

		this.motifAnnulation = '';

	}
	showHandlePageEvent: boolean = false;

	handlePageEvent(event: PageEvent) {
		if (this.showHandlePageEvent == true) {
			let pageSize = event.pageSize;
			let pageIndex = event.pageIndex;
			// if (this.isSearch == true) {
			// 	if (this.formGroup.value.loi != "") {
			// 		this.formGroup.value.loi = parseInt(this.formGroup.value.loi);
			// 	} else {
			// 		this.formGroup.value.loi = parseInt('0');
			// 	}
			// 	if (this.formGroup.value.budgetEstimatif != "") {
			// 		this.formGroup.value.budgetEstimatif = parseInt(this.formGroup.value.budgetEstimatif);
			// 	} else {
			// 		this.formGroup.value.budgetEstimatif = parseInt('0');
			// 	}

			// 	if (this.formGroup.value.estimation != "") {
			// 		this.formGroup.value.estimation = parseInt(this.formGroup.value.estimation);
			// 	} else {
			// 		this.formGroup.value.estimation = parseInt('0');
			// 	}

			// 	if (this.formGroup.value.caution != "") {
			// 		this.formGroup.value.caution = parseInt(this.formGroup.value.caution);
			// 	} else {
			// 		this.formGroup.value.caution = parseInt('0');
			// 	}
			// 	if (this.formGroup.value.existanceAgrement == true) {
			// 		this.formGroup.value.existanceAgrement = 1
			// 	}		
			// 	if (this.formGroup.value.existanceAgrement == false) {
			// 		this.formGroup.value.existanceAgrement = 0
			// 	}
			
			// 	if (this.formGroup.value.existQualification == true) {
			// 		this.formGroup.value.existQualification = 1
			// 	}		
			// 	if (this.formGroup.value.existQualification == false) {
			// 		this.formGroup.value.existQualification = 0
			// 	}
			
	
			// 	if (this.formGroup.value.existEchantillon == true) {
			// 		this.formGroup.value.existEchantillon = 1
			// 	}
			// 	if (this.formGroup.value.existanceVisite == false) {
			// 		this.formGroup.value.existEchantillon = 0
			// 	}
	
			// 	if (this.formGroup.value.existanceVisite == true) {
			// 		this.formGroup.value.existanceVisite = 1
			// 	}
			// 	if (this.formGroup.value.existanceVisite == false) {
			// 		this.formGroup.value.existanceVisite = 0
			// 	}
			// 	if (this.formGroup.value.sendToServiceMarche == true) {
			// 		this.formGroup.value.sendToServiceMarche = 1
			// 	}
			// 	if (this.formGroup.value.sendToServiceMarche == false) {
			// 		this.formGroup.value.sendToServiceMarche = 0
			// 	}
			// 	this.user$.subscribe((user1: User) => {
			// 		this.formGroup.value.createurUser = user1.fullname;
			// 	})
			// 	this.service.research(pageIndex, pageSize, this.formGroup.value).subscribe(
			// 		(res: any) => {
			// 			console.log(res);
			// 			this.data = res.content;
			// 			this.isLoading2 = false;
			// 			//this.sizeData2 = res.totalElements;
			// 			this.dataSource2 = new MatTableDataSource(res.content);
			// 			// this.showHandlePageEvent = true;
			// 			/* this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
			// 			this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
			// 			this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
			// 			this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
			// 			this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
			// 			this.dataSource2.paginator = this.paginator;
			// 			this.dataSource2.sort = this.sort; */
			// 		},
			// 		(err) => {
			// 			console.log(err);
			// 		}
			// 	);
			// }
		}
	}
}