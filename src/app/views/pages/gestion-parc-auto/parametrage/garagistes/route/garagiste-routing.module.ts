import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GaragistesComponent } from "../components/garagistes.component";
import { NewGarageComponent } from "../components/new-garage/new-garage.component";

import { GaragisteRoutingResolveService } from "./garagiste-routing-resolve.service";

const garagisteRoute: Routes = [
  {
    path: "",
    component: GaragistesComponent,
    data: {
      defaultSort: "id,desc",
    },
    resolve: {
      garagiste: GaragisteRoutingResolveService,
    }
  },
  {
    path: "new",
    component: NewGarageComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(garagisteRoute)],
  exports: [RouterModule],
})
export class GaragisteRoutingModule {}
