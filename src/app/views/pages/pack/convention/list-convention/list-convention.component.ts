import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ConventionMarcheService } from '../../../shared/conventionService';
import { ExcelAssociationService } from '../../../utils/excel-association.service';
import { PartiePreneurService } from '../../../shared/PartiePreneurService';
import { FormControl, FormGroup } from '@angular/forms';

 
@Component({
	selector: 'kt-list-convention',
	templateUrl: './list-convention.component.html',
	styleUrls: ['./list-convention.component.scss']
})
export class ListConventionComponent implements OnInit {
	language=localStorage.getItem('language');
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
	listEtatsConvention = [];
	etatsConvention = ["EN_COURS_PREPARATION", "EN_COURS_SIGNATURE", "SIGNER", "ACHEVER"];
	selectedOptionsEC: string[] = [];

	addItemEtatConvention(event: any) {
		if (event[0] == "ALL") {
			this.listEtatsConvention = this.etatsConvention;
			this.selectedOptionsEC= this.etatsConvention.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.etatsConvention.length) {
			this.listEtatsConvention = [];
			this.selectedOptionsEC = [];
		} else {
			this.listEtatsConvention = event;
			this.selectedOptionsEC = event;
		}
	}
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
		private partiePreneurService: PartiePreneurService,

		private conventionMarcheService: ConventionMarcheService,
		private excelService: ExcelAssociationService) {
		this.data = [

		]
	}
	RetourEmbalages(): void {
		this.router.navigate(["pages/Convention/list-convention"]);

	}
	listPP;
	sizeData
	couts: [];
	isSearch=false
	ngOnInit() {
		this.formGroup = new FormGroup({
			partiePreneurs:new FormControl([]),
			date:new FormControl(null),
			etatConvention:new FormControl([]),
			minMontant: new FormControl(0),
			maxMontant: new FormControl(0)
		});
		this.partiePreneurService.all().subscribe(res => {
			this.listPP = res;
		})
		this.columns = [
			"Id",
			"object",
			"Date",
			"Duree",
			"Mantant",
		];
		this.conventionMarcheService.all().subscribe(res => {
			console.log(res);
			for (let i = 0; i < res.length; i++) {
				if (res[i].montant != null) {
					res[i].montant = res[i].montant.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				}
			}
			this.data = res;
			this.sizeData=res.length
			this.dataSource = new MatTableDataSource(this.data);
			this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
			this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
			this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
			this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
			this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		})



	}
	handlePageEvent(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		// this.conventionMarcheService.Page(pageIndex, pageSize).subscribe((res: any) => {
		// 	this.data = res.content
		// 	this.dataSource.data.length = res.totalElements;
		// 	this.dataSource = new MatTableDataSource(this.data);
		// 	// this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
		// 	// this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
		// 	// this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
		// 	// this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
		// 	// this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
		// 	// this.dataSource.paginator = this.paginator;
		// 	// this.dataSource.sort = this.sort;
		// })
		if(this.formGroup.value.etatConvention.length==0){
			this.formGroup.value.etatConvention=''
		}else{
			if (this.listEtatsConvention.length != 0) {
				this.formGroup.value.etatConvention = `(${this.listEtatsConvention.map((item) => `'${item}'`).join(", ")})`;
			}
		}
		
		this.conventionMarcheService.research(pageIndex,pageSize,this.formGroup.value).subscribe((res:any)=>{
			(this.dataSource.data = res.content)
		
		})
	}
	formGroup:FormGroup;
  formatDate(){
    this.formGroup.value.date.setDate(this.formGroup.value.date.getDate()+1);
    this.formGroup.value.date.setUTCHours('00');
  }
	onSubmit(){
		this.isSearch=true
		// this.formatDate()
this.formGroup
if(this.formGroup.value.etatConvention.length==0){
	this.formGroup.value.etatConvention=''
}else{
	if (this.listEtatsConvention.length != 0) {
		this.formGroup.value.etatConvention = `(${this.listEtatsConvention.map((item) => `'${item}'`).join(", ")})`;
	}
}

this.conventionMarcheService.research(0,this.sizeData,this.formGroup.value).subscribe((res:any)=>{
	(this.dataSource.data = res.content)

})
// if(this.formGroup.value.minMontant!=0 && this.formGroup.value.maxMontant!=0 && this.formGroup.value.partiePreneurs.length==0){
// 	this.conventionMarcheService
// 	.searchConventionsByMontantRange(this.formGroup.value.minMontant, this.formGroup.value.maxMontant)
// 	.subscribe((conventions) => (this.dataSource.data = conventions));
// }
// if(this.formGroup.value.minMontant==0 && this.formGroup.value.maxMontant==0 && this.formGroup.value.partiePreneurs.length>0){
// 	this.conventionMarcheService.getConventionsByPartiePreneurs(this.formGroup.value.partiePreneurs).subscribe((conventions) => (this.dataSource.data = conventions));

// }
// if(this.formGroup.value.partiePreneurs.length>0 && this.formGroup.value.minMontant!=0 && this.formGroup.value.maxMontant!=0){
// 	this.conventionMarcheService.searchByPartiePreneursAndMontantRange(this.formGroup.value.partiePreneurs,this.formGroup.value.minMontant,this.formGroup.value.maxMontant).subscribe((conventions) => (this.dataSource.data = conventions));
// }
// this.conventionMarcheService
  
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	DetailAssociation(id: number): void {
		this.router.navigateByUrl("/convention/detailleConvention?id=" + id);
		localStorage.setItem('idConvention',JSON.stringify(id));
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
				this.conventionMarcheService.delete(id).subscribe(res => {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500
					})
					this.ngOnInit();
				}, (err: HttpErrorResponse) => {
					console.log(err.status);
					console.log(err.headers);

					if (err.status == 500) {

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
