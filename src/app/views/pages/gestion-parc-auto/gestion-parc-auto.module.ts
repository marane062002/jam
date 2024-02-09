import { TableauBordParcAutoComponent } from './tableau-bord-parcAuto/tableau-bord-parcAuto.component';
import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ModalModule } from '../shared/modal/modal.module';
import { GestionParcAutoRoutingModule } from './gestion-parc-auto-routing.module';
import { GestionParcAutoOutletComponent } from './gestion-parc-auto-outlet/gestion-parc-auto-outlet.component';
import { AffectationCarteAutorouteComponent } from './gestion-mission/affectation-carte-autoroute/affectation-carte-autoroute.component';
import { AffectationMontantComponent } from './vehicule-fonction/affectation-montant/affectation-montant.component';
import { AffectationVehiculeComponent } from './gestion-mission/affectation-vehicule/affectation-vehicule.component';
import { AvanceConventionComponent } from './caisseprincipale/avance-convention/avance-convention.component';
import { CaissePrincipaleComponent } from './caisseprincipale/caisse-principale/caisse-principale.component';
import { ConventionComponent } from './caisseprincipale/convention/convention.component';
import { DemandeMissionComponent } from './gestion-mission/demande-mission/demande-mission.component';
import { FactureComponent } from './caisseprincipale/facture/facture.component';
import { LivraisonComponent } from './garage/livraison/livraison.component';
import { ValidationMissionComponent } from './gestion-mission/validation-mission/validation-mission.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReceptionComponent } from './garage/reception/reception.component';
import { ReparationComponent } from './garage/reparation/reparation.component';
import { AffectationCarburantComponent } from './gestion-mission/affectation-carburant/affectation-carburant.component';
import { AffectationVehiculeFonctionComponent } from './vehicule-fonction/affectation-vehicule-fonction/affectation-vehicule-fonction.component';
import { DotationCarburantComponent } from './vehicule-fonction/dotation-carburant/dotation-carburant.component';
import { DetailCarteAutorouteComponent } from './gestion-mission/detail-carte-autoroute/detail-carte-autoroute.component';
import { DetailCarburantComponent } from './gestion-mission/detail-carburant/detail-carburant.component';
import { FonctionnairesComponent } from './parametrage/fonctionnaires/fonctionnaires.component';
import { UpdateComptabiliteComponent } from './parametrage/update-comptabilite/update-comptabilite.component';
import { DetailVehiculeComponent } from './parametrage/detail-vehicule/detail-vehicule.component';
import { ChauffeursComponent } from './etat/chauffeurs/chauffeurs.component';
import { PositionSoucheComponent } from './etat/position-souche/position-souche.component';
import { PositionVignetteComponent } from './etat/position-vignette/position-vignette.component';
import { EtatVttComponent } from './etat/etat-vtt/etat-vtt.component';
import { EtatCarburantComponent } from './etat/etat-carburant/etat-carburant.component';
import { EtatReparationComponent } from './etat/etat-reparation/etat-reparation.component';
import { DetailReceptionComponent } from './garage/detail-reception/detail-reception.component';
import { DemandeProvisionnelComponent } from './gestion-mission/demande-provisionnel/demande-provisionnel.component';
import { AccessoireVehiculeComponent } from './parametrage/accessoireVehicule/accessoireVehicule.component';
import dayjs from 'dayjs/esm';
import './common/config/dayjs';
import { NgbDateDayjsAdapter } from './common/config/datepicker-adapter';
import { NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { httpInterceptorProviders } from './common/interceptor';
import { NewDemandeMissisonComponent } from './gestion-mission/demande-mission/new-demande-missison/new-demande-missison.component';
import { DataTableModule } from '../utils/data-table/data-table.module';
import { EtatGlobaleVttComponent } from './etat/etat-globale-vtt/etat-globale-vtt.component';
import { EtatGlobaleReparationComponent } from './etat/etat-globale-reparation/etat-globale-reparation.component';
import { EtatGlobaleCarburantComponent } from './etat/etat-globale-carburant/etat-globale-carburant.component';
import { NewAccessioreVehiculeComponent } from './parametrage/accessoireVehicule/new-accessiore-vehicule/new-accessiore-vehicule.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PagesModule } from '../pages.module';
import { CoreModule } from '../../../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialsModule } from '../utils/materials/materials.module';
import { NewReparationComponent } from './garage/reparation/new-reparation/new-reparation.component';
import { DetailsReparationComponent } from './garage/reparation/details-reparation/details-reparation.component';
import { DetailsDemandeComponent } from './gestion-mission/demande-mission/details-demande/details-demande.component';
@NgModule({
  declarations: [
    EtatGlobaleVttComponent,
    EtatGlobaleReparationComponent,
    EtatGlobaleCarburantComponent,
    GestionParcAutoOutletComponent,
    AffectationCarburantComponent,
    AffectationCarteAutorouteComponent,
    AffectationMontantComponent,
    AffectationVehiculeComponent,
    AvanceConventionComponent,
    CaissePrincipaleComponent,
    ConventionComponent,
    DemandeMissionComponent,
    FactureComponent,
    LivraisonComponent,
    ReceptionComponent,
    ReparationComponent,
    ValidationMissionComponent,
    AffectationVehiculeFonctionComponent,
    DotationCarburantComponent,
    DetailCarteAutorouteComponent,
    DetailCarburantComponent,
    TableauBordParcAutoComponent,
    FonctionnairesComponent,
    UpdateComptabiliteComponent,
    DetailVehiculeComponent,
    ChauffeursComponent,
    PositionSoucheComponent,
    PositionVignetteComponent,
    EtatVttComponent,
    EtatCarburantComponent,
    EtatReparationComponent,
    DetailReceptionComponent,
    DemandeProvisionnelComponent,
    AccessoireVehiculeComponent,
    NewDemandeMissisonComponent,
    NewAccessioreVehiculeComponent,
    NewReparationComponent,
    DetailsReparationComponent,
    DetailsDemandeComponent
  ],
  imports: [
    NgxMatSelectSearchModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
   DataTableModule,
    MatSelectModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    PagesModule,
		CommonModule,
		ReactiveFormsModule,
		CoreModule,
    NgMultiSelectDropDownModule.forRoot(),
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,
    ReactiveFormsModule,
    GestionParcAutoRoutingModule,
    CommonModule,
   // NgxPaginationModule, 
    //NgxEchartsModule ,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    ModalModule,
    NgMultiSelectDropDownModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true, 
      rolesIsolate: true}),
    ],
    providers: [
      { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
      httpInterceptorProviders,
    ],
})
export class GestionParcAutoModule {
  constructor( dpConfig: NgbDatepickerConfig) {
    dpConfig.minDate = { year: dayjs().subtract(100, 'year').year(), month: 1, day: 1 };
  }
}
