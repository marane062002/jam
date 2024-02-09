import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VStatutService } from '../services/v-statut.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-vaccination-statut',
  templateUrl: './list-vaccination-statut.component.html',
  styleUrls: ['./list-vaccination-statut.component.scss']
})
export class ListVaccinationStatutComponent implements OnInit {

  status:InterfaceVaccinationStatut[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:VStatutService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-vaccination-statut"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-vaccination-statut/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-vaccination-statut/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.status=res;
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
export interface InterfaceVaccinationStatut{
  id:number;
  libelle:string;
  description:string;
}
