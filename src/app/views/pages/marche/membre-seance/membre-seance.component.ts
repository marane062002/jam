import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormArray, FormControl, NgForm } from "@angular/forms";
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from "@angular/material";
import { AoService } from "../../shared/ao.service";
import { PersonnelService } from "../../rh/services/personnel.service";
import { OrganisationService } from "../../organisation/organisation.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { Page } from "../../utils/pagination/page";
import { CustomPaginationService } from "../../utils/pagination/services/custom-pagination.service";

@Component({
	selector: "kt-membre-seance",
	templateUrl: "./membre-seance.component.html",
	styleUrls: ["./membre-seance.component.scss"],
})
export class MembreSeanceComponent implements OnInit {
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
	displayedColumnsPI = ["nom", "role", "present",
		"justif",
		"actions"];
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
	dataSourcePI: MatTableDataSource<PI>;
	dataSourcePE: MatTableDataSource<any>;
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
	constructor(    private paginationService: CustomPaginationService,

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
		ao: { id: 1 },
	};
	ParticipantsExternes = [];
	ParticipantsExternesED = [];
	formDataPE = {
		nom: "",
		prenom: "",
		cin: "",
		tele: "",
		organisme: "",
		roleCommission: { id: 1 },
		role: { id: 1 },
		ao: { id: 1 },
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

	roleCommissionAllExterne;
	
	roleCommissionAllInterne
	eventEditForm: FormGroup;
	public toggleForm: boolean;
	name
	page: Page<any> = new Page();

	// ====================================================================
	//
	// ====================================================================
	ngOnInit() {
		this.paginationService.currentMessage.subscribe((message) => {
			this.page = message;
		});
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
		this.service.getRoleCommissionByEtatRole('INTERNE').subscribe((data) => {
			this.roleCommissionAllInterne = data;
		});
			this.service.getRoleCommissionByEtatRole('EXTERNE').subscribe((data) => {
			this.roleCommissionAllExterne = data;
		});
		this.service.getAllOffreDeposee(this.idao,0,1).subscribe((data) => {
			/*  for (var i = 0; i <data.length ; i++) {
		data[i].commission={"id":1}
	 }*/

			// this.dataSourceOD = new MatTableDataSource(data);

			//console.log("dateSourceOD : " + JSON.stringify(this.dataSourceOD.data, null, 2));
		});
		this.populate();
		this.getDataEx();
		this.getDataIn();

	}
	data_sizeEX
	getDataEx() {
		this.service.getPEbyEtatMembre('MEMBRE_NON_TECHNIQUE',this.idao).then((res) => {
			this.data_sizeEX=res.totalElements

			this.dataSourcePE = res.content
			this.ParticipantsExternes = res.content
			
		})

	}
	public getNextPageEX(): void {
        //console.log("Filter : " + this.dataSource.filter)
        
        this.page.pageable = this.paginationService.getNextPage(this.page);
        this.getDataEx();
    }

    public getPreviousPageEX(): void {
        this.page.pageable = this.paginationService.getPreviousPage(this.page);
        this.getDataEx();
    }

    public getPageInNewSizeEX(pageSize: number): void {
        
        this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
        this.getDataEx();
    }
	handlePageEventEX(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		this.service.getPEbyEtatMembrePagination('MEMBRE_NON_TECHNIQUE',this.idao,pageIndex, pageSize).subscribe((res: any) => {
			this.data_sizeEX=res.totalElements

			this.dataSourcePE = res.content
			this.ParticipantsExternes = res.content
		})

	}
	handlePageEvent(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		this.service.getPIbyEtatMembrePagination('MEMBRE_NON_TECHNIQUE',this.idao,pageIndex, pageSize).subscribe((res: any) => {
			res.content.forEach((item, index) => {
				this.service1.getPersonnelById(res.content[index].idPersonnel).then((data) => {
					item.name = data.nom + " " + data.prenom;
					item.present = res.content[index].present
					item.justif = res.content[index].justif
				});
			});
			this.ParticipantsInternes = res.content
			this.data_size = res.totalElements;
			this.dataSourcePI = new MatTableDataSource(this.ParticipantsInternes);
			// this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
			// this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
			// this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
			// this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
			// this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
			// this.dataSource.paginator = this.paginator;
			// this.dataSource.sort = this.sort;
		})

	}
	data_size
	getDataIn() {
		this.service.getPIbyEtatMembre('MEMBRE_NON_TECHNIQUE',this.idao).then((res:any) => {
			this.data_size=res.totalElements
			res.content.forEach((item, index) => {
				this.service1.getPersonnelById(res.content[index].idPersonnel).then((data) => {
					item.name = data.nom + " " + data.prenom;
					item.present = res.content[index].present
					item.justif = res.content[index].justif
				});
			});
			this.page=res.content
			this.ParticipantsInternes = res.content
			this.PIDatasource = res.content;

			this.dataSourcePI = new MatTableDataSource(this.PIDatasource);

		})

	}
	public getNextPage(): void {
        //console.log("Filter : " + this.dataSource.filter)
        
        this.page.pageable = this.paginationService.getNextPage(this.page);
        this.getDataIn();
    }

    public getPreviousPage(): void {
        this.page.pageable = this.paginationService.getPreviousPage(this.page);
        this.getDataIn();
    }

    public getPageInNewSize(pageSize: number): void {
        
        this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
        this.getDataIn();
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
		// this.dataSourceOD.filter = filterValue;
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

	// ====================================================================
	//
	// ====================================================================

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

		this.ParticipantsInternes.forEach((item, index) => {
			if (item.idPersonnel != undefined) {

				this.service1.getPersonnelById(item.idPersonnel).then((data) => {
					this.service.getRoleCommissionById(item.role.id).subscribe((data) => {
						//console.log("Role Commision by ID : " + idRoleC + " /n/r INFO :" + JSON.stringify(data, null, 2));
						item.role = data;
					});
					item.nom = data.nom + " " + data.prenom;
					// item.present=item.present
					item.justif = ""
				});
				//console.log("particip intern : " + JSON.stringify(this.ParticipantsInternes, null, 2));
				// var x = this.ParticipantsInternes;
				//this.participantInterne = { role: { id: 1 }, commission: { id: 11 } };
				this.participantInterne = {
					idDivision: "",
					idService: "",
					idPersonnel: "",
					role: { id: 1 },
					ao: { id: 1 },
				};

				//  this.PIDatasource.push(this.createNewPI());
				this.dataSourcePI = new MatTableDataSource(this.ParticipantsInternes);

				//console.log("dataSourcPI particip intern  : " + JSON.stringify(this.dataSourcePI, null, 2));
			}

		});

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
		
		this.ParticipantsExternes.forEach((item, index) => {
			if (item.nom != undefined) {
				this.service.getRoleCommissionById(item.role.id).subscribe((data) => {
					//console.log("Role Commision by ID : " + idRoleC + " /n/r INFO :" + JSON.stringify(data, null, 2));
					item.role = data;
				});
			
		this.formDataPE = {
			nom: "",
			prenom: "",
			cin: "",
			tele: "",
			organisme: "",
			roleCommission: { id: 1 },
			role: { id: 1 },
			ao: { id: 1 },
			personneExterne: { id: 1 },
		};

		//this.formDataPE={"role":{"id":1},"commission":{"id":11},"personneExterne":{"id":1}};
		this.dataSourcePE = new MatTableDataSource(this.ParticipantsExternes);
		//console.log("particip externe :: " + JSON.stringify(this.dataSourcePE.data, null, 2));
	}
})
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

			// this.onChangeofTypeCommission(this.formDataCommssion.typeCommission.id);
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
	onSubmit(form: NgForm) {
		this.formDataCommssion.ao.id = this.idao;
		this.dataSourcePI.data

		//console.log("Form data : " + JSON.stringify(this.formDataCommssion, null, 2));
		// this.service.sendCommission(this.formDataCommssion).subscribe((res) => {
		// this.idCommission = res.id;
		//console.log("Commission data : " + JSON.stringify(res, null, 2));
		if (this.ParticipantsInternes != null)
		
			this.ParticipantsInternes.forEach((item, index) => {
				item.ao.id = this.idao;
				item.present = this.dataSourcePI.data[index].present
				item.justif = this.dataSourcePI.data[index].justif
				item.etatMembre = 'MEMBRE_NON_TECHNIQUE'

			});




		if (this.ParticipantsInternes != null)

			this.service
				.sendPICommission(this.ParticipantsInternes)
				.subscribe((result) => {
					this.getDataIn();
					// location.reload()
					// this.ParticipantsInternes = [];
					// this.PIDatasource = [];
					// this.dataSourcePI = new MatTableDataSource([]);
				});
		//console.log("Participants externes : " + JSON.stringify(this.ParticipantsExternes, null, 2));




		if (this.ParticipantsExternes != null)
			
		this.ParticipantsExternes.forEach((item, index) => {
			
			item.ao.id = this.idao;

			item.etatMembre = 'MEMBRE_NON_TECHNIQUE'
		});
		if (this.ParticipantsExternes != null || this.ParticipantsExternes.length!=0)
			var objectsWithoutId: any = this.ParticipantsExternes.filter(obj => !obj.hasOwnProperty('id')); 
		this.ParticipantsExternes = objectsWithoutId;

		
		this.service
			.sendPE(this.ParticipantsExternes)
			.subscribe((resultat) => {
				//console.log("PE resultat : // " + JSON.stringify(resultat, null, 2));
				//console.log("id commission :: " + this.idCommission)
				//console.log("PE 1 : // " + JSON.stringify(this.dataSourcePE.data, null, 2));
				var objectsWithoutIdComm: any = this.dataSourcePE.data.filter(obj => !obj.hasOwnProperty('id')); 
				this.dataSourcePE.data = objectsWithoutIdComm;
				for (var j = 0; j < resultat.length; j++) {
					this.dataSourcePE.data[j].ao.id =
						this.idao;
					this.dataSourcePE.data[j].personneExterne.id =
						resultat[j].id;
					//this.dataSourcePE.data[j].role.id = resultat[j].id;
					//console.log("Loop : // " + JSON.stringify(this.dataSourcePE.data[j], null, 2));
				}
				this.service
					.sendPECommission(this.dataSourcePE.data)
					.subscribe((re) => {
						this.getDataEx();
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
		// });
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


		if (type === "Séance finale") {

			this.service.pvCommissionfileGenerator("pvfinal/", idCommission, this.idao).subscribe(
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
		else if (type === "Séance administrative") {

			this.service.pvCommissionfileGenerator("pvAdministratif/", idCommission, this.idao).subscribe(
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
		else if (type === "Séance d'ouverture des plis") {

			this.service.pvCommissionfileGenerator("pvCommissionOuverturePlis/", idCommission, this.idao).subscribe(
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

		} else if (type === "Séance technique") {

			this.service.pvCommissionfileGenerator("pvCommissionofferTechnique/", idCommission, this.idao).subscribe(
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
		else if (type === "Séance financière") {

			this.service.pvCommissionfileGenerator("pvCommissionFinance/", idCommission, this.idao).subscribe(
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




		this.service.pvCommissionfileGenerator("LettreComplement/", idCommission, this.idao).subscribe(
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
