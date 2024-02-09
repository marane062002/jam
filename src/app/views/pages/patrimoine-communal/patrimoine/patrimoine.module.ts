import { ExploitationDomainePriveEditComponent } from './exploitationDomainePrive-edit/exploitation-domaine-prive.edit.component';
import { ExploitationDomainePriveNewComponent } from './exploitationDomainePrive-new/exploitation-domaine-prive-new.component';
import { ExploitationDomainePriveShowComponent } from './exploitationDomainePrive-show/exploitation-domaine-prive-show.component';

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PatrimoineCommunalModule } from "../patrimoine-communal.module";

//*************************** */
import { PatrimoineComponent } from "./patrimoine.component";
import { PatrimoineIndexComponent } from "./patrimoine-index/patrimoine-index.component";
import { PatrimoineNewComponent } from "./patrimoine-new/patrimoine-new.component";
import { PatrimoineShowComponent } from "./patrimoine-show/patrimoine-show.component";
import { MvmlocationNewComponent } from "./mvmlocation-new/mvmlocation-new.component";
import { MvmtransactionNewComponent } from "./mvmtransaction-new/mvmtransaction-new.component";
import { TabMvmtransactionComponent } from "./patrimoine-show/tab-mvmtransaction/tab-mvmtransaction.component";
import { TabMvmlocationComponent } from "./patrimoine-show/tab-mvmlocation/tab-mvmlocation.component";
import { MvmlocationShowComponent } from "./mvmlocation-show/mvmlocation-show.component";
import { MvmtransactionShowComponent } from "./mvmtransaction-show/mvmtransaction-show.component";
import { PatrimoineEditComponent } from "./patrimoine-edit/patrimoine-edit.component";
import { MvmlocationEditComponent } from "./mvmlocation-edit/mvmlocation-edit.component";
import { MvmtransactionEditComponent } from "./mvmtransaction-edit/mvmtransaction-edit.component";
import { ExploitationDomainePublicShowComponent } from './exploitationDomainePublic-show/exploitation-domaine-public-show.component';
import { ExploitationDomainePublicEditComponent } from './exploitationDomainePublic-edit/exploitation-domaine-public.edit.component';
import { ExploitationDomainePublicNewComponent } from './exploitationDomainePublic-new/exploitation-domaine-public-new.component';
import { ModelAddTypeComponent } from './model-add-type/model-add-type.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashBoardSCComponent } from './dash-board-sc/dash-board-sc.component';
import { DashboardMarcheComponent } from './dashboard-marche/dashboard-marche.component';
import { MaterialsModule } from '../../utils/materials/materials.module';
//import { Angular2CsvModule } from 'angular2-csv';

@NgModule({
	declarations: [
		PatrimoineComponent,
		PatrimoineIndexComponent,
		PatrimoineNewComponent,
		PatrimoineShowComponent,
		MvmlocationNewComponent,
		MvmtransactionNewComponent,
		TabMvmtransactionComponent,
		TabMvmlocationComponent,
		MvmlocationShowComponent,
		MvmtransactionShowComponent,
		PatrimoineEditComponent,
		MvmlocationEditComponent,
		MvmtransactionEditComponent,
		ExploitationDomainePublicNewComponent,
		ExploitationDomainePublicShowComponent,
		ExploitationDomainePublicEditComponent,
		ExploitationDomainePriveNewComponent,
		ExploitationDomainePriveShowComponent,
		ExploitationDomainePriveEditComponent,
		ModelAddTypeComponent,
		DashboardComponent,
		DashBoardSCComponent,
		DashboardMarcheComponent,
	],
	entryComponents: [ModelAddTypeComponent],
	imports: [
		FormsModule,
	//	Angular2CsvModule,
		PatrimoineCommunalModule,
		MaterialsModule,
		//*************************************
		RouterModule.forChild([
			{
				path: "",
				component: PatrimoineComponent,
				children: [
					{
						path: "patrimoine-index",
						component: PatrimoineIndexComponent,
					},
					{
						path: "patrimoine-new",
						component: PatrimoineNewComponent,
					},
					{
						path: "patrimoine-show",
						component: PatrimoineShowComponent,
					},
					{
						path: "patrimoine-edit",
						component: PatrimoineEditComponent,
					},
					{
						path: "mvmlocation-new",
						component: MvmlocationNewComponent,
					},
					{
						path: "mvmlocation-show",
						component: MvmlocationShowComponent,
					},
					{
						path: "mvmlocation-edit",
						component: MvmlocationEditComponent,
					},
					{
						path: "mvmtransaction-new",
						component: MvmtransactionNewComponent,
					},
					{
						path: "mvmtransaction-show",
						component: MvmtransactionShowComponent,
					},
					{
						path: "mvmtransaction-edit",
						component: MvmtransactionEditComponent,
					},
					{
						path: "exploitation-domaine-public-new",
						component: ExploitationDomainePublicNewComponent,
					},
					{
						path: "exploitation-domaine-public-show",
						component: ExploitationDomainePublicShowComponent,
					},
					{
						path: "exploitation-domaine-public-edit",
						component: ExploitationDomainePublicEditComponent,
					},
					{
						path: "exploitation-domaine-prive-new",
						component: ExploitationDomainePriveNewComponent,
					},
					{
						path: "exploitation-domaine-prive-show",
						component: ExploitationDomainePriveShowComponent,
					},
					{
						path: "exploitation-domaine-prive-edit",
						component: ExploitationDomainePriveEditComponent,
					},	{
						path: "dashboard",
						component: DashboardComponent,
					},	{
						path: "dashboardSC",
						component: DashBoardSCComponent,
					},{
						
						path: "dashboardMarche",
						component: DashboardMarcheComponent,
					}
				],
			},
		]),
	],
})
export class PatrimoineModule {}
