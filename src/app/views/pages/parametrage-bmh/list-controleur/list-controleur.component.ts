import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ControleurService } from '../services/controleur.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-controleur',
  templateUrl: './list-controleur.component.html',
  styleUrls: ['./list-controleur.component.scss']
})
export class ListControleurComponent implements OnInit {

  
  dataSource = new MatTableDataSource<any>();
  columns: any[];
  controleur:InterfaceControleur[]=[];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		// private translate: TranslateService,
		private router: Router,

    private service:ControleurService,
		private datePipe: DatePipe,
		// private excelService: ExcelAssociationService
	) {}

  
	ngOnInit() {
    this.getAll();
	
	}
  displayedColumns: string[] = [
		"Id",
		"Nom",
		"Prenom",
		"CIN",
		"TEL",
		"actions",
	];
	

	
	addAssociation(): void {
		this.router.navigate(["bmh/add-controleur"]);
	}
	
	ModifierAssociation(id:any){
		this.router.navigate(["/bmh/update-controleur",id]);
	}
	DetailAssociation(id:any) {
		this.router.navigate(["/bmh/details-controleur",id]);
	}

  getAll(){
    this.service.getAll().subscribe(res=>{
      this.controleur = res;
      console.log(res)
    },err=>{
      console.log(err)
    })
  }

  delete(id:any){
    debugger
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
      debugger
		 if (result.isConfirmed) {
			this.service.delete(id).subscribe(res=>{
			this.ngOnInit();
      debugger
			Swal.fire({
        
			  title: 'entrées de stock à été   supprimé avec succès !',
			  icon: 'success',
        
			});
      debugger
		  },err=>{
			console.log(err)
		  })
  
		}
	  })
  }
	
}
export interface InterfaceControleur{
  id: string;
	nom: string;
	prenom: string;
	cin: string;
	tel: String;
}