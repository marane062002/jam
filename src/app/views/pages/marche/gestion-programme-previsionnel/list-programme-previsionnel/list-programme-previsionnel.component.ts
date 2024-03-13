import { Component, OnInit } from "@angular/core";
import { MatTableDataSource, PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { AoService } from "../../../shared/ao.service";
import { SpinnerService } from "../../../utils/spinner.service";
import { TranslateService } from "@ngx-translate/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Page } from "../../../utils/pagination/page";
import { CustomPaginationService } from "../../../utils/pagination/services/custom-pagination.service";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { GestionDesTypesAoService } from "../../../parametrage/Services/gestion-des-types-ao.service";
import { Observable } from "rxjs";
import { AuthService, User, currentUser } from "../../../../../core/auth";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../.././../../core/reducers";
import { DatePipe } from "@angular/common";
@Component({
	selector: "kt-list-programme-previsionnel",
	templateUrl: "./list-programme-previsionnel.component.html",
	styleUrls: ["./list-programme-previsionnel.component.scss"],
})
export class ListProgrammePrevisionnelComponent implements OnInit {
	startFilterDate: string = '';
	endFilterDate: string = '';
	displayedColumns = [
		"objet",
		"num",
		"typePrestation",
		"natureAo",
		"dateOuverturePlis",
		"CoordonneServiceConcerne",
		"actions",
	];
	ServiceConcerne = ["Division etudes planification et transformation digitale", "Division urbanisme et aménagement urbain", "Division des affaires techniques", "Division des affaires culturelles et sportives", "Division de l'action sociale", "Division budget,comptabilité et marchés publics", "Division des Grands services et logistique", "Division de Gestion des ressources   financières"];
	dataSourceTraveaux: any;
	dataSource: any;
	dataSourceServices: MatTableDataSource<any>;
	dataSourceFournitures: MatTableDataSource<any>;
	id;
	page: Page<any> = new Page();
	toPrintFournitures: any = [];
	toPrintServices: any = [];
	anneesDisponibles: number[];
	listPresident = [];
	selectedOptionsPresident;
	anneeFiltree: number;
	president;
	lisTypePrestationAo;
	year: number = new Date().getFullYear();
	selectedYear: any = "ALL";
	filterForm;
	toPrintTraveaux: any = [];
	isTravaux = false;
	constructor(private datePipe: DatePipe, private authService: AuthService, private store: Store<AppState>,
		private fb: FormBuilder, private router: Router, private service: AoService, private spinnerService: SpinnerService, private translate: TranslateService, private paginationService: CustomPaginationService) { }
	show(id) {
		this.router.navigate(["/marches/show-programme-previsionnel"], {
			queryParams: { id: id, page: 1 },
		});
	}
	edit(id) {
		this.router.navigate(["/marches/edit-programme-previsionnel"], {
			queryParams: { id: id, page: 1 },
		});
	}

	addItemPresident(event: any) {
		if (event[0] == "ALL") {
			this.listPresident = this.president;
			this.selectedOptionsPresident = this.president.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.president.length) {
			this.listPresident = [];
			this.selectedOptionsPresident = [];
		} else {
			this.listPresident = event;
			this.selectedOptionsPresident = event;
		}
	}
	listDivision = [];
	selectedOptionsDivision
	addItemDivision(event: any) {
		if (event[0] == "ALL") {
			this.listDivision = this.ServiceConcerne;
			this.selectedOptionsDivision = this.ServiceConcerne.concat(event[0]);

			event[0] = [];
		} else if (event.length == this.ServiceConcerne.length) {
			this.listDivision = [];
			this.selectedOptionsDivision = [];
		} else {
			this.listDivision = event;
			this.selectedOptionsDivision = event;
		}
	}
	selectedOptionsCategorie
	listCategorie = [];
	addItemCategorie(event: any) {
		if (event[0] == "ALL") {
			this.listCategorie = this.lisTypePrestationAo;
			this.selectedOptionsCategorie = this.lisTypePrestationAo.concat(event[0]);
			event[0] = [];
		} else if (event.length == this.lisTypePrestationAo.length) {
			this.listCategorie = [];
			this.selectedOptionsCategorie = [];
		} else {
			this.listCategorie = event;
			this.selectedOptionsCategorie = event;
		}
	}
	sizeData
	sizeData2
	user$: Observable<User>;
	user
	isPresident = false

	ngOnInit() {
		this.user$ = this.store.pipe(select(currentUser));


		this.service.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
		this.filterForm = this.fb.group({
			year: new FormControl("ALL", Validators.required),
			coordonneServiceConcerne: new FormControl(null),
			idPresident: new FormControl(null),
			typePrestation: new FormControl(null),
			endDate: new FormControl(null),
			startDate: new FormControl(null),
		});
		this.authService.getUserWherePresidentTrue().then((res) => {
			this.president = res

		})
		this.paginationService.currentMessage.subscribe((message) => {
			this.page = message;
		});

		this.anneesDisponibles = this.getListeAnnees(2020, this.year + 1);
		this.anneeFiltree = this.anneesDisponibles[0];
		this.page.pageable

		this.service.getAllProgrammePrevisionnel().subscribe((data) => {
			for (let i = 0; i < data.content.length; i++) {

				if (data.content[i].dateOuverturePlis != null && data.content[i].heureOuverturePlis != null) {
					let a = typeof data.content[i].dateOuverturePlis

					data.content[i].dateOuverturePlis = this.datePipe.transform(data.content[i].dateOuverturePlis, 'yyyy-MM-dd') + ' ' + data.content[i].heureOuverturePlis;

				}

			}

			this.dataSourceTraveaux = data.content;
			this.sizeData = data.totalElements
		});
		this.user$ = this.store.pipe(select(currentUser));


		this.user$.subscribe((user: User) => {
			if (user != undefined) {
				this.authService.getUserById(user.id).then((res) => {
					this.user = res;
					this.service.findByIdPresident(user.id).subscribe((data) => {
						this.selectedOptionsPresident = [user.id];

						if (this.user.president == true) {
							this.isPresident = true

						}
						this.dataSource = data.content;
						this.sizeData2 = data.totalElements
					});
				})
			}
		})
	}
	delete(id) {
		Swal.fire({
			title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
			icon: 'question',
			iconHtml: '?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
			cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON")
		}).then((result) => {
			if (result.isConfirmed) {
				this.service
					.deleteProgrammePrevisionnel(id)
					.subscribe(data => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						location.reload()
					},
						(err) => {
							location.reload()

						});
			}
		})
	}
	isSearch = false
	handlePageEvent(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		if (this.isSearch == true) {
			if (this.listDivision != undefined) {

				if (this.listDivision.length != 0) {
					this.filterForm.value.coordonneServiceConcerne = this.listDivision;
				}
			} else {
				this.listDivision.length == 0
			}
			if (this.listPresident != undefined) {
				if (this.listPresident.length != 0) {
					this.filterForm.value.idPresident = `(${this.listPresident.map((item) => `'${item}'`).join(", ")})`;
				}
			} else {
				this.listPresident.length == 0
			}

			if (this.filterForm.value.idPresident == undefined) {
				this.filterForm.value.idPresident = "";
			}
			if (this.filterForm.value.coordonneServiceConcerne == undefined) {
				this.filterForm.value.coordonneServiceConcerne = [];
			}

			if (this.filterForm.value.typePrestation == undefined) {
				this.filterForm.value.typePrestation = [];
			}
			if (this.listCategorie.length != 0) {
				this.filterForm.value.typePrestation = this.listCategorie;
			}
			if (this.filteryear == 'ALL') {
				this.filterForm.value.year = null;

			}


			this.service.PaginationProgrammePrevisionnel(pageIndex, pageSize).subscribe((data: any) => {
				this.dataSourceTraveaux = data.content;
				this.sizeData = data.totalElements
			});
		} else {
			this.service.PaginationProgrammePrevisionnel(pageIndex, pageSize).subscribe((data: any) => {
				this.dataSourceTraveaux = data.content;
				this.sizeData = data.totalElements
			});
		}

	}
	handlePageEvent2(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		if (this.isSearch == true) {
			if (this.listDivision != undefined) {

				if (this.listDivision.length != 0) {
					this.filterForm.value.coordonneServiceConcerne = this.listDivision;
				}
			} else {
				this.listDivision.length == 0
			}
			if (this.listPresident != undefined) {
				if (this.listPresident.length != 0) {
					this.filterForm.value.idPresident = `(${this.listPresident.map((item) => `'${item}'`).join(", ")})`;
				}
			} else {
				this.listPresident.length == 0
			}

			if (this.filterForm.value.idPresident == undefined) {
				this.filterForm.value.idPresident = "";
			}
			if (this.filterForm.value.coordonneServiceConcerne == undefined) {
				this.filterForm.value.coordonneServiceConcerne = [];
			}

			if (this.filterForm.value.typePrestation == undefined) {
				this.filterForm.value.typePrestation = [];
			}
			if (this.listCategorie.length != 0) {
				this.filterForm.value.typePrestation = this.listCategorie;
			}
			if (this.filteryear == 'ALL') {
				this.filterForm.value.year = null;

			}


			this.service.PaginationProgrammePrevisionnelByIdPresident(this.user.id, pageIndex, pageSize).subscribe((data: any) => {
				this.dataSource = data.content;
				this.sizeData2 = data.totalElements
			});
		} else {
			this.service.PaginationProgrammePrevisionnelByIdPresident(this.user.id, pageIndex, pageSize).subscribe((data: any) => {
				this.dataSource = data.content;
				this.sizeData2 = data.totalElements
			});
		}

	}

	getListeAnnees(debut: number, fin: number): number[] {
		const années: number[] = [];
		for (let année = fin; année >= debut; année--) {
			années.push(année);
		}
		return années;
	}
	filteryear = 'ALL'
	filterService
	filtrerParAnnee(e) {
		this.year = e.value;
		this.filteryear = e.value
	}

	add() {
		this.router.navigate(["/marches/add-programme-previsionnel"]);
	}
	idPresident = [];
	Recu(): void {
		this.toPrintTraveaux = [];
		this.toPrintFournitures = [];
		this.toPrintServices = [];
		this.filterForm.value;
		if (this.filterForm.value.year == 'ALL') {
			this.filterForm.get('year').setValue(null);
		}
		this.filterForm.value.year = this.year
		this.idPresident = [];
		if (Array.isArray(this.filterForm.value.idPresident) && this.filterForm.value.idPresident.length >= 1) {
			for (let i = 0; i < this.filterForm.value.idPresident.length; i++) {
				this.idPresident.push(this.filterForm.value.idPresident[i]);
			}
		}
		if (!Array.isArray(this.filterForm.value.idPresident)) {
			this.idPresident.push(this.filterForm.value.idPresident);
		}
		this.filterForm.get('idPresident').setValue(this.idPresident);

		if (this.isPresident == false) {
			if (this.listPresident && this.listPresident.length > 0) {
				for (let i = 0; i < this.listPresident.length; i++) {
					this.listPresident[i] = parseInt(this.listPresident[i])
				}
				this.filterForm.value.idPresident = this.listPresident;

			} else {
				this.filterForm.value.idPresident = [];
			}
		}

		this.service.researchProgrammePrevisionnel(this.page.pageable.pageNumber, this.page.pageable.pageSize, this.filterForm.value).subscribe((res: any) => {
			for (let i = 0; i < res.content.length; i++) {
				if (res.content[i].typePrestation.id == 1) {
					this.toPrintTraveaux.push(res.content[i]);
				}
				if (res.content[i].typePrestation.id == 2) {
					this.toPrintFournitures.push(res.content[i]);
				}
				if (res.content[i].typePrestation.id == 3) {
					this.toPrintServices.push(res.content[i]);
				}
			}
			setTimeout(() => {
				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
				let DATA: any = document.getElementById("htmlData");

				html2canvas(DATA, {}).then((canvas) => {
					const FILEURI = canvas.toDataURL("image/png");
					let PDF = new jsPDF({
						orientation: "p",
						unit: "mm",
						format: "a4",
					}); let fileWidth = PDF.internal.pageSize.getWidth();
					let fileHeight = (canvas.height * fileWidth) / canvas.width;
					let position = 0;
					PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
					PDF.save("Programme prévisionnel.pdf");
					this.spinnerService.stop(spinnerRef);
				});
			}, 250);
		});
	}

	onSubmit() {
		this.listDivision
		this.listPresident
		this.listCategorie
		this.filterForm.value
		this.isSearch = true
		if (this.isPresident == false) {
			if (this.listDivision != undefined) {

				if (this.listDivision.length != 0) {
					this.filterForm.value.coordonneServiceConcerne = this.listDivision;
				}
			} else {
				this.listDivision.length == 0
			}

			if (this.listPresident && this.listPresident.length > 0) {
				for (let i = 0; i < this.listPresident.length; i++) {
					this.listPresident[i] = parseInt(this.listPresident[i])
				}
				this.filterForm.value.idPresident = this.listPresident;

			} else {
				this.filterForm.value.idPresident = [];
			}


			if (this.filterForm.value.idPresident == undefined) {
				this.filterForm.value.idPresident = 0;
			}
			if (this.filterForm.value.coordonneServiceConcerne == undefined) {
				this.filterForm.value.coordonneServiceConcerne = [];
			}

			if (this.filterForm.value.typePrestation == undefined) {
				this.filterForm.value.typePrestation = [];
			}
			if (this.listCategorie.length != 0) {
				this.filterForm.value.typePrestation = this.listCategorie;
			}
			if (this.filteryear == 'ALL') {
				this.filterForm.value.year = null;

			}



			if (this.filteryear != "ALL" || this.listPresident.length != 0 || this.listDivision.length != 0 || this.listCategorie.length != 0 || this.filterForm.value.endDate != '' || this.filterForm.value.startDate != '') {
				this.service.researchProgrammePrevisionnel(0, this.sizeData, this.filterForm.value).subscribe((res: any) => {
					this.dataSourceTraveaux = res.content;
					this.dataSource = res.content;
					this.sizeData = res.totalElements
					this.sizeData2 = res.totalElements
				})
			}
		} else {
			if (this.listDivision != undefined) {

				if (this.listDivision.length != 0) {
					this.filterForm.value.coordonneServiceConcerne = this.listDivision;
				}
			} else {
				this.listDivision.length == 0
			}

			if (this.listPresident && this.listPresident.length > 0) {
				for (let i = 0; i < this.listPresident.length; i++) {
					this.listPresident[i] = parseInt(this.listPresident[i])
				}
				this.filterForm.value.idPresident = this.listPresident;

			} else {
				this.filterForm.value.idPresident = [];
			}


			if (this.filterForm.value.idPresident == undefined) {
				this.filterForm.value.idPresident = 0;
			}
			if (this.filterForm.value.coordonneServiceConcerne == undefined) {
				this.filterForm.value.coordonneServiceConcerne = [];
			}

			if (this.filterForm.value.typePrestation == undefined) {
				this.filterForm.value.typePrestation = [];
			}
			if (this.listCategorie.length != 0) {
				this.filterForm.value.typePrestation = this.listCategorie;
			}
			if (this.filteryear == 'ALL') {
				this.filterForm.value.year = null;

			}
			if (this.filteryear != "ALL" || this.listPresident.length != 0 || this.listDivision.length != 0 || this.listCategorie.length != 0 || this.filterForm.value.endDate != '' || this.filterForm.value.startDate != '') {

				this.filterForm.value.idPresident = [this.user.id]
				this.service.researchProgrammePrevisionnel(0, this.sizeData, this.filterForm.value).subscribe((res: any) => {
					this.dataSourceTraveaux = res.content;
					this.dataSource = res.content;
					this.sizeData = res.totalElements
					this.sizeData2 = res.totalElements
				})
			}
		}





	}

	reset() {
		this.filterForm.reset();
		this.ngOnInit();

	}
}
