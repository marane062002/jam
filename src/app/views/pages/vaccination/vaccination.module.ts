import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VaccinationComponent } from "./vaccination.component";
import {
	MatDialogModule,
	MatIconModule,
	MatStepperModule,
} from "@angular/material";
import { PagesModule } from "../pages.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MaterialsModule } from "../utils/materials/materials.module";
import { RouterModule } from "@angular/router";
import { ProgramVaccinationComponent } from "./program-vaccination/program-vaccination.component";
import { ListVaccinationComponent } from "./list-vaccination/list-vaccination.component";
import { UpdVaccinationComponent } from "./upd-vaccination/upd-vaccination.component";
import { DetailleVaccinationComponent } from "./detaille-vaccination/detaille-vaccination.component";
import { CalendarVaccinationComponent } from "./calendar-vaccination/calendar-vaccination.component";

// FullCalendar
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!

FullCalendarModule.registerPlugins([
	// register FullCalendar plugins
	dayGridPlugin,
	interactionPlugin,
]);

@NgModule({
	declarations: [
		VaccinationComponent,
		ListVaccinationComponent,
		ProgramVaccinationComponent,
		UpdVaccinationComponent,
		DetailleVaccinationComponent,
		CalendarVaccinationComponent,
	],
	imports: [
		MatDialogModule,
		MatStepperModule,
		MatIconModule,
		PagesModule,
		FullCalendarModule, // register FullCalendar with you app
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MaterialsModule,
		RouterModule.forChild([
			{
				path: "",
				component: VaccinationComponent,
				children: [
					{
						path: "list-vaccination",
						component: ListVaccinationComponent,
					},
					{
						path: "program-vaccination",
						component: ProgramVaccinationComponent,
					},
					{
						path: "upd-vaccination/:id",
						component: UpdVaccinationComponent,
					},
					{
						path: "detaille-vaccination/:id",
						component: DetailleVaccinationComponent,
					},
					{
						path: "calendar-vaccination",
						component: CalendarVaccinationComponent,
					},
				],
			},
		]),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VaccinationModule {}
