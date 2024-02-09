import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RhModule } from '../rh.module';

import { PersonnelComponent } from './personnel.component';
import { PersonnelIndexComponent } from './personnel-index/personnel-index.component';
import { PersonnelNewComponent } from './personnel-new/personnel-new.component';
import { PersonnelShowComponent } from './personnel-show/personnel-show.component';
import { PersonnelEditComponent } from './personnel-edit/personnel-edit.component';
import { TabPresenceComponent } from './tab-presence/tab-presence.component';
import { TabPermanenceComponent } from './tab-permanence/tab-permanence.component';
import { TabNotationComponent } from './tab-notation/tab-notation.component';
import { TabAttestationComponent } from './tab-attestation/tab-attestation.component';


@NgModule({
	declarations: [
		PersonnelComponent,
		PersonnelIndexComponent,
		PersonnelNewComponent,
		PersonnelShowComponent,
		PersonnelEditComponent,
		
		TabPresenceComponent,
		TabPermanenceComponent,
		TabNotationComponent,
		TabAttestationComponent,
		
		
		
	],
	exports:[TabPresenceComponent,
		TabPermanenceComponent,
		TabNotationComponent,
		TabAttestationComponent],

	imports: [
		RhModule,
		//******************************** */
		RouterModule.forChild([
			{
				path: '',
				component: PersonnelComponent,
				children: [					
					{
						path: 'personnel-index',
						component: PersonnelIndexComponent
					},
					{
						path: 'personnel-new',
						component: PersonnelNewComponent
					},
					
					{
						path: 'personnel-edit',
						component: PersonnelEditComponent
					},
					
					{
						path: 'personnel-show',
						component: PersonnelShowComponent,
						
					},
					
				]
			},
		]),
		
		
	]
})
export class PersonnelModule {
}
