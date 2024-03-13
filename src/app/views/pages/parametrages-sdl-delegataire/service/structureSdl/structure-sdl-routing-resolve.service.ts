import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {StructureSdl, IStructureSdl} from '../../models/structureSdl/structureSdl.model';
import {StructureSdlService} from './structure-sdl.service';

@Injectable({
	providedIn: 'root',
})
export class StructureSdlRoutingResolveService {
	constructor(protected service: StructureSdlService, protected router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<IStructureSdl> | Observable<never> {
		const id = route.params['id'];

		// if (id) {
		// 	return this.service.find(id).pipe(
		// 		mergeMap((expert: HttpResponse<IStructureSdl>) => {
		// 			if (expert != undefined && expert.body) {
		// 				return of(expert.body);
		// 			} else {
		// 				this.router.navigate(['404']);
		// 				return EMPTY;
		// 			}
		// 		})
		// 	);
		// }
		return of(new StructureSdl());
	}
}
