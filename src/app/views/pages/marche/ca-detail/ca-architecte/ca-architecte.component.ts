import { EditArchitectInfiComponent } from "./../../edit-architect-infi/edit-architect-infi.component";
import { EditArchitecteComponent } from "./../edit-architecte/edit-architecte.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ConsultationArchitecturalService } from "../../../shared/consultation-architectural.service";
import { ConsultationArchitecturale } from "../../models/consultation-architecturale";
import Swal from "sweetalert2";
import {
	MatDialog,
	MatPaginator,
	MatSort,
	MatSortable,
	Sort,
} from "@angular/material";
import { Architecte } from "../../models/architecte";
import { ArchitecteService } from "../../../shared/architecte.service";
import { VisiteCa } from "../../models/visite-ca";
import { VisiteCaService } from "../../../shared/visite-ca.service";
@Component({
	selector: "kt-ca-architecte",
	templateUrl: "./ca-architecte.component.html",
	styleUrls: ["./ca-architecte.component.scss"],
})
export class CaArchitecteComponent implements OnInit {
	idCA: any;
	profit : number;
	Ajouter: boolean = false;
	architecte: Architecte;
	architecteTransf: Architecte;
	architecteForm: any;
	validationFinanceForm: any;
	dataSize: number = 0;
	isLoading = false;
	sizeData = 0;
	visite: VisiteCa;
	valDatePlis: boolean;
	idNoteArchitecte: any;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	consultationArchitecturale: ConsultationArchitecturale;

	constructor(
		private route: Router,
		private translate: TranslateService,
		private serviceCa: ConsultationArchitecturalService,
		private serviceArchitecte: ArchitecteService,
		private vistieCaService: VisiteCaService,
		private activatedRouter: ActivatedRoute,
		public dialog: MatDialog
	) {}
	displayedColumns = [
		"nom",
		"prenom",
		"mail",
		"adresse",
		"montant",
		"pourcentage",
		"noteTotale",
		"actions",
	];
	dataSource;
	ngOnInit() {

		this.profit = 0;

		this.architecte = {
			id: null,
			nom: "",
			prenom: "",
			mail: "",
			adresse: "",
			montant: null,
			pourcentage: null,
			profit : null,
			nt: null,
			nf: null,
			ne: null,
			noteTotale: null,
			consultationArchitecturale: {
				id: null,
			},
		};
		this.architecteTransf = {
			id: null,
			nom: "",
			prenom: "",
			mail: "",
			adresse: "",
			montant: null,
			pourcentage: null,
			nt: null,
			nf: null,
			ne: null,
			noteTotale: null,
			consultationArchitecturale: {
				id: null,
			},
		};
		this.architecteForm = {
			id: null,
			nom: "",
			prenom: "",
			mail: null,
			adresse: "",
			montant: null,
			pourcentage: null,
			profit: null
		};
		this.validationFinanceForm = {
			nt: null,
			nf: null,
			ne: null,
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

	ShowForm() {
		this.Ajouter = true;
	}

	onMontantAndPercentChange(){
		if(this.architecteForm.montant != null && this.architecteForm.montant != "" && this.architecteForm.pourcentage != null && this.architecteForm.pourcentage != ""){
			this.profit = (this.architecteForm.montant * this.architecteForm.pourcentage)/100;			
		}else{
			this.profit = 0;
		}
	}

	loadCA(idCA: any) {
		this.serviceCa.getConsultationBYId(idCA).subscribe((res) => {
			this.consultationArchitecturale = JSON.parse(res + "");
			if (this.consultationArchitecturale.listArchitectes) {
				this.dataSource =
					this.consultationArchitecturale.listArchitectes.sort(
						(a, b) => (a.noteTotale < b.noteTotale ? 1 : -1)
					);
				const values: Architecte[] =
					this.consultationArchitecturale.listArchitectes.sort(
						(a, b) => (a.noteTotale < b.noteTotale ? 1 : -1)
					);
				this.idNoteArchitecte = values[0].id;
			}
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

	AjouterArchitecte() {
		this.architecte = {
			nom: this.architecteForm.nom,
			prenom: this.architecteForm.prenom,
			mail: this.architecteForm.mail,
			adresse: this.architecteForm.adresse,
			montant: this.architecteForm.montant,
			pourcentage: this.architecteForm.pourcentage,
			consultationArchitecturale: {
				id: this.idCA,
			},
		};

		this.serviceArchitecte
			.addArchitecte(this.architecte)
			.subscribe((res) => {
				this.loadCA(this.idCA);
				this.architecteForm = {
					id: null,
					nom: "",
					adresse: "",
					date: null,
					pourcentage: null,
					profit: null,
					consultationArchitecturale: null,
				};
				this.Ajouter = false;
			});
	}

	deleteArchitecte(id) {
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
				this.serviceArchitecte.deleteArchitecte(id).subscribe(
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
							text: "Ce numéro d'architecte  est utilisé par d'outre module.",
						});
					}
				);
			}
		});
	}
	validerComissionFinance() {
		this.serviceArchitecte
			.validerComissionFinance(
				this.idCA,
				this.validationFinanceForm.nt,
				this.validationFinanceForm.nf,
				this.validationFinanceForm.ne
			)
			.subscribe((res) => {});
	}
	detailArchitecte(id: any) {
		this.serviceArchitecte.getArchitecteById(id).subscribe((res) => {
			this.architecteTransf = JSON.parse(res + "");
			let dialogRef = this.dialog.open(EditArchitecteComponent, {
				width: "2050px",
				data: {
					architecte: this.architecteTransf,
				},
			});
			dialogRef.afterClosed().subscribe((res) => {
				this.loadCA(this.idCA);
			});
		});
	}
	imprimerAvis(id: any) {
		this.serviceArchitecte.imprimerAvis(this.idCA, id).subscribe((res) => {
			const file: any = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const readfile = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.download = "InvitationArchitecte.docx";
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
	imprimerAvisEcarte(id: any) {
		this.serviceArchitecte
			.imprimerAvisEcarte(this.idCA, id)
			.subscribe((res) => {
				const file: any = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});
				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "ArchitecteEcarte.docx";
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

	imprimerAvisAccepter(id: any) {
		this.serviceArchitecte
			.imprimerAvisAccepter(this.idCA, id)
			.subscribe((res) => {
				const file: any = new Blob([res as unknown as BlobPart], {
					type: "application/pdf",
				});
				const readfile = URL.createObjectURL(file);
				const link = document.createElement("a");
				link.download = "ArchitecteAccepte.docx";
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
	editArchitecte(id: any) {
		this.serviceArchitecte.getArchitecteById(id).subscribe((res) => {
			this.architecteTransf = JSON.parse(res + "");
			console.log(this.architecteTransf + "fdsfsfsd");
			let dialogRef = this.dialog.open(EditArchitectInfiComponent, {
				width: "2050px",
				data: {
					architecte: this.architecteTransf,
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
