import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
@Component({
	selector: "kt-detaille-etablissement",
	templateUrl: "./detaille-etablissement.component.html",
	styleUrls: ["./detaille-etablissement.component.scss"],
})
export class DetailleEtablissementComponent implements OnInit {


	etablissementId: number;
    etablissementDetails: any;

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

	ngOnInit() : void {
		// this.details = {
		// 	num: "1/2022",
		// 	nom: "nom affaire 1 ",
		// 	defendresse: "Test",
		// 	tribunal: "Tech ",
		// 	typeAffaire: "Administratif",
		// 	demandresse: "Partie  ",
		// 	dateDepot: "01-12-2019",
		// 	dateDebut: "01-01-2020",
		// 	objet: "Objet d'affaire",
		// 	ville: "Rabat",
		// };

		this.route.params.subscribe((params) => {
			this.etablissementId = +params['id']; 
		  });
		  this.fetchEtablissementDetails()
	}

	fetchEtablissementDetails(): void {
		const url = `${this.baseUrl}etablissements/${this.etablissementId}`;

	
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.etablissementDetails = response;
			console.log("Etablissement Details:", this.etablissementDetails);
		  },
		  (error) => {
			console.error("Error fetching etablissement details:", error);
		  }
		);
	  }

	RetourEmbalages() {
		this.router.navigate(["/etablissement/list-etablissement"]);
	}
}
