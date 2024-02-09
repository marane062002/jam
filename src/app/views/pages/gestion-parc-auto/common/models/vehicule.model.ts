import dayjs from "dayjs/esm";
import { EtatVehicule } from "../enumerations/etat-vehicule.model";
import { StatutVehicule } from "../enumerations/statut-vehicule.model";
import { TypeCarburant } from "../enumerations/type-carburant.model";
import { IAccessoireVehicule } from "./accessoire-vehicule.model";
import { ICategorieVehicule } from "./categorie-vehicule.model";
import { IMarque } from "./marque.model";

export interface IVehicule {
  id?: number;
  matricule?: string;
  matriculeAr?: string;
  cartegriseVehicule?: string | null;
  modele?: string | null;
  carburant?: TypeCarburant;
  statutVehicule?: StatutVehicule;
  puissanceFiscale?: string;
  nombrePlaces?: number;
  dateAcquisition?: dayjs.Dayjs;
  entiteBenificiaire?: string;
  entiteBenificiaireAR?: string;
  compteur?: number;
  consommation?: string;
  numInventaire?: string;
  numeroChassis?: string;
  origin?: string;
  etatVehicule?: EtatVehicule;
  vidange?: number;
  marque?: IMarque;
  

  categorieVehicule?: ICategorieVehicule;
  accessoireVehicules?: IAccessoireVehicule[];
}

export class Vehicule implements IVehicule {
  constructor(
    public id?: number,
    public matricule?: string,
    public matriculeAr?: string,
    public cartegriseVehicule?: string | null,
    public modele?: string | null,
    public carburant?: TypeCarburant,
    public statutVehicule?: StatutVehicule,
    public puissanceFiscale?: string,
    public nombrePlaces?: number,
    public dateAcquisition?: dayjs.Dayjs,
    public entiteBenificiaire?: string,
    public entiteBenificiaireAR?: string,
    public compteur?: number,
    public consommation?: string,
    public numeroChassis?: string,
    public origin?: string,
    public etatVehicule?: EtatVehicule,
    public vidange?: number,
    public marque?: IMarque,
    public numInventaire?: string,
    public categorieVehicule?: ICategorieVehicule,
    public accessoireVehicules?: IAccessoireVehicule[]
  ) {}
}

export function getVehiculeIdentifier(vehicule: IVehicule): number | undefined {
  return vehicule.id;
}


export class VehiculeCriteria { 
  
  matricule?: string | null;
  matriculeAr?: string | null;
  cartegriseVehicule?: string | null;
  modele?: string | null;
  carburant?: TypeCarburant | null;
  statutVehicule?: StatutVehicule | null;
  puissanceFiscale?: string | null;
  nombrePlaces?: number | null;
  dateAcquisition?: dayjs.Dayjs | null;
  entiteBenificiaire?: string | null;
  entiteBenificiaireAR?: string | null;
  compteur?: number | null;
  consommation?: string | null;
  numeroChassis?: string | null;
  origin?: string | null;
  etatVehicule?: EtatVehicule | null;
  vidange?: number | null;
  marque?: IMarque | null;
  numInventaire?: string | null;
  categorieVehicule?: ICategorieVehicule | null;
  accessoireVehicules?: IAccessoireVehicule[] | null;

  public areSet():boolean {
    return this.matricule != null || 
           this.matriculeAr != null ||  
           this.cartegriseVehicule != null || 
           this.modele != null || 
           this.carburant != null || 
           this.puissanceFiscale != null || 
           this.nombrePlaces != null || 
           this.dateAcquisition != null || 
           this.entiteBenificiaire != null || 
           this.entiteBenificiaireAR != null || 
           this.compteur != null || 
           this.consommation != null || 
           this.numeroChassis != null || 
           this.origin != null || 
           this.etatVehicule != null || 
           this.vidange != null || 
           this.marque != null || 
           this.categorieVehicule != null || 
           this.accessoireVehicules != null || 
           this.statutVehicule != null ;
           this.numInventaire!= null ;
  }

  public clear():void {
          this.matricule != null ; 
           this.matriculeAr != null ;  
           this.cartegriseVehicule != null ;
           this.modele != null ;
           this.carburant != null ;
           this.puissanceFiscale != null ; 
           this.nombrePlaces != null ; 
           this.dateAcquisition != null ;
           this.entiteBenificiaire != null ;
           this.entiteBenificiaireAR != null ; 
           this.compteur != null ;
           this.consommation != null ;
           this.numeroChassis != null ; 
           this.origin != null ; 
           this.etatVehicule != null ;
           this.vidange != null ; 
           this.marque != null ; 
           this.categorieVehicule != null ;
           this.accessoireVehicules != null ; 
           this.statutVehicule != null ;
           this.numInventaire!= null ;
  }

}
