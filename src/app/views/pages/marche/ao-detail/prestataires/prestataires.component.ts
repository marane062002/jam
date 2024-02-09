import { Component, OnInit, ViewChild } from "@angular/core";
import { AoService } from "../../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, throwToolbarMixedModesError } from "@angular/material";
import { NgForm } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../../shared/notification.service";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";
 
@Component({
	selector: "kt-prestataires",
	templateUrl: "./prestataires.component.html",
	styleUrls: ["./prestataires.component.scss"],
})
export class PrestatairesComponent implements OnInit {
	// ================================================================
	//
	// ================================================================
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
		private notification: NotificationService
	) { }
	// ================================================================
	//
	// ================================================================
	idao;
	formDataPrestataire = { ao: { id: 1 } };
	formDataOffreProposee = { ao: { id: 1 },
	montantPropose: 0,
	 prestataire: { id: 1 } };
	validations;
	prestataires;
	valueToSend; 
	// ================================================================
	//
	// ================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	validationDatasource: MatTableDataSource<any>;
	dataSource: MatTableDataSource<any>;
	dataArray = [];
	prestaList;
	dataSize = 0;
	isLoading = true;
	isPrestataire = false;
	montantPropose=0;
	// ================================================================
	// Filter de recherche
	// ================================================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ================================================================
	//
	// ================================================================
	displayedColumns = [
		"nom",
		"tel",
		"mail",
		"rc",
		"ice",
		"idFisc",
		'pourcentage',
		'statut',
	
		// "adresse",
		"actions",
	];
	showArticleRef = true;
	// ================================================================
	//
	// ================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
		this.service.getAllPrestatairesAll().subscribe((data) => {
			this.prestataires = data;
			this.dataArray = data;
		});
		this.getPrestataires();
		//this.populate();
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// ================================================================
	//
	// ================================================================
	nouvelleLigne() {
		this.showArticleRef = !this.showArticleRef;
	}
	// ================================================================
	//
	// ================================================================
	async getPrestataires() {
		const _this = this;
		await this.service
			.getAllOffreDeposee(this.idao)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					//console.log('DATA-OUT: '+ JSON.stringify(data,null,2));
					this.isLoading = false;
					_this.dataSize = data.length;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					console.log(err);
					this.isLoading = false;
				}
			);
	}
	accepter=false
	valideofferDeposer(id:number){
		let statut=new updateStatutOfferBean();
		statut.motifAnnuler="";
		statut.statut=1;
		this.service.updateStatutOffer(id, 1,statut).subscribe(res=>{
			Swal.fire(	'validation de offer depose à été bien traité',	' ','success'  )
			  this.ngOnInit();
			  this.accepter=true
		},err=>{
			console.log(err)
		})


	}
	refuser=false
	refuseofferDeposer(id:number){
		let statut=new updateStatutOfferBean();
		statut.statut=2;
		Swal.fire({
			title: "Voulez-vous changer   le statut de cet offer  ?",
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Oui'
		  }).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Motif ",
					text: "Vous devez Écrire le motif d'annulation ",
					input: 'text',
					showCancelButton: true        
				}).then((result) => {
					if (result.value) {
						statut.motifAnnuler=result.value;
							this.service.updateStatutOffer(id, 2,statut).subscribe(res=>{
							Swal.fire("L'offre dépose à être refusé",' ',	'success');
							this.refuser=true
			  this.ngOnInit();
		},err=>{
			console.log(err)
		})
					}
				});
			}
		  })


		
	
		
	}
	// ================================================================
	//
	// ================================================================
	/*populate(){
    this.service.getAllPrestataires(this.idao).subscribe(data => {
    this.validationDatasource = [];
    this.validations = data;
    console.log(this.validations);
    for (let i = 0; i < this.validations.length; i++) {
      this.validationDatasource.push(
        this.createNewLigne(i)
      ); }
      this.dataSource = new MatTableDataSource(this.validationDatasource);
      this.paginator._intl.itemsPerPageLabel = 'مصفوفة لكل صفحة';
	  this.paginator._intl.nextPageLabel = 'الصفحة التالية';
	  this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
	  this.paginator._intl.lastPageLabel="الصفحة الأخيرة";
	  this.paginator._intl.firstPageLabel="الصفحة الأولى";
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //this.dataSource.filter = "1";
  });}*/
	// ================================================================
	//
	// ================================================================
	createNewLigne(i: number): Prestataire {
		return {
			id: this.validations[i].id,
			nom: this.validations[i].nom,
			tel: this.validations[i].tel,
			rc: this.validations[i].rc,
			mail: this.validations[i].mail,
			adresse: this.validations[i].adresse,
			ice: this.validations[i].ice,
			idFisc: this.validations[i].idFisc,
		};
	}
	// ================================================================
	//
	// ================================================================
	send() {
		var offre = {
			prestataire: { id: this.valueToSend },
			ao: { id: this.idao },
			montantPropose:this.montantPropose
		};
		
		this.isPrestataire = false;
		this.service.OffreByIdPrestataire(this.valueToSend,this.idao).subscribe(
			(data) => {
				console.log("Id prestataire: "+ this.valueToSend);
				console.log("Prestataire: "+ JSON.stringify(data, null, 2));

				if (data == null) {
					this.service.sendOffreDeposee([offre]).subscribe((data) => {
						this.getPrestataires();
						this.montantPropose=0;
					});
				}
			},
			(err) => {
				console.log(err);
			}
		);
		// if (this.isPrestataire = true) {
		// 	this.service.sendOffreDeposee([offre]).subscribe((data) => {
		// 		this.getPrestataires();
		// 	});
		// }
	}
	// ================================================================
	//
	// ================================================================
	onChangeofOptions1(a) {
		this.valueToSend = a.value;
	}
	// ================================================================
	//
	// ================================================================
	onSubmit(form: NgForm) {
		console.log(this.formDataOffreProposee)
		this.formDataPrestataire.ao.id = this.idao;
		this.formDataOffreProposee.ao.id = this.idao;
		this.service
			.sendReservePrestataire(this.formDataPrestataire)
			.subscribe((res) => {
				this.formDataOffreProposee.prestataire.id = res.id;
				var x = [this.formDataOffreProposee];
				this.service.sendOffreDeposee(x).subscribe((r) => {
					this.formDataPrestataire = { ao: { id: 1 } };
					this.getPrestataires();
					//this.router.navigate(['/marches/ao-list']);
				});
			});
	}
	// ================================================================
	//
	// ================================================================
	editPrestation() { }
	// ================================================================
	//
	// ================================================================
	deletePrestation(idPrest) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service.deleteOffreDeposee(idPrest).subscribe((data) => {
				console.log("Destinataire Deleted  : " + idPrest);
				this.getPrestataires();
			});

			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
	// ================================================================
	//
	// ================================================================
	onKey(value) {
		this.dataArray = [];
		this.selectSearch(value);
	}
	// ================================================================
	//
	// ================================================================
	selectSearch(value) {
		console.log(this.dataArray);
		let filter = value;
		for (let i = 0; i < this.prestataires.length; i++) {
			let option = this.prestataires[i].libelle;
			if (
				option.toLowerCase().indexOf(filter) >= 0 ||
				option.toUpperCase().indexOf(filter) >= 0
			) {
				console.log("in if");
				this.dataArray.push(this.prestataires[i]);
				console.log(this.dataArray);
			}
		}
	}
	// ================================================================
	//
	// ================================================================
	lettreMaintien(idPrest, prestataire, statut){
		console.log(statut)
		if(statut==='Accepté'){
			this.service.lettreMaintienGenerator("lettreAttribution/",this.idao, prestataire).subscribe(
				(res) => {
					const file = new Blob([res as unknown as BlobPart], {
						type: 'application/msword' 
					});
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
					const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
					link.download = "lettre d'attribution.docx";
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
		if(statut==='Réfusé'){
			this.service.lettreMaintienGenerator("lettreEcart/"+idPrest+"/",this.idao, prestataire).subscribe(
				(res) => {
					const file = new Blob([res as unknown as BlobPart], {
						type: 'application/msword' 
					});
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
					const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
					link.download = "notification écarter.docx";
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
}
export interface Prestataire {
	id: string;
	nom: string;
	tel: string;
	rc: string;
	mail: string;
	adresse: String;
	ice: String;
	idFisc: String;
}
export class updateStatutOfferBean {
	statut: number;
	motifAnnuler: string = "";
}
