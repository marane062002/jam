import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BureauOrderModule } from '../bureau-order.module';
//===========================================================
import { PersonnelCourriersComponent } from "./personnel-courriers.component";
import { ShowCourriersComponent } from "./show-courriers/show-courriers.component";
import { TabCourrierEntrantsComponent } from "./tab-courrier-entrants/tab-courrier-entrants.component";
import { TabCourrierSortantsComponent } from "./tab-courrier-sortants/tab-courrier-sortants.component";
import { TabCourrierRefuseComponent } from './tab-courrier-refuse/tab-courrier-refuse.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../../../../core/auth';
import { TabCourrierConvocationsComponent } from './tab-courrier-convocations/tab-courrier-convocations.component';

@NgModule({
	declarations: [
		PersonnelCourriersComponent,
		ShowCourriersComponent,
		TabCourrierEntrantsComponent,
		TabCourrierSortantsComponent,
		TabCourrierRefuseComponent,
		TabCourrierConvocationsComponent
	],
	imports: [
		StoreModule.forFeature('auth', authReducer),
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: "",
				component: PersonnelCourriersComponent,
				children: [
					{
						path: "show-courriers",
						component: ShowCourriersComponent,
					},
					{
						path: "tab-courrier-entrants",
						component: TabCourrierEntrantsComponent,
					},
					{
						path: "tab-courrier-sortants",
						component: TabCourrierSortantsComponent,
					},
					{
						path: "tab-courrier-convocations",
						component: TabCourrierConvocationsComponent,
					},
				],
			},
		]),
	],
})
export class PersonnelCourriersModule {}
