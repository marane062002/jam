import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTableModule } from "../../../utils/data-table/data-table.module";
import { CarbucartesComponent } from "./components/carbucartes.component";
import { CarteCarbucarteRoutingModule } from "./route/carte-carbucarte-routing.module";

@NgModule({
  imports: [FormsModule, CommonModule,ReactiveFormsModule, DataTableModule, CarteCarbucarteRoutingModule],
  declarations: [
    CarbucartesComponent
  ], 
})
export class GestionparcautoCarteCarbucarteModule {}
