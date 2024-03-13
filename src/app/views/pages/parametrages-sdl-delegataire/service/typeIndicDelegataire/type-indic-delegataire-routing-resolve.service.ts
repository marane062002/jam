import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {TypeIndicDelegataire, ITypeIndicDelegataire} from '../../models/typeIndicDelegataire/typeIndicDelegataire.model';
import {TypeIndicDelegataireService} from './type-indic-delegataire.service';

@Injectable({
    providedIn: 'root',
})
export class TypeIndicDelegataireRoutingResolveService {
	constructor(protected service: TypeIndicDelegataireService, protected router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<ITypeIndicDelegataire> | Observable<never> {
		const id = route.params['id'];

		// if (id) {
		// 	return this.service.find(id).pipe(
		// 		mergeMap((expert: HttpResponse<ITypeIndicDelegataire>) => {
		// 			if (expert != undefined && expert.body) {
		// 				return of(expert.body);
		// 			} else {
		// 				this.router.navigate(['404']);
		// 				return EMPTY;
		// 			}
		// 		})
		// 	);
		// }
		return of(new TypeIndicDelegataire());
	}
}
