import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { OrganisationService } from "../../organisation/organisation.service";
import { NotificationService } from "../../shared/notification.service";
import { AssociationService } from "../../utils/association.service";
import { SaerchAssociationDTO3, SaerchAssociationDTO7 } from "../../utils/class/saerch-association-dto";
import { SpinnerService } from "../../utils/spinner.service";
import { SubventionsService } from "../../utils/subventions.service";
import { NotificationType } from "../../shared/NotificationMessage.service";
import { delay } from "rxjs/operators";

@Component({
	selector: "kt-dashboard-association",
	templateUrl: "./dashboard-association.component.html",
	styleUrls: ["./dashboard-association.component.scss"],
})
export class DashboardAssociationComponent implements OnInit {
	public xAxisData = [];
	public yAxisData = [];
	listAssocaition: any[];
	types;
	arrondissements: any;
	isLoading = true;
	isLoading2 = true;
	searchForm: FormGroup;
	dash;
	dash1;
	chartType = "bar";
	chartType1 = "bar";
	sizeData: number = 0;
	idassoction = 0;
	listArrondissements;
	dataSize: any;
	typeActivites: any[];

	// ============================================

	constructor(private associationService: AssociationService, private notification: NotificationService, private spinnerService: SpinnerService, private service: AssociationService, private service5: SubventionsService, private fb: FormBuilder, private translate: TranslateService, private datePipe: DatePipe) {
		this.getArrondissements();
		this.getAssociation();
	}
	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ["nomassociation", "typeActiviteAssociation", "classification", "arrondissement"];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	ngOnInit() {
		this.searchForm = this.fb.group({
			typeActiviteAssociation: [""],
			classification: [""],
			arrondissement: [""],

			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
		});
		this.getAllTypeActivite();
	}

	countAssociation: number = 0;
	originalListAssociations: any[];
	datasize = 0;
	isLoadingResults = true;
	public getAssociation() {
		this.isLoading2 = true;
		const _this = this;
		this.associationService
			.getRessource("/association/index2")
			.pipe(delay(300))
			.subscribe(
				(data) => {
					this.originalListAssociations = data;
					this.isLoading2 = false;
					_this.datasize = data.length
					this.dataSource = new MatTableDataSource(data);
					this.isLoadingResults = false;
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
				},
				(err) => {
					this.isLoading2 = false;
					_this.datasize = 0;
					console.log(err);
					this.isLoadingResults = false;
				}
			);
	}
	getArrondissements() {
		this.service5.getArrondissements().subscribe(
			(data) => {
				this.listArrondissements = data;
			},
			(err) => {
				console.log(err);
			}
		);
	}
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
		this.searchForm = this.fb.group({
			typeActiviteAssociation: [""],
			classification: [""],
			arrondissement: [""],

			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
		});
		this.dataSource = new MatTableDataSource(this.originalListAssociations);
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
		// this.dash.destroy();

		
		this.listTypeActiviteAssoc = [];
		this.listClassificationAssoc = [];
		this.listArrondissementAssoc = [];
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

	onSubmit() {
		const _this = this;
		if (this.searchForm.get("dateFin").value != "" && this.searchForm.get("dateDebut").value == "") {
			this.searchForm.setControl("dateDebut", new FormControl("", Validators.required));
			this.searchForm.controls.dateDebut.markAsTouched();
		} else {
			// start preparing the objects to send
			var typeActiviteAssociation = this.listTypeActiviteAssoc;
			var dateDebut = this.searchForm.get("dateDebut").value;
			var dateFin = this.searchForm.get("dateFin").value;
			var classification = this.listClassificationAssoc;
			var communeActivite = this.listArrondissementAssoc;
			if (dateDebut != "" && dateFin != "" && typeActiviteAssociation.length == 0 && classification.length==0 && communeActivite.length==0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterOnlyDate(dateDebut, dateFin).subscribe(
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
			} 
			if (dateDebut != "" && dateFin != "" && typeActiviteAssociation.length != 0 &&  classification.length==0 && communeActivite.length==0) {
				console.log(typeActiviteAssociation + " | " + dateDebut + " | " + dateFin);
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterParameters(dateDebut, dateFin, typeActiviteAssociation).subscribe(
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
			}
			if (dateDebut != "" && dateFin != "" && typeActiviteAssociation.length == 0 &&  classification.length!=0 && communeActivite.length==0) {
				console.log(typeActiviteAssociation + " | " + dateDebut + " | " + dateFin);
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterParameters3(dateDebut, dateFin, classification).subscribe(
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
			}
			if (dateDebut != "" && dateFin != "" && typeActiviteAssociation.length == 0 &&  classification.length==0 && communeActivite.length!=0) {
				console.log(typeActiviteAssociation + " | " + dateDebut + " | " + dateFin);
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterParameters4(dateDebut, dateFin, communeActivite).subscribe(
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
			}
			if (dateDebut != "" && dateFin != "" && typeActiviteAssociation.length != 0 &&  classification.length!=0 && communeActivite.length==0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterParameters1(dateDebut, dateFin,typeActiviteAssociation,classification).subscribe(
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
			}
			if (dateDebut != "" && dateFin != "" && typeActiviteAssociation.length != 0 &&  classification.length!=0 && communeActivite.length!=0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterParameters2(dateDebut, dateFin,typeActiviteAssociation,classification,communeActivite).subscribe(
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
			}
			if (dateDebut != "" && dateFin != "" && typeActiviteAssociation.length != 0 &&  classification.length==0 && communeActivite.length!=0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterParameters5(dateDebut, dateFin,typeActiviteAssociation,communeActivite).subscribe(
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
			}
			if (dateDebut != "" && dateFin != "" && typeActiviteAssociation.length == 0 &&  classification.length!=0 && communeActivite.length!=0) {
				if (dateDebut != "") {
					dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
				}
				if (dateFin != "") {
					dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
				}

				// start the call service

				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
				this.service.getMarcheByFilterParameters6(dateDebut, dateFin,classification,communeActivite).subscribe(
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
			}


			console.log(typeActiviteAssociation + " | " + dateDebut + " | " + dateFin);
		}
		
		//this.onSubmit1();
		//this.onSubmit2();
	}
	onSubmit1() {
		const _this = this;
		if (this.searchForm.get("dateFin").value != "" && this.searchForm.get("dateDebut").value == "") {
			this.searchForm.setControl("dateDebut", new FormControl("", Validators.required));
			this.searchForm.controls.dateDebut.markAsTouched();
		} else {
			// start preparing the objects to send
			var typeActiviteAssociation = this.searchForm.get("typeActiviteAssociation").value;
			var communeActivite = this.searchForm.get("arrondissement").value;

			var dateDebut = this.searchForm.get("dateDebut").value;
			var dateFin = this.searchForm.get("dateFin").value;
			console.log(communeActivite + " | " + typeActiviteAssociation + " | " + dateDebut + " | " + dateFin);
			if (dateDebut != "") {
				dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
			}
			if (dateFin != "") {
				dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
			}

			// start the call service

			var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
			this.service.getMarcheByFilterParameters1(dateDebut, dateFin, typeActiviteAssociation, communeActivite).subscribe(
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

			console.log(communeActivite + " | " + typeActiviteAssociation + " | " + dateDebut + " | " + dateFin);
		}
	}

	onSubmit2() {
		const _this = this;
		if (this.searchForm.get("dateFin").value != "" && this.searchForm.get("dateDebut").value == "") {
			this.searchForm.setControl("dateDebut", new FormControl("", Validators.required));
			this.searchForm.controls.dateDebut.markAsTouched();
		} else {
			// start preparing the objects to send
			var typeActiviteAssociation = this.searchForm.get("typeActiviteAssociation").value;
			var communeActivite = this.searchForm.get("arrondissement").value;

			var classification = this.searchForm.get("classification").value;

			for (let i = 0; i < classification.length; i++) {
				console.log(classification[i]);
			}

			var dateDebut = this.searchForm.get("dateDebut").value;
			var dateFin = this.searchForm.get("dateFin").value;
			console.log(classification + " | " + communeActivite + " | " + typeActiviteAssociation + " | " + dateDebut + " | " + dateFin);
			if (dateDebut != "") {
				dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
			}
			if (dateFin != "") {
				dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
			}

			// start the call service

			var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
			this.service.getMarcheByFilterParameters2(dateDebut, dateFin, typeActiviteAssociation, classification, communeActivite).subscribe(
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

			console.log(communeActivite + " | " + typeActiviteAssociation + " | " + dateDebut + " | " + dateFin);
		}
	}
	// Charger les statistiques sous forme graphe
	// ============================================
	getAllTypeActivite() {
		this.service.getData2().subscribe((data) => {
			this.typeActivites = data;
			console.log("kjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", this.typeActivites[0].libelle);
		});
	}

	listClassificationAssoc=[];
	classifications:string[]=["1","2","3","4","5","6"];
	selectedOptionsCl=[];

	listTypeActiviteAssoc=[];
	typeActivitesAss=[21,20,19,18,17,16,15,14,13,12,11,10]
	selectedOptionsTyA=[]
	
	listArrondissementAssoc=[];
	arrondissementAss=[1,3,5,2,4];
	selectedOptionsArr=[]

	addItemTypeActiviteAssoc(event: any) {
		if (event[0] == "ALL") {
			this.listTypeActiviteAssoc = this.typeActivitesAss;
			this.selectedOptionsTyA = this.typeActivitesAss.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.typeActivitesAss.length) {
			this.listTypeActiviteAssoc = [];
			this.selectedOptionsTyA = [];
		} else {
			this.listTypeActiviteAssoc = event;
			this.selectedOptionsTyA = event;
		}
	}

	addItemClassificationAssoc(event: any) {
		if (event[0] == "ALL") {
			this.listClassificationAssoc = this.classifications;
			this.selectedOptionsCl = this.classifications.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.classifications.length) {
			this.listClassificationAssoc = [];
			this.selectedOptionsCl = [];
		} else {
			this.listClassificationAssoc = event;
			this.selectedOptionsCl = event;
		}
	}

	addItemArrondissement(event: any) {
		if (event[0] == "ALL") {
			this.listArrondissementAssoc = this.arrondissementAss;
			this.selectedOptionsArr = this.arrondissementAss.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.arrondissementAss.length) {
			this.listArrondissementAssoc = [];
			this.selectedOptionsArr = [];
		} else {
			this.listArrondissementAssoc = event;
			this.selectedOptionsArr = event;
		}
	}
}
