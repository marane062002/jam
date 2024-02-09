import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesModule } from "../pages.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialsModule } from "../utils/materials/materials.module";
import { RouterModule } from "@angular/router";
import { ActionDecisionComponent } from "./action-decision/action-decision.component";
import { DecisionComponent } from "./decision.component";
import { ListActionComponent } from "./list-action/list-action.component";
import { UpdActionComponent } from "./upd-action/upd-action.component";
import { DetailleActionComponent } from "./detaille-action/detaille-action.component";

@NgModule({
	declarations: [
		DecisionComponent,
		ActionDecisionComponent,
		ListActionComponent,
		UpdActionComponent,
		DetailleActionComponent,
	],
	imports: [
		PagesModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
    RouterModule.forChild([
      {
          path: "", 
          component: DecisionComponent,
          children: [
              {
                  path: "action-decision",
                  component: ActionDecisionComponent,
              },
              {
                  path: "list-action",
                  component: ListActionComponent,
              },
              {
                  path: "upd-action/:id",
                  component: UpdActionComponent,
              },
              {
                  path: "detaille-action/:id",
                  component: DetailleActionComponent,
              },
          ],
      },
  ]),
  
  
	],
})
export class DecisionModule {}
