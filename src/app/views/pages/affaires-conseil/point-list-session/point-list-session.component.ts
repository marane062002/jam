import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from "rxjs/operators";

@Component({
	selector: "kt-point-list-session",
	templateUrl: "./point-list-session.component.html",
	styleUrls: ["./point-list-session.component.scss"],
})
export class PointListSessionComponent implements OnInit {
	// =====================================================================================
	//
	// =====================================================================================
	displayedColumns = [
		//"id",
		"session",
		"objet",
		//"budget",
		//"dateRealisation",
		"statut",
		"actions",
	];
	// =====================================================================================
	//
	// =====================================================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	idSession;
	isLoading = true;
	// =====================================================================================
	//
	// =====================================================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// =====================================================================================
	//
	// =====================================================================================
	ngOnInit() {
		this.getPoints();
	}
	// =====================================================================================
	//
	// =====================================================================================
	async getPoints() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idSession = params["id"];
		});
		await this.service
			.getAllPointBySession(this.idSession)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					this.dataSource = new MatTableDataSource(data);
					this.isLoading = false;
				},
				(err) => {
					console.log(err);
					this.isLoading = false;
				}
			);
	}
	// =====================================================================================
	//
	// =====================================================================================
	affecterPoint(id) {
		this.router.navigate(["/affaires-conseil/affectation-point"], {
			queryParams: { id: id },
		});
	}
	// =====================================================================================
	//
	// =====================================================================================
	evaluerParBureau() {
		this.router.navigate(["/affaires-conseil/evaluation-points-bureau"], {
			queryParams: { id: this.idSession },
		});
	}
	// =====================================================================================
	//
	// =====================================================================================
	editPoint(id) {
		this.router.navigate(["/affaires-conseil/point-edit"], {
			queryParams: { id: id },
		});
	}
	// =====================================================================================
	//
	// =====================================================================================
	showPoint(id) {
		this.router.navigate(["/affaires-conseil/point-detail"], {
			queryParams: { id: id },
		});
	}
	// =====================================================================================
	//
	// =====================================================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
}
