import { InsertionPublicitaireGlobaleModule } from '../insertion-publicitaireGlobale.module';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// ==========================================================
import { InsertionMediaComponent } from "./insertion-media.component";
import { AddInsertionMediaComponent } from "./add-insertion-media/add-insertion-media.component";
import { EditInsertionMediaComponent } from "./edit-insertion-media/edit-insertion-media.component";
import { ListInsertionMediaComponent } from "./list-insertion-media/list-insertion-media.component";
import { ShowInsertionMediaComponent } from "./show-insertion-media/show-insertion-media.component";

@NgModule({
	declarations: [
		InsertionMediaComponent,
		AddInsertionMediaComponent,
		EditInsertionMediaComponent,
		ListInsertionMediaComponent,
		ShowInsertionMediaComponent
	],
	imports: [
		InsertionPublicitaireGlobaleModule,
		RouterModule.forChild([
			{
				path: '',
				component: InsertionMediaComponent,
				children: [
					{
						path: 'list-insertion-media',
						component: ListInsertionMediaComponent
					},
					{
						path: 'show-insertion-media',
						component: ShowInsertionMediaComponent
					},
					{
						path: 'add-insertion-media',
						component: AddInsertionMediaComponent
					},
					{
						path: 'edit-insertion-media',
						component: EditInsertionMediaComponent
					}
				]
			}
		]),
	]
})
export class InsertionMediaModule {}
