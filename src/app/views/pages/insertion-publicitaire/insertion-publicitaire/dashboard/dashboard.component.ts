import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
	MatTableDataSource,
	MatRadioButton,
	MatRadioChange,
	MatSort,
	MatPaginator,
} from "@angular/material";
import {
	Validators,
	FormBuilder,
	FormGroup,
	FormControl,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";
import { delay } from "rxjs/operators";
import { InsertPubService } from "../../../utils/insert-pub.service";
import { of } from "rxjs";

@Component({
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	public xAxisData = [];
	public yAxisData = [];
	supports;
	isLoading = true;
	searchForm: FormGroup;
	dash;
	chartType = "bar";
	//today's date
	todayDate: Date = new Date();
	sizeData:number = 0;
	// =============================================
	// date debut change
	// =============================================
	dateDebutchange() {
		this.searchForm.controls["dateFin"].setValue(null);
	}
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: InsertPubService,
		private fb: FormBuilder,
		private translate: TranslateService,
		private datePipe: DatePipe
	) {

		// get datasource
		this.getData();
		this.getDataDropDownList();
	}

	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = [
		"nbrPublicitaire",
		"supportPub",
		"datePublication",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.searchForm = this.fb.group({
			support: ["", Validators.required],
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
		});
	}

	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.service
			.getAllObject("/insertionPublicitaires/stats/all")
			.subscribe(
				(data) => {
					//console.log("Data AfterView : " + JSON.stringify(data));
					let nbrInsertion = data.map((data) => data.nbrPublicitaire);
					let datePublication = data.map(
						(data) => data.datePublication
					);
					//console.log("List of labels: " + datePublication);
					this.chartOption(
						datePublication,
						nbrInsertion,
						this.chartType
					);
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
		var support = this.searchForm.get("support").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		console.log("support : " + JSON.stringify(support));
		console.log("dateDebut : " + JSON.stringify(dateDebut));
		console.log("dateFin : " + JSON.stringify(dateFin));

		this.fillChartByParam(support, dateDebut, dateFin, this.chartType);
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(support, dateDebut, dateFin, chartType) {
		const _this = this;
		this.service
			.getNbrInsertionByParams(support, dateDebut, dateFin)
			.subscribe(
				(data) => {
					//console.log(JSON.stringify(data));
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
					//console.log("Data AfterView : " + JSON.stringify(data));
					let nbrInsertion = data.map((data) => data.nbrPublicitaire);
					let datePublication = data.map(
						(data) => data.datePublication
					);
					//console.log("List of labels: " + datePublication);
					this.dash.destroy();
					this.chartOption(datePublication, nbrInsertion, chartType);
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
				this.supports = data[0];
				console.log(data[0]);
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
		var support = this.searchForm.get("support").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		console.log("support & dateDebut: " + support + "|" + dateDebut);
		if (support == "" || dateDebut == "" || dateFin == "") {
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
			this.fillChartByParam(support, dateDebut, dateFin, event.value);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(support, dateDebut, dateFin, event.value);
		}
	}

	// ============================================
	// get data
	// ============================================
	public getData() {
		const _this = this;
		this.service
			.getAllObject("/insertionPublicitaires/stats/all")
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
							label: "عدد الإعلانات",
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
							borderColor: libelle.map(
								() =>
									`rgba(${this.getRandomNumber(
										0,
										255
									)},${this.getRandomNumber(
										0,
										255
									)} ,${this.getRandomNumber(0, 255)} , 1)`
							),
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
							label: "عدد الإعلانات",
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
