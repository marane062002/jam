import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TranslateModule } from "@ngx-translate/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../pages.module";
import { MaterialsModule } from "../utils/materials/materials.module";
import { AddLogistiqueComponent } from "./add-logistique/add-logistique.component";
import { ListLogistiqueComponent } from "./list-logistique/list-logistique.component";
import { LogistiqueComponent } from "./logistique.component";
import { CoreModule } from "../../../../app/core/core.module";
import { ShowLogistiqueComponent } from "./show-logistique/show-logistique.component";
import { EditLogistiqueComponent } from "./edit-logistique/edit-logistique.component";

@NgModule({
	declarations: [AddLogistiqueComponent, ListLogistiqueComponent, LogistiqueComponent, ShowLogistiqueComponent, EditLogistiqueComponent],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: LogistiqueComponent,
				children: [
					{
						path: "list-logistique",
						component: ListLogistiqueComponent,
					},
					{
						path: "add-logistique",
						component: AddLogistiqueComponent,
					},
					{
						path: "edit-logistique/:id",
						component: EditLogistiqueComponent,
					},
					{
						path: "show-logistique/:id",
						component: ShowLogistiqueComponent,
					},
				],
			},
		]),
	],
})
export class LogistiqueModule {}
