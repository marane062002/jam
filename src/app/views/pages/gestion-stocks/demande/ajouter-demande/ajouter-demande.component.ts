import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from '../../../../../core/_base/layout/models/article';
import { ArticleStock } from '../../../../../core/_base/layout/models/article-stock';
import { DemandeFournitureDTO } from '../../../../../core/_base/layout/models/DemandeFournitureDTO';
import { MAgasin } from '../../../../../core/_base/layout/models/magasin';
import { SaveArticleWithQTE } from '../../../../../core/_base/layout/models/SaveArticleWithQTEDTO';
import { SaveDemandeFournitureDTO } from '../../../../../core/_base/layout/models/SaveDemandeFournitureDTO';
import { ArticleStockService } from '../../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { DemandeFournitureService, DemandeFournitureStringResponse } from '../../../../../core/_base/layout/services/gestionStock/demande-fourniture.service';
//import { MagasinService } from '../../../../../core/_base/layout/services/gestionStock/magasin.service';
import { MagasinService } from '../../../../../core/_base/layout/services/gestionStock/magasin.service';

import Swal from 'sweetalert2';
import { AppState } from '../../../../../core/reducers';
import { select, Store } from '@ngrx/store';
import { currentUser, User } from '../../../../../core/auth';
import { Observable } from 'rxjs';
import { PersonnelService } from '../../../rh/services/personnel.service';

@Component({
  selector: 'app-ajouter-demande',
  templateUrl: './ajouter-demande.component.html',
  styleUrls: ['./ajouter-demande.component.scss']
})
export class AjouterDemandeComponent implements OnInit {
  user : Observable<User>;
  idFonctionniare=0;
demandeFournitureFormGroup : FormGroup;
magazinListDTO : MAgasin[] = [];
articleStockListDTO : ArticleStock[] = [];
articleStockMaps:Article []=[];
saveArticleWithQTEList  :  SaveArticleWithQTE[] = [];
isLogistique : boolean =  false ;
isChefService : boolean =  false ;
isEmpty : boolean =  false ;
dropdownSettings: any;
quanitemin=0;

  constructor(
    private router : Router ,
   // private localStorege: LocalStorageService,
    private magazinService : MagasinService,
    private articleStockeService : ArticleStockService,
    private demandeFournitureService : DemandeFournitureService,
    private fb : FormBuilder,
    private personnelService: PersonnelService ,
    private store: Store<AppState>,
    private dc :ChangeDetectorRef
  ) { 
this.demandeFournitureFormGroup = this.fb.group({
  numeroDemande : [{value : "" , disabled : false} , [Validators.required]],
  codeAnalytique : [{value : "" , disabled : false} , [Validators.required]],
  magazin : [{value : "" , disabled : this.isEmpty} , ],
  source : [{value : ""} , ],
  code : [{value : ""} , ],
  article : [{value : "" , disabled : false} ],
  unite : [{value : "" , disabled : true} ],
  qteDemande : [{value : "" , disabled : false} ],
  designation : [{value : "" , disabled : true}],
  Observation:[""]

  
})
this.user=  this.store.pipe(select(currentUser));

  }

  get rticleStockArray() : FormArray {
    return this.demandeFournitureFormGroup.get("articleStockArray") as FormArray
  }

 
newArticle(): FormGroup {
   return this.fb.group({
     article: new FormGroup({
      id: new FormControl('',Validators.required),
     }),
     demandeFourniture: new FormGroup({
      id: new FormControl('',Validators.required),
     }),
     magasin:new FormGroup({
      id: new FormControl('',Validators.required),
     }),
     quantiteDemande:'',
     quantiteLivre:''
   })


}
  ngOnInit() {

    this.user.subscribe(res=>{
      this.idFonctionniare=res.id;
    })
    this.loadAllMagazin();
    //this.verifyRole();
    this.demandeFournitureService.getCountDemandeFourniture().subscribe(res=>{
      let  d=new Date();
      //this.demandeFournitureFormGroup.controls['numeroDemande'].setValue(res +"/" +d.getFullYear().toString())
    },err=>{
      console.log(err)
    })
    
  }

  onchangeLoadArticleByMagazin(event:any) : void {
    console.log(event.value.id)
   /*  this.demandeFournitureFormGroup.patchValue({
      article: null,
      unite : "",
      designation :  ""
    }) */
 this.articleStockeService.AllArticleStockByMagasin(event.value.id).subscribe((res) => {
   this.articleStockListDTO = res ;
   this.articleStockMaps=this.articleStockListDTO.map(e=>e.article)
   console.log(this.articleStockMaps);
 })
  }
  checkQuanititeMin(event:any){
  console.log(event.target.value);
  if(this.quanitemin!=0 && this.quanitemin<event.target.value){   
Swal.fire(
  ' ',
  'Quantité disponible sur le stock est :'+ this.quanitemin,
  'warning'
)
    this.demandeFournitureFormGroup.controls['qteDemande'].setValue(this.quanitemin);
  }
  
  }
  selectedArticleDropDown:any[];
  onchangeLoadArticle(event:any) : void {
    console.log(event)
/*      this.articleStockListDTO.forEach(article => {
       if(article.article.numeroArticle == event.target.value) {
        this.demandeFournitureFormGroup.controls['article'].setValue(article.article.id);
         console.log(article)
         this.selectedArticleDropDown=[];
         this.quanitemin=article.quantiteStock;
         this.demandeFournitureFormGroup.patchValue({
          unite : article.article.unite ,
          designation : article.article.designation 
         })
       }
     }) */
  }
  
  onChangeSearch(search: string) {
    console.log(search)
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(ee:any) {
    console.log(ee)
    this.articleStockMaps=this.articleStockListDTO.map(e=>e.article)
    console.log(this.articleStockMaps);
    // do something
  }

  loadAllMagazin() : void {
    this.magazinService.all().subscribe((res) => {
      this.magazinListDTO = res ;
      
    })
  }

  verifyRole() : void {

    this.demandeFournitureFormGroup.controls['source'].setValue(1);
    // this.demandeFournitureFormGroup.controls['code'].setValue("2");
     this.demandeFournitureFormGroup.controls['code'].setValue("8");
  }

  ajouterArticle() : void {
    this.articleStockListDTO.forEach(article => {
      console.log(article.article.id == this.demandeFournitureFormGroup.get('article').value.id)
      if(article.article.id == this.demandeFournitureFormGroup.get('article').value.id) {
         let saveArticle : SaveArticleWithQTE = {
           articleDTO :  this.demandeFournitureFormGroup.get('article').value,
           magasin:article.magasin,
           qteDemandee : parseInt(this.demandeFournitureFormGroup.get('qteDemande').value),
           qteLivree : 0,
         }
         this.saveArticleWithQTEList.push(saveArticle)
         this.demandeFournitureFormGroup.patchValue({
          
          article: null,
          unite : "",
          designation :  "",
          qteDemande :""
         })
         if(this.saveArticleWithQTEList.length >=1 ){
           console.log("here lenght")
           this.demandeFournitureFormGroup.controls['magazin'].disable()
           this.dc.detectChanges();
         }
      }
    })
    console.log(this.saveArticleWithQTEList)
  }

  supprimerArticle(index : any) : void {
     this.saveArticleWithQTEList.splice(index ,1);
     if(this.saveArticleWithQTEList.length ==0 ){
      this.demandeFournitureFormGroup.controls['magazin'].enable()
      this.dc.detectChanges();
    }
  }

  ajouterDemande() : void {
     let demandeFourniture : DemandeFournitureDTO = {
      numeroDemande : this.demandeFournitureFormGroup.get('numeroDemande').value ,
      codeAnalytique : this.demandeFournitureFormGroup.get('codeAnalytique').value ,
      source : 1,
       code: "1",
      idFonctionnaire : this.idFonctionniare,
     }
     let saveDemandeFourniture : SaveDemandeFournitureDTO = {
       demandeFournitureDTO : demandeFourniture ,
       saveArticleWithQTE : this.saveArticleWithQTEList
     }
     this.demandeFournitureService.saveDemandeFourniture(saveDemandeFourniture).subscribe((res : DemandeFournitureStringResponse) => {
       this.modelAjout();
     })
  }

  modelAjout()  :  void{
    Swal.fire({
      title: 'Demande fourniture est ajouté avec succès !',
      icon: 'success',
    }).then(result => {
      this.router.navigate(["/home/gestion-stocks/valider-demande"]) ;
    });
  }

  changeInputSelect(event:any){
    console.log(event)

    this.articleStockMaps.filter(e=>e.numeroArticle.includes(event) ||e.designation.includes(event) )
  }
  focusInputSelect(event:any){
    console.log(event)
   //document.getElementById('demoInput').nodeValue=null;
   // demoInput.value='';
   // this.articleStockMaps.filter(e=>e.numeroArticle.includes(event) ||e.designation.includes(event) )
  }
}
