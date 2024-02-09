import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatOptionSelectionChange, MatPaginator, MatRadioChange, MatSort, MatTableDataSource } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { delay } from "rxjs/operators";
import { OrganisationService } from "../../organisation/organisation.service";
import { AssociationService } from "../../utils/association.service";
import { SaerchAssociationDTO2 } from "../../utils/class/saerch-association-dto";
import { SaerchAssociationDTO3 } from "../../utils/class/saerch-association-dto";
import { SubventionsService } from "../../utils/subventions.service";
import { SpinnerService } from "../../utils/spinner.service";
import { NotificationType } from "../../shared/NotificationMessage.service";
import { NotificationService } from "../../shared/notification.service";
import { LogistiqueService } from "../../utils/logistique.service";

@Component({
	selector: "kt-dashboard-logistique",
	templateUrl: "./dashboard-logistique.component.html",
	styleUrls: ["./dashboard-logistique.component.scss"],
})
export class DashboardLogistiqueComponent implements OnInit {
	public xAxisData = [];
	public yAxisData = [];
	listAssocaition: any[];
	types;
	arrondissements: any;
	isLoading = true;
	searchForm: FormGroup;
	dash;
	dash1;
	chartType = "bar";
	chartType1 = "bar";
	sizeData: number = 0;
	idassoction = 0;
	dataSize: any;
	listArrondissements;
	// ============================================
	// constructeur
	// ============================================
	constructor(private logistiqueService:LogistiqueService,private notification: NotificationService,private spinnerService:SpinnerService, private service: AssociationService, private service2: OrganisationService, private fb: FormBuilder, private translate: TranslateService, private datePipe: DatePipe) {
		this.getSubventions();
		this.getArrondissements();
	}

	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ["nbAssociation","nomProjet", "natureSubvention","arrondissement","anneeSubvention"];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	statistics: any[] = [];

	loadStatistics(startDate: string, endDate: string, natureSubvention: any[]) {
		this.service.getAssociationStatistics(startDate, endDate, natureSubvention).subscribe((statistics) => (this.statistics = statistics));
	}

	getArrondissements() {
		this.logistiqueService.getArrondissements().subscribe(
			(data) => {
				this.listArrondissements = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ngOninit
	// ============================================
	ngOnInit() {
		// const startDate = "1977-01-01";
		// const endDate = "2023-12-01";
		// const natureSubvention = "إطعام";
		// console.log("lllllllllllllll", this.searchForm.value.natureSubvention);
		//
		// this.loadStatistics(this.searchForm.value.dateDebut, this.searchForm.value.dateFin, this.searchForm.value.natureSubvention);
		//
		this.searchForm = this.fb.group({
			natureSubvention: ["", Validators.required],
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			anneeSubvention: [""],
			arrondissement: [""],
		});
	}
	originalListSubventions: any[];
	datasize = 0;
	isLoadingResults = true;
	isLoading2 = true;
	public getSubventions() {
		this.isLoading2 = true;
		const _this = this;
		this.logistiqueService
		    .getRessource("/logistique/index")
			.pipe(delay(300))
			.subscribe(
				(data) => {
					this.originalListSubventions = data;
					this.isLoading2 = false;
					_this.datasize = data.length
					this.dataSource = new MatTableDataSource(data);
					this.isLoadingResults = false;
					this.paginator._intl.itemsPerPageLabel = this.translate.instant(
						"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
					);
					this.paginator._intl.nextPageLabel = this.translate.instant(
						"PAGES.GENERAL.NEXT_PAGE_LABEL"
					);
					this.paginator._intl.previousPageLabel = this.translate.instant(
						"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
					);
					this.paginator._intl.lastPageLabel = this.translate.instant(
						"PAGES.GENERAL.LAST_PAGE_LABEL"
					);
					this.paginator._intl.firstPageLabel = this.translate.instant(
						"PAGES.GENERAL.FIRST_PAGE_LABEL"
					);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading2 = false;
					_this.datasize = 0;
					console.log(err);
					this.isLoadingResults = false;
				}
			);
	}

	// ============================================

	// ============================================
	// OnSubmit
	// ============================================

	refresh() {
		this.searchForm = this.fb.group({
			typeActiviteAssociation: [""],
			classification: [""],
			arrondissement: [""],

			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			anneeSubvention:[""],
		});
		this.dataSource = new MatTableDataSource(this.originalListSubventions);
		this.paginator._intl.itemsPerPageLabel = this.translate.instant(
			"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
		);
		this.paginator._intl.nextPageLabel = this.translate.instant(
			"PAGES.GENERAL.NEXT_PAGE_LABEL"
		);
		this.paginator._intl.previousPageLabel = this.translate.instant(
			"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
		);
		this.paginator._intl.lastPageLabel = this.translate.instant(
			"PAGES.GENERAL.LAST_PAGE_LABEL"
		);
		this.paginator._intl.firstPageLabel = this.translate.instant(
			"PAGES.GENERAL.FIRST_PAGE_LABEL"
		);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

		this.listArrondissementAssoc=[];
		// this.dash.destroy();
	}

	/* onSubmit() {
		const controls = this.searchForm.controls;
		// * check form

		var natureSubvention = this.searchForm.get("natureSubvention").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		var Saerch = new SaerchAssociationDTO2(natureSubvention, dateDebut, dateFin);

		this.fillChartByParam(natureSubvention, this.chartType, dateDebut, dateFin);

		this.service.getNbrAssociationByDateAndTypeAndCommune2(Saerch).subscribe(
			(res) => {
				this.listAssocaition = res;
			},
			(err) => {
				console.log(err);
			}
		);
	} */
	onSubmit() {
		const _this = this;
		if (this.searchForm.get("dateFin").value != "" && this.searchForm.get("dateDebut").value == "") {
			this.searchForm.setControl("dateDebut", new FormControl("", Validators.required));
			this.searchForm.controls.dateDebut.markAsTouched();
		} else {
			var dateDebut = this.searchForm.get("dateDebut").value;
			var dateFin = this.searchForm.get("dateFin").value;
			var anneeSubvention=this.searchForm.get("anneeSubvention").value;
			var arrondissement = this.listArrondissementAssoc;
			if (dateDebut != "" && dateFin != "" && anneeSubvention=="" && arrondissement.length==0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.logistiqueService.getSubsByFilterOnlyDate(dateDebut, dateFin).subscribe(
					(data) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						this.isLoading = false;
						_this.dataSize = data.length;
						this.dataSource = new MatTableDataSource(data);
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					},
					(error) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						_this.dataSize = 0;
						this.dataSource = new MatTableDataSource(null);
						this.isLoading = false;
						this.notification.sendMessage({
							message: "Oops! Is your server disconnected?!",
							type: NotificationType.error,
						});
					}
				);
			}
			if (dateDebut == "" && dateFin == "" && anneeSubvention!="" && arrondissement.length==0) {
				if (anneeSubvention != "") {
					anneeSubvention = this.datePipe.transform(anneeSubvention, "yyyy");
				}

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.logistiqueService.getSubsByFilterAnneeSubv(anneeSubvention).subscribe(
					(data) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						this.isLoading = false;
						_this.dataSize = data.length;
						this.dataSource = new MatTableDataSource(data);
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					},
					(error) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						_this.dataSize = 0;
						this.dataSource = new MatTableDataSource(null);
						this.isLoading = false;
						this.notification.sendMessage({
							message: "Oops! Is your server disconnected?!",
							type: NotificationType.error,
						});
					}
				);
			}
			if (dateDebut != "" && dateFin != "" && anneeSubvention!="" && arrondissement.length==0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}
				if (anneeSubvention != "") {
					anneeSubvention = this.datePipe.transform(anneeSubvention, "yyyy");
				}

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.logistiqueService.getSubsByFilterOnlyDateAndAnneeSubv(dateDebut, dateFin,anneeSubvention).subscribe(
					(data) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						this.isLoading = false;
						_this.dataSize = data.length;
						this.dataSource = new MatTableDataSource(data);
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					},
					(error) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						_this.dataSize = 0;
						this.dataSource = new MatTableDataSource(null);
						this.isLoading = false;
						this.notification.sendMessage({
							message: "Oops! Is your server disconnected?!",
							type: NotificationType.error,
						});
					}
				);
			}
			if (dateDebut != "" && dateFin != "" && anneeSubvention=="" && arrondissement.length!=0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.logistiqueService.getSubsByFilterOnlyDateAndArron(dateDebut, dateFin,arrondissement).subscribe(
					(data) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						this.isLoading = false;
						_this.dataSize = data.length;
						this.dataSource = new MatTableDataSource(data);
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					},
					(error) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						_this.dataSize = 0;
						this.dataSource = new MatTableDataSource(null);
						this.isLoading = false;
						this.notification.sendMessage({
							message: "Oops! Is your server disconnected?!",
							type: NotificationType.error,
						});
					}
				);
			}
			if (dateDebut != "" && dateFin != "" && anneeSubvention!="" && arrondissement.length!=0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}
				if (anneeSubvention != "") {
					anneeSubvention = this.datePipe.transform(anneeSubvention, "yyyy");
				}

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.logistiqueService.getSubsByFilterOnlyDateAndArronAndAnneeSubv(dateDebut, dateFin,arrondissement,anneeSubvention).subscribe(
					(data) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						this.isLoading = false;
						_this.dataSize = data.length;
						this.dataSource = new MatTableDataSource(data);
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					},
					(error) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						_this.dataSize = 0;
						this.dataSource = new MatTableDataSource(null);
						this.isLoading = false;
						this.notification.sendMessage({
							message: "Oops! Is your server disconnected?!",
							type: NotificationType.error,
						});
					}
				);
			}     
		}
		
		
		//this.onSubmit1();
		//this.onSubmit2();
	}

	onSubmit2() {
		const controls = this.searchForm.controls;
		/** check form */

		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");

		var Saerch2 = new SaerchAssociationDTO3(dateDebut, dateFin);

		this.fillChartByParam2(this.chartType, dateDebut, dateFin);

		this.service.getNbrAssociationByDateAndNatureSub(Saerch2).subscribe(
			(res) => {
				this.listAssocaition = res;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(natureSubvention, chartType, dateD, dateF) {
		const _this = this;

		var Saerch = new SaerchAssociationDTO2(natureSubvention, dateD, dateF);

		this.service.getNbrAssociationByParamsLOg(natureSubvention, Saerch).subscribe(
			(data) => {
				console.log(data);
				_this.sizeData = data.length;
				this.getDataSource(data);
				this.isLoading = false;
				/*
				data.forEach((res) => {
					this.xAxisData.push(res.type);
					this.yAxisData.push(res.nbAssociation);
				});
				*/
				//console.log("Data AfterView : " + JSON.stringify(data));
				let nomAssociation = data.map((data) => data.nomAssociation);
				let typeAssoc = data.map((data) => data.type);
				console.log(typeAssoc);
				console.log(nomAssociation);
				//	this.dash.destroy();
				this.chartOption(typeAssoc, nomAssociation, this.chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}

	fillChartByParam2(chartType, dateD, dateF) {
		const _this = this;

		var Saerch2 = new SaerchAssociationDTO3(dateD, dateF);

		this.service.getNbrAssociationByDateAndNatureSub(Saerch2).subscribe(
			(data) => {
				console.log(data);
				_this.sizeData = data.length;

				this.getDataSource(data);
				this.isLoading = false;

				let nomAssociation = data.map((data) => data.nomAssociation);
				let natureActivite = data.map((data) => data.natureActivite);
				console.log(natureActivite);
				console.log(nomAssociation);

				//	this.dash.destroy();
				this.chartOption(natureActivite, nomAssociation, this.chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}

	//
	// ============================================
	getDataSource(data: any) {
		this.dataSource = new MatTableDataSource(data);
		this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
		this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
		this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
		this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
		this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	// ============================================
	//
	// ============================================
	getRandomNumber(min, max) {
		return Math.floor(Math.random() * (+max - +min)) + +min;
	}
	// ============================================
	// Download graphe
	// ============================================
	downloadCanvas(event) {
		var anchor = event.target;
		console.log("Downloading ...");
		// get the canvas
		anchor.href = document.getElementsByTagName("canvas")[0].toDataURL();
		anchor.download = "chart.jpg";
	}

	// ============================================
	// Refresh datatable & graph
	// ============================================
	/* refresh() {
		this.dataSource = new MatTableDataSource(null);
		this.isLoading = true;
		this.dash.destroy();
	} */
	// ===========================================
	// ChartJs
	// ===========================================
	chartOption(libelle, id, type) {
		var ctx = document.getElementById("canvas");
		//var ctxPie = document.getElementById('canvasPie');
		if (type == "pie" || type == "doughnut") {
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد الجمعيات",
							data: id,
							backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0, 255)},${this.getRandomNumber(0, 255)} ,${this.getRandomNumber(0, 255)} , 1)`),
							borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0, 255)},${this.getRandomNumber(0, 255)} ,${this.getRandomNumber(0, 255)} , 1)`),
							borderWidth: 0,
							fill: true,
						},
					],
				},
				options: {
					legend: {
						display: true,
					},
				},
			});
		} else {
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد الجمعيات",
							data: id,
							backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0, 255)},${this.getRandomNumber(0, 255)} ,${this.getRandomNumber(0, 255)} , 1)`),
							//borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderWidth: 0,
							fill: false,
						},
					],
				},
				options: {
					legend: {
						display: false,
					},
					scales: {
						xAxes: [
							{
								display: true,
							},
						],
						yAxes: [
							{
								display: true,
								ticks: {
									beginAtZero: true,
								},
							},
						],
					},
				},
			});
		}
	}

	listArrondissementAssoc=[];
	arrondissementAss=[1,3,5,2,4];
	selectedOptionsArr=[];

	addItemArrondissement(event: any) {
		if (event[0] == "ALL") {
			this.listArrondissementAssoc = this.arrondissementAss;
			this.selectedOptionsArr = this.arrondissementAss.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.arrondissementAss.length) {
			this.listArrondissementAssoc = [];
			this.selectedOptionsArr = [];
		} else {
			this.listArrondissementAssoc = event;
			this.selectedOptionsArr = event;
		}
	}
}
