import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {Sdl, ISdl} from '../../models/sdl/sdl.model';
import {SdlService} from './sdl.service';

@Injectable({
	providedIn: 'root',
})
export class SdlRoutingResolveService {
	constructor(protected service: SdlService, protected router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<ISdl> | Observable<never> {
		const id = route.params['id'];

		// if (id) {
		// 	return this.service.find(id).pipe(
		// 		mergeMap((expert: HttpResponse<ISdl>) => {
		// 			if (expert != undefined && expert.body) {
		// 				return of(expert.body);
		// 			} else {
		// 				this.router.navigate(['404']);
		// 				return EMPTY;
		// 			}
		// 		})
		// 	);
		// }
		return of(new Sdl());
	}
}
