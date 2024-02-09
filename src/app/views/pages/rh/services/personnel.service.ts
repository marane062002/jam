import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable,forkJoin } from 'rxjs';
import { environment } from '../../../../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  
  private baseUrl = environment.personnelUrl;
 
  constructor(private http:HttpClient) { } 

  async getRessource(){

    return await this.http.get<any>(this.baseUrl+'/personnels/index').toPromise;
  }
  public getPersonnelsByDevisionAndService(liste): Observable <any>{

    let personnels = this.http.post(this.baseUrl+'/personnels/index',liste).toPromise();
    return forkJoin([personnels]);
  }
  async getConges(){

    return await this.http.get<any>(this.baseUrl+'/demandeConges/index').toPromise();
  }
   
  async getDemandeCongeById(id) {
    return await this.http.get<any>(this.baseUrl+'/demandeConges/show/' + id).toPromise();
    
  }
  
  public getData(): Observable<any>{ 
        
        let typeconges = this.http.get(this.baseUrl+'/typeConges/index').toPromise();
        let niveauAc = this.http.get(this.baseUrl+'/niveauAcademiques/index').toPromise();
        let typeP = this.http.get(this.baseUrl+'/typePersonnels/index').toPromise();
        let sex= this.http.get(this.baseUrl+'/sex/index').toPromise();
        let situationF= this.http.get(this.baseUrl+'/situationFamiliales/index').toPromise();
        let divisions = this.http.get(environment.organisationUrl+'/divisions/index').toPromise();
        
        
        return forkJoin([typeconges,niveauAc,typeP,sex,situationF,divisions]);
  }
  
  async getRessourceById(id: number,url) {
    return await this.http.get<any>(this.baseUrl+url + id).toPromise();
  }
  async getPersonnelById(id: number) {
    return  await this.http.get<any>(this.baseUrl+'/personnels/show/' + id).toPromise();
    
  }
  public getProfileById(id: number): Observable<any> {
    let personnel =this.http.get<any>(this.baseUrl+'/personnels/myProfile/' + id).toPromise();
    return forkJoin([personnel])
  }
  public getCongePersonnelById(id: number): Observable<any> {
    let personnel =this.http.get<any>(this.baseUrl+'/personnels/find/' + id).toPromise();
    return forkJoin([personnel])
  }
  public getInfTypeConge(idP: number,idT:number): Observable<any> {
     let infosConge = this.http.get<any>(this.baseUrl+'/resteConge?id='+ idP+','+idT).toPromise();
     return forkJoin([infosConge])
  }
  public postRessource(ressource: any,url): Observable<any> {
    return this.http.post(this.baseUrl+url, ressource);
  }

 public deleteRessource(id: number,url): Observable<any> {
    return this.http.delete(this.baseUrl+url + id, { responseType: 'text' });
  }

  public updateRessource(ressource: Object,id: number,url): Observable<Object> {
    return this.http.put(this.baseUrl+url+ id, ressource);
  }

  public getRessourceByMatricule(matricule: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/personnels/findByMatricule/' + matricule);
  }
 async getPersonnelsByDivision(id:number) {
  return await this.http.get<any>(this.baseUrl+'/personnels/division/' + id).toPromise();
 }
 public getPersonnelsByService(id:number): Observable <any>{

  return this.http.get(this.baseUrl+'/personnels/service/' + id);
}

public checkMatricule(val): Observable <boolean>{

  return this.http.get<boolean>(this.baseUrl+'/personnels/checkMatricule/'+val);
}

public getDataConge(id): Observable<any>{
        
  let typeconges =  this.http.get(this.baseUrl+'/typesConge/personnels/'+ id).toPromise();
  let joursF = this.http.get(this.baseUrl+'/joursFeriers/index').toPromise();
  
  return forkJoin([typeconges,joursF]); 
}

async divisionChange(idDivision){
  let personnels = await this.http.get<any>(this.baseUrl+ '/personnels/division/' + idDivision);
  let services = await this.http.get<any>(environment.organisationUrl + '/services/divisions/' + idDivision);

  return forkJoin([personnels,services]).toPromise()
}

async getInfosCongeByPersonnel(idpersonnel,idtype){ 
return await this.http.get<any>(this.baseUrl + '/resteConge?id=' +idpersonnel +','+ idtype).toPromise();
}

public cancelDemandeConge(ressource: Object,id: number): Observable<Object> {
  return this.http.put(this.baseUrl+'/demandeConges/cancel/'+id, ressource);
}
public validateDemandeConge(ressource: Object,id: number): Observable<Object> {
  return this.http.put(this.baseUrl+'/demandeConges/validate/'+id, ressource);
}

async getDataValidateConge(id){ 
    
  let demande = await this.http.get(this.baseUrl+'/demandeConges/show/'+ id)
  let statuts = await this.http.get(this.baseUrl+'/statutsDemandes/index')     
  
  return forkJoin([demande,statuts]).toPromise();
}


public getPersonnelsByNom(nom: string): Observable<any> {
  let personnel =this.http.get<any>(this.baseUrl+'/personnelsByNom/find/' + nom).toPromise();
  return forkJoin([personnel])
}
}
