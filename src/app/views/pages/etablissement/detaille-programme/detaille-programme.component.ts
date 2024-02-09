import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
	selector: "kt-detaille-programme",
	templateUrl: "./detaille-programme.component.html",
	styleUrls: ["./detaille-programme.component.scss"],
})
export class DetailleProgrammeComponent implements OnInit {
	programmeId: number;
	programmeDetails: any;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	private baseUrl = environment.API_BMH_URL;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient
		) {}
    
	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.programmeId = +params['id']; 
		  });
		  this.fetchProgrammeDetails()
	}
	fetchProgrammeDetails(): void {
		const url = `${this.baseUrl}programme/${this.programmeId}`;
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.programmeDetails = response;
			console.log("Carte sanitaire Details:", this.programmeDetails);
		  },
		  (error) => {
			console.error("Error fetching carte details:", error);
		  }
		);
	}
	RetourEmbalages() {
		this.router.navigate(["/etablissement/list-programme"]);
	}
}
