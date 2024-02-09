import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { GaragisteService } from "../service/garagiste.service";
import { IGaragiste, Garagiste } from "../../../common/models/garagiste.model";

@Injectable({ providedIn: "root" })
export class GaragisteRoutingResolveService implements Resolve<IGaragiste> {
  constructor(protected service: GaragisteService, protected router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IGaragiste> | Observable<never> {
    const id = route.params["id"];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((garagiste: HttpResponse<Garagiste>) => {
          if (garagiste.body) {
            return of(garagiste.body);
          } else {
            this.router.navigate(["404"]);
            return EMPTY;
          }
        })
      );
    }
    return of(new Garagiste());
  }
}
