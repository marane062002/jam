import { SortiesComponent } from './sorties/sorties.component';
import { EntreesComponent } from './entrees/entrees.component';
import { EmplacementsComponent } from './emplacements/emplacements.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { GestionStockOutletComponent } from './gestion-stock-outlet/gestion-stock-outlet.component';
import { ArticleComponent } from './article/article.component';
import { AjouterDemandeComponent } from './demande/ajouter-demande/ajouter-demande.component';
import { ValiderDemandeComponent } from './demande/valider-demande/valider-demande.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { ReapprovisionnementComponent } from './reapprovisionnement/reapprovisionnement.component';
import { ReformeComponent } from './Reforme/Reforme.component';
import { ReintegrationComponent } from './Reintegration/Reintegration.component';
import { TransfertsComponent } from './transferts/transferts.component';
import { GestionStockRoutingModule } from './gestion-stock-routing.module';

import { DetailInventaireComponent } from './detail-inventaire/detail-inventaire.component';
import { TableauBordStockComponent } from './tableau-bord-stock/tableau-bord-stock.component';
import { CategorieArticleComponent } from './categorie-article/categorie-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";

import { DetailDemandeComponent } from './demande/detail-demande/detail-demande.component';

import { EntiteMagasinComponent } from './entite-magasin/entite-magasin.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ValiderChefServiceComponent } from './demande/valider-chef-service/valider-chef-service.component';
import { ValiderChefLogistiqueComponent } from './demande/valider-chef-logistique/valider-chef-logistique.component';
import { ValiderChefFinanceComponent } from './demande/valider-chef-finance/valider-chef-finance.component';
import { QuantiteReapprovisionnementComponent } from './quantite-reapprovisionnement/quantite-reapprovisionnement.component';
import { ReferenceMarcheComponent } from './reference-marche/reference-marche.component';
import { ValiderChefDivisionComponent } from './demande/valider-chef-division/valider-chef-division.component';
import { ValiderDirecteurComponent } from './demande/valider-directeur/valider-directeur.component';
import { ModifierDemandeComponent } from './demande/modifier-demande/modifier-demande.component';

import { VignetteComponent } from './vignette/vignette.component';
import { FicheMagasinComponent } from './etat/fiche-magasin/fiche-magasin.component';
import { ModalModule } from '../shared/modal/modal.module';

import { PagesModule } from '../pages.module';
import { CoreModule } from '../../../../app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialsModule } from '../utils/materials/materials.module';
import { NewArticleComponent } from './article/new-article/new-article.component';
import { EditArticleComponent } from './article/edit-article/edit-article.component';
import { DetailArticleComponent } from './article/detail-article/detail-article.component';
import { NewCategorieArticleComponent } from './categorie-article/new-categorie-article/new-categorie-article.component';
import { EditCategorieArticleComponent } from './categorie-article/edit-categorie-article/edit-categorie-article.component';
import { DetailCategorieArticleComponent } from './categorie-article/detail-categorie-article/detail-categorie-article.component';
import { DataTableModule } from '../utils/data-table/data-table.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NewFournissuerComponent } from './fournisseurs/new-fournissuer/new-fournissuer.component';
import { NewEntiteComponent } from './entite-magasin/new-entite/new-entite.component';
import { NewEmplacementComponent } from './emplacements/new-emplacement/new-emplacement.component';
import { AddEntreComponent } from './entrees/add-entre/add-entre.component';
import { DetailsMagasinComponent } from './emplacements/details-magasin/details-magasin.component';
import { DetailsSorieComponent } from './sorties/details-sorie/details-sorie.component';
import { NewVigetteComponent } from './vignette/new-vigette/new-vigette.component';

@NgModule({
  declarations: [ 
    GestionStockOutletComponent,
    ArticleComponent,
    AjouterDemandeComponent,
    ValiderDemandeComponent,
    EmplacementsComponent,
    EntreesComponent,
    FournisseursComponent,
    InventaireComponent,
    ReapprovisionnementComponent,
    ReformeComponent,
    ReintegrationComponent,
    SortiesComponent,
    TransfertsComponent,
    DetailInventaireComponent,
    TableauBordStockComponent,
    CategorieArticleComponent,
    DetailDemandeComponent,
    EntiteMagasinComponent,
    ValiderChefServiceComponent,
    ValiderChefLogistiqueComponent,
    ValiderChefFinanceComponent,
    QuantiteReapprovisionnementComponent,
    ReferenceMarcheComponent,
    ValiderChefDivisionComponent,
    ValiderDirecteurComponent,
    ModifierDemandeComponent,
    VignetteComponent,
    FicheMagasinComponent,
    NewArticleComponent,
    EditArticleComponent,
    DetailArticleComponent,
    NewCategorieArticleComponent,
    EditCategorieArticleComponent,
    DetailCategorieArticleComponent,
    NewFournissuerComponent,
    NewEntiteComponent,
    NewEmplacementComponent,
    AddEntreComponent,
    DetailsMagasinComponent,
    DetailsSorieComponent,
    NewVigetteComponent,
   

  ],
  imports: [
    NgxMatSelectSearchModule,
    GestionStockRoutingModule,
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
	],
    providers : [
  /*     ArticleStockService,
      EntreeStockService,
      SortieService,
      ReintegrationService,
      MagasinService,
      QuantiteReapprovisionnementService,
      TransferService,
      RefernceService,
      DemandeFournitureService,
      NotificationService,
      CategorieArticleService,
      EntityMagasinService */

    ],
    

})
export class GestionStockModule {}
