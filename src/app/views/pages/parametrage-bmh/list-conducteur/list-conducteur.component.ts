import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ConducteurService } from '../services/conducteur.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-conducteur',
  templateUrl: './list-conducteur.component.html',
  styleUrls: ['./list-conducteur.component.scss']
})
export class ListConducteurComponent implements OnInit {

  constructor(private service:ConducteurService,private router:Router) { }
  isLoading
  conducteur:InterfaceConducteur[]=[]
  displayedColumns=["Id","Nom","Prenom","CIN","TEL","actions"]
  dataSource=new MatTableDataSource<any>();
  ngOnInit() {
    this.getAllC();
  }
  getAllC(){
    this.service.getAll().subscribe(res=>
      {
        this.conducteur=res;
      })
  }
  applyFilter(filterValue: string) {
    // // Convertit la valeur de filtrage en minuscules
    
    // filterValue = filterValue.trim().toLowerCase();
    
    // // Applique le filtre à la source de données MatTableDataSource
    // this.type.filter = filterValue;
    }
  addConducteur(){
    this.router.navigate(["/bmh/add-conducteur"]);
  }
  
  DetailConducteur(id:any){
    this.router.navigate(["/bmh/details-conducteur/",id])
  }

  ModifierConducteur(id:any){
    this.router.navigate(["/bmh/update-conducteur/",id]);
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



export interface InterfaceConducteur{
  id:number,
  nom:string,
  prenom:string,
  cin:string,
  tel:string,
}
