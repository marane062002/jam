import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator, MatRadioChange, MatSort, MatTableDataSource } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { AoService } from "../../shared/ao.service";
import { NotificationService } from "../../shared/notification.service";
import { NotificationType } from "../../shared/NotificationMessage.service";
import { PrestataireService } from "../../shared/prestataire.service";
import { TypeMarcheService } from "../../shared/type-marche.service";
import { SpinnerService } from "../../utils/spinner.service";
import { Prestataire } from "../models/prestataire";
import { TypeMarche } from "../models/type-marche";

@Component({
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
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
	sizeData: number = 0;
	dataSize: any;
	prestataires: Prestataire[];
	typeMarches: TypeMarche[];
	// ============================================
	// constructeur
	// ============================================
	constructor(private notification: NotificationService, private service: AoService, private prestataireService: PrestataireService, private typeMarcheService: TypeMarcheService, private spinnerService: SpinnerService, private fb: FormBuilder, private translate: TranslateService, private datePipe: DatePipe) {}
	// getter pour acceder au champs fourmulaire
	get f() {
		return this.searchForm.controls;
	}
	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns = [];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		this.searchForm = this.fb.group({
			typeMarche: [""],
			prestataire: [""],
			dateDebut: [""],
			dateFin: [""],
			type: [""],
		});

		// get datasource
		this.getData();
		this.getDataDropDownList();
	}

	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.getMarches();
		this.getPrestataires();
		this.getAllTypeMarche();
	}

	getMarches() {
		const _this = this;
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.service
			.getAllMarche()
			.then((data) => {
				//console.log("LISTE MARCHE" + JSON.stringify(data,null,2));
				this.isLoading = false;
				_this.dataSize = data.length;
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			})
			.catch((error) => {
				_this.dataSize = 0;
				this.isLoading = false;
				this.notification.sendMessage({
					message: "Oops! Is your server disconnected?!",
					type: NotificationType.error,
				});
			})
			.finally(() => {
				this.spinnerService.stop(spinnerRef); // stop spinner
			});
	}
	getPrestataires() {
		this.prestataireService.getAllPrestataireNomAndId().subscribe((data) => {
			this.prestataires = data;
		});
	}

	getAllTypeMarche() {
		this.typeMarcheService.getAllTypeMarche().subscribe((data) => {
			this.typeMarches = data;
		});
	}

	// ============================================
	// OnSubmit
	// ============================================

	onSubmit() {
		const _this = this;
		if (this.searchForm.get("type").value === "1") {
			if (this.searchForm.get("dateFin").value != "" && this.searchForm.get("dateDebut").value == "") {
				this.searchForm.setControl("dateDebut", new FormControl("", Validators.required));
				this.searchForm.controls.dateDebut.markAsTouched();
			} else {
				this.displayedColumns = ["NumMarche", "mntAdjucataire", "MntEngage", "cautionDefinitive", "dateDebutMarche", "modePassation"];

				// start preparing the objects to send
				var typeMarche = this.searchForm.get("typeMarche").value;
				var prestataire = this.searchForm.get("prestataire").value;
				var dateDebut = this.searchForm.get("dateDebut").value;
				var dateFin = this.searchForm.get("dateFin").value;
				console.log(typeMarche + " | " + prestataire + " | " + dateDebut + " | " + dateFin);
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterParameters(dateDebut, dateFin, typeMarche, prestataire).subscribe(
					(data) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						this.isLoading = false;
						_this.dataSize = data.length;
						this.dataSource = new MatTableDataSource(data);
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					},
					(error) => {
						this.spinnerService.stop(spinnerRef); // stop spinner
						_this.dataSize = 0;
						this.dataSource = new MatTableDataSource(null);
						this.isLoading = false;
						this.notification.sendMessage({
							message: "Oops! Is your server disconnected?!",
							type: NotificationType.error,
						});
					}
				);

				console.log(typeMarche + " | " + prestataire + " | " + dateDebut + " | " + dateFin);
			}
		} else if (this.searchForm.get("type").value === "2") {
			var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
			this.service.getDataMarchedatediffOvPlisAndApprovation().subscribe(
				(data) => {
					this.spinnerService.stop(spinnerRef); // stop spinner
					this.isLoading = false;
					_this.dataSize = data.length;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					this.displayedColumns = ["NumMarche", "délais", "mntAdjucataire", "MntEngage", "cautionDefinitive", "dateDebutMarche"];
				},
				(error) => {
					this.spinnerService.stop(spinnerRef); // stop spinner
					_this.dataSize = 0;
					this.dataSource = new MatTableDataSource(null);
					this.isLoading = false;
					this.notification.sendMessage({
						message: "Oops! Is your server disconnected?!",
						type: NotificationType.error,
					});
				}
			);
		}
	}

	getMarcheListByFilterAttributes() {}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(typeOrigine, type, dateDebut, dateFin, chartType) {
		// const _this = this;
		// this.service.getNbrCourrierEntrantByParams(typeOrigine,type, dateDebut, dateFin).pipe(delay(300)).subscribe(
		// 		(data) => {
		// 			console.log(JSON.stringify(data));
		// 			_this.sizeData = data.length;
		// 			this.getDataSource(data);
		// 			this.isLoading = false;
		// 			//console.log("Data AfterView : " + JSON.stringify(data));
		// 			let nbrInsertion = data.map((data) => data.nbrCourrier);
		// 			let dateReception = data.map(
		// 				(data) =>this.datePipe.transform( data.dateReception , 'yyyy-MM-dd')
		// 			);
		// 			//console.log("List of labels: " + dateReception);
		// 			this.dash.destroy();
		// 			this.chartOption(dateReception, nbrInsertion, chartType);
		// 		},
		// 		(err) => {
		// 			this.isLoading = false;
		// 			console.log(err);
		// 		}
		// 	);
	}
	// ============================================
	// Charger les liste externe
	// ============================================
	getDataDropDownList() {
		// this.service.getData().subscribe((data) => {
		// 	console.log(data);
		// 		this.types = data[0];
		// 		this.origines = data[1];
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// );
	}
	// ============================================
	// OnChange radio
	// ============================================
	selectionChanged(event: MatRadioChange) {
		var typeOrigine = this.searchForm.get("typeOrigine").value;
		var type = this.searchForm.get("type").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		console.log("typeOrigine & dateDebut: " + typeOrigine + "|" + dateDebut);
		if (typeOrigine == "" || type == "" || dateDebut == "" || dateFin == "") {
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

		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		if (event.value == "pie" || event.value == "doughnut") {
			this.fillChartByParam(typeOrigine, type, dateDebut, dateFin, event.value);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(typeOrigine, type, dateDebut, dateFin, event.value);
		}
	}

	// ============================================
	// get data
	// ============================================
	public getData() {
		// const _this = this;
		// this.service
		// 	.getAllObject("/courrierEntrants/all")
		// 	.subscribe(
		// 		(data) => {
		// 			_this.sizeData = data.length;
		// 			this.getDataSource(data);
		// 			this.isLoading = false;
		// 		},
		// 		(err) => {
		// 			this.isLoading = false;
		// 			console.log(err);
		// 		}
		// 	);
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
							label: "عدد المراسلات الواردة",
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
