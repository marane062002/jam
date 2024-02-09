import { Component, OnInit } from '@angular/core';
import { TypeExamenService } from '../services/type-examen.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'kt-list-type-examen',
  templateUrl: './list-type-examen.component.html',
  styleUrls: ['./list-type-examen.component.scss']
})
export class ListTypeExamenComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  columns: any[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  type_examen:InterfaceTypeExamen[]=[];
  constructor(private service:TypeExamenService,private router:Router) { }
  isLoading
  ngOnInit() {
    this.getAllTE();
  }

  getAllTE(){
    return this.service.getAll().subscribe(res=>{
      this.type_examen=res;
    },err=>{
      console.log(err);
    }
      )
  }

  addTypeExamen(){
    this.router.navigate(["/bmh/add-type-examen"]);
  }

  DetailTypeExamen(id:any){
    this.router.navigate(["/bmh/details-type-examen/",id]);
  }

  updateTypeExamen(id:any){
    this.router.navigate(["/bmh/update-type-examen/",id]);
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
 applyFilter(filterValue: string) {
	// // Convertit la valeur de filtrage en minuscules
	
	// filterValue = filterValue.trim().toLowerCase();
	
	// // Applique le filtre à la source de données MatTableDataSource
	// this.type.filter = filterValue;
  }
}
export interface InterfaceTypeExamen{
  id:number,
  libelle:string,
  description:string
}
