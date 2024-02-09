import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionFormComponent } from "./session-form/session-form.component";
import { SessionEditComponent } from "./session-edit/session-edit.component";
import { SessionDetailComponent } from "./session-detail/session-detail.component";
import { SessionListComponent } from "./session-list/session-list.component";
import { PointFormComponent } from "./point-form/point-form.component";
import { PointEditComponent } from "./point-edit/point-edit.component";
import { PointDetailComponent } from "./point-detail/point-detail.component";
import { PointListComponent } from "./point-list/point-list.component";
import { AffairesConseilComponent } from "./affaires-conseil.component";
import {
	MatCardModule,
	MatButtonModule,
	MatDatepickerModule,
	MatDialogModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatTooltipModule,
	MatCheckboxModule,
	MatDividerModule,
	MatAutocompleteModule,
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {
	NgbTooltipModule,
	NgbDropdownModule,
	NgbTabsetModule,
	NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import { MondatFormComponent } from "./mondat-form/mondat-form.component";
import { MondatListComponent } from "./mondat-list/mondat-list.component";
import { MondatEditComponent } from "./mondat-edit/mondat-edit.component";
import { MondatDetailComponent } from "./mondat-detail/mondat-detail.component";
import { PointListSessionComponent } from "./point-list-session/point-list-session.component";
import { MycurrencyPipe } from "../custom.currencypipe";
import { CommissionConseilComponent } from "./commission-conseil/commission-conseil.component";
import { CommissionConseilEditComponent } from "./commission-conseil-edit/commission-conseil-edit.component";
import { ReunionCommissionConseilFormComponent } from "./reunion-commission-conseil-form/reunion-commission-conseil-form.component";
import { AudienceFormComponent } from "./audience-form/audience-form.component";
import { CommissionConseilListComponent } from "./commission-conseil-list/commission-conseil-list.component";
import { EvaluationPointBureauComponent } from "./evaluation-point-bureau/evaluation-point-bureau.component";
import { ReunionCommissionConseilListComponent } from "./reunion-commission-conseil-list/reunion-commission-conseil-list.component";
import { ReunionCommissionConseilDetailComponent } from "./reunion-commission-conseil-detail/reunion-commission-conseil-detail.component";
import { AudienceListComponent } from "./audience-list/audience-list.component";
import { EvaluationPointAudienceComponent } from "./evaluation-point-audience/evaluation-point-audience.component";
import { PointsAudienceComponent } from "./points-audience/points-audience.component";
import { PresenceAudienceComponent } from "./presence-audience/presence-audience.component";
import { RemarquesAudienceComponent } from "./remarques-audience/remarques-audience.component";
import { OrdreJourCommissionComponent } from "./ordre-jour-commission/ordre-jour-commission.component";
import { OrdreJourAudienceComponent } from "./ordre-jour-audience/ordre-jour-audience.component";
import { OrdreJourBureauComponent } from "./ordre-jour-bureau/ordre-jour-bureau.component";
import { AffectationPointComponent } from "./affectation-point/affectation-point.component";
import { PagesModule } from "../pages.module";
import { CommissionConseilDetailComponent } from "./commission-conseil-detail/commission-conseil-detail.component";
import { ReunionCommissionConseilEditComponent } from "./reunion-commission-conseil-edit/reunion-commission-conseil-edit.component";
import { AudienceEditComponent } from "./audience-edit/audience-edit.component";
import { PresenceReunionCommissionComponent } from "./presence-reunion-commission/presence-reunion-commission.component";
import { PointReunionCommissionComponent } from "./point-reunion-commission/point-reunion-commission.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { TranslateModule } from "@ngx-translate/core";
import { MembreBureauAddComponent } from "./membre-bureau-add/membre-bureau-add.component";
import { MembreBureauEditComponent } from "./membre-bureau-edit/membre-bureau-edit.component";
import { MembreBureauDetailComponent } from "./membre-bureau-detail/membre-bureau-detail.component";
import { OrdreJourSessionListComponent } from "./ordre-jour-session-list/ordre-jour-session-list.component";
import { OrdreJourSessionFormComponent } from "./ordre-jour-session-form/ordre-jour-session-form.component";
import { OrdreJourSessionDetailComponent } from "./ordre-jour-session-detail/ordre-jour-session-detail.component";
import { OrdreJourSessionEditComponent } from "./ordre-jour-session-edit/ordre-jour-session-edit.component";
import { DecisionsPointListComponent } from "./decisions-point-list/decisions-point-list.component";
import { DecisionsPointFormComponent } from "./decisions-point-form/decisions-point-form.component";
import { DecisionsPointEditComponent } from "./decisions-point-edit/decisions-point-edit.component";
import { ReunionBureauFormComponent } from "./reunion-bureau-form/reunion-bureau-form.component";
import { ReunionBureauListComponent } from "./reunion-bureau-list/reunion-bureau-list.component";
import { ReunionBureauDetailComponent } from "./reunion-bureau-detail/reunion-bureau-detail.component";

@NgModule({
	declarations: [
		AffairesConseilComponent,
		SessionFormComponent,
		SessionEditComponent,
		SessionDetailComponent,
		SessionListComponent,
		PointFormComponent,
		PointEditComponent,
		PointDetailComponent,
		PointListComponent,
		MondatFormComponent,
		MondatListComponent,
		MondatEditComponent,
		MondatDetailComponent,
		PointListSessionComponent,
		CommissionConseilComponent,
		CommissionConseilEditComponent,
		ReunionCommissionConseilFormComponent,
		AudienceFormComponent,
		CommissionConseilListComponent,
		EvaluationPointBureauComponent,
		ReunionCommissionConseilListComponent,
		ReunionCommissionConseilDetailComponent,
		AudienceListComponent,
		EvaluationPointAudienceComponent,
		PointsAudienceComponent,
		PresenceAudienceComponent,
		RemarquesAudienceComponent,
		OrdreJourCommissionComponent,
		OrdreJourAudienceComponent,
		OrdreJourBureauComponent,
		AffectationPointComponent,
		CommissionConseilDetailComponent,
		ReunionCommissionConseilEditComponent,
		AudienceEditComponent,
		PresenceReunionCommissionComponent,
		PointReunionCommissionComponent,
		MembreBureauAddComponent,
		MembreBureauEditComponent,
		MembreBureauDetailComponent,
		OrdreJourSessionListComponent,
		OrdreJourSessionFormComponent,
		OrdreJourSessionDetailComponent,
		OrdreJourSessionEditComponent,
		DecisionsPointListComponent,
		DecisionsPointFormComponent,
		DecisionsPointEditComponent,
		ReunionBureauFormComponent,
		ReunionBureauListComponent,
		ReunionBureauDetailComponent,
	],
	imports: [
		PagesModule,
		MatAutocompleteModule,
		MatDividerModule,
		NgbModule,
		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
		MatCheckboxModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		//PartialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: AffairesConseilComponent,
				children: [
					{
						path: "ordreJour-commission-list",
						component: PointListComponent,
					},
					{
						path: "evaluation-points-bureau",
						component: EvaluationPointBureauComponent,
					},
					{
						path: "mondat-form",
						component: MondatFormComponent,
					},
					{
						path: "mondat-list",
						component: MondatListComponent,
					},
					{
						path: "mondat-detail",
						component: MondatDetailComponent,
					},
					{
						path: "mondat-edit",
						component: MondatEditComponent,
					},
					{
						path: "commission-list",
						component: CommissionConseilListComponent,
					},
					{
						path: "session-form",
						component: SessionFormComponent,
					},
					{
						path: "session-list",
						component: SessionListComponent,
					},
					{
						path: "session-detail",
						component: SessionDetailComponent,
						children: [
							{
								path: "point-list-session",
								component: PointListSessionComponent,
							},
							{
								path: "mondat-detail",
								component: MondatDetailComponent,
							},
						],
					},
					{
						path: "session-edit",
						component: SessionEditComponent,
						children: [
							{
								path: "point-list-session",
								component: PointListSessionComponent,
							},
						],
					},
					{
						path: "affectation-point",
						component: AffectationPointComponent,
					},
					{
						path: "point-form",
						component: PointFormComponent,
					},
					{
						path: "membre-bureau-form",
						component: MembreBureauAddComponent,
					},
					{
						path: "membre-bureau-edit",
						component: MembreBureauEditComponent,
					},
					{
						path: "membre-bureau-show",
						component: MembreBureauDetailComponent,
					},
					{
						path: "ordre-jour-session-form",
						component: OrdreJourSessionFormComponent,
					},
					{
						path: "ordre-jour-session-list",
						component: OrdreJourSessionListComponent,
					},
					{
						path: "decisions-points-list",
						component: DecisionsPointListComponent,
					},
					{
						path: "decision-point-show",
						component: DecisionsPointFormComponent,
					},
					{
						path: "decision-point-add-resultat",
						component: DecisionsPointEditComponent,
					},
					{
						path: "ordre-jour-session-show",
						component: OrdreJourSessionDetailComponent,
					},
					{
						path: "ordre-jour-session-edit",
						component: OrdreJourSessionEditComponent,
					},
					{
						path: "point-form",
						component: PointFormComponent,
					},
					{
						path: "reunion-bureau-form",
						component: ReunionBureauFormComponent,
					},
					{
						path: "reunion-bureau-list",
						component: ReunionBureauListComponent,
					},
					{
						path: "point-edit",
						component: PointEditComponent,
					},
					{
						path: "point-list",
						component: PointListComponent,
					},
					{
						path: "point-detail",
						component: PointDetailComponent,
					},
					{
						path: "commission-conseil-form",
						component: CommissionConseilComponent,
					},
					{
						path: "commission-conseil-edit",
						component: CommissionConseilEditComponent,
					},
					{
						path: "commission-conseil-detail",
						component: CommissionConseilDetailComponent,
					},
					{
						path: "audience-form",
						component: AudienceFormComponent,
					},
					{
						path: "audience-edit",
						component: AudienceEditComponent,
					},
					{
						path: "audience-list",
						component: AudienceListComponent,
					},
					{
						path: "ordre-jour-commission",
						component: OrdreJourCommissionComponent,
					},
					{
						path: "ordre-jour-bureau",
						component: OrdreJourBureauComponent,
					},
					{
						path: "ordre-jour-audience",
						component: OrdreJourAudienceComponent,
					},
					{
						path: "evaluation-points-audience",
						component: EvaluationPointAudienceComponent,
						children: [
							{
								path: "points",
								component: PointsAudienceComponent,
							},
							{
								path: "presence",
								component: PresenceAudienceComponent,
							},
							{
								path: "remarques",
								component: RemarquesAudienceComponent,
							},
						],
					},
					{
						path: "reunion-commission-form",
						component: ReunionCommissionConseilFormComponent,
					},
					{
						path: "reunion-commission-list",
						component: ReunionCommissionConseilListComponent,
					},
					{
						path: "reunion-commission-detail",
						component: ReunionCommissionConseilDetailComponent,
						children: [
							{
								path: "presence",
								component: PresenceReunionCommissionComponent,
							},
							{
								path: "points",
								component: PointReunionCommissionComponent,
							},
						],
					},
					{
						path: "reunion-commission-edit",
						component: ReunionCommissionConseilEditComponent,
					},
				],
			},
		]),
		MatButtonModule,
		MatCardModule,
		MatDatepickerModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatSelectModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatTooltipModule,
		NgxPermissionsModule.forChild(),
		TranslateModule.forChild(),
	],
})
export class AffairesConseilModule {}
