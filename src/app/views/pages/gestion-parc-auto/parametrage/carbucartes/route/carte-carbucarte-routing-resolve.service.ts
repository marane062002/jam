import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { CarteCarbucarteService } from "../service/carte-carbucarte.service";
import { ICarteCarbucarte, CarteCarbucarte } from "../../../common/models/carte-carbucarte.model";

@Injectable({ providedIn: "root" })
export class CarteCarbucarteRoutingResolveService
  implements Resolve<ICarteCarbucarte>
{
  constructor(
    protected service: CarteCarbucarteService,
    protected router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ICarteCarbucarte> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((carteCarbucarte: HttpResponse<CarteCarbucarte>) => {
          if (carteCarbucarte.body) {
            return of(carteCarbucarte.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new CarteCarbucarte());
  }
}
