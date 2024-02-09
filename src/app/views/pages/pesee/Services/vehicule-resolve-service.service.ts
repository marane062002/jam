import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IVehicule, Vehicule } from '../../../../core/_base/layout/models/vehicule';
import { VehiculeService } from './vehicule.service';

@Injectable({
  providedIn: 'root'
})
export class VehiculeResolveServiceService  implements Resolve<IVehicule> {
	constructor(protected vehiculeservice: VehiculeService, protected router: Router) {}

	resolve(route: ActivatedRouteSnapshot): Observable<IVehicule> | Observable<never> {
	  const id = route.params['id'];
	  if (id) {
		return this.vehiculeservice.getById(id).pipe(
		  mergeMap((vehicule: HttpResponse<Vehicule>) => {
			if (vehicule != undefined && vehicule.body) {
			  return of(vehicule.body);
			} else {
			  this.router.navigate(['404']);
			  return EMPTY;
			}
		  })
		);
	  }
	  return of(new Vehicule());
	}
}
