import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProduitUtiliseService } from '../services/produit-utilise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-list-produit-utilise',
  templateUrl: './list-produit-utilise.component.html',
  styleUrls: ['./list-produit-utilise.component.scss']
})
export class ListProduitUtiliseComponent implements OnInit {

  produit:InterfaceProduitUtilise[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:ProduitUtiliseService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-produit-utilise"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-produit-utilise/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-produit-utilise/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.produit=res;
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
export interface InterfaceProduitUtilise{
  id:number;
  libelle:string;
  description:string;
}