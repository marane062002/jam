import { CommissionCaService } from "./../../../shared/commission-ca.service";
import { CommissionCA } from "./../../models/commission-c-a";
import { MatTableDataSource } from "@angular/material";
import { AoService } from "./../../../shared/ao.service";
import { ConsultationArchitecturalService } from "./../../../shared/consultation-architectural.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { OrganisationService } from "../../../organisation/organisation.service";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { VisiteCa } from "../../models/visite-ca";
import { VisiteCaService } from "../../../shared/visite-ca.service";

@Component({
	selector: "kt-ca-commission",
	templateUrl: "./ca-commission.component.html",
	styleUrls: ["./ca-commission.component.scss"],
})
export class CaCommissionComponent implements OnInit {
	incriPI = 0;
	role;
	ds1Size = 0;
	saveFage = 0;
	AddCommissionShow = 1;
	showRadio: number;
	visite: VisiteCa;
	valDatePlis: boolean;
	commissionCa: CommissionCA;
	commissionShowForm: number = 0;
	selectedStatus: number;
	personnel;
	typeBien;
	typeBien1;
	idCA: any = "";
	roleCommissionAll;
	participantName;
	checkLang: string;
	divisionName;
	serviceName;
	roleName;
	typeCommissionAll;
	ParticipantsInternes = [];
	participantInterne = {
		idDivision: "",
		idService: "",
		idPersonnel: "",
		role: { id: 1 },
		commissionCA: { id: 1 },
	};
	ParticipantsExternes = [];
	formDataCommssion = {
		dateOuveture: null,
		typeCommission: { id: 1, libelle: "" },
		ao: { id: 1 },
	};
	eventEditForm: FormGroup;
	dataSource: MatTableDataSource<CommissionCA>;
	dataSourcePI: MatTableDataSource<PI>;
	dataSourcePE: MatTableDataSource<any>;
	dataSourceODEvAdmin: MatTableDataSource<any>;
	dataSourceODEvTechnique: MatTableDataSource<any>;
	dataSourceODEvFinanciere: MatTableDataSource<any>;
	dataSourceODEvFinale: MatTableDataSource<any>;
	dataSourceOD: any;
	commissionDatasource: CommissionCA[] = [];
	PIDatasource: PI[] = [];
	PEDatasource: PE[] = [];
	nbrCommission = 0;
	show;
	ordre;
	formDataPE = {
		nom: "",
		prenom: "",
		cin: "",
		tele: "",
		organisme: "",
		roleCommission: { id: 1 },
		role: { id: 1 },
		commission: { id: 1 },
		personneExterne: { id: 1 },
		consultationArchitecturale: { id: 1 },
	};
	displayedColumnsPI = ["nom", "role", "present", "justif", "actions"];
	displayedColumnsPE = [
		"nom",
		"organisme",
		"tele",
		"role",
		"present",
		"justif",
		"actions",
	];
	displayedColumns = ["type", "dateOuverture", "actions"];
	displayedColumnsOD = ["NomOrganisme", "rc", "tele", "deposee"];
	displayedColumnsODEvAdmin = [
		"NomOrganisme",
		"rc",
		"tele",
		"statut",
		"reserve",
	];
	displayedColumnsODEvFinale = ["NomOrganisme", "rc", "tele", "reserve"];
	adjucataire = 0;
	constructor(
		private service: AoService,
		private serviceCommission: CommissionCaService,
		private serviceConsultationArchitecturale: ConsultationArchitecturalService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private vistieCaService: VisiteCaService,
		private service1: PersonnelService,
		private service2: OrganisationService,
		private translate: TranslateService
	) {
		this.checkLang = window.localStorage.getItem("language");
	}
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});
		this.eventEditForm = new FormGroup({
			completed: new FormControl(),
		});
		this.selectedStatus = 0;
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idCA = params["id"];
			//console.log(this.idao);
		});
		this.formDataPE.consultationArchitecturale.id = this.idCA;
		this.getDivisions();
		this.service.getAllTypeCommission().subscribe((data) => {
			this.typeCommissionAll = data;
		});
		this.service.getAllRoleCommission().subscribe((data) => {
			this.roleCommissionAll = data;
		});
		this.service.getAllOffreDeposee(this.idCA).subscribe((data) => {
			/*  for (var i = 0; i <data.length ; i++) {
		data[i].commission={"id":1}
	 }*/

			this.dataSourceOD = new MatTableDataSource(data);
			//console.log("dateSourceOD : " + JSON.stringify(this.dataSourceOD.data, null, 2));
		});

		this.populate();
	}
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.typeBien1 = data));
	}
	nouvelleLigne() {
		//document.getElementById("frmLigne").style.display = "inline-table";
		this.commissionShowForm = 1;
	}
	onSubmit(form: NgForm) {
		console.log(this.ParticipantsInternes);
		console.log(this.ParticipantsExternes);
		console.log(this.formDataCommssion);
		this.commissionCa = {
			dateDebut: this.formDataCommssion.dateOuveture,
			typeCommissionCA: {
				id: this.nbrCommission + 1,
			},
			consultationArchitecturale: {
				id: this.idCA,
			},
		};
		this.serviceCommission
			.addCommission(this.commissionCa)
			.subscribe((res) => {
				res = JSON.parse(res + "");
				this.formDataCommssion = {
					dateOuveture: null,
					typeCommission: { id: 1, libelle: "" },
					ao: { id: 1 },
				};
				if (this.ParticipantsInternes != null) {
					for (var i = 0; i < this.ParticipantsInternes.length; i++) {
						//console.log(this.ParticipantsInternes[i]);
						this.ParticipantsInternes[i].commissionCA.id = res.id;
						this.ParticipantsInternes[i].present =
							this.dataSourcePI.data[i].present;
						this.ParticipantsInternes[i].justif =
							this.dataSourcePI.data[i].justif;
					}
					this.serviceCommission
						.addParticipantInterne(this.ParticipantsInternes)
						.subscribe((res) => {
							this.ParticipantsInternes = [];
							this.dataSourcePI.data = [];
						});
				}
				if (this.ParticipantsExternes != null) {
					this.serviceCommission
						.addParticipantExterne(this.ParticipantsExternes)
						.subscribe((res) => {
							this.ParticipantsExternes = [];
							this.dataSourcePE.data = [];
						});
				}

				this.populate();
				this.commissionShowForm = 0;
			});
	}
	nouveauParticipant() {
		this.showRadio = 1;
	}
	onChangeDivision(f) {
		const idDivision = f.value;
		if (idDivision != 0) {
			this.service1
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnel = data;
						//console.log("Division : "+ idDivision + " | Personnel division : " + JSON.stringify(data,null,2))
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
	editCommission(id: any) {}
	printPVCommissionJury(id: any) {
		this.serviceCommission
			.printPVCommissionJury(this.idCA)
			.subscribe((res) => {
				const file: any = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});
				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "PVCommissionJury.docx";
				link.href = readfile;
				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				setTimeout(() => {
					window.URL.revokeObjectURL(file);
					link.remove();
				}, 100);
			});
	}
	printPVCommissionFinancier(id: any) {
		this.serviceCommission
			.printPVCommissionFinancier(this.idCA)
			.subscribe((res) => {
				const file: any = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});
				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "PVCommissionFinancier.docx";
				link.href = readfile;
				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				setTimeout(() => {
					window.URL.revokeObjectURL(file);
					link.remove();
				}, 100);
			});
	}
	// abderrahim saybari
	printPVCommissionTechnique(id: any) {
		this.serviceCommission
			.printPVCommissionTechnique(this.idCA)
			.subscribe((res) => {
				const file: any = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});
				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "CommissionTechniqueConvocation.docx";
				link.href = readfile;
				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				setTimeout(() => {
					window.URL.revokeObjectURL(file);
					link.remove();
				}, 100);
			});
	}

	showCommission(id: any) {}
	onChangeService(f) {
		const idService = f.value;

		if (idService != 0) {
			this.service1
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnel = data;
					},
					(error) => console.log(error)
				);
		}
	}
	onChangeofOptionsPerso($event) {
		for (var i = 0; i < this.personnel.length; i++) {
			if (this.personnel[i].id == $event.value) {
				this.participantName =
					this.personnel[i].nom + " " + this.personnel[i].prenom;
			}
		}
	}
	onChangeofOptionsRole($event) {
		//console.log("role name select  : " + $event.value)
		/*
		for (var i = 0; i < this.roles.length; i++) {
			if (this.roles[i].id == $event.value) {
				this.roleName = this.roles[i].libelle;
			}
		}
		*/
		this.getRoleCommission($event.value);
	}

	getRoleCommission(idRoleC) {
		//const _this = this;
		if (idRoleC != null) {
			this.service.getRoleCommissionById(idRoleC).subscribe((data) => {
				//console.log("Role Commision by ID : " + idRoleC + " /n/r INFO :" + JSON.stringify(data, null, 2));
				this.roleName = data.libelle;
			});
		}
	}

	populate() {
		this.commissionDatasource = [];

		this.serviceCommission
			.getCommisionCaById(this.idCA)
			.subscribe((data) => {
				this.commissionDatasource = JSON.parse(data + "");
				this.dataSource = new MatTableDataSource(
					this.commissionDatasource
				);
				this.nbrCommission = this.commissionDatasource.length;
				if (this.nbrCommission == 3) {
					this.AddCommissionShow = 0;
				} else {
					this.AddCommissionShow = 1;
				}
				this.vistieCaService
					.getVisiteBYCAID(this.idCA)
					.subscribe((res) => {
						if (res) {
							const values = JSON.parse(res + "");
							this.visite = values[0];
							if (this.visite != null) {
								this.valDatePlis = true;
							} else {
								this.valDatePlis = false;
							}
						}
					});
			});
	}

	getRoleCommissionDS(idRole) {
		switch (idRole) {
			case "1":
				return "Président";
				break;
			case "2":
				return "Consultant";
				break;
			case "3":
				return "Membre";
				break;
			default:
				return "-";
				break;
		}
	}
	createNewPI(): PI {
		return {
			id: this.incriPI++,
			nom: this.participantName,
			division: this.divisionName,
			service: this.serviceName,
			role: this.roleName,
			present: null,
			justif: "",
		};
	}
	back() {
		this.router.navigate(["/marches/consultation-architecturale"]);
	}
	onClick() {
		this.showRadio = 0;
		this.saveFage++;
		this.ParticipantsInternes.push(this.participantInterne);
		//console.log("particip intern : " + JSON.stringify(this.ParticipantsInternes, null, 2));
		var x = this.ParticipantsInternes;
		//this.participantInterne = { role: { id: 1 }, commission: { id: 11 } };
		this.participantInterne = {
			idDivision: "",
			idService: "",
			idPersonnel: "",
			role: { id: 1 },
			commissionCA: { id: 1 },
		};
		this.PIDatasource.push(this.createNewPI());
		this.dataSourcePI = new MatTableDataSource(this.PIDatasource);
		//console.log("dataSourcPI particip intern  : " + JSON.stringify(this.dataSourcePI, null, 2));
	}
	onClickPE() {
		this.showRadio = 0;
		this.saveFage++;
		//console.log("Input PE :: " + JSON.stringify(this.ParticipantsExternes, null, 2));
		this.formDataPE.roleCommission.id = this.formDataPE.role.id;
		this.ParticipantsExternes.push(this.formDataPE);

		this.formDataPE = {
			nom: "",
			prenom: "",
			cin: "",
			tele: "",
			organisme: "",
			roleCommission: { id: 1 },
			role: { id: 1 },
			commission: { id: 1 },
			personneExterne: { id: 1 },
			consultationArchitecturale: { id: this.idCA },
		};

		//this.formDataPE={"role":{"id":1},"commission":{"id":11},"personneExterne":{"id":1}};
		this.dataSourcePE = new MatTableDataSource(this.ParticipantsExternes);
		//console.log("particip externe :: " + JSON.stringify(this.dataSourcePE.data, null, 2));
	}
	deletePI(row) {
		const index: number = this.dataSourcePI.data.indexOf(row);
		if (index != -1) {
			this.dataSourcePI.data.splice(index, 1);
		}
		this.dataSourcePI._updateChangeSubscription();
	}
	deletePE(row) {
		const index: number = this.dataSourcePE.data.indexOf(row);
		if (index != -1) {
			this.dataSourcePE.data.splice(index, 1);
		}
		this.dataSourcePE._updateChangeSubscription();
	}
	changeStatutTech($event, row) {
		if (this.service.SM > row.noteTechnique) {
			row.statutTechnique.id = 2;
		} else {
			row.statutTechnique.id = 1;
		}
	}
	changeMontantPropose(row) {
		var x = -1;
		for (var i = 0; i < this.dataSourceODEvFinanciere.data.length; i++) {
			if (this.dataSourceODEvFinanciere.data[i].montantPropose != 0) {
				if (x == -1) {
					x = this.dataSourceODEvFinanciere.data[i].montantPropose;
					this.ordre = i;
				}
				if (
					x * 1 >
					this.dataSourceODEvFinanciere.data[i].montantPropose * 1
				) {
					x = this.dataSourceODEvFinanciere.data[i].montantPropose;
					this.ordre = i;
				}
			}
		}
		for (var i = 0; i < this.dataSourceODEvFinanciere.data.length; i++) {
			if (this.dataSourceODEvFinanciere.data[i].montantPropose != 0) {
				this.dataSourceODEvFinanciere.data[i].noteFinanciere =
					(x / this.dataSourceODEvFinanciere.data[i].montantPropose) *
					100;
			}
		}
	}
}
export interface PI {
	id: number;
	nom: string;
	division: string;
	service: string;
	role: string;
	present: boolean;
	justif: string;
}

export interface PE {
	id: number;
	nomComplet: string;
	organisme: string;
	tele: string;
	role: string;
	present: boolean;
	justif: string;
}
