import { Component, OnInit, ViewChild } from "@angular/core";
import { OrganisationService } from "../../organisation/organisation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ConsultationService } from "../../shared/consultation.service";
import { forkJoin } from "rxjs";
import { FilesUtilsService } from '../../utils/files-utils.service';
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { delay } from 'rxjs/operators';
import { environment } from "../../../../../environments/environment";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { ValiderBcModalComponent } from "../valider-bc-modal/valider-bc-modal.component";

@Component({
	selector: "kt-bon-commande-detail",
	templateUrl: "./bon-commande-detail.component.html",
	styleUrls: ["./bon-commande-detail.component.scss"],
})
export class BonCommandeDetailComponent implements OnInit {
	// ===============================================================
	//
	// ===============================================================
	pjs;
	idBonCommande;
	tva;
	idConsultation;
	divisionLibelle;
	serviceLibelle;
	public uploadFiles: Array<File>;
	// ===============================================================
	//
	// ===============================================================
	constructor(
		private service1: ConsultationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service: OrganisationService,
		private fileService: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService,
		private serviceAO: AoService,
		public dialog: MatDialog,

	) { }
	// ===============================================================
	//
	// ===============================================================
	OffreAdjucataire = {
		id: 0,
		adjucataire: false,
		prestataire: { prenom: "", nom: "", rc: "", mail: "", adresse: "", tel: "" },
		commande: { mntTotal: 0, mntTtc: 0, tva: 0 },
	};
	consultation = {
		dateDebutConsultation: null,
		id: 1,
		seuilMinimal: 0,
		description: "",
		statut: { id: 1, libelle: "" },
		service: 0,
		division: 0,
		budgetGlobalPropose: 0,
		type: { id: 0, libelle: "" },
		objet: "",
	};
	bonCommande = {
		id:0,
		statutBC:null,
		consultation: { id: "" },
	sousTypePrestation:{ id: '' },
	typePrestation:{ id: '',libelle:"" },
	dateLivraison: null ,
	dateDevis: null , 
	dateOuverturePlis: null , 
	refDeBC:0,
	estimation:0,
	bordereauPrix:0,
	montantDeBC:0,
	createurUser:'',
	modificateurUser: "",

	raisonSociale:'',
	 objet:'',
	 lieuxDevis:'',
	 delaiLivraison:''
	};	isLoading = true;
	// ===============================================================
	// Presentation de datasource
	// ===============================================================
	displayedColumns: string[] = [
		"icon",
		"name",
		"type",
		"label",
		"dateFile",
		"fSize",
		"actions",
	];
	// ===============================================================
	// Controles pagination
	// ===============================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	dataSource = new MatTableDataSource<any>();
	statut:FormGroup

	// ===============================================================
	//
	// ===============================================================
	ngOnInit() {
		this.statut = new FormGroup({
			statut: new FormControl(0,Validators.required),
		  });
		this.isLoading = false;
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idBonCommande = params["id"];
			
		});
		this.service1.getByIdBonCommande(this.idBonCommande).subscribe((data)=>{
			this.bonCommande = data;
			this.statut.get("statut").setValue(data.statutBC);

		})

		// forkJoin(
		// 	this.service1.getOffreDeposeeAdjucataire(this.idConsultation),
		// 	this.service1.getByIdBonCommande(this.idBonCommande)
		// ).subscribe((data) => {
		// 	this.bonCommande = data[1];
		// 	this.OffreAdjucataire = data[0][0];
		// 	this.consultation = data[0][0].consultation;
		// 	const Ntva = this.OffreAdjucataire.commande.mntTtc - this.OffreAdjucataire.commande.mntTotal;
		// 	this.tva = Math.ceil((Ntva * 100) / this.OffreAdjucataire.commande.mntTotal);
			// this.getDivisionEtService();
		// });

		this.getAllBCFiles()
	}
	// ===============================================================
	//
	// ===============================================================
	updateStatut(event): void {
		console.log(event)
			Swal.fire({
				title: "Voulez-vous changer   le statut de ce bon de commande ?",
				icon: "question",
				iconHtml: "?",
				showCancelButton: true,
				showCloseButton: true,
				confirmButtonText: "Oui",
				cancelButtonText: "Non",
			}).then((result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					this.bonCommande.statutBC=event.value


					if(event.value =='ADJUGE' ){
						this.annulerAoDialog(event.value,this.bonCommande.id);

					}else{
						this.service1
						.updateStatutBC(this.bonCommande)
						.subscribe((res) => {
							
							this.router.navigate(["/marches/bon-commande-detail"], {
								queryParams: { id: this.bonCommande.id },
							});		});
					}
						
						// this.service1
						// .updateStatutBC(this.bonCommande)
						// .subscribe((res) => {
							
						// 	this.router.navigate(["/marches/bon-commande-detail"], {
						// 		queryParams: { id: this.bonCommande.id },
						// 	});						});
					// }
				
				}
			});
		}
		annulerAoDialog(Statut,id) {
			
			const dialogRef = this.dialog.open(ValiderBcModalComponent, {
				width: "630px",
				data: {
					id:id,
					statutBC: Statut,
					dateOuverturePlis: "",
					refDeBC: "",
				},
			});
			dialogRef.afterClosed().subscribe((res) => {
				
				if (res) {
					this.bonCommande.statutBC=res.statutAoValide
					this.bonCommande.dateOuverturePlis=res.dateOuverturePlis
					this.bonCommande.refDeBC=res.refDeBC
					this.bonCommande.id=res.id

					// this.aoDialog = res;
					if (res) {
						
						this.service1
						.updateStatutBC(this.bonCommande)
						.subscribe((res) => {
							
							this.router.navigate(["/marches/bon-commande-detail"], {
								queryParams: { id: this.bonCommande.id },
							});		});
	
						// this.notification.warn(
						// 	this.translate.instant(
						// 		"PAGES.GENERAL.MSG_CONCEL_AO_CONFIRMED"
						// 	)
						// );
					}
				}
			});
		}
	onEdit() {
		this.router.navigate(["/marches/bon-commande-edit"], {
			queryParams: { id: this.idBonCommande, idC: this.idConsultation },
		});
	}

	// ================================================================
	// Recuperer tous les pjs
	// ================================================================
	public getAllBCFiles() {
		this.serviceAO.getByIdBCFiles(this.idBonCommande)
			.pipe(delay(1000))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);

	}
	// ===============================================================
	//
	// ===============================================================
	backList() {
		this.router.navigate(["/programme/list-EtudeBesion-Bc"]);
	}
	// ===============================================================
	//
	// ===============================================================
	// onClickPjName(a,e) {
	// 	console.log("You clicked: " + e);
	// 	var r = e.substring(0, e.length - 4);
	// 	console.log(r);
	// 	//window.open(environment.API_ALFRESCO_URL + "/MarcheConvention/"+r);
	// 	this.serviceAO.downoldFile(r, a);
	// }
	onClickPjName(e, id) {
		var r = e.substring(0, e.length - 4);
		window.open(environment.API_ALFRESCO_URL + "/PjBC/" + r, "_blank");
	}
	
	// ============================================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.fileService.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.fileService.getExtensionFile(file);
	}
	// =================================================================
	// Delete file from server
	// =================================================================
	onDeleteFile(id: any) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			console.log("Delete file ID: " + id);
			this.serviceAO
				.deleteBCfiles(id)
				.subscribe((data) => {
					console.log("File deleted : " + id);
					this.isLoading = true;
					this.dataSource = new MatTableDataSource([]);
					this.getAllBCFiles();
				});
			// Notification
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
}
