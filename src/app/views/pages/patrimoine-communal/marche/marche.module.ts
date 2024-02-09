import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatrimoineCommunalModule } from '../patrimoine-communal.module'; 

//*************************** */

import { MarcheComponent } from './marche.component';
import { MarcheIndexComponent } from './marche-index/marche-index.component';
import { MarcheNewComponent } from './marche-new/marche-new.component';

import { MarcheShowComponent } from './marche-show/marche-show.component';
import { MagasinEditComponent } from './magasin-edit/magasin-edit.component';
import { MagasinShowComponent } from './magasin-show/magasin-show.component';
import { LoyerNewComponent } from './loyer-new/loyer-new.component';
import { LoyerShowComponent } from './loyer-show/loyer-show.component';
import { LigneloyerNewComponent } from './ligneloyer-new/ligneloyer-new.component';
import { LigneloyerEditComponent } from './ligneloyer-edit/ligneloyer-edit.component';
import { TabMagasinsComponent } from './marche-show/tab-magasins/tab-magasins.component';
import { TabLoyerComponent } from './magasin-show/tab-loyer/tab-loyer.component';
import { TabLigneloyerComponent } from './loyer-show/tab-ligneloyer/tab-ligneloyer.component';
import { MarcheEditComponent } from './marche-edit/marche-edit.component';
import { LoyerEditComponent } from './loyer-edit/loyer-edit.component';
import { SeanceComponent } from './seanceMarche/seance.component';
import { MagasinComponent } from './magasinMarche/magasin.component';
import { ShowMagasinComponent } from './magasinMarche/magasin-show/magasin-show.component';
import { ShowSeanceComponent } from './seanceMarche/seance-show/seance-show.component';


@NgModule({
	declarations: [MarcheComponent, MarcheIndexComponent, MarcheNewComponent, MarcheShowComponent, MagasinEditComponent, MagasinShowComponent, LoyerNewComponent, LoyerShowComponent, LigneloyerNewComponent, LigneloyerEditComponent, TabMagasinsComponent, TabLoyerComponent, TabLigneloyerComponent, MarcheEditComponent, LoyerEditComponent,MagasinComponent,SeanceComponent,ShowMagasinComponent,ShowSeanceComponent],
	imports: [
		PatrimoineCommunalModule, 
		//*************************************	
		
		RouterModule.forChild([
			{
				path: '',
				component: MarcheComponent,
				children: [					
					{
						path: 'marche-index',
						component: MarcheIndexComponent
					},
					{
						path: 'marche-new',
						component: MarcheNewComponent
					},
					{
						path: 'marche-show',
						component: MarcheShowComponent
					},
					{
						path: 'marche-edit',
						component: MarcheEditComponent,
						children: [
							{
								path: "magasin",
								component: MagasinComponent,
							},
							{
								path: "seance",
								component: SeanceComponent,
							},
							{
								path: "magasin-show",
								component: ShowSeanceComponent,
							},
							{
								path: "seance-show",
								component: ShowMagasinComponent,
							},
						]
					},
					{
						path: 'magasin-edit',
						component: MagasinEditComponent
					},
					{
						path: 'magasin-show',
						component: MagasinShowComponent
					},
					{
						path: 'loyer-new',
						component: LoyerNewComponent
					},
					{
						path: 'loyer-show',
						component: LoyerShowComponent
					},
					{
						path: 'loyer-edit',
						component: LoyerEditComponent
					},
					{
						path: ':id/ligneloyer-new',
						component: LigneloyerNewComponent
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
export class MarcheModule {
}
