import { NgModule } from "@angular/core";
import { GaragistesComponent } from "./components/garagistes.component";
import { GaragisteRoutingModule } from "./route/garagiste-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "../../../utils/data-table/data-table.module";
import { MatFormFieldModule, MatInputModule, MatSelectModule } from "@angular/material";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "../../../shared/modal/modal.module";
import { PagesModule } from "../../../pages.module";
import { TranslateModule } from "@ngx-translate/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { MaterialsModule } from "../../../utils/materials/materials.module";
import { NewGarageComponent } from './components/new-garage/new-garage.component';

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, DataTableModule, GaragisteRoutingModule,
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
    MatFormFieldModule,
    MatInputModule,
		TranslateModule.forChild(),
		NgxPermissionsModule.forChild(),
		MaterialsModule],
  declarations: [GaragistesComponent, NewGarageComponent],
})
export class GestionparcautoGaragisteModule {}
