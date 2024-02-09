import { CommissionCA } from "./../models/commission-c-a";
import { CommissionCaService } from "./../../shared/commission-ca.service";
import { VisiteCa } from "./../models/visite-ca";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatSort } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { ConsultationArchitecturalService } from "../../shared/consultation-architectural.service";
import { ConsultationArchitecturale } from "../models/consultation-architecturale";
import Swal from "sweetalert2";
import { VisiteCaService } from "../../shared/visite-ca.service";

@Component({
	selector: "kt-ca-detail",
	templateUrl: "./ca-detail.component.html",
	styleUrls: ["./ca-detail.component.scss"],
})
export class CaDetailComponent implements OnInit, AfterViewInit {
	private unsubscribe: Subscription[] = [];
	checkLang: string;
	secteursDataSource: any;
	arrList: any;
	visite: VisiteCa;
	valDatePlis: boolean;
	valCommission: boolean;
	lotMarcheDataSource: any;
	showPage: number = 0;
	showPageFR: number = 0;
	showPageAR: number = 0;
	lang: string = "avisAR";
	commssionCa: CommissionCA;
	idCA: any;
	consultationArchitecturale: ConsultationArchitecturale;
	form: any;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(
		private router: Router,
		private translate: TranslateService,
		private service: ConsultationArchitecturalService,
		private route: Router,
		private vistieCaService: VisiteCaService,
		private commissionCaserviec: CommissionCaService,
		private activatedRoute: ActivatedRoute,
		public dialog: MatDialog
	) {
		this.form = {
			id: null,
			numCA: "",
			objetFR: "",
			objetAR: "",
			budget: null,
			type: "",
			date: null,
			loi: null,
			isValideDg: null,
			isValideTresorerie: null,
			isValideSG: null,
			listArchitectes: [],
			listJournaux: [],
		};
	}
	ngAfterViewInit(): void {}

	ngOnInit() {
		this.checkLang = window.localStorage.getItem("language");
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});
		this.activatedRoute.queryParams.subscribe((param) => {
			this.idCA = param["id"];
			if (this.idCA == null || this.idCA == "") {
				this.route.navigateByUrl(
					"/marches/consultation-architecturale"
				);
			} else {
				this.loadConsulationArchitecturale(this.idCA);
				var b = { index: 0 };
				this.changeTab(b);
			}
		});
	}

	loadConsulationArchitecturale(idCA: any) {
		this.service.getConsultationBYId(idCA).subscribe((res) => {
			this.form = JSON.parse(res + "");
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
			this.commissionCaserviec
				.getCommissionFinance(this.idCA)
				.subscribe((res) => {
					if (res) {
						const values = JSON.parse(res + "");
						this.commssionCa = values;
						if (this.commssionCa) {
							this.valCommission = true;
						} else {
							this.valCommission = false;
						}
					}
				});
		});
	}

	changeTab(a) {
		if (a.index == 0) {
			this.router.navigate(["marches/ca-detail/visa-president"], {
				queryParams: { id: this.idCA },
			});
		}

		if (a.index == 1) {
			this.router.navigate(["marches/ca-detail/visa-dgs"], {
				queryParams: { id: this.idCA },
			});
		}

		if (a.index == 2) {
			this.router.navigate(["marches/ca-detail/visa-tresorier"], {
				queryParams: { id: this.idCA },
			});
		}

		if (a.index == 3) {
			this.router.navigate(["marches/ca-detail/ca-architectes"], {
				queryParams: { id: this.idCA },
			});
		}

		if (a.index == 4) {
			this.router.navigate(["marches/ca-detail/ca-journaux"], {
				queryParams: { id: this.idCA },
			});
		}

		if (a.index == 5) {
			this.router.navigate(["marches/ca-detail/ca-visite"], {
				queryParams: { id: this.idCA },
			});
		}

		if (a.index == 6) {
			this.router.navigate(["marches/ca-detail/ca-commission"], {
				queryParams: { id: this.idCA },
			});
		}
	}

	printAvisAR(id: any) {
		// this.vistieCaService.getVisiteBYCAID(this.idCA).subscribe((res) => {
			// if (res) {
			// 	const values = JSON.parse(res + "");
			// 	this.visite = values[0];
			// 	if (this.visite != null) {
					this.service.printAvisAR(id).subscribe((res) => {
						const file: any = new Blob(
							[res as unknown as BlobPart],
							{
								type: "application/pdf",
							}
						);
						const readfile = URL.createObjectURL(file);
						const link = document.createElement("a");
						link.download = "AvisArabe.docx";
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
				// } else {
				// 	Swal.fire({
				// 		title: this.translate.instant(
				// 			"PAGES.GENERAL.MSG_DATE_PLIS"
				// 		),
				// 		icon: "question",
				// 		iconHtml: "?",
				// 		showCloseButton: true,
				// 		cancelButtonText: "OK",
				// 	});
				// }
		// 	}
		// });
	}

	printAvisFR(id: any) {
		// this.vistieCaService.getVisiteBYCAID(this.idCA).subscribe((res) => {
		// 	if (res) {
		// 		const values = JSON.parse(res + "");
		// 		this.visite = values[0];
		// 		if (this.visite != null) {
					this.service.printAvisFR(id).subscribe((res) => {
						const file: any = new Blob(
							[res as unknown as BlobPart],
							{
								type: "application/pdf",
							}
						);
						const readfile = URL.createObjectURL(file);
						const link = document.createElement("a");
						link.download = "AvisFrancais.docx";
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
		// 		} else {
		// 			Swal.fire({
		// 				title: this.translate.instant(
		// 					"PAGES.GENERAL.MSG_DATE_PLIS"
		// 				),
		// 				icon: "question",
		// 				iconHtml: "?",
		// 				showCloseButton: true,
		// 				cancelButtonText: "OK",
		// 			});
		// 		}
		// 	}
		// });
	}

	printBordereau(id: any) {
		this.service.printBordereau(id).subscribe((res) => {
			const file: any = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const readfile = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.download = "Bordereau.docx";
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

	printOuvertureDesPlis(id: any) {
		this.vistieCaService.getVisiteBYCAID(this.idCA).subscribe((res) => {
			if (res) {
				const values = JSON.parse(res + "");
				this.visite = values[0];
				if (this.visite != null) {
					this.service
						.printFicheOuvertureDesPlis(id)
						.subscribe((res) => {
							const file: any = new Blob(
								[res as unknown as BlobPart],
								{
									type: "application/pdf",
								}
							);
							const readfile = URL.createObjectURL(file);
							const link = document.createElement("a");
							link.download = "FicheOuvertureDesPlis.docx";
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
				} else {
					Swal.fire({
						title: this.translate.instant(
							"PAGES.GENERAL.MSG_DATE_PLIS"
						),
						icon: "question",
						iconHtml: "?",
						showCloseButton: true,
						cancelButtonText: "Ok",
					});
				}
			}
		});
	}
	printFinCommision(id: any) {
		this.service.printFinCommision(id).subscribe((res) => {
			const file: any = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const readfile = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.download = "PVCommissionFin.docx";
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
	printRapport(id: any) {
		this.service.printRapport(id).subscribe((res) => {
			const file: any = new Blob([res as unknown as BlobPart], {
				type: "application/pdf",
			});
			const readfile = URL.createObjectURL(file);
			const link = document.createElement("a");
			link.download = "Rapport.docx";
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
}
