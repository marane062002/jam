import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CentreTransfertComponent } from "./centre-transfert/centre-transfert.component";
import { PropreteTransfertComponent } from "./proprete-transfert.component";
import { RouterModule } from "@angular/router";

import { AddCentreComponent } from "./add-centre/add-centre.component";
import { EditCentreComponent } from "./edit-centre/edit-centre.component";
import { AddDechargeComponent } from "./add-decharge/add-decharge.component";
import { PagesModule } from "../../pages.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		PropreteTransfertComponent,
		CentreTransfertComponent,
		AddCentreComponent,
		EditCentreComponent,
		AddDechargeComponent,
	],
	imports: [
		ReactiveFormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([
			{
				path: "",
				component: PropreteTransfertComponent,
				children: [
					{
						path: "centre-transfert",
						component: CentreTransfertComponent,
					},
					{
						path: "add-centre",
						component: AddCentreComponent,
					},
					{
						path: "add-decharge",
						component: AddDechargeComponent,
					},
					{
						path: "edit-centre/:id",
						component: EditCentreComponent,
					},
				],
			},
		]),
	],
})
export class PropreteTransfertModule {}
