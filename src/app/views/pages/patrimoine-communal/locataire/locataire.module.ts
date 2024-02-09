import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatrimoineCommunalModule } from '../patrimoine-communal.module'; 

//*************************** */

import { LocataireComponent } from './locataire.component';
import { LocataireIndexComponent } from './locataire-index/locataire-index.component';
import { LocataireNewComponent } from './locataire-new/locataire-new.component';
import { LocataireShowComponent } from './locataire-show/locataire-show.component';
import { LocataireEditComponent } from './locataire-edit/locataire-edit.component';


@NgModule({
	declarations: [LocataireComponent, LocataireIndexComponent, LocataireNewComponent, LocataireShowComponent, LocataireEditComponent],
	imports: [
		PatrimoineCommunalModule,
		//*************************************	
	
		RouterModule.forChild([
			{
				path: '',
				component: LocataireComponent,
				children: [					
					{
						path: 'locataire-index',
						component: LocataireIndexComponent
					},
					{
						path: 'locataire-new',
						component: LocataireNewComponent
					},
					{
						path: 'locataire-show',
						component: LocataireShowComponent
					},
					{
						path: 'locataire-edit',
						component: LocataireEditComponent
					},
					
				]
			},
		]),
		
	
	],

})
export class LocataireModule {
}
