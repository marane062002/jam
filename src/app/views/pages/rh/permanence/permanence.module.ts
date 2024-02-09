import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RhModule } from '../rh.module';

//*************************** */

import { PermanenceComponent } from './permanence.component';
import { PermanenceIndexComponent } from './permanence-index/permanence-index.component';
import { PermanenceNewComponent } from './permanence-new/permanence-new.component';
import { PermanenceShowComponent } from './permanence-show/permanence-show.component';


@NgModule({
	declarations: [
		PermanenceComponent,
		PermanenceIndexComponent,
		PermanenceNewComponent,
		PermanenceShowComponent,
		
		
	],
	imports: [
		RhModule,
		
		
	//*************************************	
		RouterModule.forChild([
			{
				path: '',
				component: PermanenceComponent,
				children: [					
					{
						path: 'permanence-index',
						component: PermanenceIndexComponent
					},
					{
						path: 'permanence-new',
						component: PermanenceNewComponent
					},
					{
						path: 'permanence-show',
						component: PermanenceShowComponent
					},
				
				]
			},
		]),
		
		
	]
})
export class PermanenceModule {
}
