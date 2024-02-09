import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, PageEvent } from "@angular/material";
import { AoService } from "../../../shared/ao.service";
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from '../../../utils/spinner.service';
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { ExcelFrService } from "../../../utils/excel-FR.service";
import { DialogALertAOComponent } from "../../../marche/dialog-alert-ao/dialog-alert-ao.component";
import { AppState } from "../../../../../core/reducers";
import { select, Store } from "@ngrx/store";
import { currentUser, User } from '../../../../../core/auth';
import { Observable } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { GestionDesTypesAoService } from "../../../parametrage/Services/gestion-des-types-ao.service";

@Component({
	selector: "kt-ao-list",
	templateUrl: "./ao-list.component.html",
	styleUrls: ["./ao-list.component.scss"],
})
export class EbListComponent implements OnInit {
	aoData: any;
	data: AO[] = [];
	columns: any[];
	footerData: any[][] = [];
	dataAlert: any = [];
	maintien: any = [];
	commision: any = [];
	user$: Observable<User>;
	formGroup: FormGroup;
	lisTypePrestationAo;
	natureAoAll;
	typeMarcheAll
	showHandlePageEvent: boolean = false;
	// ====================================================
	//
	//=====================================================
	constructor(private serviceTypeAo:GestionDesTypesAoService,
		private service: AoService,
		private router: Router,
		private translate: TranslateService,
		private spinnerService: SpinnerService,
		private datePipe: DatePipe,
		private excelService: ExcelFrService,
		public dialog: MatDialog,
		private store: Store<AppState>,
	) {
		
		this.user$ = this.store.pipe(select(currentUser));
		this.formGroup = new FormGroup({
			programme: new FormControl(null),
			convention: new FormControl(null),
			typeAO: new FormControl(""),
			typePrestation: new FormControl(null),
			typeMarche: new FormControl(null),
			budgetEstimatif: new FormControl(""),
			estimation: new FormControl(""),
			objet: new FormControl(""),
			objetAR: new FormControl(""),
			naturePrix: new FormControl(""),
			qualification: new FormControl(null),
			natureAo: new FormControl(null),
			caution: new FormControl(""),
			loi: new FormControl(""),
			descriptif: new FormControl(""),
			existanceVisite: new FormControl(null),
			existEchantillon: new FormControl(null),
			existanceAgrement: new FormControl(null),
			existQualification: new FormControl(null),
			existanceAllotisse: new FormControl(""),
			sendToServiceMarche: new FormControl(null),
			createurUser: new FormControl("")
		});
	}

	typesAO 
	naturesPrix = ["Prix révisable", "Non révisable"];
	lois = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

	// ====================================================
	//
	//=====================================================
	displayedColumns = [
		//"numAo",
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
		"etatCommentaire",

		"motifAnnulation", //
		"actions",
	];

	displayedColumns1 = [
		"objet",
		"budgetEstimatif",
		"typeMarche",
		"etatCommentaire",

		"actions"
	];
	// ====================================================
	//
	//=====================================================
	dataSource: MatTableDataSource<AO>;
	dataSource2: MatTableDataSource<AO>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================================
	//
	//=====================================================
	aoDatasource: AO[] = [];
	pps;
	isLoading = true;
	isLoading2 = true;
	sizeData = 0;
	sizeData2 = 0;
	divisionLibelle = "";
	openDialog(id: string): void {
		if (id == '1') {
			this.dataAlert.maintien = null;
			this.dataAlert.commision = this.commision;
		} else {
			this.dataAlert.commision = null;
			this.dataAlert.maintien = this.maintien;
		}
		const dialogRef = this.dialog.open(DialogALertAOComponent, {
			width: '900px',
			data: this.dataAlert,
			id: id
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.ngOnInit();
		});
	}


	// ====================================================
	//
	//=====================================================
	user
	async ngOnInit() {
		this.serviceTypeAo.getAll().then((res)=>{
			this.typesAO=res
			
		})
		
		this.user$ = this.store.pipe(select(currentUser));
		this.isSearch = false;
		this.service.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
		this.service.getAllTypeMarche().subscribe((data) => {
			this.typeMarcheAll = data;
		});
		this.service.getAllNatureAo().subscribe((data) => {
			this.natureAoAll = data;
		});
		this.service.alertCommision().subscribe(res => {
			this.commision = res;
			this.dataAlert.commision = res;
		}, err => {
			console.log(err)
		})
		this.service.alertMaintien().subscribe(res => {
			console.log(res);
			this.maintien = res;
			this.dataAlert.maintien = res;
		}, err => {
			console.log(err)
		})
		
		this.columns = ['N° AO', 'Objet', 'Objer AR', 'Budget (Dhs)', 'Caution (Dhs)', 'Date reception', 'Date ouverture plis', 'Type marche', 'Nature Ao', 'Statut', 'Mode passation', 'Seuil minimal', 'Type AO', 'Nature prix', 'Type prestation', 'Sous type Prestation', 'Motif annulation'];
		if (this.isSearch == false) {
			this.user$.subscribe((user: User) => {

				//var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
				// if (user) {
					
					console.log("lllllllllllllllllllllll", user.fullname);
					// console.log(user.fullname);
					
					this.service.findAllByParam(user.fullname).then((data) => {
						this.data = data;
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
						
						//this.spinnerService.stop(spinnerRef);
					}, 
						(err) => {
							console.log(err);
							this.isLoading = false;
							//this.spinnerService.stop(spinnerRef);
						});
				// } else {
				// 	this.service.getAllAo().then((data) => {
				// 		this.data = data;
				// 		this.isLoading = false;
				// 		this.sizeData = data.length;
				// 		this.dataSource = new MatTableDataSource(data);
				// 		this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				// 		this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				// 		this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				// 		this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				// 		this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				// 		this.dataSource.paginator = this.paginator;
				// 		this.dataSource.sort = this.sort;
				// 		;

				// 		//	this.spinnerService.stop(spinnerRef);// stop spinner
				// 	},
				// 		(err) => {
				// 			console.log(err);
				// 			this.isLoading = false;
				// 			//this.spinnerService.stop(spinnerRef);// stop spinner
				// 		});
				// }
			});
		}
	}
	ValideAo(id){
		
		this.service.updateStatutVersEnAttenteValidation(id).subscribe(res=>{
			console.log(res);
			let HistoriqueStatutToToEnAttenteValidation={
				ao: { id: res.id,},
				modificateurUser:window.localStorage.getItem("fullnameUser"),
	
			}
			
			this.service.createHistoriqueUpdateStatutToEnAttenteValidation(HistoriqueStatutToToEnAttenteValidation).subscribe((data)=>{
				
				Swal.fire(
					'Cette consultation attend la validation ',
					' ',
					'success'
				  )
				  this.ngOnInit();
				},err=>{
				  console.log(err)
			})
			
			
		  })
	}
	// ====================================================
	//
	//=====================================================




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

	initForm() {
		this.isSearch = false;
		this.isLoading2 = true;
		this.showHandlePageEvent = false;
		this.formGroup = new FormGroup({
			programme: new FormControl(null),
			convention: new FormControl(null),
			typeAO: new FormControl(""),
			typePrestation: new FormControl(null),
			typeMarche: new FormControl(null),
			budgetEstimatif: new FormControl(""),
			estimation: new FormControl(""),
			objet: new FormControl(""),
			objetAR: new FormControl(""),
			naturePrix: new FormControl(""),
			qualification: new FormControl(null),
			natureAo: new FormControl(null),
			caution: new FormControl(""),
			loi: new FormControl(""),
			descriptif: new FormControl(""),
			existanceVisite: new FormControl(null),
			existEchantillon: new FormControl(null),
			existanceAgrement: new FormControl(null),
			existQualification: new FormControl(null),
			existanceAllotisse: new FormControl(""),
			sendToServiceMarche: new FormControl(null),
			createurUser: new FormControl("")
		});
		this.ngOnInit();
	}
	isSearch: boolean = false;
	onSubmit() {
		this.isSearch = true;
		if (this.isSearch == true) {
			if (this.formGroup.value.loi != "") {
				this.formGroup.value.loi = parseInt(this.formGroup.value.loi);
			} else {
				this.formGroup.value.loi = parseInt('0');
			}
			if (this.formGroup.value.budgetEstimatif != "") {
				this.formGroup.value.budgetEstimatif = parseInt(this.formGroup.value.budgetEstimatif);
			} else {
				this.formGroup.value.budgetEstimatif = parseInt('0');
			}
			
			if (this.formGroup.value.estimation != "") {
				this.formGroup.value.estimation = parseInt(this.formGroup.value.estimation);
			} else {
				this.formGroup.value.estimation = parseInt('0');
			}

			if (this.formGroup.value.caution != "") {
				this.formGroup.value.caution = parseInt(this.formGroup.value.caution);
			} else {
				this.formGroup.value.caution = parseInt('0');
			}

			if (this.formGroup.value.existanceAgrement == true) {
				this.formGroup.value.existanceAgrement = 1
			}		
			if (this.formGroup.value.existanceAgrement == false) {
				this.formGroup.value.existanceAgrement = 0
			}
			if (this.formGroup.value.existQualification == true) {
				this.formGroup.value.existQualification = 1
			}		
			if (this.formGroup.value.existQualification == false) {
				this.formGroup.value.existQualification = 0
			}
		

			if (this.formGroup.value.existEchantillon == true) {
				this.formGroup.value.existEchantillon = 1
			}
			if (this.formGroup.value.existanceVisite == false) {
				this.formGroup.value.existEchantillon = 0
			}

			if (this.formGroup.value.existanceVisite == true) {
				this.formGroup.value.existanceVisite = 1
			}
			if (this.formGroup.value.existanceVisite == false) {
				this.formGroup.value.existanceVisite = 0
			}
			if (this.formGroup.value.sendToServiceMarche == true) {
				this.formGroup.value.sendToServiceMarche = 1
			}
			if (this.formGroup.value.sendToServiceMarche == false) {
				this.formGroup.value.sendToServiceMarche = 0
			}
			this.user$.subscribe((user1: User) => {
				this.formGroup.value.createurUser = user1.fullname;
			})
			
			this.service.research(0, 5, this.formGroup.value).subscribe(
				(res: any) => {
					console.log(res);
					this.data = res.content;
					this.isLoading2 = false;
					this.sizeData2 = res.totalElements;
					this.dataSource2 = new MatTableDataSource(res.content);
					this.showHandlePageEvent = true;
					this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
					this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
					this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
					this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
					this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
					this.dataSource2.paginator = this.paginator;
					this.dataSource2.sort = this.sort;
					;

				},
				(err) => {
					console.log(err);
				}
			);
		}
	}


	handlePageEvent(event: PageEvent) {
		if (this.showHandlePageEvent == true) {
			let pageSize = event.pageSize;
			let pageIndex = event.pageIndex;
			this.isSearch = true;
			if (this.isSearch == true) {
				if (this.formGroup.value.loi != "") {
					this.formGroup.value.loi = parseInt(this.formGroup.value.loi);
				} else {
					this.formGroup.value.loi = parseInt('0');
				}
				if (this.formGroup.value.budgetEstimatif != "") {
					this.formGroup.value.budgetEstimatif = parseInt(this.formGroup.value.budgetEstimatif);
				} else {
					this.formGroup.value.budgetEstimatif = parseInt('0');
				}

				if (this.formGroup.value.estimation != "") {
					this.formGroup.value.estimation = parseInt(this.formGroup.value.estimation);
				} else {
					this.formGroup.value.estimation = parseInt('0');
				}

				if (this.formGroup.value.caution != "") {
					this.formGroup.value.caution = parseInt(this.formGroup.value.caution);
				} else {
					this.formGroup.value.caution = parseInt('0');
				}
				if (this.formGroup.value.existanceAgrement == true) {
					this.formGroup.value.existanceAgrement = 1
				}		
				if (this.formGroup.value.existanceAgrement == false) {
					this.formGroup.value.existanceAgrement = 0
				}
			
				if (this.formGroup.value.existQualification == true) {
					this.formGroup.value.existQualification = 1
				}		
				if (this.formGroup.value.existQualification == false) {
					this.formGroup.value.existQualification = 0
				}
			
	
				if (this.formGroup.value.existEchantillon == true) {
					this.formGroup.value.existEchantillon = 1
				}
				if (this.formGroup.value.existanceVisite == false) {
					this.formGroup.value.existEchantillon = 0
				}
	
				if (this.formGroup.value.existanceVisite == true) {
					this.formGroup.value.existanceVisite = 1
				}
				if (this.formGroup.value.existanceVisite == false) {
					this.formGroup.value.existanceVisite = 0
				}
				if (this.formGroup.value.sendToServiceMarche == true) {
					this.formGroup.value.sendToServiceMarche = 1
				}
				if (this.formGroup.value.sendToServiceMarche == false) {
					this.formGroup.value.sendToServiceMarche = 0
				}
				this.user$.subscribe((user1: User) => {
					this.formGroup.value.createurUser = user1.fullname;
				})
				this.service.research(pageIndex, pageSize, this.formGroup.value).subscribe(
					(res: any) => {
						console.log(res);
						this.data = res.content;
						this.isLoading2 = false;
						//this.sizeData2 = res.totalElements;
						this.dataSource2 = new MatTableDataSource(res.content);
						// this.showHandlePageEvent = true;
						/* this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
						this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
						this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
						this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
						this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
						this.dataSource2.paginator = this.paginator;
						this.dataSource2.sort = this.sort; */
					},
					(err) => {
						console.log(err);
					}
				);
			}
		}
	}
	createModelAo(i: number): AO {

		return {
			numAo: this.aoData[i].numAo,
			objet: this.aoData[i].objet,
			objetAR: this.aoData[i].objetAR,
			budgetEstimatif: this.aoData[i].budgetEstimatif,
			caution: this.aoData[i].caution,
			dateReception: this.datePipe.transform(this.aoData[i].dateReception, "dd/MM/yyyy"),
			dateOuverturePlis: this.datePipe.transform(this.aoData[i].dateOuverturePlis, "dd/MM/yyyy HH:mm"),
			typeMarche: this.aoData[i].typeMarche.libelle,
			natureAo: this.aoData[i].natureAo.libelle,
			//division:  this.divisionLibelle,
			statutAo: this.aoData[i].statutAo.libelle,
			modePassation: this.aoData[i].modePassation,
			seuilMinimal: this.aoData[i].seuilMinimal,
			typeAO: this.aoData[i].typeAO,
			naturePrix: this.aoData[i].naturePrix,
			typePrestation: this.aoData[i].sousTypePrestation.typePrestation.libelle,
			sousTypePrestation: this.aoData[i].sousTypePrestation.libelle,
			motifAnnulation: this.aoData[i].motifAnnulation,
			//Ptechnique:  this.aoData[i].Ptechnique,
			//Pfinancier:  this.aoData[i].Pfinancier,

		};
	}
	// ====================================================
	//
	//=====================================================
	nouvelleao() {
		this.router.navigate(["/programme/add-EtudeBesion"]);
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
			queryParams: { id: idAo, page: 1 },
		});
	}
	// ====================================================
	//
	//=====================================================
	editao(idAo) {
		this.router.navigate(["/marches/ao-edit"], {
			queryParams: { id: idAo, page: 1 },
		});
	}

	// ====================================================
	//
	//=====================================================
	deleteAo(idAo) {
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
					.deleteAoById(idAo)
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
								text: 'Ce numéro d\'appel d\'offres est utilisé par d\'autre module.',
							})
						});
			}
		})
	}

	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		let data2: any[] = this.data;
		let json = data2.map((item) => new excelDataLB(item));
		//this.service.exportToExcel("exportData", this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"));
		this.excelService.exportAsExcelFile('Liste des besoins', '', this.columns, json, this.footerData, 'Liste-Besoins', this.translate.instant("PAGES.MARCHE.AO.TITRE_INDEX"))
	}
}

export class excelDataLB {
	numeroAO: string;
	objet: string;
	objetAr: string;
	budget: string;
	caution: string;
	dateReception: string;
	dateOuverturePlis: string;
	typeMarche: string;
	natureAO: string;
	statut: string;
	modePassation: string;
	seuilMinimal: string;
	typeAO: string;
	naturePrix: string;
	typePrestation: string;
	sousTypePrestation: string;
	motifAnnulation: string;

	constructor(item: any) {
		if (item[0] != '') {
			this.numeroAO = item[0];
		}
		else {
			this.numeroAO = '';
		}

		if (item[1] != '') {
			this.objet = item[1];
		}
		else {
			this.objet = '';
		}

		if (item[8] != '') {
			this.objetAr = item[8];
		}
		else {
			this.objetAr = '';
		}

		if (item[2] != '') {
			this.budget = item[2];
		}
		else {
			this.budget = '';
		}

		if (item[9] != '') {
			this.caution = item[9];
		}
		else {
			this.caution = '';
		}

		this.dateReception = '';

		this.dateOuverturePlis = '';

		if (item[4] != '') {
			this.typeMarche = item[4];
		}
		else {
			this.typeMarche = '';
		}

		if (item[5] != '') {
			this.natureAO = item[5];
		}
		else {
			this.natureAO = '';
		}

		if (item[3] != '') {
			this.statut = item[3];
		}
		else {
			this.statut = '';
		}

		if (item[5] != '') {
			this.modePassation = item[5];
		}
		else {
			this.modePassation = '';
		}

		this.seuilMinimal = '';

		if (item[17] != '') {
			this.typeAO = item[17];
		}
		else {
			this.typeAO = '';
		}

		if (item[18] != '') {
			this.naturePrix = item[18];
		}
		else {
			this.naturePrix = '';
		}

		if (item[20] != '') {
			this.typePrestation = item[20];
		}
		else {
			this.typePrestation = '';
		}

		if (item[19] != '') {
			this.sousTypePrestation = item[19];
		}
		else {
			this.sousTypePrestation = '';
		}

		this.motifAnnulation = '';

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
