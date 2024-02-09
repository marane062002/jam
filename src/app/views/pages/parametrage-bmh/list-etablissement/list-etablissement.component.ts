import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtablissementService } from '../services/etablissement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-etablissement',
  templateUrl: './list-etablissement.component.html',
  styleUrls: ['./list-etablissement.component.scss']
})
export class ListEtablissementComponent implements OnInit {

  sousType:InterfaceEtab[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:EtablissementService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-etablissement"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-etablissement/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-etablissement/",id])
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
export interface InterfaceEtab{
  id:number,
  libelle:string,
  description:string
}