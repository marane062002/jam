
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { ProduitService } from '../Service/produit.service';
import { TypeServiceService } from '../Service/type-service.service';
@Component({
	selector: 'kt-detail-type-produit',
	templateUrl: './detail-type-produit.component.html',
	styleUrls: ['./detail-type-produit.component.scss']
  })
  export class DetailTypeProduitComponent implements OnInit {

	   Produit:any

	   constructor(private router: Router, protected produitService: ProduitService,protected typeService: TypeServiceService,protected activatedRoute: ActivatedRoute,private translate: TranslateService) {
	}
	historiqueProduit=false
	histoProduitList
  ngOnInit() {
	this.activatedRoute.data.subscribe(({ detailProduit }) => {
		// this.ProduitForm.patchValue({...detailProduit})
		console.log('produit',detailProduit);
		this.Produit=detailProduit
this.produitService.findByProduit_Id(this.Produit.id).subscribe((res)=>{
	this.histoProduitList=res.body
	
	if(res.body.length!=0){
this.historiqueProduit=true
	}
})

	});
  }
  RetourFichier(): void {
	this.router.navigate(["marcheGros/list-type-produit"]);
}

}
