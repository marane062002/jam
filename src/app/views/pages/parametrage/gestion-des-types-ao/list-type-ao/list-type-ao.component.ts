import { Component, OnInit } from '@angular/core';
import { ExcelFrService } from '../../../utils/excel-FR.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { GestionDesTypesAoService } from '../../Services/gestion-des-types-ao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-list-type-ao',
  templateUrl: './list-type-ao.component.html',
  styleUrls: ['./list-type-ao.component.scss']
})
export class ListTypeAoComponent implements OnInit {
	sizeData
	sizeData2
	isLoading2
	data: any[] = [];
	columns: any[];
	footerData: any[][] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns = [
		"id",
		"lib",
		"actions",
	];
  constructor(		private excelService: ExcelFrService,		private translate: TranslateService,		private router: Router,private service :GestionDesTypesAoService


    ) { }

  ngOnInit() {
    this.service.getAll().then((res)=>{
this.dataSource = new MatTableDataSource(res);
this.sizeData=res.length

    })
  }
	exportTable() {
		let data2: any[] = this.data;
		let json = data2.map((item) => new excelDataLB(item));
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.any.TITRE_INDEX"));
		this.excelService.exportAsExcelFile('Liste des types ao', '', this.columns, json, this.footerData, 'Liste-Besoins', this.translate.instant("PAGES.MARCHE.any.TITRE_INDEX"))
	}
  nouvelleao() {
		this.router.navigate(["/parametrage/add-type-ao"]);
	}
  applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
  show(row) {
		this.router.navigate(["/parametrage/show-type-ao"], {
			queryParams: { id: row },
		});
	}
  edit(row) {
		this.router.navigate(["/parametrage/edit-type-ao"], {
			queryParams: { id: row },
		});
	}
	handlePageEvent(event){
		
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
