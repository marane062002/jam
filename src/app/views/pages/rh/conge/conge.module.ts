import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RhModule } from '../rh.module';

import { CongeComponent } from './conge.component';
import { CongeIndexComponent } from './conge-index/conge-index.component';
import { CongeNewComponent } from './conge-new/conge-new.component';
import { CongeShowComponent } from './conge-show/conge-show.component';
import { CongeEditComponent } from './conge-edit/conge-edit.component';
import { CongeValidateComponent } from './conge-validate/conge-validate.component';
import { DatePipe } from '@angular/common';




@NgModule({
	declarations: [
	CongeComponent,
	CongeIndexComponent,
	CongeNewComponent,
	CongeShowComponent,
	CongeEditComponent,
	CongeValidateComponent],
	imports: [
		
		RhModule,
		//***************************************** */
		RouterModule.forChild([
			{
				path: '',
				component: CongeComponent,
				children: [					
					{
						path: 'conge-index',
						component: CongeIndexComponent
					},
					{
						path: 'conge-new',
						component: CongeNewComponent
					},
					{
						path: 'conge-show',
						component: CongeShowComponent
					},
					{
						path: 'conge-edit',
						component: CongeEditComponent
					},
					{
						path: 'conge-validate',
						component: CongeValidateComponent
					},
				
				]
			},
		]),
		
		
	],
	providers:  [DatePipe,
	]
})


export class CongeModule { }
