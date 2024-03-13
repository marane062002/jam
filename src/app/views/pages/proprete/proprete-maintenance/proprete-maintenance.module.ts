import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListMaintenanceComponent } from "./list-maintenance/list-maintenance.component";
import { PropreteMaintenanceComponent } from "./proprete-maintenance.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "../../pages.module";
import { AddMaintenanceComponent } from "./add-maintenance/add-maintenance.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		PropreteMaintenanceComponent,
		ListMaintenanceComponent,
		AddMaintenanceComponent,
	],
	imports: [
		ReactiveFormsModule,
		CommonModule,
		PagesModule,
		RouterModule.forChild([
			{
				path: "",
				component: PropreteMaintenanceComponent,
				children: [
					{
						path: "list-maintenance",
						component: ListMaintenanceComponent,
					},
					{
						path: "add-maintenance",
						component: AddMaintenanceComponent,
					},
				],
			},
		]),
	],
})
export class PropreteMaintenanceModule {}
