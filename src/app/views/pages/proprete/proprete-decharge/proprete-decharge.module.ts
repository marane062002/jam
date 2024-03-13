import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListDechargeComponent } from "./list-decharge/list-decharge.component";
import { PropreteDechargeComponent } from "./proprete-decharge.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../../pages.module";
import { AddDechargeComponent } from "./add-decharge/add-decharge.component";
import { EditDechargeComponent } from "./edit-decharge/edit-decharge.component";
import { EvaluerDechargeComponent } from "./evaluer-decharge/evaluer-decharge.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		PropreteDechargeComponent,
		ListDechargeComponent,
		AddDechargeComponent,
		EditDechargeComponent,
		EvaluerDechargeComponent,
	],
	imports: [
		ReactiveFormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([
			{
				path: "",
				component: PropreteDechargeComponent,
				children: [
					{
						path: "list-decharge",
						component: ListDechargeComponent,
					},
					{
						path: "add-decharge",
						component: AddDechargeComponent,
					},
					{
						path: "edit-decharge/:id",
						component: EditDechargeComponent,
					},
					{
						path: "evaluer-decharge",
						component: EvaluerDechargeComponent,
					},
				],
			},
		]),
	],
})
export class PropreteDechargeModule {}
