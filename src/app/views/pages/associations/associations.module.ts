import { MaterialsModule } from "./../utils/materials/materials.module";
import { AssociationsComponent } from "./associations.component";
import { CoreModule } from "./../../../core/core.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddAssociationComponent } from "./add-association/add-association.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ListAssociationComponent } from "./list-association/list-association.component";
import { TranslateModule } from "@ngx-translate/core";
import { ShowAssociationComponent } from "./show-association/show-association.component";
import { TabSubventionComponent } from "./tab-subvention/tab-subvention.component";
import { TabProjetPartenariatComponent } from "./tab-projet-partenariat/tab-projet-partenariat.component";
import { TabLocauxComponent } from "./tab-locaux/tab-locaux.component";
import { TabConventionComponent } from "./tab-convention/tab-convention.component";
import { TabRestaurationComponent } from "./tab-restauration/tab-restauration.component";
import { TabHebergementComponent } from "./tab-hebergement/tab-hebergement.component";
import { TabDocumentsComponent } from "./tab-documents/tab-documents.component";
import { TabActivitesComponent } from "./tab-activites/tab-activites.component";
import { TabImpressionComponent } from "./tab-impression/tab-impression.component";
import { PagesModule } from "../pages.module";
import { NgxPermissionsModule } from "ngx-permissions";
import { AddMandatComponent } from "./add-mandat/add-mandat.component";
import { ShowMandatComponent } from "./show-mandat/show-mandat.component";
import { AddMembreComponent } from "./add-membre/add-membre.component";
import { EditAssociationComponent } from "./edit-association/edit-association.component";
import { EditMandatComponent } from "./edit-mandat/edit-mandat.component";
import { EditMembreComponent } from "./edit-membre/edit-membre.component";
import { ShowMembreComponent } from "./show-membre/show-membre.component";
import { TabDiversComponent } from "./tab-divers/tab-divers.component";
import { MandatFilterComponent } from "./mandat-filter/mandat-filter.component";
import { AddDashboardComponent } from "./add-dashboard/add-dashboard.component";
import { DashboardArrondissementComponent } from "./dashboard-arrondissement/dashboard-arrondissement.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardAssociationComponent } from './dashboard-association/dashboard-association.component';
import { DashboardAutorisationComponent } from "./dashboard-autorisation/dashboard-autorisation.component";
import { DashboardLogistiqueComponent } from "./dashboard-logistique/dashboard-logistique.component";
import { DashboardConventionComponent } from "./dashboard-convention/dashboard-convention.component";

@NgModule({
	declarations: [DashboardAssociationComponent,AssociationsComponent, AddAssociationComponent, ListAssociationComponent, ShowAssociationComponent, TabSubventionComponent, TabProjetPartenariatComponent, TabLocauxComponent, TabConventionComponent, TabRestaurationComponent, TabHebergementComponent, TabDocumentsComponent, TabActivitesComponent, TabImpressionComponent, AddMandatComponent, ShowMandatComponent, AddMembreComponent, EditAssociationComponent, EditMandatComponent, EditMembreComponent, ShowMembreComponent, TabDiversComponent, MandatFilterComponent,AddDashboardComponent,DashboardArrondissementComponent,DashboardComponent, DashboardAssociationComponent,DashboardAutorisationComponent,DashboardLogistiqueComponent,DashboardConventionComponent],
	entryComponents: [],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: AssociationsComponent,
				children: [
					{
						path: "add-association",
						component: AddAssociationComponent,
					},
					{
						path: "list-association",
						component: ListAssociationComponent,
					},
					{
						path: "add-association",
						component: AddAssociationComponent,
					},
					{
						path: "edit-association/:id",
						component: EditAssociationComponent,
					},
					{
						path: "show-association/:id",
						component: ShowAssociationComponent,
					},
					{
						path: "tab-subvention",
						component: TabSubventionComponent,
					},
					{
						path: "tab-projet-partenariat",
						component: TabSubventionComponent,
					},
					{
						path: "tab-locaux",
						component: TabLocauxComponent,
					},
					{
						path: "tab-convention",
						component: TabConventionComponent,
					},
					{
						path: "tab-restauration",
						component: TabRestaurationComponent,
					},
					{
						path: "tab-hebergement",
						component: TabHebergementComponent,
					},
					{
						path: "tab-activites",
						component: TabActivitesComponent,
					},
					{
						path: "tab-documents",
						component: TabDocumentsComponent,
					},
					{
						path: "tab-impression",
						component: TabImpressionComponent,
					},
					{
						path: "tab-divers",
						component: TabDiversComponent,
					},
					{
						path: "add-mandat/:id",
						component: AddMandatComponent,
					},
					{
						path: "edit-mandat/:id",
						component: EditMandatComponent,
					},
					{
						path: "show-mandat/:id",
						component: ShowMandatComponent,
					},
					{
						path: "add-membre/:id",
						component: AddMembreComponent,
					},
					{
						path: "edit-membre/:id",
						component: EditMembreComponent,
					},
					{
						path: "show-membre/:id",
						component: ShowMembreComponent,
					},
					{
						path: "mandat-filter",
						component: MandatFilterComponent,
					},
					{
						path: "add-dashboard",
						component: AddDashboardComponent,
					},
					{
						path: "dashboard-association",
						component: DashboardAssociationComponent,
					},
					{
						path: "dashboard-arrondissement",
						component: DashboardArrondissementComponent,
					},
					{
						path: "dashboard-autorisation",
						component: DashboardAutorisationComponent,
					},
					{
						path: "dashboard-logistique",
						component: DashboardLogistiqueComponent,
					},
					{
						path: "dashboard-convention",
						component: DashboardConventionComponent,
					},
				],
			},
		]),
	],
})
export class AssociationsModule {}
