import { Component, OnInit, ViewChild } from '@angular/core';
import { AO } from '../models/ao';
import { ExcelFrService } from '../../utils/excel-FR.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { Router } from '@angular/router';
import { AoValidationDialogComponent } from '../ao-validation-dialog/ao-validation-dialog.component';

@Component({
  selector: 'kt-gestion-commission-ouverture-plis',
  templateUrl: './gestion-commission-ouverture-plis.component.html',
  styleUrls: ['./gestion-commission-ouverture-plis.component.scss']
})
export class GestionCommissionOuverturePlisComponent implements OnInit {
	data: AO[] = [];
	columns: any[];
	footerData: any[][] = [];
	dataSource: MatTableDataSource<AO>;
	isLoading = true;
	sizeData2 = 0;
	showHandlePageEvent: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = [
		//"numAo",
		"objet",
		"objetAR", //
		"natureAo", //
		"budgetEstimatif",
		"caution", //
		"dateReception",//
		//"division",//
		"typeMarche",
		"dateOuverturePlis", //
		"heureOuverturePlis", //
		"modePassation", //
		"typeAO", //
		"naturePrix", //
		"typePrestation", //
		"sousTypePrestation", //
		"isValideDg", //
		"isValideTresorerie", //
		"isValideSG", //
		"statutAo",
		"etatCommentaire",

		"motifAnnulation", //
		"actions",
	];
  constructor(			public dialog: MatDialog,
	private router: Router,
	private excelService: ExcelFrService,		private translate: TranslateService,		private service: AoService,


    ) { }

  ngOnInit() {
    this.service.findAllByPagesByEtatCommentaire(1).then((data) => {
      this.data = data.content;
      this.isLoading = false;
      this.sizeData2 = data.totalElements;
      this.showHandlePageEvent = true;

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
        this.isLoading = false;
        //this.spinnerService.stop(spinnerRef);
      });
  }


	exportTable() {
		let data2: any[] = this.data;
		let json = data2.map((item) => new excelDataLB(item));
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"));
		this.excelService.exportAsExcelFile('Liste des consultations validé', '', this.columns, json, this.footerData, 'Liste-Besoins', this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"))
	}
  applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	showao(idAo) {
		this.router.navigate(["/marches/ao-consultation-detail"], {
			queryParams: { id: idAo, page: 1 },
		});
	}
	showRefAndDate(id){
		this.dialog.open(AoValidationDialogComponent, {
			data: { id:id },
			width: '440px'
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
}