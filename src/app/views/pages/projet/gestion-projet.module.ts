import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
	MatFormFieldModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { NgxPermissionsModule } from 'ngx-permissions';
import { PagesModule } from '../pages.module';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../../core/core.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
	declarations: [],
	imports: [
		PagesModule,
		CommonModule,
		CoreModule,

		//********************** */
		TranslateModule.forChild(),
		ReactiveFormsModule,
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
		MatDividerModule,
		MatDialogModule,
		MatFormFieldModule,
		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
		NgxPermissionsModule.forChild(),
		NgxMatSelectSearchModule,
		NgbModule,
	],

	exports: [
		PagesModule,
		CommonModule,
		CoreModule,
		TranslateModule,
		NgxPermissionsModule,
		ReactiveFormsModule,
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
		MatDividerModule,
		MatDialogModule,
		MatFormFieldModule,
		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
		NgxMatSelectSearchModule,
		NgbModule,
	],
	providers: []
})
export class GestionProjetModule { }
