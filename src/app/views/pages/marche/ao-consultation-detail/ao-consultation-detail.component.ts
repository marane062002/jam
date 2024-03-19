import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { AoService } from "../../shared/ao.service";
import { ActivatedRoute, Router } from "@angular/router";
import { OrganisationService } from "../../organisation/organisation.service";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { SpinnerService } from "../../utils/spinner.service";
import { delay, finalize } from "rxjs/operators";
import Swal from "sweetalert2";
import { environment } from "./../../../../../environments/environment";
import { ConcelAoComponent } from "../dialog-forms/concel-ao/concel-ao.component";
import { EditSecteurComponent } from "../dialog-forms/edit-secteur/edit-secteur.component";
import { NotificationType } from "../../shared/NotificationMessage.service";
import { EditLotAoComponent } from "../dialog-forms/edit-lot-ao/edit-lot-ao.component";
import { LettreMaintienDialogComponent } from "../dialog-forms/lettre-maintien-dialog/lettre-maintien-dialog.component";
import { formatDate } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SeanceDialogComponent } from "../Seance-dialog/seance-dialog/seance-dialog.component";
import { ShowSeanceDialogComponent } from "../Seance-dialog/show-seance-dialog/show-seance-dialog/show-seance-dialog.component";
import { SeanceResultatDefComponent } from "../Seance-dialog/seance-resultat-def/seance-resultat-def.component";
import * as $ from "jquery";
import { ShowPjCommentaireComponent } from "../show-pj-commentaire/show-pj-commentaire.component";

@Component({
	selector: "kt-ao-consultation-detail",
	templateUrl: "./ao-consultation-detail.component.html",
	styleUrls: ["./ao-consultation-detail.component.scss"],
})
export class AoConsultationDetailComponent implements OnInit {
	private unsubscribe: Subscription[] = [];
	statut: FormGroup;
	statutMarche: FormGroup;

	checkLang: string;
	secteursDataSource: any;
	arrList: any;
	lotMarcheDataSource: any;
	agrementAO: any;
	showPage: number = 0;
	showPageFR: number = 0;
	showPageAR: number = 0;
	lang: string = "avisAR";
	backPage = 0;
	// commentaire: FormGroup;
	commentaire = { selecetedFile: {}, note: "" };

	AddSeance1;
	// ===============================================================
	//
	// ===============================================================
	constructor(private service: AoService, private router: Router, private activatedRoute: ActivatedRoute, private service1: OrganisationService, private translate: TranslateService, private notification: NotificationService, public dialog: MatDialog, private spinnerService: SpinnerService) {
		// this.commentaire = new FormGroup({
		// 	selecetedFile: new FormControl("", ),
		// 	note: new FormControl("", Validators.required),
		// });

		this.AddSeance1 = new FormGroup({
			seance: new FormControl("", Validators.required),
		});
		this.statut = new FormGroup({
			statut: new FormControl(0, Validators.required),
		});
		this.statutMarche = new FormGroup({
			statut: new FormControl(0, Validators.required),
		});
		this.service.data$.subscribe((data) => {
			if (data != null) {
				this.dataSource1 = data;
				if (this.dataSource1.length == 0) {
					this.firstSeance = true;
					this.notFirstSeance = false;
				} else {
					this.firstSeance = false;

					this.notFirstSeance = true;
				}
			}
		});
	}
	column = ["label", "actions"];
	seance;
	ajouterUneSeance() {
		this.isPremiereSeance = true;
		// this.service.findByAo_Id(this.idao).subscribe((res) => {
		// 	this.longeurTableSeance = res.length;
		// 	this.seance = {
		// 		ao: { id: this.idao },
		// 		libele: "seance" + Number(this.longeurTableSeance + 1),
		// 		etatSeance: "SEANCE",
		// 	};
		// 	this.service.createSeance(this.seance).subscribe((res) => {
		const dialogRef = this.dialog.open(SeanceDialogComponent, {
			width: "1000px",
			data: {
				idao: this.idao,
				// idSeance: res.id,
				seance: this.isPremiereSeance,
				avantDerniereSeance: this.isAvantDerniereSeance,
				derniereSeance: this.isDerniereSeance,
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			this.service.findByAo_Id(this.idao).subscribe((res) => {
				this.dataSource1 = res;
				if (this.dataSource1.length == 0) {
					this.firstSeance = true;
					this.notFirstSeance = false;
				} else {
					this.firstSeance = false;

					this.notFirstSeance = true;
				}
			});
		});
		// 	});
		// });
	}
	seanceDernier;
	ajouterResDef() {
		this.isPremiereSeance = false;
		this.isAvantDerniereSeance = true;
		this.isDerniereSeance = false;
		this.service.findByAo_Id(this.idao).subscribe((res) => {
			this.longeurTableSeance = res.length;

			this.seanceDernier = {
				ao: { id: this.idao },
				libele: "seance" + Number(this.longeurTableSeance + 1),
				etatSeance: "AVANT_DERNIER",
			};
			this.service.createSeance(this.seanceDernier).subscribe((res) => {
				const dialogRef = this.dialog.open(SeanceResultatDefComponent, {
					width: "1000px",
					data: {
						idao: this.idao,
						idSeance: res.id,
						seance: this.isPremiereSeance,
						avantDerniereSeance: this.isAvantDerniereSeance,
						derniereSeance: this.isDerniereSeance,
					},
				});
				dialogRef.afterClosed().subscribe((res) => {
					this.service.findByAo_Id(this.idao).subscribe((res) => {
						this.dataSource1 = res;
						if (this.dataSource1.length == 0) {
							this.firstSeance = true;
							this.notFirstSeance = false;
						} else {
							this.firstSeance = false;

							this.notFirstSeance = true;
						}
					});

					// this.ao.statutAoValide=res.statutAoValide
					// this.ao.motifAnnulation=res.motifAnnulation
					// // this.aoDialog = res;
					// if (res) {

					// 	this.service
					// 		.updateStatutAoValide(this.ao)
					// 		.subscribe((res) => {

					// 			this.router.navigate(["/marches/ao-consultation-list"]);
					// 		});

					// 	// this.notification.warn(
					// 	// 	this.translate.instant(
					// 	// 		"PAGES.GENERAL.MSG_CONCEL_AO_CONFIRMED"
					// 	// 	)
					// 	// );
					// }
				});
			});
		});
	}
	show(i) {
		const dialogRef = this.dialog.open(ShowSeanceDialogComponent, {
			width: "1000px",
			data: {
				idSeance: i,
				seance: this.isPremiereSeance,
				avantDerniereSeance: this.isAvantDerniereSeance,
				derniereSeance: this.isDerniereSeance,
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
				location.reload();

				// this.ao.statutAoValide=res.statutAoValide
				// this.ao.motifAnnulation=res.motifAnnulation
				// // this.aoDialog = res;
				// if (res) {

				// 	this.service
				// 		.updateStatutAoValide(this.ao)
				// 		.subscribe((res) => {

				// 			this.router.navigate(["/marches/ao-consultation-list"]);
				// 		});

				// 	// this.notification.warn(
				// 	// 	this.translate.instant(
				// 	// 		"PAGES.GENERAL.MSG_CONCEL_AO_CONFIRMED"
				// 	// 	)
				// 	// );
				// }
			}
		});
	}


	showPjCommentaire(i) {
		const dialogRef = this.dialog.open(ShowPjCommentaireComponent, {
			width: "1000px",
			data: {
				idCommentaire: i,

			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
				location.reload();

				// this.ao.statutAoValide=res.statutAoValide
				// this.ao.motifAnnulation=res.motifAnnulation
				// // this.aoDialog = res;
				// if (res) {

				// 	this.service
				// 		.updateStatutAoValide(this.ao)
				// 		.subscribe((res) => {

				// 			this.router.navigate(["/marches/ao-consultation-list"]);
				// 		});

				// 	// this.notification.warn(
				// 	// 	this.translate.instant(
				// 	// 		"PAGES.GENERAL.MSG_CONCEL_AO_CONFIRMED"
				// 	// 	)
				// 	// );
				// }
			}
		});
	}
	AddSeance(e) {
		if (e.value == "Ajouter_Seance") {
			this.ajouterUneSeance();
		}

		if (e.value == "Ajouter_Resultat_Def") {
			this.ajouterResDef();
		}
	}
	// ===============================================================
	//
	// ===============================================================
	ao = {
		id: 0,
		Motif: "",
		typeBudget: "",
		statutAoValide: "",
		typeConsultationArchitecturale: "",
		typeMarche: { id: 1, libelle: "" },
		natureAo: { id: 1, libelle: "" },
		statutAo: { id: 1, libelle: "" },
		bordereauPrix: { id: 0 },
		pfinancier: 0,
		ptechnique: 0,
		modePassation: "",
		seuilMinimal: 0,
		caution: 0,
		dateOuverturePlis: null,
		dateReception: null,
		serviceGestionnaire: 0,
		existanceVisite: null,
		existClassification: null,
		existTypeAo: null,
		division: 0,
		descriptif: "",
		budgetEstimatif: 0,
		objet: "",
		numAo: "",
		programme: "",
		convention: "",
		typeAO: "",
		typePrestation: { id: "", libelle: "" },
		estimation: "",
		estimationHT: "",
		taxeTVA: "",
		objetAR: "",
		naturePrix: "",
		qualification: "",
		loi: "",
		etatCommentaire: "",
		existanceAllotisse: "",
		existanceAgrement: null,
		existEchantillon: null,
		existQualification: null,
		offreTechnique: null,
		/* sousTypePrestation: {
			id: 1,
			libelle: "",
			typePrestation: { id: 1, libelle: "" },
		}, */
		motifAnnulation: "",
		createurUser: "",
		modificateurUser: "",
		updateDate: "",
		creationDate: "",
		listJournaux: [
			{
				id: 0,
				nomAr: "",
				nomFr: "",
				adresse: "",
				date: 0,
			},
		],
	};

	aoDialog = {
		id: 0,
		statutAo: { id: 1, libelle: "" },
		motifAnnulation: "",
	};

	secteurData = {
		id: "",
		classe: { id: "", libelle: "" },
		secteur: { id: "", libelle: "" },
		ao: { id: "", libelle: "" },
		qualifications: [],
	};

	lotData = {
		id: "",
		numLot: "",
		objetFr: "",
		objetAr: "",
		budget: "",
		caution: "",
		ao: { id: "" },
	};

	agrementData = {
		id: "",
		agrement: "",
		dateAgrement: "",
		observation: "",
		ao: { id: "" },
	};

	agrementDataList: any[];

	qualifList: any[] = [];
	// ===============================================================
	//
	// ===============================================================
	idao;
	formDataBP;
	lignes;
	pjsCps;
	pjsRc;
	divisionLibelle;
	serviceLibelle;
	loader: boolean;
	prestataires: any[] = [];
	dataSource2: MatTableDataSource<any>;
	dataSource: MatTableDataSource<any>;
	dataSource1: any;
	displayedColumns2 = ["nomDoc", "type", "label", "dow"];
	isPremiereSeance = false;
	isAvantDerniereSeance = false;
	isDerniereSeance = false;
	// ===============================================================
	//
	// ===============================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ===============================================================
	//
	// ===============================================================
	ngAfterViewInit() { }
	// ===============================================================
	//
	// ===============================================================
	longeurTableSeance;
	firstSeance;
	notFirstSeance;
	dernierExiste = false;
	marche;
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
		this.getAllPjImm(this.idao);
		this.checkLang = window.localStorage.getItem("language");
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});

		this.getDetailsAo();
		this.getHistoriqueAoByIdAo();
		this.getHistoriqueUpdateStatutToCommentByIdAo();
		this.getHistoriqueUpdateStatutToEnAttenteValidationByIdAo();
		this.getHistoriqueUpdateStatutToValideByIdAo();
		this.getHistoriqueUpdateStatutFromValideByIdAo();
		this.getHistoriqueUpdateStatutMarcheByIdAo();
		this.populateSecteurs();
		// this.service.findByAo_Id_And_EtatSeance(this.idao, "DERNIER").subscribe((res) => {
		// 	if (res != null) {
		// 		this.dernierExiste = true;
		// 	} else {
		// 		this.dernierExiste = false;
		// 	}
		// });

		this.service.findByTypeCommission_IdAndAo_Id(5, this.idao).subscribe((data) => {
			if (data != null || data.length != 0) {
				this.service.findByStatut_IdAndAo_Id(1, this.idao).subscribe((res) => {
					if (res.length == 1) {
						this.dernierExiste = true;
					} else {
						this.dernierExiste = false;
					}
				});
			}
		})

		this.service.findMarcheByAo_Id(this.idao).subscribe((res) => {
			this.marche = res;
		});
		// this.service.findByAo_Id(this.idao).subscribe((res) => {
		// 	this.longeurTableSeance = res.length;

		// 	this.dataSource1 = res;
		// 	if (this.dataSource1.length == 0) {
		// 		this.firstSeance = true;
		// 	} else {
		// 		this.notFirstSeance = true;
		// 	}
		// });

	}
	historiqueAo
	getHistoriqueAoByIdAo() {
		this.service.findHistoriqueAoByAo_Id(this.idao).then((res) => {
			this.historiqueAo = res

		})
	}
	historiqueUpdateStatutToComment
	getHistoriqueUpdateStatutToCommentByIdAo() {
		this.service.findHistoriqueUpdateStatutToCommentByAo_Id(this.idao).then((res) => {
			this.historiqueUpdateStatutToComment = res

		})
	}
	historiqueUpdateStatutToEnAttenteValidation
	getHistoriqueUpdateStatutToEnAttenteValidationByIdAo() {
		this.service.findHistoriqueUpdateStatutToEnAttenteValidationByAo_Id(this.idao).then((res) => {
			this.historiqueUpdateStatutToEnAttenteValidation = res

		})
	}
	historiqueUpdateStatutToValide
	getHistoriqueUpdateStatutToValideByIdAo() {
		this.service.findHistoriqueUpdateStatutToValideByAo_Id(this.idao).then((res) => {
			this.historiqueUpdateStatutToValide = res

		})
	}
	historiqueUpdateStatutFromValide
	getHistoriqueUpdateStatutFromValideByIdAo() {
		this.service.findHistoriqueUpdateStatutFromValideByAo_Id(this.idao).then((res) => {
			this.historiqueUpdateStatutFromValide = res

		})
	}
	historiqueUpdateStatutMarche
	getHistoriqueUpdateStatutMarcheByIdAo() {
		this.service.findHistoriqueUpdateStatutMarcheByAo_Id(this.idao).then((res) => {
			this.historiqueUpdateStatutMarche = res

		})
	}
	allpjs = [];
	validerPj() {
		this.allpjs.push(this.commentaire);
		$("#test").val(null);
		console.log(this.allpjs);
		this.dataSource = new MatTableDataSource(this.allpjs);
		// this.commentaire = new FormGroup({
		// 	selecetedFile: new FormControl("", ),

		// });

		this.commentaire = { selecetedFile: {}, note: this.commentaire.note };
	}

	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.commentaire.selecetedFile = event.target.files;
	}
	onDeletePj(id: number): void {
		this.allpjs.splice(id, 1);
		if (this.allpjs.length > 0) {
			this.dataSource = new MatTableDataSource(this.allpjs);
		} else {
			this.dataSource = null;
		}
	}
	displayedColumns1 = ["nomDoc", "actions"];

	historiqueCommentaire = false;
	onSubmit(value: any) {
		;
		console.log(value);
		let commentaire = {
			ao: { id: this.idao, },

			commentaire: value.note,
		};
		let HistoriqueStatutToComment = {
			ao: { id: this.idao, },
			modificateurUser: window.localStorage.getItem("fullnameUser"),

		}

		this.service.createHistoriqueUpdateStatutToComment(HistoriqueStatutToComment).subscribe((data) => {

		})
		this.service.createHistoriqueCommentaire(commentaire).subscribe((res) => {
			;
			// this.commentaire.get("note").setValue(" ");
			this.commentaire.note = " ";
			this.historiqueCommentaire = true;
			this.getHistoCommentaire();
			;
			if (this.allpjs.length > 0) {
				;
				for (var i = 0; i < this.allpjs.length; i++) {
					;
					this.service.nouvellepjCommentaire(this.allpjs[i].selecetedFile, res["id"], "COMMENTAIRE").subscribe((data) => {
						;
						console.log("C: " + JSON.stringify(data, null, 2));
						this.dataSource = null
							;
					});
				}
			}
		});
		// this.service.updateCommentaire(this.idao, value).subscribe(res=>{
		//   console.log(res);
		//   Swal.fire(
		// 	'Commentaire à été bien ajouter',
		// 	' ',
		// 	'success'
		//   )
		//   this.ngOnInit();
		// },err=>{
		//   console.log(err)
		// })
	}
	// ===============================================================
	//
	// ===============================================================
	existAllotissement;
	histoCommentaireList;
	agrement = [];
	getDetailsAo() {
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

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

					for (let i = 0; i < data.agrements.length; i++) {
						this.agrement.push(data.agrements[i].agrement);
					}
					// this.commentaire.get("note").setValue(data.commentaire);
					this.commentaire.note = data.commentaire;

					this.statut.get("statut").setValue(data.statutAoValide);
					this.service.findMarcheByAo_Id(this.idao).subscribe((res) => {
						if (res != null) {
							this.statutMarche.get("statut").setValue(res.statutMarche);
						}
					});
					console.log("AO " + JSON.stringify(data, null, 2));
					this.service.SM = this.ao.seuilMinimal;
					this.service.PourcentageTechnique = this.ao.ptechnique;
					this.service.PourcentageFinancier = this.ao.pfinancier;
					this.service.ModePassationAo = this.ao.modePassation;
					this.getDivisionEtService();
					this.getHistoCommentaire();
					if (data.typeMarche != null) {
						if (data.typeMarche.id == 6) {
							this.populateLotMarche();
							this.existAllotissement = true;
						}
					}

					var b = { index: 0 };
					this.changeTab(b);
				},
				(err) => {
					console.log(err);
				}
			);
	}
	updateStatut(event): void {
		console.log(event);
		Swal.fire({
			title: "Voulez-vous changer   le statut de cette AO  ?",
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				let HistoriqueStatutFromValide = {
					ao: { id: this.ao.id, },
					modificateurUser: window.localStorage.getItem("fullnameUser"),
					statutAoValide: event.value
				}
				this.service.createHistoriqueUpdateStatutFromValide(HistoriqueStatutFromValide).subscribe((res) => {

				})
				if (event.value == "ANNULE" || event.value == "INFRUCTUEUX") {
					this.annulerAoDialog(event.value);
				} else {

					this.ao.statutAoValide = event.value;
					this.service.updateStatutAoValide(this.ao).subscribe((res) => {
						this.router.navigate(["/marches/ao-consultation-list"]);
					});
				}
			}
		});
	}

	updateStatutMarche(event): void {
		console.log(event);
		Swal.fire({
			title: "Voulez-vous changer   le statut  ?",
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				let HistoriqueStatutMarche = {
					ao: { id: this.ao.id, },
					modificateurUser: window.localStorage.getItem("fullnameUser"),
					statutMarche: event.value
				}
				this.service.createHistoriqueUpdateStatutMarche(HistoriqueStatutMarche).subscribe((res) => {

				})
				this.marche.statutMarche = event.value;
				this.service.updateStatutMarche(this.marche).subscribe((res) => {
					this.router.navigate(["/marches/marches-list"]);
				});
			}
		});
	}
	traiterAO(event) {
		console.log(this.idao);
		Swal.fire({
			title: "Motif",
			input: "text",
			inputAttributes: {
				autocapitalize: "off",
			},
			showCancelButton: true,
			confirmButtonText: "Ok",
			cancelButtonText: "Non",
			showLoaderOnConfirm: true,
		}).then((result) => {
			console.log(result.value);
			if (result.isConfirmed) {
				this.service.updateStautswithMotif(this.idao, result.value).subscribe(
					(data) => {
						Swal.fire("OK!", "", "success");
						this.back();
					},
					(err) => {
						console.log(err);
					}
				);
			}
		});
	}
	// ===============================================================
	//
	// ===============================================================
	async getDivisionEtService() {
		if (this.ao.division != 0)
			await this.service1.findEntityById(this.ao.division, "/divisions/find/").subscribe(
				(d) => {
					if (this.checkLang == "ar") {
						this.divisionLibelle = d.libelle;
					}
					if (this.checkLang == "fr") {
						this.divisionLibelle = d.libelleFR;
					}
				},
				(err) => {
					this.divisionLibelle = "";
					console.log(err);
				}
			);
		if (this.ao.serviceGestionnaire != 0)
			await this.service1.findEntityById(this.ao.serviceGestionnaire, "/services/find/").subscribe(
				(s) => {
					if (this.checkLang == "ar") {
						this.serviceLibelle = s.libelle;
					}
					if (this.checkLang == "fr") {
						this.serviceLibelle = s.libelleFR;
					}
				},
				(err) => {
					this.serviceLibelle = "";
					console.log(err);
				}
			);
	}
	pjCommentaireExiste = false;
	async getHistoCommentaire() {
		;
		this.service.findByAo_IdOrderByIdDesc(this.ao.id).then((res) => {
			;
			this.histoCommentaireList = res;
			;
			if (res.length != 0) {
				;
				this.historiqueCommentaire = true;

				// for (let i = 0; i < res.length; i++) {
				// 	;
				// 	this.service.findPjByCommentaire_Id(res[i].id).then((data) => {
				// 		;
				// 		if (data.length != 0) {
				// 			;
				// 			this.pjCommentaireExiste = true;
				// 		} else {
				// 			;
				// 			this.pjCommentaireExiste = false;
				// 		}
				// 	});
				// }
			}
		});
	}
	// ===============================================================
	//
	// ===============================================================
	// changeTab(a) {
	// 	if (a.index == 0) {
	// 		this.router.navigate(["marches/ao-consultation-detail/ligneBP-form-consultation"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	// if (a.index == 1) {
	// 	// 	this.router.navigate(["marches/ao-consultation-detail/circuit-validation-consultation"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	// if (a.index == 2) {
	// 	// 	this.router.navigate(["marches/ao-consultation-detail/valide-dg-service-consultation"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	// if (a.index == 3) {
	// 	// 	this.router.navigate(["marches/ao-consultation-detail/valide-tresorerie-consultation"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	else if (a.index == 1 && this.ao.existEchantillon == true) {
	// 		this.router.navigate(["marches/ao-consultation-detail/ao-echantillon"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	else if (a.index == 2 && this.ao.existEchantillon == true) {
	// 		this.router.navigate(["marches/ao-consultation-detail/membre-seance"], {
	// 			queryParams: { id: this.idao },
	// 		});

	// 	}
	// 	else if (a.index == 6 && this.ao.offreTechnique == true && this.ao.existEchantillon == true) {
	// 		this.router.navigate(["/marches/ao-consultation-detail/journal"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}

	// 	// if (a.index == 5) {
	// 	// 	this.router.navigate(["/marches/ao-consultation-detail/pieces-jointes"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	// if (a.index == 6) {
	// 	// 	this.router.navigate(["/marches/ao-consultation-detail/ao-statut"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	else if (a.index == 7 && this.ao.offreTechnique == true && this.ao.existEchantillon == true) {
	// 		this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}

	// 	else if (a.index == 3 && (this.ao.offreTechnique == false || this.ao.existEchantillon == false || this.ao.offreTechnique == null || this.ao.existEchantillon == null)) {
	// 		this.service.sendData(this.ao);
	// 		this.router.navigate(["marches/ao-consultation-detail/prestataires"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	else if (a.index == 4 && (this.ao.offreTechnique == false || this.ao.existEchantillon == false || this.ao.offreTechnique == null || this.ao.existEchantillon == null)) {
	// 		this.service.sendData(this.idao);

	// 		this.router.navigate(["/marches/ao-consultation-detail/commission"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	else if (a.index == 5 && (this.ao.offreTechnique == false || this.ao.existEchantillon == false || this.ao.offreTechnique == null || this.ao.existEchantillon == null)) {
	// 		this.router.navigate(["/marches/ao-consultation-detail/journal"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}

	// 	// if (a.index == 5) {
	// 	// 	this.router.navigate(["/marches/ao-consultation-detail/pieces-jointes"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	// if (a.index == 6) {
	// 	// 	this.router.navigate(["/marches/ao-consultation-detail/ao-statut"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	else if (a.index == 6 && (this.ao.offreTechnique == false || this.ao.existEchantillon == false || this.ao.offreTechnique == null || this.ao.existEchantillon == null)) {
	// 		this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}



	// 	else if (a.index == 1 && (this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.router.navigate(["marches/ao-consultation-detail/membre-seance"], {
	// 			queryParams: { id: this.idao },
	// 		});



	// 	}

	// 	else if (a.index == 2 && this.ao.offreTechnique == true && (this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.router.navigate(["marches/ao-consultation-detail/membre-technique-seance"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	else if (a.index == 3 && this.ao.offreTechnique == true && (this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.service.sendData(this.ao);
	// 		this.router.navigate(["marches/ao-consultation-detail/prestataires"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	else if (a.index == 4 && this.ao.offreTechnique == true && (this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.service.sendData(this.idao);

	// 		this.router.navigate(["/marches/ao-consultation-detail/commission"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	else if (a.index == 5 && this.ao.offreTechnique == true && (this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.router.navigate(["/marches/ao-consultation-detail/journal"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}

	// 	// if (a.index == 5) {
	// 	// 	this.router.navigate(["/marches/ao-consultation-detail/pieces-jointes"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	// if (a.index == 6) {
	// 	// 	this.router.navigate(["/marches/ao-consultation-detail/ao-statut"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	else if (a.index == 6 && this.ao.offreTechnique == true && (this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}

	// 	else if (a.index == 2 && (this.ao.offreTechnique == false || this.ao.offreTechnique == null || this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.service.sendData(this.ao);
	// 		this.router.navigate(["marches/ao-consultation-detail/prestataires"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	else if (a.index == 3 && (this.ao.offreTechnique == false || this.ao.offreTechnique == null || this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.service.sendData(this.idao);

	// 		this.router.navigate(["/marches/ao-consultation-detail/commission"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}
	// 	else if (a.index == 4 && (this.ao.offreTechnique == false || this.ao.offreTechnique == null || this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.router.navigate(["/marches/ao-consultation-detail/journal"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}

	// 	// if (a.index == 5) {
	// 	// 	this.router.navigate(["/marches/ao-consultation-detail/pieces-jointes"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	// if (a.index == 6) {
	// 	// 	this.router.navigate(["/marches/ao-consultation-detail/ao-statut"], {
	// 	// 		queryParams: { id: this.idao },
	// 	// 	});
	// 	// }
	// 	else if (a.index == 5 && (this.ao.offreTechnique == false || this.ao.offreTechnique == null || this.ao.existEchantillon == false || this.ao.existEchantillon == null)) {
	// 		this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
	// 			queryParams: { id: this.idao },
	// 		});
	// 	}




	// }




	changeTab(a) {
		if (a.index == 0) {
			
			this.router.navigate(["marches/ao-consultation-detail/ligneBP-form-consultation"], {
				queryParams: { id: this.idao },
			});
		}
		

				if (a.index == 1 && this.ao.existEchantillon == true && this.ao.offreTechnique == true) {
					
					this.router.navigate(["marches/ao-consultation-detail/ao-echantillon"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 2&& this.ao.existEchantillon == true && this.ao.offreTechnique == true) {
					
					this.router.navigate(["marches/ao-consultation-detail/membre-seance"], {
						queryParams: { id: this.idao },
					});
		
				}
		
				if (a.index == 3&& this.ao.existEchantillon == true && this.ao.offreTechnique == true) {
					
					this.router.navigate(["marches/ao-consultation-detail/membre-technique-seance"], {
						queryParams: { id: this.idao },
					});
				}
		
		
				if (a.index == 4&& this.ao.existEchantillon == true && this.ao.offreTechnique == true) {
					
					this.service.sendData(this.ao);
					this.router.navigate(["marches/ao-consultation-detail/prestataires"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 5&& this.ao.existEchantillon == true && this.ao.offreTechnique == true) {
					
					this.service.sendData(this.idao);
		
					this.router.navigate(["/marches/ao-consultation-detail/commission"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 6&& this.ao.existEchantillon == true && this.ao.offreTechnique == true) {
					
					this.router.navigate(["/marches/ao-consultation-detail/journal"], {
						queryParams: { id: this.idao },
					});
				}
		
				if (a.index == 7&& this.ao.existEchantillon == true && this.ao.offreTechnique == true) {
					
					this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
						queryParams: { id: this.idao },
					});
				}
			
				if (a.index == 1&& this.ao.existEchantillon == true &&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.router.navigate(["marches/ao-consultation-detail/ao-echantillon"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 2&& this.ao.existEchantillon == true &&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.router.navigate(["marches/ao-consultation-detail/membre-seance"], {
						queryParams: { id: this.idao },
					});
		
				}
		
		
		
				if (a.index == 3&& this.ao.existEchantillon == true &&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.service.sendData(this.ao);
					this.router.navigate(["marches/ao-consultation-detail/prestataires"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 4&& this.ao.existEchantillon == true &&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.service.sendData(this.idao);
		
					this.router.navigate(["/marches/ao-consultation-detail/commission"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 5&& this.ao.existEchantillon == true &&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.router.navigate(["/marches/ao-consultation-detail/journal"], {
						queryParams: { id: this.idao },
					});
				}
		
				if (a.index == 6&& this.ao.existEchantillon == true &&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
						queryParams: { id: this.idao },
					});
				}
			
		
			
				if (a.index == 1&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&& this.ao.offreTechnique == true) {
					
					this.router.navigate(["marches/ao-consultation-detail/membre-seance"], {
						queryParams: { id: this.idao },
					});
		
				}
		
				if (a.index == 2&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&& this.ao.offreTechnique == true) {
					
					this.router.navigate(["marches/ao-consultation-detail/membre-technique-seance"], {
						queryParams: { id: this.idao },
					});
				}
		
		
				if (a.index == 3&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&& this.ao.offreTechnique == true) {
					
					this.service.sendData(this.ao);
					this.router.navigate(["marches/ao-consultation-detail/prestataires"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 4&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&& this.ao.offreTechnique == true) {
					
					this.service.sendData(this.idao);
		
					this.router.navigate(["/marches/ao-consultation-detail/commission"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 5&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&& this.ao.offreTechnique == true) {
					
					this.router.navigate(["/marches/ao-consultation-detail/journal"], {
						queryParams: { id: this.idao },
					});
				}
		
				if (a.index == 6&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&& this.ao.offreTechnique == true) {
					
					this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
						queryParams: { id: this.idao },
					});
				}
			
				
				if (a.index == 1&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.router.navigate(["marches/ao-consultation-detail/membre-seance"], {
						queryParams: { id: this.idao },
					});
		
				}
		
			
		
				if (a.index == 2&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.service.sendData(this.ao);
					this.router.navigate(["marches/ao-consultation-detail/prestataires"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 3&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.service.sendData(this.idao);
		
					this.router.navigate(["/marches/ao-consultation-detail/commission"], {
						queryParams: { id: this.idao },
					});
				}
				if (a.index == 4&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.router.navigate(["/marches/ao-consultation-detail/journal"], {
						queryParams: { id: this.idao },
					});
				}
		
				if (a.index == 5&& (this.ao.existEchantillon == false || this.ao.existEchantillon==undefined || this.ao.existEchantillon==null)&&( this.ao.offreTechnique == false || this.ao.offreTechnique==undefined || this.ao.offreTechnique==null)) {
					
					this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
						queryParams: { id: this.idao },
					});
				}
			
		

	}
	// ===============================================================
	//
	// ===============================================================
	AddBp() {
		this.router.navigate(["marches/ao-consultation-detail/ligneBP-form-consultation"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddValid() {
		this.router.navigate(["marches/ao-consultation-detail/circuit-validation"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	valideTresorie() {
		this.router.navigate(["marches/ao-consultation-detail/valide-tresorerie"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddCommission() {
		this.router.navigate(["/marches/ao-consultation-detail/commission"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddPrestataires() {
		this.router.navigate(["marches/ao-consultation-detail/prestataires"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddVisites() {
		this.router.navigate(["/marches/ao-consultation-detail/ao-visite"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddEchantillon() {
		this.router.navigate(["marches/ao-consultation-detail/ao-echantillon"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	onClickPjCps(e, id) {
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjAo/" + r, "_blank");
	}

	// ====================================================================
	// print reports
	// ====================================================================
	printGeneratorFR(): void {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
		this.service.PrintGenerator("printAoFr/", this.idao).subscribe((res) => {
			const file = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		});
	}
	// ===============================================================
	//
	// ===============================================================
	// Ar report
	printGeneratorAR(): void {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
			this.backPage = params["page"];
		});
		this.service.PrintGenerator("printAoAr/", this.idao).subscribe((res) => {
			const file = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		});
	}
	// =================================================================
	//
	// =================================================================
	back() {
		if (this.backPage == 1) {
			this.router.navigate(["/marches/ao-consultation-list"]);
		} else {
			this.router.navigate(["/marches/ao-list"]);
		}
	}
	// =================================================================
	// Methode de suppression des courrier entrants
	// =================================================================
	annulerAO(idAo): void {
		Swal.fire({
			title: "Voulez vous annuler cette AO ?",
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.annulerAoDialog(idAo);
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Appel d'offre annuler",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	}
	// ================================================================
	//
	// ================================================================
	// annulerAoDialog(idLigne) {
	// 	const dialogRef = this.dialog.open(ConcelAoComponent, {
	// 		width: "630px",
	// 		data: {
	// 			id: idLigne,
	// 			statutAo: { id: 7 },
	// 			motifAnnulation: "",
	// 		},
	// 	});
	// 	dialogRef.afterClosed().subscribe((res) => {
	// 		if (res) {
	// 			this.aoDialog = res;
	// 			if (res) {
	// 				console.log(
	// 					"Dialog after closed : " +
	// 						JSON.stringify(this.aoDialog, null, 2)
	// 				);
	// 				this.service
	// 					.updateStatutAo(this.aoDialog)
	// 					.subscribe((res) => {
	// 						this.router.navigate(["/marches/ao-list"]);
	// 					});

	// 				this.notification.warn(
	// 					this.translate.instant(
	// 						"PAGES.GENERAL.MSG_CONCEL_AO_CONFIRMED"
	// 					)
	// 				);
	// 			}
	// 		}
	// 	});
	// }
	annulerAoDialog(Statut) {
		const dialogRef = this.dialog.open(ConcelAoComponent, {
			width: "630px",
			data: {
				statutAoValide: Statut,
				motifAnnulation: "",
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
				this.ao.statutAoValide = res.statutAoValide;
				this.ao.motifAnnulation = res.motifAnnulation;
				// this.aoDialog = res;
				if (res) {
					this.service.updateStatutAoValide(this.ao).subscribe((res) => {
						this.router.navigate(["/marches/ao-consultation-list"]);
					});

					// this.notification.warn(
					// 	this.translate.instant(
					// 		"PAGES.GENERAL.MSG_CONCEL_AO_CONFIRMED"
					// 	)
					// );
				}
			}
		});
	}
	// ===============================================================
	//
	// ===============================================================
	openDialog(): void {
		const dialogRef = this.dialog.open(EditSecteurComponent, {
			width: "800px",
			data: {
				id: "",
				classe: { id: "" },
				secteur: { id: "" },
				ao: { id: this.idao },
				qualifications: [],
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			this.secteurData.ao.id = res.ao.id;
			this.secteurData.classe.id = res.classe;
			this.secteurData.secteur.id = res.secteur;
			this.qualifList = res.qualifications;
			for (let index = 0; index < this.qualifList.length; index++) {
				this.secteurData.qualifications.push(this.createNewQualif(index));
			}
			console.log("Res: " + JSON.stringify(this.secteurData, null, 2));
			if (res) {
				this.service.sendSecteurEntrepriseData(this.secteurData).subscribe(
					(res) => {
						this.populateSecteurs();
						this.notification.sendMessage({
							message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
							type: NotificationType.success,
						});
						this.secteurData = {
							id: "",
							classe: { id: "", libelle: "" },
							secteur: { id: "", libelle: "" },
							ao: { id: this.idao, libelle: "" },
							qualifications: [],
						};
					},
					(error) => {
						console.log(error);
					}
				);
			}
		});
	}
	// ===============================================================
	//
	// ===============================================================
	createNewQualif(i: number): iQualification {
		return {
			id: this.qualifList[i],
		};
	}
	// ===============================================================
	//
	// ===============================================================
	populateSecteurs() {
		this.service.getAllSecteurAo(this.idao).subscribe(
			(result) => {
				this.secteursDataSource = result;
			},
			(error) => {
				console.log(error);
			}
		);
	}
	// ===============================================================
	//
	// ===============================================================
	editSecteur(idSec) {
		this.service.getSecteurById(idSec).subscribe(
			(result) => {
				this.secteurData = result;
				this.arrList = result.qualifications;
				for (let i = 0; i < this.arrList.length; i++) {
					this.qualifList.push(this.arrList[i].id);
				}

				const dialogRef = this.dialog.open(EditSecteurComponent, {
					width: "800px",
					data: {
						id: result.id,
						classe: result.classe.id,
						secteur: result.secteur.id,
						ao: { id: this.idao },
						qualifications: this.qualifList,
					},
				});
				dialogRef.afterClosed().subscribe((res) => {
					console.log("Res 1: " + JSON.stringify(res, null, 2));
					this.secteurData.ao.id = res.ao.id;
					this.secteurData.classe.id = res.classe;
					this.secteurData.secteur.id = res.secteur;
					this.qualifList = [];
					this.secteurData.qualifications = [];
					console.log("Qualif: " + JSON.stringify(this.secteurData.qualifications, null, 2));
					this.qualifList = res.qualifications;
					for (let index = 0; index < this.qualifList.length; index++) {
						this.secteurData.qualifications.push(this.createNewQualif(index));
					}
					console.log("Res: " + JSON.stringify(this.secteurData, null, 2));
					if (res) {
						this.service.sendSecteurEntrepriseData(this.secteurData).subscribe(
							(res) => {
								this.populateSecteurs();
								this.notification.sendMessage({
									message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
									type: NotificationType.success,
								});
								this.secteurData = {
									id: "",
									classe: { id: "", libelle: "" },
									secteur: { id: "", libelle: "" },
									ao: { id: this.idao, libelle: "" },
									qualifications: [],
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
	// ===============================================================
	//
	// ===============================================================
	deleteSecteur(idSec): void {
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
				this.service.deleteSecteurEntrepriseById(idSec).subscribe(
					(data) => {
						console.log("Secteur Deleted  : " + idSec);
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500,
						});
						this.populateSecteurs();
					},
					(error) => {
						console.log(error);
					}
				);
			}
		});
	}
	// ===========================================================================
	//
	// ===========================================================================
	// openDialogAgrement(): void {
	// 	const dialogRef = this.dialog.open(EditAgrementAoComponent, {
	// 		width: "600px",
	// 		data: {
	// 			id: "",
	// 			agrement: "",
	// 			dateAgrement: "",
	// 			observation: "",
	// 			ao: { id: this.idao }
	// 		},
	// 	});
	// 	dialogRef.afterClosed().subscribe((res) => {
	// 		console.log("Add lotFormData: " + JSON.stringify(res, null, 2));
	// 		if (res) {
	// 			this.service.sendAgrementData(res).subscribe(
	// 				(data) => {
	// 					this.populateAgrementMarche();
	// 					this.notification.sendMessage({
	// 						message: this.translate.instant(
	// 							"PAGES.GENERAL.MSG_SAVED_CONFIRMED"
	// 						),
	// 						type: NotificationType.success,
	// 					});
	// 					this.agrementData = {
	// 						id: "",
	// 						agrement: "",
	// 						dateAgrement: "",
	// 						observation: "",
	// 						ao: { id: this.idao }
	// 					};
	// 				},
	// 				(error) => {
	// 					console.log(error);
	// 				}
	// 			);
	// 		}
	// 	});
	// }
	// ===========================================================================
	//
	// ===========================================================================
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
	// ===============================================================
	//
	// ===============================================================
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

	// editAgrementMarche(id) {
	// 	this.service.getAgrementMarcheById(id).subscribe(
	// 		(result) => {
	// 			this.agrementData = result;
	// 			const dialogRef = this.dialog.open(EditAgrementAoComponent, {
	// 				width: "600px",
	// 				data: {
	// 					id: result.id,
	// 					agrement: result.agrement,
	// 					dateAgrement: new Date(result.dateAgrement),
	// 					observation: result.observation,
	// 					ao: { id: this.idao },
	// 				},
	// 			});
	// 			dialogRef.afterClosed().subscribe((res) => {
	// 				this.agrementData.ao = {id:""};
	// 				this.agrementData.ao.id = res.ao.id;
	// 				this.agrementData.id = res.id;
	// 				this.agrementData.agrement = res.agrement;
	// 				this.agrementData.dateAgrement = res.dateAgrement;
	// 				this.agrementData.observation = res.observation;
	// 				console.log(
	// 					"Lot: " + JSON.stringify(this.agrementData, null, 2)
	// 				);
	// 				if (this.agrementData) {
	// 					this.service.editAgrementData(this.agrementData).subscribe(
	// 						(data) => {

	// 							this.populateAgrementMarche();
	// 							this.notification.sendMessage({
	// 								message: this.translate.instant(
	// 									"PAGES.GENERAL.MSG_SAVED_CONFIRMED"
	// 								),
	// 								type: NotificationType.success,
	// 							});
	// 							this.agrementData = {
	// 								id: "",
	// 								agrement: "",
	// 								dateAgrement: "",
	// 								observation: "",
	// 								ao: { id: this.idao },
	// 							};
	// 						},
	// 						(error) => {
	// 							console.log(error);
	// 						}
	// 					);
	// 				}
	// 			});
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// }
	// ===============================================================
	//
	// ===============================================================
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

	// populateAgrementMarche() {
	// 	this.service.getAllAgrementMarcheByAo(this.idao).subscribe(
	// 		(result) => {
	// 			let temp = result;
	// 			console.log(result);
	// 			temp.map(item=>{
	// 				item.dateAgrement = new Date().setTime(item.dateAgrement);
	// 				item.dateAgrement = formatDate(item.dateAgrement, "dd/MM/yyyy", "ar-MA");
	// 			})
	// 			this.agrementDataList = result;

	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// }
	// ===============================================================
	//
	// ===============================================================
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

	// deleteAgrementMarche(id): void {
	// 	Swal.fire({
	// 		title: "Vouslez vous supprimer cet enregistrement ?",
	// 		icon: "question",
	// 		iconHtml: "؟",
	// 		showCancelButton: true,
	// 		showCloseButton: true,
	// 		confirmButtonText: "Oui",
	// 		cancelButtonText: "Non",
	// 	}).then((result) => {
	// 		/* Read more about isConfirmed, isDenied below */
	// 		if (result.isConfirmed) {
	// 			this.service.deleteAgrementMarcheById(id).subscribe(
	// 				(data) => {
	// 					console.log("Lot Deleted  : " + id);
	// 					Swal.fire({
	// 						position: "center",
	// 						icon: "success",
	// 						title: this.translate.instant(
	// 							"PAGES.GENERAL.MSG_DEL_CONFIRMED"
	// 						),
	// 						showConfirmButton: false,
	// 						timer: 1500,
	// 					});
	// 					this.populateAgrementMarche();
	// 				},
	// 				(error) => {
	// 					console.log(error);
	// 				}
	// 			);
	// 		}
	// 	});
	// }

	printAvis(idAo, lang) {
		console.log("Lang ::: " + idAo);

		this.service.fileGenerator("generateAvisAO/", idAo, lang).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});

				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				if (lang === "Fr") {
					link.download = "Avis FR.docx";
				} else {
					link.download = "Avis AR.docx";
				}

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
			}
		);
		/* 	this.service.fileGenerator("generate/", idAo, lang).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});
				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "Avis" + lang + ".pdf";
				link.href = readfile;
				link.dispatchEvent(
					new MouseEvent("click", {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				setTimeout(() => {
					//window.URL.revokeObjectURL(file);
					link.remove();
				}, 100);
			},
			(err) => {
				console.log(err);
			}); */
	}

	printAvisX(langDiv) {
		console.log("Lang : " + langDiv);
		this.lang = langDiv;
		window.print();
	}
	pvSeance1(Aoid) {
		this.service.fileSeance("PVSeance1/", Aoid).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});

				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");

				link.download = "PVOP_AO_seance1.docx";

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
			}
		);
	}
	PvSeance2(Aoid) {
		this.service.fileSeance("PVSeance2/", Aoid).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});

				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");

				link.download = "PVOP_AO_seance2.docx";

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
			}
		);
	}

	printBordereau(idAo, destinataire, division) {
		var dest = "MONSIEUR LE TRESORIER PREFECTORAL DE  MARRAKECH";

		if (destinataire == "tresorie") {
			dest = "MONSIEUR LE TRESORIER PREFECTORAL DE  MARRAKECH";
		} else if (destinataire == "dsg") {
			dest = "MONSIEUR LE DIRECTEUR GENERAL DES  SERVICES";
		} else if (destinataire == "division") {
			dest = "MONSIEUR LE CHEF DE LA DIVISION " + division.toUpperCase();
		}
		this.service.bordereaufileGenerator("bordereau/", idAo).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});
				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "BORDEREAU de consultation.docx";
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
			}
		);
	}
	/*
	printBordereau(idAo, division) {
		this.service.bordereaufileGenerator("bordereau/", idAo, division.toUpperCase()).subscribe((res) => {
			const file = new Blob([(res as unknown) as BlobPart], {
				type: "application/pdf",
			});
			const fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		},
			(err) => {
				console.log(err);
			});
	}
	*/
	// ================================================================
	//
	// ================================================================
	lettreMaintien(idAo) {
		this.getPrestataires();
		const dialogRef = this.dialog.open(LettreMaintienDialogComponent, {
			width: "400px",
			data: {
				ao: this.idao,
				prestataire: "",
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
				this.lettreMaintienTraitement(res.prestataire);
			}
		});
	}
	// ================================================================
	//
	// ================================================================
	async getPrestataires() {
		const _this = this;
		await this.service
			.getAllOffreDeposee(this.idao, 0, 5)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					console.log(data);
					this.prestataires = data;
				},
				(err) => {
					console.log(err);
				}
			);
	}
	// ================================================================
	//
	// ================================================================
	lettreMaintienTraitement(prestataire) {
		console.log("idPrestataire ::: " + prestataire);
		this.service.lettreMaintienGenerator("lettreMaintien/", this.idao, prestataire).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});
				const fileURL = URL.createObjectURL(file);
				window.open(fileURL);
				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "Lettre-du-Maintien.docx";
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
			}
		);
	}
	// ============================================
	// Historique
	// ============================================
	showHitory() {
		let tableRows = "";
		let tableRows1 = "";
		let tableRows2 = "";
		let tableRows3 = "";
		let tableRows4 = "";
		let tableRows5 = "";

		for (let i = 0; i < this.historiqueAo.length; i++) {
			tableRows += '<tr style="border-bottom: 1px dotted;">' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.historiqueAo[i].modificateurUser
				+
				"</td>" + '<td>modification</td>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.getDates(this.historiqueAo[i].updateDate) + "</td>" +

				"</tr>";
		}
		for (let i = 0; i < this.historiqueUpdateStatutToComment.length; i++) {
			tableRows1 += '<tr style="border-bottom: 1px dotted;">' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.historiqueUpdateStatutToComment[i].modificateurUser
				+
				"</td>" + '<td>modification du statut vers Commentaire à vérifier</td>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.getDates(this.historiqueUpdateStatutToComment[i].updateDate) + "</td>" +

				"</tr>";
		}
		for (let i = 0; i < this.historiqueUpdateStatutToEnAttenteValidation.length; i++) {
			tableRows2 += '<tr style="border-bottom: 1px dotted;">' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.historiqueUpdateStatutToEnAttenteValidation[i].modificateurUser
				+
				"</td>" + '<td>modification du statut vers en attente de validation</td>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.getDates(this.historiqueUpdateStatutToEnAttenteValidation[i].updateDate) + "</td>" +

				"</tr>";
		}
		for (let i = 0; i < this.historiqueUpdateStatutToValide.length; i++) {
			tableRows3 += '<tr style="border-bottom: 1px dotted;">' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.historiqueUpdateStatutToValide[i].modificateurUser
				+
				"</td>" + '<td>modification du statut vers valider</td>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.getDates(this.historiqueUpdateStatutToValide[i].updateDate) + "</td>" +

				"</tr>";
		}
		for (let i = 0; i < this.historiqueUpdateStatutFromValide.length; i++) {
			tableRows4 += '<tr style="border-bottom: 1px dotted;">' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.historiqueUpdateStatutFromValide[i].modificateurUser
				+
				"</td>" + '<td>modification du statut de valider vers ' + this.historiqueUpdateStatutFromValide[i].statutAoValide + '</td>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.getDates(this.historiqueUpdateStatutFromValide[i].updateDate) + "</td>" +

				"</tr>";
		}
		for (let i = 0; i < this.historiqueUpdateStatutMarche.length; i++) {
			tableRows5 += '<tr style="border-bottom: 1px dotted;">' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.historiqueUpdateStatutMarche[i].modificateurUser
				+
				"</td>" + '<td>modification du statut du marche vers ' + this.historiqueUpdateStatutMarche[i].statutMarche + '</td>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.getDates(this.historiqueUpdateStatutMarche[i].updateDate) + "</td>" +

				"</tr>";
		}

		Swal.fire({
			title: "Historique",
			width: '50%',
			icon: "info",
			confirmButtonText: "Fermer",
			html:
				'<div style="max-height: 400px;width:600px; overflow-y: auto;">' +
				'<table>' +
				'<thead style="background-color: #eaeaea">' +
				'<tr>' +
				'<td class="boder-table">Acteur</td>' +
				'<td class="boder-table">Action</td>' +
				'<td class="boder-table">Date</td>' +
				'</tr>' +
				'</thead>' +
				"<tbody>" +
				'<tr style="border-bottom: 1px dotted;">' +
				'<td style="font-size: 15px;" class="donnee_show">' +
				this.getCreator(this.ao.createurUser) +
				"</td>" +
				'<td>Création</td>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
				this.getDates(this.ao.creationDate) +
				"</td>" +
				'</tr>' +
				tableRows +
				tableRows1 + tableRows2 + tableRows3 + tableRows4 + tableRows5 +
				"</tbody>" +
				"</table>" +
				'</div>',
		});

	}
	// ============================================
	// get Creator
	// ============================================
	getCreator(user): string {
		var result = "Pas d'information";
		if (user != null) {
			result = this.ao.createurUser;
		}
		return result;
	}
	// ============================================
	// get Modificator
	// ============================================
	getModificator(user): string {
		var result = "Pas d'information";
		if (user != null) {
			result = this.ao.modificateurUser;
		}
		return result;
	}
	// ============================================
	// Date format
	// ============================================
	getDates(date): string {
		var result = "Pas d'information";
		if (date != null) {
			result = formatDate(date, "dd/MM/yyyy HH:mm", "ar-MA");
		}
		return result;
	}
	// ====================================================
	//
	//=====================================================
	editSm(idAo) {
		this.router.navigate(["/marches/ao-edit-sm"], {
			queryParams: { id: idAo },
		});
	}

	async getAllPjImm(id) {
		await this.service.getAllPjAo(id).subscribe(
			(data) => {
				this.dataSource2 = new MatTableDataSource(data);
			},
			(error) => console.log(error)
		);
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
}
export interface iQualification {
	id: number;
}
