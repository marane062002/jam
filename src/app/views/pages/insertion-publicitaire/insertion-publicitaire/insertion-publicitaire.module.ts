import { InsertionPublicitaireGlobaleModule } from '../insertion-publicitaireGlobale.module';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// ==========================================================
import { InsertionPublicitaireComponent } from "./insertion-publicitaire.component";
import { AddInsertionPublicitaireComponent } from "./add-insertion-publicitaire/add-insertion-publicitaire.component";
import { EditInsertionPublicitaireComponent } from "./edit-insertion-publicitaire/edit-insertion-publicitaire.component";
import { InsertionPublicitaireShowComponent } from "./insertion-publicitaire-show/insertion-publicitaire-show.component";
import { ListInsertionPublicitaireComponent } from "./list-insertion-publicitaire/list-insertion-publicitaire.component";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	declarations: [
		InsertionPublicitaireComponent,
		AddInsertionPublicitaireComponent,
		EditInsertionPublicitaireComponent,
		InsertionPublicitaireShowComponent,
		ListInsertionPublicitaireComponent,
		DashboardComponent,
	],
	imports: [
		InsertionPublicitaireGlobaleModule,
		RouterModule.forChild([
			{
				path: '',
				component: InsertionPublicitaireComponent,
				children: [
					{
						path: 'list-insertion-publicitaire',
						component: ListInsertionPublicitaireComponent
					},
					{
						path: 'insertion-publicitaire-show',
						component: InsertionPublicitaireShowComponent
					},
					{
						path: 'add-insertion-publicitaire',
						component: AddInsertionPublicitaireComponent
					},
					{
						path: 'edit-insertion-publicitaire',
						component: EditInsertionPublicitaireComponent
					},
					{
						path: 'dashboard',
						component: DashboardComponent,
					},
				]
			}
		]),
	],
})
export class InsertionPublicitaireModule {}
