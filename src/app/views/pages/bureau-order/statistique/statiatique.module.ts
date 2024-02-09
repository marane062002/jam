import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BureauOrderModule } from '../bureau-order.module';
import { StatistiqueComponent } from './statistique.component';

@NgModule({
	declarations: [
		StatistiqueComponent
	],
	imports: [
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: "",
				component: StatistiqueComponent,
			/* 	children: [
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
				], */
			},
		]),
	],
})
export class StatistiquesModule {}