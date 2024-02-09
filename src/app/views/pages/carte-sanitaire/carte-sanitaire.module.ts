import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PagesModule } from "../pages.module";
import { MaterialsModule } from "../utils/materials/materials.module";
import { ViewCarteComponent } from "./view-carte/view-carte.component";
import { CarteSanitaireComponent } from "./carte-sanitaire.component";
import { ListCarteComponent } from "./list-carte/list-carte.component";
import { UpdCarteComponent } from "./upd-carte/upd-carte.component";
import { DetailleCarteComponent } from "./detaille-carte/detaille-carte.component";
import { MatStepperModule } from "@angular/material";

@NgModule({
	declarations: [
		CarteSanitaireComponent,
		ViewCarteComponent,
		ListCarteComponent,
		UpdCarteComponent,
		DetailleCarteComponent,
	],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		MatStepperModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: CarteSanitaireComponent,
				children: [
					{
						path: "view-carte",
						component: ViewCarteComponent,
					},
					{
						path: "list-carte",
						component: ListCarteComponent,
					},
					{
						path: "upd-carte/:id",
						component: UpdCarteComponent,
					},
					{
						path: "detaille-carte/:id",
						component: DetailleCarteComponent,
					},
				],
			},
		]),
	],
})
export class CarteSanitaireModule {}
