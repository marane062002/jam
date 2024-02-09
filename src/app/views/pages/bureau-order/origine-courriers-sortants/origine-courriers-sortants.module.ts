import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BureauOrderModule } from '../bureau-order.module';
//===========================================================
import { AddOrigineCourriersSortantsComponent } from './add-origine-courriers-sortants/add-origine-courriers-sortants.component';
import { OrigineCourriersSortantsComponent } from './origine-courriers-sortants.component';
import { ShowOrigineCourriersSortantsComponent } from './show-origine-courriers-sortants/show-origine-courriers-sortants.component';
import { EditOrigineCourriersSortantsComponent } from './edit-origine-courriers-sortantts/edit-origine-courriers-sortants.component';
import { ListOrigineCourriersSortantsComponent } from './list-origine-courriers-sortants/list-origine-courriers-sortants.component';

@NgModule({
  declarations: [
	OrigineCourriersSortantsComponent,
	ShowOrigineCourriersSortantsComponent,
	EditOrigineCourriersSortantsComponent,
	ListOrigineCourriersSortantsComponent,
	AddOrigineCourriersSortantsComponent
  ],
  imports: [
	BureauOrderModule,
	RouterModule.forChild([
		{
			path: '',
			component: OrigineCourriersSortantsComponent,
			children: [
				{
					path: 'list-origine-courriers-sortants',
					component: ListOrigineCourriersSortantsComponent
				},
				{
					path: 'show-origine-courriers-sortants',
					component: ShowOrigineCourriersSortantsComponent
				},
				{
					path: 'add-origine-courriers-sortants',
					component: 	AddOrigineCourriersSortantsComponent
				},
				{
					path: 'edit-origine-courriers-sortants',
					component: EditOrigineCourriersSortantsComponent
				},
			]
		},
	]),
  ]
})
export class OrigineCourriersSortantsModule { }
