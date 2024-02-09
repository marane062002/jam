
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FonctionnaireDTO } from '../../../../../../core/_base/layout/models/fonctionnaire-dto';
import { DemandeMission } from '../../../../../../core/_base/layout/models/demande-mission';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemandeMisionService } from '../../../../../../core/_base/layout/services/parcAuto/demande-mision.service';
import { PersonnelService } from '../../../../../../views/pages/rh/services/personnel.service';

@Component({
  selector: 'app-new-demande-missison',
  templateUrl: './new-demande-missison.component.html',
  styleUrls: ['./new-demande-missison.component.scss']
})
export class NewDemandeMissisonComponent implements OnInit {




 
  listDemandeMission:any[];
  listUsers:any[];
 //this.localStorege.retrieve("userInfo") as  FonctionnaireDTO ;
  demandeMision=new DemandeMission();
  currentPage=0;
  size=5;
  totalPages=1;
  listEntrees:any[];
  formDemandeMision: FormGroup;

  constructor(private modalService: NgbModal,
    private service: PersonnelService ,
    private demandeMisionService :DemandeMisionService) { 
    
    this.formDemandeMision= new FormGroup({
      numdemande: new FormControl({ value: '', disabled: 'true' }),
      moyenTransport: new FormControl('',Validators.required),
      entitrBEneficaire: new FormControl('',Validators.required),
      typemIsion: new FormControl('',Validators.required),
      motif: new FormControl('',Validators.required),
      parcours: new FormControl('',Validators.required),
      dateDepart: new FormControl('',Validators.required),
      dateRetour:new FormControl('',Validators.required),
      dateArriveLettre: new FormControl('',Validators.required),
       resbonsable_id :new FormControl(''),
      accompagnateurs :new FormControl(''),
     accompagnateurs_ids:new FormControl('',),

  })
  }

  ngOnInit() {
 
    this.demandeMisionService.getCountDemandeMision().subscribe(res=>{
      let d=new Date()
      this.formDemandeMision.get('numdemande').setValue(res+1+"/"+d.getFullYear());
    })
    this.getPersonnel();

    
   /*  this.fonctionnaireService.getAllFonctionnairesparcAuto().subscribe((res: FonctionnaireArrayResponse) => {
      this.listFonctionnaire = res.body  ;
    }) */
  }
  getPersonnel(){
 /*    this.user$ = this.store.pipe(select(currentUser));

    this.user$.subscribe(user =>{
      if(user){ */

      let liste = [0,0]
      this.getPersonnels_user(liste)

  }
  
 async getPersonnels_user(liste){
  await this.service.getPersonnelsByDevisionAndService(liste).subscribe(data => {

    this.listUsers=data[0];


  }, err => {
    console.log(err);
  });
 }
 // lefletMap: Map;
/*   initMap(): void {
    const initialState = { lng: 11, lat: 49, zoom: 4 };
    if (this.lefletMap == undefined) {
      this.lefletMap = new Map(this.mapContainer.nativeElement).setView(
        [initialState.lat, initialState.lng],
        initialState.zoom
      );
    }
   

    const isRetina = Browser.retina;
    const baseUrl =
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
    const retinaUrl =
      'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

    tileLayer(isRetina ? retinaUrl : baseUrl, {
      maxZoom: 20,
      id: 'osm-bright',
    } as any).addTo(this.lefletMap);
  }
  */
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





}
