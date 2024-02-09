import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
	selector: "kt-upd-action",
	templateUrl: "./upd-action.component.html",
	styleUrls: ["./upd-action.component.scss"],
})
export class UpdActionComponent implements OnInit {
	actionId: number;
	actionDetails : any;
	private baseUrl = environment.API_BMH_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private router: Router, private httpClient: HttpClient,private route: ActivatedRoute) {}
	denomination : any;
	description : any;
	note : any = 14;
	delais : any;
	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.actionId = +params['id']; 
		  });
		  this.fetchActionDetails();
	}
	fetchActionDetails(): void{
		const url = `${this.baseUrl}actions-dec/${this.actionId}`;
		this.httpClient.get(url, { headers: this.headers }).subscribe(
			(response) => {
			  this.actionDetails = response;
			  console.log("Actions Details:", this.actionDetails);
			  this.description = this.actionDetails.description;
			  this.delais = this.actionDetails.delaisReponse;
			  this.denomination = this.actionDetails.denomination;
			},
			(error) => {
			  console.error("Error fetching action details:", error);
			}
		  );
	}
	updateAction():void{
		const data : any = {
			description: this.description,
			denomination: this.denomination ,
			delaisReponse: this.delais,
			note: this.note
		}
		this.httpClient.put<any>(`${this.baseUrl}actions-dec/${this.actionId}`, data,{ headers: this.headers }).subscribe(
			(response) => {
				console.log("Action updated successfully:", response);
				this.router.navigate(["/actdecision/list-action"]);
			},
			(error)  => {
				console.error("Error updating action:", error);
			}
		);
	}
	RetourEmbalages() {
		this.router.navigate(["/actdecision/list-action"]);
	}
}
