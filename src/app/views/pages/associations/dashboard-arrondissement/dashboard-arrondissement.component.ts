import { OrganisationService } from "./../../organisation/organisation.service";
import { AssociationService } from "./../../utils/association.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatTableDataSource, MatRadioButton, MatRadioChange, MatSort, MatPaginator, MatSelectChange, MatOptionSelectionChange } from "@angular/material";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ProjetUrbanismeService } from "../../utils/projet-urbanisme.service";
import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";
import { delay } from "rxjs/operators";
import { SaerchcourrierEntrantsDTO } from "../../utils/class/saerchcourrier-entrants-dto";
import { SaerchAssociationDTO, SaerchAssociationDTO3, SaerchAssociationDTO4, SaerchAssociationDTO5, SaerchAssociationDTO6 } from "../../utils/class/saerch-association-dto";
import { SubventionsService } from "../../utils/subventions.service";
import { IDropdownSettings, NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@Component({
	selector: "kt-dashboard-arrondissement",
	templateUrl: "./dashboard-arrondissement.component.html",
	styleUrls: ["./dashboard-arrondissement.component.scss"],
})
export class DashboardArrondissementComponent implements OnInit {
	activite_de_rayonnementValue: any;
	a: any;
	b: any;
	test: number;
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
	listArrondissements: any[];

	dropdownList = [];
	dropdownSettings: IDropdownSettings = {};
	dropdownDirtionSetting: IDropdownSettings;
	// ============================================
	// constructeur
	// ============================================
	constructor(private service5: SubventionsService, private service: AssociationService, private service2: OrganisationService, private fb: FormBuilder, private translate: TranslateService, private datePipe: DatePipe) {
		this.getArrondissements();
	}

	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ["nbAssociation", "activite_de_rayonnement", "arrondissement", "natureSubvention"];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	statistics: any[] = [];
	onSelectAllDirection(items: any) {
		console.log(items);
	}

	loadStatistics(startDate: string, endDate: string, natureSubvention: any[]) {
		this.service.getAssociationStatistics(startDate, endDate, natureSubvention).subscribe((statistics) => (this.statistics = statistics));
	}
	getArrondissements() {
		this.service5.getArrondissements().subscribe(
			(data) => {
				this.listArrondissements = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	onItemSelectDirection(item: any) {
		console.log(item);
	}

	// ngOninit
	// ============================================
	ngOnInit() {
		this.dropdownDirtionSetting = {
			singleSelection: false,
			idField: "id",
			textField: "libelle",
			selectAllText: "Tout sélectionner ",
			unSelectAllText: "Tout déselectionner ",
			itemsShowLimit: 3,
			allowSearchFilter: true,
		};
		this.dropdownList = [
			{ item_id: 1, item_text: "محلي" },
			{ item_id: 2, item_text: "جهوي" },
			{ item_id: 3, item_text: "وطني" },
			{ item_id: 4, item_text: "دولي" },
		];
		this.dropdownSettings = {
			idField: "item_id",
			textField: "item_text",
		};
		// const startDate = "1977-01-01";
		// const endDate = "2023-12-01";
		// const natureSubvention = "إطعام";
		// console.log("lllllllllllllll", this.searchForm.value.natureSubvention);
		//
		// this.loadStatistics(this.searchForm.value.dateDebut, this.searchForm.value.dateFin, this.searchForm.value.natureSubvention);
		//
		this.searchForm = this.fb.group({
			activite_de_rayonnement: [""],
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			arrondissement: [""],
		});
	}

	// ============================================

	// ============================================
	// OnSubmit
	// ============================================

	onSubmit() {
		const controls = this.searchForm.controls;
		/** check form */

		var activite_de_rayonnement = this.searchForm.get("activite_de_rayonnement").value;
		var dateDebut = this.searchForm.get("dateDebut").value;

		var dateFin = this.searchForm.get("dateFin").value;

		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");

		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		var Saerch = new SaerchAssociationDTO4(activite_de_rayonnement, dateDebut, dateFin);

		this.fillChartByParam(activite_de_rayonnement, this.chartType, dateDebut, dateFin);

		this.service.getNbrAssociationByDateAndRayonnement(Saerch).subscribe(
			(res) => {
				this.listAssocaition = res;
			},
			(err) => {
				console.log(err);
			}
		);
		// ===========================================================================================================================================

		const controls2 = this.searchForm.controls;
		/** check form */

		var activite_de_rayonnement = this.searchForm.get("activite_de_rayonnement").value;

		var arrondissement = this.searchForm.get("arrondissement").value;

		var dateDebut = this.searchForm.get("dateDebut").value;

		var dateFin = this.searchForm.get("dateFin").value;

		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");

		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		var Saerch2 = new SaerchAssociationDTO6(activite_de_rayonnement, arrondissement, dateDebut, dateFin);

		this.fillChartByParam3(activite_de_rayonnement, arrondissement, this.chartType, dateDebut, dateFin);

		const _this = this;
		this.service.findAllbyDateAndTWO(Saerch2).subscribe(
			(data2) => {
				console.log(data2);

				_this.sizeData = data2.length;
				this.getDataSource(data2);

				this.isLoading = false;

				let nomAssociation = data2.map((data2) => data2.nomAssociation);
				let activite_de_rayonnement = data2.map((data2) => data2.activite_de_rayonnement);

				let arrondissement = data2.map((data2) => data2.arrondissement);

				console.log(activite_de_rayonnement);

				this.activite_de_rayonnementValue = activite_de_rayonnement;

				console.log("oooooooooooooooooo", this.activite_de_rayonnementValue);

				this.chartOption(activite_de_rayonnement, nomAssociation, this.chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);

		console.log("lllllllllllllllllllllllll");
	}
	onSubmit3() {
		// const controls = this.searchForm.controls;
		// /** check form */

		// var activite_de_rayonnement = this.searchForm.get("activite_de_rayonnement").value;
		// var dateDebut = this.searchForm.get("dateDebut").value;

		// var dateFin = this.searchForm.get("dateFin").value;

		// dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");

		// dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		// var Saerch = new SaerchAssociationDTO4(activite_de_rayonnement, dateDebut, dateFin);

		// this.fillChartByParam4(activite_de_rayonnement, this.chartType, dateDebut, dateFin);

		// this.service.getNbrAssociationByDateAndRayonnementLogistique(Saerch).subscribe(
		// 	(res) => {
		// 		this.listAssocaition = res;
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// );
		// ===========================================================================================================================================

		const controls2 = this.searchForm.controls;
		/** check form */

		var activite_de_rayonnement = this.searchForm.get("activite_de_rayonnement").value;

		var arrondissement = this.searchForm.get("arrondissement").value;

		var dateDebut = this.searchForm.get("dateDebut").value;

		var dateFin = this.searchForm.get("dateFin").value;

		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");

		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		var Saerch2 = new SaerchAssociationDTO6(activite_de_rayonnement, arrondissement, dateDebut, dateFin);

		this.fillChartByParam5(activite_de_rayonnement, arrondissement, this.chartType, dateDebut, dateFin);

		const _this = this;
		this.service.findAllbyDateAndTWOLogistique(Saerch2).subscribe(
			(data2) => {
				console.log(data2);

				_this.sizeData = data2.length;
				this.getDataSource(data2);

				this.isLoading = false;

				let nomAssociation = data2.map((data2) => data2.nomAssociation);
				let activite_de_rayonnement = data2.map((data2) => data2.activite_de_rayonnement);

				let arrondissement = data2.map((data2) => data2.arrondissement);

				console.log(activite_de_rayonnement);

				this.activite_de_rayonnementValue = activite_de_rayonnement;

				console.log("oooooooooooooooooo", this.activite_de_rayonnementValue);

				this.chartOption(activite_de_rayonnement, nomAssociation, this.chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);

		console.log("lllllllllllllllllllllllll");
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(activite_de_rayonnement, chartType, dateD, dateF) {
		const _this = this;

		var Saerch = new SaerchAssociationDTO4(activite_de_rayonnement, dateD, dateF);

		this.service.getNbrAssociationByParamsRayonnement(activite_de_rayonnement, Saerch).subscribe(
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
				let activite_de_rayonnement = data.map((data) => data.activite_de_rayonnement);

				let arrondissement = data.map((data) => data.arrondissement);

				console.log(activite_de_rayonnement);

				this.activite_de_rayonnementValue = activite_de_rayonnement;

				console.log(nomAssociation);
				//	this.dash.destroy();
				this.chartOption(activite_de_rayonnement, nomAssociation, this.chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}
	fillChartByParam3(arrondissement, activite_de_rayonnement, chartType, dateD, dateF) {
		const _this = this;

		var Saerch = new SaerchAssociationDTO6(arrondissement, activite_de_rayonnement, dateD, dateF);

		this.service.finbyTWO(arrondissement, activite_de_rayonnement, Saerch).subscribe(
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
				let activite_de_rayonnement = data.map((data) => data.activite_de_rayonnement);

				let arrondissement = data.map((data) => data.arrondissement);

				console.log(activite_de_rayonnement);

				this.activite_de_rayonnementValue = activite_de_rayonnement;

				console.log(nomAssociation);
				//	this.dash.destroy();
				this.chartOption(activite_de_rayonnement, nomAssociation, this.chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}
	fillChartByParam4(activite_de_rayonnement, chartType, dateD, dateF) {
		const _this = this;

		var Saerch = new SaerchAssociationDTO4(activite_de_rayonnement, dateD, dateF);

		this.service.getNbrAssociationByParamsRayonnementLogistique(activite_de_rayonnement, Saerch).subscribe(
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
				let activite_de_rayonnement = data.map((data) => data.activite_de_rayonnement);

				let arrondissement = data.map((data) => data.arrondissement);

				console.log(activite_de_rayonnement);

				this.activite_de_rayonnementValue = activite_de_rayonnement;

				console.log(nomAssociation);
				//	this.dash.destroy();
				this.chartOption(activite_de_rayonnement, nomAssociation, this.chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}
	fillChartByParam5(arrondissement, activite_de_rayonnement, chartType, dateD, dateF) {
		const _this = this;

		var Saerch = new SaerchAssociationDTO6(activite_de_rayonnement, arrondissement, dateD, dateF);

		this.service.finbyTWOLogistique(activite_de_rayonnement, arrondissement, Saerch).subscribe(
			(data) => {
				console.log(data);

				_this.sizeData = data.length;
				this.getDataSource(data);

				this.isLoading = false;

				let nomAssociation = data.map((data) => data.nomAssociation);
				let activite_de_rayonnement = data.map((data) => data.activite_de_rayonnement);

				let arrondissement = data.map((data) => data.arrondissement);

				console.log(activite_de_rayonnement);

				this.activite_de_rayonnementValue = activite_de_rayonnement;

				console.log(nomAssociation);
				//	this.dash.destroy();
				this.chartOption(activite_de_rayonnement, nomAssociation, this.chartType);
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
	refresh() {
		this.dataSource = new MatTableDataSource(null);
		this.isLoading = true;
		this.dash.destroy();
	}
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
}
