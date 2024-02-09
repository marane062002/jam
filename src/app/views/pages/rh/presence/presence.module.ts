import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RhModule } from '../rh.module';

//*************************** */

import { PresenceComponent } from './presence.component';
import { PresenceIndexComponent } from './presence-index/presence-index.component';
import { PresenceNewComponent } from './presence-new/presence-new.component';
import { PresenceShowComponent } from './presence-show/presence-show.component';
import { PresenceEditComponent } from './presence-edit/presence-edit.component';



@NgModule({
  declarations: [
    PresenceComponent,
    PresenceIndexComponent,
    PresenceNewComponent,
    PresenceShowComponent,
    PresenceEditComponent],
    imports: [

      RhModule,
		
		
	//*************************************	
     
      RouterModule.forChild([
        {
          path: '',
          component: PresenceComponent,
          children: [					
            {
              path: 'presence-index',
              component: PresenceIndexComponent
            },
            {
              path: 'presence-new',
              component: PresenceNewComponent
            },
            {
              path: 'presence-show',
              component: PresenceShowComponent
            },
          
          ]
        },
      ]),
      
      
    ]
})


export class PresenceModule { }
