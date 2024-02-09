import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AnimalService } from '../services/animal.service';

@Component({
  selector: 'kt-list-animal',
  templateUrl: './list-animal.component.html',
  styleUrls: ['./list-animal.component.scss']
})
export class ListAnimalComponent implements OnInit {

  animal:InterfaceAnimal[]=[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private router:Router,private service:AnimalService) { }

  ngOnInit() {
    this.getAll()
  }
  addStatut(){
    return this.router.navigate(["/bmh/add-animal"])
  }
  DetailsStatut(id:any){
    return this.router.navigate(["/bmh/details-animal/",id])
  }
  ModifierStatut(id:any){
    return this.router.navigate(["/bmh/update-animal/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
      {
        this.animal=res;
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
export interface InterfaceAnimal{
  id:number,
  libelle:string,
  description:string,
}
