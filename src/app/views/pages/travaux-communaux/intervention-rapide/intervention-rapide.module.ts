import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TravauxCommunauxModule } from '../travaux-communaux.module';
//=======================================================================
import { AddInterventionRapideComponent } from "./add-intervention-rapide/add-intervention-rapide.component";
import { EditInterventionRapideComponent } from "./edit-intervention-rapide/edit-intervention-rapide.component";
import { ListInterventionRapideComponent } from "./list-intervention-rapide/list-intervention-rapide.component";
import { InterventionRapideComponent } from "./intervention-rapide.component";
import { ShowInterventionRapideComponent } from "./show-intervention-rapide/show-intervention-rapide.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
	declarations: [
		AddInterventionRapideComponent,
		EditInterventionRapideComponent,
		ListInterventionRapideComponent,
		ShowInterventionRapideComponent,
		InterventionRapideComponent,
		DashboardComponent,
	],
	imports: [
		TravauxCommunauxModule,
		RouterModule.forChild([
			{
				path: '',
				component: InterventionRapideComponent,
				children: [
					{
						path: 'list-intervention-rapide',
						component: ListInterventionRapideComponent,
					},
					{
						path: 'add-intervention-rapide',
						component: AddInterventionRapideComponent,
					},
					{
						path: 'edit-intervention-rapide',
						component: EditInterventionRapideComponent,
					},
					{
						path: 'show-intervention-rapide/:id',
						component: ShowInterventionRapideComponent,
					},
					{
						path: 'dashboard',
						component: DashboardComponent,
					},
				],
			},
		]),
	],
})
export class InterventionRapideModule {}
