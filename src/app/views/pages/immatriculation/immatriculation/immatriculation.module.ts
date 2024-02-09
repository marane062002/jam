// Angular
import { NgModule, LOCALE_ID, } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Metronic
//import { PartialsModule } from '../../partials/partials.module';

import {NgbDropdownModule, NgbTabsetModule, NgbTooltipModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
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

import { CoreModule } from '../../../../core/core.module';



import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MycurrencyPipe } from '../../custom.currencypipe';
import { PagesModule } from '../../pages.module';
import { ImmatriculationComponent } from './immatriculation.component';
import { ImmatriculationNewComponent } from './immatriculation-new/immatriculation-new.component';
import { ImmatriculationIndexComponent } from './immatriculation-index/immatriculation-index.component';
import { ImmatriculationShowComponent } from './immatriculation-show/immatriculation-show.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ImmatriculationEditComponent } from './immatriculation-edit/immatriculation-edit.component';


@NgModule({
	declarations: [ImmatriculationComponent, ImmatriculationNewComponent, ImmatriculationIndexComponent, ImmatriculationShowComponent, ImmatriculationEditComponent],
	imports: [
		PagesModule,
		CommonModule,
		TranslateModule.forChild(),
    FormsModule,ReactiveFormsModule,
    NgbTypeaheadModule,
		//PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: ImmatriculationComponent,
				children: [					
					{
						path: 'immatriculation-index',
						component: ImmatriculationIndexComponent
					},
					{
						path: 'immatriculation-new',
						component: ImmatriculationNewComponent
					},
					{
						path: 'immatriculation-show',
						component: ImmatriculationShowComponent
					},
					{
						path: 'immatriculation-edit',
						component: ImmatriculationEditComponent
					},
					
				
				]
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
		MatDividerModule,
		MatDialogModule,
		MatFormFieldModule,
		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
		NgxMatSelectSearchModule,
		NgxPermissionsModule.forChild(),    
	],

})
export class ImmatriculationModule {
}
