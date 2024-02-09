import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { BoServiceService } from "../../utils/bo-service.service";
import { forkJoin } from "rxjs";
import { parse } from "path";
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Page } from "../../utils/pagination/page";
import { CustomPaginationService } from "../../utils/pagination/services/custom-pagination.service";

@Component({
	selector: "kt-top-management",
	templateUrl: "./top-management.component.html",
	styleUrls: ["./top-management.component.scss"],
})
export class TopManagementComponent implements OnInit {
	dynamicWidth1: any;
	dynamicWidth2: any;
	dynamicWidth3: any;
	tempsMoyemParCourrierH: any;
	tempsMoyemParCourrierMin: any;
	inHour: boolean = false;
	inMinutes: boolean = false;
	tempsMoyemParCourrierEntrant: any;
	tempsMoyemParCourrierConvocation: any;
	typeCourrierPlusTraite: any;
	pourcentageCourrierPlusTraite: any;
	totalCourrier: number = 0;
	totalCourrierEntrant: number = 0;
	totalCourrierConvocation: number = 0;
	totalCourrierSortant: number = 0;

	totalCourrierEntrantTraited: number = 0;
	totalCourrierEntrantClotured: number = 0;
	totalCourrierConvocationTraited: number = 0;
	totalCourrierSortantTraited: number = 0;

	isLoading = true;
	isLoading2 = true;

	@ViewChild(MatTable, { static: false }) table: MatTable<any>;
	@ViewChild("paginator", { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@ViewChild(MatTable, { static: false }) table2: MatTable<any>;
	@ViewChild("paginator2", { static: false }) paginator2: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort2: MatSort;

	displayedColumns: string[] = ["nomEntite", "courriersTraites", "courriersNonTraites", "performance"];
	displayedColumns2: string[] = ["nomComplet", "courriersTraites", "courriersNonTraites", "performance"];
	totalCourrierEntrantNotTraited: number = 0;
	totalCourrierConvocationNotTraited: number = 0;
	totalCourrierSortantNotTraited: number = 0;
	divisions: any[] = [];
	personnels: any[] = [];
	dash;
	chartType = "pie";
	type1: any;
	type2: any;
	type3: any;
	searchForm = new FormGroup({
		dateDebut: new FormControl(""),
		dateFin: new FormControl(""),
		volumeTotalCourrier: new FormControl(""),
		periodeDe: new FormControl(""),
		typeOrigine: new FormControl(""),
		type: new FormControl(""),
	});
	listePerformancesParEntite = [
		{ nomEntite: "a", location: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "30" },
		{ nomEntite: "a", location: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "40" },
		{ nomEntite: "a", location: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "50" },
		{ nomEntite: "a", location: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "20" },
		{ nomEntite: "a", location: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "10" },
	];

	listePerformancesIndividuelles = [
		{ nomComplet: "a", position: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "30" },
		{ nomComplet: "a", position: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "40" },
		{ nomComplet: "a", position: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "50" },
		{ nomComplet: "a", position: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "20" },
		{ nomComplet: "a", position: "b", courriersTraites: "c", courriersNonTraites: "d", performance: "10" },
	];

	dataSource = new MatTableDataSource<any>();
	dataSource2 = new MatTableDataSource<any>();
	constructor(private paginationService: CustomPaginationService, private bureauOrdreService: BoServiceService, private translate: TranslateService) {}
	types;
	ngOnInit() {
		this.paginationService.currentMessage.subscribe((message) => {
			this.page = message;
		});
		this.searchForm.get("periodeDe").setValue(0);
		this.typeCourrierPlusTraite = "TYPE 2";
		this.bureauOrdreService.getData().subscribe(
			(data) => {
				console.log(data);
				this.types = data[0];
			},
			(err) => {
				console.log(err);
			}
		);
		this.getCountAllTypeCourriers();
	}
	ngOnDestroy() {
		this.paginationService.updateMessage(this.page);
		// localStorage.setItem('page',JSON.stringify(this.page))
	}
	sizeData = 0;
	getDivisions() {
		let resultECT = [];
		let resultECNT = [];
		this.isLoading = true;
		this.bureauOrdreService.getAllObject2("/divisions/index").then((data) => {
			this.isLoading = false;
			this.divisions = data;
			for (let i = 0; i < this.divisions.length; i++) {
				const courriersTNTParEntite = forkJoin([this.bureauOrdreService.countCourriersTraitesNonTraitesParEntite("/countCourriersEntrantsTraitesParEntite/", this.divisions[i].id), this.bureauOrdreService.countCourriersTraitesNonTraitesParEntite("/countCourriersEntrantsNonTraitesParEntite/", this.divisions[i].id), this.bureauOrdreService.countCourriersTraitesNonTraitesParEntite("/countCourriersConvocationTraitesParEntite/", this.divisions[i].id), this.bureauOrdreService.countCourriersTraitesNonTraitesParEntite("/countCourriersConvocationNonTraitesParEntite/", this.divisions[i].id)]);

				courriersTNTParEntite.subscribe(([resECT1, resECNT1, resECT2, resECNT2]) => {
					resultECT.push(resECT1 + resECT2);
					resultECNT.push(resECNT1 + resECNT2);
					data.forEach((item, index) => {
						item.paramECT = resultECT[index];
						item.paramECNT = resultECNT[index];
						if (resultECNT[index] != 0 && resultECT[index] != 0) {
							item.performanceE = parseFloat(((resultECT[index] / (resultECT[index] + resultECNT[index])) * 100).toFixed(2));
						}
					});
					this.dataSource = new MatTableDataSource(data);

					this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");

					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				});
			}
		});
	}

	page: Page<any> = new Page();

	getPersonnels() {
		let date1 = this.searchForm.get("dateDebut").value;
		let date2 = this.searchForm.get("dateFin").value;
		if (this.searchForm.value.typeOrigine == "Entrant") {
			let resultPCT = [];
			let resultPCNT = [];
			this.bureauOrdreService.getAllObject3("/personnels/index", this.page.pageable).then((data: any) => {
				this.page = data;
				this.dataSource2.data = this.page.content;
				this.sizeData = data.content.length;
				this.isLoading2 = false;
				//  this.dataSource2.data = data;
				for (let i = 0; i < this.page.content.length; i++) {
					const courriersTNTParPersonne = forkJoin([this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates("/countCourriersEntrantsTraitesParPersonneBetweenTwoDates/", this.page.content[i].id, date1, date2), this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates("/countCourriersEntrantsNonTraitesParPersonneBetweenTwoDates/", this.page.content[i].id, date1, date2)]);

					courriersTNTParPersonne.subscribe(([resPCT1, resPCNT1]) => {
						resultPCT.push(resPCT1);
						resultPCNT.push(resPCNT1);
						data.content.forEach((item, index) => {
							item.paramPCT = resultPCT[index];
							item.paramPCNT = resultPCNT[index];
							if (resultPCNT[index] != 0 && resultPCT[index] != 0) {
								item.performanceP = parseFloat(((resultPCT[index] / (resultPCT[index] + resultPCNT[index])) * 100).toFixed(2));
							}
						});
						this.dataSource2.data = this.page.content;

						// this.dataSource2 = new MatTableDataSource(data);

						// this.paginator2._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

						// this.dataSource2.paginator = this.paginator2;
						// this.dataSource2.sort = this.sort2;
					});
				}
			});
		} else if (this.searchForm.value.typeOrigine == "Convocation") {
			let resultPCT = [];
			let resultPCNT = [];
			this.bureauOrdreService.getAllObject3("/personnels/index", this.page.pageable).then((data: any) => {
				this.page = data;
				this.dataSource2.data = this.page.content;
				this.sizeData = data.content.length;
				this.isLoading2 = false;
				for (let i = 0; i < this.page.content.length; i++) {
					const courriersTNTParPersonne = forkJoin([this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates("/countCourriersConvocationTraitesParPersonneBetweenTwoDates/", this.page.content[i].id, date1, date2), this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates("/countCourriersConvocationNonTraitesParPersonneBetweenTwoDates/", this.page.content[i].id, date1, date2)]);

					courriersTNTParPersonne.subscribe(([resPCT2, resPCNT2]) => {
						resultPCT.push(resPCT2);
						resultPCNT.push(resPCNT2);
						data.content.forEach((item, index) => {
							item.paramPCT = resultPCT[index];
							item.paramPCNT = resultPCNT[index];
							if (resultPCNT[index] != 0 && resultPCT[index] != 0) {
								item.performanceP = parseFloat(((resultPCT[index] / (resultPCT[index] + resultPCNT[index])) * 100).toFixed(2));
							}
						});
						this.dataSource2.data = this.page.content;

						// this.dataSource2 = new MatTableDataSource(data);

						// this.paginator2._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

						// this.dataSource2.paginator = this.paginator2;
						// this.dataSource2.sort = this.sort2;
					});
				}
			});
		} else {
			this.isLoading2 = true;
			let resultPCT = [];
			let resultPCNT = [];
			this.bureauOrdreService.getAllObject3("/personnels/index", this.page.pageable).then((data: any) => {
				this.page = data;
				this.dataSource2.data = this.page.content;
				this.sizeData = data.content.length;
				this.isLoading2 = false;
				for (let i = 0; i < this.dataSource2.data.length; i++) {
					const courriersTNTParPersonne = forkJoin([this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonne("/countCourriersEntrantsTraitesParPersonne/", this.dataSource2.data[i].id), this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonne("/countCourriersEntrantsNonTraitesParPersonne/", this.dataSource2.data[i].id), this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonne("/countCourriersConvocationTraitesParPersonne/", this.dataSource2.data[i].id), this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonne("/countCourriersConvocationNonTraitesParPersonne/", this.dataSource2.data[i].id)]);

					courriersTNTParPersonne.subscribe(([resPCT1, resPCNT1, resPCT2, resPCNT2]) => {
						resultPCT.push(resPCT1 + resPCT2);
						resultPCNT.push(resPCNT1 + resPCNT2);

						data.content.forEach((item, index) => {
							item.paramPCT = resultPCT[index];
							item.paramPCNT = resultPCNT[index];
							if (resultPCNT[index] != 0 && resultPCT[index] != 0) {
								item.performanceP = parseFloat(((resultPCT[index] / (resultPCT[index] + resultPCNT[index])) * 100).toFixed(2));
							}
						});

						// this.dataSource2 = new MatTableDataSource(data);

						// this.paginator2._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

						// this.dataSource2.paginator = this.paginator2;
						// this.dataSource2.sort = this.sort2;
					});
				}
			});
		}
	}
	public getNextPage(): void {
		//console.log("Filter : " + this.dataSource.filter)
		this.page.pageable = this.paginationService.getNextPage(this.page);
		this.isLoading2 = true;
		this.getPersonnels();
	}

	public getPreviousPage(): void {
		this.page.pageable = this.paginationService.getPreviousPage(this.page);
		this.isLoading2 = true;
		this.getPersonnels();
	}

	public getPageInNewSize(pageSize: number): void {
		this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
		this.isLoading2 = true;
		this.getPersonnels();
	}
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource2.paginator = this.paginator2;
	}

	fillChartByParam(chartType, type1, type2, type3) {
		type1 = parseFloat(type1.toFixed(2));
		type2 = parseFloat(type2.toFixed(2));
		type3 = parseFloat(type3.toFixed(2));
		let total = parseFloat((type1 + type2 + type3).toFixed(2));
		this.dynamicWidth1 = "" + parseFloat((((this.totalCourrierEntrantTraited + this.totalCourrierConvocationTraited) / (this.totalCourrierEntrant + this.totalCourrierConvocation)) * 100).toFixed(2)).toLocaleString("fr", { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + "%";

    
		type1 = parseFloat(((type1 / total) * 100).toFixed(2)).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		type2 = parseFloat(((type2 / total) * 100).toFixed(2)).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		type3 = parseFloat(((type3 / total) * 100).toFixed(2)).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		let libelle = ["courrier entrant: " + type1 + "%", "courrier convocation: " + type2 + "%", "courrier sortant: " + type3 + "%"];
		let id = [type1, type2, type3];
    
		this.chartOptionPie(libelle, id, chartType);
	}

	chartOptionPie(libelle, id, type) {
		var ctx = document.getElementById("canvas");
		this.dash = new Chart(ctx, {
			type: type,
			data: {
				labels: libelle,
				datasets: [
					{
						label: "",
						data: id,
						backgroundColor: libelle.map((label) => {
							if (label.startsWith("courrier entrant")) {
								return "#ffd15c";
							}
							if (label.startsWith("courrier convocation")) {
								return "#ff7058";
							}
							if (label.startsWith("courrier")) {
								return "#40596b";
							}
						}),
						borderWidth: 0,
						fill: true,
					},
				],
			},
			options: {
				legend: {
					display: true,
					position: "left",
					labels: {
						align: "start",
					},
				},
			},
		});
	}

	getCountAllTypeCourriers() {
		this.totalCourrier = 0;

		const firstThreeObservables = forkJoin([this.bureauOrdreService.countNumberTotalCourriers("/countCourrierEntrants"), this.bureauOrdreService.countNumberTotalCourriers("/countCourrierConvocations"), this.bureauOrdreService.countNumberTotalCourriers("/countCourrierSortants")]);

		firstThreeObservables.subscribe(([resEntrant, resConvocation, resSortant]) => {
			this.totalCourrierEntrant = resEntrant;
			this.totalCourrierConvocation = resConvocation;
			this.totalCourrierSortant = resSortant;

			this.totalCourrier = this.totalCourrierEntrant + this.totalCourrierConvocation + this.totalCourrierSortant;
			this.searchForm.get("volumeTotalCourrier").setValue(this.totalCourrier);

			const secondTwoObservables = forkJoin([this.bureauOrdreService.countNumberTotalCourriers("/countCourrierEntrantsTraited"),
       this.bureauOrdreService.countNumberTotalCourriers("/countCourrierConvocationsTraited"), 
       this.bureauOrdreService.countNumberTotalCourriers("/countCourrierSortants"),
        this.bureauOrdreService.countNumberTotalCourriers("/countCourrierEntrantsClotured")]);

			secondTwoObservables.subscribe(([resEntrantTraited, resConvocationTraited, resSortantTraited, resEntrantClotured]) => {
				this.totalCourrierEntrantTraited = resEntrantTraited;
				this.totalCourrierConvocationTraited = resConvocationTraited;
				this.totalCourrierSortantTraited = resSortantTraited;
				this.totalCourrierEntrantClotured = resEntrantClotured;

				this.dynamicWidth3 = "" + parseFloat(((this.totalCourrierEntrantClotured / this.totalCourrierEntrant) * 100).toFixed(2)).toLocaleString("fr", { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + "%";

				if (this.totalCourrierEntrantTraited != 0 && this.totalCourrierEntrant != 0) {
					this.type1 = (this.totalCourrierEntrantTraited / this.totalCourrierEntrant) * 100;
				}
				if (this.totalCourrierConvocationTraited != 0 && this.totalCourrierConvocation != 0) {
					this.type2 = (this.totalCourrierConvocationTraited / this.totalCourrierConvocation) * 100;
				}
				if (this.totalCourrierSortantTraited != 0 && this.totalCourrierSortant != 0) {
					this.type3 = (this.totalCourrierSortantTraited / this.totalCourrierSortant) * 100;
				}
				if (this.type1 > this.type2) {
					this.typeCourrierPlusTraite = "Courrier entrant";
					this.pourcentageCourrierPlusTraite = this.type1.toLocaleString("fr", { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
				}
				if (this.type2 > this.type1) {
					this.typeCourrierPlusTraite = "Courrier convocation";
					this.pourcentageCourrierPlusTraite = this.type2.toLocaleString("fr", { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
				}
				/* if (this.type3 > this.type1 && this.type3 > this.type2) {
          this.typeCourrierPlusTraite = 'Courrier sortant';
          this.pourcentageCourrierPlusTraite = this.type3.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
        } */
				this.fillChartByParam(this.chartType, this.type1, this.type2, this.type3);
			});

			const thirdTwoObservables = forkJoin([this.bureauOrdreService.countNumberTotalCourriers("/countCourrierEntrantsNotTraited"), this.bureauOrdreService.countNumberTotalCourriers("/countCourrierConvocationsNotTraited")]);
			thirdTwoObservables.subscribe(([resEntrantNotTraited, resConvocationNotTraited]) => {
				this.totalCourrierEntrantNotTraited = resEntrantNotTraited;
				this.totalCourrierConvocationNotTraited = resConvocationNotTraited;
				this.totalCourrierSortantNotTraited = 0;
				if ((this.totalCourrierConvocationNotTraited != 0 || this.totalCourrierEntrantNotTraited != 0) && this.totalCourrier != 0) {
					// this.dynamicWidth2 = '' + parseFloat((((this.totalCourrierEntrantNotTraited + this.totalCourrierConvocationNotTraited) / this.totalCourrier) * 100).toFixed(2)).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';
					this.dynamicWidth2 = "" + (((this.totalCourrierEntrantNotTraited + this.totalCourrierConvocationNotTraited) / (this.totalCourrierEntrant + this.totalCourrierConvocation)) * 100).toLocaleString("fr", { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + "%";
				}
			});
			const fourthTwoObservables = forkJoin([this.bureauOrdreService.tempsMoyenTraitementCourrier("/tempsMoyenTraitementCourrierEntrant"), this.bureauOrdreService.tempsMoyenTraitementCourrier("/tempsMoyenTraitementCourrierConvocation")]);
			fourthTwoObservables.subscribe(([resTempsMoyEntrant, resTempsMoyConvocation]) => {
				this.tempsMoyemParCourrierEntrant = resTempsMoyEntrant;
				this.tempsMoyemParCourrierConvocation = resTempsMoyConvocation;
				if (this.tempsMoyemParCourrierConvocation || this.tempsMoyemParCourrierEntrant != 0) {
					this.tempsMoyemParCourrierH = ((this.tempsMoyemParCourrierEntrant + this.tempsMoyemParCourrierConvocation) / (this.totalCourrierConvocation + this.totalCourrierEntrant)).toFixed(2);
					if (this.tempsMoyemParCourrierH < 1) {
						this.inMinutes = true;
						this.inHour = false;
						this.tempsMoyemParCourrierMin = (this.tempsMoyemParCourrierH * 60).toFixed(2);
					} else {
						this.inHour = true;
						this.inMinutes = false;
					}
				}
			});
			this.getDivisions();
			this.getPersonnels();
		});
	}

	getCurrentDateTime(): string {
		const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
		const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

		const now = new Date();
		const dayOfWeek = daysOfWeek[now.getDay()];
		const day = now.getDate();
		const month = months[now.getMonth()];
		const year = now.getFullYear();
		const hours = this.padZero(now.getHours());
		const minutes = this.padZero(now.getMinutes());

		return `${dayOfWeek} ${day} ${month} ${year} ${hours}:${minutes}`;
	}
	padZero(value: number): string {
		return value.toString().padStart(2, "0");
	}

	calculateDaysBetweenDates(date1, date2) {
		return Math.floor((new Date(date2.split("T")[0]).getTime() - new Date(date1.split("T")[0]).getTime()) / (1000 * 60 * 60 * 24));
	}

	formatDateToISO8601(inputDateStr): any {
		let inputDate = new Date(inputDateStr);
		const year = inputDate.getUTCFullYear();
		const month = this.padZero(inputDate.getUTCMonth() + 1);
		const day = this.padZero(inputDate.getUTCDate());
		const hours = this.padZero(inputDate.getUTCHours());
		const minutes = this.padZero(inputDate.getUTCMinutes());
		const seconds = this.padZero(inputDate.getUTCSeconds());
		const milliseconds = inputDate.getUTCMilliseconds();
		const timezoneOffset = inputDate.getTimezoneOffset();
		const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
		const timezoneOffsetMinutes = Math.abs(timezoneOffset) % 60;
		const timezoneSign = timezoneOffset >= 0 ? "-" : "+";
		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${this.padZero(timezoneOffsetHours)}${this.padZero(timezoneOffsetMinutes)}`;
	}

	appliquer() {
		this.totalCourrier = 0;
		this.tempsMoyemParCourrierH = 0;
		this.totalCourrierConvocation = 0;
		this.totalCourrierConvocationTraited = 0;
		this.totalCourrierEntrant = 0;
		this.totalCourrierSortant = 0;
		this.totalCourrierEntrantTraited = 0;
		this.type1 = 0;
		this.type2 = 0;
		this.dynamicWidth1 = 0;
		this.dynamicWidth2 = 0;
		this.dynamicWidth3 = 0;
		let date1 = this.searchForm.get("dateDebut").value;
		let date2 = this.searchForm.get("dateFin").value;
		this.searchForm.get("periodeDe").setValue(this.calculateDaysBetweenDates(date1, date2));
    	const firstThreeObservables = forkJoin([
			  this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDates', date1, date2),
			  this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierConvocationsBetweenTwoDates', date1, date2),
			  this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierSortantsBetweenTwoDates', date1, date2)
			]);

			

			firstThreeObservables.subscribe(([resEntrant, resConvocation, resSortant]) => {
			  this.totalCourrierEntrant = resEntrant;
			  this.totalCourrierConvocation = resConvocation;
			  this.totalCourrierSortant = resSortant;
			  this.totalCourrier = this.totalCourrierEntrant + this.totalCourrierConvocation+this.totalCourrierSortant;
			  this.searchForm.get('volumeTotalCourrier').setValue(this.totalCourrier);
      })
	  const secondTwoObservables = forkJoin([
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDatesTraited', date1, date2),
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierConvocationsBetweenTwoDatesTraited', date1, date2),
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierSortantsBetweenTwoDates', date1, date2),
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDatesClotured', date1, date2),

			  ]);
      	  secondTwoObservables.subscribe(([resEntrantTraited, resConvocationTraited, resSortantTraited, resEntrantClotured]) => {
			    this.totalCourrierEntrantTraited = resEntrantTraited;
			    this.totalCourrierConvocationTraited = resConvocationTraited;
			    this.totalCourrierSortantTraited = resSortantTraited;
			    this.totalCourrierEntrantClotured = resEntrantClotured;

			    if (this.totalCourrierEntrantTraited != 0 && this.totalCourrierEntrant != 0) {
			      this.type1 = (this.totalCourrierEntrantTraited / this.totalCourrierEntrant) * 100;
			    }
			    if (this.totalCourrierConvocationTraited != 0 && this.totalCourrierConvocation) {
			      this.type2 = (this.totalCourrierConvocationTraited / this.totalCourrierConvocation) * 100;
			    }
			    if (this.totalCourrierSortantTraited != 0 && this.totalCourrierSortant != 0) {
			      this.type3 = (this.totalCourrierSortantTraited / this.totalCourrierSortant) * 100;
			    }
			    this.dynamicWidth3 = '' + parseFloat(((this.totalCourrierEntrantClotured / this.totalCourrierEntrant) * 100).toFixed(2)).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';

			    if (this.type1 > this.type2) {
			      this.typeCourrierPlusTraite = 'Courrier entrant';
			      this.pourcentageCourrierPlusTraite = this.type1.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
			    }
			    if (this.type2 > this.type1) {
			      this.typeCourrierPlusTraite = 'Courrier convocation';
			      this.pourcentageCourrierPlusTraite = this.type2.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
			    }
			    /* if (this.type3 > this.type1 && this.type3 > this.type2) {
			      this.typeCourrierPlusTraite = 'Courrier sortant';
			      this.pourcentageCourrierPlusTraite = this.type3.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
			    } */
			    this.fillChartByParam(this.chartType, this.type1, this.type2, this.type3)
			  });


		if (isNaN(this.calculateDaysBetweenDates(date1, date2))) {
			this.searchForm.get("periodeDe").setValue(0);
		}
		if (date1 != "" && date2 != "") {
			if (this.searchForm.value.typeOrigine == "Entrant") {
        
       
        
				let resultPCT = [];
				let resultPCNT = [];
				this.bureauOrdreService.getAllObject3("/personnels/index", this.page.pageable).then((data: any) => {
					this.page = data;
					this.dataSource2.data = this.page.content;
					this.sizeData = data.content.length;
					this.isLoading2 = false;
					//  this.dataSource2.data = data;
					for (let i = 0; i < this.page.content.length; i++) {
            if(this.searchForm.value.type!=''){
              const courriersTNTParPersonne = forkJoin([
              this.bureauOrdreService.countCourriersParPersonneBetweenTwoDatesParTypeCourrier("/countCourriersTraitesParPersonneBetweenTwoDatesParTypeCourrier/", this.page.content[i].id, date1, date2,this.searchForm.value.type), 
              this.bureauOrdreService.countCourriersParPersonneBetweenTwoDatesParTypeCourrier("/countCourriersEntrantsNonTraitesParPersonneBetweenTwoDatesParTypeCourrier/", this.page.content[i].id, date1, date2,this.searchForm.value.type)]);
              courriersTNTParPersonne.subscribe(([resPCT1, resPCNT1]) => {
                resultPCT.push(resPCT1);
                resultPCNT.push(resPCNT1);
                data.content.forEach((item, index) => {
                  item.paramPCT = resultPCT[index];
                  item.paramPCNT = resultPCNT[index];
                  if (resultPCNT[index] != 0 && resultPCT[index] != 0) {
                    item.performanceP = parseFloat(((resultPCT[index] / (resultPCT[index] + resultPCNT[index])) * 100).toFixed(2));
                  }
                });
                this.dataSource2.data = this.page.content;
  
                // this.dataSource2 = new MatTableDataSource(data);
  
                // this.paginator2._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
  
                // this.dataSource2.paginator = this.paginator2;
                // this.dataSource2.sort = this.sort2;
              });
            }else{
              const courriersTNTParPersonne = forkJoin([
                this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates("/countCourriersEntrantsTraitesParPersonneBetweenTwoDates/", this.page.content[i].id, date1, date2),
               this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates("/countCourriersEntrantsNonTraitesParPersonneBetweenTwoDates/", this.page.content[i].id, date1, date2)]);

              courriersTNTParPersonne.subscribe(([resPCT1, resPCNT1]) => {
                resultPCT.push(resPCT1);
                resultPCNT.push(resPCNT1);
                data.content.forEach((item, index) => {
                  item.paramPCT = resultPCT[index];
                  item.paramPCNT = resultPCNT[index];
                  if (resultPCNT[index] != 0 && resultPCT[index] != 0) {
                    item.performanceP = parseFloat(((resultPCT[index] / (resultPCT[index] + resultPCNT[index])) * 100).toFixed(2));
                  }
                });
                this.dataSource2.data = this.page.content;
  
                // this.dataSource2 = new MatTableDataSource(data);
  
                // this.paginator2._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
  
                // this.dataSource2.paginator = this.paginator2;
                // this.dataSource2.sort = this.sort2;
              });
            }
					
					}
				});

				let resultECT = [];
				let resultECNT = [];
				for (let i = 0; i < this.divisions.length; i++) {
          if(this.searchForm.value.type!=''){
            const courriersTNTParEntite = forkJoin([
              this.bureauOrdreService.countCourriersTraitesParEntiteBetweenTwoDatesParTypeCourrier("/countCourriersTraitesParEntiteBetweenTwoDatesParTypeCourrier/", this.divisions[i].id, date1, date2,this.searchForm.value.type),
               this.bureauOrdreService.countCourriersTraitesParEntiteBetweenTwoDatesParTypeCourrier("/countCourriersEntrantsNonTraitesParEntiteBetweenTwoDatesParTypeCourrier/", this.divisions[i].id, date1, date2,this.searchForm.value.type)]);
               courriersTNTParEntite.subscribe(([resECT1, resECNT1]) => {
                resultECT.push(resECT1);
                resultECNT.push(resECNT1);
                this.divisions.forEach((item, index) => {
                  item.paramECT = resultECT[index];
                  item.paramECNT = resultECNT[index];
                  if (resultECNT[index] != 0 && resultECT[index] != 0) {
                    item.performanceE = parseFloat(((resultECT[index] / (resultECT[index] + resultECNT[index])) * 100).toFixed(2));
                  }
                });
                this.dataSource = new MatTableDataSource(this.divisions);
    
                this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
    
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              });
          }else{
            const courriersTNTParEntite = forkJoin([
              this.bureauOrdreService.countCourriersTraitesNonTraitesParEntiteBetweenTwoDates("/countCourriersEntrantsTraitesParEntiteBetweenTwoDates/", this.divisions[i].id, date1, date2),
               this.bureauOrdreService.countCourriersTraitesNonTraitesParEntiteBetweenTwoDates("/countCourriersEntrantsNonTraitesParEntiteBetweenTwoDates/", this.divisions[i].id, date1, date2)]);

            courriersTNTParEntite.subscribe(([resECT1, resECNT1]) => {
              resultECT.push(resECT1);
              resultECNT.push(resECNT1);
              this.divisions.forEach((item, index) => {
                item.paramECT = resultECT[index];
                item.paramECNT = resultECNT[index];
                if (resultECNT[index] != 0 && resultECT[index] != 0) {
                  item.performanceE = parseFloat(((resultECT[index] / (resultECT[index] + resultECNT[index])) * 100).toFixed(2));
                }
              });
              this.dataSource = new MatTableDataSource(this.divisions);
  
              this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
  
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            });
          }
				
				}
        if(this.searchForm.value.type!=''){
          const thirdTwoObservables = forkJoin([
            this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDatesParTypeCourrier('/countCourrierEntrantsBetweenTwoDatesNotTraitedParTypeCourrier', date1, date2,this.searchForm.value.type),
          ]);
          thirdTwoObservables.subscribe(([resEntrantNotTraited]) => {
            this.totalCourrierEntrantNotTraited = resEntrantNotTraited;
            this.totalCourrierSortantNotTraited = 0;
            
            if (( this.totalCourrierEntrantNotTraited != 0) && this.totalCourrier != 0) {
              // this.dynamicWidth2 = '' + (((this.totalCourrierEntrantNotTraited + this.totalCourrierConvocationNotTraited) / this.totalCourrier) * 100).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';
  
              this.dynamicWidth2 = '' + (((this.totalCourrierEntrantNotTraited ) / this.totalCourrierEntrant) * 100).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';
              
            }
          });





          
          const fourthTwoObservables = forkJoin([
            this.bureauOrdreService.tempsMoyenTraitementCourrierBetweenTwoDatesParTypeCourrier('/tempsMoyenTraitementCourrierEntrantBetweenTwoDatesParTypeCourrier', date1, date2,this.searchForm.value.type),
          ]);
          fourthTwoObservables.subscribe(([resTempsMoyEntrant]) => {
            this.tempsMoyemParCourrierEntrant = resTempsMoyEntrant;
            if ( this.tempsMoyemParCourrierEntrant != 0) {
              this.tempsMoyemParCourrierH = ((this.tempsMoyemParCourrierEntrant ) / (this.totalCourrierEntrant)).toFixed(2);
              if (this.tempsMoyemParCourrierH < 1) {
                this.inMinutes = true;
                this.inHour = false;
                this.tempsMoyemParCourrierMin = (this.tempsMoyemParCourrierH * 60).toFixed(2);
              }
              else{
                this.inHour=true;
                this.inMinutes=false;
              }
            }
          });
  
  
          const secondTwoObservables = forkJoin([
            this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDatesParTypeCourrier('/countCourrierEntrantsBetweenTwoDatesTraitedParTypeCourrier', date1, date2,this.searchForm.value.type),
            this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDatesParTypeCourrier('/countNumberTotalCourriersEntrantsBetweenTwoDatesCloturedParTypeCourrier', date1, date2,this.searchForm.value.type),
  
          ]);
            secondTwoObservables.subscribe(([resEntrantTraited,  resEntrantClotured]) => {
            this.totalCourrierEntrantTraited = resEntrantTraited;
            // this.totalCourrierSortantTraited = resSortantTraited;
            this.totalCourrierEntrantClotured = resEntrantClotured;
            
            if (this.totalCourrierEntrantTraited != 0 && this.totalCourrierEntrant != 0) {
              this.type1 = (this.totalCourrierEntrantTraited / this.totalCourrierEntrant) * 100;
            }
            // if (this.totalCourrierConvocationTraited != 0 && this.totalCourrierConvocation) {
            //   this.type2 = (this.totalCourrierConvocationTraited / this.totalCourrierConvocation) * 100;
            // }
            // if (this.totalCourrierSortantTraited != 0 && this.totalCourrierSortant != 0) {
            //   this.type3 = (this.totalCourrierSortantTraited / this.totalCourrierSortant) * 100;
            // }
            this.dynamicWidth3 = '' + parseFloat(((this.totalCourrierEntrantClotured / this.totalCourrierEntrant) * 100).toFixed(2)).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';
            
            if (this.type1 > this.type2) {
              this.typeCourrierPlusTraite = 'Courrier entrant';
              this.pourcentageCourrierPlusTraite = this.type1.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
            }
            if (this.type2 > this.type1) {
              this.typeCourrierPlusTraite = 'Courrier convocation';
              this.pourcentageCourrierPlusTraite = this.type2.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
            }
            /* if (this.type3 > this.type1 && this.type3 > this.type2) {
              this.typeCourrierPlusTraite = 'Courrier sortant';
              this.pourcentageCourrierPlusTraite = this.type3.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
            } */
            this.fillChartByParam(this.chartType, this.type1, this.type2, this.type3)
          });
          
        }else{
          const thirdTwoObservables = forkJoin([
            this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDatesNotTraited', date1, date2),
          ]);
          thirdTwoObservables.subscribe(([resEntrantNotTraited]) => {
            this.totalCourrierEntrantNotTraited = resEntrantNotTraited;
            this.totalCourrierSortantNotTraited = 0;
            
            if (( this.totalCourrierEntrantNotTraited != 0) && this.totalCourrier != 0) {
              // this.dynamicWidth2 = '' + (((this.totalCourrierEntrantNotTraited + this.totalCourrierConvocationNotTraited) / this.totalCourrier) * 100).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';
  
              this.dynamicWidth2 = '' + (((this.totalCourrierEntrantNotTraited ) / this.totalCourrierEntrant) * 100).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';
              
            }
          });
          const fourthTwoObservables = forkJoin([
            this.bureauOrdreService.tempsMoyenTraitementCourrierBetweenTwoDates('/tempsMoyenTraitementCourrierEntrantBetweenTwoDates', date1, date2),
          ]);
          fourthTwoObservables.subscribe(([resTempsMoyEntrant]) => {
            this.tempsMoyemParCourrierEntrant = resTempsMoyEntrant;
            if ( this.tempsMoyemParCourrierEntrant != 0) {
              this.tempsMoyemParCourrierH = ((this.tempsMoyemParCourrierEntrant ) / (this.totalCourrierEntrant)).toFixed(2);
              if (this.tempsMoyemParCourrierH < 1) {
                this.inMinutes = true;
                this.inHour = false;
                this.tempsMoyemParCourrierMin = (this.tempsMoyemParCourrierH * 60).toFixed(2);
              }
              else{
                this.inHour=true;
                this.inMinutes=false;
              }
            }
          });
  
  
          const secondTwoObservables = forkJoin([
            this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDatesTraited', date1, date2),
            this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDatesClotured', date1, date2),
  
          ]);
            secondTwoObservables.subscribe(([resEntrantTraited,  resEntrantClotured]) => {
            this.totalCourrierEntrantTraited = resEntrantTraited;
            // this.totalCourrierSortantTraited = resSortantTraited;
            this.totalCourrierEntrantClotured = resEntrantClotured;
            
            if (this.totalCourrierEntrantTraited != 0 && this.totalCourrierEntrant != 0) {
              this.type1 = (this.totalCourrierEntrantTraited / this.totalCourrierEntrant) * 100;
            }
            // if (this.totalCourrierConvocationTraited != 0 && this.totalCourrierConvocation) {
            //   this.type2 = (this.totalCourrierConvocationTraited / this.totalCourrierConvocation) * 100;
            // }
            // if (this.totalCourrierSortantTraited != 0 && this.totalCourrierSortant != 0) {
            //   this.type3 = (this.totalCourrierSortantTraited / this.totalCourrierSortant) * 100;
            // }
            this.dynamicWidth3 = '' + parseFloat(((this.totalCourrierEntrantClotured / this.totalCourrierEntrant) * 100).toFixed(2)).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';
            
            if (this.type1 > this.type2) {
              this.typeCourrierPlusTraite = 'Courrier entrant';
              this.pourcentageCourrierPlusTraite = this.type1.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
            }
            if (this.type2 > this.type1) {
              this.typeCourrierPlusTraite = 'Courrier convocation';
              this.pourcentageCourrierPlusTraite = this.type2.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
            }
            /* if (this.type3 > this.type1 && this.type3 > this.type2) {
              this.typeCourrierPlusTraite = 'Courrier sortant';
              this.pourcentageCourrierPlusTraite = this.type3.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
            } */
            this.fillChartByParam(this.chartType, this.type1, this.type2, this.type3)
          });
        }
		

        
        
			
        
      }else if (this.searchForm.value.typeOrigine == "Convocation") {
        this.totalCourrier=this.totalCourrierConvocation
				let resultPCT = [];
				let resultPCNT = [];
				this.bureauOrdreService.getAllObject3("/personnels/index", this.page.pageable).then((data: any) => {
					this.page = data;
					this.dataSource2.data = this.page.content;
					this.sizeData = data.content.length;
					this.isLoading2 = false;
					for (let i = 0; i < this.page.content.length; i++) {
						const courriersTNTParPersonne = forkJoin([this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates("/countCourriersConvocationTraitesParPersonneBetweenTwoDates/", this.page.content[i].id, date1, date2), this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates("/countCourriersConvocationNonTraitesParPersonneBetweenTwoDates/", this.page.content[i].id, date1, date2)]);

						courriersTNTParPersonne.subscribe(([resPCT2, resPCNT2]) => {
							resultPCT.push(resPCT2);
							resultPCNT.push(resPCNT2);
							data.content.forEach((item, index) => {
								item.paramPCT = resultPCT[index];
								item.paramPCNT = resultPCNT[index];
								if (resultPCNT[index] != 0 && resultPCT[index] != 0) {
									item.performanceP = parseFloat(((resultPCT[index] / (resultPCT[index] + resultPCNT[index])) * 100).toFixed(2));
								}
							});
							this.dataSource2.data = this.page.content;

							// this.dataSource2 = new MatTableDataSource(data);

							// this.paginator2._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

							// this.dataSource2.paginator = this.paginator2;
							// this.dataSource2.sort = this.sort2;
						});
					}
				});



        let resultECT = [];
			let resultECNT = [];
			for (let i = 0; i < this.divisions.length; i++) {
			  const courriersTNTParEntite = forkJoin([
			    this.bureauOrdreService.countCourriersTraitesNonTraitesParEntiteBetweenTwoDates('/countCourriersConvocationTraitesParEntiteBetweenTwoDates/', this.divisions[i].id, date1, date2),
			    this.bureauOrdreService.countCourriersTraitesNonTraitesParEntiteBetweenTwoDates('/countCourriersConvocationNonTraitesParEntiteBetweenTwoDates/', this.divisions[i].id, date1, date2),
			  ]);

			  courriersTNTParEntite.subscribe(([ resECT2, resECNT2]) => {
			    resultECT.push(resECT2);
			    resultECNT.push(resECNT2);
			    this.divisions.forEach((item, index) => {
			      item.paramECT = resultECT[index];
			      item.paramECNT = resultECNT[index];
			      if (resultECNT[index] != 0 && resultECT[index] != 0) {
			        item.performanceE = parseFloat(((resultECT[index] / (resultECT[index] + resultECNT[index])) * 100).toFixed(2));
			      }
			    });
			    this.dataSource = new MatTableDataSource(this.divisions);

			    this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

			    this.dataSource.paginator = this.paginator;
			    this.dataSource.sort = this.sort;
			  })
			}

		  const thirdTwoObservables = forkJoin([
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierConvocationsBetweenTwoDatesNotTraited', date1, date2),
			  ]);
			  thirdTwoObservables.subscribe(([ resConvocationNotTraited]) => {
			    this.totalCourrierConvocationNotTraited = resConvocationNotTraited;
			    this.totalCourrierSortantNotTraited = 0;
			    if ((this.totalCourrierConvocationNotTraited != 0 ) && this.totalCourrier != 0) {
			      // this.dynamicWidth2 = '' + (((this.totalCourrierEntrantNotTraited + this.totalCourrierConvocationNotTraited) / this.totalCourrier) * 100).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';

			      this.dynamicWidth2 = '' + (((this.totalCourrierEntrantNotTraited ) / this.totalCourrierEntrant) * 100).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';

			    }
			  });
      const fourthTwoObservables = forkJoin([
        this.bureauOrdreService.tempsMoyenTraitementCourrierBetweenTwoDates('/tempsMoyenTraitementCourrierConvocationBetweenTwoDates', date1, date2),
      ]);
      fourthTwoObservables.subscribe(([ resTempsMoyConvocation]) => {
        this.tempsMoyemParCourrierConvocation = resTempsMoyConvocation;
        if (this.tempsMoyemParCourrierConvocation != 0 ) {
          this.tempsMoyemParCourrierH = (( this.tempsMoyemParCourrierConvocation) / (this.totalCourrierConvocation)).toFixed(2);
          if (this.tempsMoyemParCourrierH < 1) {
            this.inMinutes = true;
            this.inHour = false;
            this.tempsMoyemParCourrierMin = (this.tempsMoyemParCourrierH * 60).toFixed(2);
          }
          else{
            this.inHour=true;
            this.inMinutes=false;
          }
        }
      });


      const secondTwoObservables = forkJoin([
        this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierConvocationsBetweenTwoDatesTraited', date1, date2),

      ]);
        secondTwoObservables.subscribe(([ resConvocationTraited]) => {
        this.totalCourrierConvocationTraited = resConvocationTraited;

        // if (this.totalCourrierEntrantTraited != 0 && this.totalCourrierEntrant != 0) {
        //   this.type1 = (this.totalCourrierEntrantTraited / this.totalCourrierEntrant) * 100;
        // }
        if (this.totalCourrierConvocationTraited != 0 && this.totalCourrierConvocation) {
          this.type2 = (this.totalCourrierConvocationTraited / this.totalCourrierConvocation) * 100;
        }
        // if (this.totalCourrierSortantTraited != 0 && this.totalCourrierSortant != 0) {
        //   this.type3 = (this.totalCourrierSortantTraited / this.totalCourrierSortant) * 100;
        // }
        // this.dynamicWidth3 = '' + parseFloat(((this.totalCourrierEntrantClotured / this.totalCourrierEntrant) * 100).toFixed(2)).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';

        if (this.type1 > this.type2) {
          this.typeCourrierPlusTraite = 'Courrier entrant';
          this.pourcentageCourrierPlusTraite = this.type1.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
        }
        if (this.type2 > this.type1) {
          this.typeCourrierPlusTraite = 'Courrier convocation';
          this.pourcentageCourrierPlusTraite = this.type2.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
        }
        /* if (this.type3 > this.type1 && this.type3 > this.type2) {
          this.typeCourrierPlusTraite = 'Courrier sortant';
          this.pourcentageCourrierPlusTraite = this.type3.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
        } */
        this.fillChartByParam(this.chartType, this.type1, this.type2, this.type3)
      });
			}else if(this.searchForm.value.typeOrigine == "Sortant"){
  this.totalCourrier=this.totalCourrierSortant
  const secondTwoObservables = forkJoin([

    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierSortantsBetweenTwoDates', date1, date2),

  ]);
    secondTwoObservables.subscribe(([ resSortantTraited]) => {
    this.totalCourrierSortantTraited = resSortantTraited;

    // if (this.totalCourrierEntrantTraited != 0 && this.totalCourrierEntrant != 0) {
    //   this.type1 = (this.totalCourrierEntrantTraited / this.totalCourrierEntrant) * 100;
    // }
    // if (this.totalCourrierConvocationTraited != 0 && this.totalCourrierConvocation) {
    //   this.type2 = (this.totalCourrierConvocationTraited / this.totalCourrierConvocation) * 100;
    // }
    if (this.totalCourrierSortantTraited != 0 && this.totalCourrierSortant != 0) {
      this.type3 = (this.totalCourrierSortantTraited / this.totalCourrierSortant) * 100;
    }
    // this.dynamicWidth3 = '' + parseFloat(((this.totalCourrierEntrantClotured / this.totalCourrierEntrant) * 100).toFixed(2)).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';

    if (this.type1 > this.type2) {
      this.typeCourrierPlusTraite = 'Courrier entrant';
      this.pourcentageCourrierPlusTraite = this.type1.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
    }
    if (this.type2 > this.type1) {
      this.typeCourrierPlusTraite = 'Courrier convocation';
      this.pourcentageCourrierPlusTraite = this.type2.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
    }
    /* if (this.type3 > this.type1 && this.type3 > this.type2) {
      this.typeCourrierPlusTraite = 'Courrier sortant';
      this.pourcentageCourrierPlusTraite = this.type3.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
    } */
    this.fillChartByParam(this.chartType, this.type1, this.type2, this.type3)
  });
}else{
		const firstThreeObservables = forkJoin([
			  this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDates', date1, date2),
			  this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierConvocationsBetweenTwoDates', date1, date2),
			  this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierSortantsBetweenTwoDates', date1, date2)
			]);

			

			firstThreeObservables.subscribe(([resEntrant, resConvocation, resSortant]) => {
			  this.totalCourrierEntrant = resEntrant;
			  this.totalCourrierConvocation = resConvocation;
			  this.totalCourrierSortant = resSortant;
			  this.totalCourrier = this.totalCourrierEntrant + this.totalCourrierConvocation+this.totalCourrierSortant;
			  this.searchForm.get('volumeTotalCourrier').setValue(this.totalCourrier);

			  const secondTwoObservables = forkJoin([
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDatesTraited', date1, date2),
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierConvocationsBetweenTwoDatesTraited', date1, date2),
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierSortantsBetweenTwoDates', date1, date2),
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDatesClotured', date1, date2),

			  ]);
			  secondTwoObservables.subscribe(([resEntrantTraited, resConvocationTraited, resSortantTraited, resEntrantClotured]) => {
			    this.totalCourrierEntrantTraited = resEntrantTraited;
			    this.totalCourrierConvocationTraited = resConvocationTraited;
			    this.totalCourrierSortantTraited = resSortantTraited;
			    this.totalCourrierEntrantClotured = resEntrantClotured;

			    if (this.totalCourrierEntrantTraited != 0 && this.totalCourrierEntrant != 0) {
			      this.type1 = (this.totalCourrierEntrantTraited / this.totalCourrierEntrant) * 100;
			    }
			    if (this.totalCourrierConvocationTraited != 0 && this.totalCourrierConvocation) {
			      this.type2 = (this.totalCourrierConvocationTraited / this.totalCourrierConvocation) * 100;
			    }
			    if (this.totalCourrierSortantTraited != 0 && this.totalCourrierSortant != 0) {
			      this.type3 = (this.totalCourrierSortantTraited / this.totalCourrierSortant) * 100;
			    }
			    this.dynamicWidth3 = '' + parseFloat(((this.totalCourrierEntrantClotured / this.totalCourrierEntrant) * 100).toFixed(2)).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';

			    if (this.type1 > this.type2) {
			      this.typeCourrierPlusTraite = 'Courrier entrant';
			      this.pourcentageCourrierPlusTraite = this.type1.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
			    }
			    if (this.type2 > this.type1) {
			      this.typeCourrierPlusTraite = 'Courrier convocation';
			      this.pourcentageCourrierPlusTraite = this.type2.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
			    }
			    /* if (this.type3 > this.type1 && this.type3 > this.type2) {
			      this.typeCourrierPlusTraite = 'Courrier sortant';
			      this.pourcentageCourrierPlusTraite = this.type3.toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true });
			    } */
			    this.fillChartByParam(this.chartType, this.type1, this.type2, this.type3)
			  });

			  const thirdTwoObservables = forkJoin([
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierEntrantsBetweenTwoDatesNotTraited', date1, date2),
			    this.bureauOrdreService.countNumberTotalCourriersBetweenTwoDates('/countCourrierConvocationsBetweenTwoDatesNotTraited', date1, date2),
			  ]);
			  thirdTwoObservables.subscribe(([resEntrantNotTraited, resConvocationNotTraited]) => {
			    this.totalCourrierEntrantNotTraited = resEntrantNotTraited;
			    this.totalCourrierConvocationNotTraited = resConvocationNotTraited;
			    this.totalCourrierSortantNotTraited = 0;
			    if ((this.totalCourrierConvocationNotTraited != 0 || this.totalCourrierEntrantNotTraited != 0) && this.totalCourrier != 0) {
			      // this.dynamicWidth2 = '' + (((this.totalCourrierEntrantNotTraited + this.totalCourrierConvocationNotTraited) / this.totalCourrier) * 100).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';

			      this.dynamicWidth2 = '' + (((this.totalCourrierEntrantNotTraited ) / this.totalCourrierEntrant) * 100).toLocaleString('fr', { minimumFractionDigits: 0, maximumFractionDigits: 0, useGrouping: true }) + '%';

			    }
			  });
			  const fourthTwoObservables = forkJoin([
			    this.bureauOrdreService.tempsMoyenTraitementCourrierBetweenTwoDates('/tempsMoyenTraitementCourrierEntrantBetweenTwoDates', date1, date2),
			    this.bureauOrdreService.tempsMoyenTraitementCourrierBetweenTwoDates('/tempsMoyenTraitementCourrierConvocationBetweenTwoDates', date1, date2),
			  ]);
			  fourthTwoObservables.subscribe(([resTempsMoyEntrant, resTempsMoyConvocation]) => {
			    this.tempsMoyemParCourrierEntrant = resTempsMoyEntrant;
			    this.tempsMoyemParCourrierConvocation = resTempsMoyConvocation;
			    if (this.tempsMoyemParCourrierConvocation != 0 || this.tempsMoyemParCourrierEntrant != 0) {
			      this.tempsMoyemParCourrierH = ((this.tempsMoyemParCourrierEntrant + this.tempsMoyemParCourrierConvocation) / (this.totalCourrierConvocation+this.totalCourrierEntrant)).toFixed(2);
			      if (this.tempsMoyemParCourrierH < 1) {
			        this.inMinutes = true;
			        this.inHour = false;
			        this.tempsMoyemParCourrierMin = (this.tempsMoyemParCourrierH * 60).toFixed(2);
			      }
			      else{
			        this.inHour=true;
			        this.inMinutes=false;
			      }
			    }
			  });
			});
			let resultECT = [];
			let resultECNT = [];
			for (let i = 0; i < this.divisions.length; i++) {
			  const courriersTNTParEntite = forkJoin([
			    this.bureauOrdreService.countCourriersTraitesNonTraitesParEntiteBetweenTwoDates('/countCourriersEntrantsTraitesParEntiteBetweenTwoDates/', this.divisions[i].id, date1, date2),
			    this.bureauOrdreService.countCourriersTraitesNonTraitesParEntiteBetweenTwoDates('/countCourriersEntrantsNonTraitesParEntiteBetweenTwoDates/', this.divisions[i].id, date1, date2),
			    this.bureauOrdreService.countCourriersTraitesNonTraitesParEntiteBetweenTwoDates('/countCourriersConvocationTraitesParEntiteBetweenTwoDates/', this.divisions[i].id, date1, date2),
			    this.bureauOrdreService.countCourriersTraitesNonTraitesParEntiteBetweenTwoDates('/countCourriersConvocationNonTraitesParEntiteBetweenTwoDates/', this.divisions[i].id, date1, date2),
			  ]);

			  courriersTNTParEntite.subscribe(([resECT1, resECNT1, resECT2, resECNT2]) => {
			    resultECT.push(resECT1 + resECT2);
			    resultECNT.push(resECNT1 + resECNT2);
			    this.divisions.forEach((item, index) => {
			      item.paramECT = resultECT[index];
			      item.paramECNT = resultECNT[index];
			      if (resultECNT[index] != 0 && resultECT[index] != 0) {
			        item.performanceE = parseFloat(((resultECT[index] / (resultECT[index] + resultECNT[index])) * 100).toFixed(2));
			      }
			    });
			    this.dataSource = new MatTableDataSource(this.divisions);

			    this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

			    this.dataSource.paginator = this.paginator;
			    this.dataSource.sort = this.sort;
			  })
			}

			let resultPCT = [];
			let resultPCNT = [];
			this.bureauOrdreService.getAllObject3("/personnels/index",this.page.pageable)
			  .then((data:any) => {
          this.page = data;
					this.dataSource2.data = this.page.content;
					this.sizeData = data.content.length;
			    for (let i = 0; i < this.page.content.length; i++) {
			      const courriersTNTParPersonne = forkJoin([
			        this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates('/countCourriersEntrantsTraitesParPersonne/', this.page.content[i].id, date1, date2),
			        this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates('/countCourriersEntrantsNonTraitesParPersonne/', this.page.content[i].id, date1, date2),
			        this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates('/countCourriersConvocationTraitesParPersonne/', this.page.content[i].id, date1, date2),
			        this.bureauOrdreService.countCourriersTraitesNonTraitesParPersonneBetweenTwoDates('/countCourriersConvocationNonTraitesParPersonne/', this.page.content[i].id, date1, date2),
			      ]);

			      courriersTNTParPersonne.subscribe(([resPCT1, resPCNT1, resPCT2, resPCNT2]) => {
			        resultPCT.push(resPCT1 + resPCT2);
			        resultPCNT.push(resPCNT1 + resPCNT2);
			        data.forEach((item, index) => {
			          item.paramPCT = resultPCT[index];
			          item.paramPCNT = resultPCNT[index];
			          if (resultPCNT[index] != 0 && resultPCT[index] != 0) {
			            item.performanceP = parseFloat(((resultPCT[index] / (resultPCT[index] + resultPCNT[index])) * 100).toFixed(2));
			          }
			        });
			        this.dataSource2 = new MatTableDataSource(data);

			        this.paginator2._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

			        this.dataSource2.paginator = this.paginator2;
			        this.dataSource2.sort = this.sort2;
			      })
			    }
			  });
	
}
 





		}
	}

	reset() {
		this.searchForm.get("dateDebut").setValue("");
		this.searchForm.get("dateFin").setValue("");
		this.searchForm.get("periodeDe").setValue(0);
		this.getCountAllTypeCourriers();
		this.getDivisions();
		this.getPersonnels();
	}
}
