import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddAcquisitionComponent } from "./add-acquisition/add-acquisition.component";
import { ListAcquisitionComponent } from "./list-acquisition/list-acquisition.component";
import { AcquisitionComponent } from "./acquisition.component";
import { EditAcquisitionComponent } from "./edit-acquisition/edit-acquisition.component";
import { ShowAcquisitionComponent } from "./show-acquisition/show-acquisition.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { CoreModule } from "../../../../app/core/core.module";
import { PagesModule } from "../pages.module";
import { MaterialsModule } from "../utils/materials/materials.module";

@NgModule({
	declarations: [AddAcquisitionComponent, ListAcquisitionComponent, AcquisitionComponent, ShowAcquisitionComponent, EditAcquisitionComponent],
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
				component: AcquisitionComponent,
				children: [
					{
						path: "list-acquisition",
						component: ListAcquisitionComponent,
					},
					{
						path: "add-acquisition",
						component: AddAcquisitionComponent,
					},
					{
						path: "edit-acquisition/:id",
						component: EditAcquisitionComponent,
					},
					{
						path: "show-acquisition/:id",
						component: ShowAcquisitionComponent,
					},
				],
			},
		]),
	],
})
export class AcquisitionModule {}
