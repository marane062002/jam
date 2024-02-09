import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatrimoineCommunalModule } from '../patrimoine-communal.module'; 

//*************************** */

import { DomaineComponent } from './domaine.component';
import { DomaineIndexComponent } from './domaine-index/domaine-index.component';
import { DomaineNewComponent } from './domaine-new/domaine-new.component';
import { DomaineShowComponent } from './domaine-show/domaine-show.component';
import { LoyerNewComponent } from './loyer-new/loyer-new.component';
import { LoyerShowComponent } from './loyer-show/loyer-show.component';
import { LigneloyerEditComponent } from './ligneloyer-edit/ligneloyer-edit.component';
import { TabLoyerComponent } from './domaine-show/tab-loyer/tab-loyer.component';
import { TabLigneloyerComponent } from './loyer-show/tab-ligneloyer/tab-ligneloyer.component';
import { TabPjsComponent } from './domaine-show/tab-pjs/tab-pjs.component';
import { TabLoyerPjsComponent } from './loyer-show/tab-loyer-pjs/tab-loyer-pjs.component';
import { LigneloyerShowComponent } from './ligneloyer-show/ligneloyer-show.component';
import { DomaineEditComponent } from './domaine-edit/domaine-edit.component';
import { LoyerEditComponent } from './loyer-edit/loyer-edit.component';

 

@NgModule({
	declarations: [DomaineComponent, DomaineIndexComponent, DomaineNewComponent, DomaineShowComponent, LoyerNewComponent, LoyerShowComponent, LigneloyerEditComponent, TabLoyerComponent, TabLigneloyerComponent, TabPjsComponent, TabLoyerPjsComponent, LigneloyerShowComponent, DomaineEditComponent, LoyerEditComponent],
	imports: [
		PatrimoineCommunalModule, 
		//*************************************	
		
		RouterModule.forChild([
			{
				path: '',
				component: DomaineComponent,
				children: [					
					{
						path: 'domaine-index',
						component: DomaineIndexComponent
					},
					{
						path: 'domaine-new',
						component: DomaineNewComponent
					},
					{
						path: 'domaine-show',
						component: DomaineShowComponent
					},
					{
						path: 'domaine-edit',
						component: DomaineEditComponent
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
					{
						path: 'ligneloyer-show',
						component: LigneloyerShowComponent
					},
				
				]
			},
		]),
		
		
	],

})
export class DomaineModule {
}
