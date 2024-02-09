import { BoServiceService } from './../../../utils/bo-service.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import {
	MatTableDataSource,
	MatRadioChange,
	MatSort,
	MatPaginator,
} from "@angular/material";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";
import { delay } from "rxjs/operators";

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

// ============================================
	// DECLARATION
	// ============================================
	public xAxisData = [];
	public yAxisData = [];
	origines;
	types;
	isLoading = true;
	searchForm: FormGroup;
	dash;
	chartType = "bar";
	sizeData:number = 0;
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: BoServiceService,
		private fb: FormBuilder,
		private translate: TranslateService,
		private datePipe: DatePipe
	) {}
	// getter pour acceder au champs fourmulaire
	get f() { return this.searchForm.controls; }
	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = [
		"nbrCourrier",
		"type",
		"dateExpedetion",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.searchForm = this.fb.group({
			type: ["", Validators.required],
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
		});

		// get datasource
		this.getData();
		this.getDataDropDownList();
	}

	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.service.getAllObject("/courrierSortants/all").subscribe(
			(data) => {
				console.log("Data AfterView : " + JSON.stringify(data));
				let nbrInsertion = data.map((data) => data.nbrCourrier);
				let dateExpedetion = data.map((data) => this.datePipe.transform(data.dateExpedetion, "yyyy-MM-dd"));
				console.log("List of labels: " + dateExpedetion);
				this.chartOption(dateExpedetion, nbrInsertion, this.chartType);
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
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");

		var type = this.searchForm.get("type").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		this.fillChartByParam(type, dateDebut, dateFin, this.chartType);
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(type, dateDebut, dateFin, chartType) {
		const _this = this;
		console.log(chartType);
		this.service
			.getNbrCourrierSortantByParams(type, dateDebut, dateFin).subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
					//console.log("Data AfterView : " + JSON.stringify(data));
					let nbrInsertion = data.map((data) => data.nbrCourrier);
					let dateExpedetion = data.map((data) => this.datePipe.transform( data.dateExpedetion , 'yyyy-MM-dd')
					);
					//console.log("List of labels: " + dateExpedetion);
					this.dash.destroy();
					this.chartOption(dateExpedetion, nbrInsertion, chartType);
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
				this.types = data[0];
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
		//var origine = this.searchForm.get("origine").value;
		var type = this.searchForm.get("type").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		//console.log("origine & dateDebut: " + origine + "|" + dateDebut);
		if (type == "" || dateDebut == "" || dateFin == "") {
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
			this.fillChartByParam(type, dateDebut, dateFin, event.value);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(type, dateDebut, dateFin, event.value);
		}
	}

	// ============================================
	// get data
	// ============================================
	public getData() {
		const _this = this;
		this.service
			.getAllObject("/courrierSortants/all")
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
		if (type == "pie" || type == "doughnut") {
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد المراسلات الواردة",
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
							label: "عدد المراسلات الواردة",
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
