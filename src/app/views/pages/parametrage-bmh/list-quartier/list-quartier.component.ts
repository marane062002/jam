import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuartierService } from '../services/quartier.service';

@Component({
  selector: 'kt-list-quartier',
  templateUrl: './list-quartier.component.html',
  styleUrls: ['./list-quartier.component.scss']
})
export class ListQuartierComponent implements OnInit {

  quartier:InterfaceQuartier[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:QuartierService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-quartier"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-quartier/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-quartier/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.quartier=res;
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
export interface InterfaceQuartier{
  id:number;
  libelle:string;
  description:string;
}
