import { Component, OnInit, ViewChild, ɵConsole } from "@angular/core";
import { ReclamationsService } from "../../shared/reclamations.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormControl } from "@angular/forms";

@Component({
	selector: "app-reclamations-list",
	templateUrl: "./reclamations-list.component.html",
	styleUrls: ["./reclamations-list.component.css"],
})
export class ReclamationsListComponent implements OnInit {
	// ================================================================
	//
	// ================================================================
	displayedColumns = [
		"id",
		"statut",
		"severite",
		"type",
		"sousType",
		"criticite",
		"dateDepot",
		"actions",
	];
	// ================================================================
	//
	// ================================================================
	dataSource: MatTableDataSource<Reclamation>;
	result;
	reclamations = [];
	isLoading = true;
	// ================================================================
	//
	// ================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild("matPaginator7", { static: true }) paginator7: MatPaginator;
	@ViewChild("sort7", { static: true }) sort7: MatSort;
	/**
	 * Set the paginator after the view init since this component will
	 * be able to query its view for the initialized paginator.
	 */

	reclamationsDatasource: Reclamation[] = [];
	constructor(private service: ReclamationsService, private router: Router) {
		this.populate();
	}
	// ================================================================
	//
	// ================================================================
	ngAfterViewInit() {}
	// ================================================================
	//
	// ================================================================
	ngOnInit() {}
	// ================================================================
	//
	// ================================================================
	populate() {
		this.service.getallreclamation().then((data) => {
			this.isLoading = false;
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
	// ================================================================
	//
	// ================================================================
	applyFilter(filterValue: string) {
		console.log(filterValue);
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ================================================================
	//
	// ================================================================
	editReclamation(idrec) {
		this.router.navigate(["/reclamations/reclamation-edit"], {
			queryParams: { id: idrec },
		});
	}
	// ================================================================
	//
	// ================================================================
	nouvelleReclamation() {
		this.router.navigate(["/reclamations/reclamations-form"]);
	}
	// ================================================================
	//
	// ================================================================
	showReclamation(rec) {
		this.router.navigate(["/reclamations/reclamations-list"], {
			queryParams: { reclam: rec },
		});
	}
	// ================================================================
	//
	// ================================================================
	traiterReclamation(rec) {
		this.router.navigate(["/reclamations/reclamation-traitement"], {
			queryParams: { reclam: rec },
		});
	}
	// ================================================================
	//
	// ================================================================
	deleteReclamation(recId) {
		this.service.deletereclamation(recId).subscribe((res) => {
			this.service.deltePjByIdReclamation(recId).subscribe((res) => {
				console.log("in heeeeere");
			});
			this.populate();
		});
	}
	// ================================================================
	//
	// ================================================================
	refresh() {
		this.service.getallreclamation().then((data) => {
			this.dataSource = new MatTableDataSource(data);
		});
	}
	// ================================================================
	//
	// ================================================================
	createNewReclamation(i: number): Reclamation {
		return {
			id: this.reclamations[i].id,
			statut: this.reclamations[i].statutReclamation.libelle,
			severite: this.reclamations[i].severite.libelle,
			type: this.reclamations[i].typeReclamation.libelle,
			sousType: this.reclamations[i].soustypeReclamation.libelle,
			criticite: this.reclamations[i].criticite.libelle,
			dateDepot: this.reclamations[i].dateDepot,
		};
	}
}
// ================================================================
//
// ================================================================
export interface Reclamation {
	id: string;
	statut: string;
	severite: string;
	type: string;
	sousType: string;
	criticite: string;
	dateDepot: string;
}
