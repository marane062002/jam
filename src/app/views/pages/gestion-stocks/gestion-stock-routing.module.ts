import { DetailInventaireComponent } from './detail-inventaire/detail-inventaire.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { AjouterDemandeComponent } from './demande/ajouter-demande/ajouter-demande.component';
import { ValiderDemandeComponent } from './demande/valider-demande/valider-demande.component';
import { EmplacementsComponent } from './emplacements/emplacements.component';
import { EntreesComponent } from './entrees/entrees.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { GestionStockOutletComponent } from './gestion-stock-outlet/gestion-stock-outlet.component';
import { InventaireComponent } from './inventaire/inventaire.component';
import { ReapprovisionnementComponent } from './reapprovisionnement/reapprovisionnement.component';
import { ReformeComponent } from './Reforme/Reforme.component';
import { ReintegrationComponent } from './Reintegration/Reintegration.component';
import { SortiesComponent } from './sorties/sorties.component';
import { TransfertsComponent } from './transferts/transferts.component';
import { TableauBordStockComponent } from './tableau-bord-stock/tableau-bord-stock.component';
import { CategorieArticleComponent } from './categorie-article/categorie-article.component';
import { DetailDemandeComponent } from './demande/detail-demande/detail-demande.component';
import { EntiteMagasinComponent } from './entite-magasin/entite-magasin.component';
import { ValiderChefServiceComponent } from './demande/valider-chef-service/valider-chef-service.component';
import { ValiderChefLogistiqueComponent } from './demande/valider-chef-logistique/valider-chef-logistique.component';
import { ValiderChefFinanceComponent } from './demande/valider-chef-finance/valider-chef-finance.component';
import { QuantiteReapprovisionnement } from '../../../core/_base/layout/models/quantite-reapprovisionnement';
import { QuantiteReapprovisionnementComponent } from './quantite-reapprovisionnement/quantite-reapprovisionnement.component';
import { ReferenceMarcheComponent } from './reference-marche/reference-marche.component';
import { ValiderChefDivisionComponent } from './demande/valider-chef-division/valider-chef-division.component';
import { ValiderDirecteurComponent } from './demande/valider-directeur/valider-directeur.component';
import { ModifierDemandeComponent } from './demande/modifier-demande/modifier-demande.component';
import { VignetteComponent } from './vignette/vignette.component';
import { FicheMagasinComponent } from './etat/fiche-magasin/fiche-magasin.component';
import { NewArticleComponent } from './article/new-article/new-article.component';
import { EditArticleComponent } from './article/edit-article/edit-article.component';
import { DetailArticleComponent } from './article/detail-article/detail-article.component';
import { NewCategorieArticleComponent } from './categorie-article/new-categorie-article/new-categorie-article.component';
import { EditCategorieArticleComponent } from './categorie-article/edit-categorie-article/edit-categorie-article.component';
import { DetailCategorieArticleComponent } from './categorie-article/detail-categorie-article/detail-categorie-article.component';
import { NewFournissuerComponent } from './fournisseurs/new-fournissuer/new-fournissuer.component';
import { NewEntiteComponent } from './entite-magasin/new-entite/new-entite.component';
import { NewEmplacementComponent } from './emplacements/new-emplacement/new-emplacement.component';
import { AddEntreComponent } from './entrees/add-entre/add-entre.component';
import { DetailsMagasinComponent } from './emplacements/details-magasin/details-magasin.component';
import { DetailsSorieComponent } from './sorties/details-sorie/details-sorie.component';
import { NewVigetteComponent } from './vignette/new-vigette/new-vigette.component';

const routes: Routes = [
    {
        path: '',
        component: GestionStockOutletComponent,
        children: [
            {
                path: 'tableau-bord-stock',
                component: TableauBordStockComponent,
            },
            {
                path: 'article',
                component: ArticleComponent
            }, {
                path: 'new-article',
                component: NewArticleComponent
            },
            {
                path: 'edit-article',
                component: EditArticleComponent
            }
            , {
                path: 'detail-article',
                component: DetailArticleComponent
            },
            {
                path: 'categorie-article',
                component: CategorieArticleComponent
            },
            {
                path: 'new-categorie-article',
                component: NewCategorieArticleComponent
            },
            {
                path: 'edit-categorie-article',
                component: EditCategorieArticleComponent
            },
            {
                path: 'detail-categorie-article',
                component: DetailCategorieArticleComponent
            }
            ,{
                path: 'vignette',
                component: VignetteComponent
                
            },
            {
                path: 'new-vignette',
                component: NewVigetteComponent
                
            },
            {
                path: 'entrees-stock',
                component: EntreesComponent
            },
            {
                path: 'new-entrees-stock',
                component: AddEntreComponent
            },
            {
                path: 'sorties-stock',
                component: SortiesComponent
            },
            {
                path: 'details-sortie',
                component: DetailsSorieComponent
            },
            {
                path: 'transferts-stock',
                component: TransfertsComponent
            },
            {
                path: 'emplacements',
                component: EmplacementsComponent
            },
            {
                path: 'new-emplacement',
                component: NewEmplacementComponent
            },
            {
            path:'details-emplacement',
            component:DetailsMagasinComponent
            }
            ,{
                path: 'fournisseurs',
                component: FournisseursComponent
            },
             {
                path: 'new-fournisseur',
                component: NewFournissuerComponent
            },{
                path: 'inventaire',
                component: InventaireComponent
            },
            {
                path: 'reintegration',
                component: ReintegrationComponent
            },
            {
                path: 'reapprovisionnement',
                component: ReapprovisionnementComponent
            },
            {
                path: 'ajouter-demande',
                component: AjouterDemandeComponent
            },
            {
                path: 'detail-demande',
                component: DetailDemandeComponent
            },
              {
                path: 'validerChefDivision-demande',
                component: ValiderChefDivisionComponent
            },
            {
                path: 'modifier-demande',
                component: ModifierDemandeComponent
            },
            
            {
                path: 'validerChefService-demande',
                component: ValiderChefServiceComponent
            },{
                path: 'validerChefService-demande',
                component: ValiderChefServiceComponent
            },
            {
                path: 'validerChefLogistique-demande',
                component: ValiderChefLogistiqueComponent
            },  {
                path: 'validerDirecteur-demande',
                component: ValiderDirecteurComponent
            },
            {
                path: 'validerChefFinance-demande',
                component: ValiderChefFinanceComponent
            },
            {
                path: 'valider-demande',
                component: ValiderDemandeComponent
            },
            {
                path: 'reforme-stock',
                component: ReformeComponent
            }
            ,{
                path: 'detail-inventaire',
                component: DetailInventaireComponent
            },{
                path: 'categorie-article',
                component: CategorieArticleComponent
            },{
                path: 'entiteMagasin',
                component: EntiteMagasinComponent
            },{
                path: 'new-entite',
                component: NewEntiteComponent
            }
            ,{
                path: 'periode',
                component: QuantiteReapprovisionnementComponent
            } ,{
                path: 'reference',
                component: ReferenceMarcheComponent
            } ,{
                path: 'fiche-magasin',
                component: FicheMagasinComponent
            }
        ],
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionStockRoutingModule {}
