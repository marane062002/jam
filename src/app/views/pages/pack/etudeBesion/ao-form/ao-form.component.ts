import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { AoService } from "../../../shared/ao.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrganisationService } from "../../../organisation/organisation.service";
import { MatTableDataSource, MatDialog, MatSelectChange } from "@angular/material";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ConventionMarcheService } from '../../../shared/conventionService';
import { ProgrammeService } from '../../../shared/ProgrammeService';
import { ConfirmDialogComponent } from "../../../marche/confirm-dialog/confirm-dialog.component";
import { GestionDesTypesAoService } from "../../../parametrage/Services/gestion-des-types-ao.service";
import { EditLotAoComponent } from "../../../marche/dialog-forms/edit-lot-ao/edit-lot-ao.component";
import { GestionClassificationService } from "../../../parametrage/Services/gestion-classification.service";
import { GestionQualificationService } from "../../../parametrage/Services/gestion-qualification.service";

@Component({
	selector: "kt-ao-form",
	templateUrl: "./ao-form.component.html",
	styleUrls: ["./ao-form.component.scss"],
})
export class EBFormComponent implements OnInit {

 
	checkLang: string;
	// ====================================================
	// variable  pour check  estimation 
	//=====================================================
	estimation: number;
	typePrestation: number;
	codeOrientations = ["A", "B", "C", "D", "E", "F", "G", " H", "I", " J", "K", "L", "M", "N", " O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", " Y", "Z"]

	// ====================================================
	//
	//=====================================================
	constructor(private serviceClassification: GestionClassificationService, private serviceQualification: GestionQualificationService,private serviceTypeAo: GestionDesTypesAoService,
		private service: AoService,
		private service2: OrganisationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private fileUtils: FilesUtilsService,
		private dialog: MatDialog,
		private translate: TranslateService,
		private programmeService: ProgrammeService,
		private conventionMarcheService: ConventionMarcheService
	) { this.checkLang = window.localStorage.getItem("language"); }
	// ====================================================
	//
	//=====================================================
	checked: boolean = false;
	formPj = { type: {id:''}, selecetedFile: {},label:'' };
	allpjs = [];
	showAddDoc = false;
	unites = [];
	typeMarcheAll;
	natureAoAll;
	selectedCps;
	selectedRc;
	selectedOption = 1;
	bool;
	divisions: any;
	services: any;
	loading = false;

	isVisible10 = false;
	isSelected10: false;


	isVisible: any;

	isVisible3: any;
	isSelected: boolean = true;

	isVisible4 = false;
	isSelected4: false;

	isVisible5 = false;
	isSelected5: false;

	isSelected6: false;

	listProjet;
	listConvention;
	projet = '';
	idProgramme = '';
	listprogramme;
	lisTypePrestationAo;
	listSousTypePrestationAo;
	arabicPattern = /^[\u0600-\u06FF\s]+$/;
	// ====================================================
	//
	//=====================================================
	dataSource1: MatTableDataSource<any>;
	displayedColumns1 = ["type","label", "nomDoc", "actions"];
	typeBien = [
		{ id: 1, libelle: "service1" },
		{ id: 2, libelle: "service2" },
	];
	typeBien1 = [
		{ id: 1, libelle: "division 1" },
		{ id: 2, libelle: "division 2" },
	];
	data = [{ label: "Envoyer au service marché", checked: false }];
	dataExistenceVisite = [{ label: "Visite des lieux ", checked: false }];
	formData = {
		agrements: [],
		adresseEchantillon: "",
		adresseVisite: "",
		traitementVisite: "",
		id: 0,
		typeAo: { id: "" },
		typeMarche: { id: "" },
		typeConsultationArchitecturale: "",
		natureAo: { id: 0 },
		statutAo: { id: 1, libelle: "" },
		pfinancier: 0,
		ptechnique: 0,
		modePassation: "",
		formule: "",

		typeBudget: "",
		seuilMinimal: 0,
		caution: 0,
		dateOuverturePlis: null,
		dateReception: null,
		dateEchantillon: null,
		dateVisite: null,
		// serviceGestionnaire: 0,
		// division: 0,
		// descriptif: "",
		budgetEstimatif: '',
		objet: "",
		objetAR: "",
		// qualification: "",
		// loi: "",
		numAo: "",
		existanceVisite: false,
		existEchantillon: false,	
		offreTechnique: false,	
		is_en_attente_de_validation: false,

		existClassification: false,
		existTypeAo:false,
		existQualification: false,

		existanceAgrement: false,
		existanceAllotisse: "",
		service: 0,
		// typeAO: "",
		sousTypePrestation: { id: "" },
		 naturePrix: "",
		createurUser: "",
		estimation: 0,
		estimationHT: 0,
		taxeTVA: 0,

		programme: { id: "" },
		convention: { id: "" },
		qualification: { id: "" },
		classification: { id: "" },
		 typePrestation: { id: 0 },
		sendToServiceMarche: false
	};
	ListAgrement
	isVisible2: any;
	typesAO;
	ListeQualifications
	naturePrix = ["Prix révisable", "Non révisable"]; // Révisable = (1% des intérêt moratoires + 3% ..) (+4%)
	fromesLivarison = ["العرض الأدنى", "العرض الأفضل"];
	// ====================================================
	//
	//=====================================================
	ngOnInit() {
		this.service.getAllAgrementMarche().subscribe((res) => {
			this.ListAgrement = res;
		});
		this.serviceQualification.getAll().then((res) => {
			this.ListeQualifications = res;
		});
		this.serviceTypeAo.getAll().then((res) => {
			this.typesAO = res;
		});
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});
		/* this.programmeService.all().subscribe(res=>{
			this.listprogramme=res;
		  },err=>{
			console.log(err)
		  }) */


		this.conventionMarcheService.all().subscribe(res => {
			this.listConvention = res;
		}, err => {
			console.log(err)
		})
		this.service.getAlltypePjAo().subscribe((res) => {

			console.log(res);
			this.unites = res;
			// this.unites = this.unites.filter(item => !(item.id == 3 || item.id == 4));
		});
		this.fileUtils.fileSizeDetector();
		this.getDivisions();
		this.service.getAllTypeMarche().subscribe((data) => {
			this.typeMarcheAll = data;
		});
		this.service.getAllNatureAo().subscribe((data) => {
			this.natureAoAll = data;
		});
		// Liste des types prestation
		this.service.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
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
	isVisible7
	selectedEchantillon(event) {
		if (event.value == "1") {
			this.formData.existEchantillon = true;
			this.isVisible7 = true;
		} else {
			this.formData.existEchantillon = false;

			this.isVisible7 = false;
		}
	}
	selectedOffreTechnique(event){
		if (event.value == "1") {
			this.formData.offreTechnique = true;
		} else {
			this.formData.offreTechnique = false;

		}
	}
	selectedAgrement(event) {
		if (event.value == "1") {
			this.formData.existanceAgrement = true;
			this.isVisible5 = true;
		} else {
			this.formData.existanceAgrement = false;
			this.formData.agrements = null;
			// this.selectedAgrementvalue = "";
			this.isVisible5 = false;
		}
	}
	isVisible8
	selectedVisiteLieux(event) {
		if (event.value == "1") {
			this.formData.existanceVisite = true;
			this.isVisible8 = true;
		} else {
			this.formData.existanceVisite = false;

			this.isVisible8 = false;
		}
	}
	selectedAgrementvalue = [];
	selectedAgrementList(event) {
		for(let i=0;i<event.length;i++){
			let a=this.selectedAgrementvalue.includes(event[i])
			
			if (this.selectedAgrementvalue.includes(event[i]) == false) {
				this.selectedAgrementvalue.push(event[i]);
				this.service.getAgrementMarcheById(parseInt(event[i])).subscribe((res) => {
					this.formData.agrements.push(res);
				});
			}
		}
		

		// this.formData.agrements.push(parseInt(event))
	}

	classes
	selectedListeQualifications(event) {
		this.serviceClassification.findByIdQualification(parseInt(event.value)).subscribe((res) => {
			this.classes = res;
		});

		// if (event.value == "Laboratoires") {
		// 	this.classes = ["ETUDES GEOTECHNIQUES", "CONTROLE DE QUALITE", "EXPERTISE DE LABORATOIRE", "RECHERCHE-DEVELOPPEMENT", "INVESTIGATIONS MARITIMES", "QUALITE DE L'EAU ET DE L’ENVIRONNEMENT"];
		// }
		// if (event.value == "EAUX ET FORETS") {
		// 	this.classes = ["Travaux de reboisement, de régénération et d'amélioration sylvopastorale", "Travaux de conservation des eaux et des sols", "Travaux d'aménagement de pistes et chemins forestiers",
		// 	 "Travaux de production de plantes", "Travaux de récolte de liège"];
		// }
		// if (event.value == "AGRICULTURES") {
		// 	this.classes = ["Ouvrages principaux d'irrigation", "Puits et forages", "Equipement de l'irrigation à la parcelle",
		// 	 "Travaux de séguia et de pose de canaux portés", "Assainissement, drainage agricole et aménagements fonciers",
		// 	 "Pose de conduites d'irrigation", "Aménagement de pistes agricoles et rurales", "Matériel hydromécanique",
		// 	 "Matériel de pompage pour l'irrigation", "Travaux de plantation et de réhabilitation des arbres fruitiers et arbustes"];
		// }
		// if (event.value == "HABIAT") {
		// 	this.classes = ["Terrassements", "Travaux De Voirie", "Assainissement - Pose de conduites", "travaux d'électrification", "Assainissement, drainage agricole et aménagements fonciers", "Eau Potable",
		// 	 "Réseaux Téléphoniques", "Jardins - Espaces verts", "Gros-oeuvre", "Menuiserie bois - Charpente", "Menuiserie métallique, aluminium et en pvc",
		// 	  "Ascenseurs - Monte-charges", "Plomberie - Chauffage - Climatisation", "Electricité", "Téléphone - Sonorisation", "Peinture - Vitrerie",
		// 	   "Etanchéité - Isolation", "Carrelages - Revêtements", "Plâtrerie - Faux plafonds", "Construction en matériaux locaux ",
		// 	   "Equipement intérieur - Décoration", "Isolation frigorifique et chambres froides", "Professions artisanales", "Réhabilitation de bâtiments anciens"];
		// }
		// if (event.value == "EQUIPEMENT") {
		// 	this.classes = ["Construction", "Travaux routiers et voirie urbaine", "Eau potable - Assainissement - Conduites",
		// 	 "Construction d'ouvrages d'art", "Travaux maritimes et fluviaux", "Barrages et ouvrages hydrauliques y afférents",
		// 	 "Fondations spéciales, Drainage, Injections", "Sondages géotechniques et forages hydrogéologiques",
		// 	  "Equipements hydromécaniques - Traitement d'eau potable - Automatisme", "Électricité", "Courants faibles, traitement acoustique et audio-visuel",
		// 	   "Menuiserie – Charpente", "Plomberie - Chauffage - Climatisation", "Etancheite - Isolation", "Revetements", "Platrerie - Faux plafonds", "Peinture",
		// 	    "Travaux artisanaux de batiment", "Monte-charges - Ascenseurs", "Isolation frigorifique et construction de chambres froides",
		// 		 "Installation de cuisines et buanderies", "Amenagement d'espaces verts et jardins",
		// 		  "Reseaux des fluides industriels et medicaux, de gaz et d'air comprime", "Signalisation et equipements de securite"];
		// }
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
	isVisible9
	selectedClassification(event) { 
		if (event.value == "1") {
			this.isVisible9 = true;

			this.formData.existClassification = true;
		} else {
			this.isVisible9 = false;

			this.formData.existClassification = false;
		}
	}
	onChangeType($event) {
		this.formData.typeConsultationArchitecturale = $event.value;
	}
	isVisible6
	selectedNaturePrix(event) {
		if (event.value == "Prix révisable") {
			this.isVisible6 = true;
		} else {
			this.isVisible6 = false;
		}
	}
	isVisible11;
	isVisible12
	onChangeTypeMarche(event) {
		this.formData.typeMarche.id = event.value;
		if (event.value == 7) {
			this.isVisible11 = true;
		} else {
			this.isVisible11 = false;
		}
		if (event.value == 6) {
			this.isVisible12 = true;
		} else {
			this.isVisible12 = false;
		}
	}
	isVisible1
	lotMarcheDataSource: any = [];
	lotData = {
		// id: "",
		numLot: "",
		objetFr: "",
		objetAr: "",
		budget: "",
		caution: "",
		// ao: { id: "" },
	};
	openDialogLotMarche(): void {
		const dialogRef = this.dialog.open(EditLotAoComponent, {
			width: "600px",
			data: {
				// id: "",
				numLot: "",
				objetFr: "",
				objetAr: "",
				budget: "",
				caution: "",
				// ao: { id: this.idao },
			},
		});

		dialogRef.afterClosed().subscribe((res) => {
			console.log("Add lotFormData: " + JSON.stringify(res, null, 2));
			if (res) {
				this.lotMarcheDataSource.push(res);

				this.lotData = {
					// id: "",
					numLot: "",
					objetFr: "",
					objetAr: "",
					budget: "",
					caution: "",
					// ao: { id: this.idao },
				};
				// this.service.sendLotMarcheData(res).subscribe(
				// 	(data) => {
				// 		this.populateLotMarche();
				// 		this.notification.sendMessage({
				// 			message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
				// 			type: NotificationType.success,
				// 		});
				// 		this.lotData = {
				// 			id: "",
				// 			numLot: "",
				// 			objetFr: "",
				// 			objetAr: "",
				// 			budget: "",
				// 			caution: "",
				// 			ao: { id: this.idao },
				// 		};
				// 	},
				// 	(error) => {
				// 		console.log(error);
				// 	}
				// );
			}
		});
	}

	deleteLotMArche(id): void {
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
				this.lotMarcheDataSource.splice(id, 1);
				if (this.lotMarcheDataSource.length > 0) {
					// this.dataSource1 = new MatTableDataSource(this.lotMarcheDataSource);
				}
				// else {
				// 	this.dataSource1 = null;
				// }
				// this.service.deleteLotMarcheById(idLot).subscribe(
				// 	(data) => {
				// 		console.log("Lot Deleted  : " + idLot);
				// 		Swal.fire({
				// 			position: "center",
				// 			icon: "success",
				// 			title: this.translate.instant(
				// 				"PAGES.GENERAL.MSG_DEL_CONFIRMED"
				// 			),
				// 			showConfirmButton: false,
				// 			timer: 1500,
				// 		});
				// 		this.populateLotMarche();
				// 	},
				// 	(error) => {
				// 		console.log(error);
				// 	}
				// );
			}
		});
	}
	selectedmodePassation(event) {
		this.formData.natureAo.id = event.value;
		if (event.value == 6) {
			this.isVisible1 = true;
		} else {
			this.isVisible1 = false;
		}
	}
	// ====================================================
	// check estimation 
	//=====================================================
	selectedPAC(event){
		if(event.value =='1'){
			this.isVisible=true
		}else{
			this.isVisible=false;
		}

	}
	selectedReserve(event) {
		if (event.value == "1") {
			this.isVisible2 = true;
			this.formData.existTypeAo = this.isVisible2;
		} else {
			this.isVisible2 = false;
			this.formData.existTypeAo = this.isVisible2;
		}
	}
	selectedReservea(event) {
		this.serviceTypeAo.findById(parseInt(event.value)).subscribe((res) => {
			this.formData.typeAo = res;
		});
	}
	selectedTypeBudget(event){
		this.formData.typeBudget=event.value

	}
	selectedConvention(event){
		if(event.value =='1'){
			this.isVisible3=true
		}else{
			this.isVisible3=false
		}

	}
	// changeBudgetEstimation(event: any) {
	// 	if (this.formData.budgetEstimatif >= 75550000 && this.typePrestation == 1) {
	// 		this.formData.estimation = 40;
	// 		this.estimation = 40;

	// 	} else if (this.formData.budgetEstimatif >= 5364050 && (this.typePrestation == 2 || this.typePrestation == 3)) {
	// 		this.formData.estimation = 40;
	// 		this.estimation = 40;


	// 	} else {
	// 		this.estimation = 0;
	// 	}
	// }

	onDeletePj(id: number): void {
		
		this.temp=false
		this.allpjs.splice(id, 1);
		if (this.allpjs.length > 0) {
			this.dataSource1 = new MatTableDataSource(this.allpjs);
		} else {
			this.dataSource1 = null
			
		}
		
	}

	selectedCodeOrientation(event: MatSelectChange) {
		this.projet = '';
		this.listprogramme = [];
		this.programmeService.finAllByCode(event.value).subscribe(res => {
			this.listprogramme = res;
		}, err => {
			console.log(err)
		})
	}
	selectedCodeProjet(event: MatSelectChange) {
		this.programmeService.findByCodeProjet(event.value).subscribe((res: any) => {
			this.projet = res.nameProjet;
			this.idProgramme = res.id;
			// this.formData.idProject = res.id;
		}, err => {
			console.log(err)
		})
	}

	// onInputFocus1() {
	// 	if (this.formData.budgetEstimatif === 0) {
	// 		this.formData.budgetEstimatif = null; // Remove default value when clicking on the input field
	// 	}
	// }

	// onInputBlur1() {
	// 	if (this.formData.budgetEstimatif === null || this.formData.budgetEstimatif === undefined) {
	// 		this.formData.budgetEstimatif = 0; // Set the value back to 0 if left empty
	// 	}
	// }

	onInputFocus2() {
		if (this.formData.estimation === 0) {
			this.formData.estimation = null; // Remove default value when clicking on the input field
		}
	}

	onInputBlur2() {
		if (this.formData.estimation === null || this.formData.estimation === undefined) {
			this.formData.estimation = 0; // Set the value back to 0 if left empty
		}
	}

	onInputFocus3() {
		if (this.formData.caution === 0) {
			this.formData.caution = null; // Remove default value when clicking on the input field
		}
	}

	onInputBlur3() {
		if (this.formData.caution === null || this.formData.caution === undefined) {
			this.formData.caution = 0; // Set the value back to 0 if left empty
		}
	}

	changeEstimation(event: any) {

		if (this.estimation > 0) {
			this.formData.estimation = this.estimation;
			Swal.fire(
				"	L'estimation qui impacte la date de publication : ",
				'40 jours ',
				'warning'
			)
		}
	}
	// ====================================================
	//
	//=====================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ====================================================
	//
	//=====================================================
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	} 
	// ====================================================
	//
	//=====================================================
	temp=false
	i
	validerPj() {
		var champTexte:any = document.getElementById("test");
		// for(this.i=0;this.i<this.allpjs.length;this.i++){
		// 	if(this.allpjs[this.i].type.id==this.formPj.type.id){
		// 		this.temp=true

		// 	}
		// }
		// if(this.temp==false && champTexte.value != "" ){
			
            
            // Vider le champ de texte
            // champTexte.value = "";
		// }else if(this.temp==true){
		// 	this.formPj = { type: {id:''}, selecetedFile: {} ,label:""};
			
            
        //     // Vider le champ de texte
        //     champTexte.value = "";
		// 	Swal.fire({
		// 		title:"	Vous avez déja ajouter une piéce jointe avec ce type veuillez la supprimer pour la écraser ",

		// 		icon:'error'
		// 	})
		// 	this.temp=false
		// }else if(champTexte.value == "" ){
		// 	this.temp=false
		// 	Swal.fire({
		// 		title:"	Vous devez choisir une piéce jointe",

		// 		icon:'error'
		// 	})
		// }

		if(champTexte.value == "" ){
			this.temp=false
			Swal.fire({
				title:"	Vous devez choisir une piéce jointe",

				icon:'error'
			})
		}else{
			this.allpjs.push(this.formPj);
			$("#test").val(null);
			console.log(this.allpjs);
			this.dataSource1 = new MatTableDataSource(this.allpjs);
			
			this.showAddDoc = false;
			this.formPj = { type: {id:''}, selecetedFile: {} ,label:""};
			champTexte.value = "";
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
	// ====================================================
	//
	//=====================================================
	addItem() {
		this.showAddDoc = true;
	}
	// ====================================================
	//
	//=====================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formData.service = 0;
		if (idDivision != 0) {
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
		}
	}
	// ====================================================
	//
	//=====================================================
	onChangeTypePrestationAo(f) {
		this.formData.typePrestation.id = f.value;

		const type = f.value;
		this.typePrestation = f.value;
		if (type != 0) {
			this.typePrestation = type;
			// Liste des sous types prestation
			this.service.getAllSoustypePresattaionAo(type)
				.subscribe(
					(data) => {
						this.listSousTypePrestationAo = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.listSousTypePrestationAo = null;
		}
	}
	// ====================================================
	//
	//=====================================================
	onChange(event, index, item) {
		item.checked = !item.checked;

		console.log(
			"index: " +
			index +
			", label: " +
			item.label +
			", checked: " +
			item.checked
		);
		this.bool = item.checked;
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
				if (response) {
					this.bool = false;
					this.checked = false;
					this.formData.sendToServiceMarche = this.checked;
				} else {
					this.checked = true;
					this.formData.sendToServiceMarche = this.checked;
					this.bool = true;
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

	existenceVisite(e) {
		this.formData.existanceVisite = e.checked;
		console.log(this.formData.existanceVisite);
	}
	existenceVisite2() {
		this.formData.existanceVisite = this.isVisible10;
		console.log("teeeeeeeeeeeeeeeeeest", this.formData.existanceVisite);
	}
	// existEchantillon() {
	// 	this.formData.existEchantillon = this.isVisible4;
	// 	console.log("existEchantillon", this.formData.existEchantillon);
	// }
	// existanceAgrement() {
	// 	this.formData.existanceAgrement = this.isVisible5;
	// 	console.log("existanceAgrement", this.formData.existanceAgrement);
	// }
	// existenceVisite6() {
	// 	this.formData.existanceAllotisse = this.isVisible6;
	// 	console.log("existanceAllotisse", this.formData.existanceAllotisse);
	// }
	// ====================================================
	//
	//=====================================================
	save1(event: any): void {
		this.selectedRc = event.target.files;
		console.log(this.selectedRc);
	}
	CalculerEstimation(){
		const estimationHT=this.formData.estimationHT
		const taxeTVA=this.formData.taxeTVA

		const estimation=(estimationHT*taxeTVA/100)+estimationHT
		
		this.formData.estimation=estimation
		
	}
	// ====================================================
	//
	//=====================================================
	onSubmit(form: NgForm) {
		if(this.formData.objet=='' || this.formData.objetAR==''){ 
			Swal.fire({
				title:"	Vous devez saisir au moins l'objet arabe et français ",

				icon:'error'
			}
				
			)
		}else{
			
			let id_saved = 0;
			if (this.bool == true) {
				this.formData.statutAo.id = 2;
				console.log("A: " + JSON.stringify(this.formData, null, 2));
			}
			if (this.formData.existanceAgrement == false) {
				this.formData.agrements = null;
			} else {
			}
			this.loading = true;
			this.formData.createurUser = window.localStorage.getItem("fullnameUser");
			this.formData.programme.id = this.idProgramme;


			
			if (this.formData.programme.id == '') {
				this.formData.programme = null;
			}
			if (this.formData.convention.id == '') {
				this.formData.convention = null;
			}
			if (this.formData.typePrestation) {
				if (this.formData.typePrestation.id == 0) {
					this.formData.typePrestation = null;
				}
			}
			if (this.formData.existTypeAo == false) {
				this.formData.typeAo = null;
			}
			if (this.formData.natureAo != null) {
				if (this.formData.natureAo.id == 0) {
					this.formData.natureAo = null;
				}
			}

			if (this.formData.sousTypePrestation != null) {
				if (this.formData.sousTypePrestation.id == "") {
					this.formData.sousTypePrestation = null;
				}
			}
		
			if (this.formData.typeMarche != null) {
				if (this.formData.typeMarche.id == "") {
					this.formData.typeMarche = null;
				}
			}
			if (this.formData.existQualification == false) {
				this.formData.qualification = null;
				this.formData.classification = null;
			} else {
				if (this.formData.existClassification == false) {
					this.formData.classification = null;
				}
			}

			
			
			this.service.sendao(this.formData).subscribe((res) => {
				console.log("B: " + JSON.stringify(res, null, 2));
				this.lotMarcheDataSource;
				for (let i = 0; i < this.lotMarcheDataSource.length; i++) {
					let lot = {
						numLot: this.lotMarcheDataSource[i].numLot,
						budget: this.lotMarcheDataSource[i].budget,
						caution: this.lotMarcheDataSource[i].caution,
						objetAr: this.lotMarcheDataSource[i].objetAr,
						objetFr: this.lotMarcheDataSource[i].objetFr,
						ao: { id: res.id },
					};
					this.service.sendLotMarcheData(lot).subscribe(
						(data) => {},
						(error) => {
							console.log(error);
						}
					);
				} 
				id_saved = res.id;
				if (this.allpjs.length > 0) {
					for (var i = 0; i < this.allpjs.length; i++) {
						
						this.service.nouvellepj(this.allpjs[i].selecetedFile, res["id"], this.allpjs[i].type.id, "AO",this.allpjs[i].label)
							.subscribe((data) => {
								console.log("C: " + JSON.stringify(data, null, 2));
							});
					}
				}
				/*  this.service.nouvellepjCps(this.selectedCps,res.id).subscribe(result => {
		  })
		  this.service.nouvellepjRc(this.selectedRc,res.id).subscribe(result => {
		  })*/
		  this.backList();
		});
		}
		
	}
	showao(idAo) {
		this.router.navigate(["/marches/ao-detail"], {
			queryParams: { id: idAo, page: 1 },
		});
	}
	// ====================================================
	//
	//=====================================================
	backList() {
		/* this.router.navigate(["/marches/ao-list"]); */
		this.router.navigate(["/programme/list-EtudeBesion"]);
	}
}
