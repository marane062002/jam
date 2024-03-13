import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDemandesLicensesComponent } from './list-demandes-licenses/list-demandes-licenses.component';
import { CoreModule } from "./../../../core/core.module";
import { PagesModule } from '../pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MaterialsModule } from '../utils/materials/materials.module';
import { RouterModule } from '@angular/router';
import { DemandesComponent } from './demandes/demandes.component';
import { StatusChangeDialogComponent } from './status-change-dialog/status-change-dialog.component';
import { MatDialogModule, MatSortModule } from '@angular/material';
import { ShowDemandesLicensesComponent } from './show-demandes-licenses/show-demandes-licenses.component';
import { ListDemandesSoutienFinancierComponent } from './list-demandes-soutien-financier/list-demandes-soutien-financier.component';
import { StatusFinancierDialogComponent } from './status-financier-dialog/status-financier-dialog.component';
import { ShowDemandesSoutienFinancierComponent } from './show-demandes-soutien-financier/show-demandes-soutien-financier.component';
import { ListDemandesSoutienLogistiqueComponent } from './list-demandes-soutien-logistique/list-demandes-soutien-logistique.component';
import { ShowDemandesSoutienLogistiqueComponent } from './show-demandes-soutien-logistique/show-demandes-soutien-logistique.component';
import { StatusLogisticDialogComponent } from './status-logistic-dialog/status-logistic-dialog.component';



@NgModule({
	declarations: [ListDemandesLicensesComponent, DemandesComponent, StatusChangeDialogComponent, ShowDemandesLicensesComponent, ListDemandesSoutienFinancierComponent, StatusFinancierDialogComponent, ShowDemandesSoutienFinancierComponent, ListDemandesSoutienLogistiqueComponent, ShowDemandesSoutienLogistiqueComponent, StatusLogisticDialogComponent],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,
		MatDialogModule,
		MatSortModule,
		RouterModule.forChild([
			{
				path: "",
				component: DemandesComponent,
				children: [
					{
						path: "list-demandesLicense",
						component: ListDemandesLicensesComponent,
					},
					{
						path: "list-demandes-soutien-financiere",
						component: ListDemandesSoutienFinancierComponent,
					},
					{
						path: "show-demandesLicenses/:id",
						component: ShowDemandesLicensesComponent,
					},
					{
						path: "show-demandesLicenses/:id/:id2",
						component: ShowDemandesLicensesComponent,
					},
					{
						path: "show-demandesSoutienFinancier/:id",
						component: ShowDemandesSoutienFinancierComponent,
					},
					{
						path: "show-demandesSoutienLogistique/:id",
						component: ShowDemandesSoutienLogistiqueComponent,
					},
					{
						path: "list-demandes-soutien-logistique",
						component: ListDemandesSoutienLogistiqueComponent,
					}
				]
			}
		])],
	entryComponents: [
		StatusChangeDialogComponent,
		StatusFinancierDialogComponent ,
		StatusLogisticDialogComponent
	],
})
export class DemandesModule { }
