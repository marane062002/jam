import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ImmobilisationGlobaleModule } from '../immobilisationGlobale.module';
// ================================================================
import { ReformeComponent } from "./reforme.component";
import { AddReformeComponent } from "./add-reforme/add-reforme.component";
import { EditReformeComponent } from "./edit-reforme/edit-reforme.component";
import { ListReformeComponent } from "./list-reforme/list-reforme.component";
import { ShowReformeComponent } from "./show-reforme/show-reforme.component";

@NgModule({
	declarations: [
		ReformeComponent,
		AddReformeComponent,
		EditReformeComponent,
		ListReformeComponent,
		ShowReformeComponent
	],
	imports: [
		ImmobilisationGlobaleModule,
		RouterModule.forChild([
			{
				path: '',
				component: ReformeComponent,
				children: [
					{
						path: 'list-reforme',
						component: ListReformeComponent
					},
					{
						path: 'show-reforme',
						component: ShowReformeComponent
					},
					{
						path: 'add-reforme',
						component: AddReformeComponent
					},
					{
						path: 'edit-reforme',
						component: EditReformeComponent
					}
				]
			}
		]),
	]
})
export class ReformeModule {}
