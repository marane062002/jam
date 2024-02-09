import { CoreModule } from "./../../../core/core.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesModule } from "../pages.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { MaterialsModule } from "../utils/materials/materials.module";
import { PdfviewerDialogComponent } from './dialog/pdfviewer-dialog/pdfviewer-dialog.component';
import { StatistiqueComponent } from './statistique/statistique.component';

@NgModule({
	declarations: [PdfviewerDialogComponent],
	imports: [
		PagesModule,
		CommonModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,
	],
	entryComponents: [PdfviewerDialogComponent],
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
export class BureauOrderModule {}
