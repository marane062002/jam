import { Component, OnInit, ViewChild} from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatRadioChange } from "@angular/material";
import { InterventionRapideService } from "../../../utils/intervention-rapide.service";
import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from '@angular/common';
import { OrganisationService } from '../../../organisation/organisation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';

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
	arrondissement: any;
	datasize:number = 0;
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: InterventionRapideService,
		private service1: OrganisationService,
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
		"nbrInter",
	 "typeIntervention",
	//  "idCommune"
	 // ,"datePriseEnCharge"
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
			//typeIntervention: ["", Validators.required],
			idCommune: ["", Validators.required],
		});

		// get datasource
		this.getData();
		this.getDataDropDownList();
	}
	// =============================================
	// date debut change
	// =============================================
	dateDebutchange() {
		this.searchForm.controls["dateFin"].setValue(null);
	}
	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.service.getAllObjectStats("/interventionRapide/stats/all").subscribe(
			(data) => {
				let nbrInter = data.map((data) => data.nbrInter);
				let datePriseEnCharge = data.map((data) => data.typeIntervention);
				this.chartOption(datePriseEnCharge, nbrInter, this.chartType);
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
	 //	var typeIntervention = this.searchForm.get("typeIntervention").value;
	 var typeIntervention =this.searchForm.get("idCommune").value;
		var idCommune = this.searchForm.get("idCommune").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");

		this.fillChartByParam(idCommune,typeIntervention, dateDebut, dateFin, this.chartType);
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(idCommune, typeIntervention,dateDebut, dateFin, chartType) {
		this.service
			.getNbrInterventionByParams(idCommune,typeIntervention, dateDebut, dateFin)
			.subscribe(
				(data) => {
					console.log(JSON.stringify(data));
					this.getDataSource(data);
					let nbrInter = data.map((data) => data.nbrInter);
					let libelle = data.map(
						(data) => data.typeIntervention
					);
					console.log("List of labels: " + libelle);
					this.dash.destroy();
					this.chartOption(libelle, nbrInter, chartType);
				},
				(err) => {
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

		// Liste des arrondissements
		this.service1.getRessource("/arrondissements/index").subscribe((arr) => {
			this.arrondissement = arr;
			//console.log(data);
		});
	}
	// ============================================
	// OnChange radio
	// ============================================
	selectionChanged(event: MatRadioChange) {
		var typeIntervention = this.searchForm.get("typeIntervention").value;
		var idCommune = this.searchForm.get("idCommune").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		if (idCommune == "" || typeIntervention == "" || dateDebut == "" || dateFin == "") {
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
			this.fillChartByParam(idCommune, typeIntervention,dateDebut, dateFin, event.value);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(idCommune, typeIntervention,dateDebut, dateFin, event.value);
		}
	}

	// ============================================
	// get data
	// ============================================
	public getData() {
		const _this = this;
		this.service
			.getAllObjectStats("/interventionRapide/stats/all")
			.pipe(delay(300))
			.subscribe(
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
		this.isLoading = false;
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
							label: "عدد التدخلات",
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
							label: "عدد التدخلات",
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


