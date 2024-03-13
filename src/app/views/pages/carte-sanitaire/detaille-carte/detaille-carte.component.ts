import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";


@Component({
	selector: "kt-detaille-carte",
	templateUrl: "./detaille-carte.component.html",
	styleUrls: ["./detaille-carte.component.scss"],
})
export class DetailleCarteComponent implements OnInit {
	carteId: number;
    carteDetails: any;
	dataSource2 = new MatTableDataSource<any>();
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	displayedColumns2=['nomDoc','titre','dow']
    private baseUrl = environment.API_BMH_URL;
	AlfresscoURL = environment.API_ALFRESCO_URL
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient
		) {}

	ngOnInit() : void {
		
		this.route.params.subscribe((params) => {
			this.carteId = +params['id']; 
		  });
		  this.fetchCarteDetails();
		  this.getAllPjImm(this.carteId)
	}

	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-cartesanitaire/index/${ide}`)
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
        window.open(this.AlfresscoURL + "/bmh-cartesanitaire/" + r, "_blank");
    }

	fetchCarteDetails(): void {
		const url = `${this.baseUrl}employeur/${this.carteId}`;
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.carteDetails = response;
			console.log("Carte sanitaire Details:", this.carteDetails);
		  },
		  (error) => {
			console.error("Error fetching carte details:", error);
		  }
		);
	}
	RetourEmbalages() {
		this.router.navigate(["/cartesanitaire/list-cartes"]);
	}
}
