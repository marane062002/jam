import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VehiculeComponent } from "./components/vehicule.component";
import { VehiculeRoutingModule } from "./route/vehicule-routing.module";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataTableModule } from "../../../utils/data-table/data-table.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatFormFieldModule, MatInputModule, MatSelectModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { PagesModule } from "../../../pages.module";
import { CoreModule } from "../../../../../core/core.module";
import { TranslateModule } from "@ngx-translate/core";
import { ModalModule } from "../../../shared/modal/modal.module";
import { NgxPermissionsModule } from "ngx-permissions";
import { MaterialsModule } from "../../../utils/materials/materials.module";
import { AddVehiculeComponent } from "./components/add-vehicule/add-vehicule.component";
/* import { AddVehiculeComponent } from "./components/add-vehicule/add-vehicule.component";
 */
@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, DataTableModule,NgMultiSelectDropDownModule, VehiculeRoutingModule,
    NgxMatSelectSearchModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
   DataTableModule,
    MatSelectModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    PagesModule,
		CommonModule,
		ReactiveFormsModule,
		CoreModule,
    MatFormFieldModule,
    MatInputModule,
    NgMultiSelectDropDownModule.forRoot(),
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,],
  declarations: [
   /*VehiculeComponent,*/
    AddVehiculeComponent
  ],
})
export class GestionparcautoVehiculeModule {}
