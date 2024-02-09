// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LSelect2Module } from "ngx-select2";
// Metronic
//import { PartialsModule } from '../../partials/partials.module';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { CoreModule } from "../../../core/core.module";
import { ReclamationsComponent } from "./reclamations.component";
import { ReclamationsListComponent } from "./reclamations-list/reclamations-list.component";
import { ReclamationTraitementComponent } from "./reclamation-traitement/reclamation-traitement.component";
import { ReclamationDetailComponent } from "./reclamation-detail/reclamation-detail.component";
import { ReclamationsEditComponent } from "./reclamations-edit/reclamations-edit.component";
import { ReclamationsFormComponent } from "./reclamations-form/reclamations-form.component";
import { NgbAlertConfig, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
	NgbDropdownModule,
	NgbTabsetModule,
	NgbTooltipModule,
} from "@ng-bootstrap/ng-bootstrap";
import {
	MatAutocompleteModule,
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
	MatDividerModule,
} from "@angular/material";
import { NgxPermissionsModule } from "ngx-permissions";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ReclamationsComponent,
		ReclamationsListComponent,
		ReclamationDetailComponent,
		ReclamationsFormComponent,
		ReclamationsEditComponent,
		ReclamationTraitementComponent,
	],
	imports: [
		MatDividerModule,
		NgxMatSelectSearchModule,
		LSelect2Module,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		//PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: "",
				component: ReclamationsComponent,
				children: [
					{
						path: "reclamation-detail",
						component: ReclamationsListComponent,
					},
					{
						path: "reclamation-edit",
						component: ReclamationsEditComponent,
					},
					{
						path: "reclamations-list",
						component: ReclamationDetailComponent,
					},
					{
						path: "reclamations-form",
						component: ReclamationsFormComponent,
					},
					{
						path: "reclamation-traitement",
						component: ReclamationTraitementComponent,
					},
				],
			},
		]),

		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		NgbModule,
		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
		NgxPermissionsModule.forChild(),
		TranslateModule.forChild(),
	],
})
export class ReclamationsModule {}
