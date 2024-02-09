import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { InsertPubService } from "../../../utils/insert-pub.service";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { Observable } from 'rxjs';

@Component({
	selector: "kt-insertion-publicitaire-show",
	templateUrl: "./insertion-publicitaire-show.component.html",
	styleUrls: ["./insertion-publicitaire-show.component.scss"],
})
export class InsertionPublicitaireShowComponent implements OnInit {
	detailPub: any;
	pjs;
	files : Observable<any>;
	start:boolean=true;
	constructor(
		private router: Router,
		private location: Location,
		private service: InsertPubService,
		private service1:FilesUtilsService,
	) {
		let pubId = window.localStorage.getItem("pub-showId");
		if (!pubId) {
			alert("Invalid action.");
			this.router.navigate(["list-insertion-publicitaire"]);
			return;
		}

		setTimeout(() => {
			if (pubId!=null)
			this.files = this.service.getByIdPublicitaireFiles(pubId);
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.service1.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.service1.getExtensionFile(file);
	}

	ngOnInit() {
		let pubId = window.localStorage.getItem("pub-showId");
		if (!pubId) {
			alert("Invalid action.");
			this.router.navigate([
				"insertion-publicitaire/list-insertion-publicitaire",
			]);
			return;
		}
		this.service
			.getObjectById("/insertionPublicitaires/show/", +pubId)
			.subscribe(
				(data) => {
					console.log("ID PUBLICITAIRE : " + pubId);
					console.log(data);
					this.detailPub = data;
				},
				(error) => console.log(error)
			);
		/*
		this.service.getByIdPublicitaireFiles(pubId).subscribe((m) => {
			this.pjs = m;
			console.log("file log :" + this.pjs);
		});
		*/
	}

	onClickPjName(e, id) {
		console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL+"/PjPublicitaire/" + r);
	}

	back() {
		this.location.back();
	}
	// ============================================
	// Methode de modification publicitaires
	// ============================================
	editPublicite(): void {
		let pubId = window.localStorage.getItem("pub-showId");
		if (!pubId) {
			alert("Invalid action.");
			this.router.navigate(["list-insertion-publicitaire"]);
			return;
		}
		window.localStorage.removeItem("pubId");
		window.localStorage.setItem("pubId", pubId);
		this.router.navigate(["insertion-publicitaire/edit-insertion-publicitaire"]);
	}
}
