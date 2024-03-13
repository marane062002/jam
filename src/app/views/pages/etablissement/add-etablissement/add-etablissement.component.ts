import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "kt-add-etablissement",
  templateUrl: "./add-etablissement.component.html",
  styleUrls: ["./add-etablissement.component.scss"],
})
export class AddEtablissementComponent implements OnInit {
  typeControl = new FormControl();
  communeControl = new FormControl();
  quartierControl = new FormControl();
  arrondissementControl = new FormControl();
  controleurControl=new FormControl();

  
  denomination:string;
  natureEtablissement:any;
  remarque:string;
  mesuresPrises:any;
  saisisDestruction: any;
  valeurSaisieDestruction:any;
  etatHygiene:string;
  rc: any;
  nom: any;
  prenom: any;
  cin: any;
  tel: any;
  nomProp: any;
  prenomProp: any;
  cinPro: any ;
  nomGerant: any;
  prenomGerant: any;
  cinGerant: any;
  adresse: any;
  personne:any;
  proprGerant:any;
  date=new Date();
  private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
  types: any[] = [];
  commune: any[] = [];
  quartier: any[] = [];
  arrondissement: any[] = [];
  controleur:any[]=[];
  
//   data: any[] =[];
  private baseUrl = environment.API_BMH_URL;

  constructor(private router: Router, private httpClient: HttpClient) {}
  Visible: any = 0;
  isSelected: boolean = false;

  ngOnInit(): void {
    this.fetchTypes();
    this.fetchCommune();
    this.fetchQuartier();
    this.fetchArrondissement();
    this.fetchControleur();
   
  }

  
  private fetchTypes(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}typectrl`,{ headers: this.headers }).subscribe(
      (response) => {
        this.types = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }
  private fetchControleur(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}controleur`,{ headers: this.headers }).subscribe(
      (response) => {
        this.controleur = response;
      },
      (error) => {
        console.error("Error fetching controleur:", error);
      }
    );
  }

  private fetchCommune(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}commune`,{ headers: this.headers }).subscribe(
      (response) => {
        this.commune = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }

  private fetchQuartier(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}quartier`,{ headers: this.headers }).subscribe(
      (response) => {
        this.quartier = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }

  private fetchArrondissement(): void {
    this.httpClient.get<any[]>(`${this.baseUrl}arrondissement`,{ headers: this.headers }).subscribe(
      (response) => {
        this.arrondissement = response;
      },
      (error) => {
        console.error("Error fetching types:", error);
      }
    );
  }


 
  createEtablissement(): void {
    const data: any = {
      denomination:this.denomination,
      natureEtablissement:this.natureEtablissement,
      remarque:this.remarque,
      mesuresPrises:this.mesuresPrises,
      saisisDestruction:this.saisisDestruction,
      valeurSaisieDestruction:this.valeurSaisieDestruction,
      etatHygiene:this.etatHygiene,
      personne:this.personne,
      proprGerant:this.proprGerant,
        tel: this.tel,
        adresse: this.adresse,
        nomProp: this.nomProp,
        prenomProp: this.prenomProp,
        cinPro: this.cinPro,
        nomGerant: this.nomGerant,
        prenomGerant: this.prenomGerant,
        cinGerant: this.cinGerant,
        date:this.date,
		typeControleSanitaire : { id: this.typeControl.value },
		commune : { id: this.communeControl.value },
		arrondissement : { id: this.arrondissementControl.value },
		quartier : { id: this.quartierControl.value },
		controleur : { id: this.controleurControl.value }
    };

    if(this.proprGerant==="Proprietaire"){
      
      data.nomProp=this.nomProp;  
      data.prenomProp=this.prenomProp;  
      data.cinPro=this.cinPro;
    }else{
      data.nomGerant=this.nomGerant;
      data.rc=this.rc;
    }
    if (this.personne === "MORALE") {
      data.rc = this.rc;
      data.nom = this.nom;
  } else if (this.personne === "PHYSIQUE") {
      data.nom = this.nom;
      data.prenom = this.prenom;
      data.cin = this.cin;
  }

   
    console.log(data);
    this.httpClient.post<any>(`${this.baseUrl}etablissements`, data,{ headers: this.headers }).subscribe(
        (response) => {
            console.log("Etablissement created successfully:", response);
            this.router.navigate(["/etablissement/list-etablissement"]);
        },
        (error) => {
            console.error("Error creating etablissement:", error);
        }
    );
}





  RetourEmbalages(): void {
    this.router.navigate(["/etablissement/list-etablissement"]);
  }
}
