import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccessoireVehicule, getAccessoireVehiculeIdentifier } from '../../../common/models/accessoire-vehicule.model';
import { createRequestOption } from '../../../common/request/request-util';
import { isPresent } from '../../../common/util/operators';
import { SharedURLS } from "../../../../../../core/_base/layout/shared/shared-url";


export type EntityResponseType = HttpResponse<IAccessoireVehicule>;
export type EntityArrayResponseType = HttpResponse<IAccessoireVehicule[]>;

@Injectable({ providedIn: 'root' })
export class AccessoireVehiculeService {
  protected resourceUrl =  SharedURLS['accessoire-vehicules'];

  constructor(protected http: HttpClient) {}

  create(accessoireVehicule: IAccessoireVehicule): Observable<EntityResponseType> {
    return this.http.post<IAccessoireVehicule>(this.resourceUrl, accessoireVehicule, { observe: 'response' });
  }

  update(accessoireVehicule: IAccessoireVehicule): Observable<EntityResponseType> {
    return this.http.put<IAccessoireVehicule>(
      `${this.resourceUrl}/${getAccessoireVehiculeIdentifier(accessoireVehicule) as number}`,
      accessoireVehicule,
      { observe: 'response' }
    );
  }

  partialUpdate(accessoireVehicule: IAccessoireVehicule): Observable<EntityResponseType> {
    return this.http.patch<IAccessoireVehicule>(
      `${this.resourceUrl}/${getAccessoireVehiculeIdentifier(accessoireVehicule) as number}`,
      accessoireVehicule,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAccessoireVehicule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  pageable(page: number ,  size:number) :Observable<IAccessoireVehicule[]>{
    return  this.http.get<IAccessoireVehicule[]>(this.resourceUrl+'/api/pageable?page='+page+'&size='+size);
   }

  query(req?: any){
    const options = createRequestOption(req);
    return this.http.get<IAccessoireVehicule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAccessoireVehiculeToCollectionIfMissing(
    accessoireVehiculeCollection: IAccessoireVehicule[],
    ...accessoireVehiculesToCheck: (IAccessoireVehicule | null | undefined)[]
  ): IAccessoireVehicule[] {
    const accessoireVehicules: IAccessoireVehicule[] = accessoireVehiculesToCheck.filter(isPresent);
    if (accessoireVehicules.length > 0) {
      const accessoireVehiculeCollectionIdentifiers = accessoireVehiculeCollection.map(
        accessoireVehiculeItem => getAccessoireVehiculeIdentifier(accessoireVehiculeItem)!
      );
      const accessoireVehiculesToAdd = accessoireVehicules.filter(accessoireVehiculeItem => {
        const accessoireVehiculeIdentifier = getAccessoireVehiculeIdentifier(accessoireVehiculeItem);
        if (accessoireVehiculeIdentifier == null || accessoireVehiculeCollectionIdentifiers.includes(accessoireVehiculeIdentifier)) {
          return false;
        }
        accessoireVehiculeCollectionIdentifiers.push(accessoireVehiculeIdentifier);
        return true;
      });
   //   return [...accessoireVehiculesToAdd, ...accessoireVehiculeCollection];
    }
    return accessoireVehiculeCollection;
  }
}
