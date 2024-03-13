import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { OrigineService } from "../../medecin-legale-bmh/services/origine.service";
import { EnterementInhumService } from "../../medecin-legale-bmh/services/enterement-inhum.service";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material";
import { Association360Tab } from "../../pesee/show-pesee/show-pesee.component";
import { Observable } from "rxjs";
import * as $ from "jquery";
@Component({
	selector: "kt-upd-enterrement",
	templateUrl: "./upd-enterrement.component.html",
	styleUrls: ["./upd-enterrement.component.scss"],
})
export class UpdEnterrementComponent implements OnInit {
	data: any[] = [];
	origine: any[] = [];
	enterement: any[] = [];
	private baseUrl = environment.API_BMH_URL;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	private headers = new HttpHeaders({
		// 'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	enterId: any;
	enterDetails: any;


	pcfileDeclar : File;
	labelDeclar: any;
	pcDeclarantFile: File;
  	allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
	displayedColumns1 = [ "label", "nomDoc", "actions"];
	displayedColumns2=['nomDoc','titre','label','dow']
	asyncTabs: Observable<Association360Tab[]>;
	dataSource2 = new MatTableDataSource<any>();
	ajoutForm: FormGroup;


	typeControl = new FormControl();
	communeControl = new FormControl();
	arrondisControl = new FormControl();
	sexeControl = new FormControl();
	quartierControl = new FormControl();

	dateEnterment: any;
	dateEntermentf: Date;

	lieuEnter: any;
	lieuRecup: any;
	pieceJointe: any;

	nom: any;
	prenom: any;
	connu: boolean;
	cin: any;
	dateNaissance: any;
	dateNaissancef: Date;
	numBulletin: any;
	nationalite = new FormControl();
	
	type: any[] = [];
	commune: any[] = [];
	arrondissement: any[] = [];
	quartier: any[] = [];

	handleFileInput(event: any): void {
		this.httpClient.delete(`${this.AlfresscoURL}/enterrement/index/${this.enterId}`)
		.subscribe((res)=>{
			console.log('Piece Jointe stored successfully:', res);
		})
		this.pieceJointe = event.target.files[0];
	}

	constructor(private router: Router, 
		private route: ActivatedRoute, 
		private httpClient: HttpClient, 
		private datePipe: DatePipe, 
		private entermentserv: EnterementInhumService, 
		private originev:OrigineService,
		private fb:FormBuilder) {}

	ngOnInit() {
		this.fetchQuartier();
		this.fetchCommune();
		this.fetchArrondis();
		this.fetchTypes();

		this.ajoutForm = this.fb.group({
			pj: this.fb.group({
				pcfileDeclar: [''] 
			})
		  });

		this.route.params.subscribe((params) => {
			this.enterId = +params["id"];
		});
		this.fetchEnterDetails();
		this.getAllPjImm(this.enterId)
	}
	saveDec(event: any): void {
		$("#testd").val(event.target.files[0].name);
		this.ajoutForm.get('pj.pcfileDeclar').setValue(event.target.files[0].name);
		this.formPjDeclar.selecetedFile = event.target.files[0];
	  }
	
	  labelDeclarant(event: any): void {
		this.formPjDeclar.LabelPj = event.target.value;
	  }
	  validerPjDec() {
		this.allpjDeclar.push(this.formPjDeclar);
		$("#testd").val(null);
		this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
		this.formPjDeclar = { selecetedFile: {}, LabelPj: this.formPjDeclar.LabelPj };
	  }
	
	  onDeletePjDec(id: number): void {
		this.allpjDeclar.splice(id, 1);
		if (this.allpjDeclar.length > 0) {
		  this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
		} else {
		  this.dataSource3 = null;
		}
	  }
	  async getAllPjImm(ide) {
		await this.httpClient.get(`${this.AlfresscoURL}/enterrement/index/${ide}`)
		  .subscribe(
			(data:any) => {
				this.dataSource2 = new MatTableDataSource(data);
			},
			(error) => console.log(error)
		);
	}
		onClickPj(e, id) {
			var r = e.substring(0, e.length - 4);
		console.log("rrrrr:", r)
		console.log("id alf:", id)
	
			this.httpClient.delete(`${this.AlfresscoURL}/enterrement/index/${id}`)
		.subscribe(
				(data:any) => {
			console.log(data)
			this.ngOnInit()
				},
				(error) => console.log(error)
			);
		}
	fetchEnterDetails(): void {
		const url = `${this.baseUrl}enterrement/${this.enterId}`;
		this.httpClient.get(url,{ headers: this.headers }).subscribe((response) => {
			this.enterDetails = response;
			
			this.sexeControl.setValue(this.enterDetails.sexe);
			this.lieuEnter = this.enterDetails.lieuEnterementObstacle;
			this.lieuRecup = this.enterDetails.lieuRecuperationObstacle;
			this.pieceJointe = this.enterDetails.pieceJointe;
			this.dateEnterment = this.formatDate(this.enterDetails.dateEnterementObstacle);
			this.communeControl.setValue(this.enterDetails.commune.id);
			this.arrondisControl.setValue(this.enterDetails.arrondissement.id);
			this.quartierControl.setValue(this.enterDetails.quartier.id);
			this.typeControl.setValue(this.enterDetails.type.id);

			this.nom = this.enterDetails.origine.nom;
			this.prenom = this.enterDetails.origine.prenom;
			this.cin = this.enterDetails.origine.cin;
			this.numBulletin = this.enterDetails.origine.numBulletin;
			this.nationalite.setValue(this.enterDetails.origine.nationalite);
			this.dateNaissance = this.formatDate(this.enterDetails.origine.date);
			this.connu = this.enterDetails.orgine.connu;
		});
		console.log(this.enterDetails)
	}

	private fetchTypes(): void {
		this.entermentserv.getAllTypes().subscribe(
			(response) => {
				this.type = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}
	private fetchArrondis(): void {
		this.entermentserv.getArrondis().subscribe(
			(response) => {
				this.arrondissement = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}
	private fetchQuartier(): void {
		this.entermentserv.getQuartier().subscribe(
			(response) => {
				this.quartier = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}
	private fetchCommune(): void {
		this.entermentserv.getCommune().subscribe(
			(response) => {
				this.commune = response;
			},
			(error) => {
				console.error("Error fetching types:", error);
			}
		);
	}

	updateEnterrement(): void {

		const origine = {
			nom: this.nom,
			prenom: this.prenom,
			date: this.dateNaissance,
			cin: this.cin,
			numBulletin: this.numBulletin,
			nationalite: this.nationalite.value,
			connu: this.connu,
		};
		
		const formData = new FormData();
		const pieceJ = new FormData();
		console.log(formData);
		
		setTimeout(() => {
			if (this.enterDetails.origine) { // Add null check here
				this.httpClient.put(`${this.baseUrl}origine/${this.enterDetails.origine.id}`, origine, { headers: this.headers }).subscribe(
					(response: any) => {
	
						console.log("Origine created successfully:", response);

						console.log(response.id);
						
						const inhumation = {
							type: { id: this.typeControl.value },
							commune: { id: this.communeControl.value },
							quartier: { id: this.quartierControl.value },
							arrondissement: { id: this.arrondisControl.value },
							sexe: this.sexeControl.value,
							dateEnterementObstacle: this.dateEnterment,
							lieuEnterementObstacle: this.lieuEnter,
							lieuRecuperationObstacle: this.lieuRecup,
							origine: {
								id: this.enterDetails.origine.id,
							},
						};
						
						console.log("inhumation", inhumation);
	
						formData.append("enterement", new Blob([JSON.stringify(inhumation)], { type: "application/json" }));
						// formData.append("pieceJointe", this.pieceJointe);
						this.httpClient.put(`${this.baseUrl}enterrement/${this.enterId}`, formData, { headers: this.headers }).subscribe(
							(employeurResponse:any) => {
								this.allpjDeclar.forEach(formPj => {	
        
									const pcjDeclarant = new FormData();
								
									  pcjDeclarant.append("file", formPj.selecetedFile)
									  pcjDeclarant.append("sousModule", "ENTERREMENT")
									  pcjDeclarant.append("id",response.id)
									  pcjDeclarant.append("label", formPj.LabelPj);
								
									  this.httpClient.post(`${this.AlfresscoURL}/enterrement/multiplefile`, pcjDeclarant)
									  .subscribe((res)=>{
									  console.log('deces naturel pièce Jointe stored successfully:', res);
									  })
									});
							
								console.log("enterrement created successfully:", employeurResponse);
								Swal.fire({
									title: "Enregistrement réussi!",
									text: "Enterrement enregistré avec succès.",
									icon: "success",
									confirmButtonText: "OK",
								}).then(() => {
									this.ngOnInit(); 
									this.router.navigate(["/bmh1/list-enterementInhum"]);
								});
							},
							(error) => {
								console.error("Error creating enterrement:", error);
							}
						);
					},
					(error) => {
						console.error(error);
					}
				);
			} else {
				console.error("Origine is null");
			}
		}, 200);
	}
	
	formatDate(date: any): String {
		return this.datePipe.transform(date, "yyyy-MM-dd") || "";
	}

	RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-enterementInhum"]);
	}
}
