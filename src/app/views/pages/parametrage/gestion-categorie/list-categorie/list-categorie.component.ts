import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ExcelFrService } from '../../../utils/excel-FR.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GestionCategorieService } from '../../Services/gestion-categorie.service';
import { AoService } from '../../../shared/ao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {
	sizeData
	isLoading2
	sizeData2
  data: any[] = [];
	columns: any[];
	footerData: any[][] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns = [
		"id",
		"lib",
		"actions",
	];
  constructor(		private excelService: ExcelFrService,		private translate: TranslateService,
    		private router: Router,private service :GestionCategorieService,private serviceAo:AoService


    ) { }

  ngOnInit() {
    this.serviceAo.getAllTypePrestationAo().subscribe((res)=>{
this.dataSource = new MatTableDataSource(res);


    })
  }
	exportTable() {
		let data2: any[] = this.data;
		let json = data2.map((item) => new excelDataLB(item));
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.any.TITRE_INDEX"));
		this.excelService.exportAsExcelFile('Liste des catégorie', '', this.columns, json, this.footerData, 'Liste-Besoins', this.translate.instant("PAGES.MARCHE.any.TITRE_INDEX"))
	}

	handlePageEvent(event){
		
	}
  nouvelleao() {
		this.router.navigate(["/parametrage/add-categorie"]);
	}
  applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
  show(row) {
		this.router.navigate(["/parametrage/show-categorie"], {
			queryParams: { id: row },
		});
	}
  edit(row) {
		this.router.navigate(["/parametrage/edit-categorie"], {
			queryParams: { id: row },
		});
	}
	delete(id) {
		Swal.fire({
			title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
			icon: 'question',
			iconHtml: '?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
			cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON")
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service
					.deleteById(id)
					.subscribe(data => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.ngOnInit();
					},
						(err) => {
							console.log(err);
							Swal.fire({
								icon: 'error',
								title: 'Suppression interdite !!',
								text: 'Ce type est utilisé par d\'autre module.',
							})
						});
			}
		})
	}
	
}
export class excelDataLB {
	libelle: string;
	id:number

  constructor(item: any) {
		if (item[0] != '') {
			this.libelle = item[0];
		}
		else {
			this.libelle = '';
		}

  }

}
