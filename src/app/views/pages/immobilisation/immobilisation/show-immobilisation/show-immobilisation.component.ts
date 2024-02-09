import { environment } from './../../../../../../environments/environment';
import { ImmobilisationService } from './../../../utils/immobilisation.service';
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from 'rxjs';
import { FilesUtilsService } from '../../../utils/files-utils.service';

@Component({
	selector: "kt-show-immobilisation",
	templateUrl: "./show-immobilisation.component.html",
	styleUrls: ["./show-immobilisation.component.scss"],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class ShowImmobilisationComponent implements OnInit {
	// =====================================
	// Declarations
	// =====================================
	details : any;
	pjs;
	// file varriable
	files : Observable<any>;
	start:boolean=true;
	isFile:boolean=false;
	constructor(
		private immoService: ImmobilisationService,
		private fileService: FilesUtilsService,
		private router: Router,
		private location: Location
	) {
		// get all files by id
		let immoId = window.localStorage.getItem("immobilisation-showId");
		if (!immoId) {
			alert("Invalid action.");
			this.router.navigate(["immobilisation/list-immobilisation"]);
			return;
		}
		setTimeout(() => {
			if (immoId!=null)
				this.files = this.immoService.getByIdImmobilisationFiles(immoId);
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.fileService.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.fileService.getExtensionFile(file);
	}
	// =====================================
	// Afficher les details immobilisation
	// =====================================
	ngOnInit() {
		let immoId = window.localStorage.getItem("immobilisation-showId");
		if (!immoId) {
			alert("Invalid action.");
			this.router.navigate(["immobilisation/list-immobilisation"]);
			return;
		}
		this.immoService.getObjectById("/immobilisation/show/", +immoId)
			.subscribe(
				data => {
					console.log(data);
					this.details = data;
				},
				error => console.log(error)
			);

			// this.immoService.getByIdImmobilisationFiles(immoId).subscribe(m => {
			// 	this.pjs=m;
			// 	console.log("file log :" + this.pjs.id)
			// });
	}

	onClickPjName(e,id) {
		console.log('You clicked: '+e) ;
		var r=e.substring(0,e.length-4);
		console.log(environment.API_ALFRESCO_URL+'/PjImmobilisation/'+r)
		window.open(environment.API_ALFRESCO_URL+'/PjImmobilisation/'+r);
	  }
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================
	// Methode de modification des immobilisations
	// ============================================
	editImmobilisation(): void {
		let immoId = window.localStorage.getItem("immobilisation-showId");
		if (!immoId) {
			alert("Invalid action.");
			this.router.navigate(["immobilisation/list-immobilisation"]);
			return;
		}
		window.localStorage.removeItem("editImmobilisationId");
		window.localStorage.setItem("editImmobilisationId",immoId);
		this.router.navigate(["immobilisation/edit-immobilisation"]);
	}
}
