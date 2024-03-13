import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesModule } from "../pages.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialsModule } from "../utils/materials/materials.module";
import { RouterModule } from "@angular/router";
// import Chart from 'chart.js/auto';
import { StatistiquesComponent } from "./statistiques.component";
import { VehiculeComponent } from "../gestion-parc-auto/parametrage/vehicules/components/vehicule.component";
import { MarchandiseEtCarreauxComponent } from "./marchandise-et-carreaux/marchandise-et-carreaux.component";
import { TransactionsGlobalesJournalieresComponent } from "./transaction-et-recettes/transactions-globales-journalieres/transactions-globales-journalieres.component";
import { CalculDixJoursComponent } from "./transaction-et-recettes/calcul-dix-jours/calcul-dix-jours.component";
import { RecettesParPeriodeEtCarreauComponent } from "./transaction-et-recettes/recettes-par-periode-et-carreau/recettes-par-periode-et-carreau.component";
import { RecettesJournalieresParCarreauComponent } from "./transaction-et-recettes/recettes-journalieres-par-carreau/recettes-journalieres-par-carreau.component";
import { TransactionEtRecettesComponent } from "./transaction-et-recettes/transaction-et-recettes.component";
import { QuantiteParSousTypeEtPeriodeComponent } from "./marchandise-et-carreaux/quantite-par-sous-type-et-periode/quantite-par-sous-type-et-periode.component";
import { QuantiteParTypeEtPeriodeComponent } from "./marchandise-et-carreaux/quantite-par-type-et-periode/quantite-par-type-et-periode.component";
import { NombreParGenreEtQuantiteComponent } from "./vehicules/nombre-par-genre-et-quantite/nombre-par-genre-et-quantite.component";
import { TransactionsComponent } from "./transaction-et-recettes/transactions/transactions.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardCarreComponent } from "./dashboard/dashboard-carre/dashboard-carre.component";
import { DashboardProduitComponent } from "./dashboard/dashboard-produit/dashboard-produit.component";
import { CoreModule } from "../../../core/core.module";
import { TransactionsModalComponent } from "./transaction-et-recettes/transactions-modal/transactions-modal.component";
import { RecettesParPeriodeEtCarreauModalComponent } from "./transaction-et-recettes/recettes-par-periode-et-carreau-modal/recettes-par-periode-et-carreau-modal.component";
import { QuantiteParSousTypeEtPeriodeModalComponent } from "./marchandise-et-carreaux/quantite-par-sous-type-et-periode-modal/quantite-par-sous-type-et-periode-modal.component";
import { QuantiteParTypeEtPeriodeModalComponent } from "./marchandise-et-carreaux/quantite-par-type-et-periode-modal/quantite-par-type-et-periode-modal.component";
import { CalculDixJoursModalComponent } from "./transaction-et-recettes/calcul-dix-jours-modal/calcul-dix-jours-modal.component";
import { NombreParGenreEtQuantiteModalComponent } from "./vehicules/nombre-par-genre-et-quantite-modal/nombre-par-genre-et-quantite-modal.component";
import { StatistiqueEtablissementComponent } from './controle-sanitaire/statistique-etablissement/statistique-etablissement.component';


@NgModule({
  declarations: [
    StatistiquesComponent,
    TransactionEtRecettesComponent,
    VehiculeComponent,
    MarchandiseEtCarreauxComponent,
    CalculDixJoursComponent,
    CalculDixJoursModalComponent,
    RecettesParPeriodeEtCarreauComponent,
    RecettesParPeriodeEtCarreauModalComponent,
    RecettesJournalieresParCarreauComponent,
    TransactionsGlobalesJournalieresComponent,
    NombreParGenreEtQuantiteComponent,
    NombreParGenreEtQuantiteModalComponent,
    QuantiteParSousTypeEtPeriodeComponent,
    QuantiteParSousTypeEtPeriodeModalComponent,
    QuantiteParTypeEtPeriodeComponent,
    QuantiteParTypeEtPeriodeModalComponent,
    QuantiteParTypeEtPeriodeComponent,
    TransactionsComponent,
    TransactionsModalComponent,
    DashboardComponent,
    DashboardCarreComponent,
    DashboardProduitComponent,
    StatistiqueEtablissementComponent
  ],

  entryComponents:[TransactionsModalComponent,NombreParGenreEtQuantiteModalComponent,CalculDixJoursModalComponent,QuantiteParTypeEtPeriodeModalComponent,QuantiteParSousTypeEtPeriodeModalComponent,RecettesParPeriodeEtCarreauModalComponent,],

  imports: [
		CoreModule,
		TranslateModule.forChild(),
		MaterialsModule,
    PagesModule,
    CommonModule,
    FormsModule,
    // ChartModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MaterialsModule,
    RouterModule.forChild([
      {
        path: "",
        component: StatistiquesComponent,
        children: [
          
          
          {
            path: "calcul-dix-jours",
            component: CalculDixJoursComponent,
          },
          {
            path: "transactions",
            component: TransactionsComponent,
          },
          {
            path: "recettes-journalieres-par-carreau",
            component: RecettesJournalieresParCarreauComponent,
          },
          {
            path: "recettes-par-periode-et-carreau",
            component: RecettesParPeriodeEtCarreauComponent,
          },
          {
            path: "quantite-par-type-et-periode",
            component: QuantiteParTypeEtPeriodeComponent,
          },
          {
            path: "quantite-par-sous-type-et-periode",
            component: QuantiteParSousTypeEtPeriodeComponent,
          },
          {
            path: "nombre-par-genre-et-quantite",
            component: NombreParGenreEtQuantiteComponent,
          },
          {
            path: "statistique-etablissement",
            component: StatistiqueEtablissementComponent,
          },
        ],
      },
    ]),
  ],
})
export class StatistiquesModule {}
