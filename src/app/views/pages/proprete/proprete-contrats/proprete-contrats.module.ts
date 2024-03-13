import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListContratsComponent } from "./list-contrats/list-contrats.component";
import { PropreteContratsComponent } from "./proprete-contrats.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../../pages.module";
import { AddContratComponent } from "./add-contrat/add-contrat.component";
import { EvaluerContratComponent } from "./evaluer-contrat/evaluer-contrat.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		PropreteContratsComponent,
		ListContratsComponent,
		AddContratComponent,
		EvaluerContratComponent,
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([
			{
				path: "",
				component: PropreteContratsComponent,
				children: [
					{
						path: "list-contrats",
						component: ListContratsComponent,
					},
					{
						path: "add-contrat",
						component: AddContratComponent,
					},
					{
						path: "evaluer-contrat/:id",
						component: EvaluerContratComponent,
					},
				],
			},
		]),
	],
})
export class PropreteContratsModule {}
