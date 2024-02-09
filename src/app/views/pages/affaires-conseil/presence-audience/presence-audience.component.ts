import { Component, OnInit, ViewChild } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { forkJoin } from "rxjs";
import { PersonnelService } from "../../rh/services/personnel.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "kt-presence-audience",
	templateUrl: "./presence-audience.component.html",
	styleUrls: ["./presence-audience.component.scss"],
})
export class PresenceAudienceComponent implements OnInit {
	// ========================================================================
	//
	// ========================================================================
	displayedColumns = ["nom", "role", "presence", "justif"];
	displayedColumns1 = ["nom", "presence", "justif"];
	displayedColumns2 = ["nom", "organisme", "presence", "justif"];
	// ========================================================================
	//
	// ========================================================================
	dataSource: MatTableDataSource<any>;
	dataSource1: MatTableDataSource<any>;
	dataSource2: MatTableDataSource<any>;
	// ========================================================================
	//
	// ========================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	idAudience;
	idMondat;
	// ========================================================================
	//
	// ========================================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
		private service1: PersonnelService
	) {}
	// ========================================================================
	//
	// ========================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idAudience = params["id"];
			this.idMondat = params["idMondat"];
			console.log(this.idMondat);
		});
		this.service
			.getPersonnelByAudience(this.idAudience)
			.subscribe((data) => {
				this.dataSource1 = new MatTableDataSource(data);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant(
					"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
				);
				this.paginator._intl.nextPageLabel = this.translate.instant(
					"PAGES.GENERAL.NEXT_PAGE_LABEL"
				);
				this.paginator._intl.previousPageLabel = this.translate.instant(
					"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
				);
				this.paginator._intl.lastPageLabel = this.translate.instant(
					"PAGES.GENERAL.LAST_PAGE_LABEL"
				);
				this.paginator._intl.firstPageLabel = this.translate.instant(
					"PAGES.GENERAL.FIRST_PAGE_LABEL"
				);
				for (let i = 0; i < this.dataSource1.data.length; i++) {
					this.getPersonnel(this.dataSource1.data[i].personnel, i);
				}
				console.log(this.dataSource1.data);
			});
		this.service
			.getMembreConvoqueByAudience(this.idAudience)
			.subscribe((data) => {
				this.dataSource2 = new MatTableDataSource(data);
				console.log(data);
			});
		this.service
			.getMembreBureauByAudience(this.idAudience)
			.subscribe((data) => {
				this.dataSource = new MatTableDataSource(data);
				console.log(data);
			});
	}
	// ========================================================================
	//
	// ========================================================================
	async getPersonnel(iduser, i) {
		await this.service1.getProfileById(iduser).subscribe((data) => {
			this.dataSource1.data[i].testshow =
				data[0].nom + " " + data[0].prenom;
		});
	}
	// ========================================================================
	//
	// ========================================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ========================================================================
	//
	// ========================================================================
	send() {
		forkJoin(
			this.service.sendmembreBureauAudience(this.dataSource.data),
			this.service.sendPersonnelsAudience(this.dataSource1.data),
			this.service.sendMembresConcoquesAudience(this.dataSource2.data)
		).subscribe((resfork) => {
			this.router.navigate(
				["/affaires-conseil/evaluation-points-audience"],
				{ queryParams: { id: this.idAudience } }
			);
		});
	}
}
