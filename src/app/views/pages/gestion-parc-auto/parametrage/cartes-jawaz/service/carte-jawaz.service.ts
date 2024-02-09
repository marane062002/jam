import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { ICarteJawaz, getCarteJawazIdentifier } from "../../../common/models/carte-jawaz.model";
import { createRequestOption } from "../../../common/request/request-util";
import { isPresent } from "../../../common/util/operators";
import { SharedURLS } from "../../../../../../core/_base/layout/shared/shared-url";


export type EntityResponseType = HttpResponse<ICarteJawaz>;
export type EntityArrayResponseType = HttpResponse<ICarteJawaz[]>;

@Injectable({ providedIn: "root" })
export class CarteJawazService {
  protected resourceUrl = SharedURLS["carte-jawaz"];

  constructor(
    protected http: HttpClient
  ) {}

  create(carteJawaz: ICarteJawaz): Observable<EntityResponseType> {
    return this.http.post<ICarteJawaz>(this.resourceUrl, carteJawaz, {
      observe: "response",
    });
  }

  update(carteJawaz: ICarteJawaz): Observable<EntityResponseType> {
    return this.http.put<ICarteJawaz>(
      `${this.resourceUrl}/${getCarteJawazIdentifier(carteJawaz) as number}`,
      carteJawaz,
      { observe: "response" }
    );
  }

  partialUpdate(carteJawaz: ICarteJawaz): Observable<EntityResponseType> {
    return this.http.patch<ICarteJawaz>(
      `${this.resourceUrl}/${getCarteJawazIdentifier(carteJawaz) as number}`,
      carteJawaz,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICarteJawaz>(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }
  all(){
    return this.http.get<ICarteJawaz[]>(this.resourceUrl+"/all", {
      observe: "response",
    });
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICarteJawaz[]>(this.resourceUrl, {
      params: options,
      observe: "response",
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  addCarteJawazToCollectionIfMissing(
    carteJawazCollection: ICarteJawaz[],
    ...carteJawazsToCheck: (ICarteJawaz | null | undefined)[]
  ): ICarteJawaz[] {
    const carteJawazs: ICarteJawaz[] = carteJawazsToCheck.filter(isPresent);
    if (carteJawazs.length > 0) {
      const carteJawazCollectionIdentifiers = carteJawazCollection.map(
        (carteJawazItem) => getCarteJawazIdentifier(carteJawazItem)!
      );
      const carteJawazsToAdd = carteJawazs.filter((carteJawazItem) => {
        const carteJawazIdentifier = getCarteJawazIdentifier(carteJawazItem);
        if (
          carteJawazIdentifier == null ||
          carteJawazCollectionIdentifiers.includes(carteJawazIdentifier)
        ) {
          return false;
        }
        carteJawazCollectionIdentifiers.push(carteJawazIdentifier);
        return true;
      });
    //  return [...carteJawazsToAdd, ...carteJawazCollection];
    }
    return carteJawazCollection;
  }
}
