// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Metronic
//import { PartialsModule } from '../../partials/partials.module';
import { CoreModule } from "../../../core/core.module";
import { PersonnePhysiqueComponent } from "./personne-physique.component";
import { PersonnePhysiqueListComponent } from "./personne-physique-list/personne-physique-list.component";
import { PersonnePhysiqueEditComponent } from "./personne-physique-edit/personne-physique-edit.component";
import { PersonnePhysiqueDetailComponent } from "./personne-physique-detail/personne-physique-detail.component";
import { PersonnePhysiqueFormComponent } from "./personne-physique-form/personne-physique-form.component";
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
		PersonnePhysiqueComponent,
		PersonnePhysiqueListComponent,
		PersonnePhysiqueEditComponent,
		PersonnePhysiqueDetailComponent,
		PersonnePhysiqueFormComponent,
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
				component: PersonnePhysiqueComponent,
				children: [
					{
						path: "personne-physique-detail",
						component: PersonnePhysiqueDetailComponent,
					},
					{
						path: "personne-physique-edit",
						component: PersonnePhysiqueEditComponent,
					},
					{
						path: "personne-physique-list",
						component: PersonnePhysiqueListComponent,
					},
					{
						path: "personne-physique-form",
						component: PersonnePhysiqueFormComponent,
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
export class PersonnePhysiqueModule {}
