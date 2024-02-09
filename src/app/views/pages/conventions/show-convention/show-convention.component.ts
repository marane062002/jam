import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs";
import { ConventionService } from "../../utils/convention.service";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { PieceJointeConventionService } from "../../utils/piece-jointe-convention.service";
import { environment } from "./../../../../../environments/environment";

@Component({
	selector: "kt-show-convention",
	templateUrl: "./show-convention.component.html",
	styleUrls: ["./show-convention.component.scss"],
})
export class ShowConventionComponent implements OnInit {
	id: number;
	details: any;
	dataSource = new MatTableDataSource<any>();

	pjs;
	files: Observable<any>;
	start: boolean = true;
	history: boolean = false;
	constructor(private pieceJointeConvention: PieceJointeConventionService, private service: ConventionService, private router: Router, private route: ActivatedRoute, private filesUtil: FilesUtilsService) {
		this.id = this.route.snapshot.params["id"];
		if (!this.id) {
			alert("Invalid action.");
			//this.router.navigate(["list-courriers-entrants"]);
			return;
		}

		// setTimeout(() => {
		// 	if (this.id != null) this.files = this.service.getByIdFiles(this.id);
		// 	this.start = false;
		// }, 1000);
	}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];

		this.service.getObjectById("/convention/show/", this.id).subscribe(
			(data) => {
				console.log(data);
				this.details = data;
				this.dataSource = new MatTableDataSource(data);

			},
			(error) => console.log(error)
		);
		this.files = this.pieceJointeConvention.getByIdFiles(this.id);

		// this.service.getByIdFiles(this.id).subscribe(m => {
		// 	this.pjs=m;
		// 	console.log("file log :" + this.pjs.id)
		// });
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
		window.open(environment.API_ALFRESCO_URL + "/PieceJointeConvention/" + r);
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["conventions/list-convention/"]);
	}
	// ============================================
	// Methode de modification
	// ============================================
	editConvention(id: number) {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["conventions/edit-convention/" + this.id]);
	}

	showHitory() {
		this.history = !this.history;
	}
}
