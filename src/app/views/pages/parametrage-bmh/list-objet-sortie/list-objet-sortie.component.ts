import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ObjetSortieService } from '../services/objet-sortie.service';

@Component({
  selector: 'kt-list-objet-sortie',
  templateUrl: './list-objet-sortie.component.html',
  styleUrls: ['./list-objet-sortie.component.scss']
})
export class ListObjetSortieComponent implements OnInit {

  objet:InterfaceObjetSortie[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:ObjetSortieService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-objet-sortie"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-objet-sortie/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-objet-sortie/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.objet=res;
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
export interface InterfaceObjetSortie{
  id:number;
  libelle:string;
  description:string;
}
