import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BureauOrderModule } from "../bureau-order.module";
//===========================================================
import { DestinataireCourrierComponent } from "./destinataire-courrier.component";
import { AddDestinataireCourrierComponent } from "./add-destinataire-courrier/add-destinataire-courrier.component";
import { AddDestinataireComponent } from "./add-destinataire/add-destinataire.component";
import { EditDestinataireComponent } from "./edit-destinataire/edit-destinataire.component";
import { AddDestinataireInterneComponent } from './add-destinataire-interne/add-destinataire-interne.component';
import { EditDestinataireInterneComponent } from './edit-destinataire-interne/edit-destinataire-interne.component';
import { ShowDestinataireInterneComponent } from './show-destinataire-interne/show-destinataire-interne.component';
import { AddDestinataireCourrierConvocationComponent } from "./add-destinataire-courrier-convocation/add-destinataire-courrier-convocation.component";
import { AddDestinataireCourrierConvComponent } from "./add-destinataire-courrierConv/add-destinataire-courrierConv.component";
import { EditDestinataireCourrierConvComponent } from "./edit-destinataire-courrierConv/edit-destinataire-courrierConv.component";
import { RepondreCourrierConvocationComponent } from "./repondre-courrier-convocation/repondre-courrier-convocation.component";

@NgModule({
	declarations: [
		DestinataireCourrierComponent,
		AddDestinataireCourrierComponent,
		AddDestinataireCourrierConvocationComponent,
		AddDestinataireComponent,
		AddDestinataireCourrierConvComponent,
		EditDestinataireComponent,
		EditDestinataireCourrierConvComponent,
		AddDestinataireInterneComponent,
		EditDestinataireInterneComponent,
		ShowDestinataireInterneComponent,
		RepondreCourrierConvocationComponent
	],
	imports: [
		BureauOrderModule,
		RouterModule.forChild([
			{
				path: "",
				component: DestinataireCourrierComponent,
				children: [
					{
						path: "add-destinataire-courrier",
						component: AddDestinataireCourrierComponent,
					},
					{
						path: "add-destinataire-courrier-convocation",
						component: AddDestinataireCourrierConvocationComponent,
					},
					{
						path: "add-destinataire",
						component: AddDestinataireComponent,
					},
					{
						path: "add-destinataire-courrierConv",
						component: AddDestinataireCourrierConvComponent,
					},
					{
						path: "edit-destinataire",
						component: EditDestinataireComponent,
					},
					{
						path: "edit-destinataire-courrierConv",
						component: EditDestinataireCourrierConvComponent,
					},
					// Redistribution interne des courriers par le chef de la division
					{
						path: "add-destinataire-interne",
						component: AddDestinataireInterneComponent,
					},
					{
						path: "edit-destinataire-interne",
						component: EditDestinataireInterneComponent,
					},
					{
						path: "show-destinataire-interne",
						component: ShowDestinataireInterneComponent,
					},
					{
						path: "repondre-courrier-convocation",
						component: RepondreCourrierConvocationComponent,
					},
				],
			},
		]),
	],
})
export class DestinataireCourrierModule {}
