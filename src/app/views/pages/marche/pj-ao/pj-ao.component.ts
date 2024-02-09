import { Component, OnInit, ViewChild } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { environment } from "../../../../../environments/environment";
import { Observable } from 'rxjs';

@Component({
	selector: "kt-pj-ao",
	templateUrl: "./pj-ao.component.html",
	styleUrls: ["./pj-ao.component.scss"], 
})
export class PjAoComponent implements OnInit {
	// ============================================================
	// 
	// ============================================================
	pjs;
	isLoading = true;
	files: Observable<any>;
	start: boolean = true;
	// ============================================================
	// 
	// ============================================================
	constructor(
		private service: AoService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
			console.log("id AO :: " + this.idao)
		});
		setTimeout(() => {
			if (this.idao != null)
				this.files = this.service.getAllPjAo(this.idao);
			console.log("Files :: " + JSON.stringify(this.files, null, 2))
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.service.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.service.getExtensionFile(file);
	}
	// ============================================================
	// 
	// ============================================================
	displayedColumns = ["id", "type", "nom", "actions"];
	dataSource: MatTableDataSource<any>;
	idao;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================================
	// 
	// ============================================================
	ngOnInit() {

	}
	// ============================================================
	// 
	// ============================================================
	onClickPj(e, id) {
		var r = e.substring(0, e.length - 4);
		window.open(environment.API_ALFRESCO_URL + "/PjAoG/" + r, "_blank");
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// ============================================================
	// 
	// ============================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	/*
	populate(id) {
		this.service.getAllPjAo(id).then((data) => {
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
	*/
}
