import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import dayjs from "dayjs/esm";

import { IVehicule, getVehiculeIdentifier } from "../../../common/models/vehicule.model";
import { createRequestOption } from "../../../common/request/request-util";
import { isPresent } from "../../../common/util/operators";
import { SharedURLS } from "../../../../../../core/_base/layout/shared/shared-url";

export type EntityResponseType = HttpResponse<IVehicule>;
export type EntityArrayResponseType = HttpResponse<IVehicule[]>;

@Injectable({ providedIn: "root" })
export class VehiculeService {

  protected resourceUrl = SharedURLS.vehicules;

  constructor(
    protected http: HttpClient
  ) {}

  create(vehicule: IVehicule): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(vehicule);
    return this.http.post<IVehicule>(this.resourceUrl, vehicule, { observe: "response" })
      // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vehicule: IVehicule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicule);
    return this.http
      .put<IVehicule>(
        `${this.resourceUrl}/${getVehiculeIdentifier(vehicule) as number}`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(vehicule: IVehicule): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vehicule);
    return this.http
      .patch<IVehicule>(
        `${this.resourceUrl}/${getVehiculeIdentifier(vehicule) as number}`,
        copy,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVehicule>(`${this.resourceUrl}/${id}`, { observe: "response" })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVehicule[]>(this.resourceUrl, {
        params: options,
        observe: "response",
      })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }
  findAllVehiculeDispponible(req?: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<IVehicule[]>(this.resourceUrl+'/findAllVehiculeDispponible', {  observe: "response", })
      .pipe(
        map((res: EntityArrayResponseType) =>
          this.convertDateArrayFromServer(res)
        )
      );
  }
  findAll(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IVehicule[]>(this.resourceUrl+'/findAll', {  observe: "response", })
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

  addVehiculeToCollectionIfMissing(
    vehiculeCollection: IVehicule[],
    ...vehiculesToCheck: (IVehicule | null | undefined)[]
  ): IVehicule[] {
    const vehicules: IVehicule[] = vehiculesToCheck.filter(isPresent);
    if (vehicules.length > 0) {
      const vehiculeCollectionIdentifiers = vehiculeCollection.map(
        (vehiculeItem) => getVehiculeIdentifier(vehiculeItem)!
      );
      const vehiculesToAdd = vehicules.filter((vehiculeItem) => {
        const vehiculeIdentifier = getVehiculeIdentifier(vehiculeItem);
        if (
          vehiculeIdentifier == null ||
          vehiculeCollectionIdentifiers.includes(vehiculeIdentifier)
        ) {
          return false;
        }
        vehiculeCollectionIdentifiers.push(vehiculeIdentifier);
        return true;
      });
   //   return [...vehiculesToAdd, ...vehiculeCollection];
    }
    return vehiculeCollection;
  }

  protected convertDateFromClient(vehicule: IVehicule): IVehicule {
    return Object.assign({}, vehicule, {
      dateAcquisition: vehicule.dateAcquisition.isValid()});
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateAcquisition = res.body.dateAcquisition}
    return res;
  }

  protected convertDateArrayFromServer(
    res: EntityArrayResponseType
  ): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vehicule: IVehicule) => {
        vehicule.dateAcquisition = vehicule.dateAcquisition
          ? dayjs(vehicule.dateAcquisition)
          : undefined;
      });
    }
    return res;
  }

  
}
