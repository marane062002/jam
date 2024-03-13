import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListCircuitComponent } from "./list-circuit/list-circuit.component";
import { PropreteCircuitComponent } from "./proprete-circuit.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../../pages.module";
import { LocalisationFlotteComponent } from "./localisation-flotte/localisation-flotte.component";
import { AddCircuitComponent } from "./add-circuit/add-circuit.component";
import { EditCircuitComponent } from "./edit-circuit/edit-circuit.component";
import { EvaluationCircuitsComponent } from "./evaluation-circuits/evaluation-circuits.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		PropreteCircuitComponent,
		ListCircuitComponent,
		LocalisationFlotteComponent,
		AddCircuitComponent,
		EditCircuitComponent,
		EvaluationCircuitsComponent,
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([ 
			{
				path: "",
				component: PropreteCircuitComponent,
				children: [
					{
						path: "list-circuit",
						component: ListCircuitComponent,
					},
					{
						path: "add-circuit",
						component: AddCircuitComponent,
					},
					{
						path: "edit-circuit/:id",
						component: EditCircuitComponent,
					},
					{
						path: "localisation-flotte",
						component: LocalisationFlotteComponent,
					},
					{
						path: "evaluation-circuits",
						component: EvaluationCircuitsComponent,
					},
				],
			},
		]),
	],
})
export class PropreteCircuitModule {}
