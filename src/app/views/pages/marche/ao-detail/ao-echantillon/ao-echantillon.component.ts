import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { OrganisationService } from "../../../organisation/organisation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { AoService } from "../../../shared/ao.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { NotificationService } from "../../../shared/notification.service";
import { EditEchantillonComponent } from '../../dialog-forms/edit-echantillon/edit-echantillon.component';

@Component({
	selector: "kt-ao-echantillon",
	templateUrl: "./ao-echantillon.component.html",
	styleUrls: ["./ao-echantillon.component.scss"],
})
export class AoEchantillonComponent implements OnInit {
	heureExam = { hour: 10, minute: 10 };
	// ========================================================================
	//
	// ========================================================================
	displayedColumns = ["delais", "dateExamen", "division", "service", "responsable", "actions"];
	displayedColumns1 = ["libelle", "qte", "format" ,"adresse"];
	// ========================================================================
	//
	// ========================================================================
	divisions;
	services;
	personnels;
	// pour affectationn des vleurs  (division; service; personnel)
	libelleDivision
	libelleService
	libellePersonnel

	showAddechantillon = false;
	showForm = false;
	divisionName;
	serviceName;
	idao;
	allechantillons = [];
	dataSource: MatTableDataSource<any>;
	dataSource1: MatTableDataSource<any>;
	// ========================================================================
	//
	// ========================================================================
	formData = {
		id: 0,
		delais: null,
		dateExamen: null,
		division: 0,
		service: 0,
		responsable: 0,
		ao: { id: 0 },
	};
	// ++++++++++++++++++++++++
	formDataSymbole = {
		libelle: "",
		qte: "",
		format: "",
		adresse:"",
		echantillon: { id: 0 },
	};
	checkLang: string;
	// ========================================================================
	//
	// ========================================================================
	constructor(
		private fb: FormBuilder,
		private service: AoService,
		private service2: OrganisationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service3: PersonnelService,
		private translate: TranslateService,
		private notification: NotificationService,
		public dialog: MatDialog,
	) { this.checkLang = window.localStorage.getItem("language"); }
	// ========================================================================
	//
	// ========================================================================
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});
		this.getDivisions();
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});

		this.getEchantillon();
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// ========================================================================
	//
	// ========================================================================
	async getDivisionEtService() {
		console.log("Division  : " + this.formData.division)
		await this.service2
			.findEntityById(this.formData.division, "/divisions/find/")
			.subscribe((d) => {
				this.libelleDivision = d.libelleFR;
			});
		await this.service2
			.findEntityById(this.formData.service, "/services/find/")
			.subscribe((s) => {
				this.libelleService = s.libelleFR;
			});
		this.service3
			.getPersonnelById(this.formData.responsable)
			.then((res) => {
				this.libellePersonnel = res.nom + " " + res.prenom;
			});
	}
	// ========================================================================
	//
	// ========================================================================
	addItem() {
		this.showAddechantillon = true;
	}
	// ========================================================================
	//
	// ========================================================================
	validerEchantillon() {
		this.allechantillons.push(this.formDataSymbole);
		this.dataSource1 = new MatTableDataSource(this.allechantillons);
		this.showAddechantillon = false;
		this.formDataSymbole = {
			libelle: "",
			qte: "",
			format: "",
			adresse:"",
			echantillon: { id: 0 },
		};
	}
	// ========================================================================
	//
	// ========================================================================
	showchantillon() {
		this.router.navigate(["marches/echantillon-show"], {
			queryParams: { id: this.idao },
		});
	}
	// ========================================================================
	//
	// ========================================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ========================================================================
	//
	// ========================================================================
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
	// ========================================================================
	//
	// ========================================================================
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
	// ========================================================================
	//
	// ========================================================================
	async getEchantillon() {
		await this.service.getEchantillon(this.idao).subscribe((data) => {
			console.log("Echantillon : " + JSON.stringify(data, null, 2));
			if (data != null) {
				this.formData = data;
				this.getDivisionEtService();
				this.dataSource = new MatTableDataSource([data]);
			}
			if (data == null) {
				this.showForm = true;
			}
		});
	}
	// ========================================================================
	//
	// ========================================================================
	onSubmit() {
		this.formData.ao.id = this.idao;
		this.showForm = false;
		var dt = new Date(this.formData.dateExamen);
		this.formData.dateExamen = new Date(
			dt.getFullYear() +
			"/" +
			(dt.getMonth() + 1) +
			"/" +
			dt.getDate() +
			" " +
			this.heureExam.hour +
			":" +
			this.heureExam.minute
		);
		this.service.sendEchantillon(this.formData).subscribe((res) => {
			this.getEchantillon();
			for (var i = 0; i < this.allechantillons.length; i++) {
				this.allechantillons[i].echantillon.id = res.id;
				this.service
					.sendLigneEchantillon(this.allechantillons[i])
					.subscribe((res1) => { });
			}
		});
	}
	// ========================================================================
	//
	// ========================================================================
	editEchantillonFormDialog(id) {
		this.service.getEchantillonById(id).subscribe((data) => {
			this.formData = data;
			console.log(
				"Show echantillon " + JSON.stringify(this.formData, null, 2)
			);
			const dialogRef = this.dialog.open(EditEchantillonComponent, {
				width: "650px",
				data: {
					id: id,
					ao: { id: this.idao },
					division: this.formData.division,
					service: this.formData.service,
					responsable: this.formData.responsable,
					delais: new Date(this.formData.delais).toISOString(),
					dateExamen: new Date(this.formData.dateExamen).toISOString(),
				},
			});
			dialogRef.afterClosed().subscribe((res) => {
				if (res) {
					this.formData = res;
					if (res) {
						console.log(
							"AfterClosed : " +
							JSON.stringify(this.formData, null, 2)
						);
					}

					this.service.sendEchantillon(this.formData).subscribe((res) => {
						console.log(res);
						this.getEchantillon();
					});

				}
			});
		});
	}
	// ========================================================================
	//
	// ========================================================================
	deleteChantillon(idEch) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			// Supprimer ligne echantillion par id ECH
			this.service.deleteByEchantillonId(idEch).subscribe((data) => {
				console.log("Ligne echantillon Deleted  : " + idEch);
			});
			// Supprimer ecantillon par son id
			this.service.deleteEchantillonById(idEch).subscribe((data) => {
				console.log("Echantillon Deleted  : " + idEch);
				this.getEchantillon();
			});

			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
}
