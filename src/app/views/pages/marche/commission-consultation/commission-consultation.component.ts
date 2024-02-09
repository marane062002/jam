import {
	Component,
	OnInit,
	ViewChild,
	QueryList,
	ViewChildren,
} from "@angular/core";
import { ConsultationService } from "../../shared/consultation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AoService } from "../../shared/ao.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { forkJoin } from "rxjs";
import { FormGroup, FormControl, NgForm } from "@angular/forms";
import { flatMap } from "rxjs/operators";
import { PersonnelService } from "../../rh/services/personnel.service";
import { OrganisationService } from "../../organisation/organisation.service";

@Component({
	selector: "kt-commission-consultation",
	templateUrl: "./commission-consultation.component.html",
	styleUrls: ["./commission-consultation.component.scss"],
})
export class CommissionConsultationComponent implements OnInit {
	constructor(
		private service: AoService,
		private service1: ConsultationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service3: PersonnelService,
		private service2: OrganisationService
	) { }
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChildren(MatPaginator) paginator2 = new QueryList<MatPaginator>();
	@ViewChildren(MatSort) sort2 = new QueryList<MatSort>();
	OffreAdjucataire = {
		id: 0,
		adjucataire: false,
		prestataire: { nom: "", rc: "", mail: "", adresse: "", tel: "" },
		commande: { mntTotal: 0, mntTtc: 0, tva: 0 },
		noteFinanciere: "",
	};
	ordre;
	ParticipantsInternes = [];
	ParticipantsExternes = [];
	adjucataire = false;
	transfert = false;
	commande = { mntTotal: 0, tva: 0, mntTtc: 0 };
	participantInterne = { role: { id: 1 }, commission: { id: 1 }, idDivision: "", idService: "", idPersonnel: "" };
	formDataPE = {
		role: { id: 1 },
		commission: { id: 1 },
		personneExterne: { id: 1 },
		tele: "",
		organisme: "",
		cin: "",
		nom: "",
		prenom: "",
		idDivision: "",
		idService: "",
		idPersonnel: "",
	};
	formDataCommssion = {
		typeCommission: { id: 1, libelle: "" },
		consultation: { id: 1 },
		dateOuveture: null,
	};
	typeBien;
	typeBien1;
	personnel;
	displayedColumns = ["typeCommission", "dateOuverture", "actions"];
	displayedColumnsPI = [
		"nom",
		"division",
		"service",
		"role",
		"present",
		"justif",
		"actions",
	];
	displayedColumnsPE = [
		"nom",
		"organisme",
		"tele",
		"role",
		"present",
		"justif",
		"actions",
	];
	displayedColumnsODEvAdmin = [
		"id",
		"NomOrganisme",
		"rc",
		"tele",
		"statut",
		"reserve",
	];
	displayedColumnsODEvFin = [
		"id",
		"NomOrganisme",
		"rc",
		"tele",
		"statut",
		"reserve",
		"action",
	];
	displayedColumnsCommande = [
		"type",
		"article",
		"intituleService",
		"tva",
		"prixUnitaire",
		"quantite",
		"prixTotal",
	];
	dataSourceODEvFinanciere: MatTableDataSource<any>;
	dataSourceODEvTechnique: MatTableDataSource<any>;
	dataSourcePI: MatTableDataSource<PI>;
	dataSourcePE: MatTableDataSource<any>;
	dataSourceCommande: MatTableDataSource<any>;
	offreStock = [];
	lignesStock = [];
	PIDatasource: PI[] = [];
	showCommande = 0;
	offreLocale = { commande: { mntTotal: 0, tva: 0, mntTtc: 0 } };
	participantName;
	divisionName;
	serviceName;
	roleName;
	AddCommissionShow = true;
	showRadio = 0;
	idConsultation;
	typeCommissionAll;
	roleCommissionAll;
	seuilMinimal = 0;
	selectedStatus = 0;
	show;
	lignesCommande;
	consultation;
	tva;
	finale = false;
	displayedColumnsOD = ["id", "NomOrganisme", "rc", "tele", "deposee"];
	dataSourceOD: MatTableDataSource<any>;
	dataSource: MatTableDataSource<any>;
	eventEditForm: FormGroup;
	public toggleForm: boolean;
	ngOnInit() {
		this.eventEditForm = new FormGroup({
			completed: new FormControl(),
		});
		this.getDivisions();
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idConsultation = params["id"];
		});
		forkJoin(
			this.service.getAllTypeCommission(),
			this.service.getAllRoleCommission(),
			this.service1.getAllOffreDeposee(this.idConsultation),
			this.service1.getConsultationById(this.idConsultation),
			this.service1.getAllCommission(this.idConsultation)
		).subscribe((res) => {
			this.populate(res[0], res[1], res[2], res[3], res[4]);
		});
	}

	showCommission(idcomm) {
		this.router.navigate(["/marches/commission-consultation-detail"], {
			queryParams: { id: idcomm },
		});
	}

	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.typeBien1 = data));
	}

	onChangeDivision(f) {
		const idDivision = f.value;
		for (var i = 0; i < this.typeBien1.length; i++) {
			if (this.typeBien1[i].id == idDivision) {
				this.divisionName = this.typeBien1[i].libelle;
			}
		}
		if (idDivision != 0) {
			this.service3
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnel = data;
					},
					(error) => console.log(error)
				);
			this.service2
				.getRessourceById(idDivision, "/services/divisions/")
				.subscribe(
					(data) => {
						this.typeBien = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.typeBien = null;
			this.personnel = null;
		}
	}

	onChangeService(f) {
		const idService = f.value;
		for (var i = 0; i < this.typeBien.length; i++) {
			if (this.typeBien[i].id == idService) {
				this.serviceName = this.typeBien[i].libelle;
			}
		}

		if (idService != 0) {
			this.service3
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnel = data;
					},
					(error) => console.log(error)
				);
		}
	}

	changeStatutTech($event, row) {
		if (this.seuilMinimal > row.noteTechnique) {
			row.statutTechnique = 2;
		} else {
			row.statutTechnique = 1;
		}
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	populate(a, b, c, d, e) {
		this.consultation = d;
		this.dataSource = new MatTableDataSource(e);
		// this.dataSource.sort = this.sort;
		if (d.modePassation && e.length == 0) {
			this.seuilMinimal = d.seuilMinimal;
			this.formDataCommssion.typeCommission = a[2];
			this.show = 3;
			this.dataSourceODEvTechnique = new MatTableDataSource(c);
			this.dataSourceODEvTechnique.paginator = this.paginator2.toArray()[2];
		}
		for (var i = 0; i < c.length; i++) {
			c[i].commande = { mntTotal: 0, tva: 0, mntTtc: 0 };
		}
		this.typeCommissionAll = a;
		this.roleCommissionAll = b;
		this.dataSourceOD = new MatTableDataSource(c);

		if (d.modePassation && e.length == 1) {
			this.finale = true;
			this.formDataCommssion.typeCommission = a[3];
			this.show = 4;
			this.service1
				.getAllOffreDeposeeByStatutTech(this.idConsultation)
				.subscribe((data) => {
					for (var i = 0; i < data.length; i++) {
						data[i].commande = { mntTotal: 0, tva: 0, mntTtc: 0 };
					}
					console.log(data);
					this.dataSourceODEvFinanciere = new MatTableDataSource(
						data
					);
					this.dataSourceODEvFinanciere.paginator = this.paginator2.toArray()[3];
					//this.dataSourceODEvFinanciere.sort = this.sort2.toArray()[3
					// ];
				});
		}
		if (!d.modePassation && e.length == 0) {
			this.finale = true;
			this.formDataCommssion.typeCommission = a[3];
			this.show = 4;
			this.dataSourceODEvFinanciere = new MatTableDataSource(c);
			console.log(
				"Financiere : " +
				JSON.stringify(this.dataSourceODEvFinanciere.data, null, 2)
			);
		}

		if (this.consultation.statut.id == 3) {
			this.AddCommissionShow = false;
			this.adjucataire = true;
			this.transfert = true;
			this.service1
				.getOffreDeposeeAdjucataire(this.idConsultation)
				.subscribe((data) => {
					console.log("OffreAdjucataire1" + data[0]);
					this.OffreAdjucataire = data[0];
				});
		}
		if (this.consultation.statut.id == 4) {
			this.AddCommissionShow = false;
			this.adjucataire = true;
			this.service1
				.getOffreDeposeeAdjucataire(this.idConsultation)
				.subscribe((data) => {
					console.log("OffreAdjucataire2" + data[0]);
					this.OffreAdjucataire = data[0];
				});
		}
		// document.getElementById("myCheck2").click();
	}

	changeMontantPropose(row) {
		var x = -1;
		for (var i = 0; i < this.dataSourceODEvFinanciere.data.length; i++) {
			if (this.dataSourceODEvFinanciere.data[i].commande.mntTotal != 0) {
				if (x == -1) {
					x = this.dataSourceODEvFinanciere.data[i].commande.mntTotal;
					this.ordre = i;
				}
				if (
					x * 1 >
					this.dataSourceODEvFinanciere.data[i].commande.mntTotal * 1
				) {
					x = this.dataSourceODEvFinanciere.data[i].commande.mntTotal;
					this.ordre = i;
				}
			}
		}
		for (var i = 0; i < this.dataSourceODEvFinanciere.data.length; i++) {
			if (this.dataSourceODEvFinanciere.data[i].commande.mntTotal != 0) {
				this.dataSourceODEvFinanciere.data[
					i
				].noteFinanciere = Math.round(
					(x /
						this.dataSourceODEvFinanciere.data[i].commande
							.mntTotal) *
					100
				);
			}
		}
	}

	validerReponsePrestataire() {
		console.log(this.dataSourceODEvFinanciere.data);
		this.showCommande = 0;
		var lignSend = [];
		this.offreLocale.commande = this.commande;
		this.offreStock.push(this.offreLocale);
		for (var i = 0; i < this.dataSourceCommande.data.length; i++) {
			var m = this.dataSourceCommande.data[i];
			m.prixUnitaire = m.prixUnitaire * 1;
			if (this.dataSourceCommande.data[i].article.numRef == "") {
				m.article = null;
				//this.dataSourceCommande.data[i].article=null;
			}
			lignSend.push(m);
		}
		this.lignesStock.push(lignSend);
		this.commande = { mntTotal: 0, tva: 0, mntTtc: 0 };
		this.changeMontantPropose(this.offreLocale);
		console.log(this.offreStock);
		console.log(this.lignesStock);
		console.log(this.dataSourceODEvFinanciere.data);
	}

	changePrixUnite(row) {
		row.prixTotal = row.prixUnitaire * row.quantite;
		var ttTva = (row.prixTotal * row.tva) / 100;
		row.prixTtc = row.prixTotal + ttTva;
		this.commande.mntTotal = this.commande.mntTotal + row.prixTotal;
		this.commande.mntTtc = row.prixTtc + this.commande.mntTtc;
	}

	onClickAddOCommande(row) {
		console.log(row);
		this.offreLocale = row;
		console.log(this.consultation);
		this.service1
			.getAllLigneCommandes(this.consultation.commande.id)
			.subscribe((res7) => {
				console.log(res7);
				this.commande.tva = res7[0].commande.tva;
				for (var i = 0; i < res7.length; i++) {
					res7[i].id = 0;
					res7[i].prixUnitaire = 0;
					res7[i].prixTotal = 0;
					if (res7[i].article == null) {
						res7[i].article = { numRef: "", libelle: "" };
					}
				}
				this.dataSourceCommande = new MatTableDataSource(res7);
				this.dataSourceCommande.paginator = this.paginator2.toArray()[4];
				//this.dataSourceCommande.sort = this.sort2.toArray()[4];
			});
		this.showCommande = 1;
	}

	nouveauParticipant() {
		this.showRadio = 1;
	}

	nouvelleLigne() {
		document.getElementById("frmLigne").style.display = "inline";
	}

	onClick() {
		//console.log(this.ParticipantsInternes)
		this.ParticipantsInternes.push(this.participantInterne);
		// console.log(this.ParticipantsInternes);
		var x = this.ParticipantsInternes;
		this.participantInterne = { role: { id: 1 }, commission: { id: 11 }, idDivision: "", idService: "", idPersonnel: "" };
		this.PIDatasource.push(this.createNewPI());
		this.dataSourcePI = new MatTableDataSource(this.PIDatasource);
		this.dataSourcePI.paginator = this.paginator2.toArray()[0];
		//console.log(this.dataSourcePI.data)
	}
	test(a, b) {
		for (var i = 0; i < this.ParticipantsInternes.length; i++) {
			console.log(this.ParticipantsInternes[i]);
			this.ParticipantsInternes[i].commission.id = a;
			this.ParticipantsInternes[i].present = this.dataSourcePI.data[
				i
			].present;
			this.ParticipantsInternes[i].justif = this.dataSourcePI.data[
				i
			].justif;
		}
		for (var j = 0; j < b.length; j++) {
			console.log(this.dataSourcePE.data);
			this.dataSourcePE.data[j].commission.id = a;
			this.dataSourcePE.data[j].personneExterne.id = b[j].id;
			console.log(this.dataSourcePE.data[j]);
		}

		return forkJoin(
			this.service1.sendPICommission(this.ParticipantsInternes),
			this.service1.sendPECommission(this.dataSourcePE.data)
		);
	}

	AddBonCommande() {
		this.consultation.statut.id = 4;
		this.service1
			.CloseConsultation(this.consultation)
			.subscribe((data) => { });
		this.router.navigate(["/marches/bon-commande-form"], {
			queryParams: { id: this.idConsultation },
		});
	}

	validerAll() {
		this.formDataCommssion.consultation.id = this.idConsultation;
		this.AddCommissionShow = false;
		document.getElementById("frmLigne").style.display = "none";

		if (this.finale) {
			var combine = { a: this.offreStock, b: this.lignesStock };
			this.consultation.statut.id = 3;
			for (var i = 0; i < this.offreStock.length; i++) {
				if (this.offreStock[i].noteFinanciere == 100) {
					this.offreStock[i].adjucataire = true;
					this.OffreAdjucataire = this.offreStock[i];
					console.log(
						"OffreAdjucataireFinal" + this.OffreAdjucataire
					);
				}
			}
			this.adjucataire = true;
			this.transfert = true;
			forkJoin(
				this.service1.sendoffreCommandeetLigne(combine),
				this.service1.sendCommission(this.formDataCommssion),
				this.service.sendPE(this.ParticipantsExternes),
				this.service1.addCommandeConsultation(this.consultation)
			)
				.pipe(flatMap((res) => this.test(res[1].id, res[2])))
				.subscribe((resfork) => {
					document.getElementById("myCheck").click();
				});
		} else {
			for (var i = 0; i < this.dataSourceODEvTechnique.data.length; i++) {
				this.dataSourceODEvTechnique.data[i].commande = null;
			}
			console.log(this.dataSourceODEvTechnique.data);
			console.log(this.formDataCommssion);
			forkJoin(
				this.service1.sendOffres(this.dataSourceODEvTechnique.data),
				this.service1.sendCommission(this.formDataCommssion),
				this.service.sendPE(this.ParticipantsExternes)
			)
				.pipe(flatMap((res) => this.test(res[1].id, res[2])))
				.subscribe((resfork) => {
					this.ParticipantsInternes = [];
					this.PIDatasource = [];
					this.dataSourcePI = new MatTableDataSource([]);
					this.ParticipantsExternes = [];
					this.dataSourcePE = new MatTableDataSource([]);
					this.formDataCommssion = {
						typeCommission: { id: 1, libelle: "" },
						consultation: { id: 1 },
						dateOuveture: null,
					};
					document.getElementById("myCheck1").click();
				});
		}
	}

	createNewPI(): PI {
		return {
			nom: this.participantName,
			division: this.divisionName,
			service: this.serviceName,
			role: this.roleName,
			present: null,
			justif: "",
		};
	}

	onClickPE() {
		console.log(this.ParticipantsExternes);
		this.ParticipantsExternes.push(this.formDataPE);
		console.log(this.formDataPE.role);
		console.log(this.formDataPE.role.id);
		this.formDataPE = {
			role: { id: 1 },
			commission: { id: 11 },
			personneExterne: { id: 1 },
			tele: "",
			organisme: "",
			cin: "",
			nom: "",
			prenom: "",
			idDivision: "",
			idService: "",
			idPersonnel: "",
		};
		this.dataSourcePE = new MatTableDataSource(this.ParticipantsExternes);
		this.dataSourcePE.paginator = this.paginator2.toArray()[1];
	}

	onChangeofOptionsPerso($event) {
		for (var i = 0; i < this.personnel.length; i++) {
			if (this.personnel[i].id == $event.value) {
				this.participantName =
					this.personnel[i].nom + " " + this.personnel[i].prenom;
			}
		}
	}

	onChangeofOptionsDivision($event) {
		for (var i = 0; i < this.typeBien1.length; i++) {
			if (this.typeBien1[i].id == $event.value) {
				this.divisionName = this.typeBien1[i].libelle;
			}
		}
	}
	onChangeofOptionsService($event) {
		for (var i = 0; i < this.typeBien.length; i++) {
			if (this.typeBien[i].id == $event.value) {
				this.serviceName = this.typeBien[i].libelle;
			}
		}
	}

	onChangeofOptionsRole($event) {
		for (var i = 0; i < this.roleCommissionAll.length; i++) {
			if (this.roleCommissionAll[i].id == $event.value) {
				this.roleName = this.roleCommissionAll[i].libelle;
			}
		}
	}

	deleteReclamation(id) { }
}

export interface PI {
	nom: string;
	division: string;
	service: string;
	role: string;
	present: boolean;
	justif: string;
}
