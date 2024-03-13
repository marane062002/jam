import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../../../environments/environment";
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExcelAssociationService } from '../../../utils/excel-association.service';
@Component({
  selector: 'kt-show-penalite',
  templateUrl: './show-penalite.component.html',
  styleUrls: ['./show-penalite.component.scss']
})
export class ShowPenaliteComponent implements OnInit {
  carteDetails:any;
	id:any;
  baseUrl = environment.API_PROPRETE_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
  constructor(
		private translate: TranslateService,
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService
	) {
	
	}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
		this.httpClient.get<any[]>(`${this.baseUrl}penalite/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.carteDetails = res
		});
  }

}
