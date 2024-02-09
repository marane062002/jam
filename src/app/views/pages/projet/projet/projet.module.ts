import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GestionProjetModule } from '../gestion-projet.module';

//*************************** */
import { ProjetComponent } from './projet.component';
import { ProjetIndexComponent } from './projet-index/projet-index.component';
import { ProjetNewComponent } from './projet-new/projet-new.component';
import { ProjetShowComponent } from './projet-show/projet-show.component';

import { PhaseNewComponent } from './phase/phase-new/phase-new.component';
import { PhaseIndexComponent } from './phase/phase-index/phase-index.component';
import { PhaseShowComponent } from './phase/phase-show/phase-show.component';
import { TabPhaseComponent } from './projet-show/tab-phase/tab-phase.component';
import { TabPjsComponent } from './projet-show/tab-pjs/tab-pjs.component';
import { PhaseEditComponent } from './phase/phase-edit/phase-edit.component';
import { ProjetEditComponent } from './projet-edit/projet-edit.component';
import { MaterialsModule } from '../../utils/materials/materials.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';



@NgModule({
	declarations: [
		ProjetComponent,
		ProjetIndexComponent,
		ProjetNewComponent,
		ProjetShowComponent,
		PhaseNewComponent,
		PhaseIndexComponent,
		PhaseShowComponent,
		TabPhaseComponent,
		TabPjsComponent,
		PhaseEditComponent,
		ProjetEditComponent,
		DashboardComponent
	],
	imports: [
		GestionProjetModule,
		MaterialsModule,
		FormsModule,
		//*************************************	
		RouterModule.forChild([
			{
				path: '',
				component: ProjetComponent,
				children: [
					{
						path: 'projet-index',
						component: ProjetIndexComponent
					},
					{
						path: 'projet-new',
						component: ProjetNewComponent
					},
					{
						path: 'projet-show',
						component: ProjetShowComponent
					},
					{
						path: 'projet-edit',
						component: ProjetEditComponent
					},
					{
						path: 'phase-new',
						component: PhaseNewComponent
					},
					{
						path: 'phase-show',
						component: PhaseShowComponent
					},
					{
						path: 'phase-edit',
						component: PhaseEditComponent
					},{
						path: 'dashboard',
						component: DashboardComponent
					},
				]
			},
		]),


	],

})
export class ProjetModule {
}
