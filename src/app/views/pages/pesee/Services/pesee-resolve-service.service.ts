import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IPesee, Pesee } from '../../../../core/_base/layout/models/pesee';
import { PeseeService } from './pesee.service';

@Injectable({
  providedIn: 'root'
})
export class PeseeResolveServiceService  implements Resolve<IPesee> {
	constructor(protected peseeservice: PeseeService, protected router: Router) {}

	resolve(route: ActivatedRouteSnapshot): Observable<IPesee> | Observable<never> {
	  const id = route.params['id'];
	  if (id) {
		return this.peseeservice.getById(id).pipe(
		  mergeMap((vehicule: HttpResponse<Pesee>) => {
			if (vehicule != undefined && vehicule.body) {
			  return of(vehicule.body);
			} else {
			  this.router.navigate(['404']);
			  return EMPTY;
			}
		  })
		);
	  }
	  return of(new Pesee());
	}
}
