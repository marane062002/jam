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
import { AddPeseeComponent } from "./add-pesee/add-pesee.component";
import { PeseeComponent } from "./pesee.component";
//import { ShowPeseeComponent } from "./show-pesee/show-pesee.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AddvehiculeComponent } from './add-vehicule/add-vehicule.component';
//import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import fr from '@angular/common/locales/fr';
import { ListPeseesComponent } from './list-pesees/list-pesees.component';
import { ShowPeseeComponent } from './show-pesee/show-pesee.component';
import { ListVehiculeComponent } from './list-vehicule/list-vehicule.component';
import { EditVehiculeComponent } from './edit-vehicule/edit-vehicule.component';
import { VehiculeResolveServiceService } from './Services/vehicule-resolve-service.service';
import { EditPeseeComponent } from './edit-pesee/edit-pesee.component';
import { PeseeResolveServiceService } from './Services/pesee-resolve-service.service';
import { AdapterTypePeseeComponent } from './adapter-type-pesee/adapter-type-pesee.component';
import { ListePeseeMondataireComponent } from './liste-pesee-mondataire/liste-pesee-mondataire.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AddVehiculeModalComponent } from './add-vehicule-modal/add-vehicule-modal.component';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

@NgModule({
	declarations: [AddVehiculeModalComponent,
		AddPeseeComponent,
		PeseeComponent,
		AddvehiculeComponent,
		ListPeseesComponent,
		ShowPeseeComponent,
		ListVehiculeComponent,
		EditVehiculeComponent,
		EditPeseeComponent,
		AdapterTypePeseeComponent,
		ListePeseeMondataireComponent
	],
	entryComponents: [
		AddVehiculeModalComponent],
	imports: [
		NgxPermissionsModule.forRoot(),

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
				component: PeseeComponent,
				children: [
					{
						path: "add-pesee",
						component: AddPeseeComponent,
					},
					{
						path: "adapter-type-pesee",
						component: AdapterTypePeseeComponent,
					},
					{
						path: "add-vehicule",
						component: AddvehiculeComponent,
					},
					{
						path: "list-pesees",
						component: ListPeseesComponent,
						data: {
							defaultSort: 'id,desc',
						  },
					},
					{
						path: "list-vehicule",
						component: ListVehiculeComponent,
						data: {
							defaultSort: 'id,desc',
						  },
				},
				{
					path: "list-pesee-mondataire",
					component: ListePeseeMondataireComponent,
					data: {
						defaultSort: 'id,desc',
					  },
			},
					{
						path: "show-pesee/:id",
						component: ShowPeseeComponent,
						resolve: {
							Showpesee: PeseeResolveServiceService,
						  },
					},
					{
						path: "edit-vehicule/:id",
						component: EditVehiculeComponent,
						resolve: {
							vehicule: VehiculeResolveServiceService,
						  },
					},
					{
						path: "edit-pesee/:id",
						component: EditPeseeComponent,
						resolve: {
							pesee: PeseeResolveServiceService,
						  },
					}
				],
			},
		]),
		MatDatepickerModule,
		MatDatepickerModule,
		MatDatepickerModule,


	],
})
export class PeseeModule { }
