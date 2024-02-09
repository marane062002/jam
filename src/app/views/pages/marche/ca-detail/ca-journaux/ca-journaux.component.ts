import { EditJournalComponent } from "./../../edit-journal/edit-journal.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ConsultationArchitecturalService } from "../../../shared/consultation-architectural.service";
import { JournauxService } from "../../../shared/journaux.service";
import { ConsultationArchitecturale } from "../../models/consultation-architecturale";
import { Journaux } from "../../models/journaux";
import Swal from "sweetalert2";
import { MatDialog, MatPaginator, MatSort } from "@angular/material";
import { VisiteCaService } from "../../../shared/visite-ca.service";
import { VisiteCa } from "../../models/visite-ca";

@Component({
	selector: "kt-ca-journaux",
	templateUrl: "./ca-journaux.component.html",
	styleUrls: ["./ca-journaux.component.scss"],
})
export class CaJournauxComponent implements OnInit {
	idCA: any;
	Ajouter: boolean = false;
	journale: Journaux;
	transferJournale: Journaux;
	journaleForm: any;
	dataSize: number = 0;
	isLoading = false;
	valDatePlis: boolean;
	sizeData = 0;
	visite: VisiteCa;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	consultationArchitecturale: ConsultationArchitecturale;
	constructor(
		private route: Router,
		public dialog: MatDialog,
		private translate: TranslateService,
		private vistieCaService: VisiteCaService,
		private serviceCa: ConsultationArchitecturalService,
		private serviceJournale: JournauxService,
		private activatedRouter: ActivatedRoute
	) {}
	displayedColumns = ["nom arabe", "nom français", "adresse", "date", "actions"];
	dataSource;
	ngOnInit() {
		this.journale = {
			id: null,
			nomAr: "",
			nomFr: "",
			adresse: "",
			date: null,
			consultationArchitecturale: null,
		};
		this.transferJournale = {
			id: null,
			nomAr: "",
			nomFr: "",
			adresse: "",
			date: null,
			consultationArchitecturale: null,
		};
		this.journaleForm = {
			id: null,
			nomAr: "",
			nomFr: "",
			adresse: "",
			date: null,
			consultationArchitecturale: null,
		};

		this.activatedRouter.queryParams.subscribe((params) => {
			this.idCA = params["id"];
			if (this.idCA == null || this.idCA == "") {
				this.route.navigateByUrl(
					"/marches/consultation-architecturale"
				);
			} else {
				this.loadCA(this.idCA);
			}
		});
	}

	loadCA(idCA: any) {
		this.serviceCa.getConsultationBYId(idCA).subscribe((res) => {
			this.consultationArchitecturale = JSON.parse(res + "");
			this.dataSource = this.consultationArchitecturale.listJournaux;
			this.vistieCaService.getVisiteBYCAID(this.idCA).subscribe((res) => {
				if (res) {
					const values = JSON.parse(res + "");
					this.visite = values[0];
					if (this.visite != null) {
						this.valDatePlis = true;
					} else {
						this.valDatePlis = false;
					}
				}
			});
		});
	}

	ShowForm() {
		this.Ajouter = true;
	}

	AjouterJournale() {
		this.journale = {
			nomAr: this.journaleForm.nomAr,
			nomFr: this.journaleForm.nomFr,
			adresse: this.journaleForm.adresse,
			date: this.journaleForm.date,
			consultationArchitecturale: {
				id: this.idCA,
			},
		};
		console.log(this.journale);
		this.serviceJournale.addJournal(this.journale).subscribe((res) => {
			this.loadCA(this.idCA);
			this.journaleForm = {
				id: null,
				nomAr: "",
				nomFr: "",
				adresse: "",
				date: null,
				consultationArchitecturale: null,
			};
			this.Ajouter = false;
		});
	}

	deleteJournale(id) {
		Swal.fire({
			title: this.translate.instant("PAGES.GENERAL.MSG_DELETED"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.serviceJournale.deleteJournal(id).subscribe(
					(data) => {
						Swal.fire({
							position: "center",
							icon: "success",
							title: this.translate.instant(
								"PAGES.GENERAL.MSG_DEL_CONFIRMED"
							),
							showConfirmButton: false,
							timer: 1500,
						});
						this.loadCA(this.idCA);
					},
					(err) => {
						console.log(err);
						Swal.fire({
							icon: "error",
							title: "Suppression interdite !!",
							text: "Ce numéro de journale  est utilisé par d'outre module.",
						});
					}
				);
			}
		});
	}
	imprimerJournale(id: any) {
		this.serviceJournale.imprimerJournal(this.idCA, id).subscribe((res) => {
			const file: any = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const readfile = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.download = "Journale.docx";
			link.href = readfile;
			link.dispatchEvent(
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window,
				})
			);
			setTimeout(() => {
				window.URL.revokeObjectURL(file);
				link.remove();
			}, 100);
		});
	}
	editJournale(id: any) {
		this.serviceJournale.getJournalById(id).subscribe((res) => {
			this.transferJournale = JSON.parse(res + "");
			let dialogRef = this.dialog.open(EditJournalComponent, {
				width: "2050px",
				data: {
					journale: this.transferJournale,
					id: this.idCA,
				},
			});
			dialogRef.afterClosed().subscribe((res) => {
				this.loadCA(this.idCA);
			});
		});
	}

	annuler() {
		this.Ajouter = false;
	}
}
