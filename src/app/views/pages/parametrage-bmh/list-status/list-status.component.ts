import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusService } from '../services/status.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.scss']
})
export class ListStatusComponent implements OnInit {

  status:InterfaceStatus[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:StatusService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-status"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-status/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-status/",id])
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
export interface InterfaceStatus{
  id:number;
  libelle:string;
  description:string;
}
