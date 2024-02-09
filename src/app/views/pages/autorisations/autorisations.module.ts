import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AutorisationsComponent } from "./autorisations.component";
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatDialogModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatTooltipModule,
} from "@angular/material";
import { AutorisationsListComponent } from "./autorisations-list/autorisations-list.component";
import { AutorisationsEditComponent } from "./autorisations-edit/autorisations-edit.component";
import { AutorisationsDetailComponent } from "./autorisations-detail/autorisations-detail.component";
import { AutorisationsFormComponent } from "./autorisations-form/autorisations-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "../../../core/core.module";
import { RouterModule } from "@angular/router";
import { BiensFormComponent } from "./biens-form/biens-form.component";
import { BiensListComponent } from "./biens-list/biens-list.component";
import {
	NgbModule,
	NgbDropdownModule,
	NgbTabsetModule,
	NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import { AutorisationsTraitementComponent } from "./autorisations-traitement/autorisations-traitement.component";
import { BiensDetailComponent } from "./biens-detail/biens-detail.component";
import { BiensEditComponent } from "./biens-edit/biens-edit.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialsModule } from "../utils/materials/materials.module";

@NgModule({
	declarations: [
		AutorisationsComponent,
		AutorisationsListComponent,
		AutorisationsEditComponent,
		AutorisationsDetailComponent,
		AutorisationsFormComponent,
		BiensFormComponent,
		BiensListComponent,
		AutorisationsTraitementComponent,
		BiensDetailComponent,
		BiensEditComponent,
	],

	imports: [
		NgbModule,
		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialsModule,
		//PartialsModule,
		CoreModule,
		TranslateModule.forChild(),
		RouterModule.forChild([
			{
				path: "",
				component: AutorisationsComponent,
				children: [
					{
						path: "autorisation-detail",
						component: AutorisationsDetailComponent,
					},
					{
						path: "autorisation-edit",
						component: AutorisationsEditComponent,
					},
					{
						path: "autorisations-list",
						component: AutorisationsListComponent,
					},
					{
						path: "autorisation-form",
						component: AutorisationsFormComponent,
					},
					{
						path: "autorisation-traitement",
						component: AutorisationsTraitementComponent,
					},
					{
						path: "bien-form",
						component: BiensFormComponent,
					},
					{
						path: "biens-list",
						component: BiensListComponent,
					},
					{
						path: "bien-detail",
						component: BiensDetailComponent,
					},
					{
						path: "bien-edit",
						component: BiensEditComponent,
					},
				],
			},
		]),
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatSelectModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatTooltipModule,
		NgxPermissionsModule.forChild(),
	],
})
export class AutorisationsModule {}
