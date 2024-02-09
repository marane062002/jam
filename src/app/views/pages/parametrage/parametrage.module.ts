//import { AddvehiculeComponent } from './addvehicule/addvehicule.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesModule } from "../pages.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialsModule } from "../utils/materials/materials.module";
import { RouterModule } from "@angular/router";
//import { ListPeseesComponent } from "./list-pesees/list-pesees.component";

//import { ShowPeseeComponent } from "./show-pesee/show-pesee.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

//import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import fr from '@angular/common/locales/fr';
import { GestionPeseeComponent } from './gestion-pesee/gestion-pesee.component';
import { ParametrageComponent } from './parametrage.component';
import { GestionPartsComponent } from './gestion-des-parts/gestion-des-parts.component';
import { ListTypeAoComponent } from '../../../views/pages/parametrage/gestion-des-types-ao/list-type-ao/list-type-ao.component';
import { AddTypeAoComponent } from './gestion-des-types-ao/add-type-ao/add-type-ao.component';
import { EditTypeAoComponent } from './gestion-des-types-ao/edit-type-ao/edit-type-ao.component';
import { ShowTypeAoComponent } from './gestion-des-types-ao/show-type-ao/show-type-ao.component';
import { ListCategorieComponent } from './gestion-categorie/list-categorie/list-categorie.component';
import { AddCategorieComponent } from './gestion-categorie/add-categorie/add-categorie.component';
import { EditCategorieComponent } from './gestion-categorie/edit-categorie/edit-categorie.component';
import { ShowCategorieComponent } from './gestion-categorie/show-categorie/show-categorie.component';
import { ListTypeMarcheComponent } from './gestion-type-marche/list-type-marche/list-type-marche.component';
import { AddTypeMarcheComponent } from './gestion-type-marche/add-type-marche/add-type-marche.component';
import { EditTypeMarcheComponent } from './gestion-type-marche/edit-type-marche/edit-type-marche.component';
import { ShowTypeMarcheComponent } from './gestion-type-marche/show-type-marche/show-type-marche.component';
import { ListModePassationComponent } from './gestion-mode-passation/list-mode-passation/list-mode-passation.component';
import { AddModePassationComponent } from './gestion-mode-passation/add-mode-passation/add-mode-passation.component';
import { EditModePassationComponent } from './gestion-mode-passation/edit-mode-passation/edit-mode-passation.component';
import { ShowModePassationComponent } from './gestion-mode-passation/show-mode-passation/show-mode-passation.component';
import { ListAgrementComponent } from './gestion-agrement/list-agrement/list-agrement.component';
import { AddAgrementComponent } from './gestion-agrement/add-agrement/add-agrement.component';
import { EditAgrementComponent } from './gestion-agrement/edit-agrement/edit-agrement.component';
import { ShowAgrementComponent } from './gestion-agrement/show-agrement/show-agrement.component';
import { ListeTypePieceJointComponent } from './gestion-type-piece-jointe/liste-type-piece-joint/liste-type-piece-joint.component';
import { AddTypePieceJointComponent } from './gestion-type-piece-jointe/add-type-piece-joint/add-type-piece-joint.component';
import { EditTypePieceJointComponent } from './gestion-type-piece-jointe/edit-type-piece-joint/edit-type-piece-joint.component';
import { ShowTypePieceJointComponent } from './gestion-type-piece-jointe/show-type-piece-joint/show-type-piece-joint.component';
import { ListeQualificationComponent } from './gestion-qualification/liste-qualification/liste-qualification.component';
import { AddQualificationComponent } from './gestion-qualification/add-qualification/add-qualification.component';
import { EditQualificationComponent } from './gestion-qualification/edit-qualification/edit-qualification.component';
import { ShowQualificationComponent } from './gestion-qualification/show-qualification/show-qualification.component';
import { ListeClassificationComponent } from './gestion-classification/liste-classification/liste-classification.component';
import { AddClassificationComponent } from './gestion-classification/add-classification/add-classification.component';
import { EditClassificationComponent } from './gestion-classification/edit-classification/edit-classification.component';
import { ShowClassificationComponent } from './gestion-classification/show-classification/show-classification.component';

// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

@NgModule({
	declarations: [
		ParametrageComponent,
		GestionPeseeComponent,
		GestionPartsComponent,
		ListTypeAoComponent,
		AddTypeAoComponent,
		EditTypeAoComponent,
		ShowTypeAoComponent,
		ListCategorieComponent,
		AddCategorieComponent,
		EditCategorieComponent,
		ShowCategorieComponent,
		ListTypeMarcheComponent, 
		AddTypeMarcheComponent ,
		EditTypeMarcheComponent,
		ShowTypeMarcheComponent,
		ListModePassationComponent,
		AddModePassationComponent, 
		EditModePassationComponent,
		ShowModePassationComponent,
		ListAgrementComponent,
		AddAgrementComponent, 
		EditAgrementComponent, 
		ShowAgrementComponent,
		ListeTypePieceJointComponent,
		AddTypePieceJointComponent,
		EditTypePieceJointComponent,
		ShowTypePieceJointComponent,
		ListeQualificationComponent,
		AddQualificationComponent, 
		EditQualificationComponent,
		ShowQualificationComponent,
		ListeClassificationComponent,
		AddClassificationComponent,
		EditClassificationComponent,
		ShowClassificationComponent
	],
	imports: [
		MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
		PagesModule,
		CommonModule,
		MatStepperModule,
		FormsModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatFormFieldModule,
		NgxMatSelectSearchModule,
		MatTableModule,
		HttpClientModule,
		TranslateModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: ParametrageComponent,
				children: [
					{
						path: "gestion-pesee",
						component: GestionPeseeComponent,
					},
					

					{
						path: "gestion-des-parts",
						component: GestionPartsComponent,
					},
					{
						path: "list-type-ao",
						component: ListTypeAoComponent,
					},
					{
						path: "add-type-ao",
						component: AddTypeAoComponent,
					},
					{
						path: "edit-type-ao",
						component: EditTypeAoComponent,
					},
					{
						path: "show-type-ao",
						component: ShowTypeAoComponent,
					},
					{
						path: "list-categorie",
						component: ListCategorieComponent,
					},
					{
						path: "add-categorie",
						component: AddCategorieComponent,
					},
					{
						path: "edit-categorie",
						component: EditCategorieComponent,
					},
					{
						path: "show-categorie",
						component: ShowCategorieComponent,
					},
					{
						path: "list-type-marche",
						component: ListTypeMarcheComponent,
					},
					{
						path: "add-type-marche",
						component: AddTypeMarcheComponent,
					},
					{
						path: "edit-type-marche",
						component: EditTypeMarcheComponent,
					},
					{
						path: "show-type-marche",
						component: ShowTypeMarcheComponent,
					},
					{
						path: "list-mode-passation",
						component: ListModePassationComponent,
					},
					{
						path: "add-mode-passation",
						component: AddModePassationComponent,
					},
					{
						path: "edit-mode-passation",
						component: EditModePassationComponent,
					},
					{
						path: "show-mode-passation",
						component: ShowModePassationComponent,
					},
					{
						path: "list-agrement",
						component: ListAgrementComponent,
					},
					{
						path: "add-agrement",
						component: AddAgrementComponent,
					},
					{
						path: "edit-agrement",
						component: EditAgrementComponent,
					},
					{
						path: "show-agrement",
						component: ShowAgrementComponent,
					},
					{
						path: "list-type-piece-joint",
						component: ListeTypePieceJointComponent,
					},
					{
						path: "add-type-piece-joint",
						component: AddTypePieceJointComponent,
					},
					{
						path: "edit-type-piece-joint",
						component: EditTypePieceJointComponent,
					},
					{
						path: "show-type-piece-joint",
						component: ShowTypePieceJointComponent,
					},
					{
						path: "list-qualification",
						component: ListeQualificationComponent,
					},
					{
						path: "add-qualification",
						component: AddQualificationComponent,
					},
					{
						path: "edit-qualification",
						component: EditQualificationComponent,
					},
					{
						path: "show-qualification",
						component: ShowQualificationComponent,
					},
					{
						path: "list-classification",
						component: ListeClassificationComponent,
					},
					{
						path: "add-classification",
						component: AddClassificationComponent,
					},
					{
						path: "edit-classification",
						component: EditClassificationComponent,
					},
					{
						path: "show-classification",
						component: ShowClassificationComponent,
					},
				],
			},
		]),
		MatDatepickerModule,
		MatDatepickerModule,
		MatDatepickerModule,


	],
})
export class ParametrageModule { }
