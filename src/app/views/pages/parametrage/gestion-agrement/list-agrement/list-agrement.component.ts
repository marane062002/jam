import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
import { ExcelFrService } from '../../../utils/excel-FR.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GestionAgrementService } from '../../Services/gestion-agrement.service';
import { AoService } from '../../../shared/ao.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'kt-list-agrement',
  templateUrl: './list-agrement.component.html',
  styleUrls: ['./list-agrement.component.scss']
})
export class ListAgrementComponent implements OnInit {
  data: any[] = [];
  sizeData2
  isLoading2
  sizeData
	columns: any[];
	footerData: any[][] = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns = [
		"id",
		"lib",
    "dateAgrement",
    "observation",
		"actions",
	];
  constructor(		private excelService: ExcelFrService,	private datePipe: DatePipe,	private translate: TranslateService,
    		private router: Router,private service :GestionAgrementService,private serviceAo:AoService


    ) { }

  ngOnInit() {
    this.serviceAo.getAllAgrementMarche().subscribe((res)=>{
this.dataSource = new MatTableDataSource(res);
for(let i=0;i<this.dataSource.data.length;i++) {
this.dataSource.data[i].dateAgrement= this.datePipe.transform(this.dataSource.data[i].dateAgrement, "dd/MM/yyyy")

}
    })
  }
	exportTable() {
		let data2: any[] = this.data;
		let json = data2.map((item) => new excelDataLB(item));
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.any.TITRE_INDEX"));
		this.excelService.exportAsExcelFile('Liste des catégorie', '', this.columns, json, this.footerData, 'Liste-Besoins', this.translate.instant("PAGES.MARCHE.any.TITRE_INDEX"))
	}

	handlePageEvent(event){}
  nouvelleao() {
		this.router.navigate(["/parametrage/add-agrement"]);
	}
  applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
  show(row) {
		this.router.navigate(["/parametrage/show-agrement"], {
			queryParams: { id: row },
		});
	}
  edit(row) {
		this.router.navigate(["/parametrage/edit-agrement"], {
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
				this.serviceAo
					.deleteAgrementMarcheById(id)
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
	agrement: string;
  dateAgrement:Date;
  observation:string;
	id:number

  constructor(item: any) {
		if (item[0] != '') {
			this.agrement = item[0];
		}
		else {
			this.agrement = '';
		}
    if (item[1] != '') {
			this.dateAgrement = item[1];
		}
		else {
			this.dateAgrement = new Date();
		}

    if (item[2] != '') {
			this.observation = item[2];
		}
		else {
			this.observation = '';
		}
  }

}
