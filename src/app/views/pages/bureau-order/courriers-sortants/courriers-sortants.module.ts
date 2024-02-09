import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BureauOrderModule } from "../bureau-order.module";
//===========================================================
import { CourriersSortantsComponent } from "./courriers-sortants.component";
import { ListCourriersSortantsComponent } from "./list-courriers-sortants/list-courriers-sortants.component";
import { CourriersSortantsShowComponent } from "./courriers-sortants-show/courriers-sortants-show.component";
import { AddCourriersSortantsComponent } from "./add-courriers-sortants/add-courriers-sortants.component";
import { EditCourriersSortantsComponent } from "./edit-courriers-sortants/edit-courriers-sortants.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
	declarations: [
		CourriersSortantsComponent,
		ListCourriersSortantsComponent,
		CourriersSortantsShowComponent,
		AddCourriersSortantsComponent,
		EditCourriersSortantsComponent,
		DashboardComponent,
	],
	imports: [
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: '',
				component: CourriersSortantsComponent,
				children: [
					{
						path: 'list-courriers-sortants',
						component: ListCourriersSortantsComponent,
					},
					{
						path: 'courriers-sortants-show',
						component: CourriersSortantsShowComponent,
					},
					{
						path: 'add-courriers-sortants',
						component: AddCourriersSortantsComponent,
					},
					{
						path: 'edit-courriers-sortants',
						component: EditCourriersSortantsComponent,
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
export class CourriersSortantsModule {}
