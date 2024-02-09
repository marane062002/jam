import { Component, OnInit } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/angular";
import frLocale from "@fullcalendar/core/locales/fr";

import { Router } from "@angular/router";
@Component({
	selector: "kt-calendar-vaccination",
	templateUrl: "./calendar-vaccination.component.html",
	styleUrls: ["./calendar-vaccination.component.scss"],
})
export class CalendarVaccinationComponent implements OnInit {
	constructor(private router: Router) {}

	calendarOptions: CalendarOptions = {
		initialView: "dayGridMonth",
		locale: frLocale,
		events: [
			{
				title: "Programme de vaccination 1",
				date: "2023-03-01",
				color: "red",
			},
			{
				title: "Programme de vaccination 2",
				date: "2023-03-15",
				color: "orange",
			},
			{
				title: "Programme de vaccination 3",
				date: "2023-03-20",
				color: "blue",
			},
			{
				title: "Programme de vaccination 4",
				date: "2023-03-29",
				color: "pink",
			},
			{
				title: "Programme de vaccination 5",
				date: "2023-03-10",
				color: "green",
			},
		],
	};

	ngOnInit() {}
}
