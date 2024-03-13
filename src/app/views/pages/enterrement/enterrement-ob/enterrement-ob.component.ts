import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { EnterementInhumService } from "../../medecin-legale-bmh/services/enterement-inhum.service";
import { OrigineService } from "../../medecin-legale-bmh/services/origine.service";
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material";
import * as $ from "jquery";
@Component({
	selector: "kt-enterrement-ob",
	templateUrl: "./enterrement-ob.component.html",
	styleUrls: ["./enterrement-ob.component.scss"],
})
export class EnterrementObComponent implements OnInit {
	data: any[] = [];
	origine: any[] = [];
	enterement: any[] = [];

	ajoutForm: FormGroup;
	pcDeclarantFile: File;
	pcfileDeclar : File;
	labelDeclar: any;
	allpjDeclar = []
	formPjDeclar = { selecetedFile: {}, LabelPj: "" };
	dataSource3: MatTableDataSource<any>;
	displayedColumns1 = [ "label", "nomDoc", "actions"];

	private baseUrl = environment.API_BMH_URL;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	typeControl = new FormControl();
	communeControl = new FormControl();
	arrondisControl = new FormControl();
	sexeControl = new FormControl();
	quartierControl = new FormControl();
	dateEnterment: any;
	lieuEnter: any;
	lieuRecup: any;
	pieceJointe: any;
	private headers = new HttpHeaders({
		// 'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	nom: any;
	prenom: any;
	connu: boolean;
	cin: any;
	dateNaissance: any;
	numBulletin: any;
	nationalite = new FormControl();

	type: any[] = [];
	commune: any[] = [];
	arrondissement: any[] = [];
	quartier: any[] = [];

	handleFileInput(event: any): void {
		this.pieceJointe = event.target.files[0];
	}
	constructor(private httpClient: HttpClient, private router: Router,private fb : FormBuilder,
		 private entermentserv: EnterementInhumService, 
		originev:OrigineService) {}

	ngOnInit() {
		this.ajoutForm = this.fb.group({
			pj: this.fb.group({
				pcfileDeclar: [''] 
			})
		  });
		this.fetchQuartier();
		this.fetchCommune();
		this.fetchArrondis();
		this.fetchTypes();
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
		console.log(this.allpjDeclar)
	  }
	
	  onDeletePjDec(id: number): void {
		this.allpjDeclar.splice(id, 1);
		if (this.allpjDeclar.length > 0) {
		  this.dataSource3 = new MatTableDataSource(this.allpjDeclar);
		} else {
		  this.dataSource3 = null;
		}
	  }
	  
createEnterrement(): void {
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
			this.httpClient.post(`${this.baseUrl}origine`, origine,{ headers: this.headers }).subscribe(
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
							id: response.id,
						},
					};
					console.log(inhumation);
					formData.append("enterement", new Blob([JSON.stringify(inhumation)], { type: "application/json" }));
					// formData.append("pieceJointe", this.pieceJointe);
					this.httpClient.post(`${this.baseUrl}enterrement`, formData,{ headers: this.headers }).subscribe(
						(employeurResponse:any) => {
							console.log("enterrement created successfully:", employeurResponse);
		
							this.allpjDeclar.forEach(formPj => {	
        
								const pcjDeclarant = new FormData();
							
								  pcjDeclarant.append("file", formPj.selecetedFile)
								  pcjDeclarant.append("sousModule", "Enterrement")
								  pcjDeclarant.append("id",employeurResponse.id)
								  pcjDeclarant.append("label", formPj.LabelPj);
							
								  this.httpClient.post(`${this.AlfresscoURL}/enterrement/multiplefile`, pcjDeclarant)
								  .subscribe((res)=>{
								  console.log('deces naturel pièce Jointe stored successfully:', res);
								  })
								});
								
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
		}, 200);
	}
	RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-enterementInhum"]);
	}
}
