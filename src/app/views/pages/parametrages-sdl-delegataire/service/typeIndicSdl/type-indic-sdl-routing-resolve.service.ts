import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {TypeIndicSdl, ITypeIndicSdl} from '../../models/typeIndicSdl/typeIndicSdl.model';
import {TypeIndicSdlService} from './type-indic-sdl.service';

@Injectable({
	providedIn: 'root',
})
export class TypeIndicSdlRoutingResolveService {
	constructor(protected service: TypeIndicSdlService, protected router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<ITypeIndicSdl> | Observable<never> {
		const id = route.params['id'];

		// if (id) {
		// 	return this.service.find(id).pipe(
		// 		mergeMap((expert: HttpResponse<ITypeIndicSdl>) => {
		// 			if (expert != undefined && expert.body) {
		// 				return of(expert.body);
		// 			} else {
		// 				this.router.navigate(['404']);
		// 				return EMPTY;
		// 			}
		// 		})
		// 	);
		// }
		return of(new TypeIndicSdl());
	}
}



// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TypeIndicSdlRoutingResolveService {
//
//   constructor() { }
// }
