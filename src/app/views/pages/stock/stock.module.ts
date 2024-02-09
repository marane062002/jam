// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Metronic
import { PartialsModule } from "../../partials/partials.module";
import { CoreModule } from "../../../core/core.module";

import { MatCheckboxModule } from "@angular/material/checkbox";
import {
	MatAutocompleteModule,
	MatNativeDateModule,
	MatFormFieldModule,
	MatInputModule,
	MatRadioModule,
	MatButtonModule,
	MatCardModule,
	MatChipsModule,
	MatSelectModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatIconModule,
	MatSliderModule,
	MatPaginatorModule,
	MatSortModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatStepperModule,
	MatToolbarModule,
	MatDividerModule,
	MatTabsModule,
	MatTableModule,
	MatTooltipModule,
	MatListModule,
	MatGridListModule,
	MatButtonToggleModule,
	MatBottomSheetModule,
	MatExpansionModule,
	MatMenuModule,
	MatTreeModule,
} from "@angular/material";
import { NgxPermissionsModule } from "ngx-permissions";
import { PersonnelModule } from "../rh/personnel/personnel.module";
import { NgbAlertConfig, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { StockComponent } from "./stock.component";
import { ArticleComponent } from './article/article.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ListCategoreArticleComponent } from './list-categore-article/list-categore-article.component';
import { AddCategoreArticleComponent } from './add-categore-article/add-categore-article.component';
import { ListFournissuersComponent } from './list-fournissuers/list-fournissuers.component';
import { ListMagasinComponent } from './list-magasin/list-magasin.component';
import { ListOrganismeComponent } from './list-organisme/list-organisme.component';
import { AddOrganismeComponent } from './add-organisme/add-organisme.component';
import { AddMagasinComponent } from './add-magasin/add-magasin.component';
import { AddFournissuersComponent } from './add-fournissuers/add-fournissuers.component';
import { ListVignetteComponent } from './list-vignette/list-vignette.component';
import { AddVignetteComponent } from './add-vignette/add-vignette.component';
import { EditVignetteComponent } from './edit-vignette/edit-vignette.component';
import { ShowVignetteComponent } from './show-vignette/show-vignette.component';
import { AddDemandeComponent } from './add-demande/add-demande.component';
import { ValideDemandeComponent } from './valide-demande/valide-demande.component';
import { AjouterDemandeComponent } from './ajouter-demande/ajouter-demande.component';
import { ValiderDemandeComponent } from './valider-demande/valider-demande.component';
import { EntreeStockComponent } from './entree-stock/entree-stock.component';
import { AddEntreeStockComponent } from './add-entree-stock/add-entree-stock.component';
import { SortieStockComponent } from './sortie-stock/sortie-stock.component';
import { DetailleSortieStockComponent } from './detaille-sortie-stock/detaille-sortie-stock.component';
import { TransfertsStockComponent } from './transferts-stock/transferts-stock.component';
import { ReferomeStockComponent } from './referome-stock/referome-stock.component';
import { ReinetgrationStockComponent } from './reinetgration-stock/reinetgration-stock.component';
import { ReintigrationComponent } from './reintigration/reintigration.component';
import { DetailleMagasinComponent } from './detaille-magasin/detaille-magasin.component';


@NgModule({
    declarations:[ArticleComponent, AddArticleComponent, ListCategoreArticleComponent, AddCategoreArticleComponent, ListFournissuersComponent, ListMagasinComponent, ListOrganismeComponent, AddOrganismeComponent, AddMagasinComponent, AddFournissuersComponent, ListVignetteComponent, AddVignetteComponent, EditVignetteComponent, ShowVignetteComponent, AddDemandeComponent, ValideDemandeComponent, AjouterDemandeComponent, ValiderDemandeComponent, EntreeStockComponent, AddEntreeStockComponent, SortieStockComponent, DetailleSortieStockComponent, TransfertsStockComponent, ReferomeStockComponent, ReinetgrationStockComponent, ReintigrationComponent, DetailleMagasinComponent],
    imports: [
		PersonnelModule,
		CommonModule,
		FormsModule,
		NgbModule,
		MatDatepickerModule,
		ReactiveFormsModule,
		PartialsModule,
		CoreModule,
		TranslateModule.forChild(),
		RouterModule.forChild([
			{
				path: "",
				component: StockComponent,
				children: [
					{
						path: "list-article",
						component: ArticleComponent,
					},
					{
						path: "list-categore-article",
						component: ListCategoreArticleComponent,
					},
					{
						path: "list-vignette",
						component: ListVignetteComponent,
					},
					{
						path: "list-magasin",
						component: ListMagasinComponent,
					},
					{
						path: "ajouter-magasin",
						component: AddMagasinComponent,
					},
					{
						path: "Ajouter-vignette",
						component: AddVignetteComponent,
					},
					{
						path: "entree-stock",
						component: EntreeStockComponent,
					},
					{
						path: "referome-stock",
						component: ReferomeStockComponent,
					},
					{
						path: "rentegration-stock",
						component: ReinetgrationStockComponent,
					},
					{
						path: "detalle-magasin",
						component: DetailleMagasinComponent,
					},
					{
						path: "transfert-stock",
						component: TransfertsStockComponent,
					},
					{
						path: "sortie-stock",
						component: SortieStockComponent,
					},
					{
						path: "detalles-sortie-stock",
						component: DetailleSortieStockComponent,
					},
					{
						path: "ajouter-entree-stock",
						component: AddEntreeStockComponent,
					},
					{
						path: "list-fornisseur",
						component: ListFournissuersComponent,
					},
					{
						path: "list-organisem",
						component: ListOrganismeComponent,
					},
					{
						path: "ajouter-demande",
						component: AjouterDemandeComponent,
					},
					{
						path: "valider-demande",
						component: ValiderDemandeComponent,
					},
					{
						path: "ajouter-organisem",
						component: AddOrganismeComponent,
					},
					{
						path: "ajouter-demande",
						component: AddDemandeComponent,
					},
					{
						path: "valide-demande",
						component: ValideDemandeComponent,
					},
					{
						path: "ajouter-fornisseur",
						component: AddFournissuersComponent,
					},
					{
						path: "ajouter-categore-article",
						component: AddCategoreArticleComponent,
					},
					{
						path: "ajouter-article",
						component: AddArticleComponent,
					},
				],
			},
		]),
		MatFormFieldModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatBottomSheetModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		CoreModule,
		CommonModule,
		MatRadioModule,
		MatTreeModule,
		MatButtonToggleModule,
		PartialsModule,
		FormsModule,
		MatInputModule,
		NgxPermissionsModule.forChild(),
	],

providers: [NgbAlertConfig],
})
export class stockModule {}