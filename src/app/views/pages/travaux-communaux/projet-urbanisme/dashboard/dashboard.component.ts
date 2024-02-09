import { ProjetUrbanismeService } from "./../../../utils/projet-urbanisme.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
	MatTableDataSource,
	MatPaginator,
	MatSort,
	MatRadioChange,
	MatRadioButton,
} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	// ============================================
	//
	// ============================================
	public xAxisData = [];
	public yAxisData = [];
	statuts;
	tab = {};
	isLoading = true;
	option = {};
	pieChart: any = [];
	searchForm: FormGroup;
	echartsInstance: any;
	datasize:number = 0;
	dash;
	chartType = "bar";
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: ProjetUrbanismeService,
		private fb: FormBuilder,
		private translate: TranslateService,
		private datePipe: DatePipe
	) {
	}
	// getter pour acceder au champs fourmulaire
	get f() { return this.searchForm.controls; }
	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ["nbrProjet", "statut", "dateReception"];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.searchForm = this.fb.group({
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			statut: ["", Validators.required],
		});

		// get datasource
		this.getData();
		this.getCharts();
		this.getDataDropDownList();
		//document.getElementById("piechart").style.display = "none";
	}
	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.service.getAllObject("/projetUrbanisme/stats/all").subscribe(
			(data) => {
				let nbProjet = data.map((data) => data.nbProjet);
				let dtReception = data.map((data) => data.dtReception);
				this.chartOption(dtReception, nbProjet, this.chartType);
			},
			(error) => {
				console.log("Something went wrong.");
			}
		);
	}
	// ============================================
	//
	// ============================================
	onChartInit(e: any) {
		this.echartsInstance = e;
		console.log("on chart init:", e);
	}
	// ============================================
	//
	// ============================================
	clear() {
		if (this.echartsInstance) {
			this.echartsInstance.clear();
			console.log("clear() called");
		}
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		var statut = this.searchForm.get("statut").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");

		this.fillChartByParam(statut, dateDebut, dateFin, this.chartType);
	}

	// ============================================
	// Charger les liste externe
	// ============================================
	getDataDropDownList() {
		this.service.getData().subscribe(
			(data) => {
				this.statuts = data[1];
				console.log(data[1]);
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================
	// OnChange radio
	// ============================================
	selectionChanged(event: MatRadioChange) {
		var statut = this.searchForm.get("statut").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		if (statut == "" || dateDebut == "" || dateFin == "") {
			this.chartType = event.value;
			this.dash.destroy();
			this.ngAfterViewInit();
		}
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		if (event.value == "pie" || event.value == "doughnut") {
			this.fillChartByParam(statut, dateDebut, dateFin, event.value);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(statut,dateDebut, dateFin, event.value);
		}
	}
	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(statut,dateDebut, dateFin, chartType) {
		this.service
			.getAllProjectCountByParams(dateDebut, dateFin,statut)
			.subscribe(
				(data) => {
					console.log(JSON.stringify(data));
					this.getDataSource(data);
					let nbProjet = data.map((data) => data.nbProjet);
					let dtReception = data.map(
						(data) => data.dtReception
					);
					console.log("List of labels: " + dtReception);
					this.dash.destroy();
					this.chartOption(dtReception, nbProjet, chartType);
				},
				(err) => {
					console.log(err);
				}
			);
	}
	// ============================================
	//
	// ============================================
	onChangeVal(mrChange: MatRadioChange) {
		console.log("change value" + mrChange.value);
		let mrButton: MatRadioButton = mrChange.source;
		console.log(mrButton.name);
		console.log(mrButton.checked);
		console.log(mrButton.inputId);
	}

	// ============================================
	//ngAfterView
	// ============================================
	getCharts() {
		this.service.getApiResponse("/projetUrbanisme/stats/all").then(
			(data) => {
				//this.tab = data[0];
				const dataPie = [];
				data.forEach((res) => {
					this.xAxisData.push(res.statut);
					this.yAxisData.push(res.nbProjet);
					dataPie.push(res.dtReception);
					this.pieChart.push({
						value: res.nbProjet,
						name: res.statut,
						date: res.dtReception,
					});
				});
				this.isLoading = false;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	// ============================================
	// get data
	// ============================================
	public getData() {
		const _this = this;
		this.service.getAllObject("/projetUrbanisme/stats/all").subscribe(
			(data) => {
				this.isLoading = false;
				_this.datasize = data.length;
				this.getDataSource(data);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}
	// ============================================
	//
	// ============================================
	getDataSource(data: any) {
		this.dataSource = new MatTableDataSource(data);
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
	}
	// ============================================
	//
	// ============================================
	//backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
	getRandomNumber(min, max) {
		return Math.floor(Math.random() * (+max - +min)) + +min;
	}
	// ============================================
	// Download graphe
	// ============================================
	downloadCanvas(event) {
		var anchor = event.target;
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
		this.searchForm.reset();
		this.dash.destroy();
		this.getData();
		this.ngAfterViewInit();
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
							label: "عدد المشاريع",
							data: id,
							backgroundColor: libelle.map(
								() =>
									`rgba(${this.getRandomNumber(
										0,
										255
									)},${this.getRandomNumber(
										0,
										255
									)} ,${this.getRandomNumber(0, 255)} , 1)`
							),
							//borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderWidth: 0,
							fill: false,
						},
					],
				},
				options: {
					legend: {
						display: true,
					},
				},
			});
		} else if (type == "bar" || type == "line") {
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد المشاريع",
							data: id,
							backgroundColor: libelle.map(
								() =>
									`rgba(${this.getRandomNumber(
										0,
										255
									)},${this.getRandomNumber(
										0,
										255
									)} ,${this.getRandomNumber(0, 255)} , 1)`
							),
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
	 /** ================================================
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.searchForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }
}
