import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SousTypeService } from '../services/sous-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-sous-type',
  templateUrl: './list-sous-type.component.html',
  styleUrls: ['./list-sous-type.component.scss']
})
export class ListSousTypeComponent implements OnInit {
  sousType:InterfaceSousType[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:SousTypeService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-sous-type"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-sous-type/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-sous-type/",id])
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
export interface InterfaceSousType{
  id:number,
  libelle:string,
  description:string
}
