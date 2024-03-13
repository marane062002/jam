import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListFlotteComponent } from "./list-flotte/list-flotte.component";
import { PropreteFlotteComponent } from "./proprete-flotte.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../../pages.module";
import { AddEquipementComponent } from "./add-equipement/add-equipement.component";
import { EditEquipementComponent } from "./edit-equipement/edit-equipement.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		PropreteFlotteComponent,
		ListFlotteComponent,
		AddEquipementComponent,
		EditEquipementComponent,
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([
			{
				path: "",
				component: PropreteFlotteComponent,
				children: [
					{
						path: "list-flotte",
						component: ListFlotteComponent,
					},
					{
						path: "add-equipement",
						component: AddEquipementComponent,
					},
					{
						path: "edit-equipement/:id",
						component: EditEquipementComponent,
					},
				],
			},
		]),
	],
})
export class PropreteFlotteModule {}
