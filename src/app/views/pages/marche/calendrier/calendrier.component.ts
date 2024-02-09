import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from "@fullcalendar/angular"; 
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AoService } from '../../shared/ao.service';
import { DatePipe } from '@angular/common';
import { ModalShowCalendrierAoComponent } from '../modal-show-calendrier-ao/modal-show-calendrier-ao.component';

export interface IEvent {
	title?: string;
	date?: string;
	color?: string;


  }
@Component({
  selector: 'kt-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
}) 

export class CalendrierComponent implements OnInit {
  language?: string = localStorage.getItem("language") || 'ar';
	isLoading: boolean = true;
	newEvents: IEvent[] = [];

	calendarOptions: CalendarOptions = {
		initialView: 'dayGridMonth',
		dateClick: this.handleDateClick.bind(this), 
		events: (info, successCallback, failureCallback) => {
			this.isLoading = true;
			const start = info.startStr;
			const start1 = new Date(start);
			const startDate = `${start1.getFullYear()}-${String(start1.getMonth() + 1).padStart(2, '0')}`;
this.serviceAo.findAllByPagesByEtatCommentaire(1).then((res)=>{
	this.newEvents = [];
				res.content.map(ao => {
							const newAo = this.createEvent(ao);
							
							this.newEvents.push(newAo!);
						});
						successCallback(this.newEvents)
					
})
		

		},
	  };
	
	  handleDateClick(arg) {
		this.dialogRef.open(ModalShowCalendrierAoComponent, {
			width: '500px',
			disableClose: true,
			data: { dateToday: arg.date }
		});
	  }
	  createEvent(ao: any) {
		let newDate
		

		let color: string;
		let title1: string;
if(ao.refDeAppelOffre!=null && ao.dateOuverturePlis!=null){
	newDate = this.datepipe.transform(ao.dateOuverturePlis, 'yyyy-MM-dd');

	title1 = ao.refDeAppelOffre;
	color = '#17A2B8';
}
		else {
			title1 = '';
			color = 'black';

		}

	


		const newEvent: IEvent = {
			title: title1,
			date: newDate.toString(),
			color: color,
		};
		return newEvent;
	}
  constructor(private dialogRef: MatDialog, private translate: TranslateService,private serviceAo:AoService, public datepipe: DatePipe) { }

  ngOnInit() {
  }}


