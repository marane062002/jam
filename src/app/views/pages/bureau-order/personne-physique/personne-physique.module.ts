import { NgModule } from "@angular/core";
import { BureauOrderModule } from '../bureau-order.module';
import { RouterModule } from '@angular/router';
// ===========================================================
import { AddPersonnePhysiqueComponent } from "./add-personne-physique/add-personne-physique.component";
import { EditPersonnePhysiqueComponent } from "./edit-personne-physique/edit-personne-physique.component";
import { ListPersonnePhysiqueComponent } from "./list-personne-physique/list-personne-physique.component";
import { ShowPersonnePhysiqueComponent } from "./show-personne-physique/show-personne-physique.component";
import { PersonnePhysiqueComponent } from './personne-physique.component';

@NgModule({
	declarations: [
		PersonnePhysiqueComponent,
		AddPersonnePhysiqueComponent,
		EditPersonnePhysiqueComponent,
		ListPersonnePhysiqueComponent,
		ShowPersonnePhysiqueComponent,
	],
	imports: [
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: '',
				component: PersonnePhysiqueComponent,
				children: [
					{
						path: 'list-personne-physique',
						component: ListPersonnePhysiqueComponent
					},
					{
						path: 'show-personne-physique',
						component: ShowPersonnePhysiqueComponent
					},
					{
						path: 'add-personne-physique',
						component: 	AddPersonnePhysiqueComponent
					},
					{
						path: 'edit-personne-physique',
						component: EditPersonnePhysiqueComponent
					},
				]
			},
		]),],
})
export class PersonnePhysiqueModule {}
