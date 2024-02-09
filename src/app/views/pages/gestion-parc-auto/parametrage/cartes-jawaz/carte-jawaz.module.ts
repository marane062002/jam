import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "../../../utils/data-table/data-table.module";
import { CartesJawazComponent } from "./components/cartes-jawaz.component";
import { CarteJawazRoutingModule } from "./route/carte-jawaz-routing.module";
import { NewCarteJawazComponent } from './components/new-carte-jawaz/new-carte-jawaz.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "../../../shared/modal/modal.module";
import { PagesModule } from "../../../pages.module";
import { CoreModule } from "../../../../../core/core.module";
import { MaterialsModule } from "../../../utils/materials/materials.module";
import { NgxPermissionsModule } from "ngx-permissions";
import { TranslateModule } from "@ngx-translate/core";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  imports: [
    FormsModule,
     CommonModule,
    ReactiveFormsModule,
     DataTableModule,
     CarteJawazRoutingModule,
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
  declarations: [CartesJawazComponent, NewCarteJawazComponent],
})
export class GestionparcautoCarteJawazModule {}
