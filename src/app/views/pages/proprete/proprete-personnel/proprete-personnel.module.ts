import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListPersonnelComponent } from "./list-personnel/list-personnel.component";
import { PropretePersonnelComponent } from "./proprete-personnel.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../../pages.module";
import { ShowPersonnelComponent } from "./show-personnel/show-personnel.component";
import { AddRessourceComponent } from "./add-ressource/add-ressource.component";
import { EditRessourceComponent } from "./edit-ressource/edit-ressource.component";
import { AddDelegataireComponent } from './add-delegataire/add-delegataire.component';
import { EditDelegataireComponent } from './edit-delegataire/edit-delegataire.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		PropretePersonnelComponent,
		ListPersonnelComponent,
		ShowPersonnelComponent,
		AddRessourceComponent,
		EditRessourceComponent,
		AddDelegataireComponent,
		EditDelegataireComponent,
	],
	imports: [
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([
			{
				path: "",
				component: PropretePersonnelComponent,
				children: [
					{
						path: "list-personnel",
						component: ListPersonnelComponent,
					},
					{
						path: "show-personnel/:id",
						component: ShowPersonnelComponent,
					},
					{
						path: "add-ressource",
						component: AddRessourceComponent,
					},
					{
						path: "edit-ressource/:id",
						component: EditRessourceComponent,
					},
					{
						path: "edit-delegataire/:id",
						component: EditDelegataireComponent,
					},
					{
						path: "add-delegataire",
						component: AddDelegataireComponent,
					},
				],
			},
		]),
	],
})
export class PropretePersonnelModule {}
