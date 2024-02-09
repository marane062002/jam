import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SortieComponent } from "./sortie.component";
import { PagesModule } from "../pages.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialsModule } from "../utils/materials/materials.module";
import { RouterModule } from "@angular/router";
import { ListSortieComponent } from "./list-sortie/list-sortie.component";
import { MatInputModule } from '@angular/material/input';
import {
	MatDialogModule,
	MatIconModule,
	MatStepperModule,
} from "@angular/material";
import { DetailleSortieComponent } from "./detaille-sortie/detaille-sortie.component";
import { AddSortieComponent } from "./add-sortie/add-sortie.component";
import { UpdSortieComponent } from "./upd-sortie/upd-sortie.component";
@NgModule({
  declarations: [
    SortieComponent,
    ListSortieComponent,
    DetailleSortieComponent,
    AddSortieComponent,
    UpdSortieComponent,
  ],
  imports: [
    MatDialogModule,
    MatStepperModule,
    MatIconModule,
    // Add MatInputModule to the imports array
    MatInputModule,
    PagesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MaterialsModule,
    RouterModule.forChild([
      {
        path: "",
        component: SortieComponent,
        children: [
          {
            path: "add-sortie",
            component: AddSortieComponent,
          },
          {
            path: "list-sortie",
            component: ListSortieComponent,
          },
          {
            path: "upd-sortie/:id",
            component: UpdSortieComponent,
          },
          {
            path: "detaille-sortie/:id",
            component: DetailleSortieComponent,
          },
        ],
      },
    ]),
  ],
})
export class SortieModule {}
