import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BureauOrderModule } from '../bureau-order.module';
import { TopManagementComponent } from './top-management.component';
import { PagesModule } from '../../pages.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MaterialsModule } from '../../utils/materials/materials.module';

@NgModule({
	declarations: [
		TopManagementComponent
	],
	imports: [
		BureauOrderModule,
		PagesModule,
		CommonModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "top-management",
				component: TopManagementComponent,
			},
		]),
	],
})
export class TopManagementModule {}