/* export class SaerchcourrierEntrantsDTO {
          origine: any[]=[];
          type: any[]=[];
          dateDebut:Date;
          dateFin:Date;
          constructor( origine: any[],   type: any[],dateDebut:Date, dateFin:Date,){
      this.origine=origine;
      this.type=type;
      this.dateDebut=dateDebut;
      this.dateFin=dateFin;
          }

}
 */


export class SaerchcourrierEntrantsDTO {
    origine: any[]=[];
    type: any[]=[];
    dateDebut:Date;
    dateFin:Date;
    idDivision: any[] = [];
    traite: any[];
    constructor( origine: any[],   type: any[],dateDebut:Date, dateFin:Date, idDivision: any[], traite: any[]){
this.origine=origine;
this.type=type;
this.dateDebut=dateDebut;
this.dateFin=dateFin;
this.idDivision = idDivision;
this.traite = traite;
    }
    

}
