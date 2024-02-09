import { MaterialsModule } from "./../utils/materials/materials.module";
import { CoreModule } from "./../../../core/core.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentAdminComponent } from "./document-admin.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { AddDocumentAdminComponent } from "./add-document-admin/add-document-admin.component";
import { EditDocumentAdminComponent } from "./edit-document-admin/edit-document-admin.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { PagesModule } from '../pages.module';

@NgModule({
	declarations: [
		DocumentAdminComponent,
		AddDocumentAdminComponent,
		EditDocumentAdminComponent,
	],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CoreModule,
		TranslateModule.forChild(),
		MaterialsModule,
		NgxPermissionsModule.forChild(),
		RouterModule.forChild([
			{
				path: "",
				component: DocumentAdminComponent,
				children: [
					{
						path: "add-document-admin",
						component: AddDocumentAdminComponent,
					},
					{
						path: "edit-document-admin",
						component: EditDocumentAdminComponent,
					},
				],
			},
		]),
	],
})
export class DocumentAdminModule {}
