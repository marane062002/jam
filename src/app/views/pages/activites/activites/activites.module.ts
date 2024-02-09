import { MaterialsModule } from './../../utils/materials/materials.module';
import { ActivitesComponent } from "./activites.component";
import { CoreModule } from "./../../../../core/core.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AddActivitesComponent } from "./add-activites/add-activites.component";
import { ShowActivitesComponent } from "./show-activites/show-activites.component";
import { EditActivitesComponent } from "./edit-activites/edit-activites.component";
import { AddActivitesCommuneComponent } from "./add-activites-commune/add-activites-commune.component";
import { EditActivitesCommuneComponent } from "./edit-activites-commune/edit-activites-commune.component";
import { ShowActivitesCommuneComponent } from "./show-activites-commune/show-activites-commune.component";
import { ListActivitesCommuneComponent } from "./list-activites-commune/list-activites-commune.component";
import { NgxPermissionsModule } from 'ngx-permissions';
import { PagesModule } from '../../pages.module';
import { ListPersonneMoraleComponent } from './Personne-morale/list-personne-morale/list-personne-morale.component';
import { AddPersonneMoraleComponent } from './Personne-morale/add-personne-morale/add-personne-morale.component';
import { EditPersonneMoraleComponent } from './Personne-morale/edit-personne-morale/edit-personne-morale.component';
import { ShowPersonneMoraleComponent } from './Personne-morale/show-personne-morale/show-personne-morale.component'; 

@NgModule({
	declarations: [
		AddActivitesComponent,
		ShowActivitesComponent,
		EditActivitesComponent,
		ActivitesComponent,
		AddActivitesCommuneComponent,
		EditActivitesCommuneComponent,
		ShowActivitesCommuneComponent,
		ListActivitesCommuneComponent,
		ListPersonneMoraleComponent,
		AddPersonneMoraleComponent,
		EditPersonneMoraleComponent,
		ShowPersonneMoraleComponent,
		/*TabSubventionComponent,
		TabHebergementComponent,
		TabRestaurationComponent,
		TabImpressionComponent,
		TabConventionComponent,
		TabActivitesComponent,
		TabLocauxComponent,
		TabDocumentsComponent */



	],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule.forChild(),
		MaterialsModule,
		NgxPermissionsModule.forChild(),
		RouterModule.forChild([
			{
				path: "",
				component: ActivitesComponent,
				children: [
					{
						path: "add-activites",
						component: AddActivitesComponent
					},
					{
						path: "edit-activites",
						component: EditActivitesComponent
					},
					{
						path: "show-activites/:id",
						component: ShowActivitesComponent
					},
					{
						path: "add-activites-commune",
						component: AddActivitesCommuneComponent
					},
					{
						path: "edit-activites-commune",
						component: EditActivitesCommuneComponent
					},
					{
						path: "show-activites-commune/:id",
						component: ShowActivitesCommuneComponent
					},
					{
						path: "list-activites-commune",
						component: ListActivitesCommuneComponent
					},
					{
						path: "list-personne-morale",
						component: ListPersonneMoraleComponent
					},
					{
						path: "add-personne-morale",
						component: AddPersonneMoraleComponent
					},
					{
						path: "edit-personne-morale/:id",
						component: EditPersonneMoraleComponent
					},
					{
						path: "show-personne-morale/:id",
						component: ShowPersonneMoraleComponent
					},/*
					{
						path: "tab-subvention",
						component: TabSubventionComponent
					},
					{
						path: "tab-hebergement",
						component: TabHebergementComponent
					},
					{
						path: "tab-restauration",
						component: TabRestaurationComponent
					},
					{
						path: "tab-impression",
						component: TabImpressionComponent
					},

					{
						path: "tab-convention",
						component: TabConventionComponent
					},
					{
						path: "tab-activites",
						component: TabActivitesComponent
					},
					{
						path: "tab-locaux",
						component: TabLocauxComponent
					},
					{
						path: "tab-documents",
						component: TabDocumentsComponent
					}*/



				]
			}
		]),
	]
})
export class ActivitesModule {}
