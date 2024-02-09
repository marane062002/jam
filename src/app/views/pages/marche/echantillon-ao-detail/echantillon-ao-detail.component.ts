import { NotificationService } from "./../../shared/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
	MatTableDataSource,
	MatPaginator,
	MatSort,
	MatDialog,
} from "@angular/material";
import { AoService } from "../../shared/ao.service";
import { OrganisationService } from "../../organisation/organisation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PersonnelService } from "../../rh/services/personnel.service";
import { TranslateService } from "@ngx-translate/core";
import { EditLigneEchantillonComponent } from "../dialog-forms/edit-ligne-echantillon/edit-ligne-echantillon.component";

@Component({
	selector: "kt-echantillon-ao-detail",
	templateUrl: "./echantillon-ao-detail.component.html",
	styleUrls: ["./echantillon-ao-detail.component.scss"],
})
export class EchantillonAoDetailComponent implements OnInit {
	// =================================================================
	//
	// =================================================================
	idao;
	libelleDivision;
	libelleService;
	libellePersonnel;
	sizeData = 0;
	isLoading = false;
	idEch;
	// =================================================================
	//
	// =================================================================
	dataSource: MatTableDataSource<any>;
	//dataSource = new MatTableDataSource<any>();
	displayedColumns1 = ["libelle", "qte", "format", "actions"];
	// =================================================================
	//
	// =================================================================
	echantillon = {
		id: 0,
		delais: null,
		dateExamen: null,
		responsable: 0,
		service: 0,
		division: 0,
	};
	formData = {
		libelle: "",
		qte: "",
		format: "",
		echantillon: { id: 0 },
	};
	// =================================================================
	//
	// =================================================================
	constructor(
		private service: AoService,
		private service2: OrganisationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service3: PersonnelService,
		private translate: TranslateService,
		private notification: NotificationService,
		public dialog: MatDialog
	) {}
	// =================================================================
	// Controles pagination
	// =================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =================================================================
	//
	// =================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
		this.getLigneEchantillon();
	}
	// =================================================================
	//
	// =================================================================
	getLigneEchantillon(): void {
		const _this = this;
		this.service.getEchantillon(this.idao).subscribe((res) => {
			this.echantillon = res;
			_this.idEch = res.id;
			this.getDivisionEtService();
			// console.log("Echantillon : " + JSON.stringify(this.echantillon,null,2));
			this.service.getLignesEchantillon(res.id).subscribe(
				(res1) => {
					console.log(
						"Ligne Echantillon : " + JSON.stringify(res1, null, 2)
					);
					this.isLoading = false;
					_this.sizeData = res1.length;
					this.dataSource = new MatTableDataSource(res1);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				},
				(err) => {
					console.log(err);
					this.isLoading = false;
				}
			);
		});
	}
	// =================================================================
	//
	// =================================================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	// =================================================================
	//
	// =================================================================
	async getDivisionEtService() {
		await this.service2
			.findEntityById(this.echantillon.division, "/divisions/find/")
			.subscribe((d) => {
				this.libelleDivision = d.libelle;
				//console.log("Division : " + JSON.stringify(this.libelleDivision,null,2));
			});
		await this.service2
			.findEntityById(this.echantillon.service, "/services/find/")
			.subscribe((s) => {
				this.libelleService = s.libelle;
				//console.log("Service : " + JSON.stringify(this.libelleService,null,2));
			});
		this.service3
			.getPersonnelById(this.echantillon.responsable)
			.then((res) => {
				this.libellePersonnel = res.nom + " " + res.prenom;
				// console.log("Personnel : " + JSON.stringify(this.libellePersonnel,null,2));
			});
	}
	// ================================================================
	//
	// ================================================================
	addEchantillonFormDialog() {
		const dialogRef = this.dialog.open(EditLigneEchantillonComponent, {
			width: "630px",
			data: {
				id: 0,
				echantillon: { id: this.idEch },
				libelle: "",
				qte: 0,
				format: "",
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
				this.formData = res;
				if (res) {
					console.log(
						"New ligne echantillon data : " +
							JSON.stringify(this.formData, null, 2)
					);
				}

				this.service.sendLigneEchantillon(this.formData).subscribe((res) => {
					console.log(res);
					this.getLigneEchantillon();
				});

			}
		});
	}
	// ================================================================
	//
	// ================================================================
	editLigneEchantillon(idLigne) {
		this.service.getLignesEchantillonById(idLigne).subscribe((data) => {
			this.formData = data;
			console.log(
				"Show ligne echantillon " +
					JSON.stringify(this.formData, null, 2)
			);
			const dialogRef = this.dialog.open(EditLigneEchantillonComponent, {
				width: "630px",
				data: {
					id: idLigne,
					echantillon: { id: this.idEch },
					libelle: this.formData.libelle,
					qte: this.formData.qte,
					format: this.formData.format,
				},
			});
			dialogRef.afterClosed().subscribe((res) => {
				if (res) {
					this.formData = res;
					if (res) {
						console.log(
							"visite data : " +
								JSON.stringify(this.formData, null, 2)
						);
					}

					this.service
						.sendLigneEchantillon(this.formData)
						.subscribe((res) => {
							console.log(res);
							this.getLigneEchantillon();
						});
				}
			});
		});
	}
	// =================================================================
	//
	// =================================================================
	deleteLigneEchantillon(idLigne) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			const _this = this;
			// Supprimer ligne echantillion par id ECH
			this.service
				.deleteLigneEchantillonById(idLigne)
				.subscribe((data) => {
					console.log("Ligne echantillon Deleted  : " + idLigne);
					this.service.getLignesEchantillon(this.idEch).subscribe(
						(res1) => {
							this.isLoading = false;
							_this.sizeData = res1.length;
							this.dataSource = new MatTableDataSource(res1);
							this.dataSource.paginator = this.paginator;
							this.dataSource.sort = this.sort;
						},
						(err) => {
							console.log(err);
							this.isLoading = false;
						}
					);
				});
			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}
	// =================================================================
	//
	// =================================================================
	back() {
		this.router.navigate(["/marches/ao-detail"], {
			queryParams: { id: this.idao },
		});
	}
}
