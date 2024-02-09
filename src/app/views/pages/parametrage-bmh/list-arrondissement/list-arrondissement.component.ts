import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ArrondissemntService } from '../services/arrondissemnt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-list-arrondissement',
  templateUrl: './list-arrondissement.component.html',
  styleUrls: ['./list-arrondissement.component.scss']
})
export class ListArrondissementComponent implements OnInit {

  arrondissement:InterfaceArrondissement[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:ArrondissemntService) { }

  ngOnInit() {
    this.service.getAll().subscribe(res=>
      {
        this.arrondissement=res;
        console.log(res)
      },err=>{
        console.log(err)
      }
      )
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-arrondissement"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-arrondissement/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-arrondissement/",id])
  }
  // getAll(){
  //   this.service.getAll().subscribe(res=>
  //     {
  //       this.arrondissement=res;
  //       console.log(res)
  //     },err=>{
  //       console.log(err)
  //     }
  //     )
  // }
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
export interface InterfaceArrondissement{
  id:number;
  libelle:string;
  description:string;
}
