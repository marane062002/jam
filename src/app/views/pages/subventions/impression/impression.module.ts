import { SubventionGlobaleModule } from '../subventionGlobale.module';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
// ============================================
import { EditImpressionComponent } from './edit-impression/edit-impression.component';
import { ShowImpressionComponent } from './show-impression/show-impression.component';
import { ImpressionComponent } from './impression.component';
import { AddImpressionComponent } from './add-impression/add-impression.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { EditFournisseurComponent } from './fournisseur/edit-fournisseur/edit-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { AddTypeImpressionComponent } from './add-type-impression/add-type-impression.component';
import { EditTypeImpressionComponent } from './edit-type-impression/edit-type-impression.component';

@NgModule({
  declarations: [
	  ImpressionComponent,
	  ShowImpressionComponent,
	  EditImpressionComponent,
	  AddImpressionComponent,
	  AddFournisseurComponent,
	  EditFournisseurComponent,
	  ListFournisseurComponent,
	  AddTypeImpressionComponent,
	  EditTypeImpressionComponent
  ],
  imports: [
	  	SubventionGlobaleModule,
		RouterModule.forChild([
			{
				path: "",
				component: ImpressionComponent,
				children: [
					{
						path: "edit-impression",
						component: EditImpressionComponent
					},
					{
						path: "add-impression",
						component: AddImpressionComponent
					},
					{
						path: "show-impression/:id",
						component: ShowImpressionComponent
					},
					{
						path: "add-fournisseur",
						component: AddFournisseurComponent,
					},
					{
						path: "edit-fournisseur",
						component: EditFournisseurComponent,
					},
					{
						path: "list-fournisseur",
						component: ListFournisseurComponent,
					},
					{
						path: "add-type-impression",
						component: AddTypeImpressionComponent
					},
					{
						path: "edit-type-impression/:idType",
						component: EditTypeImpressionComponent
					},
				]
			}
		]),
  ]
})
export class ImpressionModule { }
