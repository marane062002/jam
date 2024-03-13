import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { AutorisationsService } from "../../shared/autorisations.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { NotificationService } from "../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { PersonnePhysiqueService } from "../../shared/personne-physique.service";
import { PersonneMoraleService } from "../../shared/personne-morale.service";
import { Page } from "../../utils/pagination/page";
import { CustomPaginationService } from "../../utils/pagination/services/custom-pagination.service";
import { FormControl, FormGroup } from "@angular/forms";
import { BiensService } from "../../shared/biens.service";
import { ReclamationsService } from "../../shared/reclamations.service";

@Component({
	selector: "kt-autorisations-list",
	templateUrl: "./autorisations-list.component.html",
	styleUrls: ["./autorisations-list.component.scss"],
})
export class AutorisationsListComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	displayedColumns = [
		"id",
		"typeAut",
		"statut",
		"dateDebut",
		"dateFin",
		"objet",
		"typeObjet",
		//"espace",
		"actions",
	];
	// ====================================================================
	//
	// ====================================================================
	dataSource: MatTableDataSource<Autorisation>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild("matPaginator7", { static: true }) paginator7: MatPaginator;
	@ViewChild("sort7", { static: true }) sort7: MatSort;
	// ====================================================================
	//
	// ====================================================================
	autorisationsDatasource: Autorisation[] = [];
	autorisations = [];
	isLoading = true;
	selectedFiles = [];
	datasize: number = 0;
	columns: any[];
	footerData: any[][] = [];
	@Input() page: Page<any> = new Page();
	formGroup: FormGroup;
	typeBien
	listTypeBien=[]
	selectedOptionsTypeBien: string[] = [];
	selectedOptionsCin: string[] = [];
	selectedOptionsRc: string[] = [];

	listRc = [];

	cins=[]
	rcs=[]
	listCin = [];
	pageIndex=0
	pageSize

	// ====================================================================
	//
	// ====================================================================
	constructor(private route: ActivatedRoute,
		private Ppservice: PersonnePhysiqueService,
		private Pmservice: PersonneMoraleService,
		private paginationService: CustomPaginationService,
		private service2: BiensService,
		private excelService: ExcelAssociationService,
		private service: AutorisationsService,
		private recservice: ReclamationsService,

		private translate: TranslateService,
		private router: Router,
		private notification: NotificationService,
		private fileService: FilesUtilsService
	) {
		this.formGroup = new FormGroup({
			typeobj: new FormControl([]),
			cin: new FormControl(null),
			cin1: new FormControl(null),
			rc: new FormControl(null),
			rc1: new FormControl(null),
			
		});
	}
	allcin
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		

		this.route.queryParams.subscribe(params => {
			this.pageIndex = parseInt(params['pageIndex']) || 0;
			this.pageSize = +params['pageSize'] || 5; // Default page size

			const id = params['id'];
		});
	
		this.recservice.getAllCinpp().subscribe((data) => {
			this.allcin = data;
			console.log(this.allcin);
			this.searchDpDropdown();
		});
		
		this.recservice.getAllRc().subscribe((data) => {
			this.allrc = data;
			this.searchDpDropdownRc();
		});
		this.service2.getTypesBien().subscribe((data) => {
			this.typeBien = data;
		});
		this.populate(); 
	}
	// ====================================================================
	//
	// ====================================================================
	populate() {
		const _this = this;

		// this.page.pageable.pageNumber=this.pageIndex
		
		// this.service.getAllObjectByPage("Page", this.page.pageable).subscribe(
		// (data) => {
		// 	this.page = data;
		// 		this.isLoading = false;
		// 		_this.datasize = data.totalElements;
		// 		this.dataSource = new MatTableDataSource(this.page.content);
				
		// 		 this.isLoading = false;
				
		// 	},
		// 	(err) => {
		// 		this.isLoading = false;
		// 		console.log(err);
		// 	}
		// );
		
		this.service.Pagination(this.pageIndex, 5).subscribe((res:any)=>{
	this.page = res;
				this.isLoading = false;
				_this.datasize = res.totalElements;
				this.dataSource = new MatTableDataSource(this.page.content);
				
				 this.isLoading = false;

		
		})
	}
	addItemTypeBien(event: any) {
		if (event[0] == "ALL") {
			this.listTypeBien = this.typeBien;
			this.selectedOptionsTypeBien = this.typeBien.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.typeBien.length) {
			this.listTypeBien = [];
			this.selectedOptionsTypeBien = [];
		} else {
			this.listTypeBien = event;
			this.selectedOptionsTypeBien = event;
		}
	}
pp=[]
	addItemCin(event: any) {
		if (event[0] == "ALL") {
			this.listCin = this.cins;
			this.selectedOptionsCin = this.cins.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.cins.length) {
			this.listCin = [];
			this.selectedOptionsCin = [];
		} else {
			this.listCin = event;
			this.selectedOptionsCin = event;
		}
		this.pp=[]
		for(let i=0;i<this.listCin.length;i++){
			this.Ppservice.findByCin(this.listCin[i]).then((res)=>{
				
				this.pp.push(res[0])
			})	}
	}
	pm=[]

	addItemRc(event: any) {
		if (event[0] == "ALL") {
			this.listRc = this.rcs;
			this.selectedOptionsRc = this.rcs.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.rcs.length) {
			this.listRc = [];
			this.selectedOptionsRc = [];
		} else {
			this.listRc = event;
			this.selectedOptionsRc = event;
		}
		this.pm=[]
		for(let i=0;i<this.listRc.length;i++){
			this.Pmservice.findByRc(this.listRc[i]).then((res)=>{
				
				this.pm.push(res[0])
			})	}
	}
	onChangeofOptions1(e){
		
		this.Ppservice.findByCin(e.value).then((res)=>{
				
			this.pp.push(res[0])
		})
	}
	onChangeofOptionsrc(f) {
		this.Pmservice.findByRc(f.value).then((res)=>{
				
			this.pm.push(res[0])
		})
	}
	onSubmit() {
	
		if(this.formGroup.value.typeobj!=undefined){
			if (this.formGroup.value.typeobj.length == 0) {
				this.formGroup.value.typeobj = [];
			}
		}else{
			this.formGroup.value.typeobj = [];
		
		}
			if(this.listTypeBien!=undefined){
				if (this.listTypeBien.length != 0) {
					this.formGroup.value.typeobj = this.listTypeBien;
				}
			}
		

		if (this.formGroup.value.cin == "") {
			this.formGroup.value.cin = [];
		}
		if (this.pp.length != 0) {
			this.formGroup.value.cin = this.pp.map((item) => item.id);
		}


		if (this.formGroup.value.rc == "") {
			this.formGroup.value.rc = [];
		}
		if (this.pm.length != 0) {
			this.formGroup.value.rc = this.pm.map((item) => item.id);
		}
		
		this.service.research(this.page.pageable, this.formGroup.value).subscribe(
			(res: any) => {
				
				this.page = res;
					 this.isLoading = false;
					 this.datasize = res.totalElements;
					 this.dataSource = new MatTableDataSource(res.content);
					// this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
					// this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
					// this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
					// this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
					// this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
					// this.dataSource.paginator = this.paginator;
					// this.dataSource.sort = this.sort;
				
			
			},
			(err) => {
				console.log(err);
			}
		);
		
	}
	initForm() {
		this.formGroup.reset()
		this.formGroup = new FormGroup({
			cin: new FormControl([]),
			cin1: new FormControl([]),
			rc: new FormControl([]),
			rc1: new FormControl([]),
			typeobj: new FormControl([]),
			
		});
		this.formGroup.get('typeobj').setValue(null);
		this.formGroup.get('cin').setValue(null);
		this.formGroup.get('cin1').setValue(null);
		this.formGroup.get('rc').setValue(null);
		this.formGroup.get('rc1').setValue(null);
	this.ngOnInit()
		this.listTypeBien = [];
		this.pp = [];
		this.pm = [];
	}
	allrc;

	onKeyRc(value) {
		this.dataArrayRc = [];
		this.selectSearchRc(value);
	}
	selectSearchRc(value: string) {
		let filter = value.toLowerCase();
		for (let i = 0; i < this.allrc.length; i++) {
			let option = this.allrc[i];
			if (option.toLowerCase().indexOf(filter) >= 0) {
				this.dataArrayRc.push(option);
			}
		}
	}
	searchDpDropdownRc() {
		for (let i = 0; i < this.allrc.length; i++) {
			this.dataArrayRc.push(this.allrc[i]);
		}
	}
	dataArray = [];
	dataArrayRc = [];
	
	onKey(value) {
		this.dataArray = [];
		this.selectSearch(value);
	}
	selectSearch(value: string) {
		let filter = value.toLowerCase();
		for (let i = 0; i < this.allcin.length; i++) {
			let option = this.allcin[i];
			if (option.toLowerCase().indexOf(filter) >= 0) {
				this.dataArray.push(option);
			}
		}
	}
	searchDpDropdown() {
		for (let i = 0; i < this.allcin.length; i++) {
			this.dataArray.push(this.allcin[i]);
		}
	}
	
	handlePageEvent(event: PageEvent) {
		this.pageIndex = event.pageIndex;
		let pageSize = event.pageSize;
		this.service.Pagination(this.pageIndex, pageSize).subscribe((res:any)=>{
			this.page = res;
				this.isLoading = false;
				this.datasize = res.totalElements;
				this.dataSource = new MatTableDataSource(this.page.content);
				
				 this.isLoading = false;
		})
	}

	exportTable() {
		this.service.getallautorisation().then(
			(res: any) => {
				;
				let promises = [];
				let promises1 = [];
				let json = [];
				this.isLoading = false;
	
				res.forEach((a) => {
					if (a.ppsourceautorisation != 0) {
						let promise = new Promise<void>((resolve, reject) => { // Adjusted to include <void>
							this.Ppservice.getByIdpp(a.ppsourceautorisation).subscribe((res) => {
								;
								json.push(this.mapToExcelData(a, res,promises1));
								resolve(); // Pass undefined to resolve the promise
							});
						});
						promises.push(promise);
					}
					if (a.pmsourceautorisation != 0) {
						let promise = new Promise<void>((resolve, reject) => { // Adjusted to include <void>
							this.Pmservice.getByIdpm(a.pmsourceautorisation)
							.subscribe((res) => {
								;
								json.push(this.mapToExcelData(a,promises, res));
								resolve(); // Pass undefined to resolve the promise
							});
						});
						promises1.push(promise);
					}
				});
	
				Promise.all(promises).then(() => {
					console.log(res);
					let data: any[] = res;
					let columns = [
						"موضوع الترخيص",
						"تاريخ الطلب",
						"المقاطعة",
						"عنوان الترخيص",
						"نوع الترخيص",
						"تاريخ بداية الترخيص",
						"تاريخ نهاية الترخيص",
						"البطاقة الوطنية",
						"الاسم",
						"النسب",
						"السجل التجاري",
						"إسم الهيئة / المؤسسة",
						"العنوان"
					];
					this.excelService.exportAsExcelFileAutorisation("التراخيص", columns, json, "التراخيص", "التراخيص");
				});
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}
	
	mapToExcelData(item: any, Pp: any,Pm:any): any {
		return new excelDateProgramme(item, Pp,Pm);
	}
	
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ====================================================================
	//
	// ====================================================================
	createNewAutorisation(i: number): Autorisation {
		return {
			id: this.autorisations[i].id,
			typeAut: this.autorisations[i].typeAutorisation.typeAutorisation,
			statut: this.autorisations[i].statutdemandeautorisation.libelle,
			dateDebut: this.autorisations[i].dateDebut,
			dateFin: this.autorisations[i].dateFin,
			objet: this.autorisations[i].objetdemandeautorisation
				.objetDemandeAutorisation,
			typeObjet: this.autorisations[i].objetdemandeautorisation
				.typeObjetReservation.typeObjetAutorisation,
			espace: this.autorisations[i].espace.espace,
		};
	}
	// ====================================================================
	//
	// ====================================================================
	showAutorisation(rec) {
		this.router.navigate(["/autorisations/autorisation-detail"], {
			queryParams: { reclam: rec, pageIndex: this.pageIndex, pageSize: 5  },
		});
	}
	// ====================================================================
	//
	// ====================================================================
	deleteAutorisation(recId) {
		this.service.deleteAutorisation(recId).subscribe((res) => {
			this.populate();
		});
	}
	// ====================================================================
	//
	// ====================================================================
	nouvellepp() {
		this.router.navigate(["/autorisations/autorisation-form"]);
	}
	// ====================================================================
	//
	// ====================================================================
	traiterAutorisation(rec) {
		this.router.navigate(["/autorisations/autorisation-traitement"], {
			queryParams: { reclam: rec },
		});
	}
	// ====================================================================
	//
	// ====================================================================
	editAutorisation(id) {
		this.router.navigate(["/autorisations/autorisation-edit"], {
			queryParams: { reclam: id ,pageIndex:this.pageIndex, pageSize: 5},
		});

	
	}
}
// ====================================================================
//
// ====================================================================
export interface Autorisation {
	id: string;
	typeAut: String;
	statut: string;
	dateDebut: string;
	dateFin: string;
	objet: string;
	typeObjet: string;
	espace: String;
}
export class excelDateProgramme {
	Objet: string;
	dateDemande;
	arrondissement: string;
	adresseAuto: string;
	typeAutorisation: string;

	dateDebut;
	dateFin;
	cin
	prenom;

	nom;
	rc;
	PMnom;
	PMadresse

	constructor(item: any,Pp:any,Pm:any) {
		this.Objet = item.objet;
		this.dateDemande = new Date(item.dateDemande).toLocaleString("en-GB");
		this.arrondissement = item.arrondissement;
		this.adresseAuto = item.adresseAuto;
		if (item.typeAutorisation != null) {
			this.typeAutorisation = item.typeAutorisation.typeAutorisation;
		} else {
			this.typeAutorisation = "";
		}
		this.dateDebut = new Date(item.dateDebut).toLocaleString("en-GB");
		this.dateFin = new Date(item.dateFin).toLocaleString("en-GB");
		if (Pp.cin != null || Pp.cin!= undefined) {
			this.cin=Pp.cin
				} else {
			this.cin = "";
		}
		if (Pp.prenom != null || Pp.prenom!= undefined) {
			this.prenom=Pp.prenom
		} else {
			this.prenom = "";
		}	
		if (Pp.nom != null || Pp.nom!= undefined) {
			this.nom=Pp.nom;
		} else {
			this.nom = "";
		}	
		
		
		if (Pm.rc != null || Pm.rc!= undefined) {
			this.rc=Pm.rc;
		} else {
			this.rc = "";
		}	
		if (Pm.nom != null || Pm.nom!= undefined) {
			this.PMnom=Pm.nom
		} else {
			this.PMnom = "";
		}	
		if (Pm.adresse != null || Pm.adresse!= undefined) {
			this.PMadresse=Pm.adresse
				} else {
			this.PMadresse = "";
		}
		}
	
	
}