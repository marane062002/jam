import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TypeTraitementService } from '../services/type-traitement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-list-type-traitement',
  templateUrl: './list-type-traitement.component.html',
  styleUrls: ['./list-type-traitement.component.scss']
})
export class ListTypeTraitementComponent implements OnInit {

  traitement:InterfaceTypeTraitement[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:TypeTraitementService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-type-traitement"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-type-traitement/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-type-traitement/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.traitement=res;
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
export interface InterfaceTypeTraitement{
  id:number;
  libelle:string;
  description:string;
}
