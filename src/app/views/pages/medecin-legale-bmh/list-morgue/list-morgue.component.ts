import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MorgueService } from '../services/morgue.service';
import { environment } from "../../../../../environments/environment";
import { data } from '../../audiences/saisir-facture/saisir-facture.component';
import { BehaviorSubject } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'kt-list-morgue',
  templateUrl: './list-morgue.component.html',
  styleUrls: ['./list-morgue.component.scss']
})
export class ListMorgueComponent implements OnInit {
  TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalRecords : any;
	currentPage: number = 0;

  morgue:InterfaceMorgue[]=[]


  displayedColumns: string[] = [
		"ID",
		"N°casier",
		"N°Deces",
		"Statut",
		"actions",
	];
  constructor(private router:Router,private service:MorgueService) { }


  ngOnInit() {
    this.loadData(this.currentPage, this.pageSize);
  }
  dataSubject = new BehaviorSubject<any[]>([]);

  dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
  loadData(page: number, pageSize: number):void{
    const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;
    this.service.getAll(page,pageSize).subscribe((res:any)=>{
      this.morgue=res;
      this.dataSource.data = res.content;
			this.totalRecords = res.totalElements;
			this.isLoadingResults = false;
    })
  }
  applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
  add(){
    this.router.navigate(["/bmh1/add-morgue"])
  }
  Details(id:any){
    
    return this.router.navigate(["/bmh1/details-morgue/",id])
  }
  Modifier(id:any){
    this.router.navigate(["/bmh1/update-morgue/",id])
  }
  

}
export interface InterfaceMorgue{
  id:number;
  numCasier:string;
  numDeces:string;
  status:string;
}
