import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TypeDeclarationService } from '../services/type-declaration.service';

@Component({
  selector: 'kt-list-type-declarration',
  templateUrl: './list-type-declarration.component.html',
  styleUrls: ['./list-type-declarration.component.scss']
})
export class ListTypeDeclarrationComponent implements OnInit {

  declaration:InterfaceTypeDeclaration[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:TypeDeclarationService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-type-declarration"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-type-declarration/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-type-declarration/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.declaration=res;
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
export interface InterfaceTypeDeclaration{
  id:number,
  libelle:string,
  description:string,
}
