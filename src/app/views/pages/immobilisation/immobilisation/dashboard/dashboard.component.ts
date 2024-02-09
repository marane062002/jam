import { ImmobilisationService } from "./../../../utils/immobilisation.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
	MatTableDataSource,
	MatRadioChange,
	MatSort,
	MatPaginator,
} from "@angular/material";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { delay } from "rxjs/operators";

@Component({
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	public xAxisData = [];
	public yAxisData = [];
	types;
	statuts;
	isLoading = true;
	searchForm: FormGroup;
	dash;
	chartType = "bar";
	//today's date
	todayDate: Date = new Date();
	sizeData:number = 0;
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: ImmobilisationService,
		private fb: FormBuilder,
		private translate: TranslateService
	) {}

	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ["nbImmobilisation", "type", "statut"];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.searchForm = this.fb.group({
			type: ["", Validators.required],
			statut: ["", Validators.required],
		});

		// get datasource
		this.getData();
		this.getDataDropDownList();
	}

	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.service.getAllObject("/immobilisation/stats/all").subscribe(
			(data) => {
				let nbrAssoc = data.map((data) => data.nbImmobilisation);
				let typeAssoc = data.map((data) => data.type);
				this.chartOption(typeAssoc, nbrAssoc, this.chartType);
			},
			(error) => {
				console.log("Something went wrong.");
			}
		);
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
		var type = this.searchForm.get("type").value;
		var statut = this.searchForm.get("statut").value;
		/*
		console.log(
			"Chart parametres: type: " +
				type +
				" Statut: " +
				statut +
				" type Chart: " +
				this.chartType
		);
		*/
		this.fillChartByParam(type, statut, this.chartType);
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(type, statut, chartType) {
		const _this = this;
		this.service.getNbrImmobilisationByParams(type, statut).subscribe(
			(data) => {
				_this.sizeData = data.length;
				this.getDataSource(data);
				this.isLoading = false;
				let nbrAssoc = data.map((data) => data.nbImmobilisation);
				let typeAssoc = data.map((data) => data.statut);
				/*
				console.log(
					"Chart parametres 2: type: " +
						typeAssoc +
						" nbr immobilisation: " +
						nbrAssoc +
						" type Chart: " +
						this.chartType
				);
				*/
				this.dash.destroy();
				this.chartOption(typeAssoc, nbrAssoc, chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		);
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getDataDropDownList() {
		this.service.getData().subscribe(
			(data) => {
				this.statuts = data[0];
				this.types = data[1];
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
		var type = this.searchForm.get("type").value;
		var statut = this.searchForm.get("statut").value;
		if (type == "" || statut == "") {
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

		if (event.value == "pie" || event.value == "doughnut") {
			this.fillChartByParam(type, statut, event.value);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(type, statut, event.value);
		}
	}

	// ============================================
	//ngAfterView
	// ============================================
	getCharts() {
		this.service.getAllObject("/association/all").subscribe(
			(data) => {
				data.forEach((res) => {
					console.log("Donnees !: " + JSON.stringify(res));
					this.xAxisData.push(res.type);
					this.yAxisData.push(res.nbImmobilisation);
					//this.pieChart.push({value:res.nbImmobilisation,name:res.type});
				});
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
		this.service
			.getAllObject("/immobilisation/stats/all")
			.pipe(delay(300))
			.subscribe(
				(data) => {
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
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
	// Color random
	// ============================================
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
							label: "عدد الأصول الملموسة ",
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
							label: "عدد الأصول الملموسة ",
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
}
