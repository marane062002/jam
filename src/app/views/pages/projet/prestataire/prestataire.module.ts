import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GestionProjetModule } from '../gestion-projet.module';

//*************************** */

import { PrestataireComponent } from './prestataire.component';
import { PrestataireIndexComponent } from './prestataire-index/prestataire-index.component';
import { PrestataireNewComponent } from './prestataire-new/prestataire-new.component';
import { PrestataireShowComponent } from './prestataire-show/prestataire-show.component';
import { PrestataireEditComponent } from './prestataire-edit/prestataire-edit.component';





@NgModule({
	declarations: [PrestataireComponent, PrestataireIndexComponent, PrestataireNewComponent, PrestataireShowComponent, PrestataireEditComponent],
	imports: [
		GestionProjetModule, 
		//*************************************	
		RouterModule.forChild([
			{
				path: '',
				component: PrestataireComponent,
				children: [					
					{
 						path: 'prestataire-index',
						component: PrestataireIndexComponent
					},
					{
						path: 'prestataire-new',
						component: PrestataireNewComponent
					},
					{
						path: 'prestataire-show',
						component: PrestataireShowComponent
					},
					{
						path: 'prestataire-edit',
						component: PrestataireEditComponent
					},
				
				]
			},
		]),
		
		
	]
})
export class PrestataireModule {
}
