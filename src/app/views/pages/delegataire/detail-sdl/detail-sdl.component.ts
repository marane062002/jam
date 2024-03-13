import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Sdl } from "../models/sdl/sdl.model";
import { SdlService } from "../service/sdl/sdl.service";
import {DelegataireService} from '../service/delegataire/delegataire.service';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";
@Component({
	selector: "kt-detail-sdl",
	templateUrl: "./detail-sdl.component.html",
	styleUrls: ["./detail-sdl.component.scss"],
})
export class DetailSdlComponent implements OnInit {
	Sdl: Sdl;
	sdl: Sdl;
	details;
	id:any;
	dataSource2 = new MatTableDataSource<any>();
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	baseUrl = environment.API_SDL_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	displayedColumns2=['nomDoc','titre','dow']
	history: any;
	constructor(
		private route: ActivatedRoute,
		private httpClient: HttpClient,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private sdlService: SdlService
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.httpClient.get<any[]>(`${this.baseUrl}sdl/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.details = res
		});
		this.getAllPjImm(this.id)
	}
	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/sdl-pj/index/${ide}`)
		.subscribe(
            (data:any) => {
                this.dataSource2 = new MatTableDataSource(data);
            },
            (error) => console.log(error)
        );
    }
	onClickPj(e, id) {
        var r = e.substring(0, e.length - 4);
        window.open(this.AlfresscoURL + "/sdl-pj/" + r, "_blank");
    }
	Back(): void {
		this.router.navigate(["delegataire/sdl"]);
	}
}
