import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganismeService } from '../services/organisme.service';
import { data } from '../../audiences/saisir-facture/saisir-facture.component';
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource, PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'kt-list-organisme',
  templateUrl: './list-organisme.component.html',
  styleUrls: ['./list-organisme.component.scss']
})
export class ListOrganismeComponent implements OnInit {
  TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalRecords : any;
	currentPage: number = 0;

  organisme:InterfaceOrganisme[]=[]
  
  displayedColumns: string[] = [
		"ID",
		"Raison sociale",
		"Type",
    "RC",
    "IF",
    "ICE",
    "Adresse",
    "Tel",
		"actions",
	];
  constructor(private router:Router,private service:OrganismeService) { }


	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;

  ngOnInit() {
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
    this.service.getAllPaginate(page,pageSize).subscribe((res:any)=>{
      this.organisme=res;
      this.dataSource.data = res.content;
			this.totalRecords = res.totalElements;
			this.isLoadingResults = false;
    })
		// this.httpClient.get<any[]>(`${this.baseUrl}enterrement/paginate/${page}/${pageSize}`, { headers: this.headers }).subscribe((response: any) => {
		// 	debugger
		// 	this.enterement = response.content;
		// 	this.dataSource.data = response.content;
		// 	this.totalRecords = response.totalElements;
		// 	this.isLoadingResults = false;
		// });

		console.log("page:", page, "pageSize:", pageSize);
	}
  add(){
    this.router.navigate(["/bmh1/add-organisme"])
  }
  Details(id:any){
    
    return this.router.navigate(["/bmh1/details-organisme/",id])
  }
  Modifier(id:any){
    this.router.navigate(["/bmh1/update-organisme/",id])
  }


}
export interface InterfaceOrganisme{
  id:number;
  rc:string;
  ice:string;
  adresse:string;
  IFf:string;
  tel:string;
  type:string;
}
