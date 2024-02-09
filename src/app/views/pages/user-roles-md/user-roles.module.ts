// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Metronic
import { PartialsModule } from "../../partials/partials.module";
import { CoreModule } from "../../../core/core.module";
import { UserRolesComponent } from "./user-roles.component";
import { RolesComponent } from "./roles/roles.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
	MatAutocompleteModule,
	MatNativeDateModule,
	MatFormFieldModule,
	MatInputModule,
	MatRadioModule,
	MatButtonModule,
	MatCardModule,
	MatChipsModule,
	MatSelectModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatIconModule,
	MatSliderModule,
	MatPaginatorModule,
	MatSortModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatStepperModule,
	MatToolbarModule,
	MatDividerModule,
	MatTabsModule,
	MatTableModule,
	MatTooltipModule,
	MatListModule,
	MatGridListModule,
	MatButtonToggleModule,
	MatBottomSheetModule,
	MatExpansionModule,
	MatMenuModule,
	MatTreeModule,
} from "@angular/material";
import { RoleIndexComponent } from "./role-index/role-index.component";
import { RoleShowComponent } from "./role-show/role-show.component";
import { TranslateModule } from "@ngx-translate/core";
import { UserIndexComponent } from "./user-index/user-index.component";
import { UserShowComponent } from "./user-show/user-show.component";
import { UserNewComponent } from "./user-new/user-new.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { PersonnelModule } from "../rh/personnel/personnel.module";
import { UserEditComponent } from "./user-edit/user-edit.component";

import { NgbAlertConfig, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PjUserIndexComponent } from './pj-user-index/pj-user-index.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { UserEditPwdComponent } from './user-edit-pwd/user-edit-pwd.component';

@NgModule({
	declarations: [
		UserRolesComponent,
		RolesComponent,
		RoleIndexComponent,
		RoleShowComponent,
		UserIndexComponent,
		UserShowComponent,
		UserNewComponent,
		UserProfileComponent,
		UserEditComponent,
		PjUserIndexComponent,
		RoleEditComponent,
		UserEditPwdComponent
	],
	imports: [
		PersonnelModule,
		CommonModule,
		FormsModule,
		NgbModule,
		ReactiveFormsModule,
		PartialsModule,
		CoreModule,
		TranslateModule.forChild(),
		RouterModule.forChild([
			{
				path: "",
				component: UserRolesComponent,
				children: [
					{
						path: "role-new",
						component: RolesComponent,
					},
					{
						path: "role-index",
						component: RoleIndexComponent,
					},
					{
						path: "role-show/:id",
						component: RoleShowComponent,
					},
					{
						path: "role-edit/:id",
						component: RoleEditComponent,
					},
					{
						path: "user-edit-pwd",
						component: UserEditPwdComponent,
					},
					{
						path: "user-index",
						component: UserIndexComponent,
					},
					{
						path: "user-new",
						component: UserNewComponent,
					},
					{
						path: "user-show",
						component: UserShowComponent,
					},
					{
						path: "user-edit",
						component: UserEditComponent,
					},
					{
						path: "user-profile",
						component: UserProfileComponent,
					},
					{
						path: "mes-documents",
						component: PjUserIndexComponent,
					},
				],
			},
		]),
		MatFormFieldModule,
		MatAutocompleteModule,
		MatListModule,
		MatSliderModule,
		MatCardModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		MatNativeDateModule,
		MatCheckboxModule,
		MatMenuModule,
		MatTabsModule,
		MatTooltipModule,
		MatSidenavModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTableModule,
		MatGridListModule,
		MatToolbarModule,
		MatBottomSheetModule,
		MatExpansionModule,
		MatDividerModule,
		MatSortModule,
		MatStepperModule,
		MatChipsModule,
		MatPaginatorModule,
		CoreModule,
		CommonModule,
		MatRadioModule,
		MatTreeModule,
		MatButtonToggleModule,
		PartialsModule,
		FormsModule,
		MatInputModule,
		NgxPermissionsModule.forChild(),
	],
	providers: [NgbAlertConfig],
})
export class UserolesModule {}
