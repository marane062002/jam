import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";
import { AoService } from "../../../shared/ao.service";
import { SpinnerService } from "../../../utils/spinner.service";
import { TranslateService } from "@ngx-translate/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Page } from "../../../utils/pagination/page";
import { CustomPaginationService } from "../../../utils/pagination/services/custom-pagination.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { GestionDesTypesAoService } from "../../../parametrage/Services/gestion-des-types-ao.service";
@Component({ 
	selector: "kt-list-programme-previsionnel",
	templateUrl: "./list-programme-previsionnel.component.html",
	styleUrls: ["./list-programme-previsionnel.component.scss"],
})
export class ListProgrammePrevisionnelComponent implements OnInit {
	startFilterDate: string = '';
  endFilterDate: string = '';
	displayedColumns = [
		//"numAo",
		"objet",
		"typePrestation", //
		// "SousTypePrestation", //
		// "LieuExecution",
		"natureAo",
		"periodeLancement",
		"CoordonneServiceConcerne",
		// "MarcheDestinePME",
		// "Quantite",
		"actions",
	];
	ServiceConcerne = ["Division etudes planification et transformation digitale", "Division urbanisme et aménagement urbain", "Division des affaires techniques", "Division des affaires culturelles et sportives", "Division de l'action sociale", "Division budget,comptabilité et marchés publics", "Division des Grands services et logistique", "Division de Gestion des ressources   financières"];
	dataSourceTraveaux: any;
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
	filterForm: FormGroup;
	toPrintTraveaux: any = [];
	isTravaux = false;
	constructor(private fb: FormBuilder, private router: Router, private service: AoService, private spinnerService: SpinnerService, private translate: TranslateService, private paginationService: CustomPaginationService) {}
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
	ngOnInit() {
		this.service.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
		this.filterForm = this.fb.group({
			year: new FormControl("ALL", Validators.required),
			coordonneServiceConcerne: new FormControl(""),
			president: new FormControl(""),
			typePrestation: new FormControl(""),
			endDate: new FormControl(""),
			startDate: new FormControl(""),
		});
		this.service.allPresident().subscribe((res) => {
			this.president = res;
		});
		this.paginationService.currentMessage.subscribe((message) => {
			this.page = message;
		});

		this.anneesDisponibles = this.getListeAnnees(2020, this.year + 1);
		// this.year= new Date().getFullYear()

		// Initialisez l'année filtrée à la première année de la liste (ou à l'année actuelle si vous le souhaitez)
		this.anneeFiltree = this.anneesDisponibles[0];
		this.service.getAllProgrammePrevisionnel(this.page.pageable).subscribe((data) => {
			this.dataSourceTraveaux = data.content;
			// this.Recu(data.content)
		});
	}
	public getNextPage(): void {
		//console.log("Filter : " + this.dataSource.filter)
		this.page.pageable = this.paginationService.getNextPage(this.page);
		this.service.getAllProgrammePrevisionnel(this.page.pageable).subscribe((data) => {
			this.dataSourceTraveaux = data.content;
			// this.Recu(data.content)
		});
	}

	public getPreviousPage(): void {
		this.page.pageable = this.paginationService.getPreviousPage(this.page);
		this.service.getAllProgrammePrevisionnel(this.page.pageable).subscribe((data) => {
			this.dataSourceTraveaux = data.content;
			// this.Recu(data.content)
		});
	}
	public getPageInNewSize(pageSize: number): void {
		this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
		this.service.getAllProgrammePrevisionnel(this.page.pageable).subscribe((data) => {
			this.dataSourceTraveaux = data.content;
			// this.Recu(data.content)
		});
	}
	getListeAnnees(debut: number, fin: number): number[] {
		const années: number[] = [];
		for (let année = fin; année >= debut; année--) {
			années.push(année);
		}
		return années;
	}
filteryear='ALL'
filterService
	filtrerParAnnee(e) {
		this.year = e.value;
		this.filteryear=e.value
		// if (e.value == "ALL") {
		// 	this.service.getAllProgrammePrevisionnel(this.page.pageable).then((res) => {
		// 		this.dataSourceTraveaux = res.content;
		// 	});
		// } else {
		// 	this.service.getAllProgrammePrevisionnelByDate(e.value, this.page.pageable).then((res) => {
		// 		this.dataSourceTraveaux = res.content;
		// 	});
		// }

		// for(let i=0; i<this.dataSourceTraveaux.length; i++){
		//  let a= new Date(this.dataSourceTraveaux[i].dateProjet).getFullYear()
		//
		// }
		//
		// this.dataSourceTraveaux = this.dataSourceTraveaux.filter(item =>
		//   new Date(item.dateProjet).getFullYear() === this.anneeFiltree
		// );
	}

	add() {
		this.router.navigate(["/marches/add-programme-previsionnel"]);
	}
	Recu(): void {
		this.toPrintTraveaux = [];
		this.toPrintFournitures = [];
		this.toPrintServices = [];
		this.filterForm.value;
		
		if (this.filterForm.value.year == "ALL") {
			Swal.fire({
				title: "	Vous devez saisir l'année ",

				icon: "error",
			});
		} else {
			this.filterForm.value.year=this.year
			
			this.service.researchProgrammePrevisionnel(this.page.pageable.pageNumber,this.page.pageable.pageSize,this.filterForm.value).subscribe((res:any)=>{
			// this.service.getAllProgrammePrevisionnelByDate(this.year, this.page.pageable).then((res) => {
				for (let i = 0; i < res.content.length; i++) {
					this.dataSourceTraveaux
					
					if (this.dataSourceTraveaux[i].typePrestation.id == 1) {
						this.toPrintTraveaux.push(this.dataSourceTraveaux[i]);
					}
					if (this.dataSourceTraveaux[i].typePrestation.id == 2) {
						this.toPrintFournitures.push(this.dataSourceTraveaux[i]);
					}
					if (this.dataSourceTraveaux[i].typePrestation.id == 3) {
						this.toPrintServices.push(this.dataSourceTraveaux[i]);
					}
				}
				setTimeout(() => {
					var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
					let DATA: any = document.getElementById("htmlData");

					html2canvas(DATA, {}).then((canvas) => {
						const FILEURI = canvas.toDataURL("image/png");
						let PDF = new jsPDF({
							orientation: "p",  // "p" for portrait, "l" for landscape
							unit: "mm",
							format:"a4",  // You can also use custom dimensions like [width, height]
						  });						let fileWidth = PDF.internal.pageSize.getWidth();
						let fileHeight = (canvas.height * fileWidth) / canvas.width;
						let position = 0;
						PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
						PDF.save("Programme prévisionnel.pdf");
						this.spinnerService.stop(spinnerRef);
					});
				}, 250);
			});
		}

		// })
		// })
		// })
	}

	onSubmit(){
		this.listDivision
		this.listPresident
		this.listCategorie
		this.filterForm.value
		
		if(this.listDivision!=undefined){
			
			if (this.listDivision.length != 0) {
				this.filterForm.value.coordonneServiceConcerne = `(${this.listDivision.map((item) => `'${item}'`).join(", ")})`;
			}
		}else{
			this.listDivision.length==0
		}
		if(this.listPresident!=undefined){
			if (this.listPresident.length != 0) {
				this.filterForm.value.president = `(${this.listPresident.map((item) => `'${item}'`).join(", ")})`;
			}
		}else{
			this.listPresident.length==0
		}

		// if(this.listCategorie!=undefined){
		// 	if (this.listCategorie.length != 0) {
		// 		this.filterForm.value.typePrestation = `(${this.listCategorie.map((item) => `'${item}'`).join(", ")})`;
		// 	}
		// }else{
		// 	this.listCategorie.length==0
		// }
		
		if (this.filterForm.value.president == undefined) {
			this.filterForm.value.president = "";
		}	
		if (this.filterForm.value.coordonneServiceConcerne== undefined) {
			this.filterForm.value.coordonneServiceConcerne  = "";
		}

		if (this.filterForm.value.typePrestation == undefined) {
			this.filterForm.value.typePrestation = [];
		}
		if (this.listCategorie.length != 0) {
			this.filterForm.value.typePrestation = this.listCategorie;
		}
		if(this.filteryear=='ALL'){
			this.filterForm.value.year  =null;

		}
		
		// if(this.filteryear == "ALL" && this.listPresident.length==0 && this.listDivision.length==0){
		// 	this.service.getAllProgrammePrevisionnel(this.page.pageable).then((res) => {
		// 		this.dataSourceTraveaux = res.content;
		// 	});
		// }else if(this.filteryear != "ALL" && this.listPresident.length==0 && this.listDivision.length==0){
		// 	this.service.getAllProgrammePrevisionnelByDate(this.filteryear, this.page.pageable).then((res) => {
		// 		this.dataSourceTraveaux = res.content;
		// 	});
		// }else if(this.filteryear != "ALL" && this.listPresident.length==0 && this.listDivision.length!=0){
		// 	this.service.getAllProgrammePrevisionnelByServiceConcerne(this.filterForm.value.coordonneServiceConcerne, this.page.pageable).then((res) => {
		// 		this.dataSourceTraveaux = res.content;
		// 	});
		// }
		
if(this.filteryear!="ALL" || this.listPresident.length!=0 || this.listDivision.length!=0 || this.listCategorie.length!=0||  this.filterForm.value.endDate!=''|| this.filterForm.value.startDate!='' ){
	
	this.service.researchProgrammePrevisionnel(0,500,this.filterForm.value).subscribe((res:any)=>{
		this.dataSourceTraveaux = res.content;
		
	})
}
		

	
		
	}
}
