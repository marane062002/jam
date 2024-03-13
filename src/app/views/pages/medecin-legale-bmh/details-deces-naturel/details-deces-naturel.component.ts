import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DecesNaturelsService } from "../services/deces-naturels.service";
import { MatDialog, MatTableDataSource } from "@angular/material";
import { BehaviorSubject, Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { Association360Tab } from "../details-obstacles/details-obstacles.component";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PopupDecesComponent } from "./popup-deces/popup-deces.component";

@Component({
	selector: "kt-details-deces-naturel",
	templateUrl: "./details-deces-naturel.component.html",
	styleUrls: ["./details-deces-naturel.component.scss"],
})
export class DetailsDecesNaturelComponent implements OnInit {
	id: any;
	info: any;
	data:any;
	dataSource2 = new MatTableDataSource<any>();
	displayedColumns2=['nomDoc','titre','dow']
	asyncTabs: Observable<Association360Tab[]>;
	selected = new FormControl(0);
	details;
	isLoadingResults = true;
	files: Observable<any>;
	start: boolean = true;
	assocInfo: boolean = false;
	nbMembre: number = 0;
	nbrH: number = 0;
	nbrF: number = 0;
	mandatList: Array<{
		id: string;
		dateD: string;
		dateF: String;
		mandat: string;
		duree: string;
		totalMmbre: number;
		totalMmbreH: number;
		totalMmbreF: number;
	}> = [];
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	baseURL = environment.API_BMH_URL
	tab: Array<{ totalMmbreH: number; totalMmbreF: number }> = [];
	mandatdata: any;
	public obs$: Observable<any[]>;
	myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	varData: any;
	AlfresscoURL = environment.API_ALFRESCO_URL
	constructor(public dialog: MatDialog,private httpClient: HttpClient,private service: DecesNaturelsService, private route: ActivatedRoute, private router: Router) {}

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
		this.getAllPjImm(this.id);

		this.httpClient.get(`${this.baseURL}historique-deces/${this.id}`,{ headers: this.headers })
		.subscribe((res:any)=>{
		this.data = res;
		console.log('Constateur pièce Jointe stored successfully:', res);
		})
	}
	openDialog(): void {
		const dialogRef = this.dialog.open(PopupDecesComponent, {
			data:this.data,
			width: '50rem'
		});
		dialogRef.afterClosed().subscribe(res => {
		});
	}
	
	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/bmh-decesNaturel/index/${ide}`)
		.subscribe(
            (data:any) => {
				
                this.dataSource2 = new MatTableDataSource(data);
            },
            (error) => console.log(error)
        );
    }
	onClickPj(e, id) {
        var r = e.substring(0, e.length - 4);
        window.open(this.AlfresscoURL + "/bmh-decesNaturel/" + r, "_blank");
    }
	RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-deces-naturel"]);
	}
}
