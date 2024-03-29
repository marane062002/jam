import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { IMarque, getMarqueIdentifier } from "../../../common/models/marque.model";
import { createRequestOption } from "../../../common/request/request-util";
import { isPresent } from "../../../common/util/operators";
import { SharedURLS } from "../../../../../../core/_base/layout/shared/shared-url";

export type EntityResponseType = HttpResponse<IMarque>;
export type EntityArrayResponseType = HttpResponse<IMarque[]>;

@Injectable({ providedIn: "root" })
export class MarqueService {

  protected resourceUrl = SharedURLS.marques;

  constructor(
    protected http: HttpClient
  ) {}

  create(marque: IMarque): Observable<EntityResponseType> {
    return this.http.post<IMarque>(this.resourceUrl, marque, {
      observe: "response",
    });
  }

  update(marque: IMarque): Observable<EntityResponseType> {
    return this.http.put<IMarque>(
      `${this.resourceUrl}/${getMarqueIdentifier(marque) as number}`,
      marque,
      { observe: "response" }
    );
  }

  partialUpdate(marque: IMarque): Observable<EntityResponseType> {
    return this.http.patch<IMarque>(
      `${this.resourceUrl}/${getMarqueIdentifier(marque) as number}`,
      marque,
      { observe: "response" }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMarque>(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMarque[]>(this.resourceUrl, {
      params: options,
      observe: "response",
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  addMarqueToCollectionIfMissing(
    marqueCollection: IMarque[],
    ...marquesToCheck: (IMarque | null | undefined)[]
  ): IMarque[] {
    const marques: IMarque[] = marquesToCheck.filter(isPresent);
    if (marques.length > 0) {
      const marqueCollectionIdentifiers = marqueCollection.map(
        (marqueItem) => getMarqueIdentifier(marqueItem)!
      );
      const marquesToAdd = marques.filter((marqueItem) => {
        const marqueIdentifier = getMarqueIdentifier(marqueItem);
        if (
          marqueIdentifier == null ||
          marqueCollectionIdentifiers.includes(marqueIdentifier)
        ) {
          return false;
        }
        marqueCollectionIdentifiers.push(marqueIdentifier);
        return true;
      });
     // return [...marquesToAdd, ...marqueCollection];
    }
    return marqueCollection;
  }
}
