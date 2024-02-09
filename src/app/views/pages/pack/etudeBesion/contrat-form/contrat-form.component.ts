import { Component, OnInit, ViewChild } from "@angular/core";
import { AoService } from "../../../shared/ao.service";
import * as $ from "jquery";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { MatSelect } from "@angular/material/select";

import { ActivatedRoute, Router } from "@angular/router";
import { ContratService } from "../../../shared/contrat.service";
import Swal from "sweetalert2";
import { PrestataireService } from "../../../shared/prestataire.service";
import { EditLotAoComponent } from "../../../marche/dialog-forms/edit-lot-ao/edit-lot-ao.component";

@Component({
	selector: "kt-contrat-form",
	templateUrl: "./contrat-form.component.html",
	styleUrls: ["./contrat-form.component.scss"],
})
export class ContratFormComponent implements OnInit {
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
	Contrat = {
		// typeMarche: { id: 1, libelle: "" },

		statutContrat: null,
		consultation: { id: "" },
		sousTypePrestation: { id: "" },
		typePrestation: { id: "" },
		dateLivraison: null,
		refDeContrat: 0,
		// numMarche: 0,
		// cout: 0,
		estimation: 0,
		// montantDeContrat: 0,
		createurUser: "",
		// raisonSociale: "",
		populationCible: "",
		objet: "",
		delaiLivraison: "",
	};
	valueToSend;

	lisTypePrestationAo: any[] = [];
	dataSource1: MatTableDataSource<any>;
	displayedColumns1 = ["type", "label", "nomDoc", "actions"];
	constructor( private dialog: MatDialog,private router: Router, private prestataireService: PrestataireService, private serviceAO: AoService, private activatedRoute: ActivatedRoute, private serviceContrat: ContratService) {}
	unites = [];
	formPj = { type: { id: "" }, selecetedFile: {}, label: "" };
	isVisible13;
	allpjs = [];
	idConsultation;
	showArticleRef = false;
	dataArray = [];
	prestataires;
	montantPropose = 0;
	isVisible11;
	isVisible12
	onChangeTypeMarche(event) {
		event.value;

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
	lotMarcheDataSource: any=[];
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
				;
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
	// onChangeType($event) {
	// 	this.Contrat.typeConsultationArchitecturale = $event.value;
	// }
	onKey(value) {
		this.dataArray = [];
		this.selectSearch(value);
	}
	nouvelleLigne() {
		this.showArticleRef = !this.showArticleRef;
	}
	onChangeofOptions1(a) {
		this.valueToSend = a.value;
	}
	typeMarcheAll
	ngOnInit() {
		this.serviceAO.getAllTypeMarche().subscribe((data) => {
			this.typeMarcheAll = data;
		});
		this.serviceAO.getAllPrestatairesAll().subscribe((data) => {
			this.prestataires = data;
			this.dataArray = data;
		});
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idConsultation = params["id"];
		});
		this.getDivisionEtService();
		this.serviceAO.getAlltypePjAo().subscribe((res) => {
			console.log(res);
			this.unites = res;
			this.unites = this.unites.filter((item) => !(item.id == 3 || item.id == 4));
		});
	}
	selectedTypePJ(event) {
		if (event.id == 7) {
			this.isVisible13 = true;
		} else {
			this.isVisible13 = false;
		}
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
		this.Contrat.typePrestation.id = f.value;
		if (type != 0) {
			this.Contrat.typePrestation.id = type;
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
		}
	}
	@ViewChild("mySelect", { static: true }) mySelect: MatSelect;

	dataSource: MatTableDataSource<any>;
	list = [];
	dataSize
	isLoading
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

			this.dataSource = new MatTableDataSource(this.list);
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
	async getDivisionEtService() {
		this.serviceAO.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
	}
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	}
	temp = false;
	i;
	validerPj() {
		var champTexte: any = document.getElementById("test");
		for (this.i = 0; this.i < this.allpjs.length; this.i++) {
			if (this.allpjs[this.i].type.id == this.formPj.type.id) {
				this.temp = true;
			}
		}
		if (this.temp == false && champTexte.value != "") {
			this.allpjs.push(this.formPj);
			$("#test").val(null);
			console.log(this.allpjs);
			this.dataSource1 = new MatTableDataSource(this.allpjs);

			// this.showAddDoc = false;
			this.formPj = { type: { id: "" }, selecetedFile: {}, label: "" };

			// Vider le champ de texte
			champTexte.value = "";
		} else if (this.temp == true) {
			this.formPj = { type: { id: "" }, selecetedFile: {}, label: "" };

			// Vider le champ de texte
			champTexte.value = "";
			Swal.fire({
				title: "	Vous avez déja ajouter une piéce jointe avec ce type veuillez la supprimer pour la écraser ",

				icon: "error",
			});
			this.temp = false;
		} else if (champTexte.value == "") {
			this.temp = false;
			Swal.fire({
				title: "	Vous devez choisir une piéce jointe",

				icon: "error",
			});
		}
	}
	onDeletePj(id: number): void {
		this.allpjs.splice(id, 1);
		if (this.allpjs.length > 0) {
			this.dataSource1 = new MatTableDataSource(this.allpjs);
		} else {
			this.dataSource1 = null;
		}
	}
	a = [];
	onEditBC() {
		this.Contrat.createurUser = window.localStorage.getItem("fullnameUser");
		if (this.Contrat.consultation != null) {
			if (this.Contrat.consultation.id != "") {
				this.Contrat.consultation.id = this.idConsultation;
			} else {
				this.Contrat.consultation = null;
			}
		}
		
if(this.Contrat.typePrestation!=null){
	if (this.Contrat.typePrestation.id == "") {
		this.Contrat.typePrestation = null;
	}
}else{
	this.Contrat.typePrestation = null;

}
		if(this.Contrat.sousTypePrestation!=null){
			if (this.Contrat.sousTypePrestation.id == "") {
				this.Contrat.sousTypePrestation = null;
			}
		}else{
			this.Contrat.sousTypePrestation = null;

		}

	

		this.serviceContrat.sendContrat(this.Contrat).subscribe((data) => {
			console.log(data);
			for(let i=0;i<this.lotMarcheDataSource.length;i++){
				let lot={
					numLot: this.lotMarcheDataSource[i].numLot,
					budget:this.lotMarcheDataSource[i].budget,
					caution:this.lotMarcheDataSource[i].caution,
					objetAr:this.lotMarcheDataSource[i].objetAr,
					objetFr:this.lotMarcheDataSource[i].objetFr,
					contrat: { id: data.id },
				}
				this.serviceAO.sendLotMarcheData(lot).subscribe(
					(data) => {
					
					
					},
					(error) => {
						console.log(error);
					}
				);
			}
			this.dataSource;
			
			if(this.dataSource!=undefined){
				
				for (let i = 0; i < this.dataSource.data.length; i++) {
					let temp = {
						prestataire: { id: this.dataSource.data[i].id },
						contrat: { id: data.id },
						montantPropose: this.dataSource.data[i].montantPropose,
					};
					this.a.push(temp);
				}
				// let a={
				// 	prestataire:{id:parseInt(this.valueToSend)},
				// 	contrat:{id:data.id},
				// 	montantPropose:this.montantPropose
	
				// }
	
				this.serviceContrat.sendOffres(this.a).subscribe((res) => {
					
				
				});
			}
			
			for (var i = 0; i < this.allpjs.length; i++) {
				this.serviceContrat.updloadContratFile(this.allpjs[i].selecetedFile, data["id"], this.allpjs[i].type.id, "CONTRAT", this.allpjs[i].LabelPj).subscribe((data) => {
					console.log("C: " + JSON.stringify(data, null, 2));

					
				});
				
			}
			this.router.navigate(["/marches/contrat-consultation-detail"], {
				queryParams: { id: data.id },
			});
		
		});
	}
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
}
