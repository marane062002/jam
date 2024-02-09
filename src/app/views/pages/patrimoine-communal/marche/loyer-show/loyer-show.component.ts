import { Component, OnInit, ViewChild } from '@angular/core';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort,  MatPaginator } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { environment } from './../../../../../../environments/environment';

export interface LoyerTab {
	label: string;
	content: string;
} 
@Component({
  selector: 'kt-loyer-show',
  templateUrl: './loyer-show.component.html',
  styleUrls: ['./loyer-show.component.scss']
})
export class LoyerShowComponent implements OnInit {
// =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<LoyerTab[]>;
	selected = new FormControl(0);
  id:number;
  idParent:number;
  duree:number;
  loyer:any;
  acte:any;
  dateSys = new Date();
 
  displayedColumns: string[] = ['id', 'annee', 'mois','montant','etat','numRecu','actions'];
  loyerForm: FormGroup;  
 
  dataSource: MatTableDataSource<any>;
  isLoadingResults = true; 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private service:BienscommunalService,
    private translate: TranslateService,
    private fb:FormBuilder,
    private router: Router,private route: ActivatedRoute) { 

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
        this.idParent=params['idParent']
      }); 
      this.getLoyer(this.id);

      this.asyncTabs = new Observable(
        (observer: Observer<LoyerTab[]>) => {
          setTimeout(() => {
            observer.next([
              {
                label: "PAGES.GENERAL.SUIVI_LOYER",
                content: '1',
              }/* ,
               {
                label: "PAGES.GENERAL.PATRIMOINE_MVMT",
                content: "2"
              } */
             ]);
          }, 1000);
        } 
      ); 
    }

  ngOnInit() { 
    
    this.loyerForm = this.fb.group({      
      id:[null] ,
      numActeLocation: [''],
      observation:[null],
      dateActe:[null],
      montantLoyer:[0],
      montantImpaye:[0],
      anneeDebut:[null],
      moisDebut:[null],
      anneeEnCours:[null],
      moisEnCours:[null],
      locataire:[''],
      magasin:[null],
      ligneloyers: new FormArray([])	
      })

  }
  get f() { return this.loyerForm?this.loyerForm.controls:null; }
    get m() { return this.f?this.f.ligneloyers as FormArray:null; }
  getLoyer(id){
    this.service.getLoyerById(id)
      .then(data => {
       
        this.loyer = data;
        this.loyerForm.patchValue(data); 
        
        this.addNewLignesLoyer(data.anneeEnCours,data.moisEnCours,data.montantLoyer)
        
       
      }, error => console.log(error));
      /* this.service.getFilesById(this.id,'/PjLoyerActes/index/')
      .subscribe(data => {
       
        this.acte = data;
       
        
      }, error => console.log(error)); */
    
  }
  addNewLignesLoyer(annee,mois,montant){    
    const anneeS = this.dateSys.getFullYear()
    const moisS = this.dateSys.getMonth()
    const lastMontant = this.loyerForm.controls['montantImpaye'].value
    this.duree = (anneeS - annee)*12 + moisS - mois 
    console.log(this.duree)
     if(this.duree > 0 ){
        
        this.loyerForm.controls['montantImpaye'].setValue(this.duree * montant + lastMontant)
        console.log(this.loyerForm.controls['montantImpaye'].value)
        this.loyerForm.controls['anneeEnCours'].setValue(anneeS)
        console.log(this.loyerForm.controls['anneeEnCours'].value)
        this.loyerForm.controls['moisEnCours'].setValue(moisS)
        console.log(this.loyerForm.controls['moisEnCours'].value)
        this. ajouterLignes(this.duree,mois,annee) 

        const loyer: any = Object.assign({}, this.loyerForm.value);
         console.log(loyer) 
              this.service.updateLoyer(loyer,this.id)
                .subscribe(data =>{
                         console.log(data)
                          
                        this.getLoyer(this.id);
                          
                          },
                          error => console.log(error)
                        );   
                }     

  }

  update(){
    this.router.navigate(['/marche/loyer-edit'],{ queryParams: { id: this.id, idParent : this.idParent } })
  } 

  ajouterLignes(nb,m,annee) {
    
    for (let i = nb; i > 0; i--) {
      if(m==12) {m = 0; annee++}
      //console.log(this.mois[m].libelle +' '+ annee) 
      
    this.m.push(this.fb.group({
      anneeLoyer: [annee],
      moisLoyer: [m],
      etatReglement: ['false'],
         
           
    }));
    m++
  }
}
  public loyerDelete(id: number) {
     this.service.deleteLoyer(id)
      .subscribe(
        data => {
          console.log(data),
   //       this.router.navigate(['marche/marche-index'])
          this.router.navigate(['/marche/magasin-show'], { queryParams: { id: id } }) 
          
        },
        error => console.log(error));
  } 

  showMagasin(id){
    this.router.navigate(['/marche/magasin-show'], { queryParams: { id: id } })
  } 

  onClickActeName(e,id) {
    console.log('You clicked: '+e) ;
    var r=e.substring(0,e.length-4);
    console.log(r)
    window.open(environment.API_ALFRESCO_URL + "/PjLoyerActes/"+r, '_blank');
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

}
