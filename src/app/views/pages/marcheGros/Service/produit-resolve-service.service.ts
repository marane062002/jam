import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IProduit, Produit } from '../../../../core/_base/layout/models/produit';
import { ProduitService } from './produit.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitResolveServiceService implements Resolve<IProduit>{
	constructor(protected produitservice: ProduitService, protected router: Router) {}

	resolve(route: ActivatedRouteSnapshot): Observable<IProduit> | Observable<never> {
	  const id = route.params['id'];
	  if (id) {
		return this.produitservice.getById(id).pipe(
		  mergeMap((produit: HttpResponse<Produit>) => {
			if (produit != undefined && produit.body) {
			  return of(produit.body);
			} else {
			  this.router.navigate(['404']);
			  return EMPTY;
			}
		  })
		);
	  }
	  return of(new Produit());
	}
}
