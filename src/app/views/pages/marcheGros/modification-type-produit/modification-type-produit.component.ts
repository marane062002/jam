
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Produit ,IProduit} from '../../../../core/_base/layout/models/produit';
import Swal from 'sweetalert2';
import { Emballage } from '../../../../core/_base/layout/models/emballage';
import { TypeProduit } from '../../../../core/_base/layout/models/type-produit';
import { ProduitService } from '../Service/produit.service';
import { TypeServiceService } from '../Service/type-service.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { User, currentUser } from '../../../../core/auth';
import { HistoriqueProduit } from '../../../../core/_base/layout/models/historique-produit';
@Component({
	selector: 'kt-modification-type-produit',
	templateUrl: './modification-type-produit.component.html',
	styleUrls: ['./modification-type-produit.component.scss']
  })
  export class ModificationTypeProduitComponent implements OnInit {
	Type: TypeProduit
Produit:any
	type:TypeProduit[]
emballages:Emballage[]
	ProduitForm=this.fb.group({
		refProduit:new FormControl('' , [Validators.required] ),
		lib:new FormControl('' , [Validators.required] ),
		tarif:new FormControl('' , [Validators.required] ),
		description:new FormControl('' , [Validators.required] ),

		typeProduit: new FormGroup({
		  id: new FormControl('', Validators.required),
		}),


	   });
	   showButton: boolean = false;
	   user$: Observable<User>;
	   createurUser
  constructor(private store: Store<AppState>,private fb: FormBuilder,private router: Router, protected produitService: ProduitService,protected typeService: TypeServiceService,protected activatedRoute: ActivatedRoute,private translate: TranslateService) {
	 
	this.user$ = this.store.pipe(select(currentUser));}
	 public filteredBanks: Observable<TypeProduit[]> = new Observable<TypeProduit[]>();
	 private _filter(value: string): TypeProduit[] {
		const filterValue = value.toLowerCase();
		let list: TypeProduit[] = this.type.filter(
			(option) =>
				option.nomArticleProduit.toLowerCase().indexOf(filterValue) > -1
		);
		this.showButton = list.length === 0;
		return list;
	 }

  ngOnInit() {
	this.user$ = this.store.pipe(select(currentUser));
    this.user$.subscribe((user: User) => {
      this.createurUser=user.fullname

      
    })
	this.activatedRoute.data.subscribe(({ produit }) => {
		this.ProduitForm.patchValue({...produit})
		console.log('produit',produit);
this.Produit=produit
		this.Type=new TypeProduit(produit.typeProduit.numArticleProduit,produit.typeProduit.nomArticleProduit,produit.typeProduit.categorieProduit,produit.typeProduit.id);
		console.log('Cat',this.Type);

		console.log(this.ProduitForm.value);

	  });

	  this.typeService.query().subscribe((res:any)=>{
		console.log("les type==========>",res.body);
	   this.type=res.body
	   let cat=this.ProduitForm.get("typeProduit")
	   this.filteredBanks = cat.get("id").valueChanges.pipe(
		   startWith(""),
		   map((value) => this._filter(value || ""))
	   );
   })

  }
  Retour(){
	this.router.navigate(['marcheGros/list-type-produit']);

  }

  onSelectionChange(event:any){
	console.log("event.target type", event.option.value);
	if (event.option.value) {
		let selectedTypeV = this.type.filter(
			(item) => item.id == event.option.value
		);
		// this.Cat.id = event;
		this.Type= selectedTypeV[0];
		// this.Cat.refCategori = selectedTypeV[0].refCategori;

		console.log("cat=====>",this.Type);
		this.ProduitForm.get('typeProduit').setValue(this.Type)
		// console.log("selected vehicule", this.PeseeForm.value);
	}
  }
  Modifier(){
		let Produit={
			 id:this.Produit.id,
			refProduit : this.ProduitForm.get("refProduit").value,
			lib: this.ProduitForm.get("lib").value,
			tarif: this.ProduitForm.get("tarif").value,
			description: this.ProduitForm.get("description").value,
			typeProduit:this.Type

		}
		let historiqueProduit:HistoriqueProduit={
			produit:Produit,
			createurUser:this.createurUser,
			refProduit:Produit.refProduit,
			lib:Produit.lib,
			tarif:Produit.tarif,
			description:Produit.description,
			typeProduit:Produit.typeProduit
	  
		  }
    console.log("=======================================================>");

    const produit = this.createFromForm();
    if (produit!== undefined) {
      console.log("=================>",this.ProduitForm.value);
      this.produitService.createHistogrammeProduit(historiqueProduit).subscribe(res => {
        console.log("res ==> ",res.body)
        Swal.fire({
					position: "center",
					icon: "success",
					title: this.translate.instant(
						"PAGES.GENERAL.MSG_UPDATE_CONFIRMED"
					),
					showConfirmButton: false,
					timer: 1500,
				}).then((result) => {
            // this.router.navigate(['marcheGors/list-type-produit']);
          })
		  this.router.navigate(['marcheGros/list-type-produit']);
    },error => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: this.translate.instant(
          "PAGES.GENERAL.MSG_UPDATE_NOCONFIRMED"
        ),
        showConfirmButton: false,
        timer: 1500,
      });
        console.log("error ===> ",error)
    });
  }


  }
  protected createFromForm(): IProduit {
    return {
      ...new Produit(),
      refProduit: this.ProduitForm.get(['refProduit'])!.value,
      lib: this.ProduitForm.get(['lib'])!.value,
      tarif: this.ProduitForm.get(['tarif'])!.value,
      description: this.ProduitForm.get(['description'])!.value,
      typeProduit: this.ProduitForm.get(['typeProduit']).get("id")!.value,
      }
    };
	getvehicule(id:number){
		return this.type.find(cat => cat.id === id).nomArticleProduit;
	}

}
