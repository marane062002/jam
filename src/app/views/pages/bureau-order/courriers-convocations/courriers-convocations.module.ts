import { NgModule } from "@angular/core";
import { BureauOrderModule } from "../bureau-order.module";
import { RouterModule } from "@angular/router";
import { CourriersConvocationsComponent } from "./courriers-convocations.component";
import { ListCourriersConvocationsComponent } from "./list-courriers-convocations/list-courriers-convocations.component";
import { ShowCourriersConvocationsComponent } from "./show-courriers-convocations/show-courriers-convocations.component";
import { AddCourriersConvocationsComponent } from "./add-courriers-convocations/add-courriers-convocations.component";
import { EditCourriersConvocationsComponent } from "./edit-courriers-convocations/edit-courriers-convocations.component";
// ============================================================

@NgModule({
	declarations: [
		CourriersConvocationsComponent,
		ListCourriersConvocationsComponent,
		ShowCourriersConvocationsComponent,
		AddCourriersConvocationsComponent,
		EditCourriersConvocationsComponent
	],
	imports: [
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: "",
				component: CourriersConvocationsComponent,
				children: [
					{
						path: "list-courriers-convocations",
						component: ListCourriersConvocationsComponent,
					},
					{
						path: "show-courriers-convocations",
						component: ShowCourriersConvocationsComponent,
					},
					{
						path: "add-courriers-convocations",
						component: AddCourriersConvocationsComponent,
					},
					{
						path: "edit-courriers-convocations",
						component: EditCourriersConvocationsComponent,
					}
				],
			},
		]),
	],
})
export class CourriersConvocationsModule {}
