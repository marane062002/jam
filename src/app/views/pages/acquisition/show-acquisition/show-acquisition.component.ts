import { Location, formatDate } from "@angular/common";
import { environment } from "./../../../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { AcquisitionService } from "../../utils/acquisition.service";
import { PieceJointeAutorisationService } from "../../utils/piece-jointe-autorisation.service";
import { FilesUtilsService } from "../../utils/files-utils.service";

@Component({
	selector: "kt-show-acquisition",
	templateUrl: "./show-acquisition.component.html",
	styleUrls: ["./show-acquisition.component.scss"],
})
export class ShowAcquisitionComponent implements OnInit {
	id: number;
	details: any;
	pjs;
	files: Observable<any>;
	start: boolean = true;
	history: boolean = false;
	constructor(private service: AcquisitionService, private pieceJointeAutorisation: PieceJointeAutorisationService, private router: Router, private route: ActivatedRoute, private location: Location, private filesUtil: FilesUtilsService) {
		this.id = this.route.snapshot.params["id"];
		if (!this.id) {
			alert("Invalid action.");
			//this.router.navigate(["list-courriers-entrants"]);
			return;
		}

		// setTimeout(() => {
		// 	if (this.id != null) this.files = this.service.getByIdFiles(this.id, "PjSubvention");
		// 	this.start = false;
		// }, 1000);
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
		// console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PieceJointeAcquisition/" + r);
	}
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];

		this.service.getObjectById("/acquisition/show/", this.id).subscribe(
			(data) => {
				console.log(data);
				this.details = data;
			},
			(error) => console.log(error)
		);
		this.files = this.pieceJointeAutorisation.getByIdFiles(this.id);
		// this.service.getByIdFiles(this.id, "PjSubvention").subscribe((m) => {
		// 	this.pjs = m;
		// 	console.log("file log :" + this.pjs.id);
		// });
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		//this.location.back();
		this.router.navigate(["/acquisition/list-acquisition"]);
	}
	// ============================================
	// Methode de modification
	// ============================================

	/*
	showHitory(){
		this.history = !this.history;
	 }
	 */
	// ============================================
	// Historique
	// ============================================
	showHitory() {
		Swal.fire({
			title: "معلومات",
			icon: "info",
			confirmButtonText: "حسنا",
			html: '<table width="100%" style="direction: rtl;">' + "<tbody>" + '<tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">أنشأ من طرف :</th>' + '<td style="font-size: 15px;" class="donnee_show">' + this.getCreator(this.details.fullName) + "</td>" + '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ الإنشاء :</th>' + '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.details.creationDate) + "</td>" + '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ التعديل :</th>' + '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.details.updateDate) + "</td>" + '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تم التعديل من طرف :</th>' + '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getModificator(this.details.modificateurUser) + "</td>" + "</tr>" + "</tbody>" + "</table>",
		});
	}
	editAcquisition(): void {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["acquisition/edit-acquisition/" + this.id]);
	}

	// ============================================
	// get Creator
	// ============================================
	getCreator(user): string {
		var result = "لا توجد معلومات";
		if (user != null) {
			result = this.details.fullName;
		}
		return result;
	}
	// ============================================
	// get Modificator
	// ============================================
	getModificator(user): string {
		var result = "لا توجد معلومات";
		if (user != null) {
			result = this.details.modificateurUser;
		}
		return result;
	}
	// ============================================
	// Date format
	// ============================================
	getDates(date): string {
		var result = "لا توجد معلومات";
		if (date != null) {
			result = formatDate(date, "dd/MM/yyyy HH:mm", "ar-MA");
		}
		return result;
	}
}
