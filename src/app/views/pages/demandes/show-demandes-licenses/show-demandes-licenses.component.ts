import { environment } from "./../../../../../environments/environment";
// import { AssociationService } from "../../utils/association.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource, MatAccordion } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Observer, BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
// import { delay, map, finalize } from "rxjs/operators";
import { NotificationService } from "../../shared/notification.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
// import Swal from "sweetalert2";
// import { formatDate } from "@angular/common";
import { SpinnerService } from "../../utils/spinner.service";
import { Association360Tab, MANDATS } from "../../associations/show-association/show-association.component";
import { DemandesService } from "../../utils/demandes.service";


@Component({
	selector: 'kt-show-demandes-licenses',
	templateUrl: './show-demandes-licenses.component.html',
	styleUrls: ['./show-demandes-licenses.component.scss']
})
export class ShowDemandesLicensesComponent implements OnInit {
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

		this.demandeService.getDemandesById('/demande/getDemandesById/', this.id).subscribe(
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
		this.filesRquests = this.demandeService.getByIdRequestsOrResponse(this.id, '/DemandeRequest');
		this.filesResponse = this.demandeService.getByIdRequestsOrResponse(this.id, '/DemandeResponse');

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
		window.open(environment.API_ALFRESCO_URL + "/PjDemande/" + r);
	}
	// =================================================================
	// back to list
	// =====================================
	back() {

		this.router.navigate(["/demandes/list-demandesLicense"]);
	}





}
