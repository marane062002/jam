import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuantiteService } from '../services/quantite.service';

@Component({
  selector: 'kt-list-quantite',
  templateUrl: './list-quantite.component.html',
  styleUrls: ['./list-quantite.component.scss']
})
export class ListQuantiteComponent implements OnInit {

  quantite:InterfaceQuantite[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:QuantiteService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-quantite"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-quantite/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-quantite/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.quantite=res;
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
export interface InterfaceQuantite{
  id:number;
  libelle:string;
  description:string;
}
