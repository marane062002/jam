
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
import { BoServiceService } from '../../utils/bo-service.service';
import { ProjetService } from "../services/projet.service";

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
	natureDepenses: any;
	origines;
	types;
	isLoading = true;
	searchForm: FormGroup;
	sources: any;
	souSources: any;
	dash;
	chartType = "bar";
	sizeData:number = 0;
	checkLang: string;
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: ProjetService,
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
    "soussourceFinancement" ,
    "nombreProjet", 
    "budget", 
    
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.searchForm = this.fb.group({
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			souSources: ["", Validators.required],
		});
		this.getData();


	}
	 /**
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
	  // ==========================================================
	  //
	  // ==========================================================
	  getData() {
		this.service.getDataProjet()
		  .then(data => {
			// this.prestataires = data[3];
			this.sources = data[3];
		  }, err => {
			console.log(err);
	
		  }
		  );
	  }

	  getSousSources(ob) {

		const id = ob.value.id
		console.log(id)
		if (id != null) {
	
		  this.service.getSousSources(id)
			.subscribe(data => {
			  this.souSources = data,
				console.log(this.souSources)
			},
			  error => console.log(error)
			);
		}
	  }
	// ============================================
	// ngAfterView
	// ============================================

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
	
		var dateDebut = this.searchForm.get("dateDebut").value;
		var souSources = this.searchForm.get("souSources").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		this.fillChartByParam( dateDebut, dateFin,souSources, this.chartType);
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam( dateDebut, dateFin,souSources, chartType) {
		const _this = this;
		this.service.getStatProjetbyPeriode(dateDebut, dateFin,souSources).pipe(delay(300)).subscribe(
				(data) => {
					console.log(JSON.stringify(data));
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
					//console.log("Data AfterView : " + JSON.stringify(data));
					let value = data.map((data) => data.nombreProjet);
					let libelle = data.map(	(data) =>data.sourceFinancement);
					console.log("List of labels: " + libelle);
          console.log("List of value: " + value);
					//this.dash.destroy();
					this.chartOption(libelle, value, chartType);
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

	// ============================================
	// OnChange radio
	// ============================================
	selectionChanged(event: MatRadioChange) {
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		var souSources = this.searchForm.get("souSources").value;
		if ( dateDebut == "" || dateFin == "") {
			this.chartType = event.value;
			this.dash.destroy();
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
			this.fillChartByParam( dateDebut, dateFin,souSources, event.value);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(dateDebut, dateFin, souSources,event.value);
		}
	}

	// ============================================
	// get data
	// ============================================

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
