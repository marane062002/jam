import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormBuilder } from "@angular/forms";
import { first, delay, finalize } from "rxjs/operators";
import { BoServiceService } from "../../../utils/bo-service.service";
import { NotificationService } from "../../../shared/notification.service";
import { TranslateService } from "@ngx-translate/core";
import {
	MatTableDataSource,
	MatPaginator,
	MatSort,
} from "@angular/material";
import Swal from 'sweetalert2';
import { SpinnerService } from '../../../utils/spinner.service';

@Component({
	selector: "kt-add-destinataire-courrier",
	templateUrl: "./add-destinataire-courrier.component.html",
	styleUrls: ["./add-destinataire-courrier.component.scss"],
})
export class AddDestinataireCourrierComponent implements OnInit {
	// =================================================================
	// declaration des Attributs
	// =================================================================
	validate: number;
	loading = false;
	btnloading = false;
	editForm: FormGroup;
	detailscourrier;
	submitted = false;
	courrierId: number;
	form = false;
	divisions: any;
	chefDiv
	services: any;
	personnels: any;
	_data;
	data_size: number
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
		private spinnerService: SpinnerService,
		private activatedRoute:ActivatedRoute
	) {
		this.formBuild();
	}
	// =================================================================
	// methode d'initialisation de fourmulaire
	// =================================================================
	ngOnInit() {
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.courrierId = +window.localStorage.getItem("courrId");
		this.activatedRoute.queryParams.subscribe((params) => {
			this.chefDiv = params["chefDiv"];
		  });
		if (!this.courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-entrants"]);
			return;
		}
		const _this = this;
		this.service
			.getObjectById("/courrierEntrants/show/", +this.courrierId)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			})).subscribe(
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
		this.router.navigate(["courriers-entrants/list-courriers-entrants"]);
	}
	// ====================================
	//
	//=====================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = [
		"idDivision",
		"idPersonne",
		"typeDestinataire",
		"designation",
		"actions",
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ====================================
	//
	//=====================================
	onCreate() {
		this.router.navigate(["destinataire-courrier/add-destinataire"]);
	}
	// ====================================
	//
	//=====================================
	onEdit(dest: any) {
		this.courrierId = +window.localStorage.getItem("deCeId");
		window.localStorage.removeItem("deCeId");
		window.localStorage.setItem("deCeId", dest.id.toString());
		this.router.navigate(["destinataire-courrier/edit-destinataire"]);

	}
	// ====================================
	//
	//=====================================
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
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service
					.deleteObject("/destinataireCouriers/delete/", id)
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
		let courrierId = +window.localStorage.getItem("courrId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-entrants"]);
			return;
		}
		const _this = this;
		//document.getElementById("destinataire").style.display = "none";
		this.service
			.getAllObjectById("/destinataireCouriers/find/", courrierId)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					_this.data_size = data.length;
					if (data.length > 0) {
						_this.validate = 1;
					} else {
						_this.validate = 0;
					}
					//document.getElementById("destinataire").style.display ="inline";
					//console.log('destinataire :: '+ JSON.stringify(data,null,2))
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
		let courrierId = +window.localStorage.getItem("courrId");
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
		Swal.fire({
			title: 'هل تريد توجيه المراسلة ؟',
			icon: 'question',
			iconHtml: '؟',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'حفظ',
			cancelButtonText: 'إلغاء',
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				// console.log("statut :" + JSON.stringify(this.editForm.value, null, 2));
				this.btnloading = true;
				this.service.updateObject("/courrierEntrants/dispatching/",
						this.editForm.value
					)
					.pipe(first())
					.subscribe(
						(data) => {
							this.router.navigate([
								"courriers-entrants/list-courriers-entrants",
							]);
							//Swal.fire(this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"), '', 'success')
							Swal.fire({
								position: 'center',
								icon: 'success',
								title: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
								showConfirmButton: false,
								timer: 1500
							})
							this.btnloading = false;
						},
						(error) => {
							alert(error);
						}
					);
			}
		})
	}
}
