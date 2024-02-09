import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesModule } from "../pages.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialsModule } from "../utils/materials/materials.module";
import { RouterModule } from "@angular/router";


import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardProduitComponent } from "./dashboard/dashboard-produit/dashboard-produit.component";
import { DashboardCarreComponent } from "./dashboard/dashboard-carre/dashboard-carre.component";
import { StatistiquesComponent } from "./statistiques1.component";
import { VehiculesssComponent } from "./vehicule/vehiculesss.component";

@NgModule({
	declarations: [
		StatistiquesComponent,
		DashboardComponent,
		DashboardProduitComponent,
		DashboardCarreComponent,
		VehiculesssComponent,
	],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: StatistiquesComponent,
				children: [
					{
						path: "dashboard",
						component: DashboardComponent,
						children: [
							{
								path: "",
								component: DashboardCarreComponent,
								outlet: "aside",
							},
							{
								path: "produit",
								component: DashboardProduitComponent,
							},
						],
					},
				],
			},
			{
				path:"vehiculesss",
				component:VehiculesssComponent
			}
		]),
	],
})
export class Statistiques1Module {}
