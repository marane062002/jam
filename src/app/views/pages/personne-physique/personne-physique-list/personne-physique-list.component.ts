import { NotificationService } from "./../../shared/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PersonnePhysiqueService } from "../../shared/personne-physique.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { FilesUtilsService } from "../../utils/files-utils.service";

@Component({
	selector: "app-personne-physique-list",
	templateUrl: "./personne-physique-list.component.html",
	styleUrls: ["./personne-physique-list.component.css"],
})
export class PersonnePhysiqueListComponent implements OnInit {
	// =======================================================
	//
	// =======================================================
	displayedColumns = [
		//"id",
		"prenom",
		"nom",
		"cin",
		"teleGsm",
		"mail",
		"adresse",
		"actions",
	];
	// =======================================================
	//
	// =======================================================
	dataSource: MatTableDataSource<PPSource>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild("matPaginator7", { static: true }) paginator7: MatPaginator;
	@ViewChild("sort7", { static: true }) sort7: MatSort;
	ppsourceDatasource: PPSource[] = [];
	// =======================================================
	//
	// =======================================================
	constructor(
		private service: PersonnePhysiqueService,
		private translate: TranslateService,
		private router: Router,
		private notification: NotificationService,
		private fileService: FilesUtilsService
	) {
		this.populate();
	}
	// =======================================================
	//
	// =======================================================
	pps;
	isLoading = true;
	datasize: number = 0;
	// =======================================================
	//
	// =======================================================
	ngOnInit() {
		/*this.service.getallpp().subscribe(data => {
      this.pps = data;
    });*/
	}
	// =======================================================
	//
	// =======================================================
	populate() {
		const _this = this;
		this.service.getallpp().then(
			(data) => {
				_this.datasize = data.length;
				this.ppsourceDatasource = [];
				this.pps = data;
				for (let i = 0; i < this.pps.length; i++) {
					this.ppsourceDatasource.push(this.createNewPPsource(i));
				}
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(
					this.ppsourceDatasource
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
	// =======================================================
	//
	// =======================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// =======================================================
	//
	// =======================================================
	createNewPPsource(i: number): PPSource {
		return {
			id: this.pps[i].id,
			nom: this.pps[i].nom,
			prenom: this.pps[i].prenom,
			cin: this.pps[i].cin,
			teleGsm: this.pps[i].telephoneGsm,
			mail: this.pps[i].eMail,
			adresse: this.pps[i].adresse,
		};
	}
	// =======================================================
	//
	// =======================================================
	editpp(idrec) {
		this.router.navigate(["/personne-physique/personne-physique-edit"], {
			queryParams: { id: idrec },
		});
	}
	// =======================================================
	//
	// =======================================================
	nouvellepp() {
		this.router.navigate(["/personne-physique/personne-physique-form"]);
	}
	// =======================================================
	//
	// =======================================================
	showpp(rec) {
		this.router.navigate(["/personne-physique/personne-physique-detail"], {
			queryParams: { id: rec },
		});
	}
	// =======================================================
	//
	// =======================================================
	deletepp(ppId) {
		this.service.deletepp(ppId).subscribe((res) => {
			this.populate();
		});
	}
	// =======================================================
	//
	// =======================================================
	refresh() {
		this.service.getallpp().then((data) => {
			this.pps = data;
		});
	}
}

export interface PPSource {
	id: string;
	nom: string;
	prenom: string;
	cin: string;
	teleGsm: string;
	mail: string;
	adresse: string;
}
