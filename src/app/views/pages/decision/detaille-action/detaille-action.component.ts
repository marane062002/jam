import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
	selector: "kt-detaille-action",
	templateUrl: "./detaille-action.component.html",
	styleUrls: ["./detaille-action.component.scss"],
})
export class DetailleActionComponent implements OnInit {
	actdecId: number;
    actDecDetails: any;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});

    private baseUrl = environment.API_BMH_URL;
	constructor(private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient
		) {}

	ngOnInit() : void {
		this.route.params.subscribe((params) => {
			this.actdecId = +params['id']; 
		  });
		  this.fetchActDecDetails()
	}

	fetchActDecDetails(): void {
		const url = `${this.baseUrl}actions-dec/${this.actdecId}`;

	
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.actDecDetails = response;
			console.log("Etablissement Details:", this.actDecDetails);
		  },
		  (error) => {
			console.error("Error fetching etablissement details:", error);
		  }
		);
	}
	RetourEmbalages() {
		this.router.navigate(["pages/detaille-action/list-action"]);
	}
}
