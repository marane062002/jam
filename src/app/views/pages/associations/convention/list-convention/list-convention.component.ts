import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ConventionMarcheService } from '../../../shared/conventionService';
import { ExcelAssociationService } from '../../../utils/excel-association.service';


@Component({
  selector: 'kt-list-convention',
  templateUrl: './list-convention.component.html',
  styleUrls: ['./list-convention.component.scss']
})
export class ListConventionComponent implements OnInit {
	TypeAlert: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
	  "Id",
	  "object",
	  "Date",
	  "Duree",
	  "Mantant",
	  "actions",

	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private translate: TranslateService,
	  private router: Router,

	  private datePipe: DatePipe,
	  private conventionMarcheService:ConventionMarcheService,
	  private excelService: ExcelAssociationService,) {
	  this.data = [
	
	  ]
	}
	RetourEmbalages(): void {
		this.router.navigate(["pages/Convention/list-convention"]);

	}

	ngOnInit() {
	  this.columns = [
		"Id",
		"object",
		"Date",
		"Duree",
		"Mantant",
	];
	this.conventionMarcheService.all().subscribe(res=>{
		console.log(res);
		this.data=res;
		this.dataSource = new MatTableDataSource(this.data);
	})

	  

	}
	applyFilter(filterValue: string) {
	  this.dataSource.filter = filterValue.trim().toLowerCase();

	  if (this.dataSource.paginator) {
		this.dataSource.paginator.firstPage();
	  }
	}

	DetailAssociation(id:number): void {
	  this.router.navigateByUrl("/convention/detailleConvention?id="+id);
	}
	addNew(): void {
		this.router.navigate(["/convention/new-convention"], {
			queryParams: { id: 0 },
		});
	}
	update(id): void {
		console.log(id)
		this.router.navigate(["/convention/new-convention"], {
			queryParams: { id: id },
		});
	}
	delete(id: number): void {
	  Swal.fire({
		title: 'Voulez vous supprimer cet enregistrement ?',
		icon: 'question',
		iconHtml: '?',
		showCancelButton: true,
		showCloseButton: true,
		confirmButtonText: 'Oui',
		cancelButtonText: 'Non',
	  }).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
         this.conventionMarcheService.delete(id).subscribe(res=>{
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
				showConfirmButton: false,
				timer: 1500
			  })
			  this.ngOnInit();
		 },(err : HttpErrorResponse)=>{
			console.log(err.status);
			console.log(err.headers);
			
			if(err.status==500){

				Swal.fire({
					position: 'center',
					icon: 'error',
					title: "impossible de supprimer cette enregistrement",
					showConfirmButton: false,
					timer: 1500
				  })
			}
		 })
		 


		}
	  })
	}


	createDataJson(i: number): excelData {
	  return {
		Id: this.TypeAlert[i].Id,
		Nom: this.TypeAlert[i].Nom,
		Date: this.TypeAlert[i].Date,
		Duree: this.TypeAlert[i].Duree,
		Mantant: this.TypeAlert[i].Mantant,
		Partie: this.TypeAlert[i].Partie,


	  };
	}

  }

  export interface excelData {
	Id: string;
	Nom: string;
	Date: string;
	Duree: string;
	Mantant: string;
	Partie: string;


  }
