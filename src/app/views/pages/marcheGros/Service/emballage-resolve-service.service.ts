import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Emballage, IEmballage } from '../../../../core/_base/layout/models/emballage';
import { EmballageService } from './emballage.service';

@Injectable({
  providedIn: 'root'
})
export class EmballageResolveServiceService  implements Resolve<IEmballage>{
	constructor(protected emballageservice: EmballageService, protected router: Router) {}

	resolve(route: ActivatedRouteSnapshot): Observable<IEmballage> | Observable<never> {
	  const id = route.params['id'];
	  if (id) {
		return this.emballageservice.getById(id).pipe(
		  mergeMap((produit: HttpResponse<Emballage>) => {
			if (produit != undefined && produit.body) {
			  return of(produit.body);
			} else {
			  this.router.navigate(['404']);
			  return EMPTY;
			}
		  })
		);
	  }
	  return of(new Emballage());
	}
}
