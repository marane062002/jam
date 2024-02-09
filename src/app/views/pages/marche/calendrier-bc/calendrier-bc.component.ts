import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CalendarOptions } from '@fullcalendar/angular';
import { TranslateService } from '@ngx-translate/core';
import { ConsultationService } from '../../shared/consultation.service';
import { DatePipe } from '@angular/common';
import { ModalShowCalendrierBcComponent } from '../modal-show-calendrier-bc/modal-show-calendrier-bc.component';

export interface IEvent {
  title?: string;
  date?: string;
  color?: string;
}

@Component({
  selector: 'kt-calendrier-bc',
  templateUrl: './calendrier-bc.component.html',
  styleUrls: ['./calendrier-bc.component.scss']
})
export class CalendrierBcComponent {
  isLoading: boolean = true;
  newEvents: IEvent[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: (info, successCallback, failureCallback) => {
      this.isLoading = true;
      const start = info.startStr;
      const start1 = new Date(start);
      const startDate = `${start1.getFullYear()}-${String(start1.getMonth() + 1).padStart(2, '0')}`;
      this.service.findByStatutBCOrderByIdDesc(1).then((res) => {
        this.newEvents = [];
        res.content.map(ao => {
          const newAo = this.createEvent(ao);
          this.newEvents.push(newAo!);
        });
        successCallback(this.newEvents);
      })
    },
    dateClick: this.handleDateClick.bind(this)
  };

  handleDateClick(arg: any) {
    this.dialogRef.open(ModalShowCalendrierBcComponent, {
      width: '500px',
      disableClose: true,
      data: { dateToday: arg.dateStr }
    });
  }

  createEvent(ao: any) {
	let newDate
	

	let color: string;
	let title1: string;
if(ao.refDeBC!=null && ao.dateOuverturePlis!=null){
newDate = this.datepipe.transform(ao.dateOuverturePlis, 'yyyy-MM-dd');

title1 = ao.refDeBC;
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

  constructor(private dialogRef: MatDialog, private translate: TranslateService, private service: ConsultationService, public datepipe: DatePipe) { }
}
