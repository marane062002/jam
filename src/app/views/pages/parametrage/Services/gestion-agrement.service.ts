import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionAgrementService {

  constructor() { }
    // async getAll(){

  //   return await this.http.get<any>(this.baseUrl1 + 'All').pipe(delay(300)).toPromise();
  // }
  // create(f): Observable<any> {
	// 	return this.http.post<Observable<any>>(this.baseUrl1 + "AddTypePrestationAo", f);
	// }

  // update(f): Observable<any> {
	// 	return this.http.put<Observable<any>>(this.baseUrl1 + "updateTypePrestationAo", f);
	// }
  // deleteById(id): Observable<any> {
	// 	return this.http.delete<any>(this.baseUrl1+ "DeleteTypePrestationAo/" + id);
	// }
  // findById(id): Observable<any> {
	// 	return this.http.get<Observable<any>>(this.baseUrl1+'findTypePrestationAoById/'+id);
	//   }
}
