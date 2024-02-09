// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Metronic
//import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from "../../../core/core.module";
import { PersonneMoraleComponent } from "./personne-morale.component";
import { PersonneMoraleListComponent } from "./personne-morale-list/personne-morale-list.component";
import { PersonneMoraleEditComponent } from "./personne-morale-edit/personne-morale-edit.component";
import { PersonneMoraleDetailComponent } from "./personne-morale-detail/personne-morale-detail.component";
import { PersonneMoraleFormComponent } from "./personne-morale-form/personne-morale-form.component";
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
} from "@angular/material";
import { NgxPermissionsModule } from "ngx-permissions";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [
		PersonneMoraleComponent,
		PersonneMoraleListComponent,
		PersonneMoraleEditComponent,
		PersonneMoraleDetailComponent,
		PersonneMoraleFormComponent,
	],
	imports: [
		TranslateModule.forChild(),
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		//PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: "",
				component: PersonneMoraleComponent,
				children: [
					{
						path: "personne-morale-detail",
						component: PersonneMoraleDetailComponent,
					},
					{
						path: "personne-morale-edit",
						component: PersonneMoraleEditComponent,
					},
					{
						path: "personne-morale-list",
						component: PersonneMoraleListComponent,
					},
					{
						path: "personne-morale-form",
						component: PersonneMoraleFormComponent,
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

		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
		NgxPermissionsModule.forChild(),
	],
})
export class PersonneMoraleModule {}
