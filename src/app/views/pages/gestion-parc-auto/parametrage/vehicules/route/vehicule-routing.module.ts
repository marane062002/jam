import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddVehiculeComponent } from "../components/add-vehicule/add-vehicule.component";
import { VehiculeComponent } from "../components/vehicule.component";
import { VehiculeRoutingResolveService } from "./vehicule-routing-resolve.service";


const vehiculeRoute: Routes = [
  {
    path: "",
    component: VehiculeComponent,
    data: {
      defaultSort: "id,desc",
    },
    resolve: {
      garagiste: VehiculeRoutingResolveService,
    }
  },{
    path:"new",
    component:AddVehiculeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(vehiculeRoute)],
  exports: [RouterModule],
})
export class VehiculeRoutingModule {}
