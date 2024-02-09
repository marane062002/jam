import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AgentService } from '../services/agent.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'kt-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrls: ['./list-agent.component.scss']
})
export class ListAgentComponent implements OnInit {
	isLoading
  dataSource = new MatTableDataSource<any>();
  columns: any[];
  constateur:InterfaceAgent[]=[];

	constructor(
		private router: Router,

    private service:AgentService,
	) {}

  da
	ngOnInit() {
    this.getAll();
	
	}
  displayedColumns: string[] = [
		"Id",
		"Nom",
		"Prenom",
		"CIN",
		"TEL",
		"actions",
	];
	

	applyFilter(filterValue: string) {
		// this.constateur.filter = filterValue.trim().toLowerCase();

		// if (this.constateur.paginator) {
		// 	this.constateur.paginator.firstPage();
		// }
	}
	addAssociation(): void {
		this.router.navigate(["bmh/add-agent"]);
	}
	
	ModifierAssociation(id:any){
		this.router.navigate(["/bmh/update-agent",id]);
	}
	DetailAssociation(id:any) {
		this.router.navigate(["/bmh/details-agent",id]);
	}

  getAll(){
    this.service.getAll().subscribe(res=>{
      this.constateur = res;
      console.log(res)
    },err=>{
      console.log(err)
    })
  }

  delete(id:any){
	Swal.fire({
		title: ' ',
		text: "voulez-vous vraiment supprimer ce  entrées de stock  ?",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Supprimer',
		cancelButtonText: 'Fermer'
  
	  }).then((result) => {
		 if (result.isConfirmed) {
			this.service.delete(id).subscribe(res=>{
			this.ngOnInit();
			Swal.fire({
			  title: 'entrées de stock à été   supprimé avec succès !',
			  icon: 'success',
			});
		  },err=>{
			console.log(err)
		  })
  
		}
	  })
  }





}
export interface InterfaceAgent{
  id:number,
  nom:string,
  prenom:string,
  cin:string,
  tel:string
}
