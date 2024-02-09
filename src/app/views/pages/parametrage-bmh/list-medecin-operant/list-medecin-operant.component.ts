import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../services/medecin.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-medecin-operant',
  templateUrl: './list-medecin-operant.component.html',
  styleUrls: ['./list-medecin-operant.component.scss']
})
export class ListMedecinOperantComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  medecin_operant:InterfaceMedecin[]=[]
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  constructor(private service:MedecinService,private router:Router) { }
  isLoading
  ngOnInit() {
    this.getAll();
  }
  updateMedecin(id:any){
    this.router.navigate(["/bmh/update-medecin-operant/",id])
  }
  DetailMedecin(id:any){
    this.router.navigate(["/bmh/details-medecin-operant/",id])
  }
  addMedecin(){
    this.router.navigate(["/bmh/add-medecin-operant"])
  }
  applyFilter(filterValue: string) {
    // // Convertit la valeur de filtrage en minuscules
    
    // filterValue = filterValue.trim().toLowerCase();
    
    // // Applique le filtre à la source de données MatTableDataSource
    // this.type.filter = filterValue;
    }
  getAll(){
    this.service.getAll().subscribe(res=>{
      this.medecin_operant=res;
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
export interface InterfaceMedecin{
  id:number,
  libelle:string,
  description:string
}
