import { SubventionGlobaleModule } from "../subventionGlobale.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// ============================================
import { SubventionsComponent } from "./subventions.component";
import { AddSubventionsComponent } from "./add-subventions/add-subventions.component";
import { EditSubventionsComponent } from "./edit-subventions/edit-subventions.component";
import { ShowSubventionsComponent } from "./show-subventions/show-subventions.component";
import { ListSubventionsComponent } from "./list-subventions/list-subventions.component";

@NgModule({
	declarations: [ListSubventionsComponent, AddSubventionsComponent, SubventionsComponent, EditSubventionsComponent, ShowSubventionsComponent],
	imports: [
		SubventionGlobaleModule,
		RouterModule.forChild([
			{
				path: "",
				component: SubventionsComponent,
				children: [
					{
						path: "list-subventions",
						component: ListSubventionsComponent,
					},
					{
						path: "add-subventions",
						component: AddSubventionsComponent,
					},
					{
						path: "edit-subventions/:id",
						component: EditSubventionsComponent,
					},
					{
						path: "show-subventions/:id",
						component: ShowSubventionsComponent,
					},
				],
			},
		]),
	],
})
export class SubventionsModule {}
