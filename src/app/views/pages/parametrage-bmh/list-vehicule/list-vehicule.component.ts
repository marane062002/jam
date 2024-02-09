import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculeService } from '../services/vehicule.service';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { result } from 'lodash';

@Component({
  selector: 'kt-list-vehicule',
  templateUrl: './list-vehicule.component.html',
  styleUrls: ['./list-vehicule.component.scss']
})
export class ListVehiculeComponent implements OnInit {

  vehicule:InterfaceVehicule[]=[];
  dataSource = new MatTableDataSource<any>();
  constructor(private router:Router,private service:VehiculeService) { }
  isLoading
  displayedColumns:string[]=["Id","Libelle","Description","actions"]
  ngOnInit() {
    this.getAll()
  }
  applyFilter(filterValue: string) {
    // // Convertit la valeur de filtrage en minuscules
    
    // filterValue = filterValue.trim().toLowerCase();
    
    // // Applique le filtre à la source de données MatTableDataSource
    // this.type.filter = filterValue;
    }
  addVehicule(){
    this.router.navigate(["/bmh/add-vehicule"])
  }
  DetailVehicule(id:any){
    this.router.navigate(["bmh/details-vehicule/",id])
  }
  updateVehicule(id:any){
    this.router.navigate(["/bmh/update-vehicule/",id])
  }
  getAll(){
    this.service.getAll().subscribe(res=>
    {
      this.vehicule=res;
    },err=>{
         console.log(err);
    })
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
export interface InterfaceVehicule{
  id:number;
  libelle:string;
  description:string;
}
