import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecisionService } from '../services/decision.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-decision',
  templateUrl: './list-decision.component.html',
  styleUrls: ['./list-decision.component.scss']
})
export class ListDecisionComponent implements OnInit {

  sousType:InterfaceDecision[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:DecisionService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-decision"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-decision/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-decision/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.sousType=res;
        console.log(res)
      },err=>{
        console.log(err)
      }
      )
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
export interface InterfaceDecision{
  id:number,
  libelle:string,
  description:string
}
