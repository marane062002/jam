import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { PagesModule } from "../pages.module";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialsModule } from "../utils/materials/materials.module";
import { EnterrementComponent } from "./enterrement.component";
import { EnterrementObComponent } from "./enterrement-ob/enterrement-ob.component";
import { ListEnterrementComponent } from "./list-enterrement/list-enterrement.component";
import { UpdEnterrementComponent } from "./upd-enterrement/upd-enterrement.component";
import { DetailleEnterrementComponent } from "./detaille-enterrement/detaille-enterrement.component";

@NgModule({
	declarations: [
		EnterrementComponent,
		EnterrementObComponent,
		ListEnterrementComponent,
		UpdEnterrementComponent,
		DetailleEnterrementComponent,
	],
	imports: [
		MatStepperModule,
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: EnterrementComponent,
				children: [
					{
						path: "list-enterrement",
						component: ListEnterrementComponent,
					},
					{
						path: "upd-enterrement/:id",
						component: UpdEnterrementComponent,
					},
					{
						path: "detaille-enterrement/:id",
						component: DetailleEnterrementComponent,
					},
					{
						path: "enterement",
						component: EnterrementObComponent,
					},
				],
			},
		]),
	],
})
export class EnterrementModule {}
