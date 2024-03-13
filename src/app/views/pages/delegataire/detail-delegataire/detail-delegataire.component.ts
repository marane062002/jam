import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Delegataire } from "../models/delegataire/delegataire.model";
import { DelegataireService } from "../service/delegataire/delegataire.service";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";

//import {StructureDelegataire} from '../../parametrages-sdl-delegataire/models/structureDelegataire/structureDelegataire.model';
@Component({
	selector: "kt-detail-delegataire",
	templateUrl: "./detail-delegataire.component.html",
	styleUrls: ["./detail-delegataire.component.scss"],
})
export class DetailDelegataireComponent implements OnInit {
	Delegataire: Delegataire;
	id:any;
	baseUrl = environment.API_SDL_URL
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	delegataire: Delegataire;
	details;
	history: any;
	displayedColumns2=['nomDoc','titre','dow']
	dataSource2 = new MatTableDataSource<any>();
	constructor(
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private delegataireService: DelegataireService
	) {}



	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.httpClient.get<any[]>(`${this.baseUrl}delegataire/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.details = res
		});
		this.getAllPjImm(this.id)

	}
	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/delegataire-pj/index/${ide}`)
		.subscribe(
            (data:any) => {
                this.dataSource2 = new MatTableDataSource(data);
            },
            (error) => console.log(error)
        );
    }
	onClickPj(e, id) {
        var r = e.substring(0, e.length - 4);
        window.open(this.AlfresscoURL + "/delegataire-pj/" + r, "_blank");
    }
	Back(): void {
		this.router.navigate(["delegataire/delegataires"]);
	}
}
