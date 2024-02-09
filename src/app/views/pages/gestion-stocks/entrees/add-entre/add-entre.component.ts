import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Entree } from '../../../../../core/_base/layout/models/entree';
import { EntreeArticleStock } from '../../../../../core/_base/layout/models/entree-article-stock';
import { Fournisseur } from '../../../../../core/_base/layout/models/fournisseur';
import { EntreeStockService } from '../../../../../core/_base/layout/services/gestionStock/entree-stock.service';
import { ArticleService } from '../../../../../core/_base/layout/services/gestionStock/article.service';
import { FournisseursService } from '../../../../../core/_base/layout/services/gestionStock/fournisseurs.service';
import { ArticleStockService } from '../../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { RefernceService } from '../../../../../core/_base/layout/services/gestionStock/refernce.service';
import { MagasinService } from '../../../../../core/_base/layout/services/gestionStock/magasin.service';
import * as _  from 'lodash'
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'kt-add-entre',
  templateUrl: './add-entre.component.html',
  styleUrls: ['./add-entre.component.scss']
})
export class AddEntreComponent implements OnInit {
  formEntree: FormGroup;
  entree=new Entree();
  listMagasins:any[];
  listArticle:any[];
  saveArticleWithQTEList  :  EntreeArticleStock[] = [];
  formEntreeUpdate: FormGroup;
  articleDetail  :  EntreeArticleStock[] = [];
  listReference:any[]=[];
  entreeArticleUpdate:EntreeArticleStock[] = [];
  listFournisseur:Fournisseur[];
  entreArticle:EntreeArticleStock=new EntreeArticleStock();
  constructor(private fb:FormBuilder,
    private entreeStockService:EntreeStockService,
    private serviceFournisseur:FournisseursService,
    private router:Router,
    private ArticleService:ArticleService,
    private articleStockService:ArticleStockService,
    private refernceService:RefernceService,
    private dc :ChangeDetectorRef,
    private magasinService:MagasinService) { 
    this.formEntree= new FormGroup({
      rayonnage: new FormControl('',Validators.required),
      numMarche: new FormControl('',Validators.required),
      quantite: new FormControl('',Validators.required),
      tva: new FormControl('',Validators.required),
     // unite: new FormControl('',Validators.required),
     // designation: new FormControl('',Validators.required),
      prixAchat: new FormControl('',Validators.required),
      codeAnalytique:new FormControl('',Validators.required),
      date: new FormControl(''),
      magasin: new FormGroup({
       id: new FormControl('')
     }),
 /*     reference: new FormGroup({
       id: new FormControl('')
     }), */
     fournisseur: new FormGroup({
      id: new FormControl('')
    })
    
  })
  this.formEntreeUpdate=new FormGroup({
    entreeArticleSotck: new FormArray([])
 })
  }
  selectFournisseur(event:any){
    console.log(event);
    this.entree.fournisseur=event.value;
    this.formEntree.get('fournisseur').patchValue(event);
  
  
  }

  ngOnInit() {
    this.allFournisseur();
    this.allRefernce();
    this.allMagasins();
    this.allArticle();
  }
  allFournisseur(){
    this.serviceFournisseur.all().subscribe(res=>{
      console.log(res)
      this.listFournisseur=res;
    },err=>{
      console.log(err)
    })
  }
  allRefernce(){
    this.refernceService.all().subscribe((res:any[])=>{
      console.log(res)
      this.listReference=res;
    },err=>{
      console.log(err)
    })
  }
  allMagasins(){
    this.magasinService.all().subscribe(res=>{
      console.log(res)
      let data:any=res;
      this.listMagasins=data;
    },err=>{
      console.log(err)
    })
  }
  allArticle(){
    this.ArticleService.all1().subscribe(res=>{
      console.log(res)
      this.listArticle=res;
    },err=>{
      console.log(err)
    })
  }

selectArtilce(event:any){
  console.log(event);
  let id=event.value.id;

  this.ArticleService.getById(id).subscribe(res=>{
    console.log(res)
    let  data=res;
    this.entreArticle.article=_.cloneDeep(data);
   // this.formEntree.get("unite").setValue(data.unite);
    //this.formEntree.get("designation").setValue(data.designation);
    this.formEntree.get("prixAchat").setValue(data.prix);
    this.formEntree.get("date").setValue(new Date());
    console.log(res);
  },err=>{
    console.log(err);
  })

}
 /*  articleStockArray() : FormArray {
    return this.formEntreeUpdate.get("entreeArticleSotck") as FormArray
  } */
  newArticle() {
    let article= this.fb.group({
      id: new FormControl(),
      article: new FormGroup({
        id: new FormControl('',Validators.required),
      }),
      fournisseur: new FormGroup({
        id: new FormControl('')
      }),
      rayonnage: new FormControl('',Validators.required),
      quantite: new FormControl('',Validators.required),
      tva: new FormControl('',Validators.required),
      unite: new FormControl('',Validators.required),
      designation: new FormControl('',Validators.required),
      prixAchat: new FormControl('',Validators.required),
    })

    this.articleStockArray().push(article)

}
articleStockArray() : FormArray {
  return this.formEntreeUpdate.get("entreeArticleSotck") as FormArray
}
deleteArticle(index:number){
  this.articleStockArray().removeAt(index);
}
setEntreArticleStock(services:any[]): FormArray
  {
    const formArray = new FormArray([]);
    services.forEach(item => {
      console.log(item)
    let articlevalue=  { id: item.article.id, numeroArticle: item.article.numeroArticle}
      formArray.push(this.fb.group({
        id:item.id,
        article:new FormControl(articlevalue),
        rayonnage: item.rayonnage,
        quantite: item.quantite,
        tva: item.tva,
        unite: item.article.unite,
        designation: item.article.designation,
        prixAchat: item.prixAchat,
      }));
    });

    return formArray;
  }
  createEntree(value:any){
    console.log(value)

   if(this.formEntree.valid){
     this.entreArticle.entree=_.cloneDeep(value);
     this.entreArticle.quantite=_.cloneDeep(this.formEntree.get('quantite').value);
     this.entreArticle.rayonnage=_.cloneDeep(this.formEntree.get('rayonnage').value);
     this.entreArticle.tva=_.cloneDeep(this.formEntree.get('tva').value);
     this.entreArticle.prixAchat=_.cloneDeep(this.formEntree.get('prixAchat').value);
     this.saveArticleWithQTEList.push(_.cloneDeep(this.entreArticle));
     this.formEntree.patchValue({
      magasin:this.formEntree.controls['magasin'].value,
      codeAnalytique:this.formEntree.controls['codeAnalytique'].value,
      article: null,
      quantite : null,
      tva : null,
      rayonnage :  null,
      unite: "",
      designation:"",
      prixAchat:"",

     })
     console.log(this.saveArticleWithQTEList);
   this.formEntree.controls['magasin'].disable({ onlySelf: true });;
    this.formEntree.controls['reference'].disable({ onlySelf: true });;
      this.dc.detectChanges();

    }
}
createEntreeWithAtcle(){
  console.log(this.saveArticleWithQTEList)
  this.entreeStockService.saveArticlewithQte(this.saveArticleWithQTEList).subscribe(res=>{
   this.alert('success',"Gestion des Entrées ", "entrée  a été bien enregistré ");
   this.saveArticleWithQTEList=[];
   this.formEntree.reset();
   this.formEntree.controls['magasin'].enable()
   this.formEntree.controls['codeAnalytique'].enable();
   this.formEntree.controls['numMarche'].enable();
   this.formEntree.controls['reference'].enable();
  this.router.navigateByUrl("gestionStock/entrees-stock");
  },err=>{
   this.alert('error',"Gestion des Entrées", "Un problème de communication avec le serveur est survenu. Veuillez réessayer ultérieurement.");

  })
}
alert(icon:SweetAlertIcon, title:string, message:string){
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
  })
}
}
