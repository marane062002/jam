import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ProgrammePhase } from "../../../shared/ProgrammePhase";
import { ExcelAssociationService } from "../../../utils/excel-association.service";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { ProgrammeRetroService } from "../../../shared/ProgrammeRetroService";
import { ProgrammeService } from "../../../shared/ProgrammeService";
import { ConventionMarcheService } from "../../../shared/conventionService";
@Component({
	selector: "kt-retroplanning-programme",
	templateUrl: "./retroplanning-programme.component.html",
	styleUrls: ["./retroplanning-programme.component.scss"],
})
export class RetroplanningProgrammeComponent implements OnInit {
	language = localStorage.getItem("language");
	data: excelData[] = [];

	columns: any[];
	footerData: any[][] = [];
	sizeData = 0;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = ["nature", "theme", "Soustheme", "projet", "codeProjet", "numSP", "SP", "MOD", "convention", "etatAvancement", "cout", "dateDebut", "dateFin", "actions"];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	formGroup: FormGroup;

	tabEmplacement = [];
	tabConsistance = [];

	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private conventionMarcheService:ConventionMarcheService,
		private datePipe: DatePipe,
		private programeServie: ProgrammeService,
		private translate: TranslateService,
		private router: Router,
		private programmeRetroService: ProgrammeRetroService,
		private fileService: FilesUtilsService,
		private excelService: ExcelAssociationService) {
		this.formGroup = new FormGroup({
			numero: new FormControl(null),
			axe: new FormControl(""),
			projet: new FormControl(""),
			emplacement: new FormControl([]),
			consistance: new FormControl([]),
			mod: new FormControl(""),
			dateDebut: new FormControl(null),
			dateFin: new FormControl(null),
			delai: new FormControl(null),
		});
	}

	chefProjets;
	natures;
	orientationStrategique;
	objectifStrategique;
	objectifOperationnel;
	localisation;
	maitreOuvrage;
	axe;

	ngOnInit() {
		this.programeServie.Pagination(0, 5).subscribe(
			(res: any) => {
				console.log(res);
        
				for (let i = 0; i < res.content.length; i++) {
					if (res.content[i].cout != null) {
						res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					}
					if (res.content[i].programmePhaseBudgets.length != 0) {
						if (res.content[i].programmePhaseBudgets[0].totalContributionCommunePh1Ph2 != null || res.content[i].programmePhaseBudgets[0].totalContributionCommunePh1Ph2 != undefined) {
							res.content[i].programmePhaseBudgets[0].totalContributionCommunePh1Ph2 = res.content[i].programmePhaseBudgets[0].totalContributionCommunePh1Ph2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
						}
					}
				}
				this.data = res.content;
				this.isLoading = false;

				this.isLoading = false;
				this.sizeData = res.totalElements;
				this.dataSource = new MatTableDataSource(this.data);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				// this.programeServie.Pagination(0, this.sizeData).subscribe(
				// 	(res: any) => {
				// 		console.log("Res: " + res);
				// 		for (let i = 0; i < res.content.length; i++) {
				// 			this.sommeCouts += res.content[i].cout;
				// 			console.log("Somme :" + this.sommeCouts);
				// 		}
				// 		this.formattedNumber = this.sommeCouts.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				// 	},
				// 	(err) => {
				// 		console.log("Error: " + err);
				// 	}
				// );
			},
			(err) => {
				console.log(err);
			}
		);
		// this.programmeRetroService.Pagination(0, 10).subscribe(
		//   (res: any) => {
		//     console.log(res);
		//     this.data = res.content;
		//     this.isLoading = false;

		//     this.isLoading = false;
		//     this.sizeData = res.totalElements;
		//     this.dataSource = new MatTableDataSource(this.data);
		//     this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
		//     this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
		//     this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
		//     this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
		//     this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
		//     this.dataSource.paginator = this.paginator;
		//     this.dataSource.sort = this.sort;
		//     this.programmeRetroService.Pagination(0, this.sizeData).subscribe(
		//       (res: any) => {
		//         console.log("Res: " + res);
		//       },
		//       (err) => {
		//         console.log("Error: " + err);
		//       }
		//     );
		//   },
		//   (err) => {
		//     console.log(err);
		//   }
		// );
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	addNew(): void {
		this.router.navigate(["/programme/add-programme-retroplanning"], {
			queryParams: { id: 0 },
		});
	}

	update(value): void {
		console.log(value);
		this.router.navigate(["/programme/add-programme-retroplanning"], {
			queryParams: { id: value.id },
		});
	}
	Details(value) {
		console.log(value);
		this.router.navigate(["/programme/show-programme-retroplanning"], {
			queryParams: { id: value.id },
		});
	}

	delete(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
			cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON"),
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.programmeRetroService.delete(id).subscribe(
					(res) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500,
						});
						this.ngOnInit();
					},
					(err) => {
						console.log(err);
					}
				);
			}
		});
	}

	exportTable() {
		// if (localStorage.getItem("language") == "fr") {
		//   this.isLoading = true;
		//   this.programmeRetroService.research(0, 500, this.formGroup.value).subscribe(
		//     (res: any) => {
		//       const desiredOrderOfAxes = ["Aménagement et régulation de sept carrefours", "Aménagement des voiries structurantes", "AMENAGEMENT PAYSAGER  DES ESPACES VERTS",
		//         "REQUALIFICATION URBAINE", "SANTÉ SÉCURITÉ SALUBRITÉ", "CRECHES", "CENTRES COMMERCIAUX", "CONSTRUCTION DES EQUIPEMENTS SOCIO-CULTUREL", "EQUIPEMENT DES EQUIPEMENTS SPORTIFS ET  SOCIAUX-CULTURELS"];
		//       res.content.sort((a, b) => {
		//         const axeComparison = desiredOrderOfAxes.indexOf(a.axe) - desiredOrderOfAxes.indexOf(b.axe);
		//         if (axeComparison !== 0) {
		//           return axeComparison;
		//         }
		//         return a.numero - b.numero;
		//       });
		//       this.isLoading = false;
		//       console.log(res);
		//       let data: any[] = res.content;
		//       let json = data.map((item) => new excelDateProgramme(item));
		//       (this.columns = ["Axes", "N°", "Projet", "Emplacement", "Consistance", "MOD", "Date de début", "Date de fin", "Délais",
		//         "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC",
		//         "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC"]),
		//         this.excelService.exportAsExcelFileRetro("Plan d'action Marrakech 2023-2028", "", this.columns, json, this.footerData, "Rétroplanning 2023", this.translate.instant("MENU.retroplanning"));
		//     },
		//     (err) => {
		//       this.isLoading = false;
		//       console.log(err);
		//     }
		//   );
		// }

		if (localStorage.getItem("language") == "fr") {
			this.isLoading = true;
			this.programeServie.Pagination(0, 500).subscribe(
				(res: any) => {
        //   res.content.sort((a, b) => a.nature.localeCompare(b.nature));
		//   for(let i=0;i<res.content.length;i++) {
		// 	if(res.content[i].theme!=null || res.content[i].theme!="" || res.content[i].theme!=undefined){
		// 		res.content.sort((a, b) => a.theme.localeCompare(b.theme));

		// 	}

		//   }

        //    a.sort((a, b) => a.theme.localeCompare(b.theme));
					this.isLoading = false;
					console.log(res);
					let data: any[] = res.content;
					let json = data.map((item) => new excelDateProgramme(item,this.datePipe,this.conventionMarcheService));
					
					(this.columns = ["Nature","Thématique","Sous-théme","Code projet","projet","N° SP","Sous-Projet","MOD","Convention","Année début","Avancement","Coût SP","Date début","Date Fin"
					, "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC",
					 "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC"
					 , "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC",]),
						// ,
						//  "Thématique", "Sous-théme", "Code projet", "projet", "N° SP", "Sous-Projet"]
						this.excelService.exportAsExcelFileRetro4("Plan d'action Marrakech 2023-2028", "", this.columns, json, this.footerData, "Rétroplanning 2023", this.translate.instant("MENU.retroplanning"));
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
		}
	}
	sommeCouts: number = 0;
	formattedNumber = "0";
	projets;
	bbbb = [];
	p = [];
	date1;
	date2;

	emplacementAndAnotherParameters = [];
	consistanceAndAnotherParameters = [];
	onSubmit() {
		if (this.formGroup.value.emplacement != "") {
			this.tabEmplacement.push(this.formGroup.value.emplacement);
		}
		if (this.formGroup.value.consistance != "") {
			this.tabConsistance.push(this.formGroup.value.consistance);
		}
		this.formGroup.value.emplacement = this.tabEmplacement;
		this.formGroup.value.consistance = this.tabConsistance;
		if (this.formGroup.value.consistance == "") {
			this.formGroup.value.consistance = [];
		}
		if (this.formGroup.value.emplacement == "") {
			this.formGroup.value.emplacement = [];
		}
		if (this.formGroup.value.emplacement != "") {
			this.programmeRetroService.findByEmplacement(this.formGroup.value.emplacement).subscribe((res: any) => {
				console.log(res);
				if (this.formGroup.value.numero != null || this.formGroup.value.axe != "" || this.formGroup.value.projet != "" || this.formGroup.value.mod != "" || this.formGroup.value.dateDebut != null || this.formGroup.value.dateFin != null || this.formGroup.value.delai != null) {
					for (let i = 0; i < res.length; i++) {
						if (res[i].numero == this.formGroup.value.numero && res[i].projet == this.formGroup.value.projet && res[i].axe == this.formGroup.value.axe && res[i].mod == this.formGroup.value.mod && res[i].dateDebut == this.formGroup.value.dateDebut && res[i].dateFin == this.formGroup.value.dateFin && res[i].delai == this.formGroup.value.delai) {
							this.emplacementAndAnotherParameters.push(res[i]);
						}
					}
					this.data = this.emplacementAndAnotherParameters;
				} else {
					this.data = res;
				}
				this.isLoading = false;

				this.isLoading = false;
				this.sizeData = res.length;
				this.dataSource = new MatTableDataSource(this.data);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
		} else if (this.formGroup.value.consistance != "") {
			this.programmeRetroService.findByConsistance(this.formGroup.value.consistance).subscribe((res: any) => {
				console.log(res);
				if (this.formGroup.value.numero != null || this.formGroup.value.axe != "" || this.formGroup.value.projet != "" || this.formGroup.value.mod != "" || this.formGroup.value.dateDebut != null || this.formGroup.value.dateFin != null || this.formGroup.value.delai != null) {
					for (let i = 0; i < res.length; i++) {
						if (res[i].numero == this.formGroup.value.numero || res[i].projet == this.formGroup.value.projet || res[i].axe == this.formGroup.value.axe || res[i].mod == this.formGroup.value.mod || res[i].dateDebut == this.formGroup.value.dateDebut || res[i].dateFin == this.formGroup.value.dateFin || res[i].delai == this.formGroup.value.delai) {
							this.consistanceAndAnotherParameters.push(res[i]);
						}
					}
					this.data = this.consistanceAndAnotherParameters;
				} else {
					this.data = res;
				}
				this.isLoading = false;

				this.isLoading = false;
				this.sizeData = res.length;
				this.dataSource = new MatTableDataSource(this.data);
				this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
				this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
				this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
				this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
				this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
		} else {
			this.formGroup.value.delai = parseInt(this.formGroup.value.delai);
			this.programmeRetroService.research(0, 500, this.formGroup.value).subscribe(
				(res: any) => {
					console.log(res);
					this.data = res.content;
					this.isLoading = false;

					this.isLoading = false;
					this.sizeData = res.totalElements;
					this.dataSource = new MatTableDataSource(this.data);
					this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
					this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
					this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
					this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
					this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}
	initForm() {
		this.formGroup.get("numero").setValue(null);
		this.formGroup.get("axe").setValue("");
		this.formGroup.get("projet").setValue("");
		this.formGroup.get("emplacement").setValue("");
		this.formGroup.get("consistance").setValue("");
		this.formGroup.get("mod").setValue("");
		this.formGroup.get("dateDebut").setValue(null);
		this.formGroup.get("dateFin").setValue(null);
		this.formGroup.get("delai").setValue(null);
		// this.formGroup.reset();/*
		this.tabConsistance = [];
		this.tabEmplacement = [];
		this.emplacementAndAnotherParameters = [];
		this.consistanceAndAnotherParameters = [];
		/*   this.formGroup = new FormGroup({
        numero: new FormControl(null),
        axe: new FormControl(''),
        projet: new FormControl(''),
        emplacement: new FormControl([]),
        consistance: new FormControl([]),
        mod: new FormControl(''),
        dateDebut: new FormControl(null),
        dateFin: new FormControl(null),
        delai: new FormControl(null),
      }); */
	}

	handlePageEvent(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		// this.programmeRetroService.research(pageIndex, pageSize, this.formGroup.value).subscribe(
		//   (res: any) => {
		//     console.log(res);
		//     this.data = res.content;
		//     this.isLoading = false;
		//     this.dataSource = new MatTableDataSource(this.data);
		//   }

		//   , (err) => {
		//     console.log(err);
		//   }
		// );

		this.programeServie.Pagination(pageIndex, pageSize).subscribe(
			(res: any) => {
				console.log(res);
				this.data = res.content;
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(this.data);
			},

			(err) => {
				console.log(err);
			}
		);
	}
}
export interface excelData {
	Id: string;
	Nom: string;
	Annee: string;
	Porten: string;
	Cant: string;
}
export class excelDateProgramme {
	nature: string;
	 theme: string;
	 sousTheme: string;
	 codeProjet: string;
	 nameProjet: string;
	 sousProjets:[];
	 numero: number[]=[];
	  object: string[]=[];
	  maitreOuvrageDelegue:string[]=[];
	 convention:string[]=[];
	//   AnnéeDébut:string[]=[];
	//   Avancement:string[]=[];
	//  cout:string[]=[];
	//  DateDebut:string[]=[];
	//  DateFin:string[]=[];
	 language = localStorage.getItem("language");
	constructor(item: any,	private datePipe: DatePipe,	 private conventionMarcheService:ConventionMarcheService
		) {
		if (item.nature != null) {
			this.nature = item.nature;
		} else {
			this.nature = "";
		}

		if (item.theme != null) {
		  this.theme = item.theme;
		} else {
		  this.theme = '';
		}

		if (item.sousTheme != null) {
		  this.sousTheme = item.sousTheme;
		} else {
		  this.sousTheme = '';
		}
		if (item.codeProjet != null) {
		  this.codeProjet = item.codeProjet;
		} else {
		  this.codeProjet = '';
		}
		if (item.nameProjet != null) {
		  this.nameProjet = item.nameProjet;
		} else {
		  this.nameProjet = '';
		}
		

		  if (item.sousProjets) {
			for (const sousProjet of item.sousProjets) {
				this.numero.push(sousProjet.numero);
			}
		  
		}

		
		if (item.sousProjets) {
			for (const sousProjet of item.sousProjets) {
				this.object.push(sousProjet.object);
			}
		  
		}

		if (item.sousProjets) {
			for (const sousProjet of item.sousProjets) {
				this.maitreOuvrageDelegue.push(sousProjet.maitreOuvrageDelegue);
			}
		  
		}

	
	
		if (item.sousProjets) {
			for (const sousProjet of item.sousProjets) {
				this.conventionMarcheService.getconventionBySousProjet(sousProjet.id).subscribe((res)=>{
					this.convention=res;

					
				})
			
		}
		  
		}
		
		// if (item.sousProjets) {
		// 	for (const sousProjet of item.sousProjets) {
		// 		this.AnnéeDébut.push(sousProjet.AnnéeDébut);
		// 	}
		  
		// }
		
		// if (item.sousProjets) {
		// 	for (const sousProjet of item.sousProjets) {
		// 		this.Avancement.push(sousProjet.Avancement);
		// 	}
		  
		// }
		// if (item.sousProjets) {
		// 	for (const sousProjet of item.sousProjets) {
		// 		this.cout.push(sousProjet.constibutionC);
		// 	}
		  
		// }

		// if (item.sousProjets) {
		// 	for (const sousProjet of item.sousProjets) {
		// 		this.Avancement.push(sousProjet.Avancement);
		// 	}
		  
		// }

		// if (item.sousProjets) {
		// 	for (const sousProjet of item.sousProjets) {
		// 		this.DateDebut.push(this.datePipe.transform(new Date(sousProjet.dateDebut), 'MM/dd/yyyy'));
		// 	}
		  
		// }
		// if (item.sousProjets) {
		// 	for (const sousProjet of item.sousProjets) {
		// 		this.DateFin.push(this.datePipe.transform(new Date(sousProjet.dateFine) , 'MM/dd/yyyy'));
		// 	}
		  
		// }

	
		 
	}
}

