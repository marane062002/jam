import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TraitementEffectueService } from '../services/traitement-effectue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-list-traitement-effectue',
  templateUrl: './list-traitement-effectue.component.html',
  styleUrls: ['./list-traitement-effectue.component.scss']
})
export class ListTraitementEffectueComponent implements OnInit {

  traitement:InterfaceTraitementEffectue[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:TraitementEffectueService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-traitement-effectue"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-traitement-effectue/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-traitement-effectue/",id])
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
export interface InterfaceTraitementEffectue{
  id:number;
  libelle:string;
  description:string;
}