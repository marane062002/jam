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
import { SaerchAssociationDTO } from "../../utils/class/saerch-association-dto";

@Component({
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
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
	// ============================================
	// constructeur
	// ============================================
	constructor(private service: AssociationService, private service2: OrganisationService, private fb: FormBuilder, private translate: TranslateService, private datePipe: DatePipe) {}

	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ["nbAssociation", "type", "commune", "nbFemme", "nbHomme"];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.searchForm = this.fb.group({
			type: ["", Validators.required],
			commune: ["", Validators.required],
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
		this.service.getAllObject("/association/all").subscribe(
			(data) => {
				//console.log("Data AfterView : " + JSON.stringify(data));
				let nbrAssoc = data.map((data) => data.nbAssociation);
				let typeAssoc = data.map((data) => data.type);
				//console.log("List of labels: " + typeAssoc);
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
			Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
			return;
		}
		var type = this.searchForm.get("type").value;
		var commune = this.searchForm.get("commune").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		var Saerch = new SaerchAssociationDTO(type, commune, dateDebut, dateFin);
		this.fillChartByParam(type, commune, this.chartType, dateDebut, dateFin);
		this.service.getNbrAssociationByDateAndTypeAndCommune(Saerch).subscribe(
			(res) => {
				this.listAssocaition = res;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	selectAssoication(event: MatOptionSelectionChange) {
		console.log(event.isUserInput);
		//this.dash1.destroy();
		if (event.isUserInput) {
			this.idassoction = event.source.value;
			this.chartType1 = "bar";
			this.service.getSatatAssoctionByid(event.source.value).subscribe(
				(res) => {
					let data: any = res;
					let libelle = ["عدد الأنشطة", "عدد الاتفاقيات", "عدد المستفيدين"];
					let id = [data.nbActivites, data.nbConventions, data.nbBeneficiaires];
					this.chartOptionAssocation(libelle, id, this.chartType1);
					console.log(res);
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(type, commune, chartType, dateD, dateF) {
		const _this = this;

		var Saerch = new SaerchAssociationDTO(type, commune, dateD, dateF);
		this.service.getNbrAssociationByParams(type, commune, Saerch).subscribe(
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
				let nbrAssoc = data.map((data) => data.nbAssociation);
				let typeAssoc = data.map((data) => data.type);
				console.log(typeAssoc);
				console.log(nbrAssoc);
				//	this.dash.destroy();
				this.chartOption(typeAssoc, nbrAssoc, this.chartType);
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
				this.types = data[1];
				console.log(data[1]);
			},
			(err) => {
				console.log(err);
			}
		);
		this.service2.getRessource("/arrondissements/index").subscribe((data) => {
			(this.arrondissements = data), console.log(data);
		});
	}
	// ============================================
	// OnChange radio
	// ============================================

	selectionChanged(event: MatRadioChange) {
		var type = this.searchForm.get("type").value;
		var commune = this.searchForm.get("commune").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		this.chartType = event.value;
		console.log("Type & commune: " + type + "|" + commune);
		if (type == "" || commune == "") {
			this.chartType = event.value;
			this.dash.destroy();
			this.ngAfterViewInit();
		}
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
			return;
		}

		if (event.value == "pie" || event.value == "doughnut") {
			this.fillChartByParam(type, commune, this.chartType, dateDebut, dateFin);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(type, commune, this.chartType, dateDebut, dateFin);
		}
	}
	selectionChanged1(event: MatRadioChange) {
		this.chartType1 = event.value;
		console.log(event);
		this.service.getSatatAssoctionByid(this.idassoction).subscribe(
			(res) => {
				let data: any = res;
				let libelle = ["NbActivite", "nbConventions", "nbBeneficiaires"];
				let id = [data.nbActivites, data.nbConventions, data.nbBeneficiaires];
				this.chartOptionAssocation(libelle, id, this.chartType1);
				console.log(res);
			},
			(err) => {
				console.log(err);
			}
		);
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
					this.yAxisData.push(res.nbAssociation);
					//this.pieChart.push({value:res.nbAssociation,name:res.type});
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
			.getAllObject("/association/all")
			.pipe(delay(300))
			.subscribe(
				(data) => {
					console.log(data);
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
				},
				(err) => {
					console.log(err);
					this.isLoading = false;
				}
			);
	}
	// ============================================
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

	chartOptionAssocation(libelle, id, type) {
		var ctx = document.getElementById("canvas1");
		//var ctxPie = document.getElementById('canvasPie');
		if (type == "pie" || type == "doughnut") {
			this.dash1 = new Chart(ctx, {
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
