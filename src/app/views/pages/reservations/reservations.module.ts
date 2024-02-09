import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReservationsComponent } from "./reservations.component";
import { ReservationsDetailComponent } from "./reservations-detail/reservations-detail.component";
import { ReservationsListComponent } from "./reservations-list/reservations-list.component";
import { ReservationsFormComponent } from "./reservations-form/reservations-form.component";
import { ReservationsTraitementComponent } from "./reservations-traitement/reservations-traitement.component";
import { RouterModule } from "@angular/router";
import { BienReservationListComponent } from "./bien-reservation-list/bien-reservation-list.component";
import { BienReservationFormComponent } from "./bien-reservation-form/bien-reservation-form.component";
import { BienReservationEditComponent } from "./bien-reservation-edit/bien-reservation-edit.component";
import { BienReservatiosDetailComponent } from "./bien-reservatios-detail/bien-reservatios-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
	NgbTooltipModule,
	NgbDropdownModule,
	NgbTabsetModule,
	NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import {
	MatButtonModule,
	MatCardModule,
	MatDatepickerModule,
	MatCheckboxModule,
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
} from "@angular/material";
import { ReservationTraitementPaiementComponent } from "./reservation-traitement-paiement/reservation-traitement-paiement.component";
import { ReservationEditComponent } from "./reservation-edit/reservation-edit.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ReservationsComponent,
		ReservationsDetailComponent,
		ReservationsListComponent,
		ReservationsFormComponent,
		ReservationsTraitementComponent,
		BienReservationListComponent,
		BienReservationFormComponent,
		BienReservationEditComponent,
		BienReservatiosDetailComponent,
		ReservationTraitementPaiementComponent,
		ReservationEditComponent,
	],
	imports: [
		NgbModule,
		NgbDropdownModule,
		NgbTabsetModule,
		NgbTooltipModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		RouterModule.forChild([
			{
				path: "",
				component: ReservationsComponent,
				children: [
					{
						path: "reservation-detail",
						component: ReservationsDetailComponent,
					},
					{
						path: "reservations-list",
						component: ReservationsListComponent,
					},
					{
						path: "reservation-form",
						component: ReservationsFormComponent,
					},
					{
						path: "reservation-traitement",
						component: ReservationsTraitementComponent,
					},
					{
						path: "reservation-edit",
						component: ReservationEditComponent,
					},
					{
						path: "reservation-traitement-paiement",
						component: ReservationTraitementPaiementComponent,
					},
					{
						path: "bienreservation-detail",
						component: BienReservatiosDetailComponent,
					},
					{
						path: "bienreservation-edit",
						component: BienReservationEditComponent,
					},
					{
						path: "bienreservations-list",
						component: BienReservationListComponent,
					},
					{
						path: "bienreservation-form",
						component: BienReservationFormComponent,
					},
				],
			},
		]),
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
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
export class ReservationsModule {}
