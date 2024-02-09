import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BureauOrderModule } from '../bureau-order.module';
import { StatistiquesBOComponent } from './statistiques-bo.component';

@NgModule({
	declarations: [
		StatistiquesBOComponent
	],
	imports: [
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: "statistiques-bo",
				component: StatistiquesBOComponent,
			},
		]),
	],
})
export class StatistiquesBOModule {}