import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from "@angular/material";
@Component({
	selector: "kt-detaille-sortie",
	templateUrl: "./detaille-sortie.component.html",
	styleUrls: ["./detaille-sortie.component.scss"],
})
export class DetailleSortieComponent implements OnInit {
	history: boolean = false;
	details;

	  sortieId: number;
    sortieDetails: any;
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

	ngOnInit() {
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
			this.sortieId = +params['id']; 
		  });
		  this.fetchSortieDetails()
		  this.getAllPjImm(this.sortieId)
	}

	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-sortie/index/${ide}`)
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
        window.open(this.AlfresscoURL + "/bmh-sortie/" + r, "_blank");
    }
  fetchSortieDetails(): void {
		const url = `${this.baseUrl}sortie/${this.sortieId}`;

	
		this.httpClient.get(url,{ headers: this.headers }).subscribe(
		  (response) => {
			this.sortieDetails = response;
			console.log("Etablissement Details:", this.sortieDetails);
		  },
		  (error) => {
			console.error("Error fetching etablissement details:", error);
		  }
		);
	  }


	RetourEmbalages() {
		this.router.navigate(["/sortie/list-sortie"]);
	}
}




// <item>
// <id>250</id>
// <date>1519084800000</date>
// <lieu>182 New Road</lieu>
// <adresse>63 First Drive</adresse>
// <procesVerbal>1705681377672_66589074-47289617.jpg</procesVerbal>
// <remarques>669 West New Drive</remarques>
// <pieceJointe>1705681377672_hotel.png</pieceJointe>
// <equipes>
//     <equipes>
//         <id>3</id>
//         <nom>ghgh</nom>
//         <prenom>ghgh</prenom>
//         <cin>ghgh</cin>
//         <tel>fgh</tel>
//     </equipes>
//     <equipes>
//         <id>2</id>
//         <nom>hghgh</nom>
//         <prenom>fghfg</prenom>
//         <cin>hfgh</cin>
//         <tel>585854</tel>
//     </equipes>
// </equipes>
// <objetSortie>
//     <id>3</id>
//     <libelle>dfg</libelle>
//     <description>fdgfdg</description>
// </objetSortie>
// <typeTraitement>
//     <id>3</id>
//     <libelle>dfgf</libelle>
//     <description>fgdfg</description>
// </typeTraitement>
// <commune>
//     <id>2</id>
//     <libelle>fghfgh</libelle>
//     <description>fghfgh</description>
// </commune>
// <arrondissement>
//     <id>3</id>
//     <libelle>fghfgh</libelle>
//     <description>fghfgh</description>
// </arrondissement>
// <quartier>
//     <id>3</id>
//     <libelle>fghfgh</libelle>
//     <description>fghfgh</description>
// </quartier>
// <produitUtilise>
//     <id>3</id>
//     <libelle>ghfghfgh</libelle>
//     <description>fghfgh</description>
// </produitUtilise>
// <quantite>
//     <id>3</id>
//     <libelle>fghfgh</libelle>
//     <description>ghfgh</description>
// </quantite>
// </item>