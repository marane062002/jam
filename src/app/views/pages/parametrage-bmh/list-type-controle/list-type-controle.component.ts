import { Component, OnInit } from '@angular/core';
import { TypeControleService } from '../services/type-controle.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-type-controle',
  templateUrl: './list-type-controle.component.html',
  styleUrls: ['./list-type-controle.component.scss']
})
export class ListTypeControleComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  columns: any[];
  displayedColumns: string[] = ["Id", "Libelle", "Description", "actions"];
  type:InterfaceTypeControle[]=[];
  constructor(private service:TypeControleService,private router:Router) { }

  ngOnInit() {
    this.getAllTE();
  }

  getAllTE(){
    return this.service.getAll().subscribe(res=>{
      this.type=res;
    },err=>{
      console.log(err);
    }
      )
  }

  addType(){
    this.router.navigate(["/bmh/add-type-controle"]);
  }

  DetailType(id:any){
    this.router.navigate(["/bmh/details-type-controle/",id]);
  }

  updateType(id:any){
    this.router.navigate(["/bmh/update-type-controle/",id]);
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
export interface InterfaceTypeControle{
  id:number,
  libelle:string,
  description:string
}
