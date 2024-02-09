import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DemandeMission } from '../../../../../core/_base/layout/models/demande-mission';
import { FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { VehiculeService } from '../../parametrage/vehicules/services/vehicule.service';
import { EntityArrayResponseType } from '../../parametrage/accessoireVehicule/services/accessoire-vehicule.service';
import { IVehicule } from '../../common/models/vehicule.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'affectation-vehicule',
  templateUrl: './affectation-vehicule.component.html',
  styleUrls: ['./affectation-vehicule.component.scss']
})
export class AffectationVehiculeComponent implements OnInit {

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
 

  listDemandeMission:any[];
  statusAccessoireVehicules: any[] = [];
  vehicule_id=0;
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  selectedAccesoire: any[] = [];
  listVehiculeDisponible:IVehicule[]=[];
  listFonctionnaire:FonctionnaireDTO[]=[];
  dropdownSettings: IDropdownSettings;
 // fonctionnaire : FonctionnaireDTO = this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  actions: any = { canAffectCar:true,withAction:true}
  demandeMision=new DemandeMission();
  dropdownSettingsFor= {};
  dropdownSettingsAccesoire= {};
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

  constructor(private modalService: NgbModal, private translate:TranslateService,private router:Router, 
  private demandeMisionService: DemandeMisionService, private vehiculeService:VehiculeService) { }

  ngOnInit() {

    this.getallDemandeMisionNotaffectionVoiture();
  
  }
  
  getallDemandeMisionNotaffectionVoiture(){
    this.demandeMisionService.getallDemandeMisionNotaffectionVoiture(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.missionsNonTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.missionsTraitees=data.Content;
      this.totalPages=data.totalPages;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource( this.missionsNonTraitees);
      this.isLoading = false;
      this.datasize = data.totalItems;
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
      this.missionsTraitees=data.Content;
      this.totalPages=data.totalPages;
      
      this.dataSource = new MatTableDataSource( this.missionsTraitees);
      this.isLoading = false;
      this.datasize = data.totalItems;
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
    this.vehiculeService.findAllVehiculeDispponible().subscribe((res : EntityArrayResponseType) =>{
      this.listVehiculeDisponible = res.body  ;
      
    })
   } 
   applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

  
   displayTabs(event) {
    this.tabID = event.index;
    console.log(event.index)
    this.dataSource = new MatTableDataSource( null);
    this.datasize=0;
    if(event.index==0){
      this.getallDemandeMisionNotaffectionVoiture();
    }if(event.index==1)
    this.getallDemandeMisionaffectionVoiture();

  }
  affectedCarElement(content:any,data:any){
    this.allVehucileDisponible();
    this.demandeMision=data;
    this.vehicule_id =data.vehicule!=null ? data.vehicule.id:0;
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
  details(id:number){
    this.router.navigate(
      ["/gestionParcAuto/details-mession"],
      { queryParams: { id: id,phase:1 } }
    );
  
}
  /* findAllAccessoireByVehicule(event:any){
    this.statusAccessioreVehiculeService.findAllByVehicule(event.target.value).subscribe(res=>{
      this.statusAccessoireVehicules=res.map(e=>new StatusAccessiore(e));
      console.log(this.statusAccessoireVehicules)
    })
  } */

  openModalModiferLivraiAttent(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  close(){
    this.modalService.dismissAll();
  }

/*   DeaffectationVehicule(demande_id:number) {
    this.demandeMisionService.affectionVehicule(demande_id,0).subscribe(res=>{
      console.log(res)
      Swal.fire({
        title: 'Véhicule a été rejeté avec succés',
        icon: 'success',
      });
   
    },err=>{
      console.log(err)
    })

   
  } */
  
  pageCurrentChange(event :any){
    this.currentPage=event;
    if(this.tabID==1){
      this.getallDemandeMisionNotaffectionVoiture();
    }if(this.tabID==2)
    this.getallDemandeMisionaffectionVoiture();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      if(this.tabID==1){
        this.getallDemandeMisionNotaffectionVoiture();
      }if(this.tabID==2)
      this.getallDemandeMisionaffectionVoiture();
     }
}
