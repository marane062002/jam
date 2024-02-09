import { Component, OnInit, ViewChild } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { SpinnerService } from '../../utils/spinner.service';
import { error } from '@angular/compiler/src/util';
import { NotificationService } from '../../shared/notification.service';
import { NotificationType } from '../../shared/NotificationMessage.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from "sweetalert2";

import { ChangeDetectorRef } from '@angular/core';

@Component({
	selector: "kt-marches-list",
	templateUrl: "./marches-list.component.html",
	styleUrls: ["./marches-list.component.scss"],
})
export class MarchesListComponent implements OnInit {
	// ==============================================================
	//
	// ==============================================================
	constructor(
		private service: AoService,
		private router: Router,
		private spinnerService: SpinnerService,
		private notification: NotificationService,
		private translate: TranslateService,
		private readonly changeDetectorRef: ChangeDetectorRef
		) {
		this.getMarches();
	} 
	// ==============================================================
	//
	// ==============================================================
	displayedColumns = [
		// "id",
		"NumMarche",
		"mntAdjucataire",
		"MntEngage",
		// "cautionDefinitive",
		"dateDebutMarche",
		// "modePassation",
		"actions",
	];
	// ==============================================================
	//
	// ==============================================================
	dataSize: number = 0;
	isLoading = true;
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ==============================================================
	//
	// ==============================================================
	ngOnInit() { this.getMarches();}
	// ==============================================================
	//
	// ==============================================================
	download=false
	idMarche
	getMarches() {
		const _this = this;
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		// this.service.getAllMarche().then((data) => {
		// 		this.isLoading = false;
		// 		_this.dataSize = data.length;
		// 		this.dataSource = new MatTableDataSource(data);
		// 		this.dataSource.paginator = this.paginator;
		// 		this.dataSource.sort = this.sort;
		// 	}).catch(error => {
		// 	_this.dataSize = 0;
		// 	this.isLoading = false;
		// 	this.notification.sendMessage({
		// 		message: 'Oops! Is your server disconnected?!',
		// 		type: NotificationType.error
		// 	})
		// })	.finally(() => {
		// 	this.spinnerService.stop(spinnerRef);// stop spinner
		//   });

		this.service.findByStatutAoValideOrderByIdDesc(1).then((data) => {
				this.isLoading = false;
				_this.dataSize = data.content.length;
				this.dataSource = new MatTableDataSource(data.content);
				for(let i=0;i<this.dataSource.data.length;i++){
					this.service.findMarcheByAo_Id(this.dataSource.data[i].id).subscribe((res)=>{
						
						if(res!=null){
this.download=true
this.idMarche=res.id
						}else{
						this.download=false}
					})
				}
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			
			this.spinnerService.stop(spinnerRef);
		  }, 
			(err) => {
			  console.log(err);
			  this.isLoading = false;
			  //this.spinnerService.stop(spinnerRef);
			});
		
	}

	downloadRapport(id){
		this.service.fileSeance("generateRapportPresentationAO/",id).subscribe((res)=>{
			const file = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "RAPPORT DE PRESENTATION APPEL D'OFFRE.doc";
				link.href = readfile;
				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				setTimeout(() => {
					window.URL.revokeObjectURL(readfile);
					link.remove();
				}, 100);
		})

	}


	// ==============================================================
	//
	// ==============================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ==============================================================
	//
	// ==============================================================
	nouveauMarche() {
		this.router.navigate(["/marches/marche-form"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.MARCHE.TITRE_INDEX"));
	}
	// ==============================================================
	//
	// ==============================================================
	showmarche(idM) {
		// this.router.navigate(["/marches/ao-consultation-detail"], {
		// 	queryParams: { id: idM, page: 1 },
		// });
		
		this.router.navigate(["/marches/marche-detail"], {
			queryParams: { id: idM },
		});
		

	}
	// ==============================================================
	//
	// ==============================================================
	editMarche(idM) {
		this.router.navigate(["/marches/ao-consultation-edit"], {
			queryParams: { id: idM, page: 1 },
		});
		// this.router.navigate(["/marches/marche-edit"], {
		// 	queryParams: { id: idM },
		// }); 
	}
	// ==============================================================
	//
	// ==============================================================
	deleteMarche(idM): void {
		Swal.fire({
			title: this.translate.instant("PAGES.GENERAL.MSG_DELETED"),
			icon: 'question',
			iconHtml: '?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'Oui',
			cancelButtonText: 'Non',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service
				.deleteMarcheById(idM)
				.subscribe(data => {
					Swal.fire({
						position: 'center',
						icon: 'success',
						title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
						showConfirmButton: false,
						timer: 1500
					})
					this.getMarches();
				},
				(err) => {
					console.log(err);
					Swal.fire({
						icon: 'error',
						title: 'Suppression interdite !!',
						text: 'Ce numéro de marché est utilisé par d\'outre module.',
					  })
				});
			}
		})
	}

	ngAfterViewChecked(){
		//your code to update the model
		this.changeDetectorRef.detectChanges();
	 }
}
