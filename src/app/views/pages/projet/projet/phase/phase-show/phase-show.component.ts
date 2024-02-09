import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ProjetService } from '../../../services/projet.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'kt-phase-show',
  templateUrl: './phase-show.component.html',
  styleUrls: ['./phase-show.component.scss']
})
export class PhaseShowComponent implements OnInit {

  id: number;
  phase: any;
  constructor(
    private service: ProjetService,
    private router: Router,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService, ) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getPhase(this.id)
  }

  ngOnInit() {


  }
  getPhase(id) {
    setTimeout(() => { this.SpinnerService.show() }, 25);

    this.service.getPhaseById(this.id)
      .then(data => {
        this.phase = data;
        console.log(this.phase);
        setTimeout(() => { this.SpinnerService.hide() }, 2000);
      }, error => {
        console.log(error);
        setTimeout(() => { this.SpinnerService.hide() }, 2000);
      });

  }
  public phaseDelete(id: number) {
    this.service.deletePhase(id)
      .subscribe(
        data => {
          console.log(data),
            this.router.navigate(['phase/phase-index'])

        },
        error => console.log(error));
  }

  back(id) {
    this.router.navigate(['/projet/projet-show'], { queryParams: { id: id } })
  }

}
