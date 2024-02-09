import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { TypeProduit } from '../../../../core/_base/layout/models/type-produit';
import { CategorieProduit } from '../../../../core/_base/layout/models/categorie-produit';
import { CatService } from '../Service/cat-service.service';
import { ProduitService } from '../Service/produit.service';
// import { Produit } from '../../../../core/_base/layout/models/produit';
import { TypeServiceService } from '../Service/type-service.service';
import { EmballageService } from '../Service/emballage.service';
import { Emballage } from '../../../../core/_base/layout/models/emballage';
import { HistoriqueProduit } from '../../../../core/_base/layout/models/historique-produit';
import { Observable } from 'rxjs';
import { User, currentUser } from '../../../../core/auth';
import { Store,  select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
@Component({
  selector: 'kt-add-type-Produit',
  templateUrl: './add-type-Produit.component.html',
  styleUrls: ['./add-type-Produit.component.scss']
})
export class AddTypeProduitComponent implements OnInit {
  // Cat: CategorieProduit[]
  // produit:Produit[]
type:TypeProduit[]
emballages:Emballage[]
user$: Observable<User>;

  ProduitForm=new FormGroup({
    refProduit:new FormControl('' , [Validators.required] ),
    lib:new FormControl('' , [Validators.required] ),
    tarif:new FormControl('' , [Validators.required] ),
    description:new FormControl('' , [Validators.required] ),

    typeProduit: new FormGroup({
      id: new FormControl('', Validators.required),
    }),


   });
  constructor(private store: Store<AppState>,private router: Router,private prodService:ProduitService,private typeService:TypeServiceService,private embService:EmballageService) {
    this.user$ = this.store.pipe(select(currentUser));

	 }
createurUser
  ngOnInit() {
		this.user$ = this.store.pipe(select(currentUser));
    this.user$.subscribe((user: User) => {
      this.createurUser=user.fullname

      
    })
    
    this.typeService.query().subscribe({
      next:(res:HttpResponse<TypeProduit[]>)=>{
        this.type=res.body;
      },

      error:()=>{},
    })
    // this.embService.query().subscribe({
    //   next:(res:HttpResponse<Emballage[]>)=>{
    //     this.emballages=res.body;
    //   },

    //   error:()=>{},
    // })
  }
  Retour(): void {
	this.router.navigate(["marcheGros/list-type-produit"]);
}
Ajouter(){
  // this.prodService.createProduit(this.ProduitForm.value)
  // .subscribe(data =>  {
    let HistoriqueProduit:HistoriqueProduit={
      produit:this.ProduitForm.value,
      createurUser:this.createurUser,
      refProduit:this.ProduitForm.value.refProduit,
      lib:this.ProduitForm.value.lib,
      tarif:this.ProduitForm.value.tarif,
      description:this.ProduitForm.value.description,
      typeProduit:this.ProduitForm.value.typeProduit

    }
    
    this.prodService.createHistogrammeProduit(HistoriqueProduit).subscribe((data) =>{
      
      this.Retour()
    })
    console.log('data==============>',this.ProduitForm.value)
  // }, error => console.log(error));
//   this.router.navigate(["marcheGros/list-type-produit"]);

}
}
