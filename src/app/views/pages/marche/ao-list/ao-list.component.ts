import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from "@angular/material";
import { AoService } from "../../shared/ao.service";
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { SpinnerService } from '../../utils/spinner.service';
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { OrganisationService } from "../../organisation/organisation.service";
import { ExcelFrService } from "../../utils/excel-FR.service";
import { DialogALertAOComponent } from "../dialog-alert-ao/dialog-alert-ao.component";

import { Observable } from "rxjs";
import { AppState } from "../../../../core/reducers";
import { select, Store } from "@ngrx/store";
import { currentUser, currentUserPermissions, Permission, User} from '../../../../core/auth';

@Component({
	selector: "kt-ao-list",
	templateUrl: "./ao-list.component.html",
	styleUrls: ["./ao-list.component.scss"],
}) 
export class AoListComponent implements OnInit {
	aoData: any;
	data: AO[] = [];
	columns: any[];
	footerData: any[][] = [];
	dataAlert: any= [];
	maintien: any= [];
	commision: any= [];
	user$: Observable<Permission[]>;
	// ====================================================
	//
	//=====================================================
	constructor(
		private service: AoService,
		private router: Router,
		private translate: TranslateService,
		private spinnerService: SpinnerService,
		private datePipe: DatePipe,
		private excelService: ExcelFrService,
		public dialog: MatDialog,
		private store: Store<AppState>,
	) {
		this.user$ =  this.store.pipe(select(currentUserPermissions));
		
	}
	// ====================================================
	//
	//=====================================================
	displayedColumns = [
		"numAo",
		"objet",
		"objetAR", //
		"natureAo", //
		"budgetEstimatif",
		"caution", //
		"dateReception",//
		//"division",//
		"typeMarche",
		"dateOuverturePlis", //
		"heureOuverturePlis", //
		"modePassation", //
		"typeAO", //
		"naturePrix", //
		"typePrestation", //
		"sousTypePrestation", //
		"isValideDg", //
		"isValideTresorerie", //
		"isValideSG", //
		"statutAo",
		"motifAnnulation", //
		"actions",
	];
	// ====================================================
	//
	//=====================================================
	dataSource: MatTableDataSource<AO>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	aoDatasource: AO[] = [];
	pps;
	isLoading = true;
	sizeData = 0;
	divisionLibelle = "";
	openDialog(id:string): void {
		if(id=='1'){
            this.dataAlert.maintien=null;
			this.dataAlert.commision=this.commision;
		}else{
			this.dataAlert.commision=null;
			this.dataAlert.maintien=this.maintien;
		}
		const dialogRef = this.dialog.open(DialogALertAOComponent, {
		  width: '900px',
		  data: this.dataAlert,
		  id:id
		});
	
		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		  this.ngOnInit();
		});
	  }
	 
	 
	// ====================================================
	//
	//=====================================================
	ngOnInit() {
		this.populate();
		// this.service.alertCommision().subscribe(res=>{
		// 	this.commision=res;
		// 	this.dataAlert.commision=res;
		// },err=>{
		// 	console.log(err)
		// })
		// 
		// this.service.alertMaintien().subscribe(res=>{
		// 	console.log(res);
		// 	this.maintien=res;
		// 	this.dataAlert.maintien=res;
		// },err=>{
		// 	console.log(err)
		// })

		this.columns = ['N° AO', 'Objet','Objer AR', 'Budget (Dhs)', 'Caution (Dhs)', 'Date reception', 'Date ouverture plis', 'Type marche', 'Nature Ao', 'Statut', 'Mode passation', 'Seuil minimal', 'Type AO', 'Nature prix', 'Type prestation', 'Sous type Prestation', 'Motif annulation'];


		
		
		
		this.service.getAllAoData()
			.then((data) => {
				this.aoData = data;
				for (let i = 0; i < this.aoData.length; i++) {
					this.data.push(this.createModelAo(i));
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ====================================================
	//
	//=====================================================
	public populate() {
		const _this = this;
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		
		this.user$.subscribe((p:Permission[])=>{
			/* if(p.some(e=>e.id==63)){
						this.service.findAllByStatus(3).then((data) => {
							this.isLoading = false;
							this.sizeData = data.length;
							this.dataSource = new MatTableDataSource(data);
							this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
							this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
							this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
							this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
							this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
							this.dataSource.paginator = this.paginator;
							this.dataSource.sort = this.sort;
							this.spinnerService.stop(spinnerRef);
					},
				(err) => {
					console.log(err);
					this.isLoading = false;
					//this.spinnerService.stop(spinnerRef);
				});
			} else{ */
					this.service.getAllAo().then((data) => {
									this.isLoading = false;
									_this.sizeData = data.length;
									this.dataSource = new MatTableDataSource(data);
									this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
									this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
									this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
									this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
									this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
									this.dataSource.paginator = this.paginator;
									this.dataSource.sort = this.sort;
									this.spinnerService.stop(spinnerRef);// stop spinner
								},
								(err) => {
									console.log(err);
									this.isLoading = false;
									this.spinnerService.stop(spinnerRef);// stop spinner
								}
							);
								//} 
		});
		
	
	}
	// ====================================================
	//
	//=====================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
	// ====================================================
	//
	//=====================================================
	createModelAo(i: number): AO {
		
		return {
			numAo:  this.aoData[i].numAo,
			objet:  this.aoData[i].objet,
			objetAR:  this.aoData[i].objetAR,
			budgetEstimatif:  this.aoData[i].budgetEstimatif,
			caution:  this.aoData[i].caution,
			dateReception: this.datePipe.transform(this.aoData[i].dateReception, "dd/MM/yyyy"),
			dateOuverturePlis:  this.datePipe.transform(this.aoData[i].dateOuverturePlis, "dd/MM/yyyy HH:mm"),
			typeMarche:  null,
			natureAo:  null,
			//division:  this.divisionLibelle,
			statutAo:  this.aoData[i].statutAo.libelle,
			modePassation:  this.aoData[i].modePassation,
			seuilMinimal:  this.aoData[i].seuilMinimal,
			typeAO:  this.aoData[i].typeAO,
			naturePrix:  this.aoData[i].naturePrix,
			typePrestation:  this.aoData[i].sousTypePrestation.typePrestation.libelle,
			sousTypePrestation:  this.aoData[i].sousTypePrestation.libelle,
			motifAnnulation:  this.aoData[i].motifAnnulation,
			//Ptechnique:  this.aoData[i].Ptechnique,
			//Pfinancier:  this.aoData[i].Pfinancier,

		};
	}
	// ====================================================
	//
	//=====================================================
	nouvelleao(idAo) {
		this.router.navigate(["/marches/ao-form"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	AddBp(idAo) {
		this.router.navigate(["/marches/ligneBP-form"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	showao(idAo) {
		this.router.navigate(["/marches/ao-detail"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	editao(idAo) {
		this.router.navigate(["/marches/ao-edit"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	editSm(idAo) {
		this.router.navigate(["/marches/ao-edit-sm"], {
			queryParams: { id: idAo },
		});
	}
	// ====================================================
	//
	//=====================================================
	deleteAo(idAo) {
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
					.deleteAoById(idAo)
					.subscribe(data => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.populate();
					},
						(err) => {
							console.log(err);
							Swal.fire({
								icon: 'error',
								title: 'Suppression interdite !!',
								text: 'Ce numéro d\'appel d\'offres est utilisé par d\'outre module.',
							})
						});
			}
		})
	}

	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"));
		this.excelService.exportAsExcelFile('Liste des appels d\'offres', '', this.columns, this.data, this.footerData, 'Liste-AO', this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"))
	}

}
export interface AO {
	numAo: string;
	objet: string;
	objetAR: string;
	budgetEstimatif: number;
	caution: number;
	dateReception: string;
	dateOuverturePlis: string;
	typeMarche: string;
	natureAo: string;
	//division: string;
	statutAo: string;
	modePassation: string;
	//Ptechnique: number;
	//Pfinancier: number;
	seuilMinimal: number;
	typeAO: string;
	naturePrix: string;
	typePrestation: string;
	sousTypePrestation: string;
	motifAnnulation: string;
}
