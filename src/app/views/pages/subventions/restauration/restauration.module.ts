import { SubventionGlobaleModule } from "../subventionGlobale.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// ============================================
import { EditRestaurationComponent } from "./edit-restauration/edit-restauration.component";
import { ShowRestaurationComponent } from "./show-restauration/show-restauration.component";
import { RestaurationComponent } from "./restauration.component";
import { AddFournisseurRestoComponent } from "./fournisseur-resto/add-fournisseur-resto/add-fournisseur-resto.component";
import { EditFournisseurRestoComponent } from "./fournisseur-resto/edit-fournisseur-resto/edit-fournisseur-resto.component";
import { ListFournisseurRestoComponent } from "./fournisseur-resto/list-fournisseur-resto/list-fournisseur-resto.component";
import { AddRestaurationComponent } from './add-restauration/add-restauration.component';
import { AddTypePlatComponent } from './add-type-plat/add-type-plat.component';
import { EditTypePlatComponent } from './edit-type-plat/edit-type-plat.component';
@NgModule({
	declarations: [
		RestaurationComponent,
		EditRestaurationComponent,
		ShowRestaurationComponent,
		AddFournisseurRestoComponent,
		EditFournisseurRestoComponent,
		ListFournisseurRestoComponent,
		AddRestaurationComponent,
		AddTypePlatComponent,
		EditTypePlatComponent,
	],
	imports: [
		SubventionGlobaleModule,
		RouterModule.forChild([
			{
				path: "",
				component: RestaurationComponent,
				children: [
					{
						path: "add-restauration",
						component: AddRestaurationComponent,
					},
					{
						path: "edit-restauration",
						component: EditRestaurationComponent,
					},
					{
						path: "show-restauration/:id",
						component: ShowRestaurationComponent,
					},
					{
						path: "add-fournisseur-resto",
						component: AddFournisseurRestoComponent,
					},
					{
						path: "edit-fournisseur-resto",
						component: EditFournisseurRestoComponent,
					},
					{
						path: "list-fournisseur-resto",
						component: ListFournisseurRestoComponent,
					},
					{
						path: "add-type-plat",
						component: AddTypePlatComponent,
					},
					{
						path: "edit-type-plat/:idType",
						component: EditTypePlatComponent,
					},
				],
			},
		]),
	],
})
export class RestaurationModule {}
