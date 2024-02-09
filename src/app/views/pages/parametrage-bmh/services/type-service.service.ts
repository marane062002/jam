import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { InterfaceType } from '../list-types/list-types.component';
import { InterfaceConstateur } from '../list-constateur/list-constateur.component';
import { catchError } from 'rxjs/operators';
// import { InterfaceType } from '../interfaces/InterfaceType';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {
  
  private baseUrl = environment.API_BMH_URL

  constructor(private http: HttpClient) { }

  getAllTypes():Observable<any>{
    return this.http.get<InterfaceType[]>(`${this.baseUrl}`+'type');
  }


  createType(type:InterfaceType):Observable<InterfaceType>{
   return this.http.post<InterfaceType>(`${this.baseUrl}`+'type',type);
  }
 
  editType(id: number,data:any):Observable<InterfaceType> {
    const url = `${this.baseUrl}type/${id}`;
  return this.http.put<InterfaceType>(url, data);
}
getTypeDetailsById(id: any): Observable<InterfaceType> {
  // Faites la requête HTTP pour récupérer les détails du type en fonction de l'ID
  return this.http.get<InterfaceType>(`${this.baseUrl}`+'type/'+`${id}`);
  // Assurez-vous d'ajuster cette URL pour correspondre à celle de votre API et de votre endpoint pour récupérer les détails du type par ID
}

 deleteType(id:any): Observable<InterfaceType>{
  return this.http.delete<InterfaceType>(`${this.baseUrl}`+'type/'+`${id}`);
 }

//  search(itemSearch:string){
//   return this.http.get<InterfaceType[]>(`${this.baseUrl}type/search?keyword=${itemSearch}`)
//   .pipe(
//     catchError((error) => {
//       console.error('Une erreur est survenue:', error);
//       // Gérer l'erreur ici (affichage d'un message, journalisation, etc.)
//       return throwError('Erreur lors de la recherche.');
//     })
//   );
//  }

}
