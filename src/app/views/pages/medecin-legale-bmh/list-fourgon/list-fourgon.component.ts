import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FourgonService } from '../services/fourgon.service';
import { environment } from "../../../../../environments/environment";
import { data } from '../../audiences/saisir-facture/saisir-facture.component';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'kt-list-fourgon',
  templateUrl: './list-fourgon.component.html',
  styleUrls: ['./list-fourgon.component.scss']
})
export class ListFourgonComponent implements OnInit {
  TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalRecords : any;
	currentPage: number = 0;
  
  fourgon:InterfaceFourgon[]=[]
  displayedColumns: string[] = [
		"ID",
		"Matricule",
		"Vehicule",
		"Couleur",
		"Organisme",
    "actions"
	];
  dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;


  constructor(private router:Router,private service:FourgonService) { }


  ngOnInit() {
    this.loadData(this.currentPage, this.pageSize);
  }
  dataSubject = new BehaviorSubject<any[]>([]);

  loadData(page: number, pageSize: number):void{
    const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;
  this.service.getAllPaginate(page,pageSize).subscribe((res:any)=>{
      this.fourgon=res;
      this.dataSource.data = res.content;
			this.totalRecords = res.totalElements;
			this.isLoadingResults = false;
    })
  }
  onPaginatorChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadData(this.currentPage, this.pageSize);
	}
  add(){
    this.router.navigate(["/bmh1/add-fourgon"])
  }
  Details(id:any){
    
    return this.router.navigate(["/bmh1/details-fourgon/",id])
  }
  Modifier(id:any){
    this.router.navigate(["/bmh1/update-fourgon/",id])
  }
}

export interface InterfaceFourgon{
  id:number;
  couleur:string;
  vehicule:string;
  matricule:string;
  organisme:string
}