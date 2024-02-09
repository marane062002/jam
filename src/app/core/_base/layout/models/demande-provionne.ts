import { DemandeMission } from "./demande-mission";

export class DemandeProvionne {
    id:number;
resbonsable_id:string;
numdemande:string;
moyenTransport:string;
entitrBEneficaire:string;
type:string;
motif:string;
parcours:string;
dateDepart:Date;
dateRetour:Date;
statusDemande:any;
dateArriveLettre:Date;
demandeMission:DemandeMission

}
