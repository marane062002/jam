import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ListTypeAnalyseService } from '../services/list-type-analyse.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'kt-list-type-analyse',
  templateUrl: './list-type-analyse.component.html',
  styleUrls: ['./list-type-analyse.component.scss']
})
export class ListTypeAnalyseComponent implements OnInit {
  isLoading
  dataSource = new MatTableDataSource<any>();
  columns: any[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  typeAnalyse:InterfaceTypeAnalyse[]=[];
  constructor(private service:ListTypeAnalyseService,private router:Router) { }

  ngOnInit() {
    this.getAllTE();
  }
  applyFilter(filterValue: string) {
    // // Convertit la valeur de filtrage en minuscules
    
    // filterValue = filterValue.trim().toLowerCase();
    
    // // Applique le filtre à la source de données MatTableDataSource
    // this.type.filter = filterValue;
    }
  getAllTE(){
    return this.service.getAll().subscribe(res=>{
      this.typeAnalyse=res;
    },err=>{
      console.log(err);
    }
      )
  }

  addTypeExamen(){
    this.router.navigate(["/bmh/add-type-analyse"]);
  }

  DetailTypeExamen(id:any){
    this.router.navigate(["/bmh/details-type-analyse/",id]);
  }

  updateTypeExamen(id:any){
    this.router.navigate(["/bmh/update-type-analyse/",id]);
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
export interface InterfaceTypeAnalyse{
  id:number,
  libelle:string,
  description:string,
}
