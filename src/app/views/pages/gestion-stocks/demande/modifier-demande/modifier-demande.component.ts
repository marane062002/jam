import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { forkJoin, throwError } from 'rxjs';
import { Article } from '../../../../../core/_base/layout/models/article';
import { ArticleStock } from '../../../../../core/_base/layout/models/article-stock';
import { DemandeFournitureDTO } from '../../../../../core/_base/layout/models/DemandeFournitureDTO';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { LigneDemandeFournistureDTO } from '../../../../../core/_base/layout/models/LigneDemandeFournistureDTO';
import { MAgasin } from '../../../../../core/_base/layout/models/magasin';
import { SaveArticleWithQTE } from '../../../../../core/_base/layout/models/SaveArticleWithQTEDTO';
import { ArticleStockService } from '../../../../../core/_base/layout/services/gestionStock/article-stock.service';
import { DemandeFournitureService, DemandeFournitureStringResponse } from '../../../../../core/_base/layout/services/gestionStock/demande-fourniture.service';
import { LigneDemandeFournitureService } from '../../../../../core/_base/layout/services/gestionStock/ligne-demande-fourniture.service';
import { MagasinService } from '../../../../../core/_base/layout/services/gestionStock/magasin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-demande',
  templateUrl: './modifier-demande.component.html',
  styleUrls: ['./modifier-demande.component.scss']
})
export class ModifierDemandeComponent implements OnInit {

  fonctionnaire : FonctionnaireDTO = this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  demandeFournitureFormGroup : FormGroup;
  magazinListDTO : MAgasin[] = [];
  articleStockListDTO : ArticleStock[] = [];
  articleStockMaps:Article []=[];
  currentMagasin:number=0;
  saveArticleWithQTEList  :  SaveArticleWithQTE[] = [];
  isLogistique : boolean =  false ;
  isChefService : boolean =  false ;
  isEmpty : boolean =  false ;
  public data :any[]=[];
  dropdownSettings:any;
  selectedItems :any[]= [];
  quanitemin=0;
    constructor(
      private router : Router ,
      private localStorege: LocalStorageService,
      private magazinService : MagasinService,
      private articleStockeService : ArticleStockService,
      private demandeFournitureService : DemandeFournitureService,
      private activatedRoute : ActivatedRoute,
      private lignDemandeFournitureService  : LigneDemandeFournitureService,
      private fb : FormBuilder,
      private dc :ChangeDetectorRef
    ) { 
  this.demandeFournitureFormGroup = this.fb.group({
    numeroDemande : [{value : "" , disabled : false} , [Validators.required]],
    codeAnalytique : [{value : "" , disabled : false} , [Validators.required]],
    source : [{value : ""} , ],
    code : [{value : ""} , ],
   /*  magazin : [{value : "" , disabled : this.isEmpty} , ],
    article : [{value : "" , disabled : false} ],
    unite : [{value : "" , disabled : true} ],
    qteDemande : [{value : "" , disabled : false} ],
    designation : [{value : "" , disabled : true}], */
    articleStockArray:this.fb.array([])
  })
    }
    ngOnInit() {
      this.selectedItems = [
        { item_id: 1, item_text: 'toner' }
      ];
      this.dropdownSettings = {
        singleSelection: true,
        idField: "id",
        textField: 'designation',
        selectAllText: "Tout sélectionner ",
        unSelectAllText: "Tout déselectionner ",
        itemsShowLimit: 10,
        allowSearchFilter: true,
    };
    this.activatedRoute.queryParams.subscribe(params => {
      this.idDemandeFournitureDTO = params["idDemandeFourniture"];
      if(this.idDemandeFournitureDTO ==0) {
        this.router.navigateByUrl("/home");
      }else{
        this.loadDemandeFournitureDetails(this.idDemandeFournitureDTO);
      }
    })
  
      this.loadAllMagazin();
      this.verifyRole();
      this.demandeFournitureService.getCountDemandeFourniture().subscribe(res=>{
        let  d=new Date();
        this.demandeFournitureFormGroup.controls['numeroDemande'].setValue(res +"/" +d.getFullYear().toString())
      },err=>{
        console.log(err)
      })
      this.demandeFournitureFormGroup.controls['codeAnalytique'].setValue(this.fonctionnaire.codeAnalytique)
    //  this.demandeFournitureFormGroup.controls['codeAnalytique'].disable();
    }
     articleStockArray() : FormArray {
      return this.demandeFournitureFormGroup.get("articleStockArray") as FormArray
    }
    
  
  
   
    newArticle() {
      let article= this.fb.group({
        article: new FormGroup({
          id: new FormControl('',Validators.required),
        }),
        demandeFourniture: new FormGroup({
          id: new FormControl(this.idDemandeFournitureDTO,Validators.required),
        }),
        magasin:new FormGroup({
          id:new FormControl ({value: this.currentMagasin, disabled: false}),
         // id: new FormControl(this.currentMagasin,Validators.required),
        }),
        quantiteDemande:'',
        quantiteLivre:''
      })
      
      this.articleStockArray().push(article)
  
  }
  deleteArticle(index:number){
    this.articleStockArray().removeAt(index);
  }
  
    onchangeLoadArticleByMagazin(id :any) : void {
      this.demandeFournitureFormGroup.patchValue({
        article: null,
        unite : "",
        designation :  ""
      })
      console.log()
      this.articleStockeService.AllArticleStockByMagasin(id).subscribe((res) => {
     this.articleStockListDTO = res;
     this.articleStockMaps=this.articleStockListDTO.map(e=>e.article);

     this.articleStockMaps.sort((a, b) => a.designation.localeCompare(b.designation));
     console.log(this.articleStockMaps);
   })
    }
    checkQuanititeMin(event:any, index:number){
    console.log(event.target.value);
    console.log(this.quanitemin);
    if(this.quanitemin!=0 && this.quanitemin<event.target.value){
     
  Swal.fire( ' ', 'Quantité disponible sur le stock est :'+ this.quanitemin, 'warning' );
  this.articleStockArray().at(index).patchValue({quantiteDemande:this.quanitemin})
   //   this.demandeFournitureFormGroup.controls['quantiteDemande'].setValue(this.quanitemin);
    }
    
    }
    selectedArticleDropDown:any[];
    onchangeLoadArticle(event:any, index:number) : void {
      console.log(event)
       this.articleStockListDTO.forEach(article => {
         if(article.article.numeroArticle == event.target.value) {
          this.articleStockArray().at(index).get("article").patchValue(article.article);
           console.log(article)
           this.selectedArticleDropDown=[];
           this.quanitemin=article.quantiteStock;
           this.demandeFournitureFormGroup.patchValue({
            unite : article.article.unite ,
            designation : article.article.designation 
           })
         }
       })
    }
  
    loadAllMagazin() : void {
      this.magazinService.all().subscribe((res) => {
        this.magazinListDTO = res ;
        
      })
    }
  
    verifyRole() : void {
      console.log(this.fonctionnaire.role.libelle)
      switch(this.fonctionnaire.role.libelle) {
        case 'Chef Division' : {
          console.log("Chef Devision")
      //   this.demandeFournitureFormGroup.addControl('qteLivre' , this.fb.control({value :"" , disabled: false}, [Validators.required] ))  
         this.isChefService = true;
         this.demandeFournitureFormGroup.controls['source'].setValue(2);
         this.demandeFournitureFormGroup.controls['code'].setValue("8");
          break ;
        }
        case 'Chef Logistique' : {
        this.demandeFournitureFormGroup.addControl('observation' , this.fb.control({value :"" , disabled: false}, [Validators.required] )) 
      //  this.demandeFournitureFormGroup.addControl('qteLivre' , this.fb.control({value :"" , disabled: false}, [Validators.required] ))  
         this.isLogistique = true;
         this.demandeFournitureFormGroup.controls['source'].setValue(2);
         this.demandeFournitureFormGroup.controls['code'].setValue("8");
          break ;
          }
        case 'Chef Finance' : {
          this.demandeFournitureFormGroup.controls['source'].setValue(2);
          this.demandeFournitureFormGroup.controls['code'].setValue("8");
          break ;
        }
        case 'Chef Service' : {
          this.demandeFournitureFormGroup.controls['source'].setValue(1);
          this.demandeFournitureFormGroup.controls['code'].setValue("8");
          break ;
        }
        default:{
          this.demandeFournitureFormGroup.controls['source'].setValue(1);
          this.demandeFournitureFormGroup.controls['code'].setValue("8");
        }
      }
    }
  
    ajouterArticle() : void {
      this.articleStockListDTO.forEach(article => {
        if(article.article.id == this.demandeFournitureFormGroup.get('article').value) {
           let saveArticle : SaveArticleWithQTE = {
             articleDTO :  article.article ,
             magasin:article.magasin,
             qteDemandee : parseInt(this.demandeFournitureFormGroup.get('qteDemande').value ),
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
             this.demandeFournitureFormGroup.controls['magasin'].disable()
             this.dc.detectChanges();
           }
        }
      })
    }
  
    supprimerArticle(index : any) : void {
       this.saveArticleWithQTEList.splice(index ,1);
       if(this.saveArticleWithQTEList.length ==0 ){
        this.demandeFournitureFormGroup.controls['magasin'].enable()
        this.dc.detectChanges();
      }
    }
  
    modiferDemande() : void {
       console.log(this.demandeFournitureFormGroup.get("articleStockArray").value)
        this.lignDemandeFournitureService.updateLingeDemandeFourniture(this.demandeFournitureFormGroup.get("articleStockArray").value).subscribe((res : DemandeFournitureStringResponse) => {
         this.modelAjout();
       }) 
    }
  
    modelAjout()  :  void{
      Swal.fire({
        title: 'Demande fourniture est modifié  avec succès !',
        icon: 'success',
      }).then(result => {
        this.router.navigate(["/home/gestion-stocks/valider-demande"]) ;
      });
    }


    page : any = 1 ;
pageSize : any = 5 ;

  demandeFournitureDTO   : DemandeFournitureDTO = {} ;
  lisgneDemandeFournitureListDto : LigneDemandeFournistureDTO[] = [] ;
  idDemandeFournitureDTO : any = 0;

 
    
  telechargeDoucument(id:any){
    this.demandeFournitureService.getBonById(id);
  }
  compareMAgasinWith(item:any, selected:any) {
    console.log(item)
    console.log(selected)
    return true
  }
  compareWith(item:any, selected:any) {
    console.log(item)
    console.log(selected)
    return item.id===selected.id
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

  loadDemandeFournitureDetails(idDemandeFournitureDTO : any) : void {
 try {
   forkJoin({demandeFourniture : this.demandeFournitureService.getAllDemandeFournitureByid(idDemandeFournitureDTO) ,
             ligneDemandeFourniture : this.lignDemandeFournitureService.getLigneDemandeFournitureByIdDemande(idDemandeFournitureDTO)
  }).subscribe(({demandeFourniture , ligneDemandeFourniture}) => {
    console.log(demandeFourniture)
     this.demandeFournitureDTO = demandeFourniture.body ;
     this.lisgneDemandeFournitureListDto = ligneDemandeFourniture.body ;
     console.log(this.lisgneDemandeFournitureListDto)

     this.demandeFournitureFormGroup.setControl('articleStockArray', this.setLigneDemande(this.lisgneDemandeFournitureListDto)); 
     console.log(this.demandeFournitureFormGroup.value)
  }) 


 } catch (error) {
    throwError(error)
 }

  }
  setLigneDemande(services:any[]): FormArray
  {
    const formArray = new FormArray([]);
    services.forEach(item => {
      console.log(item)
      this.currentMagasin=item.magasin.id;
      this.onchangeLoadArticleByMagazin(item.magasin.id);
      formArray.push(this.fb.group({
        id:item.id,
        article:this.fb.group({
          id: item.article.id,
          numeroArticle: item.article.numeroArticle
        }),
        demandeFourniture:this.fb.group({
          id: item.demandeFourniture.id
        }),
        magasin:this.fb.group({

         
          id: {value: item.magasin.id, disabled: false},
        }),
        quantiteDemande:item.quantiteDemande,
        quantiteLivre:item.quantiteLivre,
      }));
    });
  
    return formArray;
  }
}
