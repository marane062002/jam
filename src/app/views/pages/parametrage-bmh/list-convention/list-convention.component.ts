import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { ConventionService } from '../../utils/convention.service';
import { ConventionService } from '../services/convention.service';

@Component({
  selector: 'kt-list-convention',
  templateUrl: './list-convention.component.html',
  styleUrls: ['./list-convention.component.scss']
})
export class ListConventionComponent implements OnInit {

  sousType:InterfaceConvention[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:ConventionService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-convention"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-convention/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-convention/",id])
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
export interface InterfaceConvention{
  id:number,
  libelle:string,
  description:string
}
