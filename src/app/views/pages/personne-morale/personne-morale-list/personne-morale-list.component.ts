import { FilesUtilsService } from "./../../utils/files-utils.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PersonneMoraleService } from "../../shared/personne-morale.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";

@Component({
	selector: "app-personne-morale-list",
	templateUrl: "./personne-morale-list.component.html",
	styleUrls: ["./personne-morale-list.component.css"],
})
export class PersonneMoraleListComponent implements OnInit {
	// ==============================================================
	//
	// ==============================================================
	displayedColumns = [
		//"id",
		"nom",
		"rc",
		"idf",
		"numeroPatente",
		"teleFix",
		"mail",
		//"adresse",
		"actions",
	];
	// ==============================================================
	//
	// ==============================================================
	dataSource: MatTableDataSource<PMSource>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild("matPaginator7", { static: true }) paginator7: MatPaginator;
	@ViewChild("sort7", { static: true }) sort7: MatSort;
	datasize: number = 0;
	isLoading = true;
	reclamationsDatasource: PMSource[] = [];
	// ==============================================================
	//
	// ==============================================================
	constructor(
		private service: PersonneMoraleService,
		private translate: TranslateService,
		private router: Router,
		private notification: NotificationService,
		private fileService: FilesUtilsService
	) {}
	pms;
	// ==============================================================
	//
	// ==============================================================
	ngOnInit() {
		this.populate();
		this.service.getallpm().then((data) => {
			console.log(data);
			this.pms = data;
		});
	}
	// ==============================================================
	//
	// ==============================================================
	populate() {
		const _this = this;
		this.service.getallpm().then(
			(data) => {
				_this.datasize = data.length;
				this.reclamationsDatasource = [];
				this.pms = data;
				for (let i = 0; i < this.pms.length; i++) {
					this.reclamationsDatasource.push(this.createNewPMSource(i));
				}
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(
					this.reclamationsDatasource
				);
				this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
				this.paginator._intl.nextPageLabel = "الصفحة التالية";
				this.paginator._intl.previousPageLabel = "الصفحة السابقة";
				this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
				this.paginator._intl.firstPageLabel = "الصفحة الأولى";
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				//this.dataSource.filter = "1";
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}
	// ==============================================================
	//
	// ==============================================================
	createNewPMSource(i: number): PMSource {
		return {
			id: this.pms[i].id,
			nom: this.pms[i].nom,
			rc: this.pms[i].rc,
			idf: this.pms[i].identifiantFiscal,
			numeroPatente: this.pms[i].numeroPatente,
			teleFix: this.pms[i].teleFixe,
			adresse: this.pms[i].adresse,
			mail: this.pms[i].eMail,
		};
	}
	// ==============================================================
	//
	// ==============================================================
	applyFilter(filterValue: string) {
		console.log(filterValue);
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ==============================================================
	//
	// ==============================================================
	editpm(idrec) {
		this.router.navigate(["/personne-morale/personne-morale-edit"], {
			queryParams: { id: idrec },
		});
	}
	// ==============================================================
	//
	// ==============================================================
	nouvellepm() {
		this.router.navigate(["/personne-morale/personne-morale-form"]);
	}
	// ==============================================================
	//
	// ==============================================================
	showpm(rec) {
		this.router.navigate(["/personne-morale/personne-morale-detail"], {
			queryParams: { id: rec },
		});
	}
	// ==============================================================
	//
	// ==============================================================
	deletepm(pmId) {
		this.service.deletepm(pmId).subscribe((res) => {
			this.populate();
		});
	}
	// ==============================================================
	//
	// ==============================================================
	refresh() {
		this.service.getallpm().then((data) => {
			this.pms = data;
		});
	}
}
export interface PMSource {
	id: string;
	nom:string;
	rc: string;
	idf: string;
	numeroPatente: string;
	teleFix: string;
	mail: string;
	adresse: string;
}
