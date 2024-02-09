import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { PartiePreneurService } from '../../../shared/PartiePreneurService';

@Component({
	selector: 'kt-partie-preneur-list',
	templateUrl: './partie-preneur-list.component.html',
	styleUrls: ['./partie-preneur-list.component.scss']
})
export class PartiePreneurListComponent implements OnInit {

	TypeAlert: any;
	data: excelData[] = [];
	columns: any[];
	footerData: any[][] = [];
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"nom",
		"prenom",
		"email",
		"organisme",
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
		private partiePreneurService: PartiePreneurService) {
		this.data = [

		]
	}
	ngOnInit() {
		this.columns = [
			"Id",
			"nom",
			"prenom",
			"email",
			"organisme",
		];
		this.partiePreneurService.all().subscribe(res => {
			console.log(res);
			this.data = res;
			this.dataSource = new MatTableDataSource(this.data);
		})



	}
	RetourEmbalages(): void {
		this.router.navigate(["convention/PartiePreneurList"]);

	}
	addPP(): void {
		this.router.navigate(["/convention/new-PartiePreneur"], {
			queryParams: { id: 0 },
		});
	}
	update(id): void {
		console.log(id)
		this.router.navigate(["/convention/new-PartiePreneur"], {
			queryParams: { id: id },
		});
	}


	DetailAssociation(id: number): void {
		this.router.navigateByUrl("/convention/detaille-PartiePreneur?id=" + id);
	}
	ModifierAssociation(): void {
		this.router.navigate(["pages/Convention/updt-convention"]);
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
				this.partiePreneurService.delete(id).subscribe(res => {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500
					})
					this.ngOnInit();
				}, (err: HttpErrorResponse) => {
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



	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
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

