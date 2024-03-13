import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import {SuiviSdl, ISuiviSdl} from '../../models/sdl/tab-sdl.model';
import {TabSdlService} from './tab-sdl.service';

@Injectable({
	providedIn: 'root',
})
export class TabSdlRoutingResolveService {
	constructor(protected service: TabSdlService, protected router: Router) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<ISuiviSdl> | Observable<never> {
		const id = route.params['id'];

		if (id) {
			// return this.service.find(id).pipe(
			// 	mergeMap((expert: HttpResponse<ISuiviSdl>) => {
			// 		if (expert != undefined && expert.body) {
			// 			return of(expert.body);
			// 		} else {
			// 			this.router.navigate(['404']);
			// 			return EMPTY;
			// 		}
			// 	})
			// );
		}
		return of(new SuiviSdl());
	}
}



// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TabSdlRoutingResolveService {
//
//   constructor() { }
// }
