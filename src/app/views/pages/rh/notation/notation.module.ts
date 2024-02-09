import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RhModule } from '../rh.module';

import { NotationComponent } from './notation.component';
import { NotationIndexComponent } from './notation-index/notation-index.component';
import { NotationNewComponent } from './notation-new/notation-new.component';
import { NotationShowComponent } from './notation-show/notation-show.component';
import { CompagneIndexComponent } from './compagne-index/compagne-index.component';
import { CompagneNewComponent } from './compagne-new/compagne-new.component';




@NgModule({
  declarations: [
    NotationComponent, NotationIndexComponent, NotationNewComponent, NotationShowComponent, CompagneIndexComponent, CompagneNewComponent],
    imports: [
      RhModule,

      //*************************************** */
      RouterModule.forChild([
        {
          path: '',
          component: NotationComponent,
          children: [					
            {
              path: 'notation-index',
              component: NotationIndexComponent
            },
            {
              path: 'notation-new',
              component: NotationNewComponent
            },
            {
              path: 'notation-show',
              component: NotationShowComponent
            },
            {
              path: 'compagne-index',
              component: CompagneIndexComponent
            },
            {
              path: 'compagne-new',
              component: CompagneNewComponent
            },
          
          ]
        },
      ]),
      
      
    ]
})
export class NotationModule { }
