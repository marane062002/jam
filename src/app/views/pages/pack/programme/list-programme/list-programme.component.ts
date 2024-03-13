import { DatePipe, DecimalPipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatPaginator, MatSelect, MatSort, MatTableDataSource, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ProgrammePhase } from "../../../shared/ProgrammePhase";
import { ProgrammeService } from "../../../shared/ProgrammeService";
import { ExcelAssociationService } from "../../../utils/excel-association.service";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { ConventionMarcheService } from "../../../shared/conventionService";
import { NatureService } from "../../../shared/Nature.service";
import { ExportExcelDialogComponent } from "../export-excel-dialog/export-excel-dialog.component";
import { sousThemeService } from "../../../shared/sous-theme.service";
import { themeService } from "../../../shared/theme.service";
@Component({
	selector: "kt-list-programme",
	templateUrl: "./list-programme.component.html",
	styleUrls: ["./list-programme.component.scss"],
})
export class ListProgrammeComponent implements OnInit {
	checkLang = localStorage.getItem("language");
	listPhase;
	TypeAlert: any;
	data: excelData[] = [];
	dataMultipleSearch: excelData[] = [];

	columns: any[];
	footerData: any[][] = [];
	sizeData = 0;

	listeTheme = []
	listeSousTheme = [];

	selectedValueCherche: string[] = [""];
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Id",
		"projet",
		"etatAvancement",
		"cout",
		"contributionTotalCommunePh1Ph2",
		"date",
		"actions",
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	formGroup: FormGroup;
	codes = ["A", "B", "C", "D", "E", "F", "G", " H", "I", " J", "K", "L", "M", "N", " O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", " Y", "Z"];
	niveaux = ["structurant", "proximité"];
	etatsAvancement = ["ACHEVES", "EN_COURS", "NON_LANCES", "EN_ARRET", "ANNULE"];
	EtatAvancement: Array<etatAvancement> = [
		{
			type: "ACHEVES",
			color: "#ffd433",
		},
		{
			type: "EN_COURS",
			color: "#acdbb7",
		},
		{
			type: "NON_LANCES",
			color: "#acdcd7",
		},
		{
			type: "EN_ARRET",
			color: "#b4c6e7",
		},
		{
			type: "ANNULE",
			color: "#e7c1b4",
		},
	];

	getTypeColor(type) {
		let t = this.EtatAvancement.find((t) => t.type == type);
		if (!t) {
			return "#ffffff";
		}

		return t.color;
	}
	// ============================================
	// Controles pagination
	// ============================================

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	pageIndex = 0;
	constructor(private Themeservice: themeService, private sousThemeservice: sousThemeService, private Natureservice: NatureService, private route: ActivatedRoute,
		private conventionMarcheService: ConventionMarcheService,
		private translate: TranslateService,
		private router: Router,
		private programmePhase: ProgrammePhase,
		public dialog: MatDialog,

		private programeServie: ProgrammeService,
		private datePipe: DatePipe,
		private fileService: FilesUtilsService,
		private excelService: ExcelAssociationService) {
		this.formGroup = new FormGroup({
			programmePhasses: new FormArray([]),
			convention: new FormControl([]),
			date: new FormControl(null),
			dateFin: new FormControl(null),
			orientationStrategique: new FormControl([]),
			nature: new FormControl([]),
			theme: new FormControl([]),
			sousTheme: new FormControl([]),
			niveau: new FormControl([]),
			maitreOuvrage: new FormControl([]),
			maitreOuvrageDelegue: new FormControl([]),
			codeOrientation: new FormControl([]),
			numProjet: new FormControl(""),
			codeProjet: new FormControl(""),
			objectifOperationnel: new FormControl([]),
			lieu: new FormControl([]),
			chefProjet: new FormControl([]),
			anneeDebut: new FormControl(""),
			anneeFin: new FormControl(""),
			axe: new FormControl([]),
			nameProjet: new FormControl(""),
			objectifStrategique: new FormControl([]),
			etatAvancement: new FormControl([]),
			tabcherches: new FormControl([]),
		});
	}
	listChefProjet = [];
	listAxe = [];
	listLieu = [];
	listCodeOrientation = [];
	listNature = [];
	listMaitreOuvrage = [];
	listMaitreOuvrageDelegue = [];
	listNiveau = [];
	listEtatsAvancement = [];
	listOrientationStrategique = [];
	listObjectifOperationnel = [];
	listObjectifStrategique = [];
	chefProjets;
	natures;
	orientationStrategique;
	objectifStrategique;
	objectifOperationnel;
	localisation;
	maitreOuvrage;
	maitreOuvrageDelegue;
	axe;
	pageSize
	listConvention
	showFirstLastButtons = true
	listeConventionObject
	year;
	ngOnInit() {
		this.year = new Date().getFullYear();
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
		this.route.queryParams.subscribe(params => {
			this.pageIndex = parseInt(params['pageIndex']) || 0;
			this.pageSize = +params['pageSize'] || 5; // Default page size

			const id = params['id'];
		});
		let e = { 
			length: this.sizeData,
			pageIndex: this.pageIndex,
			pageSize: 5,
			previousPageIndex: this.pageIndex - 1,
		};

		this.handlePageEvent(e);
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
			this.programeServie.allChefProjets().subscribe((res) => {
				this.chefProjets = res;
			});

			this.programeServie.allOrientationStrategique().subscribe((res) => {
				this.orientationStrategique = res;
			});
			this.programeServie.allObjectifOperationnel().subscribe((res) => {
				this.objectifOperationnel = res;
			});
			this.programeServie.allObjectifStrategique().subscribe((res) => {
				this.objectifStrategique = res;
			});
			this.programeServie.allLocalisation().subscribe((res) => {
				this.localisation = res;
			});
			this.programeServie.allMaitreOuvrage().subscribe((res) => {
				this.maitreOuvrage = res;
			});
			this.programeServie.allMaitreOuvrageDelegue().subscribe((res) => {
				this.maitreOuvrageDelegue = res;
			});
			this.programeServie.allAxe().subscribe((res) => {
				this.axe = res;
			});
		}
		if (localStorage.getItem("language") == "ar") {
			this.programeServie.allChefProjetsAr().subscribe((res) => {
				this.chefProjets = res;
			});

			this.programeServie.allOrientationStrategiqueAr().subscribe((res) => {
				this.orientationStrategique = res;
			});
			this.programeServie.allObjectifOperationnelAr().subscribe((res) => {
				this.objectifOperationnel = res;
			});
			this.programeServie.allObjectifStrategiqueAr().subscribe((res) => {
				this.objectifStrategique = res;
			});
			this.programeServie.allLocalisationAr().subscribe((res) => {
				this.localisation = res;
			});
			this.programeServie.allMaitreOuvrage().subscribe((res) => {
				this.maitreOuvrage = res;
			});
			this.programeServie.allMaitreOuvrageDelegue().subscribe((res) => {
				this.maitreOuvrageDelegue = res;
			});
			this.programeServie.allAxeAr().subscribe((res) => {
				this.axe = res;
			});
		}
		this.formattedNumber = "0";
		this.sommeCouts = 0;
		this.columns = ["Id", "Nom", "Annee", "Porten", "Cant"];
		this.dataSource = new MatTableDataSource(this.data);

		this.programeServie.Pagination(this.pageIndex, 5).subscribe(
			(res: any) => {
				;
				console.log(res);
				for (let i = 0; i < res.content.length; i++) {
					res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
					res.content[i].date.setDate(res.content[i].date.getDate() + 1);
					if (res.content[i].cout != null) {
						res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					}
					;
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
				this.dataSource.sort = this.sort;
				this.programeServie.Pagination(this.pageIndex, this.sizeData).subscribe(
					(res: any) => {
						console.log("Res: " + res);
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							this.sommeCouts += res.content[i].cout;
							console.log("Somme :" + this.sommeCouts);
						}
						this.formattedNumber = this.sommeCouts.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					},
					(err) => {
						console.log("Error: " + err);
					}
				);
			},
			(err) => {
				console.log(err);
			}
		);
		this.programmePhase.getPhases().subscribe((res) => {
			this.listPhase = res;
		});
		if (this.sizeData != 0) {
			this.programeServie.Pagination(this.pageIndex, this.sizeData).subscribe(
				(res) => {
					console.log("Res: " + res);
					for (let i = 0; i < res.length; i++) {
						this.sommeCouts += res[i].cout;
						console.log("Somme :" + this.sommeCouts);
					}
					this.formattedNumber = this.sommeCouts.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				},
				(err) => {
					console.log("Error: " + err);
				}
			);
		}
	}


	doSomething(event: any, select: MatSelect) {
		this.selectedValueCherche = event;
	}

	OrientationStarategiqueSelect(value) {
		console.log(value);
		if (localStorage.getItem("language") == "fr") {
			this.programeServie.allObjectifOperationnelByOS(value).subscribe((res) => {
				this.objectifOperationnel = res;
			});
			this.programeServie.allObjectifStrategiqueByOS(value).subscribe((res) => {
				this.objectifStrategique = res;
			});
			this.programeServie.allAxeByOS(value).subscribe((res) => {
				this.axe = res;
			});
		}
		if (localStorage.getItem("language") == "ar") {
			this.programeServie.allObjectifOperationnelArByOS(value).subscribe((res) => {
				this.objectifOperationnel = res;
			});
			this.programeServie.allObjectifStrategiqueArByOS(value).subscribe((res) => {
				this.objectifStrategique = res;
			});
			this.programeServie.allAxeArByOS(value).subscribe((res) => {
				this.axe = res;
			});
		}
	}
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	addNew(): void {
		this.router.navigate(["/programme/add-programme"], {
			queryParams: { id: 0 },
		});
		localStorage.removeItem("eventCP");
		localStorage.removeItem("eventCC");
	}

	update(value): void {
		console.log(value);
		this.router.navigate(["/programme/add-programme"], {
			queryParams: { id: value.id, pageIndex: this.pageIndex, pageSize: 5 },
		});
	}
	Details(value) {
		console.log(value);
		this.router.navigate(["/programme/detaille-programme"], {
			queryParams: { id: value.id },
		});
	}

	NatureChange(e) {
		this.Themeservice.findByNature_Id(e).subscribe((res) => {
			this.listeTheme = res
		})
	}

	ThemeChange(e) {
		this.sousThemeservice.findByTheme_Id(e).subscribe((res) => {
			this.listeSousTheme = res

		})
	}
	SousThemeChange(e) {
		this.formGroup.get('sousTheme.id').setValue(e);
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
				this.programeServie.delete(id).subscribe(
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

	createDataJson(i: number): excelData {
		return {
			Id: this.TypeAlert[i].Id,
			Nom: this.TypeAlert[i].Nom,
			Annee: this.TypeAlert[i].Annee,
			Porten: this.TypeAlert[i].Parten,
			Cant: this.TypeAlert[i].Cant,
		};
	}
	handlePageEvent(event: PageEvent) {
		this.pageIndex = event.pageIndex;
		if (this.formGroup.value.chefProjet.length == 0) {
			this.formGroup.value.chefProjet = "";
		}
		if (this.listChefProjet.length != 0) {
			this.formGroup.value.chefProjet = `(${this.listChefProjet.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.axe.length == 0) {
			this.formGroup.value.axe = "";
		}
		if (this.listAxe.length != 0) {
			this.formGroup.value.axe = `(${this.listAxe.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.lieu.length == 0) {
			this.formGroup.value.lieu = "";
		}
		if (this.listLieu.length != 0) {
			this.formGroup.value.lieu = `(${this.listLieu.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.codeOrientation.length == 0) {
			this.formGroup.value.codeOrientation = "";
		}
		if (this.listCodeOrientation.length != 0) {
			this.formGroup.value.codeOrientation = `(${this.listCodeOrientation.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.nature.length == 0) {
			this.formGroup.value.nature = "";
		}
		if (this.listNature.length != 0) {
			this.formGroup.value.nature = `(${this.listNature.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.theme.length == 0) {
			this.formGroup.value.theme = "";
		}
		if (this.listeTheme.length != 0) {
			this.formGroup.value.theme = `(${this.listeTheme.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.sousTheme.length == 0) {
			this.formGroup.value.sousTheme = "";
		}
		if (this.listNature.length != 0) {
			this.formGroup.value.sousTheme = `(${this.listeSousTheme.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.maitreOuvrage.length == 0) {
			this.formGroup.value.maitreOuvrage = "";
		}
		if (this.listMaitreOuvrage.length != 0) {
			this.formGroup.value.maitreOuvrage = `(${this.listMaitreOuvrage.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.maitreOuvrageDelegue.length == 0) {
			this.formGroup.value.maitreOuvrageDelegue = "";
		}
		if (this.listMaitreOuvrageDelegue.length != 0) {
			this.formGroup.value.maitreOuvrageDelegue = `(${this.listMaitreOuvrageDelegue.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.niveau.length == 0) {
			this.formGroup.value.niveau = "";
		}
		if (this.listNiveau.length != 0) {
			this.formGroup.value.niveau = `(${this.listNiveau.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.orientationStrategique.length == 0) {
			this.formGroup.value.orientationStrategique = "";
		}
		if (this.listOrientationStrategique.length != 0) {
			this.formGroup.value.orientationStrategique = `(${this.listOrientationStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.objectifOperationnel.length == 0) {
			this.formGroup.value.objectifOperationnel = "";
		}
		if (this.listObjectifOperationnel.length != 0) {
			this.formGroup.value.objectifOperationnel = `(${this.listObjectifOperationnel.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.objectifStrategique.length == 0) {
			this.formGroup.value.objectifStrategique = "";
		}
		if (this.listObjectifStrategique.length != 0) {
			this.formGroup.value.objectifStrategique = `(${this.listObjectifStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.etatAvancement.length == 0) {
			this.formGroup.value.etatAvancement = "";
		}
		if (this.listEtatsAvancement.length != 0) {
			this.formGroup.value.etatAvancement = `(${this.listEtatsAvancement.map((item) => `'${item}'`).join(", ")})`;
		}
		let pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;

		if (this.formGroup.value.etatAvancement != "" || this.formGroup.value.axe != "" || this.formGroup.value.nameProjet != "" || this.formGroup.value.objectifStrategique != "" || this.formGroup.value.chefProjet != "" || this.formGroup.value.lieu != "" || this.formGroup.value.objectifOperationnel != "" || this.formGroup.value.codeProjet != "" || this.formGroup.value.numProjet != "" || this.formGroup.value.codeOrientation != "" || this.formGroup.value.maitreOuvrage != "" || this.formGroup.value.maitreOuvrageDelegue != "" || this.formGroup.value.niveau != "" || this.formGroup.value.nature != "" || this.formGroup.value.nature != "" || this.formGroup.value.theme != "" || this.formGroup.value.sousTheme != ""|| this.formGroup.value.orientationStrategique != "" || this.formGroup.value.dateFin != null || this.formGroup.value.date != null) {

			this.programeServie.research(this.pageIndex, pageSize, this.formGroup.value).subscribe(
				(res: any) => {
					console.log(res);
					if (this.dataMultipleSearch.length == 0) {
						if (this.date1 != "") {
							for (let i = 0; i < res.content.length; i++) {
								res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
								res.content[i].date.setDate(res.content[i].date.getDate() + 1);
								if (res.content[i].date != null) {
									if (parseInt(res.content[i].date.substring(0, 4)) == this.date1) {
										this.dataMultipleSearch.push(res.content[i]);
									}
								}
							}
							this.data = this.dataMultipleSearch;
							this.isLoading = false;
							this.dataSource = new MatTableDataSource(this.data);
							this.dataSource.sort = this.sort;
						}
					}
					if (this.dataMultipleSearch.length == 0) {
						if (this.date2 != "") {
							for (let i = 0; i < res.content.length; i++) {
								res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
								res.content[i].date.setDate(res.content[i].date.getDate() + 1);
								if (res.content[i].dateFin != null) {
									if (parseInt(res.content[i].dateFin.substring(0, 4)) == this.date2) {
										this.dataMultipleSearch.push(res.content[i]);
									}
								}
							}
							this.data = this.dataMultipleSearch;
							this.isLoading = false;
							this.dataSource = new MatTableDataSource(this.data);
							this.dataSource.sort = this.sort;
						}
					}
					if (this.date1 == "" && this.date2 == "") {
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							if (res.content[i].cout != null) {
								res.content[i].cout = res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							}
						}
						this.data = res.content;
						this.isLoading = false;
						this.dataSource = new MatTableDataSource(this.data);
					}
					const queryParams = { pageIndex: event.pageIndex, pageSize: event.pageSize };
					this.router.navigate([], { relativeTo: this.route, queryParams: queryParams });

				},
				(err) => {
					console.log(err);
				}
			);
		}
		if (this.formGroup.value.anneeDebut != "" && this.formGroup.value.anneeFin == "" && this.formGroup.value.etatAvancement == "" && this.formGroup.value.axe == "" && this.formGroup.value.nameProjet == "" && this.formGroup.value.objectifStrategique == "" && this.formGroup.value.chefProjet == "" && this.formGroup.value.lieu == "" && this.formGroup.value.objectifOperationnel == "" && this.formGroup.value.codeProjet == "" && this.formGroup.value.numProjet == "" && this.formGroup.value.codeOrientation == "" && this.formGroup.value.maitreOuvrage == "" && this.formGroup.value.maitreOuvrageDelegue == "" && this.formGroup.value.niveau == "" && this.formGroup.value.nature == "" && this.formGroup.value.theme == "" && this.formGroup.value.sousTheme == "" && this.formGroup.value.orientationStrategique == "" && this.formGroup.value.dateFin == null && this.formGroup.value.date == null) {

			this.programeServie.research1(this.formGroup.value.anneeDebut, this.pageIndex, pageSize).subscribe(
				(res: any) => {
					console.log("Res: " + JSON.stringify(res));
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
						}
					}
					this.data = res.content;
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(this.data);
				},
				(err) => {
					console.log(err);
				}
			);
		}

		if (this.formGroup.value.anneeDebut == "" && this.formGroup.value.anneeFin != "" && this.formGroup.value.etatAvancement == "" && this.formGroup.value.axe == "" && this.formGroup.value.nameProjet == "" && this.formGroup.value.objectifStrategique == "" && this.formGroup.value.chefProjet == "" && this.formGroup.value.lieu == "" && this.formGroup.value.objectifOperationnel == "" && this.formGroup.value.codeProjet == "" && this.formGroup.value.numProjet == "" && this.formGroup.value.codeOrientation == "" && this.formGroup.value.maitreOuvrage == "" && this.formGroup.value.maitreOuvrageDelegue == "" && this.formGroup.value.niveau == "" && this.formGroup.value.nature == "" && this.formGroup.value.theme == "" && this.formGroup.value.sousTheme == "" && this.formGroup.value.orientationStrategique == "" && this.formGroup.value.dateFin == null && this.formGroup.value.date == null) {

			this.programeServie.research2(this.formGroup.value.anneeFin, this.pageIndex, pageSize).subscribe(
				(res: any) => {
					console.log(res);
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
						}
					}
					this.data = res.content;
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(this.data);
				},
				(err) => {
					console.log(err);
				}
			);
		}

		if (this.formGroup.value.anneeDebut == "" && this.formGroup.value.anneeFin == "" && this.formGroup.value.etatAvancement == "" && this.formGroup.value.axe == "" && this.formGroup.value.nameProjet == "" && this.formGroup.value.objectifStrategique == "" && this.formGroup.value.chefProjet == "" && this.formGroup.value.lieu == "" && this.formGroup.value.objectifOperationnel == "" && this.formGroup.value.codeProjet == "" && this.formGroup.value.numProjet == "" && this.formGroup.value.codeOrientation == "" && this.formGroup.value.maitreOuvrage == "" && this.formGroup.value.maitreOuvrageDelegue == "" && this.formGroup.value.niveau == "" && this.formGroup.value.nature == "" && this.formGroup.value.theme == "" && this.formGroup.value.sousTheme == ""&& this.formGroup.value.orientationStrategique == "" && this.formGroup.value.dateFin == null && this.formGroup.value.date == null) {

			this.programeServie.Pagination(this.pageIndex, pageSize).subscribe(

				(res: any) => {
					this.pageIndex = res.pageable.pageNumber
					console.log(res);
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
						}
						;
						if (res.content[i].programmePhaseBudgets.length != 0) {
							if (res.content[i].programmePhaseBudgets[0].totalContributionCommunePh1Ph2 != null) {
								res.content[i].programmePhaseBudgets[0].totalContributionCommunePh1Ph2 = res.content[i].programmePhaseBudgets[0].totalContributionCommunePh1Ph2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							}
						}
					}
					this.data = res.content;
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(this.data);
				},
				(err) => {
					console.log(err);
				}
			);
		}

		if (this.formGroup.value.anneeDebut != "" && this.formGroup.value.anneeFin != "" && this.formGroup.value.etatAvancement == "" && this.formGroup.value.axe == "" && this.formGroup.value.nameProjet == "" && this.formGroup.value.objectifStrategique == "" && this.formGroup.value.chefProjet == "" && this.formGroup.value.lieu == "" && this.formGroup.value.objectifOperationnel == "" && this.formGroup.value.codeProjet == "" && this.formGroup.value.numProjet == "" && this.formGroup.value.codeOrientation == "" && this.formGroup.value.maitreOuvrage == "" && this.formGroup.value.maitreOuvrageDelegue == "" && this.formGroup.value.niveau == "" && this.formGroup.value.nature == "" && this.formGroup.value.theme == "" && this.formGroup.value.sousTheme == "" && this.formGroup.value.orientationStrategique == "" && this.formGroup.value.dateFin == null && this.formGroup.value.date == null) {

			this.programeServie.research3(this.formGroup.value.anneeDebut, this.formGroup.value.anneeFin, this.pageIndex, pageSize).subscribe(
				(res: any) => {
					console.log("Res: " + JSON.stringify(res));
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
						}
					}
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
	openDialog(): void {
		const dialogRef = this.dialog.open(ExportExcelDialogComponent, {
			width: '800px',
			data: {
				form: this.formGroup,
				listChefProjet: this.listChefProjet,
				listAxe: this.listAxe,
				listLieu: this.listLieu,
				listCodeOrientation: this.listCodeOrientation,
				listMaitreOuvrage: this.listMaitreOuvrage,
				listMaitreOuvrageDelegue: this.listMaitreOuvrageDelegue,
				listNiveau: this.listNiveau,
				listOrientationStrategique: this.listOrientationStrategique,
				listObjectifOperationnel: this.listObjectifOperationnel,
				listObjectifStrategique: this.listObjectifStrategique,
				listEtatsAvancement: this.listEtatsAvancement,
				listConventions: this.listConventions,
				listNature: this.listNature
			}
		});
		dialogRef.afterClosed().subscribe(res => {
			//console.log("Res: "+ JSON.stringify(res,null,2))

		});
	}
	exportTable() {
		if (this.formGroup.value.chefProjet.length == 0) {
			this.formGroup.value.chefProjet = "";
		}
		if (this.listChefProjet.length != 0) {
			this.formGroup.value.chefProjet = `(${this.listChefProjet.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.axe.length == 0) {
			this.formGroup.value.axe = "";
		}
		if (this.listAxe.length != 0) {
			this.formGroup.value.axe = `(${this.listAxe.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.lieu.length == 0) {
			this.formGroup.value.lieu = "";
		}
		if (this.listLieu.length != 0) {
			this.formGroup.value.lieu = `(${this.listLieu.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.codeOrientation.length == 0) {
			this.formGroup.value.codeOrientation = "";
		}
		if (this.listCodeOrientation.length != 0) {
			this.formGroup.value.codeOrientation = `(${this.listCodeOrientation.map((item) => `'${item}'`).join(", ")})`;
		}

		if (this.formGroup.value.maitreOuvrage.length == 0) {
			this.formGroup.value.maitreOuvrage = "";
		}
		if (this.listMaitreOuvrage.length != 0) {
			this.formGroup.value.maitreOuvrage = `(${this.listMaitreOuvrage.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.maitreOuvrageDelegue.length == 0) {
			this.formGroup.value.maitreOuvrageDelegue = "";
		}
		if (this.listMaitreOuvrageDelegue.length != 0) {
			this.formGroup.value.maitreOuvrageDelegue = `(${this.listMaitreOuvrageDelegue.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.niveau.length == 0) {
			this.formGroup.value.niveau = "";
		}
		if (this.listNiveau.length != 0) {
			this.formGroup.value.niveau = `(${this.listNiveau.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.orientationStrategique.length == 0) {
			this.formGroup.value.orientationStrategique = "";
		}
		if (this.listOrientationStrategique.length != 0) {
			this.formGroup.value.orientationStrategique = `(${this.listOrientationStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.objectifOperationnel.length == 0) {
			this.formGroup.value.objectifOperationnel = "";
		}
		if (this.listObjectifOperationnel.length != 0) {
			this.formGroup.value.objectifOperationnel = `(${this.listObjectifOperationnel.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.objectifStrategique.length == 0) {
			this.formGroup.value.objectifStrategique = "";
		}
		if (this.listObjectifStrategique.length != 0) {
			this.formGroup.value.objectifStrategique = `(${this.listObjectifStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.etatAvancement.length == 0) {
			this.formGroup.value.etatAvancement = "";
		}
		if (this.listEtatsAvancement.length != 0) {
			this.formGroup.value.etatAvancement = `(${this.listEtatsAvancement.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.convention != undefined) {
			if (this.formGroup.value.convention.length == 0) {
				this.formGroup.value.convention = [];
			}
		} else {
			this.formGroup.value.convention = [];

		}
		if (this.listConventions != undefined) {
			if (this.listConventions.length != 0) {
				this.formGroup.value.convention = this.listConventions;
			}
		}

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
		if (this.listeTheme != undefined) {
			if (this.listeTheme.length != 0) {

				this.formGroup.value.theme = this.listeTheme;
			}
		}
		if (this.formGroup.value.sousTheme != undefined) {
			if (this.formGroup.value.sousTheme.length == 0) {

				this.formGroup.value.sousTheme = [];
			}
		}
		if (this.listeSousTheme != undefined) {
			if (this.listeSousTheme.length != 0) {

				this.formGroup.value.sousTheme = this.listeSousTheme;
			}
		}
		if (localStorage.getItem("language") == "fr") {

			this.isLoading = true;
			this.programeServie.research(0, 500, this.formGroup.value).subscribe(
				(res: any) => {
					this.isLoading = false;
					console.log(res);
					let data: any[] = res.content;
					let json = data.map((item) => new excelDateProgramme(item));
					(this.columns = ["Orientations stratégiques", "Code de l'orienation", "Axes", "Code de l'axe", "Objectifs stratégiques", "Objectifs opérationnels", "Numéro du projet", "Code du projet", "Projets", "Convention", "Niveau", "Nature", "Chef de projet", "Localisation", "Maître d'ouvrage", "Maître d'ouvrage délégué", "Année", "Etat d'avancement", "Délai", "Phase", "Coût", "Contribution de la commune", "Contribution de la commune 1ere année", "Total de contribution 1ere année", "Contribution de la commune 2eme année", "Total de contribution 2eme année", "Contribution de la commune 3eme année", "Total de contribution 3eme année", "Contributon de la commune (Les trois années)", "Contribution des partenaires (les trois années)", "Contribution globale pour les trois premières années", "Contribution globale pour les trois dernières années", "Montant disponible pour la commune:les trois premières années", "Montant indisponible pour la commune"]), this.excelService.exportAsExcelFile("Planification", "", this.columns, json, this.footerData, "Planification", this.translate.instant("MENU.listProgramme"));
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
		}
		if (localStorage.getItem("language") == "ar") {
			this.isLoading = true;
			this.programeServie.research(0, 500, this.formGroup.value).subscribe(
				(res: any) => {
					this.isLoading = false;
					console.log(res);
					let data: any[] = res.content;
					let json = data.map((item) => new excelDateProgramme(item));
					(this.columns = ["التوجهات الاستراتيجية", "رمز التوجه", "المحاور", "رمر المحور", "الأهداف الاستراتيجية", "الأهداف التنفيذية", "رقم المشروع", "رمز المشروع", "المشاريع", "اتفاقية", "المستوى", "طبيعة المشروع", "تتبع المشروع", "الموقع", "صاحب المشروع المنتدب", "السنة", "مدته", "المرحلة", "التكلفة الاجمالية(مليون درهم)", "مساهمة الجماعة(مليون درهم)", "مساهمة الجماعة السنة الاولى (م.د)", "التكلفة الاجمالية السنة الاولى (م.د)", "مساهمة الجماعة السنة الثانية (م.د)", "التكلفة الاجمالية السنة الثانية (م.د)", "مساهمة الجماعة السنة الثالثة (م.د)", "التكلفة الاجمالية السنة الثالثة (م.د)", "مساهمة الجماعة لتلاث سنوات الأولى (م.د)", "مساهمة الشركاء لتلاث سنوات الأولى(م.د)", "التكلفة الاجمالية لتلاث سنوات الأولى(م.د)", "التكلفة الاجمالية لتلاث سنوات الثانية (م.د)", "المبلغ المتوفر للجماعة لتلاث سنوات الأولى (م.د)", "المبلغ غير المتوفر للجماعة  لتلاث سنوات الأولى (م.د)"]), this.excelService.exportAsExcelFileAr("برنامج عمل جماعة مراكش", "", this.columns, json, this.footerData, "Planification", this.translate.instant("MENU.listProgramme"));
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

	addItemChefProjet(event: any) {
		if (event[0] == "ALL") {
			this.listChefProjet = this.chefProjets;
			this.selectedOptionsCP = this.chefProjets.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.chefProjets.length) {
			this.listChefProjet = [];
			this.selectedOptionsCP = [];
		} else {
			this.listChefProjet = event;
			this.selectedOptionsCP = event;
		}
	}

	addItemAxe(event: any) {
		if (event[0] == "ALL") {
			this.listAxe = this.axe;
			this.selectedOptionsA = this.axe.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.axe.length) {
			this.listAxe = [];
			this.selectedOptionsA = [];
		} else {
			this.listAxe = event;
			this.selectedOptionsA = event;
		}
	}

	addItemLieu(event: any) {
		if (event[0] == "ALL") {
			this.listLieu = this.localisation;
			this.selectedOptionsL = this.localisation.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.localisation.length) {
			this.listLieu = [];
			this.selectedOptionsL = [];
		} else {
			this.listLieu = event;
			this.selectedOptionsL = event;
		}
	}

	selectedOptionsCO: string[] = [];
	selectedOptionsN: string[] = [];
	selectedOptionsMO: string[] = [];
	selectedOptionsMOD: string[] = [];
	selectedOptionsL: string[] = [];
	selectedOptionsCP: string[] = [];
	selectedOptionsNP: string[] = [];
	selectedOptionsA: string[] = [];
	selectedOptionsOP: string[] = [];
	selectedOptionsOS: string[] = [];
	selectedOptionsORS: string[] = [];
	selectedOptionsEA: string[] = [];

	addItemCodeOrientation(event: any) {
		if (event[0] == "ALL") {
			this.listCodeOrientation = this.codes;
			this.selectedOptionsCO = this.codes.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.codes.length) {
			this.listCodeOrientation = [];
			this.selectedOptionsCO = [];
		} else {
			this.listCodeOrientation = event;
			this.selectedOptionsCO = event;
		}
	}


	addItemMaitreOuvrage(event: any) {
		if (event[0] == "ALL") {
			this.listMaitreOuvrage = this.maitreOuvrage;
			this.selectedOptionsMO = this.maitreOuvrage.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.maitreOuvrage.length) {
			this.listMaitreOuvrage = [];
			this.selectedOptionsMO = [];
		} else {
			this.listMaitreOuvrage = event;
			this.selectedOptionsMO = event;
		}
	}

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

	addItemNiveau(event: any) {
		if (event[0] == "ALL") {
			this.listNiveau = this.niveaux;
			this.selectedOptionsN = this.niveaux.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.niveaux.length) {
			this.listNiveau = [];
			this.selectedOptionsN = [];
		} else {
			this.listNiveau = event;
			this.selectedOptionsN = event;
		}
	}

	addItemOrientationStrategique(event: any) {
		if (event[0] == "ALL") {
			this.listOrientationStrategique = this.orientationStrategique;
			this.selectedOptionsORS = this.orientationStrategique.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.orientationStrategique.length) {
			this.listOrientationStrategique = [];
			this.selectedOptionsORS = [];
		} else {
			this.listOrientationStrategique = event;
			this.selectedOptionsORS = event;
		}
	}

	addItemObjectifOperationnel(event: any) {
		if (event[0] == "ALL") {
			this.listObjectifOperationnel = this.objectifOperationnel;
			this.selectedOptionsOP = this.objectifOperationnel.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.objectifOperationnel.length) {
			this.listObjectifOperationnel = [];
			this.selectedOptionsOP = [];
		} else {
			this.listObjectifOperationnel = event;
			this.selectedOptionsOP = event;
		}
	}

	addItemObjectifStrategique(event: any) {
		if (event[0] == "ALL") {
			this.listObjectifStrategique = this.objectifStrategique;
			this.selectedOptionsOS = this.objectifStrategique.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.objectifStrategique.length) {
			this.listObjectifStrategique = [];
			this.selectedOptionsOS = [];
		} else {
			this.listObjectifStrategique = event;
			this.selectedOptionsOS = event;
		}
	}

	addItemEtatAvancement(event: any) {
		if (event[0] == "ALL") {
			this.listEtatsAvancement = this.etatsAvancement;
			this.selectedOptionsEA = this.etatsAvancement.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.etatsAvancement.length) {
			this.listEtatsAvancement = [];
			this.selectedOptionsEA = [];
		} else {
			this.listEtatsAvancement = event;
			this.selectedOptionsEA = event;
		}
	}
	addItemNature(event: any) {
		if (event.includes('ALL')) {
			this.listNature = this.natures.id
			this.selectedOptionsNP = this.natures.map(item => item.id);
		} else if (event.length == this.natures.length) {
			this.listNature = [];
			this.selectedOptionsNP = [];
		} else {
			this.listNature = event;
			this.selectedOptionsNP = event;
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
	isSearch = false
	onSubmit() {
		this.isSearch = true
		this.listConventions

		if (this.formGroup.value.chefProjet.length == 0) {
			this.formGroup.value.chefProjet = "";
		}
		if (this.listChefProjet.length != 0) {
			this.formGroup.value.chefProjet = `(${this.listChefProjet.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.axe.length == 0) {
			this.formGroup.value.axe = "";
		}
		if (this.listAxe.length != 0) {
			this.formGroup.value.axe = `(${this.listAxe.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.lieu.length == 0) {
			this.formGroup.value.lieu = "";
		}
		if (this.listLieu.length != 0) {
			this.formGroup.value.lieu = `(${this.listLieu.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.codeOrientation.length == 0) {
			this.formGroup.value.codeOrientation = "";
		}
		if (this.listCodeOrientation.length != 0) {
			this.formGroup.value.codeOrientation = `(${this.listCodeOrientation.map((item) => `'${item}'`).join(", ")})`;
		}

		if (this.formGroup.value.maitreOuvrage.length == 0) {
			this.formGroup.value.maitreOuvrage = "";
		}
		if (this.listMaitreOuvrage.length != 0) {
			this.formGroup.value.maitreOuvrage = `(${this.listMaitreOuvrage.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.maitreOuvrageDelegue.length == 0) {
			this.formGroup.value.maitreOuvrageDelegue = "";
		}
		if (this.listMaitreOuvrageDelegue.length != 0) {
			this.formGroup.value.maitreOuvrageDelegue = `(${this.listMaitreOuvrageDelegue.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.niveau.length == 0) {
			this.formGroup.value.niveau = "";
		}
		if (this.listNiveau.length != 0) {
			this.formGroup.value.niveau = `(${this.listNiveau.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.orientationStrategique.length == 0) {
			this.formGroup.value.orientationStrategique = "";
		}
		if (this.listOrientationStrategique.length != 0) {
			this.formGroup.value.orientationStrategique = `(${this.listOrientationStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.objectifOperationnel.length == 0) {
			this.formGroup.value.objectifOperationnel = "";
		}
		if (this.listObjectifOperationnel.length != 0) {
			this.formGroup.value.objectifOperationnel = `(${this.listObjectifOperationnel.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.objectifStrategique.length == 0) {
			this.formGroup.value.objectifStrategique = "";
		}
		if (this.listObjectifStrategique.length != 0) {
			this.formGroup.value.objectifStrategique = `(${this.listObjectifStrategique.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.etatAvancement.length == 0) {
			this.formGroup.value.etatAvancement = "";
		}
		if (this.listEtatsAvancement.length != 0) {
			this.formGroup.value.etatAvancement = `(${this.listEtatsAvancement.map((item) => `'${item}'`).join(", ")})`;
		}
		if (this.formGroup.value.convention != undefined) {
			if (this.formGroup.value.convention.length == 0) {
				this.formGroup.value.convention = [];
			}
		} else {
			this.formGroup.value.convention = [];

		}
		if (this.listConventions != undefined) {
			if (this.listConventions.length != 0) {
				this.formGroup.value.convention = this.listConventions;
			}
		}

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
		this.formattedNumber = "0";
		this.sommeCouts = 0;

		if (this.formGroup.value.anneeDebut != "" && this.formGroup.value.anneeFin == "" && this.formGroup.value.etatAvancement == "" && this.formGroup.value.convention == "" && this.formGroup.value.axe == "" && this.formGroup.value.nameProjet == "" && this.formGroup.value.objectifStrategique == "" && this.formGroup.value.chefProjet == "" && this.formGroup.value.lieu == "" && this.formGroup.value.objectifOperationnel == "" && this.formGroup.value.codeProjet == "" && this.formGroup.value.numProjet == "" && this.formGroup.value.codeOrientation == "" && this.formGroup.value.maitreOuvrage == "" && this.formGroup.value.maitreOuvrageDelegue == "" && this.formGroup.value.niveau == "" && this.formGroup.value.nature == "" && this.formGroup.value.nature == "" && this.formGroup.value.orientationStrategique == "" && this.formGroup.value.dateFin == null && this.formGroup.value.date == null) {

			this.programeServie.research1(this.formGroup.value.anneeDebut, this.pageIndex, 5).subscribe(
				(res: any) => {
					console.log("Res: " + JSON.stringify(res));
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

						}
					}
					this.data = res.content;
					this.isLoading = false;
					this.sizeData = res.totalElements;
					this.dataSource = new MatTableDataSource(this.data);
					this.dataSource.sort = this.sort;
				},
				(err) => {
					console.log(err);
				}
			);
			this.programeServie.research1(this.formGroup.value.anneeDebut, 0, this.sizeData).subscribe(
				(res: any) => {
					console.log(res);
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						this.sommeCouts += res.content[i].cout;
					}
					this.formattedNumber = this.sommeCouts.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

				},
				(err) => {
					console.log(err);
				}
			);
		}

		if (this.formGroup.value.anneeDebut == "" && this.formGroup.value.anneeFin != "" && this.formGroup.value.etatAvancement == "" && this.formGroup.value.convention == "" && this.formGroup.value.axe == "" && this.formGroup.value.nameProjet == "" && this.formGroup.value.objectifStrategique == "" && this.formGroup.value.chefProjet == "" && this.formGroup.value.lieu == "" && this.formGroup.value.objectifOperationnel == "" && this.formGroup.value.codeProjet == "" && this.formGroup.value.numProjet == "" && this.formGroup.value.codeOrientation == "" && this.formGroup.value.maitreOuvrage == "" && this.formGroup.value.maitreOuvrageDelegue == "" && this.formGroup.value.niveau == "" && this.formGroup.value.nature == "" && this.formGroup.value.nature == "" && this.formGroup.value.orientationStrategique == "" && this.formGroup.value.dateFin == null && this.formGroup.value.date == null) {

			this.programeServie.research2(this.formGroup.value.anneeFin, this.pageIndex, 5).subscribe(
				(res: any) => {
					console.log(res);
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
						}
					}
					this.data = res.content;
					this.isLoading = false;
					this.sizeData = res.totalElements;
					this.dataSource = new MatTableDataSource(this.data);
					this.dataSource.sort = this.sort;
				},
				(err) => {
					console.log(err);
				}
			);
			this.programeServie.research2(this.formGroup.value.anneeFin, this.pageIndex, this.sizeData).subscribe(
				(res: any) => {
					console.log(res);
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						this.sommeCouts += res.content[i].cout;
					}
					this.formattedNumber = this.sommeCouts.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				},
				(err) => {
					console.log(err);
				}
			);
		}

		if (this.formGroup.value.convention != "" || this.formGroup.value.etatAvancement != "" || this.formGroup.value.axe != "" || this.formGroup.value.nameProjet != "" || this.formGroup.value.objectifStrategique != "" || this.formGroup.value.chefProjet != "" || this.formGroup.value.lieu != "" || this.formGroup.value.objectifOperationnel != "" || this.formGroup.value.codeProjet != "" || this.formGroup.value.numProjet != "" || this.formGroup.value.codeOrientation != "" || this.formGroup.value.maitreOuvrage != "" || this.formGroup.value.maitreOuvrageDelegue != "" || this.formGroup.value.niveau != "" || this.formGroup.value.nature != "" || this.formGroup.value.nature != "" || this.formGroup.value.orientationStrategique != "" || this.formGroup.value.dateFin != null || this.formGroup.value.date != null) {

			this.date1 = this.formGroup.value.anneeDebut;
			this.date2 = this.formGroup.value.anneeFin;
			this.formGroup.value.anneeDebut = "";
			this.formGroup.value.anneeFin = "";

			this.programeServie.research(0, 500, this.formGroup.value).subscribe(
				(res: any) => {
					console.log(res);
					if (this.date1 != "") {
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							if (res.content[i].date != null) {
								if (parseInt(res.content[i].date.substring(0, 4)) == this.date1) {
									this.dataMultipleSearch.push(res.content[i]);
								}
							}
						}
						this.data = this.dataMultipleSearch;
						this.isLoading = false;
						this.sizeData = this.dataMultipleSearch.length;
						this.dataSource = new MatTableDataSource(this.data);
						this.dataSource.sort = this.sort;
					}
					if (this.date2 != "") {
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							if (res.content[i].dateFin != null) {
								if (parseInt(res.content[i].dateFin.substring(0, 4)) == this.date2) {
									this.dataMultipleSearch.push(res.content[i]);
								}
							}
						}
						this.data = this.dataMultipleSearch;
						this.isLoading = false;
						this.sizeData = this.dataMultipleSearch.length;
						this.dataSource = new MatTableDataSource(this.data);
						this.dataSource.sort = this.sort;
					}
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
						}
					}
					if (this.date1 == "" && this.date2 == "") {
						this.data = res.content;
						this.isLoading = false;

						this.isLoading = false;
						this.sizeData = res.totalElements;
						this.dataSource.sort = this.sort;
					}
				},
				(err) => {
					console.log(err);
				}
			);
			this.programeServie.research(0, this.sizeData, this.formGroup.value).subscribe(
				(res: any) => {
					if (this.date1 != "") {
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							if (res.content[i].date != null) {
								if (parseInt(res.content[i].date.substring(0, 4)) == this.date1) {
									this.dataMultipleSearch.push(res.content[i]);
								}
							}
						}
						this.data = this.dataMultipleSearch;
						this.isLoading = false;
						this.sizeData = this.dataMultipleSearch.length;
						this.dataSource = new MatTableDataSource(this.data);
						this.dataSource.sort = this.sort;
					}
					if (this.date2 != "") {
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							if (res.content[i].dateFin != null) {
								if (parseInt(res.content[i].dateFin.substring(0, 4)) == this.date2) {
									this.dataMultipleSearch.push(res.content[i]);
								}
							}
						}
						this.data = this.dataMultipleSearch;
						this.isLoading = false;
						this.sizeData = this.dataMultipleSearch.length;
						this.dataSource = new MatTableDataSource(this.data);
						this.dataSource.sort = this.sort;
					}
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
						}
					}
					if (this.date1 == "" && this.date2 == "") {
						this.data = res.content;
						this.isLoading = false;

						this.isLoading = false;
						this.sizeData = res.totalElements;
						this.dataSource = new MatTableDataSource(this.data);
						this.dataSource.sort = this.sort;
					}
					if (this.date1 != "") {
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							if (res.content[i].date != null) {
								if (parseInt(res.content[i].date.substring(0, 4)) == this.date1) {
									this.p.push(res.content[i]);
								}
							}
						}
						for (let i = 0; i < this.p.length; i++) {
							this.sommeCouts += this.p[i].cout;
						}
						this.formattedNumber = this.sommeCouts.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					}
					if (this.date2 != "") {
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							if (res.content[i].dateFin != null) {
								if (parseInt(res.content[i].dateFin.substring(0, 4)) == this.date2) {
									this.p.push(res.content[i]);
								}
							}
						}
						for (let i = 0; i < this.p.length; i++) {
							this.sommeCouts += this.p[i].cout;
						}
						this.formattedNumber = this.sommeCouts.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					}
					if (this.date1 == "" && this.date2 == "") {
						for (let i = 0; i < res.content.length; i++) {
							res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
							res.content[i].date.setDate(res.content[i].date.getDate() + 1);
							this.sommeCouts += res.content[i].cout;
						}
						this.formattedNumber = this.sommeCouts.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					}
				},
				(err) => {
					console.log(err);
				}
			);
		}

		if (this.formGroup.value.anneeDebut != "" && this.formGroup.value.anneeFin != "" && this.formGroup.value.etatAvancement == "" && this.formGroup.value.convention == "" && this.formGroup.value.axe == "" && this.formGroup.value.nameProjet == "" && this.formGroup.value.objectifStrategique == "" && this.formGroup.value.chefProjet == "" && this.formGroup.value.lieu == "" && this.formGroup.value.objectifOperationnel == "" && this.formGroup.value.codeProjet == "" && this.formGroup.value.numProjet == "" && this.formGroup.value.codeOrientation == "" && this.formGroup.value.maitreOuvrage == "" && this.formGroup.value.maitreOuvrageDelegue == "" && this.formGroup.value.niveau == "" && this.formGroup.value.nature == "" && this.formGroup.value.nature == "" && this.formGroup.value.orientationStrategique == "" && this.formGroup.value.dateFin == null && this.formGroup.value.date == null) {

			this.programeServie.research3(this.formGroup.value.anneeDebut, this.formGroup.value.anneeFin, this.pageIndex, 5).subscribe(
				(res: any) => {
					console.log("Res: " + JSON.stringify(res));
					for (let i = 0; i < res.content.length; i++) {
						res.content[i].date = new Date(Number((res.content[i].date.split('-'))[0]), Number((res.content[i].date.split('-'))[1]) - 1, Number((res.content[i].date.split('-'))[2])); // Months are 0-based
						res.content[i].date.setDate(res.content[i].date.getDate() + 1);
						if (res.content[i].cout != null) {
							res.content[i].cout = res.content[i].cout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

						}
					}
					this.data = res.content;
					this.isLoading = false;
					this.sizeData = res.totalElements;
					this.dataSource = new MatTableDataSource(this.data);
					this.dataSource.sort = this.sort;
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}
	initForm() {

		this.dataMultipleSearch = [];
		this.formGroup = new FormGroup({
			programmePhasses: new FormArray([]),
			date: new FormControl(null),
			dateFin: new FormControl(null),
			orientationStrategique: new FormControl([]),
			nature: new FormControl([]),
			theme: new FormControl([]),
			sousTheme: new FormControl([]),
			niveau: new FormControl([]),
			maitreOuvrage: new FormControl([]),
			maitreOuvrageDelegue: new FormControl([]),
			codeOrientation: new FormControl([]),
			numProjet: new FormControl(""),
			codeProjet: new FormControl(""),
			objectifOperationnel: new FormControl([]),
			lieu: new FormControl([]),
			chefProjet: new FormControl([]),
			anneeDebut: new FormControl(""),
			anneeFin: new FormControl(""),
			axe: new FormControl([]),
			nameProjet: new FormControl(""),
			objectifStrategique: new FormControl([]),
			etatAvancement: new FormControl([]),
			tabcherches: new FormControl([]),
		});
		this.selectedValueCherche = [];
		this.ngOnInit();
		this.listChefProjet = [];
		this.listAxe = [];
		this.listLieu = [];
		this.listCodeOrientation = [];
		this.listNature = [];
		this.listMaitreOuvrage = [];
		this.listMaitreOuvrageDelegue = [];
		this.listNiveau = [];
		this.listOrientationStrategique = [];
		this.listObjectifOperationnel = [];
		this.listObjectifStrategique = [];
		this.listEtatsAvancement = [];
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
	id: number;
	date;

	// dateFin: string;
	//numeroprojet:string;

	nameProjet: string;
	codeProjet: string;
	maitreOuvrage: string;
	maitreOuvrageDelegue: string;
	chefProjet: string;
	axe: string;
	codeAxe: string;
	orientationStrategique: string;

	codeOrientation: string;

	objectifStrategique: string;

	objectifOperationnel: string;

	localisation: string;

	cout: string;

	description: string;

	nature: string;

	niveau: string;

	programmePhaseBudgets;

	numeroProjet: string;

	phase: string;

	delai: string;

	contributionCommune1: string;

	contributionCommune2: string;

	contributionCommune3: string;

	totalContribution1: string;

	totalContribution2: string;

	totalContribution3: string;

	totalContribution3PAnnees: string;

	montantDispoCommune3PA: string;

	montantIndispoCommune: string;

	contributionCommune: string;

	contributionPartenaires: string;

	totalContributionCommunePh1Ph2: string;

	totalContributionPh2: string;

	totalContribution3DAnnees: string;

	convention: string;

	etatAvancement: string;

	constructor(item: any) {
		if (localStorage.getItem("language") == "fr") {
			if (item.orientationStrategique != null) {
				this.orientationStrategique = item.orientationStrategique;
			}
			else {
				this.orientationStrategique = '-'
			}

			if (item.codeOrientation != null) {
				this.codeOrientation = item.codeOrientation;
			}
			else {
				this.codeOrientation = '-';
			}

			if (item.axe != null) {
				this.axe = item.axe;
			} else {
				this.axe = '-';
			}

			if (item.codeAxe != null) {
				this.codeAxe = item.codeAxe;
			}
			else {
				this.codeAxe = '-';
			}

			if (item.objectifStrategique != null) {
				this.objectifStrategique = item.objectifStrategique;
			}
			else {
				this.objectifStrategique = '-';
			}

			if (item.objectifOperationnel != null) {
				this.objectifOperationnel = item.objectifOperationnel;
			}
			else {
				this.objectifOperationnel = '-';
			}

			if (item.numeroprojet != null) {
				this.numeroProjet = item.numeroprojet;
			}
			else {
				this.numeroProjet = '-';
			}

			if (item.codeProjet != null) {
				this.codeProjet = item.codeProjet;
			}
			else {
				this.codeProjet = '-';
			}


			if (item.nameProjet != null) {
				this.nameProjet = item.nameProjet;
			}
			else {
				this.nameProjet = '-';
			}

			if (item.sousProjets.length > 0) {
				for (let i = 0; i < item.sousProjets.length; i++) {
					if (item.sousProjets[i] != null && item.sousProjets[i].object != null && item.sousProjets[i].object != "") {
						this.convention = item.sousProjets[i].object;
					} else {
						this.convention = "-";
					}
				}
			}
			else {
				this.convention = "-";
			}


			if (item.niveau != null) {
				this.niveau = item.niveau;
			}
			else {
				this.niveau = '-';
			}

			if (item.nature != null) {
				this.nature = item.nature;
			}
			else {
				this.nature = '-';
			}

			if (item.chefProjet != null) {
				this.chefProjet = item.chefProjet;
			}
			else {
				this.chefProjet = '-';
			}

			if (item.localisation != null) {
				this.localisation = item.localisation;
			}
			else {
				this.localisation = '-';
			}

			if (item.maitreOuvrage != null) {
				this.maitreOuvrage = item.maitreOuvrage;
			}
			else {
				this.maitreOuvrage = '-';
			}



			if (item.maitreOuvrageDelegue != null) {
				this.maitreOuvrageDelegue = item.maitreOuvrageDelegue;
			} else {
				this.maitreOuvrageDelegue = "-";
			}

			if (item.date != null) {
				this.date = new Date(item.date).toLocaleString("en-GB");
			}
			else {
				this.date = '-';
			}

			if (item.etatAvancement != null) {
				if (item.etatAvancement == "NON_LANCES") {
					this.etatAvancement = "Non lancé";
				}
				if (item.etatAvancement == "EN_COURS") {
					this.etatAvancement = "En cours";
				}
				if (item.etatAvancement == "ACHEVES") {
					this.etatAvancement = "Achevé";
				}
				if (item.etatAvancement == "EN_ARRET") {
					this.etatAvancement = "En arrêt";
				}
				if (item.etatAvancement == "ANNULE") {
					this.etatAvancement = "Annulé";
				}
			} else {
				this.etatAvancement = "-";
			}

			if (item.delai != null) {
				this.delai = item.delai;
			}
			else {
				this.delai = '-';
			}


			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].phase != null) {
						this.phase = item.programmePhaseBudgets[i].phase.name;
					} else {
						this.phase = "-";
					}
				}
			} else {
				this.phase = "-"
			}


			if (item.cout != null) {
				this.cout = item.cout;
			}
			else {
				this.cout = '-';
			}
			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionCommunePh1Ph2 != null) {
						this.totalContributionCommunePh1Ph2 = item.programmePhaseBudgets[i].totalContributionCommunePh1Ph2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.totalContributionCommunePh1Ph2 = "-";
					}
				}
			}
			else {
				this.totalContributionCommunePh1Ph2 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune1 != null) {
						this.contributionCommune1 = item.programmePhaseBudgets[i].contributionComune1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionCommune1 = "-";
					}
				}
			}
			else {
				this.contributionCommune1 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionPremiereAnnee != null) {
						this.totalContribution1 = item.programmePhaseBudgets[i].totalContributionPremiereAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.totalContribution1 = "-";
					}
				}
			}
			else {
				this.totalContribution1 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune2 != null) {
						this.contributionCommune2 = item.programmePhaseBudgets[i].contributionComune2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionCommune2 = "-";
					}
				}
			}
			else {
				this.contributionCommune2 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee != null) {
						this.totalContribution2 = item.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.totalContribution2 = "-";
					}
				}
			}
			else {
				this.totalContribution2 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune3 != null) {
						this.contributionCommune3 = item.programmePhaseBudgets[i].contributionComune3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionCommune3 = "-";
					}
				}
			}
			else {
				this.contributionCommune3 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionTroisiemeAnnee != null) {
						this.totalContribution3 = item.programmePhaseBudgets[i].totalContributionTroisiemeAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.totalContribution3 = "-";
					}
				}
			}
			else {
				this.totalContribution3 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionCommune != null) {
						this.contributionCommune = item.programmePhaseBudgets[i].contributionCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionCommune = "-";
					}
				}
			}
			else {
				this.contributionCommune = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionPartenaires != null) {
						this.contributionPartenaires = item.programmePhaseBudgets[i].contributionPartenaires.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionPartenaires = "-";
					}
				}
			}
			else {
				this.contributionPartenaires = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContribution != null) {
						if (item.programmePhaseBudgets[i].phase != null) {
							if (item.programmePhaseBudgets[i].phase.name == "1") {
								this.totalContribution3PAnnees = item.programmePhaseBudgets[i].totalContribution.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							} else {
								this.totalContribution3PAnnees = "-";
							}
						}
					} else {
						this.totalContribution3PAnnees = "-";
					}
				}
			}
			else {
				this.totalContribution3PAnnees = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionPh2 != null) {
						if (item.programmePhaseBudgets[i].phase != null) {
							if (item.programmePhaseBudgets[i].phase.name == "2") {
								this.totalContribution3DAnnees = item.programmePhaseBudgets[i].totalContributionPh2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							} else {
								this.totalContribution3DAnnees = "-";
							}
						}
					} else {
						this.totalContribution3DAnnees = "-";
					}
				}
			}
			else {
				this.totalContribution3DAnnees = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].montantDispoCommune3PA != null) {
						this.montantDispoCommune3PA = item.programmePhaseBudgets[i].montantDispoCommune3PA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.montantDispoCommune3PA = "-";
					}
				}
			}
			else {
				this.montantDispoCommune3PA = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].montantIndispoCommune != null) {
						this.montantIndispoCommune = item.programmePhaseBudgets[i].montantIndispoCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.montantIndispoCommune = "-";
					}
				}
			}
			else {
				this.montantIndispoCommune = "-";
			}

		}
		if (localStorage.getItem("language") == "ar") {
			if (item.orientationStrategiqueAr != null) {
				this.orientationStrategique = item.orientationStrategiqueAr;
			}
			else {
				this.orientationStrategique = '-'
			}

			if (item.codeOrientation != null) {
				this.codeOrientation = item.codeOrientation;
			}
			else {
				this.codeOrientation = '-';
			}

			if (item.axeAr != null) {
				this.axe = item.axeAr;
			} else {
				this.axe = '-';
			}

			if (item.codeAxe != null) {
				this.codeAxe = item.codeAxe;
			}
			else {
				this.codeAxe = '-';
			}

			if (item.objectifStrategiqueAr != null) {
				this.objectifStrategique = item.objectifStrategiqueAr;
			}
			else {
				this.objectifStrategique = '-';
			}

			if (item.objectifOperationnelAr != null) {
				this.objectifOperationnel = item.objectifOperationnelAr;
			}
			else {
				this.objectifOperationnel = '-';
			}

			if (item.numeroprojet != null) {
				this.numeroProjet = item.numeroprojet;
			}
			else {
				this.numeroProjet = '-';
			}

			if (item.codeProjet != null) {
				this.codeProjet = item.codeProjet;
			}
			else {
				this.codeProjet = '-';
			}


			if (item.nameProjet != null) {
				this.nameProjet = item.nameProjet;
			}
			else {
				this.nameProjet = '-';
			}

			if (item.sousProjets.length > 0) {
				for (let i = 0; i < item.sousProjets.length; i++) {
					if (item.sousProjets[i] != null && item.sousProjets[i].object != null && item.sousProjets[i].object != "") {
						this.convention = item.sousProjets[i].object;
					} else {
						this.convention = "-";
					}
				}
			}
			else {
				this.convention = "-";
			}


			if (item.niveau != null) {
				this.niveau = item.niveau;
			}
			else {
				this.niveau = '-';
			}

			if (item.natureAr != null) {
				this.nature = item.natureAr;
			}
			else {
				this.nature = '-';
			}

			if (item.chefProjetAr != null) {
				this.chefProjet = item.chefProjetAr;
			}
			else {
				this.chefProjet = '-';
			}

			if (item.localisationAr != null) {
				this.localisation = item.localisationAr;
			}
			else {
				this.localisation = '-';
			}

			if (item.maitreOuvrage != null) {
				this.maitreOuvrage = item.maitreOuvrage;
			}
			else {
				this.maitreOuvrage = '-';
			}



			if (item.maitreOuvrageDelegue != null) {
				this.maitreOuvrageDelegue = item.maitreOuvrageDelegue;
			} else {
				this.maitreOuvrageDelegue = "-";
			}

			if (item.date != null) {
				this.date = new Date(item.date).toLocaleString("en-GB");
			}
			else {
				this.date = '-';
			}

			if (item.etatAvancement != null) {
				if (item.etatAvancement == "NON_LANCES") {
					this.etatAvancement = "Non lancé";
				}
				if (item.etatAvancement == "EN_COURS") {
					this.etatAvancement = "En cours";
				}
				if (item.etatAvancement == "ACHEVES") {
					this.etatAvancement = "Achevé";
				}
				if (item.etatAvancement == "EN_ARRET") {
					this.etatAvancement = "En arrêt";
				}
				if (item.etatAvancement == "ANNULE") {
					this.etatAvancement = "Annulé";
				}
			} else {
				this.etatAvancement = "-";
			}

			if (item.delai != null) {
				this.delai = item.delai;
			}
			else {
				this.delai = '-';
			}


			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].phase != null) {
						this.phase = item.programmePhaseBudgets[i].phase.name;
					} else {
						this.phase = "-";
					}
				}
			} else {
				this.phase = "-"
			}


			if (item.cout != null) {
				this.cout = item.cout;
			}
			else {
				this.cout = '-';
			}
			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionCommunePh1Ph2 != null) {
						this.totalContributionCommunePh1Ph2 = item.programmePhaseBudgets[i].totalContributionCommunePh1Ph2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.totalContributionCommunePh1Ph2 = "-";
					}
				}
			}
			else {
				this.totalContributionCommunePh1Ph2 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune1 != null) {
						this.contributionCommune1 = item.programmePhaseBudgets[i].contributionComune1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionCommune1 = "-";
					}
				}
			}
			else {
				this.contributionCommune1 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionPremiereAnnee != null) {
						this.totalContribution1 = item.programmePhaseBudgets[i].totalContributionPremiereAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.totalContribution1 = "-";
					}
				}
			}
			else {
				this.totalContribution1 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune2 != null) {
						this.contributionCommune2 = item.programmePhaseBudgets[i].contributionComune2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionCommune2 = "-";
					}
				}
			}
			else {
				this.contributionCommune2 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee != null) {
						this.totalContribution2 = item.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.totalContribution2 = "-";
					}
				}
			}
			else {
				this.totalContribution2 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionComune3 != null) {
						this.contributionCommune3 = item.programmePhaseBudgets[i].contributionComune3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionCommune3 = "-";
					}
				}
			}
			else {
				this.contributionCommune3 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionTroisiemeAnnee != null) {
						this.totalContribution3 = item.programmePhaseBudgets[i].totalContributionTroisiemeAnnee.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.totalContribution3 = "-";
					}
				}
			}
			else {
				this.totalContribution3 = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionCommune != null) {
						this.contributionCommune = item.programmePhaseBudgets[i].contributionCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionCommune = "-";
					}
				}
			}
			else {
				this.contributionCommune = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].contributionPartenaires != null) {
						this.contributionPartenaires = item.programmePhaseBudgets[i].contributionPartenaires.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.contributionPartenaires = "-";
					}
				}
			}
			else {
				this.contributionPartenaires = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContribution != null) {
						if (item.programmePhaseBudgets[i].phase != null) {
							if (item.programmePhaseBudgets[i].phase.name == "1") {
								this.totalContribution3PAnnees = item.programmePhaseBudgets[i].totalContribution.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							} else {
								this.totalContribution3PAnnees = "-";
							}
						}
					} else {
						this.totalContribution3PAnnees = "-";
					}
				}
			}
			else {
				this.totalContribution3PAnnees = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].totalContributionPh2 != null) {
						if (item.programmePhaseBudgets[i].phase != null) {
							if (item.programmePhaseBudgets[i].phase.name == "2") {
								this.totalContribution3DAnnees = item.programmePhaseBudgets[i].totalContributionPh2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
							} else {
								this.totalContribution3DAnnees = "-";
							}
						}
					} else {
						this.totalContribution3DAnnees = "-";
					}
				}
			}
			else {
				this.totalContribution3DAnnees = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].montantDispoCommune3PA != null) {
						this.montantDispoCommune3PA = item.programmePhaseBudgets[i].montantDispoCommune3PA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.montantDispoCommune3PA = "-";
					}
				}
			}
			else {
				this.montantDispoCommune3PA = "-";
			}

			if (item.programmePhaseBudgets.length > 0) {
				for (let i = 0; i < item.programmePhaseBudgets.length; i++) {
					if (item.programmePhaseBudgets[i].montantIndispoCommune != null) {
						this.montantIndispoCommune = item.programmePhaseBudgets[i].montantIndispoCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					} else {
						this.montantIndispoCommune = "-";
					}
				}
			}
			else {
				this.montantIndispoCommune = "-";
			}
		}
	}



}

export class etatAvancement {
	type?: string;
	color?: string;
	cssClass?: string;
}
