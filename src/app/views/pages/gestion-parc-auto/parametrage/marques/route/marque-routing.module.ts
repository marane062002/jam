import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MarqueComponent } from "../components/marque.component";
import {AddMarqueComponent }from "../components/add-marque/add-marque.component";
 
import { MarqueRoutingResolveService } from "./marque-routing-resolve.service";

const marqueRoute: Routes = [
  {
    path: "",
    component: MarqueComponent,
    data: {
      defaultSort: "id,desc",
    },
    resolve: {
      garagiste: MarqueRoutingResolveService,
    }
  },
  {
    path:"new",
    component:AddMarqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(marqueRoute)],
  exports: [RouterModule],
})
export class MarqueRoutingModule {}
