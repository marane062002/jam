import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {Delegataire, IDelegataire} from '../../models/delegataire/delegataire.model';
import {DelegataireService} from './delegataire.service';

@Injectable({
    providedIn: 'root',
})
export class DelegataireRoutingResolveService {
    constructor(protected service: DelegataireService, protected router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<IDelegataire> | Observable<never> {
        const id = route.params['id'];

        if (id) {
            // return this.service.find(id).pipe(
            //     mergeMap((expert: HttpResponse<IDelegataire>) => {
            //         if (expert != undefined && expert.body) {
            //             return of(expert.body);
            //         } else {
            //             this.router.navigate(['404']);
            //             return EMPTY;
            //         }
            //     })
            // );
        }
        return of(new Delegataire());
    }
}
