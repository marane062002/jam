import { OrganisationService } from "./../../organisation/organisation.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ConsultationService } from "../../shared/consultation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm, FormBuilder, FormGroup } from "@angular/forms";
import { AoService } from '../../shared/ao.service';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { environment } from "./../../../../../environments/environment";
import { delay } from 'rxjs/operators';
import * as $ from "jquery";

interface typePJ {
	libelle: string; 
}

@Component({
	selector: "kt-bon-commande-form",
	templateUrl: "./bon-commande-form.component.html",
	styleUrls: ["./bon-commande-form.component.scss"],
}) 
export class BonCommandeFormComponent implements OnInit {
	// =========================================================================
	//
	// =========================================================================
	tva;
	idBonCommande;
	idConsultation;
	divisionLibelle;
	serviceLibelle;
	libelleDivision;
	lisTypePrestationAo:any[]=[];
	libelleService;
	ShowSuccessShare = false;
	isLoadingForShare = false;
	id: number;
	private unsubscribe: Subscription[] = [];
	@ViewChild('inputFile', { static: true }) inputFile: ElementRef;
	// =========================================================================
	// Declarations
	// =========================================================================
	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	public uploadFiles: Array<File>;
	addFileForm: FormGroup;
	typePJ: typePJ[];
	formData = { type: "" }
	type: string;
	activeBtn: boolean = true;
	// =========================================================================
	//
	// =========================================================================
	constructor(
		private serviceAO: AoService,
		private service1: ConsultationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service: OrganisationService,
		private formBuilder: FormBuilder,
		private fileService: FilesUtilsService,
		private notification: NotificationService,
		private translate: TranslateService,
	) { }
	// =========================================================================
	// Presentation de datasource
	// =========================================================================
	displayedColumns: string[] = [
		"icon",
		"name",
		"type",
		"dateFile",
		"fSize",
		"actions",
	];
	// =========================================================================
	// Controles pagination
	// =========================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =========================================================================
	//
	// =========================================================================
	async getDivisionEtService() {
		// await this.service
		// 	.findEntityById(this.consultation.division, "/divisions/find/")
		// 	.subscribe((d) => {
		// 		this.divisionLibelle = d.libelle;
		// 		console.log(this.divisionLibelle);
		// 	});

		// await this.service
		// 	.findEntityById(this.consultation.service, "/services/find/")
		// 	.subscribe((s) => {
		// 		this.serviceLibelle = s.libelle;
		// 	});
			this.serviceAO.getAllTypePrestationAo().subscribe((data) => {
				this.lisTypePrestationAo = data;
			});
	}
	// =========================================================================
	//
	// =========================================================================
	OffreAdjucataire = {
		id: 0,
		adjucataire: false,
		prestataire: {
			prenom: "",
			nom: "",
			rc: "",
			mail: "",
			adresse: "",
			tel: "",
		},
		commande: { mntTotal: 0, mntTtc: 0, tva: 0 },
	};
	formPj = { LabelPj:'', selecetedFile: {} ,type:{}};

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
		statutBC:null,
		 consultation: { id: "" },
	sousTypePrestation:{ id: '' },
	typePrestation:{ id: '' },
	// dateLivraison: null ,
	dateDevis: null , 
	refDeBC:0,
	estimation:0,
	bordereauPrix:0,
	montantDeBC:0,
	createurUser:'',
	// raisonSociale:'',
	 objet:'',
	//  lieuxDevis:'',
	 delaiLivraison:''
	};
	unites = [];

	// =========================================================================
	//
	// =========================================================================
	ngOnInit() {
		this.serviceAO.getAlltypePjAo().subscribe((res) => {
			console.log(res);
			this.unites = res;
			this.unites = this.unites.filter((item) => !(item.id == 3 || item.id == 4));
		});
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idConsultation = params["id"];
		});
		// this.service1
		// 	.getOffreDeposeeAdjucataire(this.idConsultation)
		// 	.subscribe((data) => {
		// 		this.OffreAdjucataire = data[0];
		// 		this.consultation = data[0].consultation;
		// 		const Ntva =
		// 			this.OffreAdjucataire.commande.mntTtc -
		// 			this.OffreAdjucataire.commande.mntTotal;
		// 		this.tva = Math.ceil(
		// 			(Ntva * 100) / this.OffreAdjucataire.commande.mntTotal
		// 		);
		// 		console.log(
		// 			"consultation :: " + JSON.stringify(this.consultation)
		// 		);
		// 		console.log(
		// 			"OffreAdjucataire :: " +
		// 			JSON.stringify(this.OffreAdjucataire, null, 2)
		// 		);
		 		this.getDivisionEtService();
		// 	});
		/*
		this.isLoading = false;
		this.getAllBCFiles();

		this.fileService.fileSizeDetector();

		this.addFileForm = this.formBuilder.group({
			_file: [],
		});


		this.typePJ = [
			{ libelle: "Reçus BC" },
			{ libelle: "Autre fichier" },
		];
		*/
	}
	allpjs = [];
	dataSource1: MatTableDataSource<any>;
	displayedColumns1 = ["type","label", "nomDoc", "actions"];

	validerPj() {
		this.allpjs.push(this.formPj);
		$("#test").val(null);
		console.log(this.allpjs);
		this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.formPj = { LabelPj:this.formPj.LabelPj, selecetedFile: {},type:{} };
	}
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	}
	// =========================================================================
	// On Destroy
	// =========================================================================
	ngOnDestroy() {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
		console.log("destroy");
	}
	// =========================================================================
	// Filter de recherche
	// =========================================================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// =========================================================================
	// Download file from server
	// =========================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjBC/" + r);
	}
	// =========================================================================
	// Delete file from server
	// =========================================================================
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
	// ============================================
	// 
	// ============================================
	public getAllBCFiles() {
		this.serviceAO.getByIdBCFiles(this.idBonCommande)
			.pipe(delay(1000))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.isLoadingResults = false;
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
					this.isLoadingResults = false;
				}
			);

	}
	// =========================================================================
	// get file name
	// =========================================================================
	FileName(file) {
		return this.fileService.getFileName(file);
	}
	// =========================================================================
	// get file extension & icons
	// =========================================================================
	FileExtension(file) {
		return this.fileService.getExtensionFile(file);
	}
	// =========================================================================
	// Upload files
	// =========================================================================
	fileChange(event) {
		this.uploadFiles = event.target.files;
		if (event.target.files.length > 0) {
			// this.type = this.formData.type;
			console.log("file size !! " + event.target.files.length + " / type :: " + this.type);
			this.addFileForm.patchValue(this.uploadFiles);
		}
	}
	// =========================================================================
	// reset file
	// =========================================================================
	resetFile() {
		// reset file input
		this.inputFile.nativeElement.value = '';
		this.addFileForm.get('_file').reset();
		this.formData.type = null;
	}
	// =========================================================================
	//
	// =========================================================================
	onChangeType(f) {
		this.type = f.value;
		console.log(" Type file :: " + this.type)
		this.activeBtn = false;
	}
	// =========================================================================
	//
	// =========================================================================
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		const controls = this.addFileForm.controls;
		/** check form */
		if (this.addFileForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		console.log("id : " + this.idBonCommande + " et file " + this.uploadFiles.length + " / type :: " + this.type);
		if (this.uploadFiles != null) {
			 this.serviceAO.updloadBCFile(this.uploadFiles, this.idBonCommande, this.type,this.formPj.LabelPj)
				.subscribe(
					(res) => {
						console.log("File inserted " + JSON.stringify(res));
						this.isLoadingForShare = false;
						this.ShowSuccessShare = true;
						setTimeout(() => {
							this.hideS();
						}, 1500);
						this.isLoading = true;
						this.dataSource = new MatTableDataSource([]);
						this.getAllBCFiles();
						// reset file input
						this.inputFile.nativeElement.value = '';
						this.formData = { type: "" };
					},
					(err) => console.log("File not inserted " + JSON.stringify(err))
				);
		}
	}
	isVisible13
	selectedTypePJ(event){
		if(event.id==7){
			this.isVisible13=true
		}else{
			this.isVisible13=false
		}

	}
	// ========================================================================
	//
	// ========================================================================
	hideS() {
		this.ShowSuccessShare = false;
	}
	// ========================================================================
	//
	// ========================================================================
	backList() {
		this.router.navigate(["/programme/list-EtudeBesion-Bc"]);
	}
	// ========================================================================
	//
	// ========================================================================
	onEditBC() {
		this.bonCommande.createurUser = window.localStorage.getItem("fullnameUser");
		if(this.bonCommande.consultation.id!=''){
			this.bonCommande.consultation.id = this.idConsultation;

		}else{
			this.bonCommande.consultation=null
		}
		

		if(this.bonCommande.typePrestation.id==''){
			this.bonCommande.typePrestation= null

		}
		
		if(this.bonCommande.sousTypePrestation.id==''){
			this.bonCommande.sousTypePrestation= null

		}

		this.service1.sendBonCommande(this.bonCommande).subscribe((data) => {
			console.log(data);
			for (var i = 0; i < this.allpjs.length; i++) {
						
				this.serviceAO.updloadBCFile(this.allpjs[i].selecetedFile, data["id"],this.allpjs[i].type.id,this.formPj.LabelPj).subscribe((data) => {
					console.log("C: " + JSON.stringify(data, null, 2));
				});
			}
			this.backList()
			// this.router.navigate(["/marches/bon-commande-detail"], {
			// 	queryParams: { id: data.id },
			// });
		});
	}
	onChangeTypePrestationAo(f) {
		const type = f.value;
		this.bonCommande.typePrestation.id = f.value;
		if (type != 0) {
			this.bonCommande.typePrestation.id = type;
		// 	// Liste des sous types prestation
		// 	this.service.getAllSoustypePresattaionAo(type).subscribe(
		// 		(data) => {
		// 			this.listSousTypePrestationAo = data;
		// 		},
		// 		(error) => console.log(error)
		// 	);
		// } else {
		// 	this.listSousTypePrestationAo = null;
		// }
	}}
	onDeletePj(id: number): void {
		this.allpjs.splice(id, 1);
		if (this.allpjs.length > 0) {
			this.dataSource1 = new MatTableDataSource(this.allpjs);
		} else {
			this.dataSource1 = null;
		}
	}
}
