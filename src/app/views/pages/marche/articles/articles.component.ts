import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ConsultationService } from "../../shared/consultation.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
	selector: "kt-articles",
	templateUrl: "./articles.component.html",
	styleUrls: ["./articles.component.scss"],
})
export class ArticlesComponent implements OnInit {
	// ====================================================
	//
	//=====================================================
	displayedColumns = ["numRef", "libelle", "description", "actions"];
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	constructor(
		private service: ConsultationService,
		private router: Router,
		private location: Location
	) {}
	// ====================================================
	//
	//=====================================================
	ngOnInit() {
		this.service.getAllArticles().subscribe((data) => {
			console.log(data);
			this.dataSource = new MatTableDataSource(data);
			this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
			this.paginator._intl.nextPageLabel = "الصفحة التالية";
			this.paginator._intl.previousPageLabel = "الصفحة السابقة";
			this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
			this.paginator._intl.firstPageLabel = "الصفحة الأولى";
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}
	// ====================================================
	//
	//=====================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ====================================================
	//
	//=====================================================
	nouveauArtcile() {
		this.router.navigate(["/marches/article-form"]);
	}
	// ====================================================
	//
	//=====================================================
	editconsultation(id) {}
	// =================================================================
	//
	// =================================================================
	back() {
		//this.location.back();
		this.router.navigate(["/marches/consultation-list"]);
	}
}
