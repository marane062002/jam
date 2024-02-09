import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ActivitesService } from "../../../utils/activites.service";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { Observable } from 'rxjs';
import { Location } from "@angular/common";

@Component({
	selector: "kt-show-activites",
	templateUrl: "./show-activites.component.html",
	styleUrls: ["./show-activites.component.scss"],
})
export class ShowActivitesComponent implements OnInit {
	pjs;
	id: number;
	details: any;
	files: Observable<any>;
	start: boolean = true;
	history: boolean = false;
	constructor(
		private service: ActivitesService,
		private router: Router,
		private route: ActivatedRoute,
		private filesUtil: FilesUtilsService,
		private location: Location,
	) {
		this.id = this.route.snapshot.params["id"];
		if (!this.id) {
			alert("Invalid action.");
			//this.router.navigate(["list-courriers-entrants"]);
			return;
		}

		setTimeout(() => {
			if (this.id != null)
				this.files = this.service.getByIdFiles(this.id);
			this.start = false;
		}, 1000);
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
	// ============================================================
	//
	// ============================================================
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];

		this.service.getObjectById("/activite/show/", this.id).subscribe(
			(data) => {
				console.log(data);
				this.details = data;
			},
			(error) => console.log(error)
		);
		// this.service.getByIdFiles(this.id).subscribe((m) => {
		// 	this.pjs = m;
		// 	console.log("file log :" + this.pjs.id);
		// });
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjActivite/" + r);
	}

	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
		//let assocId = window.localStorage.getItem("assocId");
		//this.router.navigate(["associations/show-association/" + assocId]);
	}
	showHitory() {
		this.history = !this.history;
	}

	editActivities() {
		window.localStorage.removeItem("activiteId");
		window.localStorage.setItem("activiteId", "" + this.id);
		this.router.navigate(["activites/edit-activites"]);
	}
}
