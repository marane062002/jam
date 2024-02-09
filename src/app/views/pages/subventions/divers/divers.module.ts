import { SubventionGlobaleModule } from "../subventionGlobale.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DiversComponent } from "./divers.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import { EditServiceComponent } from "./edit-service/edit-service.component";
import { ShowServiceComponent } from "./show-service/show-service.component";
// ============================================

@NgModule({
	declarations: [
		DiversComponent,
		AddServiceComponent,
		EditServiceComponent,
		ShowServiceComponent,
	],
	imports: [
		SubventionGlobaleModule,
		RouterModule.forChild([
			{
				path: "",
				component: DiversComponent,
				children: [
					{
						path: "add-service",
						component: AddServiceComponent,
					},
					{
						path: "edit-service/:id",
						component: EditServiceComponent,
					},
					{
						path: "show-service/:id",
						component: ShowServiceComponent,
					}
				],
			},
		]),
	],
})
export class DiversModule {}
