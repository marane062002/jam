import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ExcelAssociationService } from "../../../utils/excel-association.service";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { ProgrammeRetroService } from "../../../shared/ProgrammeRetroService";
import { ProgrammeService } from "../../../shared/ProgrammeService";
import { ConventionMarcheService } from "../../../shared/conventionService";
import { NatureService } from "../../../shared/Nature.service";
import { themeService } from "../../../shared/theme.service";
import { sousThemeService } from "../../../shared/sous-theme.service";
@Component({
	selector: "kt-retroplanning-programme",
	templateUrl: "./retroplanning-programme.component.html",
	styleUrls: ["./retroplanning-programme.component.scss"],
})
export class RetroplanningProgrammeComponent implements OnInit {
	checkLang = localStorage.getItem("language");
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
	maitreOuvrageDelegue;

	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private SousThemeService: sousThemeService,
		private Themeservice: themeService,
		private Natureservice: NatureService,
		private conventionMarcheService: ConventionMarcheService,
		private datePipe: DatePipe,
		private programeServie: ProgrammeService,
		private translate: TranslateService,
		private router: Router,
		private programmeRetroService: ProgrammeRetroService,
		private fileService: FilesUtilsService,
		private excelService: ExcelAssociationService) {
		this.formGroup = new FormGroup({
			nature: new FormControl([]),
			theme: new FormControl([]),
			sousTheme: new FormControl([]),
			maitreOuvrageDelegue: new FormControl([]),
			date: new FormControl(null),
			dateDebut: new FormControl(null),
			dateFin: new FormControl(null),
			nameProjet: new FormControl(""),
			convention: new FormControl([]),
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
	listConvention
	listeConventionObject
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});
		this.Natureservice.findAll().then((res) => {
			this.natures = res

		})
		this.conventionMarcheService.all().subscribe(res => {
			this.listConvention = res;
			for (let i = 0; i < res.length; i++) {
				if (this.checkLang == 'fr') {
					this.listeConventionObject = res[i].object

				}
				if (this.checkLang == 'ar') {
					this.listeConventionObject = res[i].objectAr

				}
			}
		})
		if (localStorage.getItem("language") == "fr") {

			this.programeServie.allMaitreOuvrageDelegue().subscribe((res) => {
				this.maitreOuvrageDelegue = res;
			});

		}
		if (localStorage.getItem("language") == "ar") {

			this.programeServie.allMaitreOuvrageDelegue().subscribe((res) => {
				this.maitreOuvrageDelegue = res;
			});

		}

		this.programeServie.Pagination(0, 5).subscribe(
			(res: any) => {

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
			},
			(err) => {
			}
		);
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
		this.router.navigate(["/programme/add-programme-retroplanning"], {
			queryParams: { id: value.id },
		});
	}
	Details(value) {
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
					}
				);
			}
		});
	}

	exportTable() {
		if (this.formGroup.value.nature != undefined) {
			if (this.formGroup.value.nature.length == 0) {

				this.formGroup.value.nature = [];
			}
		}
		if (this.listNature != undefined) {
			if (this.listNature.length != 0) {

				this.formGroup.value.nature = this.listNature;
			}
		}

		if (this.formGroup.value.theme != undefined) {
			if (this.formGroup.value.theme.length == 0) {

				this.formGroup.value.theme = [];
			}
		}
		if (this.listTheme != undefined) {
			if (this.listTheme.length != 0) {

				this.formGroup.value.theme = this.listTheme;
			}
		}

		if (this.formGroup.value.sousTheme != undefined) {
			if (this.formGroup.value.sousTheme.length == 0) {

				this.formGroup.value.sousTheme = [];
			}
		}
		if (this.listSousTheme != undefined) {
			if (this.listSousTheme.length != 0) {

				this.formGroup.value.sousTheme = this.listSousTheme;
			}
		}

		if (this.formGroup.value.maitreOuvrageDelegue != undefined) {
			if (this.formGroup.value.maitreOuvrageDelegue.length == 0) {
				this.formGroup.value.maitreOuvrageDelegue = "";
			}
			if (this.listMaitreOuvrageDelegue.length != 0) {
				this.formGroup.value.maitreOuvrageDelegue = `(${this.listMaitreOuvrageDelegue.map((item) => `'${item}'`).join(", ")})`;
			}
		}


		this.formattedNumber = "0";
		this.sommeCouts = 0;

		if (this.formGroup.value.nature != "" || this.formGroup.value.theme != "" || this.formGroup.value.sousTheme != "" || this.formGroup.value.nameProjet != "" || this.formGroup.value.maitreOuvrageDelegue != "" || this.formGroup.value.date != null || this.formGroup.value.dateFin != null || this.formGroup.value.dateDebut != null) {


			this.isLoading = true;
			this.programeServie.research(0, this.sizeData, this.formGroup.value).subscribe(
				(res: any) => {
					this.isLoading = false;
					let data: any[] = res.content;
					let json = data.map((item) => new excelDateProgramme(item, this.datePipe, this.conventionMarcheService));
					(this.columns = ["Nature", "Thématique", "Sous-théme", "Code projet", "Projet", "N° SP", "Sous-Projet", "MOD", "Convention", "Année de début", "Avancement", "Coût SP", "Date début", "Date Fin"
						, "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC",
						"JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC"
						, "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC", "JAN", "FEV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOUT", "SEPT", "OCT", "NOV", "DEC",]),
						this.excelService.exportAsExcelFileRetro4("Tableau de bord des Projetsen cours et Futurs", "", this.columns, json, this.footerData, "TB projets Futurs et en cours", 'TB Projet en Cours et Futurs');
				},
				(err) => {
					this.isLoading = false;
				}
			);
		}
	}
	sommeCouts: number = 0;
	formattedNumber = "0";
	projets;
	bbbb = [];
	p = [];

	listNature = []
	listTheme = []
	listSousTheme = []
	selectedOptionsNP
	selectedOptionsTheme
	selectedOptionsSousTheme
	listeTheme = []
	listeSousTheme = []

	addItemNature(event: any) {
		if (event.includes('ALL')) {
			this.listNature = this.natures.map(item => item.id);
			this.selectedOptionsNP = this.natures.map(item => item.id);
		} else {
			this.listNature = event;
			this.selectedOptionsNP = event;
		}

		this.listNature.forEach(natureId => {
			this.Themeservice.findByNature_Id(natureId).subscribe(res => {
				this.listeTheme = this.listeTheme.concat(res);
			});
		});
	}

	ThemeChange(event) {
		if (event.includes('ALL')) {
			this.listTheme = this.listeTheme;
			this.selectedOptionsTheme = this.listeTheme.map(item => item.id);
		} else {
			this.listTheme = event;
			this.selectedOptionsTheme = event;
		}

		this.listTheme.forEach(themeId => {
			this.SousThemeService.findByTheme_Id(themeId).subscribe(res => {
				this.listeSousTheme = this.listeSousTheme.concat(res);

			});
		});
	}

	addItemSousTheme(event) {
		if (event.includes('ALL')) {
			this.listSousTheme = this.listeSousTheme;
			this.selectedOptionsSousTheme = this.listeSousTheme;
		} else {
			this.listSousTheme = event;
			this.selectedOptionsSousTheme = event;
		}
	}

	selectedOptionsMOD: string[] = [];

	addItemMaitreOuvrageDelegue(event: any) {
		if (event[0] == "ALL") {
			this.listMaitreOuvrageDelegue = this.maitreOuvrageDelegue;
			this.selectedOptionsMOD = this.maitreOuvrageDelegue.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.maitreOuvrageDelegue.length) {
			this.listMaitreOuvrageDelegue = [];
			this.selectedOptionsMOD = [];
		} else {
			this.listMaitreOuvrageDelegue = event;
			this.selectedOptionsMOD = event;
		}
	}

	emplacementAndAnotherParameters = [];
	consistanceAndAnotherParameters = [];

	dataMultipleSearch: excelData[] = [];
	listMaitreOuvrageDelegue = [];

	onSubmit() {
		if (this.formGroup.value.nature != undefined) {
			if (this.formGroup.value.nature.length == 0) {

				this.formGroup.value.nature = [];
			}
		}
		if (this.listNature != undefined) {
			if (this.listNature.length != 0) {

				this.formGroup.value.nature = this.listNature;
			}
		}

		if (this.formGroup.value.theme != undefined) {
			if (this.formGroup.value.theme.length == 0) {

				this.formGroup.value.theme = [];
			}
		}
		if (this.listTheme != undefined) {
			if (this.listTheme.length != 0) {

				this.formGroup.value.theme = this.listTheme;
			}
		}

		if (this.formGroup.value.sousTheme != undefined) {
			if (this.formGroup.value.sousTheme.length == 0) {

				this.formGroup.value.sousTheme = [];
			}
		}
		if (this.listSousTheme != undefined) {
			if (this.listSousTheme.length != 0) {

				this.formGroup.value.sousTheme = this.listSousTheme;
			}
		}

		if (this.formGroup.value.maitreOuvrageDelegue != undefined) {
			if (this.formGroup.value.maitreOuvrageDelegue.length == 0) {
				this.formGroup.value.maitreOuvrageDelegue = "";
			}
			if (this.listMaitreOuvrageDelegue.length != 0) {
				this.formGroup.value.maitreOuvrageDelegue = `(${this.listMaitreOuvrageDelegue.map((item) => `'${item}'`).join(", ")})`;
			}
		}


		this.formattedNumber = "0";
		this.sommeCouts = 0;

		if (this.formGroup.value.nature != "" || this.formGroup.value.theme != "" || this.formGroup.value.sousTheme != "" || this.formGroup.value.nameProjet != "" || this.formGroup.value.maitreOuvrageDelegue != "" || this.formGroup.value.date != null || this.formGroup.value.dateFin != null || this.formGroup.value.dateDebut != null) {


			this.programeServie.research(0, this.sizeData, this.formGroup.value).subscribe(
				(res: any) => {
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
				}
			);
		}
	}
	selectedOptionsConvention
	listConventions
	ConventionChange(event) {
		if (event[0] == "ALL") {
			this.listConventions = this.listConvention;
			this.selectedOptionsConvention = this.listConvention.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.listConvention.length) {
			this.listConventions = [];
			this.selectedOptionsConvention = [];
		} else {
			this.listConventions = event;
			this.selectedOptionsConvention = event;
		}
	}
	initForm() {

		this.formGroup.get("dateDebut").setValue(null);
		this.formGroup.get("dateFin").setValue(null);
		this.formGroup.get("sousTheme").setValue(null);
		this.formGroup.get("nameProjet").setValue(null);
		this.formGroup.get("date").setValue(null);
		this.formGroup.get("maitreOuvrageDelegue").setValue(null);
		this.formGroup.get("nature").setValue(null);
		this.formGroup.get("theme").setValue(null);
		this.formGroup.get("convention").setValue(null);
		this.listConvention = []
		this.listNature = []
		this.listTheme = []
		this.listSousTheme = []
		this.listMaitreOuvrageDelegue = []

		this.programeServie.Pagination(0, 5).subscribe(
			(res: any) => {

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
			},
			(err) => {
			}
		);
	}

	handlePageEvent(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		if (this.formGroup.value.nature != undefined) {
			if (this.formGroup.value.nature.length == 0) {
				this.formGroup.value.nature = "";
			}
			if (this.listNature.length != 0) {
				this.formGroup.value.nature = `(${this.listNature.map((item) => `'${item}'`).join(", ")})`;
			}
		}
		if (this.formGroup.value.theme != undefined) {
			if (this.formGroup.value.theme.length == 0) {
				this.formGroup.value.theme = "";
			}
			if (this.listTheme.length != 0) {
				this.formGroup.value.theme = `(${this.listTheme.map((item) => `'${item}'`).join(", ")})`;
			}
		}
		if (this.formGroup.value.sousTheme != undefined) {
			if (this.formGroup.value.sousTheme.length == 0) {
				this.formGroup.value.sousTheme = "";
			}
			if (this.listSousTheme.length != 0) {
				this.formGroup.value.sousTheme = `(${this.listSousTheme.map((item) => `'${item}'`).join(", ")})`;
			}
		}

		if (this.formGroup.value.maitreOuvrageDelegue != undefined) {
			if (this.formGroup.value.maitreOuvrageDelegue.length == 0) {
				this.formGroup.value.maitreOuvrageDelegue = "";
			}
			if (this.listMaitreOuvrageDelegue.length != 0) {
				this.formGroup.value.maitreOuvrageDelegue = `(${this.listMaitreOuvrageDelegue.map((item) => `'${item}'`).join(", ")})`;
			}
		}


		this.formattedNumber = "0";
		this.sommeCouts = 0;
		if (this.formGroup.value.nature != "" || this.formGroup.value.theme != "" || this.formGroup.value.sousTheme != "" || this.formGroup.value.nameProjet != "" || this.formGroup.value.maitreOuvrageDelegue != "" || this.formGroup.value.date != null || this.formGroup.value.dateFin != null || this.formGroup.value.dateDebut != null) {
			this.programeServie.research(pageIndex, pageSize, this.formGroup.value).subscribe(
				(res: any) => {
					this.data = res.content;
					this.isLoading = false;

					this.isLoading = false;
					this.sizeData = res.totalElements;
					this.dataSource = new MatTableDataSource(this.data);

					// }
				},
				(err) => {
				}
			);
		}
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
	sousProjets: any[] = [];
	codeProjet: string;
	nameProjet: string;
	idSP: number[] = [];
	numero: number[] = [];
	object: string[] = [];
	maitreOuvrageDelegue: string[] = [];
	convention: string[] = [];
	date: string;
	Avancement: string[] = [];
	cout: string[] = [];
	dateDebut: string[] = [];
	dateFin: string[] = [];
	language = localStorage.getItem("language");

	constructor(item: any, private datePipe: DatePipe, private conventionMarcheService: ConventionMarcheService
	) {
		if (item.sousTheme != null) {
			this.nature = item.sousTheme.theme[0].nature[0].libelleFrancais;
		} else {
			this.nature = "";
		}

		if (item.sousTheme != null) {
			this.theme = item.sousTheme.theme[0].libelleFrancais;
		} else {
			this.theme = '';
		}

		if (item.sousTheme != null) {
			this.sousTheme = item.sousTheme.libelleFrancais;
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
				this.idSP.push(sousProjet.id);
			}
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
		if (item.convention) {
			for (const con of item.convention) {
				this.convention.push(con.object);
			}
		}
		if (item.date != null) {
			this.date = item.date.substring(0, 4);
		} else {
			this.date = '';
		}
		if (item.sousProjets) {
			for (const sousProjet of item.sousProjets) {
				this.Avancement.push(sousProjet.etatAvancement);
			}
		}
		if (item.sousProjets) {
			for (const sousProjet of item.sousProjets) {
				this.cout.push(sousProjet.constibutionC);
			}
		}

		if (item.sousProjets) {
			for (const sousProjet of item.sousProjets) {
				this.dateDebut.push(sousProjet.dateDebut);
			}
		}

		if (item.sousProjets) {
			for (const sousProjet of item.sousProjets) {
				this.dateFin.push(sousProjet.dateFine);
			}
		}

		if (item.sousProjets) {
			this.sousProjets = item.sousProjets
		}
	}
}

