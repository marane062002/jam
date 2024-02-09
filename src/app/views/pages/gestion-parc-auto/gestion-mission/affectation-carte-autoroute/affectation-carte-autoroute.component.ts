import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IVehicule } from '../../common/models/vehicule.model';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DemandeMission } from '../../../../../core/_base/layout/models/demande-mission';
import { FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { EntityArrayResponseType, VehiculeService } from '../../parametrage/vehicules/services/vehicule.service';
import Swal from 'sweetalert2';
import { CarteJawazService } from '../../parametrage/cartes-jawaz/service/carte-jawaz.service';
import { ICarteCarbucarte } from '../../common/models/carte-carbucarte.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'affectation-carte-autoroute',
  templateUrl: './affectation-carte-autoroute.component.html',
  styleUrls: ['./affectation-carte-autoroute.component.scss']
})
export class AffectationCarteAutorouteComponent implements OnInit {
  listDemandeMission:any[];
  carte_id=0;
  soldeactuel=0;
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  listCartejawz:ICarteCarbucarte[]=[];
  listFonctionnaire:FonctionnaireDTO[]=[];
  dropdownSettings: IDropdownSettings;
  //fonctionnaire : FonctionnaireDTO = this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  actions: any = { canAffectCarteAuto:true,withAction:true}
  demandeMision=new DemandeMission();
  dropdownSettingsFor= {};
  dropdownSettingsAcom= {};
  dropdownSettingsArt= {};
  currentPage=0;
  size=5;
  totalPages=1;
  listEntrees:any[];
  formDemandeMision: FormGroup;
  missionsNonTraitees: any[];
  missionsTraitees: any[];
  tabID: number = 1;
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading=true;
  displayedColumns = [
		"numdemande",
		"dateArriveLettre", 
		"dateDepart", 
		"moyenTransport",
		"actions",
	];
  datasize=0;
 
  
  constructor(private modalService: NgbModal,private translate:TranslateService,
  private demandeMisionService: DemandeMisionService,private router:Router,
  private carteJawazservice:CarteJawazService) { }
  ngOnInit() {
    this.getallDemandeMisionaffectionVoiture();
  
  }
  
  getallDemandeMisionaffectinCarte(){
    this.demandeMisionService.getallDemandeMisionaffectinCarte(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.missionsTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.missionsTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource( this.missionsTraitees);
      this.isLoading = false;
      this.datasize = data.length;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant(
        "PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
      );
      this.paginator._intl.nextPageLabel = this.translate.instant(
        "PAGES.GENERAL.NEXT_PAGE_LABEL"
      );
      this.paginator._intl.previousPageLabel = this.translate.instant(
        "PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
      );
      this.paginator._intl.lastPageLabel = this.translate.instant(
        "PAGES.GENERAL.LAST_PAGE_LABEL"
      );
      this.paginator._intl.firstPageLabel = this.translate.instant(
        "PAGES.GENERAL.FIRST_PAGE_LABEL"
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  getallDemandeMisionaffectionVoiture(){
    this.demandeMisionService.getallDemandeMisionaffectionVoiture(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.missionsNonTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.missionsTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource( this.missionsTraitees);
      this.isLoading = false;
      this.datasize = data.length;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant(
        "PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
      );
      this.paginator._intl.nextPageLabel = this.translate.instant(
        "PAGES.GENERAL.NEXT_PAGE_LABEL"
      );
      this.paginator._intl.previousPageLabel = this.translate.instant(
        "PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
      );
      this.paginator._intl.lastPageLabel = this.translate.instant(
        "PAGES.GENERAL.LAST_PAGE_LABEL"
      );
      this.paginator._intl.firstPageLabel = this.translate.instant(
        "PAGES.GENERAL.FIRST_PAGE_LABEL"
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  allVehucileDisponible(){
    this.carteJawazservice.all().subscribe((res : EntityArrayResponseType) =>{
      this.listCartejawz = res.body  ;
    })
   } 
  

   displayTabs(event) {
  this.tabID=event.index;
  this.currentPage=0;
  this.dataSource = new MatTableDataSource(null);
  if(this.tabID==0){
    this.getallDemandeMisionaffectionVoiture();
  }if(this.tabID==1){
    this.getallDemandeMisionaffectinCarte();
  }
}
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

details(id:number){
  this.router.navigate(
    ["/gestionParcAuto/details-mession"],
    { queryParams: { id: id,phase:2} }
  );

}
  affectedCarteElement(content:any,data:any){
    this.allVehucileDisponible();
    this.demandeMision=data;
    this.carte_id =data.carteJawaz!=null ? data.carteJawaz.id:0;
    this.soldeactuel=data.carteJawaz!=null ? data.carteJawaz.soldeactuel:0;
      console.log(data);
        this.modalService.open(content, {
          size: "lg",
        }); 
    
  }
  openModalDetaillLivraiAttent(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  openModalModiferLivraiAttent(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  close(){
    this.modalService.dismissAll();
  }
  selectedCArteJAwaz(event:any){
 this.soldeactuel=this.listCartejawz.find(e=>e.id==event.target.value).soldeactuel || 0; 
  }

  affectionCarteJawaz(demande_id:number) {
    this.demandeMisionService.affectionCarteJawaz(demande_id,this.carte_id).subscribe(res=>{
      console.log(res);
      this.modalService.dismissAll();
      Swal.fire({
        title: 'Véhicule a été affecté avec succés',
        icon: 'success',
      });
      this.ngOnInit();
    },err=>{
      console.log(err)
    })
   
  }
  DeaffectionCarteJawaz(demande_id:number) {
    this.demandeMisionService.affectionCarteJawaz(demande_id,0).subscribe(res=>{
      console.log(res);
      this.modalService.dismissAll();
      Swal.fire({
        title: 'Véhicule a été rejeté avec succés',
        icon: 'success',
      });
      this.ngOnInit();
    },err=>{
      console.log(err)
    })
   
  }
  
  pageCurrentChange(event :any){
    this.currentPage=event;
    if(this.tabID==2){
      this.getallDemandeMisionaffectinCarte();
    }if(this.tabID==1)
    this.getallDemandeMisionaffectionVoiture();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      if(this.tabID==2){
        this.getallDemandeMisionaffectinCarte();
      }if(this.tabID==1)
      this.getallDemandeMisionaffectionVoiture();
     }
}
