import { Component, OnInit } from "@angular/core";
import { FourgonService } from "../services/fourgon.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from "@angular/material";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: "kt-deatils-fourgon",
	templateUrl: "./deatils-fourgon.component.html",
	styleUrls: ["./deatils-fourgon.component.scss"],
})
export class DeatilsFourgonComponent implements OnInit {
	id: any;
	info: any;
	dataSource2 = new MatTableDataSource<any>();
	displayedColumns2=['nomDoc','titre','dow'];
	AlfresscoURL = environment.API_ALFRESCO_URL
	constructor(private httpClient:HttpClient ,private service: FourgonService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = params["id"]; // Récupération de l'ID à partir des paramètres de l'URL

			this.service.getById(this.id).subscribe(
				(data: any) => {
					this.info = data; // Stocker les informations récupérées dans la variable 'info'
				},
				(error: any) => {
					console.error("Erreur lors de la récupération des données :", error);
				}
			);
		});
		this.getAllPjImm(this.id)
	}
	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-fourgon/index/${ide}`)
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
        window.open(this.AlfresscoURL + "/bmh-fourgon/" + r, "_blank");
    }
	RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-fourgon"]);
	}
}
