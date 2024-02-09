import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FonctionnaireDTO } from '../../../../../core/_base/layout/models/fonctionnaire-dto';
import { LocalStorageService } from 'ngx-webstorage';
import { DemandeProvionneServiceService } from '../../../../../core/_base/layout/services/parcAuto/demande-provionne-service.service';
import { DemandeProvionne } from '../../../../../core/_base/layout/models/demande-provionne';
import { DemandeMisionService } from '../../../../../core/_base/layout/services/parcAuto/demande-mision.service';

@Component({
  selector: 'app-demande-provisionnel',
  templateUrl: './demande-provisionnel.component.html',
  styleUrls: ['./demande-provisionnel.component.scss']
})
export class DemandeProvisionnelComponent implements OnInit {
  headerData:any=[
    { name: "type Mission ", content: "type" },
    { name: "Date départ", content: "dateDepart" },
    { name: "Date retour", content: "dateRetour" },
    { name: "Moyen de transport", content: "moyenTransport" }
  ]
  listMisssion:any[];
  listDemandeMission:any[];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  listFonctionnaire:FonctionnaireDTO[]=[];
  dropdownSettings: IDropdownSettings;
  fonctionnaire : FonctionnaireDTO = this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  actions: any = { canDetail: true ,canModify: true, canDelete:true ,canAdd: true,withAction:true,canaffectDemande:true}
  demandeMission=new DemandeProvionne();
  id_demande:0;
  id_mission:0;
  dropdownSettingsFor= {};
  dropdownSettingsAcom= {};
  dropdownSettingsArt= {};
  currentPage=0;
  size=5;
  totalPages=1;
  listEntrees:any[];
  formDemandeMision: FormGroup;

  constructor(private modalService: NgbModal , private  missionService:DemandeMisionService,
    private localStorege:LocalStorageService,private demanadeProvissionel:DemandeProvionneServiceService) {
    this.formDemandeMision= new FormGroup({
      moyenTransport: new FormControl('',Validators.required),
      type: new FormControl('',Validators.required),
      motif: new FormControl('',Validators.required),
      parcours: new FormControl('',Validators.required),
      dateDepart: new FormControl('',Validators.required),
      dateRetour:new FormControl('',Validators.required),
       resbonsable_id :new FormControl(''),
      fonctionaire_id:new FormControl('',Validators.required),
  })
}

  ngOnInit() {

  this.allDemandeMission();
  this.selectedItems = [{ item_id: 3, item_text: "A" }];
  this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Tout sélectionner ",
      unSelectAllText: "Tout déselectionner ",
      itemsShowLimit: 3,
      allowSearchFilter: true,
  };
   
  }
  affecteMission(id:number){
this.demanadeProvissionel.affectionMission(id, this.id_mission).subscribe(res=>{
this.close();
this.ngOnInit();

})
  }

  allDemandeMission(){
    this.demanadeProvissionel.pageable(this.currentPage,this.size).subscribe(res=>{
      let data:any=res;
      this.listDemandeMission=data.Content;
      this.totalPages=data.totalPages;
    })
  }

  modalAjouterDemandeMission(content:any){
    this.formDemandeMision.get("fonctionaire_id").setValue(this.fonctionnaire.id);
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierDemandeMission(content:any,data:any){
    this.formDemandeMision.patchValue(data);
    this.id_demande=data.id;
    this.modalService.open(content, {
      size: "lg",
    });
  }

  affectDemande(content:any,data:any){
    console.log(data.demandeMission!=null)
    this.missionService.all().subscribe(res=>{
      this.listMisssion=res;
    },err=>{
      console.log(err)
    })
    if(data.demandeMission!=null){
      this.id_mission=data.demandeMission.id;
    }
    this.demandeMission=data;
    this.modalService.open(content, {
      size: "lg",
    });
  }
  openModalDetail(content:any,data:any){
    this.demandeMission=data;
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
ajouterMission(value:any){
 if(this.formDemandeMision.valid){
   this.demanadeProvissionel.save(value).subscribe(res=>{
    Swal.fire({
      title: 'Mission a été modifié avec succés',
      icon: 'success',
    });
    this.modalService.dismissAll();
    this.ngOnInit();
   })
 }
}



updateMission(value:any) {
  this.demanadeProvissionel.update(this.id_demande,value).subscribe(res=>{
    this.modalService.dismissAll();
    Swal.fire({
      title: 'Mission a été modifié avec succés',
      icon: 'success',
    });
    this.ngOnInit();
  },err=>{
    console.log(err)
  })

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
