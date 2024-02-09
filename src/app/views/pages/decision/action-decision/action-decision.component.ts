import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { not } from "@angular/compiler/src/output/output_ast";

@Component({
	selector: "kt-action-decision",
	templateUrl: "./action-decision.component.html",
	styleUrls: ["./action-decision.component.scss"],
})
export class ActionDecisionComponent implements OnInit {
	denomination : any;
	description : any;
	delais : any;
	note : any = 14;
	private baseUrl = environment.API_BMH_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private router: Router, private httpClient: HttpClient) {}

	ngOnInit() {}

	createAction(){
	const data : any = {
		description: this.description,
		denomination: this.denomination ,
		delaisReponse: this.delais,
		note : this.note
	}
	this.httpClient.post<any>(`${this.baseUrl}actions-dec`, data,{ headers: this.headers }).subscribe(
        (response) => {
            console.log("Etablissement created successfully:", response);
            this.router.navigate(["/actdecision/list-action"]);
        },
        (error) => {
            console.error("Error creating etablissement:", error);
        }
    );	
	}
	
	EtapeDernier() {
		this.router.navigate(["pages/Etablissement/list-action"]);
	}
	RetourEmbalages() {
		this.router.navigate(["/actdecision/list-action"]);
	}
}
