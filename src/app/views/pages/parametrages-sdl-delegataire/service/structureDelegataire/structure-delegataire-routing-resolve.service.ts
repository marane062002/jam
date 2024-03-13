import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {StructureDelegataire, IStructureDelegataire} from '../../models/structureDelegataire/structureDelegataire.model';
import {StructureDelegataireService} from './structure-delegataire.service';

@Injectable({
    providedIn: 'root',
})
export class StructureDelegataireRoutingResolveService {
	constructor(protected service: StructureDelegataireService, protected router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<IStructureDelegataire> | Observable<never> {
		const id = route.params['id'];

		if (id) {
			// return this.service.find(id).pipe(
			// 	mergeMap((expert: HttpResponse<IStructureDelegataire>) => {
			// 		if (expert != undefined && expert.body) {
			// 			return of(expert.body);
			// 		} else {
			// 			this.router.navigate(['404']);
			// 			return EMPTY;
			// 		}
			// 	})
			// );
		}
		return of(new StructureDelegataire());
	}
}
