import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PagesModule } from "../pages.module";
import { MaterialsModule } from "../utils/materials/materials.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { StatisticsComponent } from "./statistics.component";
import { DecesStatsComponent } from './deces-stats/deces-stats.component';

@NgModule({
	declarations: [DashboardComponent, StatisticsComponent, DecesStatsComponent],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: StatisticsComponent,
				children: [
					{
						path: "dashboard",
						component: DashboardComponent,
					},
					{
						path: "deces",
						component: DecesStatsComponent,
					}
				],
			},
		]),
	],
})
export class StatisticsModule {}
