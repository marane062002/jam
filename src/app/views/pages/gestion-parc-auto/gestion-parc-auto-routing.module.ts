import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffectationCarburantComponent } from './gestion-mission/affectation-carburant/affectation-carburant.component';
import { AffectationCarteAutorouteComponent } from './gestion-mission/affectation-carte-autoroute/affectation-carte-autoroute.component';
import { AffectationMontantComponent } from './vehicule-fonction/affectation-montant/affectation-montant.component';
import { AffectationVehiculeComponent } from './gestion-mission/affectation-vehicule/affectation-vehicule.component';
import { AvanceConventionComponent } from './caisseprincipale/avance-convention/avance-convention.component';
import { CaissePrincipaleComponent } from './caisseprincipale/caisse-principale/caisse-principale.component';
import { ConventionComponent } from './caisseprincipale/convention/convention.component';
import { DemandeMissionComponent } from './gestion-mission/demande-mission/demande-mission.component';
import { FactureComponent } from './caisseprincipale/facture/facture.component';
import { GestionParcAutoOutletComponent } from './gestion-parc-auto-outlet/gestion-parc-auto-outlet.component';
import { LivraisonComponent } from './garage/livraison/livraison.component';
import { ValidationMissionComponent } from './gestion-mission/validation-mission/validation-mission.component';
import { ReceptionComponent } from './garage/reception/reception.component';
import { ReparationComponent } from './garage/reparation/reparation.component';
import { DotationCarburantComponent } from './vehicule-fonction/dotation-carburant/dotation-carburant.component';
import { AffectationVehiculeFonctionComponent } from './vehicule-fonction/affectation-vehicule-fonction/affectation-vehicule-fonction.component';
import { DetailCarteAutorouteComponent } from './gestion-mission/detail-carte-autoroute/detail-carte-autoroute.component';
import { DetailCarburantComponent } from './gestion-mission/detail-carburant/detail-carburant.component';
import { TableauBordParcAutoComponent } from './tableau-bord-parcAuto/tableau-bord-parcAuto.component';
import { UpdateComptabiliteComponent } from './parametrage/update-comptabilite/update-comptabilite.component';
import { FonctionnairesComponent } from './parametrage/fonctionnaires/fonctionnaires.component';
import { DetailVehiculeComponent } from './parametrage/detail-vehicule/detail-vehicule.component';
import { ChauffeursComponent } from './etat/chauffeurs/chauffeurs.component';
import { PositionSoucheComponent } from './etat/position-souche/position-souche.component';
import { PositionVignetteComponent } from './etat/position-vignette/position-vignette.component';
import { EtatVttComponent } from './etat/etat-vtt/etat-vtt.component';
import { EtatCarburantComponent } from './etat/etat-carburant/etat-carburant.component';
import { EtatReparationComponent } from './etat/etat-reparation/etat-reparation.component';
import { EtatGlobaleVttComponent } from './etat/etat-globale-vtt/etat-globale-vtt.component';
import { EtatGlobaleReparationComponent } from './etat/etat-globale-reparation/etat-globale-reparation.component';
import { EtatGlobaleCarburantComponent } from './etat/etat-globale-carburant/etat-globale-carburant.component';
import { DetailReceptionComponent } from './garage/detail-reception/detail-reception.component';
import { DemandeProvisionnelComponent } from './gestion-mission/demande-provisionnel/demande-provisionnel.component';
import { AccessoireVehiculeComponent } from './parametrage/accessoireVehicule/accessoireVehicule.component';
import { NewDemandeMissisonComponent } from './gestion-mission/demande-mission/new-demande-missison/new-demande-missison.component';
import { NewAccessioreVehiculeComponent } from './parametrage/accessoireVehicule/new-accessiore-vehicule/new-accessiore-vehicule.component';
import { NewReparationComponent } from './garage/reparation/new-reparation/new-reparation.component';
import { DetailsReparationComponent } from './garage/reparation/details-reparation/details-reparation.component';
import { DetailsDemandeComponent } from './gestion-mission/demande-mission/details-demande/details-demande.component';

const routes: Routes = [
    {
        path: '',
        component: GestionParcAutoOutletComponent,
        children: [
            {
                path: 'tableau-bord-parcauto',
                component: TableauBordParcAutoComponent
            },
            {
                path: 'affectation-carburant',
                component: AffectationCarburantComponent
            },
            {
                path: 'carte-autoroute',
                component: AffectationCarteAutorouteComponent
            },
            {
                path: 'affectation-montant',
                component: AffectationMontantComponent
            },
            {
                path: 'affectation-vehicule',
                component: AffectationVehiculeComponent
            },
            {
                path: 'avance-convention',
                component: AvanceConventionComponent
            },
            {
                path: 'caisse-principale',
                component: CaissePrincipaleComponent
            },
            {
                path: 'convention',
                component: ConventionComponent
            },
            {
                path: 'demande-mession',
                component: DemandeMissionComponent
            },
            {
                path: 'new-demande-mession',
                component: NewDemandeMissisonComponent
            },
            {
                path: 'details-mession',
                component: DetailsDemandeComponent
            },
            
            {
                path: 'facture',
                component: FactureComponent
            },
            {
                path: 'livraison',
                component: LivraisonComponent
            },
            {
                path: 'reception',
                component: ReceptionComponent
            },
            {
                path: 'reparation',
                component: ReparationComponent
            },
            {
                path: 'new-reparation',
                component: NewReparationComponent
            },
            {
                path: 'deatils-reparation',
                component: DetailsReparationComponent
            },

            {
                path: 'validation-mission',
                component: ValidationMissionComponent
            },
            {
                path: 'affectation-vehicule-fonction',
                component: AffectationVehiculeFonctionComponent
            },
            {
                path: 'dotation-carburant',
                component:DotationCarburantComponent 
            },
            {
                path: 'detail-carte-autoroute',
                component: DetailCarteAutorouteComponent
            },
            {
                path: 'detail-carburant',
                component: DetailCarburantComponent
            },
            
           
            {
                path: 'fonctionnaires',
                component: FonctionnairesComponent
            },
            {
                path: 'update-comptabilite',
                component: UpdateComptabiliteComponent
            },
            
            {
                path: 'detail-vehicule',
                component: DetailVehiculeComponent
            },
            {
                path: 'position-vignette',
                component: PositionVignetteComponent
            },
            {
                path: 'position-souche',
                component: PositionSoucheComponent
            },
            {
                path: 'chauffeur',
                component: ChauffeursComponent
            },
            {
                path: 'registre-vtt',
                component: EtatVttComponent
            },
            {
                path: 'registre-carburant',
                component: EtatCarburantComponent
            },
            {
                path: 'registre-reparation',
                component: EtatReparationComponent
            },
            {
                path: 'etat-globale-vtt',
                component: EtatGlobaleVttComponent
            },
            {
                path: 'etat-globale-reparation',
                component: EtatGlobaleReparationComponent
            },
            {
                path: 'etat-globale-carburant',
                component: EtatGlobaleCarburantComponent
            },
            {
                path: 'detail-reception',
                component: DetailReceptionComponent
            },
            {
                path: 'demande-provisionnel',
                component: DemandeProvisionnelComponent
            },
            {
                path: 'accessoire-vehicule',
                component: AccessoireVehiculeComponent
            },
            {
                path: 'accessoire-vehicule-new',
                component: NewAccessioreVehiculeComponent
            },
            
            {
                path: 'vehicules',
                loadChildren: () => import('./parametrage/vehicules/vehicule.module').then(m => m.GestionparcautoVehiculeModule),
            },
            {
                path: 'carbucartes',
                loadChildren: () => import('./parametrage/carbucartes/carte-carbucarte.module').then(m => m.GestionparcautoCarteCarbucarteModule),
            },
            {
                path: 'cartes-jawaz',
                loadChildren: () => import('./parametrage/cartes-jawaz/carte-jawaz.module').then(m => m.GestionparcautoCarteJawazModule),
            },
            {
                path: 'marques',
                loadChildren: () => import('./parametrage/marques/marque.module').then(m => m.GestionparcautoMarqueModule),
            },
            {
                path: 'garagistes',
                loadChildren: () => import('./parametrage/garagistes/garagiste.module').then(m => m.GestionparcautoGaragisteModule),
            },
        ],
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionParcAutoRoutingModule {}
