import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NouveauNeService } from '../services/nouveau-ne.service';
import { environment } from "../../../../../environments/environment";
import { data } from '../../audiences/saisir-facture/saisir-facture.component';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { AnyCnameRecord } from 'dns';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'kt-list-nouveau-ne',
  templateUrl: './list-nouveau-ne.component.html',
  styleUrls: ['./list-nouveau-ne.component.scss']
})
export class ListNouveauNeComponent implements OnInit {
  TypeAlert: any;
	data: data[] = [];
	columns: any[];
	footerData: any[][] = [];
	private baseUrl = environment.API_BMH_URL; 
	pageSizeOptions: number[] = [5, 10, 50];
	pageSize: number = 5;
	totalRecords : any;
	currentPage: number = 0;
  nouveauNe:InterfaceNouveauNe[]=[]
  displayedColumns: string[] = [
		"NUM",
		"Nom",
		"Prenom",
		"CIN",
		"Observation",
		"Date",
		"Tel",
    "Poids",
		"actions",
	];
  constructor(private router:Router,private service:NouveauNeService) { }

  dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;

  ngOnInit() {
    this.loadData(this.currentPage, this.pageSize);
  }
  dataSubject = new BehaviorSubject<any[]>([]);
  // loadData():void(page,pageSize){
  //   this.service.getAll(page,pageSize).subscribe((res:any)=>{
  //     this.nouveauNe=res;
  //     this.dataSource.data = res.content;
	// 		this.totalRecords = res.totalElements;
	// 		this.isLoadingResults = false;
  //     console.log(res)
  //   })
  // }

  loadData(page: number, pageSize: number): void {
		const startIndex = page * pageSize;
		const endIndex = startIndex + pageSize;

	  this.service.getAll(page,pageSize).subscribe((res:any)=>{
      this.nouveauNe=res;
      this.dataSource.data = res.content;
			this.totalRecords = res.totalElements;
			this.isLoadingResults = false;
      console.log(res)
    })

		console.log("page:", page, "pageSize:", pageSize);
	}
  onPaginatorChange(event: PageEvent): void {
		this.currentPage = event.pageIndex;
		this.pageSize = event.pageSize;
		this.loadData(this.currentPage, this.pageSize);
	}
  add(){
    this.router.navigate(["/bmh1/add-nouveauNe"])
  }
  Details(id:any){
    
    return this.router.navigate(["/bmh1/details-nouveauNe/",id])
  }
  Modifier(id:any){
    this.router.navigate(["/bmh1/update-nouveauNe/",id])
  }

}
export interface InterfaceNouveauNe{
  id:number,
  numEnregistrement:number
  dateEnregistrement:Date
  nom:string
  prenom:string
  nomMere:string
  prenomMere:string
  cinMere:string
  telMere:string
  adresseResMere:string
  nationaliteMere:string
  natureAccouchement:string
  adresseAccouchement:string
  Observation:string
  nomPere:string
  prenomPere:string
  cinPere:string
  nationalitePere:string
  telPere:string
  Statut:string
  adresseResPere:string
  nomSageFemme:string
  prenomSageFemme:string
  cinSageFemme:string
  dateSageFemme:Date
  telSageFemme:string
  adresseSageFemme:string
  nomConstateur:string
  prenomConstateur:string
  cinConstateur:string
  poids:number
  sexe:string
}
