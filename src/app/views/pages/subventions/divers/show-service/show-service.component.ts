import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { SubventionsService } from "../../../utils/subventions.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { FilesUtilsService } from "../../../utils/files-utils.service";
import { NotificationService } from "../../../shared/notification.service";
import { Location, formatDate } from "@angular/common";
import { Observable } from "rxjs";
import Swal from 'sweetalert2';

@Component({
	selector: "kt-show-service",
	templateUrl: "./show-service.component.html",
	styleUrls: ["./show-service.component.scss"],
})
export class ShowServiceComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	isLoadingResults = true;
	id: number;
	details: any;
	pjs;
	isLoading = true;
	files: Observable<any>;
	start: boolean = true;
	history:boolean = false;
	// ============================================
	//
	// ============================================
	constructor(
		private service: SubventionsService,
		private router: Router,
		private route: ActivatedRoute,
		private translate: TranslateService,
		private location: Location,
		private serviceFile: FilesUtilsService,
		private notification: NotificationService
	) {}
	// ============================================
	//
	// ============================================
	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.service.getObjectById("/divers/show/", this.id).subscribe(
			(data) => {
				this.details = data;
				console.log("Service : "+ JSON.stringify(this.details,null,2))
				setTimeout(() => {
					if (data!=null)
					this.files = this.service.getByIdFiles(this.id,'PjDivers');
					this.start = false;
				}, 1000);
			},
			(error) => console.log(error)
		);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.serviceFile.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.serviceFile.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r=e.substring(0,e.length-4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjDivers/"+r);
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		this.serviceFile.exportToExcel("exportData",this.translate.instant("PAGES.DIVERS.TITRE_INDEX"));
	}
	// ============================================
	// Methode de modification
	// ============================================
	editService() {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["divers/edit-service/" + this.id]);
	}
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
			title: 'معلومات',
			icon: 'info',
			confirmButtonText: 'حسنا',
			html: '<table width="100%" style="direction: rtl;">' +
				'<tbody>' +
				'<tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">أنشأ من طرف :</th>' +
				'<td style="font-size: 15px;" class="donnee_show">' + this.getCreator(this.details.fullName) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ الإنشاء :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.details.creationDate) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ التعديل :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.details.updateDate) + '</td>' +
				'</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تم التعديل من طرف :</th>' +
				'<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getModificator(this.details.modificateurUser) + '</td>' +
				'</tr>' +
				'</tbody>' +
				'</table>',
		})
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
			result = formatDate(date, 'dd/MM/yyyy HH:mm', 'ar-MA');
		}
		return result;
	}
}
