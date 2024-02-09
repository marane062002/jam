import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcComponent } from './parc.component';
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
  MatDatepickerModule,
} from "@angular/material";
import { NgxPermissionsModule } from "ngx-permissions";
import { PersonnelModule } from "../rh/personnel/personnel.module";
import { NgbAlertConfig, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { VehiculesComponent } from './vehicules/vehicules.component';
import { AddVehiculesComponent } from './add-vehicules/add-vehicules.component';
import { MarquesComponent } from './marques/marques.component';
import { AddMarquesComponent } from './add-marques/add-marques.component';
import { AccesoireComponent } from './accesoire/accesoire.component';
import { AddAccesoireComponent } from './add-accesoire/add-accesoire.component';
import { GaragistesComponent } from './garagistes/garagistes.component';
import { AddGaragistesComponent } from './add-garagistes/add-garagistes.component';
import { CarteJawazComponent } from './carte-jawaz/carte-jawaz.component';
import { AddCarteJawazComponent } from './add-carte-jawaz/add-carte-jawaz.component';



@NgModule({
  declarations: [VehiculesComponent, AddVehiculesComponent, MarquesComponent, AddMarquesComponent, AccesoireComponent, AddAccesoireComponent, GaragistesComponent, AddGaragistesComponent, CarteJawazComponent, AddCarteJawazComponent],
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
				component: ParcComponent,
				children: [
          {
            path: "list-vehicule",
            component: VehiculesComponent,
          },
          {
            path: "add-vehicule",
            component: AddVehiculesComponent,
          },
          {
            path: "list-marque",
            component: MarquesComponent,
          },
          {
            path: "add-marque",
            component: AddMarquesComponent,
          },
          {
            path: "list-accesoire",
            component: AccesoireComponent,
          },
          {
            path: "add-accesoire",
            component: AddAccesoireComponent,
          },
          {
            path: "list-garagiste",
            component: GaragistesComponent,
          },
          {
            path: "add-garagiste",
            component: AddGaragistesComponent,
          },
          {
            path: "list-carte-jawaze",
            component: CarteJawazComponent,
          },
          {
            path: "add-carte-jawaze",
            component: AddCarteJawazComponent,
          },
          // {
					// 	path: "list-categore-article",
					// 	component: ListCategoreArticleComponent,
					// },
					// {
					// 	path: "list-vignette",
					// 	component: ListVignetteComponent,
					// },
					// {
					// 	path: "list-magasin",
					// 	component: ListMagasinComponent,
					// },
					// {
					// 	path: "ajouter-magasin",
					// 	component: AddMagasinComponent,
					// },
					// {
					// 	path: "Ajouter-vignette",
					// 	component: AddVignetteComponent,
					// },
					// {
					// 	path: "entree-stock",
					// 	component: EntreeStockComponent,
					// },
					// {
					// 	path: "referome-stock",
					// 	component: ReferomeStockComponent,
					// },
					// {
					// 	path: "rentegration-stock",
					// 	component: ReinetgrationStockComponent,
					// },
					// {
					// 	path: "detalle-magasin",
					// 	component: DetailleMagasinComponent,
					// },
					// {
					// 	path: "transfert-stock",
					// 	component: TransfertsStockComponent,
					// },
					// {
					// 	path: "sortie-stock",
					// 	component: SortieStockComponent,
					// },
					// {
					// 	path: "detalles-sortie-stock",
					// 	component: DetailleSortieStockComponent,
					// },
					// {
					// 	path: "ajouter-entree-stock",
					// 	component: AddEntreeStockComponent,
					// },
					// {
					// 	path: "list-fornisseur",
					// 	component: ListFournissuersComponent,
					// },
					// {
					// 	path: "list-organisem",
					// 	component: ListOrganismeComponent,
					// },
					// {
					// 	path: "ajouter-demande",
					// 	component: AjouterDemandeComponent,
					// },
					// {
					// 	path: "valider-demande",
					// 	component: ValiderDemandeComponent,
					// },
					// {
					// 	path: "ajouter-organisem",
					// 	component: AddOrganismeComponent,
					// },
					// {
					// 	path: "ajouter-demande",
					// 	component: AddDemandeComponent,
					// },
					// {
					// 	path: "valide-demande",
					// 	component: ValideDemandeComponent,
					// },
					// {
					// 	path: "ajouter-fornisseur",
					// 	component: AddFournissuersComponent,
					// },
					// {
					// 	path: "ajouter-categore-article",
					// 	component: AddCategoreArticleComponent,
					// },
					// {
					// 	path: "ajouter-article",
					// 	component: AddArticleComponent,
					// },
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
export class ParcModule { }
