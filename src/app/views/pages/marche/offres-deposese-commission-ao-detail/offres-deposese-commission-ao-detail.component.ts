import { Component, OnInit, ViewChild } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
	selector: "kt-offres-deposese-commission-ao-detail",
	templateUrl: "./offres-deposese-commission-ao-detail.component.html",
	styleUrls: ["./offres-deposese-commission-ao-detail.component.scss"],
})
export class OffresDeposeseCommissionAoDetailComponent implements OnInit {
	// =================================================================
	//
	// =================================================================
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }
	// =================================================================
	//
	// =================================================================
	dataSize: number = 0;
	isLoading = true;
	dataSize2: number = 0;
	isLoading2 = true;
	dataSize3: number = 0;
	isLoading3 = true;
	dataSize4: number = 0;
	isLoading4 = true;
	dataSize5: number = 0;
	isLoading5 = true;
	idao;
	idtypeCommission;
	OffresDeposees;
	displayedColumns = ["NomOrganisme", "rc", "tele", "deposee"];
	displayedColumnsODEvFinale = ["NomOrganisme", "rc", "tele", "reserve"];
	displayedColumnsODEvAdmin = [
		"NomOrganisme",
		"rc",
		"tele",
		"statut",
		"reserve",
	];
	// =================================================================
	//
	// =================================================================
	dataSource: MatTableDataSource<any>;
	dataSourceODEvAdmin: MatTableDataSource<any>;
	dataSourceODEvTechnique: MatTableDataSource<any>;
	dataSourceODEvFinanciere: MatTableDataSource<any>;
	dataSourceODEvFinale: MatTableDataSource<any>;
	// =================================================================
	//
	// =================================================================	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =================================================================
	//
	// =================================================================
	ngOnInit() {
		
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
			this.idtypeCommission = params["typecommission"];
			console.log(this.idtypeCommission);
		});
		this.getOffres();
		/* */
	}
	// =================================================================
	//
	// =================================================================
	async getOffres() {
		const _this = this;
		if (this.idtypeCommission == 1) {
			await this.service
				.getAllOffreDeposeeEvalAdmin(this.idao)
				.subscribe((data) => {
					_this.dataSize = data.length;
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
				}, (err) => {
					_this.dataSize = 0;
					console.log(err);
					this.isLoading = false;
				  });
		}
		if (this.idtypeCommission == 2) {
			await this.service
				.getAllOffreDeposeeEvalAdmin(this.idao)
				.subscribe((data2) => {
					// console.log("dataSourceODEvAdmin :::: " + JSON.stringify(data, null, 4));
					_this.dataSize2 = data2.length;
					this.isLoading2 = false;
					this.dataSourceODEvAdmin = new MatTableDataSource(data2);
				}, (err) => {
					_this.dataSize2 = 0;
					console.log(err);
					this.isLoading2 = false;
				  });
		}
		if (this.idtypeCommission == 3) {
			await this.service
				.getAllOffreDeposeeEvalTechnique(this.idao)
				.subscribe((data3) => {
					// console.log("Technique :::: " + JSON.stringify(data, null, 4));
					_this.dataSize3 = data3.length;
					this.isLoading3 = false;
					this.dataSourceODEvTechnique = new MatTableDataSource(data3);
				}, (err) => {
					_this.dataSize3 = 0;
					console.log(err);
					this.isLoading3 = false;
				  });
		}
		if (this.idtypeCommission == 4) {
			await this.service
				.getAllOffreDeposeeEvalFinanciere(this.idao)
				.subscribe((data4) => {
					_this.dataSize4 = data4.length;
					this.isLoading4 = false;
					this.dataSourceODEvFinanciere = new MatTableDataSource(data4);
				}, (err) => {
					_this.dataSize4 = 0;
					console.log(err);
					this.isLoading4 = false;
				  });
		}
		if (this.idtypeCommission == 5) {
			this.service
				.getAllOffreDeposeeEvalFinale(this.idao)
				.subscribe((data5) => {
					// console.log(data);
					_this.dataSize5 = data5.length;
					this.isLoading5 = false;
					this.dataSourceODEvFinale = new MatTableDataSource(data5);
				}, (err) => {
					_this.dataSize5 = 0;
					console.log(err);
					this.isLoading5 = false;
				  });
		}
	}
}
