import { FilesUtilsService } from "./../../utils/files-utils.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { BiensService } from "../../shared/biens.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
	selector: "kt-biens-list",
	templateUrl: "./biens-list.component.html",
	styleUrls: ["./biens-list.component.scss"],
})
export class BiensListComponent implements OnInit {
	displayedColumns = ["nom", "type", "adresse", "actions"];
	dataSource: MatTableDataSource<Bien>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild("matPaginator7", { static: true }) paginator7: MatPaginator;
	@ViewChild("sort7", { static: true }) sort7: MatSort;
	bienDatasource: Bien[] = [];
	isLoading = true;
	constructor(
		private service: BiensService,
		private translate: TranslateService,
		private router: Router,
		private notification: NotificationService,
		private fileService: FilesUtilsService
	) {
		this.populate();
	}
	biens;
	datasize: number = 0;
	ngOnInit() {
		/* this.service.getAllBien().subscribe(data => {
      this.biens = data;
    });*/
	}

	populate() {
		const _this = this;
		this.service.getAllBien().then(
			(data) => {
				_this.datasize = data.length;
				this.bienDatasource = [];
				this.biens = data;
				for (let i = 0; i < this.biens.length; i++) {
					this.bienDatasource.push(this.createNewBien(i));
				}
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(this.bienDatasource);
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
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	createNewBien(i: number): Bien {
		return {
			id: this.biens[i].id,
			nom: this.biens[i].objetDemandeAutorisation,
			type: this.biens[i].typeObjetReservation.typeObjetAutorisation,
			adresse: this.biens[i].adresse,
			arrondissement: this.biens[i].arrondissement,
			quartier: this.biens[i].quartier,
		};
	}

	editbien(idrec) {
		this.router.navigate(["/autorisations/bien-edit"], {
			queryParams: { reclam: idrec },
		});
	}

	nouvellepp() {
		this.router.navigate(["/autorisations/bien-form"]);
	}

	showbien(rec) {
		this.router.navigate(["/autorisations/bien-detail"], {
			queryParams: { reclam: rec },
		});
	}

	deletepp(bienId) {
		this.service.deletebien(bienId).subscribe((res) => {
			this.populate();
		});
	}
}
export interface Bien {
	id: string;
	nom: string;
	type: String;
	adresse: string;
	arrondissement: string;
	quartier: string;
}
