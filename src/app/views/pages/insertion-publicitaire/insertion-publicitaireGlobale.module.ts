import { CoreModule } from './../../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesModule } from '../pages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MaterialsModule } from '../utils/materials/materials.module';

@NgModule({
	declarations: [],
	imports: [
		PagesModule,
		CommonModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,
	],
	exports: [
		PagesModule,
		CommonModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule,
		NgxPermissionsModule,
		MaterialsModule,
	],
	providers: [],
})
export class InsertionPublicitaireGlobaleModule { }
