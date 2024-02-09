
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ExcelAssociationService } from '../../utils/excel-association.service';


@Component({
  selector: 'kt-list-sous-espece',
  templateUrl: './list-sous-espece.component.html',
  styleUrls: ['./list-sous-espece.component.scss']
})
export class ListSousEspeceComponent implements OnInit {

  assoc: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"num",
		"nom",
		"tribunal",
		"defendresse",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
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

		private translate: TranslateService,
		private router: Router,

		private datePipe: DatePipe,
		private excelService: ExcelAssociationService,
	) {
		this.data = [{
			"num": "1",
			"nom": "nom affaire 1 ",
			"defendresse": "Commune Casablanca",
			"tribunal": "Tech ",
			"typeAffaire": "Administratif",
			"demandresse": "Partie  ",
			"dateDebut": "01-01-2020"
		},
		{
			"num": "2",
			"nom": "nom affaire 2",
			"defendresse": "CM ",
			"tribunal": "Tribunal ",
			"typeAffaire": "Indemnisation",
			"demandresse": "Partie",
			"dateDebut": "01-01-2020"
		},
		{
			"num": "3",
			"nom": "nom affaire 3",
			"defendresse": "Tech ",
			"tribunal": "Tech ",
			"typeAffaire": "Annulation",
			"demandresse": "Partie",
			"dateDebut": "01-01-2020"
		},
		{
			"num": "4",
			"nom": "nom affaire 4",
			"defendresse": "Tech ",
			"tribunal": "Tribunal ",
			"typeAffaire": "Annulation",
			"demandresse": "Partie",
			"dateDebut": "01-01-2020"
		},
		{
			"num": "5",
			"nom": "nom affaire 5",
			"defendresse": "Tech ",
			"tribunal": "Tech ",
			"typeAffaire": "Annulation",
			"demandresse": "CM",
			"dateDebut": "01-01-2020"
		}
		]


	}

	ngOnInit() {
		this.columns = ["num",
			"nom",
			"defendresse",
			"tribunal",
			"typeAffaire",
			"demandresse",
			"dateDebut"];
		this.dataSource = new MatTableDataSource(this.data);

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
	// Methode de suppression des associations
	// ============================================


	// ============================================
	// Methode d'insertion des associations
	// ============================================
	addAssociation(): void {
		this.router.navigate(["pages/audiences/edit-sous-espece"]);
	}
	add(): void {
		this.router.navigate(["pages/audiences/add-sous-espece"]);
	}

	consulterDetail(): void {
		this.router.navigate(["pages/affaires/show-affaire"]);

	}

	deleteAssociation(id: number): void {
		Swal.fire({
			title: 'Voulez vous supprimer cet enregistrement ?',
			icon: 'question',
			iconHtml: '?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'Oui',
			cancelButtonText: 'Non',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {

				Swal.fire({
					position: 'center',
					icon: 'success',
					title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
					showConfirmButton: false,
					timer: 1500
				})


			}
		})
	}

	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		//this.fileService.exportToExcel("exportData", this.translate.instant("PAGES.ASSOCIATION.TITRE_INDEX"));
		this.excelService.exportAsExcelFile('Liste audiences', '', this.columns, this.data, this.footerData, 'Liste-audiences', this.translate.instant("PAGES.AFFAIRE.TITRE_INDEX"))
	}
	createDataJson(i: number): excelData {
		return {
			num: this.assoc[i].num,
			nom: this.assoc[i].nom,
			defendresse: this.assoc[i].defendresse,
			tribunal: this.assoc[i].tribunal,
			typeAffaire: this.assoc[i].typeAffaire,
			demandresse: this.assoc[i].demandresse,
			dateDebut: this.datePipe.transform(this.assoc[i].dateDebut, "dd-MM-yyyy"),
		};
	}
}

export interface excelData {
	num: string;
	nom: string;
	defendresse: string;
	tribunal: string;
	typeAffaire: string;
	demandresse: string;
	dateDebut: string;

}


