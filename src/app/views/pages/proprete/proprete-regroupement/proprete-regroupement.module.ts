import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListRegroupementComponent } from "./list-regroupement/list-regroupement.component";
import { PropreteRegroupementComponent } from "./proprete-regroupement.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../../pages.module";
import { AddRegroupementComponent } from "./add-regroupement/add-regroupement.component";
import { EditRegroupementComponent } from "./edit-regroupement/edit-regroupement.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		PropreteRegroupementComponent,
		ListRegroupementComponent,
		AddRegroupementComponent,
		EditRegroupementComponent,
	],
	imports: [
		ReactiveFormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([
			{
				path: "",
				component: PropreteRegroupementComponent,
				children: [
					{
						path: "list-regroupement",
						component: ListRegroupementComponent,
					},
					{
						path: "add-regroupement",
						component: AddRegroupementComponent,
					},
					{
						path: "edit-regroupement/:id",
						component: EditRegroupementComponent,
					},
				],
			},
		]),
	],
})
export class PropreteRegroupementModule {}
