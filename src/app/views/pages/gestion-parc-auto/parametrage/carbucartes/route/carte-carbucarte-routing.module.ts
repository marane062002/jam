import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarbucartesComponent } from "../components/carbucartes.component";
import { CarteCarbucarteRoutingResolveService } from "./carte-carbucarte-routing-resolve.service";


const carteCarbucarteRoute: Routes = [
  {
    path: "",
    component: CarbucartesComponent,
    data: {
      defaultSort: "id,desc",
    },
    resolve: {
      garagiste: CarteCarbucarteRoutingResolveService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(carteCarbucarteRoute)],
  exports: [RouterModule],
})
export class CarteCarbucarteRoutingModule {}
