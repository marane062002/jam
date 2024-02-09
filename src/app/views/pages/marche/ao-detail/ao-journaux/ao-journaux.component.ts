import { EditJournalComponent } from "./../../edit-journal/edit-journal.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { JournauxService } from "../../../shared/journaux.service";
import { Journaux } from "../../models/journaux";
import Swal from "sweetalert2";
import { MatDialog, MatPaginator, MatSort } from "@angular/material";
import { VisiteCaService } from "../../../shared/visite-ca.service";
import { VisiteCa } from "../../models/visite-ca";
import { AO } from "../../models/ao";
import { AoService } from "../../../shared/ao.service";

@Component({
	selector: "kt-ca-journaux", 
	templateUrl: "./ao-journaux.component.html",
	styleUrls: ["./ao-journaux.component.scss"],
})
export class AoJournauxComponent implements OnInit {
	idAO: any;
	Ajouter: boolean = false;
	journale: Journaux;
	transferJournale: Journaux;
	journaleForm: any;
	dataSize: number = 0;
	isLoading = false;
	valDatePlis: boolean;
	sizeData = 0;
	ao: AO;
	visite: VisiteCa;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(
		private route: Router,
		public dialog: MatDialog,
		private translate: TranslateService,
		private vistieCaService: VisiteCaService,
		private service: AoService,
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
			ao: null,
		};
		this.transferJournale = {
			id: null,
			nomAr: "",
			nomFr: "",
			adresse: "",
			date: null,
			ao: null,
		};
		this.journaleForm = {
			id: null,
			nomAr: "",
			nomFr: "",
			adresse: "",
			date: null,
			ao: null,
		};

		this.activatedRouter.queryParams.subscribe((params) => {
			this.idAO = params["id"];
			if (this.idAO == null || this.idAO == "") {
				this.route.navigateByUrl(
					"/marches/ao-list"
				);
			} else {
				this.loadAO(this.idAO);
			}
		});
	}

	loadAO(idAO: any) {
		this.service
			.getAoById(idAO).subscribe((res) => {

			this.ao = res;
			console.log(this.ao);
			this.dataSource = this.ao.listJournaux;
			console.log(this.dataSource);
			
			this.vistieCaService.getVisiteBYCAID(this.idAO).subscribe((res) => {
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
			ao: {
				id: this.idAO,
			},
		};
		console.log(this.journale);
		this.serviceJournale.addJournale(this.journale).subscribe((res) => {
			this.loadAO(this.idAO);
			this.journaleForm = {
				id: null,
				nomAr: "",
				nomFr: "",
				adresse: "",
				date: null,
				ao: null,
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
						this.loadAO(this.idAO);
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
		this.serviceJournale.imprimerJournalAo(this.idAO, id).subscribe((res) => {
			const file: any = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const readfile = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.download = "JournaleAo.docx";
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
					id: this.idAO,
					typeJournal : "ao"
				},
			});
			dialogRef.afterClosed().subscribe((res) => {
				this.loadAO(this.idAO);
			});
		});
	}

	annuler() {
		this.Ajouter = false;
	}
}
