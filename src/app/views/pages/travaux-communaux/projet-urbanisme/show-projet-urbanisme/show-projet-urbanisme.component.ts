import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjetUrbanismeService } from "../../../utils/projet-urbanisme.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
	selector: "kt-show-projet-urbanisme",
	templateUrl: "./show-projet-urbanisme.component.html",
	styleUrls: ["./show-projet-urbanisme.component.scss"],
})
export class ShowProjetUrbanismeComponent implements OnInit {
	id: number;
	details: any;
	liste: any[];
	isLoading = true;
	pjs;
	files: Observable<any>;
	start: boolean = true;
	checkLang: string;
	// ============================================
	// Presentation de datasource
	// ============================================

	displayedColumns: string[] = [
		"numVoix",
		"nomPropose",
		"statutAdressage"
	];
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private service: ProjetUrbanismeService,
		private router: Router,
		private translate: TranslateService,
		private route: ActivatedRoute,
		private filesUtil: FilesUtilsService,
	) {
		this.checkLang = window.localStorage.getItem("language");
		this.id = this.route.snapshot.params["id"];

		if (!this.id) {
			alert("Invalid action.");
			this.back();
			return;
		}
		this.getObject(this.checkLang);
		this.getAdressage();

		setTimeout(() => {
			if (this.id != null)
				this.files = this.service.getByIdFiles(this.id);
			this.start = false;
		}, 1000);
	}
	// ============================================
	// Recuperer tous les données
	// ============================================
	public getAdressage() {
		this.service
			.getAllProjetListById("/projetUrbanisme/adressage/", this.id)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					this.dataSource = new MatTableDataSource(data);
					this.isLoading = false;
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
	}
	// ============================================
	// ngOnInit
	// ============================================
	ngOnInit() {
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';

			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
			this.getObject(this.checkLang);
		});
	}
	// ============================================
	// Filter de recherche
	// ============================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// ============================================================
	// getObject
	// ============================================================
	getObject(lang) {
		this.service.getTranslateObjectById("/projetUrbanisme/show/", lang, this.id)
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
		window.open(environment.API_ALFRESCO_URL + "/PjProjetUrbanisme/" + r);
	}
	/*
	onClickPjName(e,id) {
		var r=e.substring(0,e.length-4);
		window.open(environment.API_ALFRESCO_URL + '/PjProjetUrbanisme/'+r);
	  }
	  */
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate(["/projet-urbanisme//list-projet-urbanisme/"]);
	}
	// ============================================
	// Methode de modification
	// ============================================
	editProjetUrbanisme() {
		this.id = this.route.snapshot.params["id"];
		window.localStorage.removeItem("proId");
		window.localStorage.setItem("proId", "" + this.id);
		this.router.navigate(["/projet-urbanisme/edit-projet-urbanisme"]);
	}
}
