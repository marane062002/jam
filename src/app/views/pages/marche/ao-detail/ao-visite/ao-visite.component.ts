import { EditVisiteAoComponent } from "./../../dialog-forms/edit-visite-ao/edit-visite-ao.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { BiensReservationService } from "../../../shared/biens-reservation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AoService } from "../../../shared/ao.service";
import {
	MatSort,
	MatPaginator,
	MatTableDataSource,
	MatDialog,
} from "@angular/material";
import { OrganisationService } from "../../../organisation/organisation.service";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

@Component({
	selector: "kt-ao-visite",
	templateUrl: "./ao-visite.component.html",
	styleUrls: ["./ao-visite.component.scss"],
})
export class AoVisiteComponent implements OnInit {
	// ================================================================
	//
	// ================================================================
	myForm: FormGroup;
	arr: FormArray;
	myForm1: FormGroup;
	arr1: FormArray;
	idao;
	divisions;
	services;
	personnels;
	showForm = false;
	showBtnAddVisite = false;
	divisionName;
	serviceName;
	checkLang: string;
	// ================================================================
	//
	// ================================================================
	formData = {
		id: 0,
		ao: { id: 0 },
		division: 0,
		service: 0,
		dateVisite: null,
		lieuVisite: null,
		responsable: null,
		heureVisite: null,
		datePublication: null,
		note: null,
	};
	// ================================================================
	//
	// ================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ================================================================
	//
	// ================================================================
	dataSource: MatTableDataSource<any>;
	displayedColumns = [
		"dateVisite",
		"heureVisite",
		"lieuVisite",
		"division",
		"service",
		"personnel",
		"actions",
	];
	libelleDivision: any;
	libelleService: any;
	libellePersonnel: string;
	dataTable: organisation[] = [];
	visitesArray: any[];
	tabVisite: number = 0;
	// ================================================================
	//
	// ================================================================
	constructor(
		private fb: FormBuilder,
		private service: AoService,
		private service2: OrganisationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service3: PersonnelService,
		public dialog: MatDialog,
		private translate: TranslateService,
		private notification: NotificationService
	) {}
	// ================================================================
	//
	// ================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
		this.checkLang = window.localStorage.getItem("language");

		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});

		this.getDivisions();

		this.getVisite();
		this.myForm = this.fb.group({
			arr: this.fb.array([this.createItem()]),
		});
		this.myForm1 = this.fb.group({
			arr1: this.fb.array([this.createItem1()]),
		});
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// ================================================================
	//
	// ================================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ================================================================
	//
	// ================================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formData.service = 0;
		if (idDivision != 0) {
			this.service3
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
			this.service2
				.getRessourceById(idDivision, "/services/divisions/")
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
			this.personnels = null;
		}
	}
	// ================================================================
	//
	// ================================================================
	onChangeService(f) {
		const idService = f.value;
		if (idService != 0) {
			this.service3
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		}
	}
	// ================================================================
	//
	// ================================================================
	async getVisite() {
		this.libelleDivision = "";
		this.libelleService = "";
		this.libellePersonnel = "";
		this.dataTable = [];
		await this.service.getAllVisiteByAo(this.idao).subscribe((data) => {
			if (data.length > 0) {
				this.tabVisite = 1;
				this.dataSource = new MatTableDataSource(data);
				this.visitesArray = data;
				this.dataTable.push(this.createNewLigne(0));
				console.log("VISITE :: " + JSON.stringify(data, null, 2));
				this.formData.division = this.dataTable[0].divison;
				this.formData.service = this.dataTable[0].service;
				this.formData.responsable = this.dataTable[0].personnel;
				//console.log("Division :: " + JSON.stringify(this.dataTable[0].divison, null, 2))
				this.getDivisionEtService();
				this.showBtnAddVisite = false;
			} else {
				this.showBtnAddVisite = true;
				this.tabVisite = 0;
			}
		});
	}

	createNewLigne(i: number): organisation {
		return {
			divison: +this.visitesArray[i][4],
			service: +this.visitesArray[i][5],
			personnel: +this.visitesArray[i][3],
		};
	}
	// ================================================================
	//
	// ================================================================
	async getDivisionEtService() {
		if (this.formData.division != null && this.formData.division != 0)
			await this.service2
				.findEntityById(this.formData.division, "/divisions/find/")
				.subscribe((d) => {
					if (this.checkLang == "ar") {
						this.libelleDivision = d.libelle;
					}
					if (this.checkLang == "fr") {
						this.libelleDivision = d.libelleFR;
					}
				});
		if (this.formData.service != null && this.formData.service != 0)
			await this.service2
				.findEntityById(this.formData.service, "/services/find/")
				.subscribe((s) => {
					if (this.checkLang == "ar") {
						this.libelleService = s.libelle;
					}
					if (this.checkLang == "fr") {
						this.libelleService = s.libelleFR;
					}
				});
		if (this.formData.responsable != null && this.formData.responsable != 0)
			this.service3
				.getPersonnelById(this.formData.responsable)
				.then((res) => {
					this.libellePersonnel = res.nom + " " + res.prenom;
				});
	}
	// ================================================================
	//
	// ================================================================
	createItem() {
		return this.fb.group({
			division: [""],
			service: [""],
			personnel: [""],
		});
	}
	// ================================================================
	//
	// ================================================================
	createItem1() {
		return this.fb.group({
			prestataire: [""],
		});
	}
	// ================================================================
	//
	// ================================================================
	onSubmit() {
		this.formData.ao.id = this.idao;
		this.service.sendvisite(this.formData).subscribe((res) => {
			console.log(res);
		});
	}
	// ================================================================
	//
	// ================================================================
	showVisite(idVisite) {}
	// ================================================================
	//
	// ================================================================
	editVisite(idVisite) {}
	// ================================================================
	//
	// ================================================================
	deleteVisite(idVisite) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service.deleteVisiteById(idVisite).subscribe((data) => {
				console.log("Visite Deleted  : " + idVisite);
				this.getVisite();
			});

			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
	// ================================================================
	//
	// ================================================================
	openDialog(): void {
		const dialogRef = this.dialog.open(EditVisiteAoComponent, {
			width: "650px",
			data: {
				ao: { id: this.idao },
				division: 0,
				service: 0,
				dateVisite: null,
				lieuVisite: null,
				responsable: null,
				note: null,
				heureVisite: {
					hour: null,
					minute: null
				},
				datePublication: null
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
				this.formData = res;

				this.formData.dateVisite = new Date(this.formData.dateVisite).setHours(this.formData.heureVisite.hour);
				this.formData.dateVisite = new Date(this.formData.dateVisite).setMinutes(this.formData.heureVisite.minute);

				console.log(this.formData);
				

				this.service.sendvisite(this.formData).subscribe((res) => {
					console.log(res);
					this.getVisite();
				});
			}
		});
	}
	// ================================================================
	//
	// ================================================================
	editVisiteFormDialog(idlbp) {
		this.service.getVisiteById(idlbp).subscribe((data) => {
			this.formData = data;
			console.log(
				"Show visite " + JSON.stringify(this.formData, null, 2)
			);
			const dialogRef = this.dialog.open(EditVisiteAoComponent, {
				width: "650px",
				data: {
					id: this.formData.id,
					ao: { id: this.idao },
					division: this.formData.division,
					service: this.formData.service,
					dateVisite: new Date(
						this.formData.dateVisite
					).toISOString(),
					lieuVisite: this.formData.lieuVisite,
					responsable: this.formData.responsable,
					note: this.formData.note,
				},
			});
			dialogRef.afterClosed().subscribe((res) => {
				if (res) {
					this.formData = res;

					if (res) {
						console.log(
							"visite data : " +
								JSON.stringify(this.formData, null, 2)
						);
					}
					this.service.sendvisite(this.formData).subscribe((res) => {
						console.log(res);
						this.getVisite();
					});
				}
			});
		});
	}
}
export interface organisation {
	divison: number;
	service: number;
	personnel: number;
}
