import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TypeServiceService } from '../../marcheGros/Service/type-service.service';
import { ConstateurService } from '../services/constateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-constateur',
  templateUrl: './list-constateur.component.html',
  styleUrls: ['./list-constateur.component.scss']
})
export class ListConstateurComponent implements OnInit {
	isLoading

  dataSource = new MatTableDataSource<any>();
  columns: any[];
  constateur:InterfaceConstateur[]=[];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private translate: TranslateService,
		private router: Router,

    private service:ConstateurService,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
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
		this.router.navigate(["bmh/add-constateur"]);
	}
	
	ModifierAssociation(id:any){
		this.router.navigate(["/bmh/update-constateur",id]);
	}
	DetailAssociation(id:any) {
		this.router.navigate(["/bmh/details-constateur",id]);
	}

  getAll(){
    this.service.getAllConstateur().subscribe(res=>{
      this.constateur = res;
      console.log(res)
    },err=>{
      console.log(err)
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
			this.service.deleteConstateur(id).subscribe(res=>{
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
export interface InterfaceConstateur {
	id: string;
	nom: string;
	prenom: string;
	cin: string;
	tel: String;
}



