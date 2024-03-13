import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddTypeForfaitComponent } from './parametrage/type-forfait/add-type-forfait/add-type-forfait.component';
import { ListTypeForfaitComponent } from './parametrage/type-forfait/list-type-forfait/list-type-forfait.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { PagesModule } from '../pages.module';
import { MaterialsModule } from '../utils/materials/materials.module';
import { ShowTypeForfaitComponent } from './parametrage/type-forfait/show-type-forfait/show-type-forfait.component';



@NgModule({
	declarations: [AddTypeForfaitComponent, ListTypeForfaitComponent,ShowTypeForfaitComponent],
	imports: [
		TranslateModule.forChild(),
		PagesModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialsModule,
		MatTabsModule,
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				children: [
					{
						path: "add-type-forfait",
						component: AddTypeForfaitComponent,
					},
					{
						path: "list-type-forfait",
						component: ListTypeForfaitComponent,
					},
					{
						path: "show-type-forfait",
						component: ShowTypeForfaitComponent,
					},
				],
			},
		]),
	]
})
export class GsmLanModule { }
