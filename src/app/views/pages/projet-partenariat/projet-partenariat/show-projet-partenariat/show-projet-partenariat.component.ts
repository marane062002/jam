import { environment } from './../../../../../../environments/environment';
import { ProjetService } from "./../../../utils/projet-part.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { Observable } from 'rxjs';
@Component({
	selector: "kt-show-projet-partenariat",
	templateUrl: "./show-projet-partenariat.component.html",
	styleUrls: ["./show-projet-partenariat.component.scss"],
})
export class ShowProjetPartenariatComponent implements OnInit {
	id: number;
	details: any;
	pjs;
	files : Observable<any>;
	start:boolean=true;
	history:boolean = false;
	constructor(
		private service: ProjetService,
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
			if (this.id!=null)
			this.files = this.service.getByIdFiles(this.id);
			this.start = false;
		}, 1000);
	}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/projetPartenariat/show/", this.id)
			.subscribe(
				(data) => {
					console.log(data);
					this.details = data;
				},
				(error) => console.log(error)
			);
	}

	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.filesUtil.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.filesUtil.getExtensionFile(file);
	}
	// =================================================================
	// Download file from server
	// =================================================================
	onClickPjName(e, id) {
		//console.log("You clicked: " + e);
		var r=e.substring(0,e.length-4);
		console.log(r);
		window.open(environment.API_ALFRESCO_URL + "/PjProjetPartenariat/"+r);
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		let assocId = window.localStorage.getItem("assocId");
		this.router.navigate(["associations/show-association/" + assocId]);
	}
	// ============================================
	// Methode de modification
	// ============================================
	editProjetPartenariat() {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("projetId");
		window.localStorage.setItem("projetId", "" + this.id);
		this.router.navigate(["projet-partenariat/edit-projet-partenariat"]);
	}

	showHitory(){
		this.history = !this.history;
	 }
}
