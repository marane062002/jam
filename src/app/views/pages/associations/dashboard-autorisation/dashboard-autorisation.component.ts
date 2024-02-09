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
import { AcquisitionService } from "../../utils/acquisition.service";

@Component({
	selector: "kt-dashboard-autorisation",
	templateUrl: "./dashboard-autorisation.component.html",
	styleUrls: ["./dashboard-autorisation.component.scss"],
})
export class DashboardAutorisationComponent implements OnInit {
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

	constructor(private autorisationService: AcquisitionService, private notification: NotificationService, private spinnerService: SpinnerService, private service5: SubventionsService, private fb: FormBuilder, private translate: TranslateService, private datePipe: DatePipe) {
		this.getArrondissements();
		this.getAutorisations();
	}
	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ["nomAssociation", "champActivite", "arrondissement"];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	ngOnInit() {
		this.searchForm = this.fb.group({
			//dateDebut: ["", Validators.required],
			//dateFin: ["", Validators.required],
			nomAssociation: [""],
			champActivite: [""],
			arrondissement: [""]
		});
	}

	countAssociation: number = 0;
	originalListAutorisations: any[];
	datasize = 0;
	isLoadingResults = true;
	public getAutorisations() {
		this.isLoading2 = true;
		const _this = this;
		this.autorisationService
			.getRessource("/acquisition")
			.pipe(delay(300))
			.subscribe(
				(data) => {
					this.originalListAutorisations = data;
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
			// dateDebut: ["", Validators.required],
			// dateFin: ["", Validators.required],
			nomAssociation: [""],
			champActivite: [""],
			arrondissement: [""]
		});
		this.dataSource = new MatTableDataSource(this.originalListAutorisations);
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

		this.listArrondissementAssoc=[];
		this.listChampActiviteAssoc=[];
		// this.dash.destroy();
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
		var champActivite = this.listChampActiviteAssoc;
		var arrondissement = this.listArrondissementAssoc;
		if (champActivite.length != 0 && arrondissement.length != 0) {
			var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
			this.autorisationService.getAutorisationsByFilterAllParameters(champActivite, arrondissement).subscribe(
				(data) => {
					this.spinnerService.stop(spinnerRef);
					this.isLoading = false;
					_this.dataSize = data.length;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(error) => {
					this.spinnerService.stop(spinnerRef);
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
		if (champActivite.length != 0 && arrondissement.length == 0) {
			var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
			this.autorisationService.getAutorisationsByDateAndChampActivite(champActivite).subscribe(
				(data) => {
					this.spinnerService.stop(spinnerRef);
					this.isLoading = false;
					_this.dataSize = data.length;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(error) => {
					this.spinnerService.stop(spinnerRef);
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
		if (champActivite.length == 0 && arrondissement.length != 0) {
			var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
			this.autorisationService.getAutorisationsByDateAndArrondissement(arrondissement).subscribe(
				(data) => {
					this.spinnerService.stop(spinnerRef);
					this.isLoading = false;
					_this.dataSize = data.length;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(error) => {
					this.spinnerService.stop(spinnerRef);
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

	listChampActiviteAssoc=[];
	ChampActivitesAss=["1","2","3"]
	selectedOptionsChA=[]

	listArrondissementAssoc=[];
	arrondissementAss=[1,3,5,2,4];
	selectedOptionsArr=[]
	
	addItemChampActiviteAssoc(event: any) {
		if (event[0] == "ALL") {
			this.listChampActiviteAssoc = this.ChampActivitesAss;
			this.selectedOptionsChA = this.ChampActivitesAss.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.ChampActivitesAss.length) {
			this.listChampActiviteAssoc = [];	
			this.selectedOptionsChA = [];
		} else {
			this.listChampActiviteAssoc = event;
			this.selectedOptionsChA = event;
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
