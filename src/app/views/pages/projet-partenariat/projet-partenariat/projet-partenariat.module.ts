import { MaterialsModule } from './../../utils/materials/materials.module';
import { EditProjetPartenariatComponent } from "./edit-projet-partenariat/edit-projet-partenariat.component";
import { ShowProjetPartenariatComponent } from "./show-projet-partenariat/show-projet-partenariat.component";
import { ProjetPartenariatComponent } from "./projet-partenariat.component";
import { CoreModule } from "./../../../../core/core.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddProjetPartenariatComponent } from "./add-projet-partenariat/add-projet-partenariat.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PagesModule } from '../../pages.module';
@NgModule({
	declarations: [
		ProjetPartenariatComponent,
		AddProjetPartenariatComponent,
		EditProjetPartenariatComponent,
		ShowProjetPartenariatComponent,
		DashboardComponent
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
				component: ProjetPartenariatComponent,
				children: [
					{
						path: "add-projet-partenariat",
						component: AddProjetPartenariatComponent
					},
					{
						path: "show-projet-partenariat/:id",
						component: ShowProjetPartenariatComponent
					},
					{
						path: "edit-projet-partenariat",
						component: EditProjetPartenariatComponent
					},
					{
						path: "dashboard",
						component: DashboardComponent,
					},
				]
			}
		]),
	]
})
export class ProjetPartenariatModule {}
