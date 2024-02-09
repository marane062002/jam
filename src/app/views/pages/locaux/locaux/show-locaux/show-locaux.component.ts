import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LaucauxService } from "../../../utils/locaux.service";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { Observable } from 'rxjs';

@Component({
	selector: "kt-show-locaux",
	templateUrl: "./show-locaux.component.html",
	styleUrls: ["./show-locaux.component.scss"],
})
export class ShowLocauxComponent implements OnInit {
	id: number;
	details: any;
	pjs;
	files: Observable<any>;
	start: boolean = true;
	history: boolean = false;
	constructor(
		private service: LaucauxService,
		private router: Router,
		private route: ActivatedRoute,
		private filesUtil: FilesUtilsService,
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
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjLocaux/" + r);
	}
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];

		this.service.getObjectById("/locaux/show/", this.id).subscribe(
			(data) => {
				console.log(data);
				this.details = data;
			},
			(error) => console.log(error)
		);
		this.service.getByIdFiles(this.id).subscribe(m => {
			this.pjs = m;
			console.log("file log :" + this.pjs.id)
		});
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		let assocId = window.localStorage.getItem("assocId");
		this.router.navigate(["associations/show-association/" + assocId]);
	}
	// ============================================
	// Methode de modification local
	// ============================================
	editLocaux() {
		this.id = this.route.snapshot.params['id'];
		window.localStorage.removeItem("localId");
		window.localStorage.setItem("localId", "" + this.id);
		this.router.navigate(["locaux/edit-locaux"]);
	}

	showHitory() {
		this.history = !this.history;
	}
}
