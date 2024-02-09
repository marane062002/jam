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
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	language=localStorage.getItem('language');

	// ============================================
	// DECLARATION
	// ============================================
	public xAxisData = [];
	public yAxisData = [];
	origines;
	types;
	divisions;
	traites;
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
	) {
		
	}
	// getter pour acceder au champs fourmulaire
	get f() { return this.searchForm.controls; }
	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = [
		"nbrCourrier",
		"type",
		"typeOrigine",
		//"destinataire",
		"dateReception",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		if(this.language=='fr'){
			this.traites=['Enregistré','Oui','En transit','Clôturé','Erreur de livraison']

		}
		if(this.language=='ar'){
			this.traites=['مسجل','نعم','قيد النقل','منتهي','بالخطأ في الارسال']

		}
		this.searchForm = this.fb.group({
			type: ["", Validators.required],
			typeOrigine: ["", Validators.required],
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			division: ["", Validators.required],
			traite:["", Validators.required],
		});

		// get datasource
		this.getData();
		this.getDataDropDownList();
	}

	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.service.getAllObject("/courrierEntrants/all").subscribe(	(data) => {
				console.log("Data AfterView : " + JSON.stringify(data));
				let nbrInsertion = data.map((data) => data.nbrCourrier);
				let dateReception = data.map((data) => this.datePipe.transform(data.dateReception, "yyyy-MM-dd"));//new Date(data.dateReception).toISOString());
				console.log("List of labels: " + dateReception);
				this.chartOption(dateReception, nbrInsertion, this.chartType);
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
		console.log(this.searchForm.value,null,2);
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		var typeOrigine = this.searchForm.get("typeOrigine").value;
		var type = this.searchForm.get("type").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		var idDiv = this.searchForm.get("division").value;

		var traite=[]
		if(this.language=='fr'){
			if(this.searchForm.get("traite").value.includes('Enregistré')){
				traite.push(null)
			}
			if(this.searchForm.get("traite").value.includes('Oui')){
				traite.push(2)
			}
			if(this.searchForm.get("traite").value.includes('En transit')){
				traite.push(1)
			}
			if(this.searchForm.get("traite").value.includes('Clôturé')){
				traite.push(3)
			}
			if(this.searchForm.get("traite").value.includes('Erreur de livraison')){
				traite.push(4)
			}
		}
		if(this.language=='ar'){
			if(this.searchForm.get("traite").value.includes('مسجل')){
				traite.push(null)
			}
			if(this.searchForm.get("traite").value.includes('نعم')){
				traite.push(2)
			}
			if(this.searchForm.get("traite").value.includes('قيد النقل')){
				traite.push(1)
			}
			if(this.searchForm.get("traite").value.includes('منتهي')){
				traite.push(3)
			}
			if(this.searchForm.get("traite").value.includes('بالخطأ في الارسال')){
				traite.push(4)
			}   
		}
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		console.log(typeOrigine +' | '+ type+' | '+ dateDebut+' | '+dateFin + ' | '+ idDiv+ ' | '+ traite);
		this.fillChartByParam(typeOrigine,type, dateDebut, dateFin, this.chartType, idDiv, traite);
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(typeOrigine,type, dateDebut, dateFin, chartType, idDiv, traite) {
		const _this = this;
		this.service.getNbrCourrierEntrantByParamsdiv(typeOrigine,type, dateDebut, dateFin, idDiv, traite).pipe(delay(300)).subscribe(
				(data) => {
					console.log(JSON.stringify(data));
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
					//console.log("Data AfterView : " + JSON.stringify(data));
					let nbrInsertion = data.map((data) => data.nbrCourrier);
					let dateReception = data.map(
						(data) =>this.datePipe.transform( data.dateReception , 'yyyy-MM-dd')
					);
					//console.log("List of labels: " + dateReception);
					this.dash.destroy();
					this.chartOption(dateReception, nbrInsertion, chartType);
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
		this.service.getData().subscribe((data) => {
			console.log(data);
				this.types = data[0];
				this.origines = data[1];
				this.divisions = data[4];
				// this.traites = data[5];
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
		var typeOrigine = this.searchForm.get("typeOrigine").value;
		var type = this.searchForm.get("type").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		var traite = []
		if(this.language=='fr'){
			if(this.searchForm.get("traite").value.includes('Enregistré')){
				traite.push(null)
			}
			if(this.searchForm.get("traite").value.includes('Oui')){
				traite.push(2)
			}
			if(this.searchForm.get("traite").value.includes('En transit')){
				traite.push(1)
			}
			if(this.searchForm.get("traite").value.includes('Clôturé')){
				traite.push(3)
			}
			if(this.searchForm.get("traite").value.includes('Erreur de livraison')){
				traite.push(4)
			}
		}
		if(this.language=='ar'){
			if(this.searchForm.get("traite").value.includes('مسجل')){
				traite.push(null)
			}
			if(this.searchForm.get("traite").value.includes('نعم')){
				traite.push(2)
			}
			if(this.searchForm.get("traite").value.includes('قيد النقل')){
				traite.push(1)
			}
			if(this.searchForm.get("traite").value.includes('منتهي')){
				traite.push(3)
			}
			if(this.searchForm.get("traite").value.includes('بالخطأ في الارسال')){
				traite.push(4)
			}   
		}
		var idDiv = this.searchForm.get("division").value;
		console.log("typeOrigine & dateDebut: " + typeOrigine + "|" + dateDebut + " | " + traite);
		if (typeOrigine == "" || type == "" || dateDebut == "" || dateFin == "") {
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
			this.fillChartByParam(typeOrigine,type, dateDebut, dateFin, event.value,idDiv , traite);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(typeOrigine,type, dateDebut, dateFin, event.value, idDiv, traite);
		}
	}

	// ============================================
	// get data
	// ============================================
	public getData() {
		const _this = this;
		this.service
			.getAllObject("/courrierEntrants/all")
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
