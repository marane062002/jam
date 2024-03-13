import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListReclamationsComponent } from "./list-reclamations/list-reclamations.component";
import { ListPenalitesComponent } from "./list-penalites/list-penalites.component";
import { PropreteReclamationsPenalitesComponent } from "./proprete-reclamations-penalites.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../../pages.module";
import { AddReclamationComponent } from "./add-reclamation/add-reclamation.component";
import { AddPenaliteComponent } from "./add-penalite/add-penalite.component";
import { EditReclamationComponent } from "./edit-reclamation/edit-reclamation.component";
import { EditPenaliteComponent } from "./edit-penalite/edit-penalite.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShowPenaliteComponent } from './show-penalite/show-penalite.component';

@NgModule({
	declarations: [
		PropreteReclamationsPenalitesComponent,
		ListReclamationsComponent,
		ListPenalitesComponent,
		AddReclamationComponent,
		AddPenaliteComponent,
		EditReclamationComponent,
		EditPenaliteComponent,
		ShowPenaliteComponent,
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([
			{
				path: "",
				component: PropreteReclamationsPenalitesComponent,
				children: [
					{
						path: "list-reclamations",
						component: ListReclamationsComponent,
					},
					{
						path: "add-reclamation",
						component: AddReclamationComponent,
					},
					{
						path: "edit-reclamation/:id",
						component: EditReclamationComponent,
					},
					{
						path: "list-penalites",
						component: ListPenalitesComponent,
					},
					{
						path: "add-penalite",
						component: AddPenaliteComponent,
					},
					{
						path: "edit-penalite/:id",
						component: EditPenaliteComponent,
					},
					{
						path: "show-penalite/:id",
						component: ShowPenaliteComponent,
					},
				],
			},
		]),
	],
})
export class PropreteReclamationsPenalitesModule {}
