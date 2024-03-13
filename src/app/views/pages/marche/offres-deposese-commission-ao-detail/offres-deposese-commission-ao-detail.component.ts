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
			await this.service
			.findByStatut_IdAndAo_Id(1,this.idao)
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
}
