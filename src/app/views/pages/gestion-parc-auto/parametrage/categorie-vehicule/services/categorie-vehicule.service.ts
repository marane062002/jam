import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICategorieVehicule, getCategorieVehiculeIdentifier } from "../../../common/models/categorie-vehicule.model";
import { createRequestOption } from "../../../common/request/request-util";
import { isPresent } from "../../../common/util/operators";
import { SharedURLS } from "../../../../../../core/_base/layout/shared/shared-url";



export type EntityResponseType = HttpResponse<ICategorieVehicule>;
export type EntityArrayResponseType = HttpResponse<ICategorieVehicule[]>;

@Injectable({ providedIn: "root" })
export class CategorieVehiculeService {
  
  protected resourceUrl = SharedURLS["categorie-vehicules"];

  constructor(
    protected http: HttpClient
  ) {}

  create(
    categorieVehicule: ICategorieVehicule
  ): Observable<EntityResponseType> {
    return this.http.post<ICategorieVehicule>(
      this.resourceUrl,
      categorieVehicule,
      { observe: "response" }
    );
  }

  update(
    categorieVehicule: ICategorieVehicule
  ): Observable<EntityResponseType> {
    return this.http.put<ICategorieVehicule>(
      `${this.resourceUrl}/${
        getCategorieVehiculeIdentifier(categorieVehicule) as number
      }`,
      categorieVehicule,
      { observe: "response" }
    );
  }

  partialUpdate(
    categorieVehicule: ICategorieVehicule
  ): Observable<EntityResponseType> {
    return this.http.patch<ICategorieVehicule>(
      `${this.resourceUrl}/${
        getCategorieVehiculeIdentifier(categorieVehicule) as number
      }`,
      categorieVehicule,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategorieVehicule>(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategorieVehicule[]>(this.resourceUrl, {
      params: options,
      observe: "response",
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  addCategorieVehiculeToCollectionIfMissing(
    categorieVehiculeCollection: ICategorieVehicule[],
    ...categorieVehiculesToCheck: (ICategorieVehicule | null | undefined)[]
  ): ICategorieVehicule[] {
    
    const categorieVehicules: ICategorieVehicule[] = categorieVehiculesToCheck.filter(isPresent);
    
    if (categorieVehicules.length > 0) {
      const categorieVehiculeCollectionIdentifiers =
        categorieVehiculeCollection.map(
          (categorieVehiculeItem) =>
            getCategorieVehiculeIdentifier(categorieVehiculeItem)!
        );
        
      const categorieVehiculesToAdd = categorieVehicules.filter(
        (categorieVehiculeItem) => {
          const categorieVehiculeIdentifier = getCategorieVehiculeIdentifier(
            categorieVehiculeItem
          );
          if (
            categorieVehiculeIdentifier == null ||
            categorieVehiculeCollectionIdentifiers.includes(
              categorieVehiculeIdentifier
            )
          ) {
            
            return false;
          }
          categorieVehiculeCollectionIdentifiers.push(
            categorieVehiculeIdentifier
          );
          
          return true;
        }
      );
      //return [...categorieVehiculesToAdd, ...categorieVehiculeCollection];
    }
    return categorieVehiculeCollection;
  }
}
