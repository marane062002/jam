import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormArray, FormControl, NgForm } from "@angular/forms";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { AoService } from "../../shared/ao.service";
import { PersonnelService } from "../../rh/services/personnel.service";
import { OrganisationService } from "../../organisation/organisation.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

@Component({
	selector: "kt-commission",
	templateUrl: "./commission.component.html",
	styleUrls: ["./commission.component.scss"],
})
export class CommissionComponent implements OnInit {
	// ====================================================================
	//
	// ====================================================================
	incriPI = 0;
	role;
	ds1Size = 0;
	saveFage = 0;
	idao;
	myForm: FormGroup;
	arr: FormArray;
	commissions;
	AddCommissionShow = 1;
	ODevalFinale;
	ordre;
	ODevalFinanciere;
	MontantPropose = 0;
	ChildSeuilMin;
	showSwitch = true;

	// ====================================================================
	//
	// ====================================================================
	displayedColumns = ["type", "dateOuverture", "actions"];
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
	displayedColumnsOD = ["NomOrganisme", "rc", "tele", "deposee"];
	displayedColumnsODEvAdmin = [
		"NomOrganisme",
		"rc",
		"tele",
		"statut",
		"reserve",
	];
	displayedColumnsODEvFinale = ["NomOrganisme", "rc", "tele", "reserve"];
	// ====================================================================
	//
	// ====================================================================
	dataSource: MatTableDataSource<Commission>;
	dataSourceOffreDeposee: MatTableDataSource<any>;
	dataSourcePI: MatTableDataSource<PI>;
	dataSourcePE: MatTableDataSource<any>;
	dataSourceOD: MatTableDataSource<any>;
	dataSourceODEvAdmin: MatTableDataSource<any>;
	dataSourceODEvTechnique: MatTableDataSource<any>;
	dataSourceODEvFinanciere: MatTableDataSource<any>;
	dataSourceODEvFinale: MatTableDataSource<any>;
	// ====================================================================
	//
	// ====================================================================
	OffreAdjucataire = {
		id: 0,
		adjucataire: false,
		prestataire: {
			nom: "",
			rc: "",
			ice: "",
			idFisc: "",
			tel: "",
			mail: "",
			adresse: "",
		},
		noteFinale: 0,
		noteFinanciere: 0,
	};
	checkLang: string;
	idCommission: any;
	roleLibelle: any;
	incriPE: any;
	commissionShowForm: number = 0;
	// ====================================================================
	//
	// ====================================================================
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service1: PersonnelService,
		private service2: OrganisationService,
		private translate: TranslateService
	) {
		this.checkLang = window.localStorage.getItem("language");
	}
	// ====================================================================
	//
	// ====================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	ParticipantsInternes = [];
	participantInterne = {
		idDivision: "",
		idService: "",
		idPersonnel: "",
		role: { id: 1 },
		commission: { id: 1 },
	};
	ParticipantsExternes = [];
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
	};
	//formDataPE={"role":{"id":1},"commission":{"id":11},"personneExterne":{"id":1}};
	commissionDatasource: Commission[] = [];
	PIDatasource: PI[] = [];
	PEDatasource: PE[] = [];
	typeCommissionAll;
	participantName;
	divisionName;
	serviceName;
	roleName;
	selectedStatus: number;
	show;
	adjucataire = 0;
	showRadio: number;
	typeBien;
	typeBien1;
	personnel;
	roles = [
		{ id: 1, libelle: " رئيس" },
		{ id: 2, libelle: "مستشار" },
		{ id: 2, libelle: "عضو" },
	];
	formDataCommssion = {
		dateOuveture: null,
		typeCommission: { id: 1, libelle: "" },
		ao: { id: 1 },
	};

	roleCommissionAll;
	eventEditForm: FormGroup;
	public toggleForm: boolean;
	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		//document.getElementById("frmLigne").style.display = "none";
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
			this.idao = params["id"];
			//console.log(this.idao);
		});
		this.getDivisions();
		this.service.getAllTypeCommission().subscribe((data) => {
			this.typeCommissionAll = data;
		});
		this.service.getAllRoleCommission().subscribe((data) => {
			this.roleCommissionAll = data;
		});
		this.service.getAllOffreDeposee(this.idao).subscribe((data) => {
			/*  for (var i = 0; i <data.length ; i++) {
		data[i].commission={"id":1}
	 }*/

			this.dataSourceOD = new MatTableDataSource(data);
			
			//console.log("dateSourceOD : " + JSON.stringify(this.dataSourceOD.data, null, 2));
		});
		this.populate();
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// ====================================================================
	// get Role commission
	// ====================================================================
	getRoleCommission(idRoleC) {
		//const _this = this;
		if (idRoleC != null) {
			this.service.getRoleCommissionById(idRoleC).subscribe((data) => {
				//console.log("Role Commision by ID : " + idRoleC + " /n/r INFO :" + JSON.stringify(data, null, 2));
				this.roleName = data.libelle;
			});
		}
	}
	// dataSet role
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
		/*
		const _this = this;
		if (idRole != null) {
			this.service.getRoleCommissionById(idRole).subscribe((data) => {
				_this.roleLibelle = data.libelle;
				console.log(_this.roleLibelle)
			});
		};
		*/
		//return this.roleLibelle;
	}

	// ====================================================================
	//
	// ====================================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.typeBien1 = data));
	}
	// ====================================================================
	//
	// ====================================================================
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
	// ====================================================================
	//
	// ====================================================================
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
	// ====================================================================
	//
	// ====================================================================
	/* onChangePersonnel(f){
	this.idPersonneltarget=f.value;
		}*/
	// ====================================================================
	//
	// ====================================================================
	nouveauParticipant() {
		this.showRadio = 1;
	}
	// ====================================================================
	//
	// ====================================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSourceOD.filter = filterValue;
	}
	// ====================================================================
	//
	// ====================================================================
	changeStatutTech($event, row) {
		if (this.service.SM > row.noteTechnique) {
			row.statutTechnique.id = 2;
		} else {
			row.statutTechnique.id = 1;
		}
	}
	// ====================================================================
	//
	// ====================================================================
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
	// ====================================================================
	//
	// ====================================================================
	onChangeofTypeCommission($event) {
		this.show = $event;
		if (this.show == 2) {
			this.service
				.getAllOffreDeposeeEvalAdmin(this.idao)
				.subscribe((data) => {
					for (var i = 0; i < data.length; i++) {
						if (data[i].statut == null) {
							data[i].statut = { id: 0 };
						}
					}
					this.dataSourceODEvAdmin = new MatTableDataSource(data);
					//console.log("dateSourceODEvAdmin - chang type commission : " + JSON.stringify(this.dataSourceODEvAdmin.data, null, 2));
				});
		}
		if (this.show == 3) {
			this.service
				.getAllOffreDeposeeEvalTechnique(this.idao)
				.subscribe((data) => {
					for (var i = 0; i < data.length; i++) {
						if (data[i].statutTechnique == null) {
							data[i].statutTechnique = { id: 0 };
						}
					}
					//console.log(data);
					this.dataSourceODEvTechnique = new MatTableDataSource(data);
					//console.log("dateSourceEvTechnique : " + JSON.stringify(this.dataSourceODEvTechnique.data, null, 2));
				});
		}
		if (this.show == 4) {
			this.service
				.getAllOffreDeposeeEvalFinanciere(this.idao)
				.subscribe((data) => {
					this.ODevalFinanciere = data;
					this.dataSourceODEvFinanciere = new MatTableDataSource(
						data
					);
					//console.log("dateSourceODEvFinanciere : " + JSON.stringify(this.dataSourceODEvFinanciere.data, null, 2));
				});
		}
		if (this.show == 5) {
			this.service
				.getAllOffreDeposeeEvalFinale(this.idao)
				.subscribe((data) => {
					//console.log(data);
					for (var i = 0; i < data.length; i++) {
						data[i].noteFinale =
							this.service.PourcentageTechnique *
								data[i].noteTechnique +
							this.service.PourcentageFinancier *
								data[i].noteFinanciere;
					}
					this.ODevalFinale = data;
					this.dataSourceODEvFinale = new MatTableDataSource(data);
					//console.log("dateSourceODEvFinale : " + JSON.stringify(this.dataSourceODEvFinale.data, null, 2));
				});
		}
	}
	// ====================================================================
	//
	// ====================================================================
	onChangeofOptionsPerso($event) {
		for (var i = 0; i < this.personnel.length; i++) {
			if (this.personnel[i].id == $event.value) {
				this.participantName =
					this.personnel[i].nom + " " + this.personnel[i].prenom;
			}
		}
	}
	// ====================================================================
	//
	// ====================================================================
	onChangeofOptionsDivision($event) {
		for (var i = 0; i < this.typeBien1.length; i++) {
			if (this.typeBien1[i].id == $event.value) {
				this.divisionName = this.typeBien1[i].libelle;
			}
		}
	}
	// ====================================================================
	//
	// ====================================================================
	onChangeofOptionsService($event) {
		for (var i = 0; i < this.typeBien.length; i++) {
			if (this.typeBien[i].id == $event.value) {
				this.serviceName = this.typeBien[i].libelle;
			}
		}
	}
	// ====================================================================
	//
	// ====================================================================
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

	getUpdatedUrl() {
		
	
			let url = "./assets/doc/feuille de présence commission.docx";
			window.open(url, "_blank");
		

	

	}
	// ====================================================================
	//
	// ====================================================================
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
			commission: { id: 1 },
		};
		this.PIDatasource.push(this.createNewPI());
		this.dataSourcePI = new MatTableDataSource(this.PIDatasource);
		//console.log("dataSourcPI particip intern  : " + JSON.stringify(this.dataSourcePI, null, 2));
	}
	// ====================================================================
	//
	// ====================================================================
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
	// ====================================================================
	//
	// ====================================================================
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
		};

		//this.formDataPE={"role":{"id":1},"commission":{"id":11},"personneExterne":{"id":1}};
		this.dataSourcePE = new MatTableDataSource(this.ParticipantsExternes);
		//console.log("particip externe :: " + JSON.stringify(this.dataSourcePE.data, null, 2));
	}
	// ====================================================================
	//
	// ====================================================================
	createNewPE(): PE {
		//console.log("TABLEAU PE : " + JSON.stringify(this.ParticipantsExternes, null, 2));
		return {
			id: this.incriPE++,
			nomComplet:
				this.ParticipantsExternes[0].nom +
				" " +
				this.ParticipantsExternes[0].prenom,
			organisme: this.ParticipantsExternes[0].organisme,
			tele: this.ParticipantsExternes[0].tele,
			role: this.roleName,
			present: null,
			justif: "",
		};
	}
	// ====================================================================
	//
	// ====================================================================
	nouvelleLigne() {
		//document.getElementById("frmLigne").style.display = "inline-table";
		this.commissionShowForm = 1;
	}
	// ====================================================================
	//
	// ====================================================================
	AddMarche() {
		this.router.navigate(["/marches/marche-form"], {
			queryParams: { id: this.idao, idO: this.OffreAdjucataire.id },
		});
	}
	// ====================================================================
	//
	// ====================================================================
	populate() {
		this.service.getAoById(this.idao).subscribe((data) => {
			if (data.isferme == true) {
				this.adjucataire = 1;
				this.AddCommissionShow = 0;
				this.service
					.getOffreDeposeeAdjucataire(this.idao)
					.subscribe((data) => {
						this.OffreAdjucataire = data[0];
						//console.log(this.OffreAdjucataire);
					});
			}
		});
		this.service.getAllCommissionByAo(this.idao).subscribe((data) => {
			this.commissionDatasource = [];
			this.commissions = data;
			this.ds1Size = this.commissions.length;
			 var x = this.commissions.length + 1;
			// this.formDataCommssion.typeCommission.id = x;
			this.formDataCommssion.typeCommission.id
			
			// for (let i = 0; i < this.typeCommissionAll.length; i++) {
			// 	if (this.typeCommissionAll[i].id == x) { 
			// 		this.formDataCommssion.typeCommission.libelle =
			// 			this.typeCommissionAll[i].libelle;
			// 	}
			// }

			this.onChangeofTypeCommission(this.formDataCommssion.typeCommission.id);
			for (let i = 0; i < this.commissions.length; i++) {
				this.commissionDatasource.push(this.createNewLigne(i));
			}
			//console.log("Commission data source : " + this.commissionDatasource);
			this.dataSource = new MatTableDataSource(this.commissionDatasource);
			
		});
	}
	// ====================================================================
	//
	// ====================================================================
	createNewLigne(i: number): Commission {
		return {
			id: this.commissions[i].id,
			type: this.commissions[i].typeCommission.libelle,
			dateOuverture: this.commissions[i].dateOuveture,
		};
	}
	// ====================================================================
	//
	// ====================================================================
	showCommission(idcomm) {
		this.router.navigate(["/marches/commission-detail"], {
			queryParams: { id: idcomm },
		});
	}
	// ====================================================================
	//
	// ====================================================================
	AdjucataireCalcule() {
		var ord = 0;
		var x = this.ODevalFinale[0].noteFinale;
		for (var i = 1; i < this.ODevalFinale.length; i++) {
			if (x < this.ODevalFinale[i].noteFinale) {
				ord = i;
				this.OffreAdjucataire = this.ODevalFinale[i];
			}
		}
		this.dataSourceODEvFinale.data[ord].adjucataire = true;
		this.service.getAoById(this.idao).subscribe((data) => {
			data.isferme = true;
			this.service.sendao(data).subscribe((d) => {});
		});
	}
	// ====================================================================
	//
	// ====================================================================
	AdjucataireMoinsDisant() {
		this.dataSourceODEvFinanciere.data[this.ordre].adjucataire = true;
		this.service.getAoById(this.idao).subscribe((data) => {
			data.isferme = true;
			this.service.sendao(data).subscribe((d) => {});
		});
	}
	// ====================================================================
	//
	// ====================================================================
	onSubmit(form: NgForm) {
		this.formDataCommssion.ao.id = this.idao;
		
		//console.log("Form data : " + JSON.stringify(this.formDataCommssion, null, 2));
		this.service.sendCommission(this.formDataCommssion).subscribe((res) => {
			this.idCommission = res.id;
			//console.log("Commission data : " + JSON.stringify(res, null, 2));
			if (this.ParticipantsInternes != null)
				for (var i = 0; i < this.ParticipantsInternes.length; i++) {
					//console.log(this.ParticipantsInternes[i]);
					this.ParticipantsInternes[i].commission.id = res.id;
					this.ParticipantsInternes[i].present =
						this.dataSourcePI.data[i].present;
					this.ParticipantsInternes[i].justif =
						this.dataSourcePI.data[i].justif;
				}
			if (
				this.service.ModePassationAo == "Mieux disant" &&
				this.show == 5
			) {
				this.adjucataire = 1;
				this.AdjucataireCalcule();
			}
			if (
				this.service.ModePassationAo == "moins disant" &&
				this.show == 4
			) {
				this.adjucataire = 1;
				this.AdjucataireMoinsDisant();
			}
			if (this.show == 1) {
				this.service
					.sendOffreDeposee(this.dataSourceOD.data)
					.subscribe((resultOD) => {
						//console.log(resultOD);
						this.populate();
					});
			}

			if (this.show == 2) {
				this.service
					.sendOffreDeposee(this.dataSourceODEvAdmin.data)
					.subscribe((resultOD) => {
						//console.log(resultOD);
						this.populate();
					});
			}

			if (this.show == 3) {
				this.service
					.sendOffreDeposee(this.dataSourceODEvTechnique.data)
					.subscribe((resultOD) => {
						//console.log(resultOD);
						this.populate();
					});
			}

			if (this.show == 4) {
				this.service
					.sendOffreDeposee(this.dataSourceODEvFinanciere.data)
					.subscribe((resultOD) => {
						//console.log(resultOD);
						this.populate();
					});
			}

			if (this.show == 5) {
				this.service
					.sendOffreDeposee(this.dataSourceODEvFinale.data)
					.subscribe((resultOD) => {
						//console.log(resultOD);
						this.populate();
					});
			}
			if (this.ParticipantsInternes != null)
				this.service
					.sendPICommission(this.ParticipantsInternes)
					.subscribe((result) => {
						this.ParticipantsInternes = [];
						this.PIDatasource = [];
						this.dataSourcePI = new MatTableDataSource([]);
					});
			//console.log("Participants externes : " + JSON.stringify(this.ParticipantsExternes, null, 2));



			

			this.service
				.sendPE(this.ParticipantsExternes)
				.subscribe((resultat) => {
					//console.log("PE resultat : // " + JSON.stringify(resultat, null, 2));
					//console.log("id commission :: " + this.idCommission)
					//console.log("PE 1 : // " + JSON.stringify(this.dataSourcePE.data, null, 2));
					for (var j = 0; j < resultat.length; j++) {
						this.dataSourcePE.data[j].commission.id =
							this.idCommission;
						this.dataSourcePE.data[j].personneExterne.id =
							resultat[j].id;
						//this.dataSourcePE.data[j].role.id = resultat[j].id;
						//console.log("Loop : // " + JSON.stringify(this.dataSourcePE.data[j], null, 2));
					}
					this.service
						.sendPECommission(this.dataSourcePE.data)
						.subscribe((re) => {
							//console.log("Final data PE : // " + JSON.stringify(re, null, 2));
							this.ParticipantsExternes = [];
							this.dataSourcePE = new MatTableDataSource([]);
						});
				});





			this.showRadio = 0;
			this.show = 0;
			this.commissionShowForm = 0;
			//document.getElementById("frmLigne").style.display = "none";
			this.formDataCommssion = {
				dateOuveture: null,
				typeCommission: { id: 1, libelle: "" },
				ao: { id: 1 },
			};
		});
	}
	// ====================================================================
	//
	// ====================================================================
	ChangeAdjucataireAo() {
		if (this.service.ModePassationAo == "moins disant") {
			this.service
				.getOffresDeposeeNonAdjucataire(this.idao)
				.subscribe((d) => {
					var calc = 0;
					for (var i = 0; i < d.length; i++) {
						if (
							d[i].noteFinanciere <
							this.OffreAdjucataire.noteFinanciere
						) {
							calc = calc + 1;
							var offre1 = d[i];
						}
					}
					if (calc == 1 || calc == 0) {
						//console.log(calc);
						this.showSwitch = false;
					}
					if (calc != 0) {
						for (var i = 0; i < d.length; i++) {
							if (
								d[i].noteFinanciere >= offre1.noteFinanciere &&
								d[i].noteFinanciere <
									this.OffreAdjucataire.noteFinanciere
							) {
								offre1 = d[i];
							}
						}
						this.OffreAdjucataire.adjucataire = false;
						var dsr = [this.OffreAdjucataire];

						offre1.adjucataire = true;
						var dsr1 = [offre1];
						this.service
							.sendOffreDeposeeAdj(dsr)
							.subscribe((resultOD) => {
								this.populate();
							});
						this.service
							.sendOffreDeposeeAdj(dsr1)
							.subscribe((resultOD) => {
								this.populate();
							});
					}
				});
			/*this.service.getAllOffreDeposeeEvalFinanciere(this.idao).subscribe(d=> {
		  console.log(d);
	   })*/
		}

		if (this.service.ModePassationAo == "Mieux disant") {
			var allOtherOffres;
			var ind = this.OffreAdjucataire.id;
			var ind2;
			this.service
				.getOffresDeposeeNonAdjucataire(this.idao)
				.subscribe((d) => {
					var calc = 0;
					for (var i = 0; i < d.length; i++) {
						if (
							d[i].noteFinale < this.OffreAdjucataire.noteFinale
						) {
							calc = calc + 1;
							var offre1 = d[i];
						}
					}

					if (calc == 1 || calc == 0) {
						//console.log(calc);
						this.showSwitch = false;
					}
					if (calc != 0) {
						for (var i = 0; i < d.length; i++) {
							if (
								d[i].noteFinale >= offre1.noteFinale &&
								d[i].noteFinale <
									this.OffreAdjucataire.noteFinale
							) {
								offre1 = d[i];
							}
						}
						this.OffreAdjucataire.adjucataire = false;
						var dsr = [this.OffreAdjucataire];

						offre1.adjucataire = true;
						var dsr1 = [offre1];
						this.service
							.sendOffreDeposeeAdj(dsr)
							.subscribe((resultOD) => {
								this.populate();
							});
						this.service
							.sendOffreDeposeeAdj(dsr1)
							.subscribe((resultOD) => {
								this.populate();
							});
					}
				});
		}
	}

	editCommission(id) {
		console.log("Commission : " + id);
		this.router.navigate(["/marches/commission-edit"], {
			queryParams: { id: id },
		});
	}
	// =================================================================
	//
	// =================================================================
	deletePI(row) {
		const index: number = this.dataSourcePI.data.indexOf(row);
		if (index != -1) {
			this.dataSourcePI.data.splice(index, 1);
		}
		this.dataSourcePI._updateChangeSubscription();
	}
	// =================================================================
	//
	// =================================================================
	deletePE(row) {
		const index: number = this.dataSourcePE.data.indexOf(row);
		if (index != -1) {
			this.dataSourcePE.data.splice(index, 1);
		}
		this.dataSourcePE._updateChangeSubscription();
	}
	// Print pv commission
	printPVCommission(idCommission, type) {
	//	console.log(type.substring(5, type.length))
		console.log(type)
	//	type = type.substring(6, type.length);

	
	if(type==="Etape finale"){
	
		this.service.pvCommissionfileGenerator(	"pvfinal/",	idCommission,this.idao).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: 'application/msword' 
				});
				const fileURL = URL.createObjectURL(file);
				window.open(fileURL);
				const readfile = URL.createObjectURL(file);
			const link = document.createElement("a");
				link.download = "pvfinal.docx";
			link.href = readfile;
			link.dispatchEvent(
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window,
				})
			);
			setTimeout(() => {
				window.URL.revokeObjectURL(readfile);
				link.remove();
			}, 100);
			},
			(err) => {
				console.log(err);
			});

	}
	else if(type==="Etape administrative"){
	
		this.service.pvCommissionfileGenerator(	"pvAdministratif/",	idCommission,this.idao).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: 'application/msword' 
				});
				const fileURL = URL.createObjectURL(file);
				window.open(fileURL);
				const readfile = URL.createObjectURL(file);
			const link = document.createElement("a");
				link.download = "certificat_administratif.docx";
			link.href = readfile;
			link.dispatchEvent(
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window,
				})
			);
			setTimeout(() => {
				window.URL.revokeObjectURL(readfile);
				link.remove();
			}, 100);
			},
			(err) => {
				console.log(err);
			});

	}
		else  if(type==="Etape d'ouverture des plis"){
	
			this.service.pvCommissionfileGenerator(	"pvCommissionOuverturePlis/",	idCommission,this.idao).subscribe(
				(res) => {
					const file = new Blob([res as unknown as BlobPart], {
						type: 'application/msword' 
					});
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
					const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
					link.download = "ouverture des plis.docx";
				link.href = readfile;
				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				setTimeout(() => {
					window.URL.revokeObjectURL(readfile);
					link.remove();
				}, 100);
				},
				(err) => {
					console.log(err);
				});

		}	else if(type==="Etape technique"){
	
			this.service.pvCommissionfileGenerator(	"pvCommissionofferTechnique/",	idCommission,this.idao).subscribe(
				(res) => {
				const file = new Blob([res as unknown as BlobPart], {
						type: 'application/msword' 
					});
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
					const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "technique offre technique.docx";
				link.href = readfile;
				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				},
				(err) => {
					console.log(err);
				});

		}
			else if(type==="Etape financière"){
	
			this.service.pvCommissionfileGenerator(	"pvCommissionFinance/",	idCommission,this.idao).subscribe(
				(res) => {
					const file = new Blob([res as unknown as BlobPart], {
						type: 'application/msword'  
					});
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
					const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
					link.download = "commission financière  marche.docx";
				link.href = readfile;
				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				setTimeout(() => {
					window.URL.revokeObjectURL(readfile);
					link.remove();
				}, 100);
				},
				(err) => {
					console.log(err);
				});

		}
		
	}
		// Print pv commission
		printLettreComplement(idCommission, type) {
			//	console.log(type.substring(5, type.length))
				console.log(type)
			//	type = type.substring(6, type.length);
		
			
			
			
				this.service.pvCommissionfileGenerator(	"LettreComplement/",	idCommission,this.idao).subscribe(
					(res) => {
						const file = new Blob([res as unknown as BlobPart], {
							type: 'application/msword' 
						});
						const fileURL = URL.createObjectURL(file);
						window.open(fileURL);
						const readfile = URL.createObjectURL(file);
					const link = document.createElement("a");
						link.download = "pvfinal.docx";
					link.href = readfile;
					link.dispatchEvent(
						new MouseEvent("click", {
							bubbles: true,
							cancelable: true,
							view: window,
						})
					);
					setTimeout(() => {
						window.URL.revokeObjectURL(readfile);
						link.remove();
					}, 100);
					},
					(err) => {
						console.log(err);
					});
		
			
				
			}
}

export interface Commission {
	id: string;
	type: string;
	dateOuverture: string;
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
