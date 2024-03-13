import { ActivatedRoute } from "@angular/router";
import {
	Component,
	OnInit,
	ViewChild,
	Output,
	EventEmitter,
} from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { MatSelect, MatSelectChange, MatRadioChange, MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { first, delay } from "rxjs/operators";
import { BoServiceService } from "../../../utils/bo-service.service";
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from "sweetalert2";
@Component({
	selector: "kt-add-partenaires-externe",
	templateUrl: "./add-partenaires-externe.component.html",
	styleUrls: ["./add-partenaires-externe.component.scss"],
})
export class AddPartenairesExterneComponent implements OnInit {
	// =================================================================
	// declaration des Attributs
	// =================================================================
	validate:number;
	loading = false;
	btnloading = false;
	editForm: FormGroup;
	detailscourrier;
	submitted = false;
	courrierId: number;
	form = false;
	divisions: any;
	services: any;
	personnels: any;
	_data;
	data_size:number
	// =================================================================
	// Constructeur
	// =================================================================
	constructor(
		private service: BoServiceService,
		private notification: NotificationService,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder,
		private location: Location,
	) {
		this.formBuild();
	}
	// =================================================================
	// methode d'initialisation de fourmulaire
	// =================================================================
	ngOnInit() {
		this.courrierId = +window.localStorage.getItem("csId");
		if (!this.courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortant"]);
			return;
		}
		const _this = this;
		this.service
			.getObjectById("/courrierSortants/show/", +this.courrierId)
			.subscribe(
				(data) => {
					_this._data = data;
					this.detailscourrier = data;
				},
				(error) => console.log(error)
			);
		this.getData();
	}
	// =================================================================
	//
	// =================================================================
	back() {
		this.router.navigate(["courriers-sortants/list-courriers-sortants"]);
	}
	// ====================================
	//
	//=====================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = [
		"idDivision",
		"idService",
		"idPersonne",
		"partenaire",
		"actions",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================
	//
	//=====================================
	onCreate() {
		this.router.navigate(["partenaires-externe/add-destinataire"]);
	}
	// ====================================
	//
	//=====================================
	onEdit(id: any): void {
		// window.localStorage.removeItem("partnerId");
		// window.localStorage.setItem("partnerId", partner.id.toString());
		this.router.navigate(["partenaires-externe/edit-destinataire"],{
			queryParams: { id: id },
		});
	}
	// ====================================
	//
	//=====================================
	// onDelete(id: number) {
	// 	if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
	// 		this.service
	// 			.deleteObject("/partenaire/delete/", id)
	// 			.subscribe((data) => {
	// 				console.log("getId :" + id);
	// 				this.getData();
	// 			});
	// 		this.notification.warn(
	// 			this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
	// 		);
	// 	}
	// }

	onDelete(id: number) {
		Swal.fire({
			title: this.translate.instant("PAGES.GENERAL.MSG_DELETED"),
			icon: 'question',
			iconHtml: '؟',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'نعم',
			cancelButtonText: 'لا',
		}).then((result) => {
			if (result.isConfirmed) {
				this.service
					.deleteObject("/destinataireCourriersSortant/delete/", id)
					.subscribe((data) => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.getData();
					});
			}
		})
	}
	// =================================================================
	// Recuperer tous les destinataire des courriers entrants
	// =================================================================
	private getData() {
		let courrierId = +window.localStorage.getItem("csId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortant"]);
			return;
		}
		const _this = this;
		//document.getElementById("destinataire").style.display = "none";
		
		this.service
			.getAllObjectById("/destinataireCouriersSortant/find/", courrierId)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					_this.data_size = data.length;
					if(data.length > 0){
						_this.validate = 1;
					}else{
						_this.validate = 0;
					}
					this.loading = false;
					this.dataSource = new MatTableDataSource(data);
					
					this.paginator._intl.itemsPerPageLabel = this.translate.instant(
						"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
					);
					this.paginator._intl.nextPageLabel = this.translate.instant(
						"PAGES.GENERAL.NEXT_PAGE_LABEL"
					);
					this.paginator._intl.previousPageLabel = this.translate.instant(
						"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
					);
					this.paginator._intl.lastPageLabel = this.translate.instant(
						"PAGES.GENERAL.LAST_PAGE_LABEL"
					);
					this.paginator._intl.firstPageLabel = this.translate.instant(
						"PAGES.GENERAL.FIRST_PAGE_LABEL"
					);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(error) => console.log(error)
			);
	}
	// ====================================
	//
	//=====================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
	}
	// ============================================================
	//
	// ============================================================
	formBuild() {
		let courrierId = +window.localStorage.getItem("csId");
		this.editForm = this.fb.group({
			id: [courrierId],
			statut: [""],
		});
		this.editForm
			.get("statut")
			.setValue(
				this.translate.instant("PAGES.BUREAU_ORDRE.IS_DISPATCHING")
			);
	}
	// ============================================================
	//
	// ============================================================
	dispatching() {
		console.log("statut :" + JSON.stringify(this.editForm.value, null, 2));
		this.btnloading = true;
		
		this.service
			.updateObject(
				"/courrierSortants/dispatching/",
				this.editForm.value
			)
			.pipe(first())
			.subscribe(
				(data) => {
					this.btnloading = false;
					this.notification.warn(
						this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED")
					);
					this.router.navigate([
						"courriers-sortants/list-courriers-sortants",
					]);

				},
				(error) => {
					alert(error);
				}
			);
	}
}
