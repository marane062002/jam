import { CarteCarbucarte, getCarteCarbucarteIdentifier, ICarteCarbucarte } from './../../../common/models/carte-carbucarte.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import dayjs from "dayjs/esm";



import { createRequestOption } from '../../../common/request/request-util';
import { isPresent } from '../../../common/util/operators';
import { SharedURLS } from "../../../../../../core/_base/layout/shared/shared-url";
export type EntityResponseType = HttpResponse<ICarteCarbucarte>;
export type EntityArrayResponseType = HttpResponse<ICarteCarbucarte[]>;

@Injectable({ providedIn: "root" })
export class CarteCarbucarteService {
  protected resourceUrl = SharedURLS["carte-carbucartes"];

  constructor(
    protected http: HttpClient
  ) {}

  create(carteCarbucarte: ICarteCarbucarte): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carteCarbucarte);
    return this.http
      .post<ICarteCarbucarte>(this.resourceUrl, copy, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(carteCarbucarte: ICarteCarbucarte): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carteCarbucarte);
    return this.http
      .put<ICarteCarbucarte>(
        `${this.resourceUrl}/${
          getCarteCarbucarteIdentifier(carteCarbucarte) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(
    carteCarbucarte: ICarteCarbucarte
  ): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(carteCarbucarte);
    return this.http
      .patch<ICarteCarbucarte>(
        `${this.resourceUrl}/${
          getCarteCarbucarteIdentifier(carteCarbucarte) as number
        }`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICarteCarbucarte>(`${this.resourceUrl}/${id}`, {
        observe: "response",
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICarteCarbucarte[]>(this.resourceUrl, {
        params: options,
        observe: "response",
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: "response",
    });
  }

  addCarteCarbucarteToCollectionIfMissing(
    carteCarbucarteCollection: ICarteCarbucarte[],
    ...carteCarbucartesToCheck: (ICarteCarbucarte | null | undefined)[]
  ): ICarteCarbucarte[] {
    const carteCarbucartes: ICarteCarbucarte[] =
      carteCarbucartesToCheck.filter(isPresent);
    if (carteCarbucartes.length > 0) {
      const carteCarbucarteCollectionIdentifiers =
        carteCarbucarteCollection.map(
          (carteCarbucarteItem) =>
            getCarteCarbucarteIdentifier(carteCarbucarteItem)!
        );
      const carteCarbucartesToAdd = carteCarbucartes.filter(
        (carteCarbucarteItem) => {
          const carteCarbucarteIdentifier =
            getCarteCarbucarteIdentifier(carteCarbucarteItem);
          if (
            carteCarbucarteIdentifier == null ||
            carteCarbucarteCollectionIdentifiers.includes(
              carteCarbucarteIdentifier
            )
          ) {
            return false;
          }
          carteCarbucarteCollectionIdentifiers.push(carteCarbucarteIdentifier);
          return true;
        }
      );
     // return [...carteCarbucartesToAdd, ...carteCarbucarteCollection];
    }
    return carteCarbucarteCollection;
  }

  protected convertDateFromClient(
    carteCarbucarte: ICarteCarbucarte
  ): ICarteCarbucarte {
    return Object.assign({}, carteCarbucarte, {
      dateAcquisition: carteCarbucarte.dateAcquisition.isValid()
        ? carteCarbucarte.dateAcquisition.toJSON()
        : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAcquisition = res.body.dateAcquisition
        ? dayjs(res.body.dateAcquisition)
        : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((carteCarbucarte: ICarteCarbucarte) => {
        carteCarbucarte.dateAcquisition = carteCarbucarte.dateAcquisition
          ? dayjs(carteCarbucarte.dateAcquisition)
          : undefined;
      });
    }
    return res;
  }
}
