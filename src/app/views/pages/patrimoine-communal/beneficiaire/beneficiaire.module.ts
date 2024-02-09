import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatrimoineCommunalModule } from '../patrimoine-communal.module';

import { BeneficiaireComponent } from './beneficiaire.component';
import { BeneficiaireIndexComponent } from './beneficiaire-index/beneficiaire-index.component';
import { BeneficiaireNewComponent } from './beneficiaire-new/beneficiaire-new.component';
import { BeneficiaireEditComponent } from './beneficiaire-edit/beneficiaire-edit.component';
import { BeneficiaireShowComponent } from './beneficiaire-show/beneficiaire-show.component';


@NgModule({
  declarations: [BeneficiaireComponent, BeneficiaireIndexComponent, BeneficiaireNewComponent, BeneficiaireEditComponent, BeneficiaireShowComponent],
  imports: [
    PatrimoineCommunalModule,


    RouterModule.forChild([
			{
				path: '',
				component: BeneficiaireComponent,
				children: [					
					{
						path: 'beneficiaire-index',
						component: BeneficiaireIndexComponent
					},
					{
						path: 'beneficiaire-new',
						component: BeneficiaireNewComponent
					},
					{
						path: 'beneficiaire-show',
						component: BeneficiaireShowComponent
					},
					{
						path: 'beneficiaire-edit',
						component: BeneficiaireEditComponent
					},
					
				]
			},
    ]),
    
  ]
})
export class BeneficiaireModule { 
}
