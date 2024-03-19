import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatTableDataSource } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "./../../../../../environments/environment";
import { Association360Tab } from '../../pesee/show-pesee/show-pesee.component';
import { FormControl } from '@angular/forms';
import { DemandesService } from '../../utils/demandes.service';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { SpinnerService } from '../../utils/spinner.service';

@Component({
  selector: 'kt-show-demandes-pub-prop',
  templateUrl: './show-demandes-pub-prop.component.html',
  styleUrls: ['./show-demandes-pub-prop.component.scss']
})
export class ShowDemandesPubPropComponent implements OnInit {
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
	// ============================================
	demandeDetails: any;
	demandeDataSource = new MatTableDataSource<any>();
  
	// ============================================
	// Datasource 
	// ============================================
	details: any;
	dataSource = new MatTableDataSource<any>();
	files: Observable<any>;
	filesRquests: Observable<any>;
	filesResponse: Observable<any>;
	isLoading = true;
	history: boolean = false;


	// =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<Association360Tab[]>;
	selected = new FormControl(0);
	id: Number;
	id2: string;
	isLoadingResults = true;
	start: boolean = true;
	assocInfo: boolean = false;
	nbMembre: number = 0;
	nbrH: number = 0;
	nbrF: number = 0;

	public obs$: Observable<any[]>;
	myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	varData: any;
	// ============================================
	// Constructeur
	// ============================================
	constructor(private demandeService: DemandesService, private filesUtil: FilesUtilsService, private router: Router, private route: ActivatedRoute, private translate: TranslateService, private notification: NotificationService, private fileService: FilesUtilsService, private spinnerService: SpinnerService) {

	}
	// =====================================
	// Afficher les details demandes
	// =====================================
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
	//	this.id2 = this.route.snapshot.params["id2"];

		// this.demandeService.getDemandeByCode('/demande/getDemandeLicenseByCode/', this.id as string).subscribe(
	
		this.demandeService.getDemandesByIdPubProp('demande/getDemandesById/', this.id).subscribe(
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
		// this.files = this.demandeService.getByIdFiles(this.id2);
		this.filesRquests = this.demandeService.getByIdRequestsOrResponsePubProp(this.id, '/DemandeRequest');
		this.filesResponse = this.demandeService.getByIdRequestsOrResponsePubProp(this.id, '/DemandeResponse');

	}
	// =====================================
	// get file name
	// ============================================================
	FileName(file) {
		return this.filesUtil.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file) {
		return this.filesUtil.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjDemandePubProp/" + r);
	}
	// =================================================================
	// back to list
	// =====================================
	back() {

		this.router.navigate(["/autorisations/list-demandes-pub-prop"]);
	}






}
