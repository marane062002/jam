import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ConsultationService } from '../../shared/consultation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-bon-commande-list-adjuge',
  templateUrl: './bon-commande-list-adjuge.component.html',
  styleUrls: ['./bon-commande-list-adjuge.component.scss']
})
export class BonCommandeListAdjugeComponent implements OnInit {

  constructor(private service1: ConsultationService, private router: Router) {
		this.getBC();
	}
	// =========================================================================
	//
	// =========================================================================
	displayedColumns = [
		"id",
		"refDeBC",
		"objet",
		"numConsultation",
		'status',
		// "budgetGlobalPropose",
		"actions",
	];
	// =========================================================================
	//
	// =========================================================================
	dataSize: number = 0;
	isLoading = true;
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =========================================================================
	//
	// =========================================================================
	ngOnInit() {}
	// =========================================================================
	//
	// =========================================================================
	getBC() {
		const _this = this;
		this.service1.findByStatutBCOrderByIdDesc(1).then(
			(data) => {
				//console.log("Bon cmd : " + JSON.stringify(data, null, 2));
				this.isLoading = false;
				_this.dataSize = data.content.length;
				this.dataSource = new MatTableDataSource(data.content);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(err) => {
				_this.dataSize = 0;
				console.log(err);
				this.isLoading = false;
			}
		);
	}
	// =========================================================================
	//
	// =========================================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// =========================================================================
	//
	// =========================================================================
	nouveauBonCommande() {
		this.router.navigate(["/marches/bon-commande-form"]);
	}
	// =========================================================================
	//
	// =========================================================================
	editBonCommand(row) {
		this.router.navigate(["/marches/bon-commande-edit"], {
			queryParams: { id: row.id },
		});
	}
	// =========================================================================
	//
	// =========================================================================
	showBC(row) {
		this.router.navigate(["/marches/bon-commande-detail"], {
			queryParams: { id: row.id },
		});
	}
}
