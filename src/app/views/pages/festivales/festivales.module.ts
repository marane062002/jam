import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddFestivalesComponent } from "./add-festivales/add-festivales.component";
import { ShowFestivalesComponent } from "./show-festivales/show-festivales.component";
import { UpdatFestivalesComponent } from "./updat-festivales/updat-festivales.component";
import { RouterModule } from "@angular/router";
import { FestivalesComponent } from "./festivales.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { CoreModule } from "./../../../core/core.module";
import { PagesModule } from "../pages.module";
import { MaterialsModule } from "./../utils/materials/materials.module";
import { ListFestivalesComponent } from "./list-festivales/list-festivales.component";

@NgModule({
	declarations: [ListFestivalesComponent, AddFestivalesComponent, ShowFestivalesComponent, UpdatFestivalesComponent,FestivalesComponent],
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
				component: FestivalesComponent,
				children: [
					{
						path: "add-festivales",
						component: AddFestivalesComponent,
					},
					{
						path: "list-festivales",
						component: ListFestivalesComponent,
					},
					{
						path: "show-festivales/:id",
						component: ShowFestivalesComponent,
					},

					{
						path: "updat-festivales/:id",
						component: UpdatFestivalesComponent,
					},
				],
			},
		]),
	],
})
export class FestivalesModule {}
