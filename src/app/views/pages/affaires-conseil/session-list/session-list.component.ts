import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-session-list",
	templateUrl: "./session-list.component.html",
	styleUrls: ["./session-list.component.scss"],
})
export class SessionListComponent implements OnInit {
	//==============================================================
	//
	//==============================================================
	isLoading = true;
	showAdd = true;
	dataSize = 0;
	//==============================================================
	//
	//==============================================================
	displayedColumns = [
		"numSession",
		"nomSession",
		"type",
		"dateDebutSession",
		"dateFinSession",
		"statut",
		"actions",
	];
	//==============================================================
	//
	//==============================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	//==============================================================
	//
	//==============================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router
	) {}
	//==============================================================
	//
	//==============================================================
	ngOnInit() {
		this.getSessions();
		this.service.getSessionOperationnelle().subscribe((res) => {
			console.log(res.length);
			if (res.length == 2) {
				this.showAdd = false;
			}
		});
	}
	//==============================================================
	//
	//==============================================================
	async getSessions() {
		const _this = this;
		await this.service.getAllSession().subscribe((data) => {
			this.isLoading = false;
			_this.dataSize = data.lenght;
			this.dataSource = new MatTableDataSource(data);
			this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
			this.paginator._intl.nextPageLabel = "الصفحة التالية";
			this.paginator._intl.previousPageLabel = "الصفحة السابقة";
			this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
			this.paginator._intl.firstPageLabel = "الصفحة الأولى";
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		},
		(err) => {
			console.log(err);
			this.isLoading = false;
		});
	}
	//==============================================================
	//
	//==============================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	//==============================================================
	//
	//==============================================================
	nouveauArtcile() {
		this.router.navigate(["/affaires-conseil/session-form"]);
	}
	//==============================================================
	//
	//==============================================================
	editSession(row) {
		this.router.navigate(["/affaires-conseil/session-edit"], {
			queryParams: { id: row },
		});
	}
	//==============================================================
	//
	//==============================================================
	showSession(row) {
		this.router.navigate(["/affaires-conseil/session-detail"], {
			queryParams: { id: row },
		});
	}
	//==============================================================
	//
	//==============================================================
	exportTable(){
		"لائحة الدورات"
	}
}
