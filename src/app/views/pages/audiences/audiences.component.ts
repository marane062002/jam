import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
declare var $: any;
@Component({
  selector: 'kt-audiences',
  templateUrl: './audiences.component.html',
  styleUrls: ['./audiences.component.scss']
})
export class AudiencesComponent implements OnInit {
  data: excelData[] = [];
  dataSource = new MatTableDataSource<any>();
  columns: any[];
  displayedColumns: string[] = [
    "objet",
    "tribunal",
    "date",
    "type",
    "affaire",
    "actions",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() {
    this.data = [{
      "objet": "Objet d'audience 1 ",
      "tribunal": "Tribunal 1",
      "date": "12-07-2022",
      "type": "Type d'audience 1",
      "affaire": "Num 2/2022",
    },
    {
      "objet": "Objet d'audience 2 ",
      "tribunal": "Tribunal 2",
      "date": "15-07-2022",
      "type": "Type d'audience 2",
      "affaire": "Num 45/2022",
    },
    {
      "objet": "Objet d'audience 3 ",
      "tribunal": "Tribunal 1",
      "date": "13-07-2022",
      "type": "Type d'audience 1",
      "affaire": "Num 21/2022",
    },
    {
      "objet": "Objet d'audience 5 ",
      "tribunal": "Tribunal 1",
      "date": "18-07-2022",
      "type": "Type d'audience 1",
      "affaire": "Num 5/2022",
    },

    ]
  }

  ngOnInit() {
    this.columns = [
      "objet",
      "tribunal",
      "date",
      "type",
      "affaire",
      "actions",];
    this.dataSource = new MatTableDataSource(this.data);

    //   setTimeout(() => {
    //     $("#calendar").fullCalendar({ 
    //       height: 750, 
    //                     header: {
    //                         left   : 'prev,next today',
    //                         center : 'title',
    //                         right  : 'month,agendaWeek,agendaDay'
    //                     },
    //                     navLinks   : true,
    //                     editable   : true,
    //                     eventLimit : true,
    //                     events: [
    //                       {
    //                         title : 'Audience Num112 ',
    //                         start : '2022-07-07T08:30:00',
    //                         allDay : false, // will make the time show,
    //                         color  : "#57cd5f"
    //                     },
    //                         {
    //                             title : 'Audience Num10 ',
    //                             start : '2022-07-13T09:30:00',
    //                             color : '#f9c66a' // override!
    //                         },
    //                         {
    //                             title : 'Audience Num123 ',
    //                             start : '2022-07-13T10:30:00',
    //                             end   : '2019-03-09',
    //                             color : "#019efb"
    //                         },
    //                         {
    //                             title : 'Audience Num52 ',
    //                             start : '2022-07-15T10:30:00',
    //                             allDay : false, // will make the time show,
    //                             color  : "#57cd5f"
    //                         }
    //                     ],  // request to load current events
    //                 });

    //  }, 100);
  }

}
export interface excelData {


  objet: string;
  tribunal: string;
  date: string;
  type: string;
  affaire: string;
}
