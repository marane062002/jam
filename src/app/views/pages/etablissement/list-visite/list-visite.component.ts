import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
	selector: "kt-list-visite",
	templateUrl: "./list-visite.component.html",
	styleUrls: ["./list-visite.component.scss"],
})
export class ListVisiteComponent implements OnInit {
	TypeAlert: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"Date",
		"Heure",
		"Type",
		"SousType",
		"etablissement",
		"Status",
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

	constructor(
		private translate: TranslateService,
		private router: Router,

		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
	) {
		this.data = [
			{
				Id: "01",
				Date: "Date 1",
				Heure: "Heure 1",
				Type: "Type 1",
				SousType: "SousType 1 ",
				etablissement: "etablissement 1",
				Status: "Status 1",
			},
			{
				Id: "02",
				Date: "Date 2",
				Heure: "Heure 2",
				Type: "Type 1",
				SousType: "SousType 2 ",
				etablissement: "",
				Status: "Status 1",
			},
			{
				Id: "03",
				Date: "Date 3",
				Heure: "Heure 3",
				Type: "Type 1",
				SousType: "SousType 3 ",
				etablissement: "etablissement 3",
				Status: "Status 1",
			},
			{
				Id: "04",
				Date: "Date 4 ",
				Heure: "Heure 4",
				Type: "Type 1",
				SousType: "SousType 4",
				etablissement: "",
				Status: "Status 1",
			},
		];
	}

	ngOnInit() {
		this.columns = [
			"Id",
			"Date",
			"Heure",
			"Type",
			"SousType",
			"etablissement",
			"Status",
		];
		this.dataSource = new MatTableDataSource(this.data);
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	/*
	addAssociation(): void {
	  this.router.navigate(["pages/Projet/add-projet"]);
	}
	*/
	DetailAssociation(): void {
		this.router.navigate(["/etablissement/detaille-visite"]);
	}

	ModifierAssociation(): void {
		this.router.navigate(["/etablissement/upd-visite"]);
	}

	ficheTechnique() {
		this.router.navigate(["/etablissement/fiche-technique"]);
	}

	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			Date: this.TypeAlert[i].Date,
			Heure: this.TypeAlert[i].Heure,
			Type: this.TypeAlert[i].Type,
			SousType: this.TypeAlert[i].SousType,
			etablissement: this.TypeAlert[i].etablissement,
			Status: this.TypeAlert[i].Status,
		};
	}
}
export interface excelData {
	Id: string;
	Date: string;
	Heure: string;
	Type: string;
	SousType: string;
	etablissement: string;
	Status: string;
}
