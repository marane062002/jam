import { MaterialsModule } from './../../utils/materials/materials.module';
import { LocauxComponent } from "./locaux.component";
import { CoreModule } from "./../../../../core/core.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AddLocauxComponent } from "./add-locaux/add-locaux.component";
import { ShowLocauxComponent } from "./show-locaux/show-locaux.component";
import { EditLocauxComponent } from "./edit-locaux/edit-locaux.component";
import { NgxPermissionsModule } from 'ngx-permissions';
import { PagesModule } from '../../pages.module';

@NgModule({
	declarations: [
		AddLocauxComponent,
		LocauxComponent,
		ShowLocauxComponent,
		EditLocauxComponent,
	],
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
				component: LocauxComponent,
				children: [
					{
						path: "add-locaux",
						component: AddLocauxComponent
					},
					{
						path: "edit-locaux",
						component: EditLocauxComponent
					},
					{
						path: "show-locaux/:id",
						component: ShowLocauxComponent
					},
				]
			}
		]),
	]
})
export class LocauxModule {}
