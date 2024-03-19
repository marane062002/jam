import { AutopsieService } from "../services/autopsie.service";
import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { excelData } from "../../audiences/audiences.component";


@Component({
	selector: "kt-list-autopsie",
	templateUrl: "./list-autopsie.component.html",
	styleUrls: ["./list-autopsie.component.scss"],
})
export class ListAutopsieComponent implements OnInit {
	autopsie: InterfaceAutopsie[] = [];
	TypeAlert: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];

    id:any;
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;


	displayedColumns: string[] = ["ID", "MedecinOperant", "Statut", "Date", "actions"];
	constructor( private route: ActivatedRoute ,private datePipe: DatePipe,private router: Router, private service: AutopsieService) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = +params['id']; 
		  });
		this.getAllD();
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}


	update(id: any) {
		return this.router.navigate(["/bmh1/update-autopsie/", id]);
	}
	Details(id: any) {
		return this.router.navigate(["/bmh1/details-autopsie/", id]);
	}
	// applyFilter(){}
	ajouter() {
		this.router.navigate([`/bmh1/add-autopsie/${this.id}`]);
	}

	getAllD() {
		this.service.getAll(this.id).subscribe(
			(res) => {
				this.autopsie = res;
				// Format each date in the array
				this.autopsie.forEach((item: any) => {
					item.formattedDate = this.formatDate(item.date); // Assuming date is the property containing the date
				});
				console.log(this.autopsie);
			},
			(err) => {
				console.log("Error:", err);
			}
		);
	}
	
	formatDate(date: any): string {
		return this.datePipe.transform(date, "yyyy-MM-dd") || "";
	}
}
export interface InterfaceAutopsie {
	id: number;
	date: Date;
	medecinOperant: string;
	status: string;
}
