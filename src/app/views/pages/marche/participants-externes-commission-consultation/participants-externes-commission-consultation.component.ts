import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultationService } from '../../shared/consultation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'kt-participants-externes-commission-consultation',
  templateUrl: './participants-externes-commission-consultation.component.html',
  styleUrls: ['./participants-externes-commission-consultation.component.scss']
})
export class ParticipantsExternesCommissionConsultationComponent implements OnInit {

  idconsultation;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumnsPE = ['nom', 'organisme','tele','role', 'present','justif'];
  dataSourcePE: MatTableDataSource<any>;

  constructor(private service : ConsultationService,private router: Router,
    private activatedRoute: ActivatedRoute)
   {this.getParticipants(); }


  ngOnInit() {
  }
  getParticipants(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.idconsultation= params['id'];
     });
     this.service.getPEbyConsultation(this.idconsultation).then(data => {
      this.dataSourcePE = new MatTableDataSource(data);
     })
  }

}
