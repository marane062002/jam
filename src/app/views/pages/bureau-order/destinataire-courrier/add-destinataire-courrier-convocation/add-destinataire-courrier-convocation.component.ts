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
	selector: "kt-add-destinataire-courrier-convocation",
	templateUrl: "./add-destinataire-courrier-convocation.component.html",
	styleUrls: ["./add-destinataire-courrier-convocation.component.scss"],
})
export class AddDestinataireCourrierConvocationComponent implements OnInit {
	validate: number;
	loading = false;
	btnloading = false;
	editForm: FormGroup;
	detailscourrier;
	submitted = false;
	courrier_conv_id: any;
	form = false;
	divisions: any;
	chefDiv
	services: any;
	personnels: any;
	_data;
	data_size: number

	constructor(
		private service: BoServiceService,
		private translate: TranslateService,
		private router: Router,
		private fb: FormBuilder,
		private spinnerService: SpinnerService,
		private activatedRoute: ActivatedRoute
	) {
		this.formBuild();
	}
	ngOnInit() {
		this.courrier_conv_id = parseInt(window.localStorage.getItem("courrier_conv_id"));
		const _this = this;
		this.service
			.getObjectById("/courrierConvocation/show/", +this.courrier_conv_id)
			.subscribe(
				(data) => {
					_this._data = data;
					this.detailscourrier = data;
				},
				(error) => console.log(error)
			);
		this.getCourriersConvocations(this.courrier_conv_id);
	}

	private getCourriersConvocations(cc: any) {
		this.service
			.getAllObjectById("/destinataireCourriersConvocations/find/", +cc)
			.subscribe(
				(data) => {
					if (data.length > 0) {
						document.getElementById("destinataire").style.display = "inline";
						// this.loading = false;
						this.dataSource = new MatTableDataSource(data);
						// this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
						this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
						this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
						this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
						this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					}
				},
				(error) => console.log(error)
			);
	}

	back() {
		this.router.navigate(["courriers-convocations/list-courriers-convocations"]);
	}

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

	onCreate() {
		this.router.navigate(["destinataire-courrier/add-destinataire-courrierConv"]);
	}

	onEdit(dest: any) {
		this.courrier_conv_id = +window.localStorage.getItem("deCeId");
		window.localStorage.removeItem("deCeId");
		window.localStorage.setItem("deCeId", dest.id.toString());
		this.router.navigate(["destinataire-courrier/edit-destinataire-courrierConv"]);

	}

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
					.deleteObject("/destinataireCourriersConvocations/delete/", id)
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

	private getData() {
		this.courrier_conv_id = +window.localStorage.getItem("courrier_conv_id");
		if (!this.courrier_conv_id) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-entrants"]);
			return;
		}
		const _this = this;

		this.service
			.getAllObjectById("/destinataireCourriersConvocations/find/", this.courrier_conv_id)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					_this.data_size = data.length;
					if (data.length > 0) {
						_this.validate = 1;
					} else {
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

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();
		if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
	}

	formBuild() {
		this.courrier_conv_id = parseInt(window.localStorage.getItem("courrier_conv_id"));
		this.editForm = this.fb.group({
			id: [this.courrier_conv_id],
			statut: [""],
		});
		this.editForm
			.get("statut")
			.setValue(
				this.translate.instant("PAGES.BUREAU_ORDRE.IS_DISPATCHING")
			);
	}

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
			if (result.isConfirmed) {
				this.btnloading = true;
				this.service.updateObject("/courrierConvocations/dispatching/",
					this.editForm.value
				)
					.pipe(first())
					.subscribe(
						(data) => {
							this.router.navigate([
								"courriers-convocations/list-courriers-convocations",
							]);
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
