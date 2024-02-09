import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { CaDetailComponent } from "./ca-detail.component";

const routes: Routes = [{ path: "", component: CaDetailComponent }];

@NgModule({
	declarations: [],
	imports: [CommonModule],
	entryComponents: [],
})
export class CaDetailModule {}
