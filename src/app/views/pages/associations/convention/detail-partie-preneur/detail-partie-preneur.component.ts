import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PartiePreneurService } from '../../../shared/PartiePreneurService';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { SpinnerService } from '../../../utils/spinner.service';

@Component({
  selector: 'kt-detail-partie-preneur',
  templateUrl: './detail-partie-preneur.component.html',
  styleUrls: ['./detail-partie-preneur.component.scss']
})
export class DetailPartiePreneurComponent implements OnInit {
  id: number;
	details;
  constructor(
		private router: Router,
		private route: ActivatedRoute,
		private translate: TranslateService,
		private fileService: FilesUtilsService,
		private spinnerService: SpinnerService,
		private partiePreneurService :PartiePreneurService
	) {


	}

  ngOnInit() {

		
		this.route.queryParams.subscribe(params => {
			this.id = params['id'];
		});
		this.partiePreneurService.findById(this.id).subscribe(res=>{
			console.log(res);
			this.details=res;
		},err=>{
			console.log(err)
		})
	} 

}
