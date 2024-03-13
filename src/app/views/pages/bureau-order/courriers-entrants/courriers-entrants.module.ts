import { MaterialsModule } from './../../utils/materials/materials.module';
import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BureauOrderModule } from '../bureau-order.module';
//===========================================================
import { CourriersEntrantsComponent } from './courriers-entrants.component';
import { ListCourriersEntrantsComponent } from './list-courriers-entrants/list-courriers-entrants.component';
import { CourriersEntrantsShowComponent } from './courriers-entrants-show/courriers-entrants-show.component';
import { AddCourriersEntrantsComponent } from './add-courriers-entrants/add-courriers-entrants.component';
import { EditCourriersEntrantsComponent } from './edit-courriers-entrants/edit-courriers-entrants.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchCourriersEntrantsComponent } from './search-courriers-entrants/search-courriers-entrants.component';
import { ScannedImageComponent } from './scanned-image/scanned-image.component';

@NgModule({
  declarations: [
	ScannedImageComponent,
	CourriersEntrantsComponent,
	ListCourriersEntrantsComponent,
	CourriersEntrantsShowComponent,
	AddCourriersEntrantsComponent,
	EditCourriersEntrantsComponent,
	DashboardComponent,
	SearchCourriersEntrantsComponent
  ],
  imports: [
	BureauOrderModule,
	RouterModule.forChild([
		{
			path: '',
			component: CourriersEntrantsComponent,
			children: [
				{
					path: 'list-courriers-entrants',
					component: ListCourriersEntrantsComponent
				},
				{
					path: 'scan',
					component: ScannedImageComponent
				},
				{
					path: 'courriers-entrants-show',
					component: CourriersEntrantsShowComponent
				},
				{
					path: 'add-courriers-entrants',
					component: AddCourriersEntrantsComponent
				},
				{
					path: 'edit-courriers-entrants',
					component: EditCourriersEntrantsComponent
				},
				{
					path: 'dashboard',
					component: DashboardComponent,
				},
				{
					path: 'search-courriers-entrants',
					component: SearchCourriersEntrantsComponent
				},
			]
		},
	]),
  ]
})
export class CourriersEntrantsModule { }
