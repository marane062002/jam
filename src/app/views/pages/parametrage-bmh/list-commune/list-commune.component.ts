import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommuneService } from '../services/commune.service';

@Component({
  selector: 'kt-list-commune',
  templateUrl: './list-commune.component.html',
  styleUrls: ['./list-commune.component.scss']
})
export class ListCommuneComponent implements OnInit {

  commune:InterfaceCommune[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:CommuneService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-commune"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-commune/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-commune/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.commune=res;
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
export interface InterfaceCommune{
  id:number;
  libelle:string;
  description:string;
}
