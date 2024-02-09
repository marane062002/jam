import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MarqueComponent } from "./components/marque.component";
import { MarqueRoutingModule } from "./route/marque-routing.module";
import { DataTableModule } from "../../../utils/data-table/data-table.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatFormFieldModule, MatInputModule, MatSelectModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "../../../shared/modal/modal.module";
import { PagesModule } from "../../../pages.module";
import { CoreModule } from "../../../../../core/core.module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { TranslateModule } from "@ngx-translate/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { MaterialsModule } from "../../../utils/materials/materials.module";
import { AddMarqueComponent } from "./components/add-marque/add-marque.component";

@NgModule({
  imports: [
    FormsModule, 
    CommonModule,
    ReactiveFormsModule, 
    DataTableModule, 
    MarqueRoutingModule,
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
    NgMultiSelectDropDownModule.forRoot(),
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule,
  ],
  declarations: [MarqueComponent,AddMarqueComponent],
})
export class GestionparcautoMarqueModule {}
