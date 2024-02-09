import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { InterventionRapideService } from "../../../utils/intervention-rapide.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
	selector: "kt-show-intervention-rapide",
	templateUrl: "./show-intervention-rapide.component.html",
	styleUrls: ["./show-intervention-rapide.component.scss"],
})
export class ShowInterventionRapideComponent implements OnInit {
	id: number;
	details: any;
	isLoading = true;
	pjs;
	files: Observable<any>;
	start: boolean = true;
	checkLang: string;
	// ============================================================
	// 
	// ============================================================
	constructor(
		private service: InterventionRapideService,
		private router: Router,
		private route: ActivatedRoute,
		private filesUtil: FilesUtilsService,
		private translate: TranslateService,
	) {
		this.checkLang = window.localStorage.getItem("language");
		//let courrierId = window.localStorage.getItem("courrId");
		this.id = this.route.snapshot.params["id"];
		if (!this.id) {
			alert("Invalid action.");
			//this.router.navigate(["list-courriers-entrants"]);
			return;
		}
		this.getObject(this.checkLang);

		setTimeout(() => {
			if (this.id != null)
				this.files = this.service.getByIdFiles(this.id);
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// 
	// ============================================================
	ngOnInit() {
		// this.service.getByIdFiles(this.id).then(m => {
		// 	this.pjs=m;
		// });
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';

			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
			this.getObject(this.checkLang);
		});
	}
	// ============================================================
	// 
	// ============================================================
	getObject(lang) {
		this.service
			.getObjectById("/interventionRapide/show/", lang, this.id)
			.subscribe(
				(data) => {
					this.details = data;
				},
				(error) => {
					console.log(error);
				}
			);
	}
	// ============================================================
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
		window.open(environment.API_ALFRESCO_URL + "/PjInterventionRapide/" + r);
	}
	// onClickPjName(e,id) {
	// 	var r=e.substring(0,e.length-4);
	// 	window.open(environment.API_ALFRESCO_URL + '/PjInterventionRapide/'+r);
	//   }

	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["/intervention-rapide/list-intervention-rapide"]);
	}
	// ============================================
	// Methode de modification
	// ============================================
	editIntervention() {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("interId");
		window.localStorage.setItem("interId", "" + this.id);
		this.router.navigate(["/intervention-rapide/edit-intervention-rapide"]);
	}
}
