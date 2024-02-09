import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartesJawazComponent } from "../components/cartes-jawaz.component";
import { NewCarteJawazComponent } from "../components/new-carte-jawaz/new-carte-jawaz.component";

import { CarteJawazRoutingResolveService } from "./carte-jawaz-routing-resolve.service";

const carteJawazRoute: Routes = [
  {
    path: "",
    component: CartesJawazComponent,
    data: {
      defaultSort: "id,desc",
    },
    resolve: {
      garagiste: CarteJawazRoutingResolveService,
    }
  },{
    path:"new",
    component:NewCarteJawazComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(carteJawazRoute)],
  exports: [RouterModule],
})
export class CarteJawazRoutingModule {}
