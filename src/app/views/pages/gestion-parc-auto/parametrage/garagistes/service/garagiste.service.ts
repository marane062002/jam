
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";



import { getGaragisteIdentifier, IGaragiste } from "../../../common/models/garagiste.model";
import { isPresent } from "../../../common/util/operators";
import { createRequestOption } from '../../../common/request/request-util';
import { SharedURLS } from "../../../../../../core/_base/layout/shared/shared-url";


export type EntityResponseType = HttpResponse<IGaragiste>;
export type EntityArrayResponseType = HttpResponse<IGaragiste[]>;

@Injectable({ providedIn: "root" })
export class GaragisteService {

  protected resourceUrl = SharedURLS.garagistes;

  constructor(
    protected http: HttpClient
  ) {}

  create(garagiste: IGaragiste): Observable<EntityResponseType> {
    return this.http.post<IGaragiste>(this.resourceUrl, garagiste, {
      observe: "response",
    });
  }

  update(garagiste: IGaragiste): Observable<EntityResponseType> {
    return this.http.put<IGaragiste>(
      `${this.resourceUrl}/${getGaragisteIdentifier(garagiste) as number}`,
      garagiste,
      { observe: "response" }
    );
  }

  partialUpdate(garagiste: IGaragiste): Observable<EntityResponseType> {
    return this.http.patch<IGaragiste>(
      `${this.resourceUrl}/${getGaragisteIdentifier(garagiste) as number}`,
      garagiste,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGaragiste>(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGaragiste[]>(this.resourceUrl, {
      params: options,
      observe: "response",
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  addGaragisteToCollectionIfMissing(
    garagisteCollection: IGaragiste[],
    ...garagistesToCheck: (IGaragiste | null | undefined)[]
  ): IGaragiste[] {
    const garagistes: IGaragiste[] = garagistesToCheck.filter(isPresent);
    if (garagistes.length > 0) {
      const garagisteCollectionIdentifiers = garagisteCollection.map(
        (garagisteItem) => getGaragisteIdentifier(garagisteItem)!
      );
      const garagistesToAdd = garagistes.filter((garagisteItem) => {
        const garagisteIdentifier = getGaragisteIdentifier(garagisteItem);
        if (
          garagisteIdentifier == null ||
          garagisteCollectionIdentifiers.includes(garagisteIdentifier)
        ) {
          return false;
        }
        garagisteCollectionIdentifiers.push(garagisteIdentifier);
        return true;
      });
     // return [...garagistesToAdd, ...garagisteCollection];
    }
    return garagisteCollection;
  }
}
