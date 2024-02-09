import { VisiteCaService } from "./../../../shared/visite-ca.service";
import { VisiteCa } from "./../../models/visite-ca";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { AoService } from "./../../../shared/ao.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import {
	MatDialog,
	MatPaginator,
	MatSort,
	MatTableDataSource,
} from "@angular/material";
import { OrganisationService } from "../../../organisation/organisation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { NotificationService } from "../../../shared/notification.service";
import { EditVisiteCaComponent } from "../../edit-visite-ca/edit-visite-ca.component";
import { umask } from "process";
import Swal from "sweetalert2";

@Component({
	selector: "kt-ca-visite",
	templateUrl: "./ca-visite.component.html",
	styleUrls: ["./ca-visite.component.scss"],
})
export class CaVisiteComponent implements OnInit {
	myForm: FormGroup;
	arr: FormArray;
	myForm1: FormGroup;
	arr1: FormArray;
	VisiteCaList: VisiteCa[];
	idCA;
	divisions;
	services;
	personnels;
	showForm = false;
	showBtnAddVisite = false;
	divisionName;
	serviceName;
	checkLang: string;
	VisiteCa: VisiteCa;
	VisiteCa2: VisiteCa;
	formData = {
		id: 0,
		ao: { id: 0 },
		division: 0,
		service: 0,
		dateOuvertureDesPlis: null,
		dateVisite: null,
		lieuVisite: null,
		responsable: null,
		note: null,
	};
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	dataSource: MatTableDataSource<any>;
	displayedColumns = [
		"dateOuvertureDesPlis",
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
	constructor(
		private fb: FormBuilder,
		private service: VisiteCaService,
		private service2: OrganisationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service3: PersonnelService,
		public dialog: MatDialog,
		private translate: TranslateService,
		private notification: NotificationService
	) {}

	ngOnInit() {
		this.VisiteCaList = [];
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idCA = params["id"];
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
	showVisite(idVisite) {}
	// ================================================================
	//
	// ================================================================
	editVisite(idVisite) {}

	back() {
		this.router.navigate(["/marches/consultation-architecturale"]);
	}

	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}

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

	async getVisite() {
		this.libelleDivision = "";
		this.libelleService = "";
		this.libellePersonnel = "";
		this.dataTable = [];
		await this.service.getVisiteBYCAID(this.idCA).subscribe((data) => {
			if (data.length > 2) {
				this.tabVisite = 1;
				//this.dataSource = new MatTableDataSource(data);
				this.visitesArray = JSON.parse(data + "");
				this.dataTable.push(this.createNewLigne(0));
				this.formData.division = this.dataTable[0].divison;
				this.formData.service = this.dataTable[0].service;
				this.formData.responsable = this.dataTable[0].personnel;
				//console.log("Division :: " + JSON.stringify(this.dataTable[0].divison, null, 2))
				this.getDivisionEtService();
				this.showBtnAddVisite = false;
				this.VisiteCa2 = {
					id: this.visitesArray[0].id,
					dateOuvertureDesPlis:
						this.visitesArray[0].dateOuvertureDesPlis,
					lieuVisite: this.visitesArray[0].lieuVisite,
					division: this.libelleDivision,
					service: this.libelleService,
					responsable: this.libellePersonnel,
				};
			} else {
				this.showBtnAddVisite = true;
				this.tabVisite = 0;
			}
		});
	}
	createNewLigne(i: number): organisation {
		return {
			divison: +this.visitesArray[i].division,
			service: +this.visitesArray[i].service,
			personnel: +this.visitesArray[i].responsable,
		};
	}
	async getDivisionEtService() {
		if (this.formData.division != null && this.formData.division != 0)
			await this.service2
				.findEntityById(this.formData.division, "/divisions/find/")
				.subscribe((d) => {
					if (this.checkLang == "ar") {
						this.libelleDivision = d.libelle;

						this.VisiteCa2.division = d.libelle;
					}
					if (this.checkLang == "fr") {
						this.libelleDivision = d.libelleFR;

						this.VisiteCa2.division = d.libelle;
					}
				});
		if (this.formData.service != null && this.formData.service != 0)
			await this.service2
				.findEntityById(this.formData.service, "/services/find/")
				.subscribe((s) => {
					if (this.checkLang == "ar") {
						this.libelleService = s.libelle;
						this.VisiteCa2.service = s.libelle;
					}
					if (this.checkLang == "fr") {
						this.libelleService = s.libelleFR;
						this.VisiteCa2.service = s.libelle;
					}
				});
		if (this.formData.responsable != null && this.formData.responsable != 0)
			this.service3
				.getPersonnelById(this.formData.responsable)
				.then((res) => {
					this.libellePersonnel = res.nom + " " + res.prenom;
					this.VisiteCa2.responsable = res.nom + " " + res.prenom;
				});

		this.VisiteCaList.push(this.VisiteCa2);

		this.dataSource = new MatTableDataSource(this.VisiteCaList);
	}
	createItem() {
		return this.fb.group({
			division: [""],
			service: [""],
			personnel: [""],
		});
	}
	createItem1() {
		return this.fb.group({
			prestataire: [""],
		});
	}
	onSubmit() {
		//this.formData.ao.id = this.idao;
		//this.service.sendvisite(this.formData).subscribe((res) => {
		//	console.log(res);
		//});
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(EditVisiteCaComponent, {
			width: "650px",
			data: {
				ca: { id: this.idCA },
				division: 0,
				service: 0,
				dateVisite: null,
				lieuVisite: null,
				responsable: null,
				dateOuvertureDesPlis: null,
				note: null,
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
				this.formData = res;
				this.VisiteCa = {
					dateVisite: this.formData.dateVisite,
					dateOuvertureDesPlis: this.formData.dateOuvertureDesPlis,
					lieuVisite: this.formData.lieuVisite,
					responsable: this.formData.responsable,
					division: this.formData.division,
					service: this.formData.service,
					note: this.formData.note,
					consultationArchitecturale: {
						id: this.idCA,
					},
				};
				this.service.addVisite(this.VisiteCa).subscribe((res) => {
					this.getVisite();
				});
			}
		});
	}

	deleteVisite(id: any) {
		console.log(id);
		Swal.fire({
			title: this.translate.instant("PAGES.GENERAL.MSG_DELETED"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service.deleteVisite(id).subscribe(
					(data) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant(
								"PAGES.GENERAL.MSG_DEL_CONFIRMED"
							),
							showConfirmButton: false,
							timer: 1500,
						});
						this.getVisite();
					},
					(err) => {
						console.log(err);
						Swal.fire({
							icon: "error",
							title: "Suppression interdite !!",
							text: "Cette visite   est utilisé par d'outre module.",
						});
					}
				);
			}
		});
	}
}
export interface organisation {
	divison: number;
	service: number;
	personnel: number;
}
