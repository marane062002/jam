import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatRadioChange, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AoService } from '../../shared/ao.service';
import { ConsultationService } from '../../shared/consultation.service';

@Component({
  selector: 'kt-bon-commande-dashboard',
  templateUrl: './bon-commande-dashboard.component.html',
  styleUrls: ['./bon-commande-dashboard.component.scss']
})
export class BonCommandeDashboardComponent implements OnInit {

 // ============================================
	// DECLARATION
	// ============================================
	public xAxisData = [];
	public yAxisData = [];
	isLoading = true;
	searchForm: FormGroup;
	dash;
	chartType = "bar";
	sizeData:number = 0;
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service1: ConsultationService,
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
		"Nomber",
		"type",
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
		});

	
	}

	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.service1.getStatBonCommande().subscribe(	
			(res) => {

				let libelle = res.map((data) => data.libelle);
				let value = res.map((data) => data.number);
				this.chartOption(libelle, value, this.chartType);
				this.getDataSource(res);
				this.isLoading=false;
				this.sizeData=res.length
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================
	// OnSubmit
	// ============================================
/*
	onSubmit() {
		console.log(this.searchForm.value,null,2);
		const controls = this.searchForm.controls;
		
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
	
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		this.getAOByPeriod(dateDebut, dateFin);
		this.fillChartByParam(dateDebut, dateFin, this.chartType);
	}
*/
	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(chartType) {
		const _this = this;
		this.service1.getStatBonCommande().subscribe(
				(res) => {
				    let libelle = res.map((data) => data.libelle);
	   	  			let value = res.map((data) => data.number);
					this.chartOption(libelle, value, chartType);
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
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		if ( dateDebut == "" || dateFin == "") {
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
			this.fillChartByParam( event.value);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(event.value);
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
		this.ngAfterViewInit();
	}
	// ===========================================
	// ChartJs
	// ===========================================
	chartOption(libelle, id, type) {
		var ctx = document.getElementById('canvas');
		//var ctxPie = document.getElementById('canvasPie');
			if (type == "pie" || type == "doughnut"){
				this.dash = new Chart(ctx, {
					type: type,
					data: {
						labels: libelle, // date par ex
						datasets: [
							{
								label: "عدد الجمعيات",
								data: id,
								backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
								borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
								borderWidth: 0,
								fill: true,
							}
						],
					},
					options: {
						legend: {
							display: true,
						}
					},
				});
			}else{
				this.dash = new Chart(ctx, {
					type: type,
					data: {
						labels: libelle, // date par ex
						datasets: [
							{
								label: "عدد الجمعيات",
								data: id,
								backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
								//borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
								borderWidth: 0,
								fill: false,
							}
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
