import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { TravauxCommunauxModule } from '../travaux-communaux.module';
//=======================================================================
import { AddProjetUrbanismeComponent } from "./add-projet-urbanisme/add-projet-urbanisme.component";
import { EditProjetUrbanismeComponent } from "./edit-projet-urbanisme/edit-projet-urbanisme.component";
import { ListProjetUrbanismeComponent } from "./list-projet-urbanisme/list-projet-urbanisme.component";
import { ProjetUrbanismeComponent } from "./projet-urbanisme.component";
import { ShowProjetUrbanismeComponent } from "./show-projet-urbanisme/show-projet-urbanisme.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
	declarations: [
		AddProjetUrbanismeComponent,
		EditProjetUrbanismeComponent,
		ListProjetUrbanismeComponent,
		ShowProjetUrbanismeComponent,
		ProjetUrbanismeComponent,
		DashboardComponent,
	],
	imports: [
		TravauxCommunauxModule,
		RouterModule.forChild([
			{
				path: '',
				component: ProjetUrbanismeComponent,
				children: [
					{
						path: 'list-projet-urbanisme',
						component: ListProjetUrbanismeComponent,
					},
					{
						path: 'add-projet-urbanisme',
						component: AddProjetUrbanismeComponent,
					},
					{
						path: 'edit-projet-urbanisme',
						component: EditProjetUrbanismeComponent,
					},
					{
						path: 'show-projet-urbanisme/:id',
						component: ShowProjetUrbanismeComponent,
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
export class ProjetUrbanismeModule {}
