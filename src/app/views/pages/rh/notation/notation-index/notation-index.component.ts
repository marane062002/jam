import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotationService } from '../../services/notation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { OrganisationService } from '../../../organisation/organisation.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonnelService } from '../../services/personnel.service';

export class Filter {
	idCompagne: number;
	idPersonnels:number [];
}
@Component({
  selector: 'kt-notation-index',
  templateUrl: './notation-index.component.html',
  styleUrls: ['./notation-index.component.scss']
})
export class NotationIndexComponent implements OnInit {

   // ============================================
	// Declarations
	// ============================================
  loading= false;
  
  displayedColumns: string[] = ['id','matricule', 'nom', 'prenom', 'annee','notation','actions'];
  compagnes:any;
  divisions:any; 
  services:any;
  personnels:any
  filterForm: FormGroup; 
  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  filter = new Filter();
  
  
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private notationService: NotationService ,
             private translate: TranslateService,
             private personnelService:PersonnelService,
             private organisationService:OrganisationService,
             private fb:FormBuilder,
    private router: Router) {
      
       this.getData()
       this.getNotation()
    }

    

  ngOnInit() {
    this.filterForm = this.fb.group({ 
      compagne:[0],
      division:[0],
      service:{value: 0, disabled: true},
      personnel:{value: 0, disabled: true}
    })
  
  }

  async getNotation(){
   await this.notationService.getRessource('/notations/index')
    .subscribe(data => {this.dataSource =new MatTableDataSource(data[0]);
      console.log(data)
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  async getData(){
    await this.notationService.getData()
    .subscribe(data => {
      this.divisions = data[0];
      this.compagnes = data[1];
      
    }, err => {
      console.log(err);
      
    }
    );
  }
  onChangeDivision(){
    
    const idDivision = this.filterForm.get('division').value;
         this.filterForm.get('service').setValue(0)
         this.filterForm.get('personnel').setValue(0)
    
    if(idDivision != 0){ 
      this.organisationService.getDivisionServicesAndPersonnels(idDivision)
      .subscribe(data => {
        this.services = data[0];
        this.personnels = data[1];
        this.filterForm.get('service').enable();
        this.filterForm.get('personnel').enable();
        this.filter.idPersonnels =[];
        this.personnels.forEach(personnel => {
          this.filter.idPersonnels.push(personnel.id)
          
        });
       
      }, err => {
        console.log(err);
        
      }
      );
    
  }else{
    this.services = null;
    this.personnels = null;
    this.filterForm.get('service').disable();
    this.filterForm.get('personnel').disable();
    this.filter.idPersonnels =[];
    
  }
  }
  onChangeService(){
    const idService = this.filterForm.get('service').value;
    const idDivision = this.filterForm.get('division').value;
          this.filterForm.get('personnel').setValue(0)
    
    if(idService != 0){ 
      this.personnelService.getPersonnelsByService(idService)
    .subscribe(data =>{  this.personnels = data
      this.filter.idPersonnels =[];
        this.personnels.forEach(personnel => {
          this.filter.idPersonnels.push(personnel.id)
          
        });
       },
      error => console.log(error)
    );
   
     
    
  }else if(idDivision !=0)
    this.onChangeDivision()

  }
  onChangePersonnel(){
    const id = this.filterForm.get('personnel').value
    if(id != 0)
    this.filter.idPersonnels =[this.filterForm.get('personnel').value]
    else
    this.onChangeService()
  }
  
  async doFilter(){
   this.filter.idCompagne = this.filterForm.get('compagne').value
   const compagne = this.filter.idCompagne
   const personnelids = this.filter.idPersonnels
   
   if(compagne != 0 || personnelids){
    this.loading = true
    
     await this.notationService.getNotationsByFilter(this.filter)
     .subscribe(data => {this.dataSource =new MatTableDataSource(data[0]);
      
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false
    
    }, err => {
      console.log(err);
      
    })
   }

   /*  
   console.log(ids.length) 
    if(ids.length!=0){ 
    this.service.getRessourceByFilter(ids,'/notations/filter?ids=')
    .subscribe(data => {this.dataSource =new MatTableDataSource(data);
      
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    })
  } else{
    this.dataSource =new MatTableDataSource();
      
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  } */
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  public delete(id: number) {
    this.notationService.deleteRessource(id,'/notations/delete/')
      .subscribe(
        data => {
         
          this.getNotation()
          
        },
        error => console.log(error));
  }

  show(id){
    this.router.navigate(['/notation/notation-show'], { queryParams: { id: id } })
  } 
  update(id){
    this.router.navigate(['/notation/notation-edit'], { queryParams: { id: id } })
  }
}
