import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ImmobilisationGlobaleModule } from '../immobilisationGlobale.module';
// ================================================================
import { ImmobilisationComponent } from "./immobilisation.component";
import { AddImmobilisationComponent } from "./add-immobilisation/add-immobilisation.component";
import { EditImmobilisationComponent } from "./edit-immobilisation/edit-immobilisation.component";
import { ListImmobilisationComponent } from "./list-immobilisation/list-immobilisation.component";
import { ShowImmobilisationComponent } from "./show-immobilisation/show-immobilisation.component";
import { AddToReformeComponent } from "./add-to-reforme/add-to-reforme.component";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	declarations: [
		ImmobilisationComponent,
		AddImmobilisationComponent,
		EditImmobilisationComponent,
		ListImmobilisationComponent,
		ShowImmobilisationComponent,
		AddToReformeComponent,
		DashboardComponent
	],
	imports: [
		ImmobilisationGlobaleModule,
		RouterModule.forChild([
			{
				path: '',
				component: ImmobilisationComponent,
				children: [
					{
						path: 'list-immobilisation',
						component: ListImmobilisationComponent
					},
					{
						path: 'show-immobilisation',
						component: ShowImmobilisationComponent
					},
					{
						path: 'add-immobilisation',
						component: AddImmobilisationComponent
					},
					{
						path: 'edit-immobilisation',
						component: EditImmobilisationComponent
					},
					{
						path: 'add-to-reforme',
						component: AddToReformeComponent,
					},
					{
						path: 'dashboard',
						component: DashboardComponent,
					},
				]
			}
		]),
	]
})
export class ImmobilisationModule {}
