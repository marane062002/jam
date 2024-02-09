import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from "@angular/material";
import { OrganisationService } from "../../organisation/organisation.service";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { ConcelAoComponent } from "../dialog-forms/concel-ao/concel-ao.component";
import { Subscription } from "rxjs";
import { environment } from "./../../../../../environments/environment";
import Swal from "sweetalert2";
import { EditSecteurComponent } from "../dialog-forms/edit-secteur/edit-secteur.component";
import { EditLotAoComponent } from "../dialog-forms/edit-lot-ao/edit-lot-ao.component";
import { NotificationType } from "../../shared/NotificationMessage.service";
import { LettreMaintienDialogComponent } from "../dialog-forms/lettre-maintien-dialog/lettre-maintien-dialog.component";
import { SpinnerService } from "../../utils/spinner.service";
import { delay, finalize } from "rxjs/operators";
import { formatDate } from "@angular/common";
import { EditAgrementAoComponent } from "../dialog-forms/edit-agrement-ao/edit-agrement-ao.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ShowPjCommentaireComponent } from "../show-pj-commentaire/show-pj-commentaire.component";

@Component({
	selector: "kt-ao-detail",
	templateUrl: "./ao-detail.component.html",
	styleUrls: ["./ao-detail.component.scss"],
})
export class AoDetailComponent implements OnInit, AfterViewInit {
	private unsubscribe: Subscription[] = [];

	checkLang: string;
	secteursDataSource: any;
	arrList: any;
	lotMarcheDataSource: any;
	agrementAO: any;
	showPage: number = 0;
	showPageFR: number = 0;
	showPageAR: number = 0;
	lang: string = "avisAR";
	backPage=0; 
	commentaire:FormGroup
	statut:FormGroup

	// ===============================================================
	//
	// ===============================================================
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service1: OrganisationService,
		private translate: TranslateService,
		private notification: NotificationService,
		public dialog: MatDialog,
		private spinnerService: SpinnerService
	) {
		this.commentaire = new FormGroup({
			note: new FormControl('',Validators.required),
		  });
		  this.statut = new FormGroup({
			statut: new FormControl(0,Validators.required),
		  });
	}
	// ===============================================================
	//
	// ===============================================================
	ao = {
		typeConsultationArchitecturale:'',
		statutAoValide:'',
		id: 0,
		Motif: "",
		typeBudget: "",
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
		programme:"",
		convention:"",
		typeAO:"",
		typePrestation:{ id: "", libelle: "" },
		estimation:"",
		objetAR:"",
		naturePrix:"",
		qualification:"",
		loi:"",
		etatCommentaire:'',
		existanceAllotisse:"",
		existanceAgrement:null,
		existEchantillon:null,
		existQualification:null,
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
			  date: 0
			}
		]
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
		ao: { id: "" }
	};

	agrementDataList : any[]; 


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
	prestataires:any[]=[];
	dataSource2: MatTableDataSource<any>;
	displayedColumns2 = ["nomDoc","type","label", "dow"];
	// ===============================================================
	//
	// ===============================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ===============================================================
	//
	// ===============================================================
	ngAfterViewInit() {}
	// ===============================================================
	//
	// ===============================================================
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
		
		this.getHistoriqueAoByIdAo();
		this.getHistoriqueUpdateStatutToCommentByIdAo();
		this.getHistoriqueUpdateStatutToEnAttenteValidationByIdAo();
		this.getHistoriqueUpdateStatutToValideByIdAo();
		this.getHistoriqueUpdateStatutFromValideByIdAo();
this.getHistoriqueUpdateStatutMarcheByIdAo()
		this.getDetailsAo();
		
		this.populateSecteurs();

		this.populateLotMarche();

		// this.populateAgrementMarche();
	}
	historiqueAo
	getHistoriqueAoByIdAo(){
		this.service.findHistoriqueAoByAo_Id(this.idao).then((res)=>{
			this.historiqueAo=res

		})
	}
	historiqueUpdateStatutFromValide
	getHistoriqueUpdateStatutFromValideByIdAo(){
		this.service.findHistoriqueUpdateStatutFromValideByAo_Id(this.idao).then((res)=>{
			this.historiqueUpdateStatutFromValide=res

		})
	}
	historiqueUpdateStatutToComment
	getHistoriqueUpdateStatutToCommentByIdAo(){
		this.service.findHistoriqueUpdateStatutToCommentByAo_Id(this.idao).then((res)=>{
			this.historiqueUpdateStatutToComment=res

		})
	}
	historiqueUpdateStatutToEnAttenteValidation
	getHistoriqueUpdateStatutToEnAttenteValidationByIdAo(){
		this.service.findHistoriqueUpdateStatutToEnAttenteValidationByAo_Id(this.idao).then((res)=>{
			this.historiqueUpdateStatutToEnAttenteValidation=res

		})
	}
	historiqueUpdateStatutToValide
	getHistoriqueUpdateStatutToValideByIdAo(){
		this.service.findHistoriqueUpdateStatutToValideByAo_Id(this.idao).then((res)=>{
			this.historiqueUpdateStatutToValide=res

		})
	}
	historiqueUpdateStatutMarche
	getHistoriqueUpdateStatutMarcheByIdAo(){
		this.service.findHistoriqueUpdateStatutMarcheByAo_Id(this.idao).then((res)=>{
			this.historiqueUpdateStatutMarche=res

		})
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
	onSubmit(value:any){ 
		console.log(value);
		this.service.updateCommentaire(this.idao, value).subscribe(res=>{
		  console.log(res);
		  Swal.fire(
			'Commentaire à été bien traité',
			' ',
			'success'
		  )
		  this.ngOnInit();
		},err=>{
		  console.log(err)
		})
	  
	  }
	// ===============================================================
	//
	// ===============================================================
	existAllotissement
	getDetailsAo() {
		var spinnerRef = this.spinnerService.start(
			this.translate.instant("PAGES.GENERAL.LOADING")
		); // start spinner
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
					this.getHistoCommentaire();

					// this.commentaire.get("note").setValue(data.commentaire);
					this.statut.get("statut").setValue(data.statutAoValide);
					if (data.typeMarche != null) {
						if (data.typeMarche.id != null) {
							if(data.typeMarche.id==6){
								this.populateLotMarche();
							this.existAllotissement=true
							}
						}
					} 				
					console.log("AO " + JSON.stringify(data, null, 2))
					this.service.SM = this.ao.seuilMinimal;
					this.service.PourcentageTechnique = this.ao.ptechnique;
					this.service.PourcentageFinancier = this.ao.pfinancier;
					this.service.ModePassationAo = this.ao.modePassation;
					this.getDivisionEtService();

					var b = { index: 0 };
					this.changeTab(b);
				},
				(err) => {
					console.log(err);
				}
			);
	}
	histoCommentaireList
	historiqueCommentaire=false

	async getHistoCommentaire() {
		this.service.findByAo_IdOrderByIdDesc(this.ao.id).then((res)=>{
			this.commentaire.get("note").setValue(res[0].commentaire);
			this.histoCommentaireList=res
			if(res.length!=0){
				this.historiqueCommentaire=true
			}

		})
	}
	traiterAO(event){
		console.log(this.idao);
		Swal.fire({
  title: 'Motif',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  confirmButtonText: 'Ok',
  cancelButtonText: 'Non',
  showLoaderOnConfirm: true,
}).then((result) => {
	console.log(result.value);
  if (result.isConfirmed) {
	this.service.updateStautswithMotif(this.idao,result.value ).subscribe(
				(data) => {
					Swal.fire(
						'OK!',
						'',
						'success'
					  )
					  this.back();
				},
				(err) => {
					console.log(err);
				}
			);
  
  }
})

	}
	// ===============================================================
	//
	// ===============================================================
	async getDivisionEtService() {
		if (this.ao.division != 0)
			await this.service1
				.findEntityById(this.ao.division, "/divisions/find/")
				.subscribe(
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
			await this.service1
				.findEntityById(this.ao.serviceGestionnaire, "/services/find/")
				.subscribe(
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
	// ===============================================================
	//
	// ===============================================================
	changeTab(a) {
		if (a.index == 0) {
			this.router.navigate(["marches/ao-detail/ligneBP-form"], {
				queryParams: { id: this.idao },
			});
		}

		if (a.index == 1) {
			this.router.navigate(["marches/ao-detail/circuit-validation"], {
				queryParams: { id: this.idao },
			});
		}

		if (a.index == 2) {
			this.router.navigate(["marches/ao-detail/valide-dg-service"], {
				queryParams: { id: this.idao },
			});
		}

		if (a.index == 3) {
			this.router.navigate(["marches/ao-detail/valide-tresorerie"], {
				queryParams: { id: this.idao },
			});
		}
		if (a.index == 4) {
			this.router.navigate(["marches/ao-detail/ao-echantillon"], {
				queryParams: { id: this.idao },
			});
		}
		if (a.index == 5) {
			this.router.navigate(["/marches/ao-detail/commission"], {
				queryParams: { id: this.idao },
			});
		}
		if (a.index == 6) {
			this.router.navigate(["/marches/ao-detail/journal"], {
				queryParams: { id: this.idao },
			});
		}
		if (a.index == 7) {
			this.router.navigate(["marches/ao-detail/prestataires"], {
				queryParams: { id: this.idao },
			});
		}
		if (a.index == 8) {
			this.router.navigate(["/marches/ao-detail/pieces-jointes"], {
				queryParams: { id: this.idao },
			});
		}
		if (a.index == 9) {
			this.router.navigate(["/marches/ao-detail/ao-statut"], {
				queryParams: { id: this.idao },
			});
		}
		if (a.index == 10) {
			this.router.navigate(["/marches/ao-detail/ao-visite"], {
				queryParams: { id: this.idao },
			});
		}
		
		
	
	}

	// ===============================================================
	//
	// ===============================================================
	AddBp() {
		this.router.navigate(["marches/ao-detail/ligneBP-form"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddValid() {
		this.router.navigate(["marches/ao-detail/circuit-validation"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	valideTresorie() {
		this.router.navigate(["marches/ao-detail/valide-tresorerie"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddCommission() {
		this.router.navigate(["/marches/ao-detail/commission"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddPrestataires() {
		this.router.navigate(["marches/ao-detail/prestataires"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddVisites() {
		this.router.navigate(["/marches/ao-detail/ao-visite"], {
			queryParams: { id: this.idao },
		});
	}
	// ===============================================================
	//
	// ===============================================================
	AddEchantillon() {
		this.router.navigate(["marches/ao-detail/ao-echantillon"], {
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
		this.service
			.PrintGenerator("printAoFr/", this.idao)
			.subscribe((res) => {
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
			this.backPage= params["page"];
		});
		this.service
			.PrintGenerator("printAoAr/", this.idao)
			.subscribe((res) => {
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
		if(this.backPage==1){
			this.router.navigate(["/programme/list-EtudeBesion"]);
		}else{
			this.router.navigate(["/programme/list-EtudeBesion"]);
		}
		
	}
	// =================================================================
	// Methode de suppression des courrier entrants
	// =================================================================
	// annulerAO(idAo): void {
	// 	Swal.fire({
	// 		title: "Voulez vous annuler cette AO ?",
	// 		icon: "question",
	// 		iconHtml: "?",
	// 		showCancelButton: true,
	// 		showCloseButton: true,
	// 		confirmButtonText: "Oui",
	// 		cancelButtonText: "Non",
	// 	}).then((result) => {
	// 		/* Read more about isConfirmed, isDenied below */
	// 		if (result.isConfirmed) {
	// 			this.annulerAoDialog(idAo);
	// 			Swal.fire({
	// 				position: "center",
	// 				icon: "success",
	// 				title: "Appel d'offre annuler",
	// 				showConfirmButton: false,
	// 				timer: 1500,
	// 			});
	// 		}
	// 	});
	// }
	// ================================================================
	//
	// ================================================================

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
				this.secteurData.qualifications.push(
					this.createNewQualif(index)
				);
			}
			console.log("Res: " + JSON.stringify(this.secteurData, null, 2));
			if (res) {
				this.service
					.sendSecteurEntrepriseData(this.secteurData)
					.subscribe(
						(res) => {
							this.populateSecteurs();
							this.notification.sendMessage({
								message: this.translate.instant(
									"PAGES.GENERAL.MSG_SAVED_CONFIRMED"
								),
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
					console.log(
						"Qualif: " +
							JSON.stringify(
								this.secteurData.qualifications,
								null,
								2
							)
					);
					this.qualifList = res.qualifications;
					for (
						let index = 0;
						index < this.qualifList.length;
						index++
					) {
						this.secteurData.qualifications.push(
							this.createNewQualif(index)
						);
					}
					console.log(
						"Res: " + JSON.stringify(this.secteurData, null, 2)
					);
					if (res) {
						this.service
							.sendSecteurEntrepriseData(this.secteurData)
							.subscribe(
								(res) => {
									this.populateSecteurs();
									this.notification.sendMessage({
										message: this.translate.instant(
											"PAGES.GENERAL.MSG_SAVED_CONFIRMED"
										),
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
							title: this.translate.instant(
								"PAGES.GENERAL.MSG_DEL_CONFIRMED"
							),
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
 


	

	printAvis(idAo, lang) {
		console.log("Lang ::: " + idAo);

		this.service.fileGenerator("generateAvisAO/",idAo,lang).subscribe(
			(res) => {
				const file = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});

			

				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				if(lang==='Fr'){
					link.download = "Avis FR.docx";
				}else{
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
			});
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
	pvSeance1(Aoid){
		this.service.fileSeance("PVSeance1/",Aoid).subscribe(
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
			});
	}
	PvSeance2(Aoid){
		this.service.fileSeance("PVSeance2/",Aoid).subscribe(
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
			});
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
		await this.service.getAllOffreDeposee(this.idao).pipe(delay(300)).subscribe((data) => {
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
        "</td>" +'<td>modification</td>'+
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.getDates(this.historiqueAo[i].updateDate)+        "</td>" +
		
        "</tr>";
}
for (let i = 0; i < this.historiqueUpdateStatutToComment.length; i++) {
    tableRows1 += '<tr style="border-bottom: 1px dotted;">' +
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.historiqueUpdateStatutToComment[i].modificateurUser
         +
        "</td>" +'<td>modification du statut vers Commentaire à vérifier</td>'+
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.getDates(this.historiqueUpdateStatutToComment[i].updateDate)+        "</td>" +
		
        "</tr>";
}
for (let i = 0; i < this.historiqueUpdateStatutToEnAttenteValidation.length; i++) {
    tableRows2 += '<tr style="border-bottom: 1px dotted;">' +
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.historiqueUpdateStatutToEnAttenteValidation[i].modificateurUser
         +
        "</td>" +'<td>modification du statut vers en attente de validation</td>'+
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.getDates(this.historiqueUpdateStatutToEnAttenteValidation[i].updateDate)+        "</td>" +
		
        "</tr>";
}
for (let i = 0; i < this.historiqueUpdateStatutToValide.length; i++) {
    tableRows3 += '<tr style="border-bottom: 1px dotted;">' +
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.historiqueUpdateStatutToValide[i].modificateurUser
         +
        "</td>" +'<td>modification du statut vers valider</td>'+
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.getDates(this.historiqueUpdateStatutToValide[i].updateDate)+        "</td>" +
		
        "</tr>";
}
for (let i = 0; i < this.historiqueUpdateStatutFromValide.length; i++) {
    tableRows4 += '<tr style="border-bottom: 1px dotted;">' +
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.historiqueUpdateStatutFromValide[i].modificateurUser
         +
        "</td>" +'<td>modification du statut de valider vers '+this.historiqueUpdateStatutFromValide[i].statutAoValide+'</td>'+
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.getDates(this.historiqueUpdateStatutFromValide[i].updateDate)+        "</td>" +
		
        "</tr>";
}
for (let i = 0; i < this.historiqueUpdateStatutMarche.length; i++) {
    tableRows5 += '<tr style="border-bottom: 1px dotted;">' +
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.historiqueUpdateStatutMarche[i].modificateurUser
         +
        "</td>" +'<td>modification du statut du marche vers '+this.historiqueUpdateStatutMarche[i].statutMarche+'</td>'+
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
		this.getDates(this.historiqueUpdateStatutMarche[i].updateDate)+        "</td>" +
		
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
				  '<thead style="background-color: #eaeaea">'+
					'<tr>'+
					  '<td class="boder-table">Acteur</td>'+
					  '<td class="boder-table">Action</td>'+
					  '<td class="boder-table">Date</td>'+
					'</tr>'+
				  '</thead>'+
				  "<tbody>" +
					'<tr style="border-bottom: 1px dotted;">' +
					  '<td style="font-size: 15px;" class="donnee_show">' +
						this.getCreator(this.ao.createurUser) +
					  "</td>" +
					  '<td>Création</td>'+
					  '<td style="font-size: 15px; direction: initial;" class="donnee_show">' +
						this.getDates(this.ao.creationDate) +
					  "</td>" +
					'</tr>'+
					tableRows +
					tableRows1 +tableRows2+tableRows3+tableRows4+tableRows5+
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
		await this.service.getAllPjAo(id).subscribe(data => {
			this.dataSource2 = new MatTableDataSource(data);
		}, error => console.log(error));

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
