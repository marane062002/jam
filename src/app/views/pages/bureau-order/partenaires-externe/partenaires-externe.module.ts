import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BureauOrderModule } from '../bureau-order.module';
//===========================================================
import { AddPartenairesExterneComponent } from "./add-partenaires-externe/add-partenaires-externe.component";
import { PartenairesExterneComponent } from "./partenaires-externe.component";
import { AddDestinataireComponent } from "./add-destinataire/add-destinataire.component";
import { EditDestinataireComponent } from "./edit-destinataire/edit-destinataire.component";

@NgModule({
	declarations: [
		PartenairesExterneComponent,
		AddPartenairesExterneComponent,
		AddDestinataireComponent,
		EditDestinataireComponent,
	],
	imports: [
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: '',
				component: PartenairesExterneComponent,
				children: [
					{
						path: 'add-partenaires-externe',
						component: AddPartenairesExterneComponent,
					},
					{
						path: 'add-destinataire',
						component: AddDestinataireComponent,
					},
					{
						path: 'edit-destinataire',
						component: EditDestinataireComponent,
					},
				],
			},
		]),
	],
})
export class PartenairesExterneModule {}
