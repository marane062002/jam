import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSelectChange, MatSort, MatTableDataSource } from "@angular/material";
import { AoService } from "../../shared/ao.service";
import { OrganisationService } from "../../organisation/organisation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SpinnerService } from "../../utils/spinner.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { finalize } from "rxjs/operators";
import Swal from "sweetalert2";
import { ProgrammeService } from "../../shared/ProgrammeService";
import { ConventionMarcheService } from "../../shared/conventionService";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import * as $ from "jquery";
import { of } from "rxjs";
import { includes } from "lodash";
import { ConsultationArchitecturalService } from "../../shared/consultation-architectural.service";
import { environment } from "../../../../../environments/environment";
import { EditLotAoComponent } from "../dialog-forms/edit-lot-ao/edit-lot-ao.component";
import { NotificationService } from "../../shared/notification.service";
import { NotificationType } from "../../shared/NotificationMessage.service";
import { GestionDesTypesAoService } from "../../parametrage/Services/gestion-des-types-ao.service";
import { GestionClassificationService } from "../../parametrage/Services/gestion-classification.service";
import { GestionQualificationService } from "../../parametrage/Services/gestion-qualification.service";
import { EditLotMarcheComponent } from "../dialog-forms/edit-lot-marche/edit-lot-marche.component";

@Component({
	selector: "kt-ao-consultation-edit",
	templateUrl: "./ao-consultation-edit.component.html",
	styleUrls: ["./ao-consultation-edit.component.scss"],
})
export class AoConsultationEditComponent implements OnInit {
	estimation: number;
	typePrestation: number;
	checkLang: string;
	backPage = 0;
	isVisible10 = false;
	isSelected10: false;

	isVisible: any;

	isVisible3: any;
	isSelected: boolean = true;

	isVisible4 = false;
	isSelected4: false;
	isVisible9;
	isVisible5 = false;
	isSelected5: boolean = false;

	isVisible6 = false;
	isSelected6: boolean = false;
	typeAo;
	listConvention;
	projet = "";
	typePresAoChoosed = "";
	idProgramme = "";

	arabicPattern = /^[\u0600-\u06FF\s]+$/;

	// =========================================================================
	//
	// =========================================================================
	checked: boolean = false;
	checked11: boolean = false;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	ligneBPDatasource: LigneBP[] = [];
	// =========================================================================
	//
	// =========================================================================
	displayedColumns = ["id", "numPrix", "objet", "isForfait", "unite", "prixU", "quantite", "totalHt"];
	dataSource: MatTableDataSource<LigneBP>;
	// =========================================================================
	//
	// =========================================================================
	constructor(private serviceClassification: GestionClassificationService, private serviceQualification: GestionQualificationService, private serviceTypeAo: GestionDesTypesAoService,private cdr: ChangeDetectorRef, private notification: NotificationService, private serviceConsultationArchitectural: ConsultationArchitecturalService, private service: AoService, private service2: OrganisationService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private spinnerService: SpinnerService, private translate: TranslateService, private programmeService: ProgrammeService, private conventionMarcheService: ConventionMarcheService) {
		this.checkLang = window.localStorage.getItem("language");
	}
	lotData = {
		id: "",
		numLot: "",
		objetFr: "",
		objetAr: "",
		budget: "",
		caution: "",
		ao: { id: "" },
	};
	lotForm = {
		id: "",
		montantOffreFinanciere: "",
		montantEstimationMO: "",
		objet: "",
		attributaire: "",
		marche: { id: "" },
	};
	divisions;
	services;
	dataSource1: MatTableDataSource<any>;
	displayedColumns1 = ["type", "nomDoc", "actions"];
	displayedColumns2 = ["type", "label", "nomDoc", "dow", "actions"];
	formPj = { type: { id: "" }, selecetedFile: {}, label: "" };
	allpjs = [];
	showAddDoc = false;
	unites;
	typeBien = [
		{ id: 1, libelle: "service1" },
		{ id: 2, libelle: "service2" },
	];
	typeBien1 = [
		{ id: 1, libelle: "division 1" },
		{ id: 2, libelle: "division 2" },
	];
	data = [{ label: "Envoyer au service marché", checked: false }];
	dataExistenceVisite = [{ label: "Existence des visites des lieux", checked: false }];
	bool;
	idao;
	lignes;
	formDataBP;
	pjsCps;
	pjsRc;
	typeMarcheAll;
	natureAoAll;
	selectedValuePac;
	selectedValueConvention;
	selectedValueQualification;
	selectedValueEchantillon;
	selectedValueVisiteLieux;
	selectedValueClassification;
	selectedValueTypeAo;
	typeConsultationArchitecturale;
	formData = { 
		offreTechnique: '0',

		typeConsultationArchitecturale: "",
		typeBudget: "",
		statutAoValide: "",
		is_en_attente_de_validation: false,

		creationDate: null,
		// updateDate: null,
		createurUser: "",
		etatCommentaire: "",
		formule: "",
		taxeTVA: 0,
		estimationHT: 0,
		refDeAppelOffre: 0,
		agrements: [],
		adresseEchantillon: "",

		id: 0,
		typeMarche: { id: "" },
		typePrestation: { id: 0},
		natureAo: { id:0 },
		statutAo: { id: 1, libelle: "" },
		pfinancier: 0,
		ptechnique: 0,
		modePassation: "",
		classification: { id: "" },
		// allotissement: "",
		seuilMinimal: 0,
		caution: 0,
		dateOuverturePlis: null,
		dateEchantillon: null,
		dateVisite: null,

		dateReception: null,
		serviceGestionnaire: 0,
		division: 0,
		descriptif: "",
		autres: "",
		budgetEstimatif: 0,
		objet: "",
		objetAR: "",
		estimation: 0,
		typeAo: { id: 1, libelle: "" },
		naturePrix: "",
		loi: "",
		PrixRevisable: "",

		service: 0,
		// modificateurUser: "",
		existanceVisite: false,
		Traitement: "",
		existQualification: false,
		existClassification: false,
		existEchantillon: false,
		existanceAgrement: false,
		existTypeAo: false,
		// existanceAllotisse: "",
		qualification: { id: "" },
		programme: { id: "" },
		// consultationArchitecturale: { id: "" },

		convention: { id: "" },
		codeProjet: "",
		codeOrientationStrategique: "",
		adresseVisite: "",
		traitementVisite: "",

		sendToServiceMarche: false,
	};
	dataSource2: MatTableDataSource<any>;
	typesAO;
	ListeQualifications;

	naturePrix = ["Prix révisable", "Non révisable"]; // Révisable = (1% des intérêt moratoires + 3% ..) (+4%)
	loi = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
	fromesLivarison = ["العرض الأدنى", "العرض الأفضل"];
	codeOrientations = ["A", "B", "C", "D", "E", "F", "G", " H", "I", " J", "K", "L", "M", "N", " O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", " Y", "Z"];
	lisTypePrestationAo;
	listprogramme;
	listSousTypePrestationAo;
	modePassation = ["Appel d’offres ouvert ", "Appel d’offres restreint", "Concours architectural ", "Consultation architecturale ", "Appel à manifestation d’intérêt", "Autres"];

	isVisible2: any;
	isVisible1: any;
	isVisible7: any;
	isVisible8: any;
	// =========================================================================
	//
	// =========================================================================
	pppp2;
	listAgrementMarche;
	selectedValueAgrement;
	classification;
	ListAgrement;
	isVisible11;
	objetCA = "";
	listConsultationArchitecturale;
	numCA;
	ao;
	modePassationList;

	ngOnInit() {
		this.service.getAllModePassationMarche().subscribe((res) => {
			this.modePassationList = res;
		});
		this.serviceQualification.getAll().then((res) => {
			this.ListeQualifications = res;
		});
		this.service.getAllAgrementMarche().subscribe((res) => {
			this.ListAgrement = res;
		});
		this.serviceTypeAo.getAll().then((res) => {
			this.typesAO = res;
		});
		this.service.getAllNatureAo().subscribe((data) => {
			this.natureAoAll = data;
		});
		this.serviceConsultationArchitectural.getAll2().subscribe((res) => {
			this.listConsultationArchitecturale = res;
		});
		// this.service.getAllAgrementMarche().subscribe((res) => {
		// 	this.listAgrementMarche = res;
		// });
		// this.formData.dateOuverturePlis = new Date();

		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});

		// this.getDivisions();

		this.service.getAlltypePjAo().subscribe((res) => {
			console.log(res);
			this.unites = res;
		});
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
			this.backPage = params["page"];
		});
		this.getAllPjImm(this.idao);
		this.service.getAllTypeMarche().subscribe((data) => {
			this.typeMarcheAll = data;
		});
		// this.service.getAllNatureAo().subscribe((data) => {
		// 	this.natureAoAll = data;
		// });

		this.service
			.getAoById(this.idao)
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			)
			.subscribe(
				(data) => {
					this.ao = data;
					this.formData.is_en_attente_de_validation = data.is_en_attente_de_validation;
					if(data.offreTechnique==false){
						this.formData.offreTechnique='0'
					}else{
						this.formData.offreTechnique='1'
					
					}
					this.formData.statutAoValide = data.statutAoValide;
					this.formData.typeBudget = data.typeBudget;

					this.formData.createurUser = data.createurUser;
					this.formData.formule = data.formule;
					this.formData.creationDate = data.creationDate;

					this.formData.etatCommentaire = data.etatCommentaire;

					this.formData.objet = data.objet;
					this.formData.id = data.id;
					this.formData.objetAR = data.objetAR;
					this.formData.estimation = data.estimation;
					this.formData.estimationHT = data.estimationHT;
					this.formData.taxeTVA = data.taxeTVA;
					this.formData.budgetEstimatif = data.budgetEstimatif;
					this.formData.caution = data.caution;
					if (data.convention != null) {
						if (data.convention.id != null) {
							this.selectedValueConvention = "1";

							this.isVisible3 = true;
							this.formData.convention = data.convention;
						} else {
							this.selectedValueConvention = "0";

							this.isVisible3 = false;
						}
					} else { 
						this.selectedValueConvention = "0";

						this.isVisible3 = false;
						this.formData.convention = { id: "" };
					}

					if (data.programme != null) {
						if (data.programme.id != null) {
							this.selectedValuePac = "1";
							this.isVisible = true;
							this.formData.codeOrientationStrategique = data.programme.codeOrientation;
							this.selectedCodeOrientation(this.formData.codeOrientationStrategique);

							this.formData.codeProjet = data.programme.codeProjet;
							this.projet = data.programme.nameProjet;
							this.selectedCodeProjet(this.formData.codeProjet);
						} else {
							this.selectedValuePac = "0";

							this.isVisible = false;
						}
					} else {
						this.selectedValuePac = "0";

						this.isVisible = false;
						this.formData.programme = { id: "" };
					}

					if (data.typePrestation != null) {
						if (data.typePrestation.id != null) {
							this.formData.typePrestation.id = data.typePrestation.id;
						}
					} else {
						this.formData.typePrestation = { id: 0 };
					}
					if (data.typeMarche != null) {
						if (data.typeMarche.id != null) {
							this.formData.typeMarche = data.typeMarche;
							if (data.typeMarche.id == 7) {
								this.typeConsultationArchitecturale = data.typeConsultationArchitecturale;

								this.isVisible11 = true;
								this.onChangeTypeMarche(data.typeMarche.id);
							}

							if (data.typeMarche.id == 6) {
								this.isVisible12 = true;
								this.onChangeTypeMarche(data.typeMarche.id);
								this.populateLotMarche();
							}
						}
					} else {
						this.formData.typeMarche = { id: "" };
					}

					if (data.natureAo != null) {
						if (data.natureAo.id != null) {
							if (data.natureAo.id == 6) {
								this.isVisible1 = true;
								this.formData.modePassation = data.modePassation;
								this.formData.natureAo.id = data.natureAo.id;
							} else {
								this.isVisible1 = false;
								this.formData.natureAo.id = data.natureAo.id;
							}
						} else {
							this.isVisible1 = false;
						}
					} else {
						this.isVisible1 = false;
						this.formData.natureAo = { id: 0 };
					}

					this.formData.naturePrix = data.naturePrix;

					if (data.naturePrix == "Prix révisable") {
						this.isVisible6 = true;
					} else {
						this.isVisible6 = false;
					}
					if (data.existQualification == true) {
						this.selectedValueQualification = "1";
						this.isVisible4 = true;
						if (data.existClassification == true) {
							this.isVisible9 = true;
							this.selectedValueClassification = "1";
							this.formData.classification.id = data.classification.id;
							this.formData.qualification.id = data.classification.qualificationAo.id;

							this.selectedListeQualifications(this.formData.qualification.id);
						} else {
							this.formData.classification = null;
							this.isVisible9 = false;

							this.selectedValueClassification = "0";
						}
					} else {
						this.formData.qualification = null;
						this.formData.classification = null;
						this.isVisible4 = false;
						this.selectedValueQualification = "0";
					}

					if (data.existanceAgrement == false) {
						this.isVisible5 = false;

						this.selectedValueAgrement = "0";
					} else {
						this.selectedAgrementvalue = data.agrements;

						this.isVisible5 = true;
						this.selectedValueAgrement = "1";
					}

					if (data.existEchantillon == true) {
						this.formData.dateEchantillon = new Date(data.dateEchantillon).toISOString();
						this.formData.adresseEchantillon = data.adresseEchantillon;
						this.selectedValueEchantillon = "1";
						this.isVisible7 = true;
					} else {
						this.isVisible7 = false;
						this.selectedValueEchantillon = "0";
					}
					if (data.existanceVisite == true) {
						this.formData.dateVisite = new Date(data.dateVisite).toISOString();
						this.formData.adresseVisite = data.adresseVisite;
						this.formData.traitementVisite = data.traitementVisite;
						this.selectedValueVisiteLieux = "1";
						this.isVisible8 = true;
					} else {
						this.isVisible8 = false;
						this.selectedValueVisiteLieux = "0";
					}

					if (data.existTypeAo == true) {
						this.formData.typeAo = data.typeAo;
						this.isVisible2 = true;
						this.selectedValueTypeAo = "1";
					} else {
						this.selectedValueTypeAo = "0";
					}
					this.formMarche = {
						id:0,
						numMarche: "",
						objet: "",
						attributaire: "",
						modePassation: { id: 0 },
						formeMarche: "",
						montantEstimationMO: 0,
						montantOffreFinanciere: 0,
						mntAdjucataire: 0,
						cautionDefinitive: 0,
						prctRetenu:0,
						plafondRetenu:0,
						mntEngage:0,
						delaisExecution: "",
						imputationBudgetaire: "",
						dateDebutMarche: null,
						dateNotification: null,

						ao: { id: this.ao.id },
					};

					this.service.findMarcheByAo_Id(this.ao.id).subscribe((res) => {
						if (res == null) {
							this.formMarche = {
								id:0,
								numMarche: "",
								objet: "",
								attributaire: "",
								modePassation: { id: 0 },
								formeMarche: "",
								montantEstimationMO: 0,
								montantOffreFinanciere: 0,
								mntAdjucataire: 0,
								cautionDefinitive: 0,
								prctRetenu: 0,
								plafondRetenu: 0,
								mntEngage: 0,
								delaisExecution: "",
								dateDebutMarche: null,
								dateNotification: null,
								imputationBudgetaire: "",
								ao: { id: this.ao.id },
							};
						} else {
							this.formMarche.dateDebutMarche = new Date(res.dateDebutMarche).toISOString();
							this.formMarche.dateNotification = new Date(res.dateNotification).toISOString();
							this.formMarche.id=res.id;
							this.formMarche.numMarche = res.numMarche;
							this.formMarche.objet = res.objet;
							this.formMarche.attributaire = res.attributaire;
							this.formMarche.cautionDefinitive = res.cautionDefinitive;
							this.formMarche.prctRetenu = res.prctRetenu;
							this.formMarche.plafondRetenu = res.plafondRetenu;
							this.formMarche.mntEngage = res.mntEngage;
							this.formMarche.formMarche = res.formMarche;
							if(res.montantEstimationMO!=0 || res.montantOffreFinanciere!=0){
								this.isUnique=true
								this.formMarche.formMarche='UNIQUE'
							}
							this.formMarche.montantEstimationMO = res.montantEstimationMO;
							this.formMarche.montantOffreFinanciere = res.montantOffreFinanciere;
							this.formMarche.mntAdjucataire = res.mntAdjucataire;
							this.formMarche.delaisExecution = res.delaisExecution;
							this.formMarche.imputationBudgetaire = res.imputationBudgetaire;
							this.formMarche.ao = res.ao;
							;
							if (res.modePassation != null) {
								if(res.modePassation.id!=null){
									this.formMarche.modePassation.id = res.modePassation.id;

								}else{
									this.formMarche.modePassation = null;

								}
							} else {
								this.formMarche.modePassation = null;
							}
							this.marche = res;
							this.populateLot(res.id);
						}
					});
				},
				(err) => {
					console.log(err);
				}
			);
		// Liste des types prestation
		this.service.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
		this.conventionMarcheService.all().subscribe(
			(res) => {
				this.listConvention = res;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	selectedValueOffreTechnique(p1: any, p2: any) {
		if(p2 == true){
			p2="1"
		}
		if(p2==false){
			p2="0"
		}
		if (p1 && p2) {
			return p1 === p2;
		}

		return false;
	}
	onChangeEstimation(){
		if(this.formData.natureAo.id==33467 && this.formData.typePrestation.id==1 && this.formData.estimationHT>10000000){
			
			Swal.fire({
				position: "center",
				icon: "warning",
				title: "le montant de l'estimation HT doit etre inférieur ou égale à 10.000.000 dhs, H.T",
				showConfirmButton: false,
				timer: 2500,
			}).then((res)=>{
				
			});
		}
		if(this.formData.natureAo.id==33467 ){
			if( this.formData.typePrestation.id==2 || this.formData.typePrestation.id==3){
				if(this.formData.estimationHT>1000000){
					
					Swal.fire({
						position: "center",
						icon: "warning",
						title: " le montant doit etre inférieur ou égale à 1.000.000,00 dhs, H.T",
						showConfirmButton: false,
						timer: 2500,
					}).then((res)=>{
						

					});;
				}
			}
			
		}
		if(this.formData.natureAo.id==33468 && this.formData.typePrestation.id==1 && this.formData.estimationHT>10000000){
			
			Swal.fire({
				position: "center",
				icon: "warning",
				title: " le montant de l'estimation HT doit etre supérieure à 10.000.000,00 dbs H.T",
				showConfirmButton: false,
				timer: 2500,
			}).then((res)=>{
				

			});;
		}
		if(this.formData.natureAo.id==33468 ){
			if( this.formData.typePrestation.id==2 || this.formData.typePrestation.id==3){
				if(this.formData.estimationHT> 1000000){
					
					Swal.fire({
						position: "center",
						icon: "warning",
						title: " le montant de l'estimation HT doit etre supérieur à 1.000.000,00dhs H.T",
						showConfirmButton: false,
						timer: 2500,
					}).then((res)=>{
						

					});;
				}
			}
			
		}
		
	}
	CalculerEstimation(){
		const estimationHT=this.formData.estimationHT
		const taxeTVA=this.formData.taxeTVA

		const estimation=(estimationHT*taxeTVA/100)+estimationHT
		this.formData.estimation=estimation
	}
	isUnique = false;
	isAlloti = false;
	selectedFormMarche(e) {
		if (e.value == "UNIQUE") {
			this.formMarche.formeMarche = "UNIQUE";
			this.isUnique = true;
			this.isAlloti = false;
		}

		if (e.value == "ALLOTI") {
			this.formMarche.formeMarche = "ALLOTI";

			this.isAlloti = true;
			this.isUnique = false;
		}
	}
	idConsultationArchitecturale;
	// selectedConsultationArchitecturale(event: MatSelectChange) {
	// 	let a = typeof event;
	// 	let b;
	// 	if (a == "string") {
	// 		b = event;
	// 	} else {
	// 		b = event.value.numCA;
	// 	}
	// 	this.serviceConsultationArchitectural.getConsultationByNumCA(b).subscribe(
	// 		(res: any) => {
	// 			 this.objetCA = res.objetFR;
	// 			 this.formData.consultationArchitecturale.id = res.id;
	// 		},
	// 		(err) => {
	// 			console.log(err);
	// 		}
	// 	);
	// }
	onChangeTypeMarche(event) {
		if (event == 7) {
			this.isVisible11 = true;
		} else {
			this.isVisible11 = false;
		}
		if (event == 6) {
			this.isVisible12 = true;
		} else {
			this.isVisible12 = false;
		}
	}
	selectedAgrementvalue = [];
	selectedAgrementvalue1 = [];

	selectedAgrementList(event) {
		this.selectedAgrementvalue = event;

		for (let i = 0; i < this.selectedAgrementvalue.length; i++) {
			let a = this.selectedAgrementvalue1.includes(this.selectedAgrementvalue[i]);
			if (this.selectedAgrementvalue1.includes(this.selectedAgrementvalue[i]) == false) {
				this.service.getAgrementMarcheById(parseInt(this.selectedAgrementvalue[i])).subscribe((res) => {
					this.selectedAgrementvalue1.push(this.selectedAgrementvalue[i]);
					this.formData.agrements.push(res);
				});
			}
		}

		// this.formData.agrements.push(parseInt(event))
	}
	selectedNaturePrix(event) {
		if (event.value == "Prix révisable") {
			this.isVisible6 = true;
		} else {
			this.isVisible6 = false;
		}
	}
	classes;
	selectedListeQualifications(event) {
		if (Number(event)) {
			this.serviceClassification.findByIdQualification(event).subscribe((res) => {
				this.classes = res;
			});
		} else {
			this.serviceClassification.findByIdQualification(parseInt(event)).subscribe((res) => {
				this.classes = res;
			});
		}

		// if (event == "Laboratoires") {
		// 	this.classes = ["ETUDES GEOTECHNIQUES", "CONTROLE DE QUALITE", "EXPERTISE DE LABORATOIRE", "RECHERCHE-DEVELOPPEMENT", "INVESTIGATIONS MARITIMES", "QUALITE DE L'EAU ET DE L’ENVIRONNEMENT"];
		// }
		// if (event == "EAUX ET FORETS") {
		// 	this.classes = ["Travaux de reboisement, de régénération et d'amélioration sylvopastorale", "Travaux de conservation des eaux et des sols", "Travaux d'aménagement de pistes et chemins forestiers", "Travaux de production de plantes", "Travaux de récolte de liège"];
		// }
		// if (event == "AGRICULTURES") {
		// 	this.classes = ["Ouvrages principaux d'irrigation", "Puits et forages", "Equipement de l'irrigation à la parcelle", "Travaux de séguia et de pose de canaux portés", "Assainissement, drainage agricole et aménagements fonciers", "Pose de conduites d'irrigation", "Aménagement de pistes agricoles et rurales", "Matériel hydromécanique", "Matériel de pompage pour l'irrigation", "Travaux de plantation et de réhabilitation des arbres fruitiers et arbustes"];
		// }
		// if (event == "HABIAT") {
		// 	this.classes = ["Terrassements", "Travaux De Voirie", "Assainissement - Pose de conduites", "travaux d'électrification", "Assainissement, drainage agricole et aménagements fonciers", "Eau Potable", "Réseaux Téléphoniques", "Jardins - Espaces verts", "Gros-oeuvre", "Menuiserie bois - Charpente", "Menuiserie métallique, aluminium et en pvc", "Ascenseurs - Monte-charges", "Plomberie - Chauffage - Climatisation", "Electricité", "Téléphone - Sonorisation", "Peinture - Vitrerie", "Etanchéité - Isolation", "Carrelages - Revêtements", "Plâtrerie - Faux plafonds", "Construction en matériaux locaux ", "Equipement intérieur - Décoration", "Isolation frigorifique et chambres froides", "Professions artisanales", "Réhabilitation de bâtiments anciens"];
		// }
		// if (event == "EQUIPEMENT") {
		// 	this.classes = ["Construction", "Travaux routiers et voirie urbaine", "Eau potable - Assainissement - Conduites", "Construction d'ouvrages d'art", "Travaux maritimes et fluviaux", "Barrages et ouvrages hydrauliques y afférents", "Fondations spéciales, Drainage, Injections", "Sondages géotechniques et forages hydrogéologiques", "Equipements hydromécaniques - Traitement d'eau potable - Automatisme", "Électricité", "Courants faibles, traitement acoustique et audio-visuel", "Menuiserie – Charpente", "Plomberie - Chauffage - Climatisation", "Etancheite - Isolation", "Revetements", "Platrerie - Faux plafonds", "Peinture", "Travaux artisanaux de batiment", "Monte-charges - Ascenseurs", "Isolation frigorifique et construction de chambres froides", "Installation de cuisines et buanderies", "Amenagement d'espaces verts et jardins", "Reseaux des fluides industriels et medicaux, de gaz et d'air comprime", "Signalisation et equipements de securite"];
		// }
	}
	selectedVisiteLieux(event) {
		if (event.value == "1") {
			this.isVisible8 = true;
		} else {
			this.isVisible8 = false;
		}
	}
	selectedEchantillon(event) {
		if (event.value == "1") {
			this.formData.existEchantillon = true;
			this.isVisible7 = true;
		} else {
			this.formData.existEchantillon = false;

			this.isVisible7 = false;
		}
	}
	selectedmodePassation(event) {
		this.formData.natureAo.id = event;

		if (event == 6) {
			this.isVisible1 = true;
		} else {
			this.isVisible1 = false;
		}
	}
	selectedAgrement(event) {
		this.formData.agrements;

		if (event.value == "1") {
			this.isVisible5 = true;
		} else {
			this.isVisible5 = false;
		}
	}
	lotMarcheDataSource: any;

	openDialogLotMarche(): void {
		const dialogRef = this.dialog.open(EditLotAoComponent, {
			width: "600px",
			data: {
				id: "",
				numLot: "",
				objetFr: "",
				objetAr: "",
				budget: "",
				caution: "",
				ao: { id: this.idao },
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			console.log("Add lotFormData: " + JSON.stringify(res, null, 2));
			if (res) {
				this.service.sendLotMarcheData(res).subscribe(
					(data) => {
						this.populateLotMarche();
						this.notification.sendMessage({
							message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
							type: NotificationType.success,
						});
						this.lotData = {
							id: "",
							numLot: "",
							objetFr: "",
							objetAr: "",
							budget: "",
							caution: "",
							ao: { id: this.idao },
						};
					},
					(error) => {
						console.log(error);
					}
				);
			}
		});
	}
	lotMarche: any = [];

	openDialogLotMarcheForm(): void {
		const dialogRef = this.dialog.open(EditLotMarcheComponent, {
			width: "600px",
			data: {
				// id: "",
				attributaire: "",
				objet: "",
				montantEstimationMO: "",
				montantOffreFinanciere: "",
				// ao: { id: this.idao },
			},
		});

		dialogRef.afterClosed().subscribe((res) => {
			// console.log("Add lotFormData: " + JSON.stringify(res, null, 2));
			// if (res) {
			// 	;
			this.lotMarche.push(res);

			// 	this.lotData = {
			// 		// id: "",
			// 		numLot: "",
			// 		objetFr: "",
			// 		objetAr: "",
			// 		budget: "",
			// 		caution: "",
			// 		// ao: { id: this.idao },
			// 	};
			// }
		});
	}
	populateLotMarche() {
		this.service.getAllLotMarcheByAo(this.idao).subscribe(
			(result) => {
				this.lotMarcheDataSource = result;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	populateLot(id) {
		this.service.getAllLotFormByIdMarche(id).subscribe(
			(result) => {
				if (result.length != 0) {
					this.lotMarche = result;
					this.isAlloti = true;
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
	isVisible12;

	editLotMarche(idLot) {
		this.service.getLotMarcheById(idLot).subscribe(
			(result) => {
				this.lotData = result;
				const dialogRef = this.dialog.open(EditLotAoComponent, {
					width: "600px",
					data: {
						id: result.id,
						numLot: result.numLot,
						objetFr: result.objetFr,
						objetAr: result.objetAr,
						budget: result.budget,
						caution: result.caution,
						ao: { id: this.idao },
					},
				});
				dialogRef.afterClosed().subscribe((res) => {
					this.lotData.ao.id = res.ao.id;
					this.lotData.numLot = res.numLot;
					this.lotData.objetFr = res.objetFr;
					this.lotData.objetAr = res.objetAr;
					this.lotData.budget = res.budget;
					console.log("Lot: " + JSON.stringify(this.lotData, null, 2));
					if (this.lotData) {
						this.service.sendLotMarcheData(this.lotData).subscribe(
							(data) => {
								this.populateLotMarche();
								this.notification.sendMessage({
									message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
									type: NotificationType.success,
								});
								this.lotData = {
									id: "",
									numLot: "",
									objetFr: "",
									objetAr: "",
									budget: "",
									caution: "",
									ao: { id: this.idao },
								};
							},
							(error) => {
								console.log(error);
							}
						);
					}
				});
			},
			(error) => {
				console.log(error);
			}
		);
	}

	editLot(idLot) {
		this.service.getLotFormById(idLot).subscribe(
			(result) => {
				this.lotForm = result;
				const dialogRef = this.dialog.open(EditLotMarcheComponent, {
					width: "600px",
					data: {
						id: result.id,
						attributaire: result.attributaire,
						objet: result.objet,
						montantEstimationMO: result.montantEstimationMO,
						montantOffreFinanciere: result.montantOffreFinanciere,
						marche: { id: result.marche.id },
					},
				});
				dialogRef.afterClosed().subscribe((res) => {
					this.lotForm.marche.id = res.marche.id;
					this.lotForm.attributaire = res.attributaire;
					this.lotForm.objet = res.objet;
					this.lotForm.montantEstimationMO = res.montantEstimationMO;
					this.lotForm.montantOffreFinanciere = res.montantOffreFinanciere;
					console.log("Lot: " + JSON.stringify(this.lotForm, null, 2));
					if (this.lotForm) {
						this.service.sendLotMarcheForm(this.lotForm).subscribe(
							(data) => {
								this.populateLot(this.lotForm.marche.id);
								this.notification.sendMessage({
									message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
									type: NotificationType.success,
								});
								this.lotForm = {
									id: "",
									montantOffreFinanciere: "",
									montantEstimationMO: "",
									objet: "",
									attributaire: "",
									marche: { id: data.id },
								};
							},
							(error) => {
								console.log(error);
							}
						);
					}
				});
			},
			(error) => {
				console.log(error);
			}
		);
	}
	formMarche;
	marche;
	addMarche() {
		this.formMarche;
if(this.formMarche.id==0){
	this.service.CreateMarche(this.formMarche).subscribe((res) => {
		this.marche = res;
		this.lotMarche;
		if (this.lotMarche.length != 0) {
			for (let i = 0; i < this.lotMarche.length; i++) {
				let lot = {
					attributaire: this.lotMarche[i].attributaire,
					montantEstimationMO: this.lotMarche[i].montantEstimationMO,
					montantOffreFinanciere: this.lotMarche[i].montantOffreFinanciere,
					objet: this.lotMarche[i].objet,
					marche: { id: res.id },
				};
				this.service.sendLotMarcheForm(lot).subscribe(
					(data) => {},
					(error) => {
						console.log(error);
					}
				);
			}
		}
		Swal.fire({
			position: "center",
			icon: "success",
			title: "marché ajouté",
			showConfirmButton: false,
			timer: 1500,
		});
	});
}else{
	this.service.EditMarche(this.formMarche).subscribe((res) => {
		this.marche = res;
		this.lotMarche;
		if (this.lotMarche.length != 0) {
			for (let i = 0; i < this.lotMarche.length; i++) {
				let lot = {
					attributaire: this.lotMarche[i].attributaire,
					montantEstimationMO: this.lotMarche[i].montantEstimationMO,
					montantOffreFinanciere: this.lotMarche[i].montantOffreFinanciere,
					objet: this.lotMarche[i].objet,
					marche: { id: res.id },
				};
				this.service.sendLotMarcheForm(lot).subscribe(
					(data) => {},
					(error) => {
						console.log(error);
					}
				);
			}
		}
		Swal.fire({
			position: "center",
			icon: "success",
			title: "marché ajouté",
			showConfirmButton: false,
			timer: 1500,
		});
	});
}
		
	}
	selectedFormModePassation(e) {
		;
		this.formMarche.modePassation.id = e.value;
	}
	deleteLotMArche(idLot): void {
		Swal.fire({
			title: "Vouslez vous supprimer cet enregistrement ?",
			icon: "question",
			iconHtml: "؟",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service.deleteLotMarcheById(idLot).subscribe(
					(data) => {
						console.log("Lot Deleted  : " + idLot);
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500,
						});
						this.populateLotMarche();
					},
					(error) => {
						console.log(error);
					}
				);
			}
		});
	}
	selectedTypeBudget(event) {
		this.formData.typeBudget = event.value;
	}
	deleteLotForm(idLot): void {
		Swal.fire({
			title: "Vouslez vous supprimer cet enregistrement ?",
			icon: "question",
			iconHtml: "؟",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service.deleteLotFormById(idLot).subscribe(
					(data) => {
						console.log("Lot Deleted  : " + idLot);
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500,
						});
						this.populateLot(this.marche.id);
					},
					(error) => {
						console.log(error);
					}
				);
			}
		});
	}
	selectedQualification(event) {
		if (event.value == "1") {
			this.isVisible4 = true;
			this.formData.existQualification = true;
		} else {
			this.isVisible4 = false;
			this.formData.existQualification = false;
		}
	}
	selectedClassification(event) {
		if (event.value == "1") {
			this.isVisible9 = true;

			this.formData.existClassification = true;
		} else {
			this.isVisible9 = false;

			this.formData.existClassification = false;
		}
	}
	onChangeTypePrestationAo(f) {
		const type = f.value;

		this.formData.typePrestation.id = f.value;
		if (type != 0) {
			this.typePrestation = type;
			// Liste des sous types prestation
			this.service.getAllSoustypePresattaionAo(type).subscribe(
				(data) => {
					this.listSousTypePrestationAo = data;
				},
				(error) => console.log(error)
			);
		} else {
			this.listSousTypePrestationAo = null;
		}
	}
	onInputFocus4() {
		if (this.formData.refDeAppelOffre === 0) {
			this.formData.refDeAppelOffre = null; // Remove default value when clicking on the input field
		}
	}
	onInputBlur4() {
		if (this.formData.refDeAppelOffre === null || this.formData.refDeAppelOffre === undefined) {
			this.formData.refDeAppelOffre = 0; // Set the value back to 0 if left empty
		}
	}
	selectedReserve(event) {
		if (event.value == "1") {
			this.isVisible2 = true;
			this.formData.existTypeAo = true;
		} else {
			this.isVisible2 = false;
			this.formData.existTypeAo = false;
		}
	}
	async getAllPjImm(id) {
		await this.service.getAllPjAo(id).subscribe(
			(data) => {
				this.allpjs = data;
				this.dataSource2 = new MatTableDataSource(data);
			},
			(error) => console.log(error)
		);
	}
	selectedOffreTechnique(event){
		if (event.value == "1") {
			this.formData.offreTechnique ='1';
		} else {
			this.formData.offreTechnique = '0';

		}
	}
	selectedValuePAC(p1: any, p2: any) {
		if (p1 == p2) {
			return p1 === p2;
		}

		return false;
	}
	selectedPAC(event) {
		if (event.value == "1") {
			this.isVisible = true;
		} else {
			this.isVisible = false;
		}
	}
	selectedConvention(event) {
		if (event.value == "1") {
			this.isVisible3 = true;
		} else {
			this.isVisible3 = false;
		}
	}
	compareObjects(p1: any, p2: any) {
		if (p1 && p2) {
			return p1 === p2;
		}

		return false;
	}
	selectedAgrementvalueList(p1: any, p2: any) {
		let a = Number(p1);
		if (a && p2.id) {
			return a === p2.id;
		}

		return false;
	}
	selectedvaluemodePassation(p1: any, p2: any) {
		if (p1 && p2) {
			return p1 === p2;
		}

		return false;
	}
	selectedValueCodeOrientation(p1: any, p2: any) {
		if (p1 && p2) {
			return p1 === p2;
		}

		return false;
	}
	selectedListeClassification(p1: any, p2: any) {
		let a = Number(p1);

		if (a && p2) {
			return a === p2;
		}

		return false;
	}
	selectedQualifications(p1: any, p2: any) {
		let a = Number(p1);

		if (a && p2) {
			return a === p2;
		}

		return false;
	}
	selectedValuetypeMarche(p1: any, p2: any) {
		let a = Number(p1);

		if (a && p2) {
			return a === p2;
		}

		return false;
	}
	selectedValuetypeConsultationArchitecturale(p1: any, p2: any) {
		if (p1 && p2) {
			return p1 === p2;
		}

		return false;
	}
	selectedValuetypePrestation(p1: any, p2: any) {
		let a = Number(p1);

		if (a && p2) {
			return a === p2;
		}

		return false;
	}
	selectedValuetypeAo(p1: any, p2: any) {
		let a = Number(p1);

		if (a && p2) {
			return a === p2;
		}

		return false;
	}
	selectedValueConsultationArchitecturale(p1: any, p2: any) {
		if (p1.numCA && p2) {
			return p1.numCA === p2;
		}

		return false;
	}
	selectedValuenatureAo(p1: any, p2: any) {
		let a = Number(p1);

		if (a && p2) {
			return a === p2;
		}

		return false;
	}
	selectedValueCodeProjet(p1: any, p2: any) {
		if (p1 && p2) {
			return p1 === p2;
		}

		return false;
	}
	selectedValuenaturePrix(p1: any, p2: any) {
		if (p1 && p2) {
			return p1 === p2;
		}

		return false;
	}
	// onClickPj(a, e, id) {
	// 	console.log("You clicked: " + e);
	// 	var r = e.substring(0, e.length - 4);
	// 	console.log(r);
	// 	//window.open(environment.API_ALFRESCO_URL + "/MarcheConvention/"+r);
	// 	this.service.downoldFile(r, a);
	// }

	onClickPj(e, id) {
		var r = e.substring(0, e.length - 4);
		window.open(environment.API_ALFRESCO_URL + "/PjAoG/" + r, "_blank");
	}
	onInputBlur3() {
		if (this.formData.caution === null || this.formData.caution === undefined) {
			this.formData.caution = 0; // Set the value back to 0 if left empty
		}
	}
	onInputFocus3() {
		if (this.formData.caution === 0) {
			this.formData.caution = null; // Remove default value when clicking on the input field
		}
	}
	backList() {
		this.router.navigate(["/marches/ao-consultation-list"]);
	}
	onChangeType($event) {
		this.formData.typeConsultationArchitecturale = $event.value;
	}

	existenceVisite(e) {
		this.formData.existanceVisite = e.checked;
		console.log(this.formData.existanceVisite);
	}
	existenceVisite2() {
		this.formData.existanceVisite = this.isVisible10;
		console.log("teeeeeeeeeeeeeeeeeest", this.formData.existanceVisite);
	}
	existEchantillon() {
		this.formData.existEchantillon = this.isVisible4;
		console.log("existEchantillon", this.formData.existEchantillon);
	}
	existanceAgrement() {
		this.formData.existanceAgrement = this.isVisible5;
		console.log("existanceAgrement", this.formData.existanceAgrement);
	}

	// =========================================================================
	//
	// ====================================================
	// check estimation
	//=====================================================

	onDeleteFile(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
			cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON"),
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service.deleteByIdFiles(id).subscribe(
					(res) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500,
						});
						this.ngOnInit();
					},
					(err: HttpErrorResponse) => {
						console.log(err.status);
						console.log(err.headers);

						if (err.status == 500) {
							Swal.fire({
								position: "center",
								icon: "error",
								title: "impossible de supprimer cette enregistrement",
								showConfirmButton: false,
								timer: 1500,
							});
						}
					}
				);
			}
		});
	}

	changeBudgetEstimation(event: any) {
		console.log(this.formData.budgetEstimatif);
		console.log(this.typePrestation);
		console.log(this.formData.budgetEstimatif >= 75550000 && this.typePrestation == 1);
		if (this.formData.budgetEstimatif >= 75550000 && this.typePrestation == 1) {
			this.formData.estimation = 40;
			this.estimation = 40;
		} else if (this.formData.budgetEstimatif >= 5364050 && (this.typePrestation == 2 || this.typePrestation == 3)) {
			this.formData.estimation = 40;
			this.estimation = 40;
		} else {
			this.estimation = 0;
		}
	}

	selectedCodeOrientation(event: any) {
		this.projet = "";
		let a = typeof event;
		let b;
		if (a == "string") {
			b = event;
		} else {
			b = event.value;
		}
		this.listprogramme = [];
		this.programmeService.finAllByCode(b).subscribe(
			(res) => {
				this.listprogramme = res;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	selectedCodeProjet(event: any) {
		let a = typeof event;
		let b;
		if (a == "string") {
			b = event;
		} else {
			b = event.value;
		}
		this.programmeService.findByCodeProjet(b).subscribe(
			(res: any) => {
				this.projet = res.nameProjet;
				this.idProgramme = res.id;
				this.formData.programme.id = this.idProgramme;
				// this.formData.idProject = res.id;
			},
			(err) => {
				console.log(err);
			}
		);
	}
	pjs=[]
	onDeletePj(row): void {
		this.allpjs
		
		
		this.allpjs.splice(row, 1);
		this.pjs.push(row)

		if (this.allpjs.length > 0) {
			this.dataSource2 = new MatTableDataSource(this.allpjs);
			this.cdr.detectChanges();

		} else {
			this.dataSource2 = null
		}
	}
	changeEstimation(event: any) {
		if (this.estimation > 0) {
			this.formData.estimation = this.estimation;
			Swal.fire("	L'estimation qui impacte la date de publication : ", "40 jours ", "warning");
		}
	}

	// ====================================================
	//
	//=====================================================
	// =========================================================================
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
		// this.selectedFiles = event.target.files;
	}

	// =========================================================================
	//
	// =========================================================================
	validerPj() {
		var champTexte: any = document.getElementById("test");

		// for(this.i=0;this.i<this.allpjs.length;this.i++){
		// 	if(this.allpjs[this.i].type.id==this.formPj.type.id){
		// 		this.temp=true

		// 	}
		// }

		if (champTexte.value != "") {
			this.allpjs.push(this.formPj);
			$("#test").val(null);
			console.log(this.allpjs);
			this.dataSource2 = new MatTableDataSource(this.allpjs);
			this.dataSource2.data;

			this.showAddDoc = false;
			this.formPj = { type: { id: "" }, selecetedFile: {}, label: "" };

			// Vider le champ de texte
			champTexte.value = "";
			// }else if(this.temp==true){
			// 	this.formPj = { type: {id:''}, selecetedFile: {} ,label:""};

			// // Vider le champ de texte
			// champTexte.value = "";

			// 	Swal.fire({
			// 		title:"	Vous avez déja ajouter une piéce jointe avec ce type veuillez la supprimer pour la écraser ",

			// 		icon:'error'
			// 	})
			// 	this.temp=false
		} else if (champTexte.value == "") {
			Swal.fire({
				title: "	Vous devez choisir une piéce jointe",

				icon: "error",
			});
		}
	}
	isVisible13;
	selectedTypePJ(event) {
		if (event.id == 7) {
			this.isVisible13 = true;
		} else {
			this.isVisible13 = false;
		}
	}
	// =========================================================================
	//
	// =========================================================================
	addItem() {
		this.showAddDoc = true;
	}
	// =========================================================================
	//
	// =========================================================================
	getDivisions() {
		this.service2.getRessource("/divisions/index").subscribe((data) => (this.divisions = data));
	}
	// =========================================================================
	//
	// =========================================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formData.service = 0;
		if (idDivision != 0) {
			this.service2.getRessourceById(idDivision, "/services/divisions/").subscribe(
				(data) => {
					this.services = data;
				},
				(error) => console.log(error)
			);
		} else {
			this.services = null;
		}
	}
	// =========================================================================
	//
	// =========================================================================
	onChange(event, index, item) {
		item.checked = !item.checked;

		console.log("index: " + index + ", label: " + item.label + ", checked: " + item.checked);
		this.bool = item.checked;
	}
	// =========================================================================
	//
	// =========================================================================
	onSubmit() {
		if (this.formData.objet == "" || this.formData.objetAR == "") {
			Swal.fire({
				title: "	Vous devez saisir au moins l'objet arabe et français ",

				icon: "error",
			});
		} else {
			if (this.isVisible5 == true) {
				this.formData.existanceAgrement = true;
				
			} else {
				this.formData.agrements = null;
			}

			if (this.isVisible2 == true) {
				this.formData.existTypeAo = true;
			} else {
				this.formData.existTypeAo = false;
				this.formData.typeAo = null;
			}
			if (this.formData.programme != null) {
				if (this.formData.programme.id == "") {
					this.formData.programme = null;
				}
			}
			if (this.formData.convention != null) {
				if (this.formData.convention.id == "") {
					this.formData.convention = null;
				}
			}
			if (this.formData.natureAo != null) {
				if (this.formData.natureAo.id == 0) {
					this.formData.natureAo = null;
				}
			}

			if (this.formData.typeMarche != null) {
				if (this.formData.typeMarche.id == "") {
					this.formData.typeMarche = null;
				}
			}
			if (this.formData.typePrestation != null) {
				if (this.formData.typePrestation.id == 0) {
					this.formData.typePrestation = null;
				}
			}
			// if (this.formData.consultationArchitecturale.id == "") {
			// 	this.formData.consultationArchitecturale = null;
			// }
			if (this.isVisible4 == true) {
				this.formData.existQualification = true;
				if (this.isVisible9 == true) {
					this.formData.existClassification = true;
				} else {
					this.formData.qualification = null;
					this.formData.classification = null;
					this.formData.existClassification = false;
				}
			} else {
				this.formData.existQualification = false;
			}
			if (this.isVisible7 == true) {
				this.formData.existEchantillon = true;
			} else {
				this.formData.existEchantillon = false;
				this.formData.adresseEchantillon = "";
				this.formData.dateEchantillon = "";
			}
			if (this.isVisible8 == true) {
				this.formData.existanceVisite = true;
			} else {
				this.formData.existanceVisite = false;
				this.formData.adresseVisite = "";
				this.formData.dateVisite = "";
				this.formData.traitementVisite = "";
			}

			// if (this.bool == true) {
			// 	this.formData.statutAo.id = 2;
			// 	console.log(this.formData);
			// }
	

			// this.formData.programme.id = this.idProgramme;
			// if (this.isVisible3 != 1) {
			// 	this.formData.convention = null;
			// }
			// if (this.isVisible != 1) {
			// 	this.formData.programme = null;
			// }
			// if(this.isVisible5==true){
			// 	this.formData.existanceAgrement=true
			// }
			this.service.updateao(this.formData).subscribe((res) => {
				;	let historiqueAo={
					ao:{id:res.id},
					updateDate:null,
					modificateurUser : window.localStorage.getItem("fullnameUser"),
				}
				this.service.createHistoriqueAo(historiqueAo).subscribe((data)=>{
					
				})
			  if(this.pjs.length!=0){
				for (const pj of this.pjs) {
					this.service.deletePj(pj.id).subscribe((data) => {
					  console.log("Deleted PJ with id: " + pj.id);
					});
				  }
			  }
				// Assuming this.allpjs has an 'id' property for each PJ
				if (this.allpjs.length > 0) {
				  ;
			  
				
			  
				
				  const pjsToUpdate = this.allpjs.filter((pj) => pj.selecetedFile !== undefined);

				  for (const pj of pjsToUpdate) {
					this.service.nouvellepj(pj.selecetedFile, this.idao, pj.type.id, "AO", pj.label).subscribe((data) => {
					  console.log("Updated/Added file: " + data);
					});
				  }
			  
				}
			  
							if (res.statutAoValide == "ADJUGE") {
						this.router.navigate(["/marches/marches-list"]);
					} else {
						this.back();
					}
			  });
			// this.service.updateao(this.formData).subscribe(
			// 	(res) => {
			// 		if (this.allpjs.length > 0) {
			// 			for (var i = 0; i < this.allpjs.length; i++) {
			// 				if (this.allpjs[i].selecetedFile != null) {
			// 					this.service.nouvellepj(this.allpjs[i].selecetedFile, this.idao, this.allpjs[i].type.id, "AO", this.formPj.label).subscribe((data) => {
			// 						console.log("file" + data);
			// 					});
			// 				}
			// 			}
			// 		}

			// 		if (res.statutAoValide == "ADJUGE") {
			// 			this.router.navigate(["/marches/marches-list"]);
			// 		} else {
			// 			this.back();
			// 		}
			// 	},
			// 	(err) => {}
			// );
		}
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		// if (this.backPage == 1) {
		// 	this.router.navigate(["/marches/ao-consultation-detail"], {
		// 		queryParams: { id: this.idao, page: 1 },
		// 	});
		// } else {
		this.router.navigate(["/marches/ao-consultation-list"]);
		// }
	}

	// =========================================================================
	//
	// =========================================================================
	// slide toggle button
	change(e) {
		if (this.checked) {
			// at first, reset to the previous value
			// so that the user could not see that the mat-slide-toggle has really changed
			e.source.checked = true;
			this.bool = this.checked;
			const dialogRef = this.dialog.open(ConfirmDialogComponent);
			dialogRef.afterClosed().subscribe((response) => {
				console.log("response ", response);
				if (response) {
					this.bool = false;
					this.checked = false;
					this.formData.sendToServiceMarche = this.checked;
					console.log("+++++");
				} else {
					this.checked = true;
					this.formData.sendToServiceMarche = this.checked;
					this.bool = true;
					console.log("####");
				}
			});
			console.log("Send  : " + this.bool);
		} else {
			this.checked = !this.checked;
			this.formData.sendToServiceMarche = this.checked;
			this.bool = true;
			console.log("Send YES : " + this.bool);
		}
	}
}
export interface LigneBP {
	id: string;
	numPrix: string;
	objet: string;
	isForfait: string;
	unite: string;
	prixU: string;
	quantite: string;
	totalHt: String;
}
