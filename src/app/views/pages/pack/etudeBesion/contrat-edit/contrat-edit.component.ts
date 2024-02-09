import { Component, OnInit, ViewChild } from '@angular/core';
import { AoService } from '../../../shared/ao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratService } from '../../../shared/contrat.service';
import * as $ from "jquery";
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs/operators';
import { NotificationService } from '../../../shared/notification.service';
import { environment } from '../../../../../../environments/environment';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { PrestataireService } from '../../../shared/prestataire.service';
import { EditLotAoComponent } from '../../../marche/dialog-forms/edit-lot-ao/edit-lot-ao.component';
import { NotificationType } from '../../../shared/NotificationMessage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-contrat-edit',
  templateUrl: './contrat-edit.component.html',
  styleUrls: ['./contrat-edit.component.scss']
})
export class ContratEditComponent implements OnInit {
	contrat = { 

		statutContrat:null,
		consultation: { id: "" },
	sousTypePrestation:{ id: '' },
	typePrestation:{ id: '' },
	dateLivraison: null ,
	refDeContrat:0,
	cout:0,
	estimation:0,
	montantDeContrat:0,
	createurUser:'',
	modificateurUser: "",
	populationCible: "",

	raisonSociale:'',
	 objet:'',
	 delaiLivraison:''
	};
  lisTypePrestationAo:any[]=[];
	formPj = { label:'', selecetedFile: {} ,type:{id:''}};
  isVisible13
  unites = [];
  idContrat
	allpjs = [];
	dataSource = new MatTableDataSource<any>();
	dataSource1 = new MatTableDataSource<any>();
	isLoading = true;
	isLoadingResults = true;
  displayedColumns1 = ["type","label", "nomDoc", "actions"];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor( private prestataireService: PrestataireService, private serviceAO: AoService,private router: Router,		private fileService: FilesUtilsService,

		private activatedRoute: ActivatedRoute,private serviceContrat:ContratService,	private dialog: MatDialog,	private translate: TranslateService,		private notification: NotificationService,

    ) { }
	prestataires;
	typeMarcheAll
	typeConsultationArchitecturale
  ngOnInit() {
	this.serviceAO.getAllTypeMarche().subscribe((data) => {
		this.typeMarcheAll = data;
	});
	this.serviceAO.getAllPrestatairesAll().subscribe((data) => {
		this.prestataires = data;
		this.dataArray = data;
	});
    this.serviceAO.getAlltypePjAo().subscribe((res) => {
			console.log(res);
			this.unites = res;
			this.unites = this.unites.filter((item) => !(item.id == 3 || item.id == 4));
		});
    this.serviceAO.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
    this.activatedRoute.queryParams.subscribe((params) => {
			this.idContrat = params["id"];
			// this.idConsultation = params["idC"];
		});

		this.serviceContrat.getOffresByIdContrat(this.idContrat).subscribe((res)=>{
			
			this.list=res
			this.dataSource1 = new MatTableDataSource(this.list);
		})

    this.serviceContrat.getByIdContrat(this.idContrat).subscribe((data)=>{
			this.contrat = data
			if(this.contrat.typePrestation!=null){
				this.contrat.typePrestation.id = data.typePrestation.id;

			}
	
			if(data.dateLivraison!=null){
				this.contrat.dateLivraison = new Date(data.dateLivraison).toISOString();

			}else{
				this.contrat.dateLivraison =null
			}


			
			//  this.onChangeTypePrestationAo(this.contrat.typePrestation.id)
		})
    this.isLoading = false;
		this.getAllBCFiles();
  }


// openDialogLotMarche(): void {
// 	const dialogRef = this.dialog.open(EditLotAoComponent, {
// 		width: "600px",
// 		data: {
// 			id: "",
// 			numLot: "",
// 			objetFr: "",
// 			objetAr: "",
// 			budget: "",
// 			caution: "",
// 			ao: { id: this.idao },
// 		},
// 	});
// 	dialogRef.afterClosed().subscribe((res) => {
// 		console.log("Add lotFormData: " + JSON.stringify(res, null, 2));
// 		if (res) {
// 			this.service.sendLotMarcheData(res).subscribe(
// 				(data) => {
// 					this.populateLotMarche();
// 					this.notification.sendMessage({
// 						message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
// 						type: NotificationType.success,
// 					});
// 					this.lotData = {
// 						id: "",
// 						numLot: "",
// 						objetFr: "",
// 						objetAr: "",
// 						budget: "",
// 						caution: "",
// 						ao: { id: this.idao },
// 					};
// 				},
// 				(error) => {
// 					console.log(error);
// 				}
// 			);
// 		}
// 	});
// }
  showArticleRef = false;

  nouvelleLigne() {
	this.showArticleRef = !this.showArticleRef;
}
valueToSend;
dataArray = [];

onChangeofOptions1(a) {
	this.valueToSend = a.value;
}
onKey(value) {
	this.dataArray = [];
	this.selectSearch(value);
}
montantPropose = 0;
list = [];
	dataSize
send() {
	this.showArticleRef = true;

	// this.mySelect.writeValue(null);
	this.prestataireService.getAllById(this.valueToSend).subscribe((res) => {
		let offre = {
			id: res.id,
			nom: res.nom,
			tel: res.tel,
			mail: res.mail,
			rc: res.rc,
			ice: res.ice,
			idFisc: res.idFisc,

			montantPropose: this.montantPropose,
		};
		this.list.push(offre);
		this.dataSize = res.length;
		this.isLoading = false;

		this.dataSource1 = new MatTableDataSource(this.list);
		 this.montantPropose=0
	});

	// var offre = {
	// 	prestataire: { id: this.valueToSend },
	// 	contrat: { id: this.idao },
	// 	montantPropose:this.montantPropose
	// };

	// this.isPrestataire = false;
	// this.service.OffreByIdPrestataire(this.valueToSend,this.idao).subscribe(
	// 	(data) => {
	// 		console.log("Id prestataire: "+ this.valueToSend);
	// 		console.log("Prestataire: "+ JSON.stringify(data, null, 2));

	// 		if (data == null) {
	// 			this.service.sendOffreDeposee([offre]).subscribe((data) => {
	// 				this.getPrestataires();
	// 				this.montantPropose=0;
	// 			});
	// 		}
	// 	},
	// 	(err) => {
	// 		console.log(err);
	// 	}
	// );
	// // if (this.isPrestataire = true) {
	// // 	this.service.sendOffreDeposee([offre]).subscribe((data) => {
	// // 		this.getPrestataires();
	// // 	});
	// // }
}
a = [];
displayedColumns = [
	"nom",
	"tel",
	"mail",
	"rc",
	"ice",
	"idFisc",
	"montant",
	// 'statut',

	// "adresse",
	"actions",
];
deletePrestation(idPrest) {
		
	this.a.splice(idPrest, 1);
	if (this.a.length > 0) {
		this.dataSource = new MatTableDataSource(this.a);
	} else {
		this.dataSource = null
		
	}
	// if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
	// 	this.service.deleteOffreDeposee(idPrest).subscribe((data) => {
	// 		console.log("Destinataire Deleted  : " + idPrest);
	// 		this.getPrestataires();
	// 	});

	// 	this.notification.warn(
	// 		this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
	// 	);
	// }
}
selectSearch(value) {
	console.log(this.dataArray);
	let filter = value;
	for (let i = 0; i < this.prestataires.length; i++) {
		let option = this.prestataires[i].libelle;
		if (option.toLowerCase().indexOf(filter) >= 0 || option.toUpperCase().indexOf(filter) >= 0) {
			console.log("in if");
			this.dataArray.push(this.prestataires[i]);
			console.log(this.dataArray);
		}
	}
}
	onChangeTypePrestationAo(f) {
		const type = f.value;
		this.contrat.typePrestation.id = f.value;
		if (type != 0) {
			this.contrat.typePrestation.id = type;
	
	}}
  selectedValuetypePrestation(p1: any, p2: any) {
		let a = Number(p1);

		if (a && p2) {
			return a === p2;
		}

		return false;
	}
  
	selectedTypePJ(event){
		if(event.id==7){
			this.isVisible13=true
		}else{
			this.isVisible13=false
		}

	}
	validerPj() {
		var champTexte:any = document.getElementById("test");

		// for(this.i=0;this.i<this.allpjs.length;this.i++){
		// 	if(this.allpjs[this.i].type.id==this.formPj.type.id){
		// 		this.temp=true
				
		// 	}
		// }
	
		
			if( champTexte.value != ""){
				this.allpjs.push(this.formPj);
				$("#test").val(null);
				console.log(this.allpjs);
				this.dataSource = new MatTableDataSource(this.allpjs);
				this.dataSource.data
				
				
				
				// this.showAddDoc = false;
				this.formPj = { type: {id:''}, selecetedFile: {} ,label:""};
				
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

			}else if(champTexte.value == "" ){
				Swal.fire({
					title:"	Vous devez choisir une piéce jointe",
	
					icon:'error'
				})
				
			}
		
	
	
	}
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	}
	pjs=[]

	onDeleteFile(row: any) {
		this.allpjs.splice(row, 1);
		this.pjs.push(row)
		
		if (this.allpjs.length > 0) {
			this.dataSource = new MatTableDataSource(this.allpjs);
		} else {
			this.dataSource = null;
		}
	
	}

  public getAllBCFiles() {
		this.serviceContrat.getByIdContratFiles(this.idContrat)
			.pipe(delay(1000))
			.subscribe(
				(data) => {
					this.isLoading = false;
					this.allpjs=data
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
  onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjContrat/" + r);
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
  onEditBC() {
		this.contrat.modificateurUser = window.localStorage.getItem("fullnameUser");
		// if(this.contrat.consultation.id!=''){
		// 	this.contrat.consultation.id = this.idConsultation;

		// }else{
		// 	this.contrat.consultation=null
		// }
		if(this.contrat.typePrestation==null){
			this.contrat.typePrestation= null

		}else{
			if(this.contrat.typePrestation.id==''){
				this.contrat.typePrestation= null
	
			}
		}

	
		
		

		this.serviceContrat.sendContrat(this.contrat).subscribe((data) => {
			console.log(data);
			for (let i = 0; i < this.dataSource1.data.length; i++) {
				if(this.dataSource1.data[i].nom!=null){
					let temp = {
						prestataire: { id: this.dataSource1.data[i].id },
						contrat: { id: data.id },
						montantPropose: this.dataSource1.data[i].montantPropose,
					};
					this.a.push(temp);
				}
			
			}
			
			// let a={
			// 	prestataire:{id:parseInt(this.valueToSend)},
			// 	contrat:{id:data.id},
			// 	montantPropose:this.montantPropose

			// }

			this.serviceContrat.sendOffres(this.a).subscribe((res) => {
				if(this.pjs.length!=0){
					for (const pj of this.pjs) {
						this.serviceContrat.deleteContratfiles(pj.id).subscribe((data) => {
						  console.log("Deleted PJ with id: " + pj.id);
						});
					  }
				  }
				for (var i = 0; i < this.allpjs.length; i++) {
					if(this.allpjs[i].selecetedFile!=null){
						this.serviceContrat.updloadContratFile(this.allpjs[i].selecetedFile, data["id"], this.allpjs[i].type.id, "CONTRAT", this.allpjs[i].label).subscribe((data) => {
							console.log("C: " + JSON.stringify(data, null, 2));
	
							
						});
					}
					
					
				}
				this.router.navigate(["/marches/contrat-consultation-detail"], {
					queryParams: { id: data.id },
				});
			});
		
		});
	}
	isVisible11=false;
	isVisible12=false
	onChangeTypeMarche(event) {
		event;

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
}
