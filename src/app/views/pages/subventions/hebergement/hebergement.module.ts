import { SubventionGlobaleModule } from '../subventionGlobale.module';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
// ============================================
import { HebergementComponent } from './hebergement.component';
import { EditHebergementComponent } from './edit-hebergement/edit-hebergement.component';
import { ShowHebergementComponent } from './show-hebergement/show-hebergement.component';
import { AddOrganismeComponent } from './organisme/add-organisme/add-organisme.component';
import { EditOrganismeComponent } from './organisme/edit-organisme/edit-organisme.component';
import { ListOrganismeComponent } from './organisme/list-organisme/list-organisme.component';
import { AddHebergementComponent } from './add-hebergement/add-hebergement.component';
import { AddTypeChambreComponent } from './add-type-chambre/add-type-chambre.component';
import { EditTypeChambreComponent } from './edit-type-chambre/edit-type-chambre.component';

@NgModule({
  declarations: [
	  HebergementComponent,
	  EditHebergementComponent,
	  ShowHebergementComponent,
	  AddOrganismeComponent,
	  EditOrganismeComponent,
	  ListOrganismeComponent,
	  AddHebergementComponent,
	  AddTypeChambreComponent,
	  EditTypeChambreComponent
  ],
  imports: [
		SubventionGlobaleModule,
		RouterModule.forChild([
			{
				path: "",
				component: HebergementComponent,
				children: [
					{
						path: "add-hebergement",
						component: AddHebergementComponent
					},
					{
						path: "edit-hebergement/:id",
						component: EditHebergementComponent
					},
					{
						path: "show-hebergement/:id",
						component: ShowHebergementComponent
					},
					{
						path: "list-organisme",
						component: ListOrganismeComponent
					},
					{
						path: "add-organisme",
						component: AddOrganismeComponent
					},
					{
						path: "edit-organisme",
						component: EditOrganismeComponent
					},
					{
						path: "add-type-chambre",
						component: AddTypeChambreComponent
					},
					{
						path: "edit-type-chambre/:idType",
						component: EditTypeChambreComponent
					},
				]
			}
		]),
  ]
})
export class HebergementModule { }
