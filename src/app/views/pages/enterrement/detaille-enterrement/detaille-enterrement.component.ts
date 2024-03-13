import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { EnterementInhumService } from "../../medecin-legale-bmh/services/enterement-inhum.service";
import { MatTableDataSource } from "@angular/material";
@Component({
	selector: "kt-detaille-enterrement",
	templateUrl: "./detaille-enterrement.component.html",
	styleUrls: ["./detaille-enterrement.component.scss"],
})
export class DetailleEnterrementComponent implements OnInit {
	enterrementId: number;
    enterrementDetails: any;
	dataSource2 = new MatTableDataSource<any>();
	displayedColumns2=['nomDoc','titre','dow']
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
    private baseUrl = environment.API_BMH_URL;
	AlfresscoURL = environment.API_ALFRESCO_URL
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private datePipe: DatePipe,
		private enterserv: EnterementInhumService
		) {}

		ngOnInit() : void {
			this.route.params.subscribe((params) => {
				this.enterrementId = +params['id']; 
			  });
			  this.fetchEnterrements()
			  this.getAllPjImm(this.enterrementId)
		}
		async getAllPjImm(ide) {
			await this.httpClient.get(`${this.AlfresscoURL}/enterrement/index/${ide}`)
			.subscribe(
				(data:any) => {
					// 
					this.dataSource2 = new MatTableDataSource(data);
				},
				(error) => console.log(error)
			);
		}
		onClickPj(e, id) {
			var r = e.substring(0, e.length - 4);
			window.open(this.AlfresscoURL + "/enterrement/" + r, "_blank");
		}
		fetchEnterrements(): void {
			const url = `${this.baseUrl}enterrement/${this.enterrementId}`;
			this.enterserv.getById(this.enterrementId).subscribe(
			  (response) => {
				this.enterrementDetails = response;
				this.enterrementDetails.dateEnterementObstacle = this.formatDate(this.enterrementDetails.dateEnterementObstacle);
		        this.enterrementDetails.origine.date = this.formatDate(this.enterrementDetails.origine.date);
				console.log("Carte sanitaire Details:", this.enterrementDetails);
			  },
			  (error) => {
				console.error("Error fetching carte details:", error);
			  }
			);
		  }
		
		  formatDate(date: any): string {
			return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
		  }
	RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-enterementInhum"]);
	}
}
