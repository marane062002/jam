import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterNavigatedAction } from "@ngrx/router-store";
import { ObstacleService } from "../services/obstacle.service";
import { DatePipe, formatDate } from "@angular/common";
import { BehaviorSubject, Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { MatAccordion, MatTableDataSource } from "@angular/material";
import { environment } from "../../../../../environments/environment";

import { AssociationService } from "../../utils/association.service";
import { TranslateService } from "@ngx-translate/core";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { SpinnerService } from "../../utils/spinner.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { EditLigneBpComponent } from "../../marche/dialog-forms/edit-ligne-bp/edit-ligne-bp.component";
import { PopupComponent } from "./popup/popup.component";

export interface Association360Tab {
	label: string;
	content: string;
}

@Component({
	selector: "kt-details-obstacles",
	templateUrl: "./details-obstacles.component.html",
	styleUrls: ["./details-obstacles.component.scss"],
})

export class DetailsObstaclesComponent implements OnInit {
	@ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
	// ============================================
	// Datasource mandat
	// ============================================
	dataSource = new MatTableDataSource<any>();
	dataSource2 = new MatTableDataSource<any>();
	isLoading = true;
	history: boolean = false;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	// =====================================
	// Declarations
	// =====================================

    info:any;
	totalRecords: number = 100; // Example value
  pageSize: number = 10; // Example value
  currentPage: number = 0; // Example value
  pageSizeOptions: number[] = [5, 10, 25, 100];



	displayedColumns2=['nomDoc','titre','dow']
	asyncTabs: Observable<Association360Tab[]>;
	selected = new FormControl(0);
	id: number;
	details;
	data:any;
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
	tab: Array<{ totalMmbreH: number; totalMmbreF: number }> = [];
	mandatdata: any;
	public obs$: Observable<any[]>;
	myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	varData: any;
	AlfresscoURL = environment.API_ALFRESCO_URL
	baseURL = environment.API_BMH_URL
	constructor(
		private service:ObstacleService,
		public dialog: MatDialog,
		private httpClient: HttpClient,
		private services: AssociationService,
		private router: Router,
		private route: ActivatedRoute,
		private translate: TranslateService,
		private fileService: FilesUtilsService,
		private spinnerService: SpinnerService
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
		this.id = this.route.snapshot.params["id"];
		this.route.params.subscribe(params => {
       
			this.id = params['id']; // Récupération de l'ID à partir des paramètres de l'URL
			 
			this.service.getById(this.id).subscribe(
			  
			  (data: any) => {
				  
				this.info = data; // Stocker les informations récupérées dans la variable 'info'
					this.info.value 
			  },
			  (error: any) => {
				console.error('Erreur lors de la récupération des données :', error);
			  }
			);
		  });

			(error) => {
				console.log(error);
			}

			this.services.getObjectById("/affaire/show/", this.id).subscribe(
				(data) => {
					console.log("12222222222");
					console.log(data);
					this.details = data;
					this.dataSource = new MatTableDataSource(data);
				},
	
				(error) => {
					console.log(error);
				}
			);
		this.getAllPjImm(this.id);

	this.httpClient.get(`${this.baseURL}historique-obstacle/${this.id}`,{ headers: this.headers })
	.subscribe((res:any)=>{
	  this.data = res;
	  console.log('Constateur pièce Jointe stored successfully:', res);
	})
	}
	
	// this.httpClient.get(`${this.AlfresscoURL}/obstacle-bmh/index/${this.id}`)
	// .subscribe((res)=>{
	//   console.log('Constateur pièce Jointe stored successfully:', res);
	// })

	openDialog(): void {
		const dialogRef = this.dialog.open(PopupComponent, {
			data:this.data,
			width: '50rem'
		});
		dialogRef.afterClosed().subscribe(res => {
		});
	}
	


	async getAllPjImm(ide) {
        await this.httpClient.get(`${this.AlfresscoURL}/obstacle-bmh/index/${ide}`)
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
        window.open(this.AlfresscoURL + "/obstacle-bmh/" + r, "_blank");
    }
	// =====================================
	// back to lise
	// =====================================
	back() {
		//this.location.back();
		this.router.navigate(["bmh1/list-obstacles"]);
	}
	Transfert() {
		//this.location.back();
		this.router.navigate(["bmh1/transfert-obstacles"]);
	}
	// SortirAssociation(): void {
	// 	this.router.navigate(["bmh1/sortir-obstacles"]);
	// }
  SortirAssociation(){
    this.router.navigate(["/bmh1/add-cadavre/",this.id])
  }

}
