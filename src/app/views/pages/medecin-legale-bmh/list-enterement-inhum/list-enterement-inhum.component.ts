import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EnterementInhumService } from "../services/enterement-inhum.service";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { data } from "../../audiences/saisir-facture/saisir-facture.component";
import { MatTableDataSource, PageEvent } from "@angular/material";
import { BehaviorSubject } from "rxjs";
@Component({
	selector: "kt-list-enterement-inhum",
	templateUrl: "./list-enterement-inhum.component.html",
	styleUrls: ["./list-enterement-inhum.component.scss"],
})
export class ListEnterementInhumComponent implements OnInit {
	TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalRecords : any;
	currentPage: number = 0;
	enterement: InterfaceEnterementInhum[] = [];
	displayedColumns: string[] = ["ID", "Type", "Sexe", "Commune", "Arrondissemnt", "Quartier", "Date", "Lieu entr", "Lieu Recp", "actions"];

	constructor(private httpClient: HttpClient,private router: Router, private datePipe: DatePipe, private service: EnterementInhumService) {}

	

	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;


	ngOnInit() {
		// this.service.getAll().subscribe(res=>{
		//   this.enterement=res;
		//
		//   console.log(res)
		// })
		// this.service.getAll().subscribe((res) => {
		// 	this.enterement = res.map((item: any) => {
		// 		item.dateEnterementObstacle = this.datePipe.transform(item.dateEnterementObstacle, "yyyy-MM-dd") as string;
		// 		return item;
		// 	});
		// 	console.log(res);
		// });
		this.loadData(this.currentPage, this.pageSize);
	}

	onPaginatorChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadData(this.currentPage, this.pageSize);
	}

	dataSubject = new BehaviorSubject<any[]>([]);
	loadData(page: number, pageSize: number): void {
		const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;
		console.log("token", localStorage.getItem('accessToken'));

		this.httpClient.get<any[]>(`${this.baseUrl}enterrement/paginate/${page}/${pageSize}`, { headers: this.headers }).subscribe((response: any) => {
			// debugger
			this.enterement = response.content;
			this.dataSource.data = response.content;
			this.totalRecords = response.totalElements;
			this.isLoadingResults = false;
		});

		console.log("page:", page, "pageSize:", pageSize);
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-enterementInhum"]);
	}
	add() {
		this.router.navigate(["/enterrement/enterement"]);
	}

	Details(id: any) {
		this.router.navigate([`/enterrement/detaille-enterrement/${id}`]);
	}
	update(id: any) {
		this.router.navigate([`/enterrement/upd-enterrement/${id}`]);
	}
}
export interface InterfaceEnterementInhum {
	id: number;
	sexe: string;
	lieuRecuperation: string;
	lieuEnterrement: string;
	date: Date;
	arrondissement: string;
	type: string;
	commune: string;
	quartier: string;
	obstacleDefunts: string;
}
