import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ImmobilisationGlobaleModule } from '../immobilisationGlobale.module';
// ================================================================
import { EmplacementComponent } from "./emplacement.component";
import { AddEmplacementComponent } from "./add-emplacement/add-emplacement.component";
import { EditEmplacementComponent } from "./edit-emplacement/edit-emplacement.component";
import { ListEmplacementComponent } from "./list-emplacement/list-emplacement.component";
import { ShowEmplacementComponent } from "./show-emplacement/show-emplacement.component";

@NgModule({
	declarations: [
		EmplacementComponent,
		AddEmplacementComponent,
		EditEmplacementComponent,
		ListEmplacementComponent,
		ShowEmplacementComponent
	],
	imports: [
		ImmobilisationGlobaleModule,
		RouterModule.forChild([
			{
				path: '',
				component: EmplacementComponent,
				children: [
					{
						path: 'list-emplacement',
						component: ListEmplacementComponent
					},
					{
						path: 'show-emplacement',
						component: ShowEmplacementComponent
					},
					{
						path: 'add-emplacement',
						component: AddEmplacementComponent
					},
					{
						path: 'edit-emplacement',
						component: EditEmplacementComponent
					}
				]
			}
		]),
	]
})
export class EmplacementModule {}
