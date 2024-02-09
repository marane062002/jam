import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatrimoineCommunalModule } from '../patrimoine-communal.module'; 

//*************************** */

import { ToiletteComponent } from './toilette.component';
import { ToiletteIndexComponent } from './toilette-index/toilette-index.component';
import { ToiletteNewComponent } from './toilette-new/toilette-new.component';
import { ToiletteShowComponent } from './toilette-show/toilette-show.component';
import { LoyerNewComponent } from './loyer-new/loyer-new.component';
import { LoyerShowComponent } from './loyer-show/loyer-show.component';
import { LigneloyerEditComponent } from './ligneloyer-edit/ligneloyer-edit.component';
import { TabLoyerComponent } from './toilette-show/tab-loyer/tab-loyer.component';
import { TabLigneloyerComponent } from './loyer-show/tab-ligneloyer/tab-ligneloyer.component';
import { TabPjsComponent } from './toilette-show/tab-pjs/tab-pjs.component';
import { LigneloyerShowComponent } from './ligneloyer-show/ligneloyer-show.component';
import { TabLoyerPjsComponent } from './loyer-show/tab-loyer-pjs/tab-loyer-pjs.component';
import { ToiletteEditComponent } from './toilette-edit/toilette-edit.component';
import { LoyerEditComponent } from './loyer-edit/loyer-edit.component';




@NgModule({
	declarations: [ToiletteComponent, ToiletteIndexComponent, ToiletteNewComponent, ToiletteShowComponent, LoyerNewComponent, LoyerShowComponent, LigneloyerEditComponent, TabLoyerComponent, TabLigneloyerComponent, TabPjsComponent, LigneloyerShowComponent, TabLoyerPjsComponent, ToiletteEditComponent, LoyerEditComponent],
	imports: [
		PatrimoineCommunalModule,
		//*************************************	
		
		RouterModule.forChild([
			{
				path: '',
				component: ToiletteComponent,
				children: [					
					{
						path: 'toilette-index',
						component: ToiletteIndexComponent
					},
					{
						path: 'toilette-new',
						component: ToiletteNewComponent
					},
					{
						path: 'toilette-show',
						component: ToiletteShowComponent
					},
					{
						path:'toilette-edit',
						component: ToiletteEditComponent
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
export class ToiletteModule {
}
