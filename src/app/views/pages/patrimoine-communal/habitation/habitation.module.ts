import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatrimoineCommunalModule } from '../patrimoine-communal.module'; 

//*************************** */

import { HabitationComponent } from './habitation.component';
import { HabitationIndexComponent } from './habitation-index/habitation-index.component';
import { HabitationNewComponent } from './habitation-new/habitation-new.component';
import { HabitationShowComponent } from './habitation-show/habitation-show.component';
import { AppartementEditComponent } from './appartement-edit/appartement-edit.component';
import { AppartementShowComponent } from './appartement-show/appartement-show.component';
import { LoyerNewComponent } from './loyer-new/loyer-new.component';
import { LoyerShowComponent } from './loyer-show/loyer-show.component';
import { LigneloyerEditComponent } from './ligneloyer-edit/ligneloyer-edit.component';
import { TabAppartementComponent } from './habitation-show/tab-appartement/tab-appartement.component';
import { TabLoyerComponent } from './appartement-show/tab-loyer/tab-loyer.component';
import { TabLigneloyerComponent } from './loyer-show/tab-ligneloyer/tab-ligneloyer.component';
import { HabitationEditComponent } from './habitation-edit/habitation-edit.component';
import { LoyerEditComponent } from './loyer-edit/loyer-edit.component';






@NgModule({
	declarations: [HabitationComponent, HabitationIndexComponent, HabitationNewComponent, HabitationShowComponent, AppartementEditComponent, AppartementShowComponent, LoyerNewComponent, LoyerShowComponent, LigneloyerEditComponent, TabAppartementComponent, TabLoyerComponent,TabLigneloyerComponent, HabitationEditComponent, LoyerEditComponent],
	imports: [
		PatrimoineCommunalModule,
		//*************************************	
		RouterModule.forChild([
			{
				path: '',
				component: HabitationComponent,
				children: [					
					{
						path: 'habitation-index',
						component: HabitationIndexComponent
					},
					{
						path: 'habitation-new',
						component: HabitationNewComponent
					},
					{
						path: 'habitation-show',
						component: HabitationShowComponent
					},
					{
						path: 'habitation-edit',
						component: HabitationEditComponent

					},
				 	{
						path: 'appartement-edit',
						component: AppartementEditComponent
					},
					{
						path: 'appartement-show',
						component: AppartementShowComponent
					},
					{
						path: 'loyer-show',
						component: LoyerShowComponent
					},
					{
						path: 'loyer-new',
						component: LoyerNewComponent
					},
					{
						path: 'loyer-edit',
						component: LoyerEditComponent
					},
					
					{
						path: 'ligneloyer-edit',
						component: LigneloyerEditComponent
					},
				
				]
			},
		]),
		
	],

})
export class HabitationModule {
}
