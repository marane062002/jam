import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../../utils/spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { AoService } from '../../../shared/ao.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../../../app/core/auth';

@Component({
  selector: 'kt-show-programme-previsionnel',
  templateUrl: './show-programme-previsionnel.component.html',
  styleUrls: ['./show-programme-previsionnel.component.scss']
})
export class ShowProgrammePrevisionnelComponent implements OnInit {

  constructor(private authService:AuthService,private datePipe: DatePipe,private service: AoService, private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService,private translate: TranslateService,) { }
  id
  programmePrevisionnel
  president
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

this.authService.getUserById(data.idPresident).then((res)=>{
this.president=res.fullname
})

					if (this.programmePrevisionnel.dateOuverturePlis != null && this.programmePrevisionnel.heureOuverturePlis!=null) {
						let a=typeof this.programmePrevisionnel.dateOuverturePlis
						
								this.programmePrevisionnel.dateOuverturePlis = this.datePipe.transform(this.programmePrevisionnel.dateOuverturePlis, 'yyyy-MM-dd')+' '+this.programmePrevisionnel.heureOuverturePlis;
							
					  }
				

				},
				(err) => {
					console.log(err);
				})
  }
  

}
