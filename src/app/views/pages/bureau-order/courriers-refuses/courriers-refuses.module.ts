import { NgModule } from "@angular/core";
import { BureauOrderModule } from "../bureau-order.module";
import { RouterModule } from "@angular/router";
// ============================================================
import { ListCourriersRefusesComponent } from "./list-courriers-refuses/list-courriers-refuses.component";
import { CourriersRefusesComponent } from "./courriers-refuses.component";
import { ShowCourriersRefusesComponent } from "./show-courriers-refuses/show-courriers-refuses.component";

@NgModule({
	declarations: [
		CourriersRefusesComponent,
		ListCourriersRefusesComponent,
		ShowCourriersRefusesComponent,
	],
	imports: [
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: "",
				component: CourriersRefusesComponent,
				children: [
					{
						path: "list-courriers-refuses",
						component: ListCourriersRefusesComponent,
					},
					{
						path: "show-courriers-refuses",
						component: ShowCourriersRefusesComponent,
					},
				],
			},
		]),
	],
})
export class CourriersRefusesModule {}
