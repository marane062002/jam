import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";

@Component({
	selector: "kt-detaille-vaccination",
	templateUrl: "./detaille-vaccination.component.html",
	styleUrls: ["./detaille-vaccination.component.scss"],
})
export class DetailleVaccinationComponent implements OnInit {
	vaccinationId: number;
	vaccinationDetails: any;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	dataSource2 = new MatTableDataSource<any>();
	displayedColumns2=['nomDoc','titre','dow']
	details;
	 private baseUrl = environment.API_BMH_URL;
	 AlfresscoURL = environment.API_ALFRESCO_URL
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private httpClient: HttpClient
		) {}

	ngOnInit() {
		this.details = {
			num: "1/2022",
			nom: "nom affaire 1 ",
			defendresse: "Test",
			tribunal: "Tech ",
			typeAffaire: "Administratif",
			demandresse: "Partie  ",
			dateDepot: "01-12-2019",
			dateDebut: "01-01-2020",
			objet: "Objet d'affaire",
			ville: "Rabat",
		};
		this.route.params.subscribe((params) => {
			this.vaccinationId = +params['id']; 
		  });
		  this.fetchVaccinationDetails()
		  this.getAllPjImm(this.vaccinationId)
	}
	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-vaccination/index/${ide}`)
		.subscribe(
            (data:any) => {
				// debugger
                this.dataSource2 = new MatTableDataSource(data);
            },
            (error) => console.log(error)
        );
    }
	onClickPj(e, id) {
        var r = e.substring(0, e.length - 4);
        window.open(this.AlfresscoURL + "/bmh-vaccination/" + r, "_blank");
    }
	fetchVaccinationDetails(): void {
		// this.servicev.getAllVaccination(page,pageSize).subscribe((response: any) => {
		// 	this.data = response.content;
		// 	this.dataSource.data = response.content;
		// 	this.totalRecords = response.totalElements;
		// 	this.isLoadingResults = false;
		// });


		const url = `${this.baseUrl}vaccination/${this.vaccinationId}`;
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.vaccinationDetails = response;
			console.log("Vaccination Details:", this.vaccinationDetails);
		  },
		  (error) => {
			console.error("Error fetching carte details:", error);
		  }
		);
	}
	RetourEmbalages() {
		this.router.navigate(["vaccination/list-vaccination"]);
	}
}
