import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransfertService } from '../services/transfert.service';

@Component({
  selector: 'kt-list-transfert',
  templateUrl: './list-transfert.component.html',
  styleUrls: ['./list-transfert.component.scss']
})
export class ListTransfertComponent implements OnInit {

  transfert:InterfaceTransfert[]=[]
  displayedColumns: string[] = [
		"ID",
		"PointDepart",
		"PointArrive",
		"LieuInhumation",
		"NumBulletin",
		"Remarque",
		"Vehicule",
		"Conducteur",
		"Prelevement",
		"actions",
	];
  constructor(private router:Router,private service:TransfertService) { }


  ngOnInit() {
    this.service.getAll().subscribe(res=>{
      this.transfert=res;
    })
  }
  add(){
    this.router.navigate(["/bmh1/add-transfert"])
  }
  Details(id:any){
    
    return this.router.navigate(["/bmh1/details-transfert/",id])
  }
  Modifier(id:any){
    this.router.navigate(["/bmh1/update-transfert/",id])
  }

}
export interface InterfaceTransfert{
  id:number,
  pointDepart:string,
  pointArrive:string,
  lieuInhumation:string,
  numBulletin:number,
  remarque:string,
  vehicule:string,
  conducteur:string,
}
