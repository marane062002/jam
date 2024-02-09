import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { CarteJawazService } from "../service/carte-jawaz.service";
import { ICarteJawaz, CarteJawaz } from "../../../common/models/carte-jawaz.model";

@Injectable({ providedIn: "root" })
export class CarteJawazRoutingResolveService implements Resolve<ICarteJawaz> {
  constructor(protected service: CarteJawazService, protected router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ICarteJawaz> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((carteJawaz: HttpResponse<CarteJawaz>) => {
          if (carteJawaz.body) {
            return of(carteJawaz.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new CarteJawaz());
  }
}
