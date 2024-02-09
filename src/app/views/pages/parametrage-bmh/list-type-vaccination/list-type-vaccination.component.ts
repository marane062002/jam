import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TypeVaccinationService } from '../services/type-vaccination.service';

@Component({
  selector: 'kt-list-type-vaccination',
  templateUrl: './list-type-vaccination.component.html',
  styleUrls: ['./list-type-vaccination.component.scss']
})
export class ListTypeVaccinationComponent implements OnInit {

  vaccination:InterfaceTypeVaccination[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:TypeVaccinationService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-type-vaccination"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-type-vaccination/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-type-vaccination/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.vaccination=res;
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
export interface InterfaceTypeVaccination{
  id:number,
  libelle:string,
  description:string,
}
