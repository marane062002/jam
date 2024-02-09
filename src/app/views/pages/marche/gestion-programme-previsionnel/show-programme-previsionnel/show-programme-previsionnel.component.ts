import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../utils/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { AoService } from '../../../shared/ao.service';

@Component({
  selector: 'kt-show-programme-previsionnel',
  templateUrl: './show-programme-previsionnel.component.html',
  styleUrls: ['./show-programme-previsionnel.component.scss']
})
export class ShowProgrammePrevisionnelComponent implements OnInit {

  constructor(private service: AoService, private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService,private translate: TranslateService,) { }
  id
  programmePrevisionnel
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

		this.service
			.getProgrammePrevisionnelById(this.id)
			.pipe(
				finalize(() => {
					this.spinnerService.stop(spinnerRef); // stop spinner
				})
			)
			.subscribe(
				(data) => {
					this.programmePrevisionnel = data;

				
				

				},
				(err) => {
					console.log(err);
				})
  }
  

}
