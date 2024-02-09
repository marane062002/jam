import { ConventionComponent } from "./convention.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddConventionComponent } from "./add-convention/add-convention.component";
import { ListConventionComponent } from "./list-convention/list-convention.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { EditConventionComponent } from "./edit-convention/edit-convention.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { ShowConventionComponent } from "./show-convention/show-convention.component";
import { PagesModule } from "../pages.module";
import { MaterialsModule } from "../utils/materials/materials.module";
import { CoreModule } from "../../../../app/core/core.module";

@NgModule({
	declarations: [AddConventionComponent, ListConventionComponent, ConventionComponent, ShowConventionComponent, EditConventionComponent],
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
				component: ConventionComponent,
				children: [
					{
						path: "list-convention",
						component: ListConventionComponent,
					},
					{
						path: "add-convention",
						component: AddConventionComponent,
					},
					{
						path: "edit-convention/:id",
						component: EditConventionComponent,
					},
					{
						path: "show-convention/:id",
						component: ShowConventionComponent,
					},
				],
			},
		]),
	],
})
export class ConventionModule {}
