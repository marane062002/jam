import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ContentChildren, ElementRef, OnInit, ViewChild } from '@angular/core';

import Swal from 'sweetalert2';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { DemandeMission } from '../../../../../core/_base/layout/models/demande-mission';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { ValiderDemandeMissionDTO } from '../../../../../core/_base/layout/models/valider-demande-mission-dto';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { values } from 'lodash';

@Component({
  selector: 'demande-mission',
  templateUrl: './demande-mission.component.html',
  styleUrls: ['./demande-mission.component.scss']
})
export class DemandeMissionComponent implements OnInit {
  validerDemandeMissionDTO=new ValiderDemandeMissionDTO();
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

  listDemandeMission:any[];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  datasize=0;
  listFonctionnaire:FonctionnaireDTO[]=[];
  dropdownSettings: IDropdownSettings;
  fonctionnaire : FonctionnaireDTO =null;// this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  actions: any = { canDetail: true ,canModify: true, canDelete:true ,canAdd: true,withAction:true}
  demandeMision=new DemandeMission();
  dropdownSettingsFor= {};
  dropdownSettingsAcom= {};
  dropdownSettingsArt= {};
  currentPage=0;
  size=5;
  totalPages=1;
  listEntrees:any[];
  formDemandeMision: FormGroup;

  constructor(private modalService: NgbModal,
    private translate:TranslateService,
    private router:Router,
    private missionService:DemandeMisionService,
    private demandeMisionService :DemandeMisionService) { 
    

  }

  ngOnInit() {
    this.allDemandeMission();
  
  }
  addNow(){
    this.router.navigateByUrl("gestionParcAuto/new-demande-mession");
  }
  details(id:number){
      this.router.navigate(
        ["/gestionParcAuto/details-mession"],
        { queryParams: { id: id,phase:0 } }
      );
  }
  ngAfterViewInit() {
  
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  valide(id){
    this.validerDemandeMissionDTO.demande_id=id;
    this.validerDemandeMissionDTO.code=2;
    this.missionService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
      this.modalService.dismissAll();
      this.ngOnInit();
     Swal.fire({
        title: 'Mission a été validée avec succés',
        icon: 'success',
      });
    },err=>{
      console.log(err)
    });
  }


  AmodifierMission(){
      
    Swal.fire({
      title: '',
      text: 'Veuillez saisir un motif de demande la modification ',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'rejeter',
    showLoaderOnConfirm: true,
  
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      this.validerDemandeMissionDTO.textReject=result.value;
      this.validerDemandeMissionDTO.code=9;
      this.missionService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
        this.ngOnInit();
        this.modalService.dismissAll();
        Swal.fire({
          title: 'Mission a été change statut   avec succés',
          icon: 'success',
        });
      })
      
      console.log(result.value)
    }
  })
    
  }
  rejeteMission() {
  
    Swal.fire({
      title: '',
      text: 'Veuillez saisir un motif de rejet',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'rejeter',
    showLoaderOnConfirm: true,
  
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      this.validerDemandeMissionDTO.textReject=result.value;
      this.validerDemandeMissionDTO.code=8;
      this.missionService.validerMision(this.validerDemandeMissionDTO).subscribe(res=>{
        this.ngOnInit();
        Swal.fire({
          title: 'Mission a été rejetée avec succés',
          icon: 'success',
        });
      })
      this.modalService.dismissAll();
      console.log(result.value)
    }
  })
  }
  
  allDemandeMission(){
    this.demandeMisionService.pageable(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.listDemandeMission=data.Content;
      this.totalPages=data.totalPages;
      this.dataSource = new MatTableDataSource( this.listDemandeMission);
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
  modalAjouterDemandeMission(content:any){
    this.verifyRole();
    this.demandeMisionService.getCountDemandeMision().subscribe(res=>{
      let d=new Date()
      this.formDemandeMision.get('numdemande').setValue(res+1+"/"+d.getFullYear());
    })
   /*  this.fonctionnaireService.getAllFonctionnairesparcAuto().subscribe((res: FonctionnaireArrayResponse) => {
      this.listFonctionnaire = res.body  ;
    }) */
   
    this.modalService.open(content, {
      size: "lg",
      
    });
  
  }
  verifyRole() : void {
    console.log(this.fonctionnaire.role.libelle)
    switch(this.fonctionnaire.role.libelle) {
      case 'Chef Division' : {
        console.log("Chef Devision")
   
       this.formDemandeMision.controls['source'].setValue(2);
        this.formDemandeMision.controls['code'].setValue("3");
        break ;
      }
      case 'Chef Logistique' : {
       this.formDemandeMision.controls['source'].setValue(2);
       this.formDemandeMision.controls['code'].setValue("4");

        break ;
        }
      case 'Chef Finance' : {
        this.formDemandeMision.controls['source'].setValue(2);
        this.formDemandeMision.controls['code'].setValue("5");

        break ;
      }
      case 'Chef Service' : {
        this.formDemandeMision.controls['source'].setValue(1);
       this.formDemandeMision.controls['code'].setValue("2");

        break ;
      }
      default:{
        this.formDemandeMision.controls['source'].setValue(1);
       this.formDemandeMision.controls['code'].setValue("1");

      }
    }
  }

  modalModifierDemandeMission(content:any,data:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  supprimerDemandeMission(data:any){

  }

  close(){
    this.modalService.dismissAll();
  }

  onItemSelect(item: any) {
    console.log(item);
}
onSelectAll(items: any) {
    console.log(items);
}

ajouterMission(value:DemandeMission) {
  value.accompagnateurs_ids=value.accompagnateurs.map(e=>e.id+",").toString();
  if(this.formDemandeMision.valid){
    this.demandeMisionService.save(value).subscribe(res=>{
      console.log(res);
      this.close();
      this.ngOnInit(); 
  Swal.fire({
    title: 'Mission a été ajoutée avec succés',
    icon: 'success',
  });
    },err=>{
      console.log(err)
    })
  }
  

}

modifierMission() {
  this.modalService.dismissAll();
  Swal.fire({
    title: 'Mission a été modifié avec succés',
    icon: 'success',
  });
}
pageCurrentChange(event :any){
  this.currentPage=event;

  console.log(this.currentPage, this.size)
  this.allDemandeMission();
}
  sizeCurrentChange(event :any){
    this.size=event;
    console.log(this.currentPage, this.size)
    this.allDemandeMission();
   }

}
