import { AssociationService } from "../../utils/association.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatAccordion, MatPaginator, MatSort } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { SpinnerService } from '../../utils/spinner.service';
import { Produit } from "../../../../core/_base/layout/models/produit";
import { Emballage } from "../../../../core/_base/layout/models/emballage";
import { round } from "lodash";
import { DatePipe } from "@angular/common";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PeseeService } from "../Services/pesee.service";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { IPesee, Pesee } from "../../../../core/_base/layout/models/pesee";
import Swal from "sweetalert2";
import { Page } from "../../utils/pagination/page";
import { CustomPaginationService } from "../../utils/pagination/services/custom-pagination.service";
import { AuthService } from "../../../../core/auth";
import { GestionPartsService } from "../../parametrage/Services/gestion-des-parts.service";

@Component({
	selector: "kt-list-pesees",
	templateUrl: "./list-pesees.component.html",
	styleUrls: ["./list-pesees.component.scss"],
})
export class ListPeseesComponent implements OnInit {
	Pesees: any;
	data: any[] = [];

	columns: any[];
	// pageSize: number = 5;
	// pageIndex: number = 0;
	isLoadingResults = true;
	isLoading = true;
	// page: number;
	// predicate: string;
	// ascending: boolean;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"NUM",
		"OPERATEUR",
		"DATE_P",
		"VEHICULE",
		"MONTANT_T_M",
		"STATUT",
		"actions",
	];

	// pageChanged(event: PageEvent) {
	// 	this.itemsPerPage = event.pageSize;
	// 	this.loadPage(event.pageIndex, true);
	//   }
	// ============================================
	// Declarations
	// ============================================
	dataSource = new MatTableDataSource<any>();
	page: Page<any> = new Page();


	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	 @ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(
		private paginationService: CustomPaginationService,
		private translate: TranslateService,
		private router: Router,
		protected activatedRoute: ActivatedRoute,
		private peseeService:PeseeService,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService,
		private authService:AuthService,
		private spinnerService: SpinnerService,
		private gestionPartsService: GestionPartsService,

	) {

	} 
	idUser
	parts
	ngOnInit() {
	
		this.idUser=window.localStorage.getItem("idUser")
		this.paginationService.currentMessage.subscribe((message) => {
			this.page = message;
		});
		this.columns = [
			"NUM",
			"OPERATEUR",
			"DATE_P",
			"VEHICULE",
			"MONTANT_T_M",
			"STATUT",
		];

				 this.dataSource = new MatTableDataSource();

		//  this.handleNavigation()

		 this.getPesees()
	}
	ngOnDestroy() {
		this.paginationService.updateMessage(this.page);
		// localStorage.setItem('page',JSON.stringify(this.page))
	}
	pageCurrentChange(event :any){
		// this.currentPage=event;
		this.page.pageable.pageSize=event.pageSize;
		this.page.pageable.pageNumber=event.pageIndex;
		
		// console.log(this.currentPage, this.size)
		this.getPesees();
	  }
	sizeData

	
	public getPesees(){

		this.peseeService.getAllPesees(this.page.pageable)
		.then(data => {
			this.sizeData = data.content.length;
			this.page = data;
			 this.dataSource.data = this.page.content;
			// this.dataSource =new MatTableDataSource(this.page);
			for(let i=0;i<this.dataSource.data.length;i++){
				this.dataSource.data[i].vehicule.numVehicule ="\u202A"+this.dataSource.data[i].vehicule.numVehiculeNumbers+"\u202A"+this.dataSource.data[i].vehicule.numVehiculeAlphabet+"\u202C"+this.dataSource.data[i].vehicule.numVehiculeTwoNumbers;
				
			
				
			}
			// this.dataSource

			this.isLoadingResults = false;
            // this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
			
			
			


          }, err => {
            console.log(err);
            this.isLoadingResults = false;
          });
	  }

	  public getNextPage(): void {
        //console.log("Filter : " + this.dataSource.filter)
        this.page.pageable = this.paginationService.getNextPage(this.page);
        this.isLoading = true;
		if(this.motCle==''){
			this.getPesees()

		}else{
			this.getFilterData(this.motCle);

		}
    }

    public getPreviousPage(): void {
        this.page.pageable = this.paginationService.getPreviousPage(this.page);
        this.isLoading = true;
		if(this.motCle==''){
			this.getPesees()

		}else{
			this.getFilterData(this.motCle);

		}
    }
	public getPageInNewSize(pageSize: number): void {
        this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
        this.isLoading = true;
		if(this.motCle==''){
			this.getPesees()

		}else{
			this.getFilterData(this.motCle);

		}    }

// 	applyFilter(filterValue: string) {
// 		 console.log(filterValue);

// 		 this.dataSource.filterPredicate = (data: IPesee, filterData: string) => {
// 			console.log('filter',filterData);
// 			console.log('data',data);
// 			return data.vehicule.numVehicule.toLocaleLowerCase().includes(filterData) ||
// 			data.date.toString().toLocaleLowerCase().includes(filterData) ||
// 			data.taxe.toString().toLocaleLowerCase().includes(filterData) ||
// 			data.numBon.toString().toLocaleLowerCase().includes(filterData);
// 		  }
// 		this.dataSource.filter = filterValue.trim().toLowerCase();
// //

// 		// if (this.dataSource.paginator) {
// 		// 	this.dataSource.paginator.firstPage();
// 		//   }
// 	}
motCle
applyFilter(filterValue: string) {
	this.motCle=filterValue
	// this.dataSource.filter = filterValue.trim().toLowerCase();
	this.getFilterData(filterValue);
}
getFilterData(filter): void {
	
	this.peseeService
		.getAllObjectByFilterPage("pesees/findBymotCle", filter, this.page.pageable)
		.subscribe((data) => {
			this.page = data;
			this.dataSource.data = this.page.content;

			// setTimeout(() => { this.SpinnerService.hide() }, 500);
			this.isLoading = false;
		},
			(err) => {
				// setTimeout(() => { this.SpinnerService.hide() }, 500);
				this.isLoading = false;
				console.log(err);
			});
}
	ModifierPesee(id): void {
		this.router.navigate(["pesee/edit-pesee/"+id]);
	}
	addPesee(): void {
		this.router.navigate(["pesee/add-pesee"]);
	}

isMondataire

	Details(id) {
this.isMondataire=false
this.peseeService.sendData(this.isMondataire)
		this.router.navigate(["pesee/show-pesee/"+id]);
	}
	toPrint: any;

	

	deleteAssociation(id: number){

		Swal.fire({

			title:this.translate.instant('PAGES.PESEE.MESSAGE_SUPPR'),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant('PAGES.PESEE.OUI'),
			cancelButtonText: this.translate.instant('PAGES.PESEE.NON'),
		}).then((result) => {

			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {

      this.peseeService.delete(id).subscribe(result => {


          console.log("res ==> ",result.body)
          Swal.fire({
            position: "center",
            icon: "success",
            title:this.translate.instant('PAGES.PESEE.MESSAGE_SUCCES_SUPPR'),
            showConfirmButton: false,
			timer: 2500,

          });
		  location.reload()

      },error => {
          console.log("error ===> ",error)
          Swal.fire({
            position: "center",
            icon: "error",
            title:this.translate.instant('PAGES.PESEE.MESSAGE_ERROR'),
            showConfirmButton: false,
            timer: 2500,
          });
      });

			}
      else{
        Swal.fire({
					position: "center",
					icon: "error",
					title:this.translate.instant('PAGES.PESEE.MESSAGE_ERROR_SUPPR'),
					showConfirmButton: false,
					timer: 2500,
				});
      }
		});
	}


	htmlData_
	mondataire 
	chiffreTransaction: any;
	//ancien page not complete
	// Recu(data: any): void {
	// 	this.toPrint = data;

		
	// 	// this.authService.getUserById(this.idUser).then((res)=>{
			
	// 		// this.toPrint.mondataire=res.fullname
	// 		if(data.gestionParts!=null){
	// 			this.gestionPartsService.getPartsById(data.gestionParts.id).subscribe((res)=>{
	// 			this.parts=res
				
	// 			if (data.chiffreTransaction != null) {
	// 				this.chiffreTransaction = (data.chiffreTransaction).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;
	// 				data.partCommune = (data.chiffreTransaction *  this.parts.partCommune/100).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;
	// 				data.partMondataire = (data.chiffreTransaction *  this.parts.partMondataire/100).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;
	// 				data.taxe = (data.chiffreTransaction * this.parts.partMontant/100).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;
	// 			}
	// 			})
	// 			setTimeout(() => {
	// 				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
	// 				let DATA: any = document.getElementById('htmlData');
		
	// 				html2canvas(DATA, {}).then((canvas) => {
	// 					const FILEURI = canvas.toDataURL("image/png");
	// 					let PDF = new jsPDF("p", "mm", "a5");
	// 					let fileWidth = PDF.internal.pageSize.getWidth();
	// 					let fileHeight = (canvas.height * fileWidth) / canvas.width;
	// 					let position = 0;
	// 					PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
	// 					PDF.save("Reçu N° " + this.toPrint.numBon + ".pdf");
	// 					this.spinnerService.stop(spinnerRef);
	// 				});
	// 			}, 250);
	// 		}
			
			

			
	// 					// })
	
	// }
	
	


toPrint2
toPrint1
dataOrigin=[];
temp=true
	Recu(data:any): void {const itemsPerPage1 = 5;
		this.dataOrigin.push(data.peseeProduits);
		
		const itemsPerPage = 2;
		const totalItems = data.peseeProduits.length;
		data.peseeProduits=data.peseeProduits.slice(0,5);
		this.toPrint = data;
		console.log(this.toPrint);
		
		
		if (data.gestionParts != null) {
			this.gestionPartsService.getPartsById(data.gestionParts.id).subscribe((res) => {
				this.parts = res;
	
				if (data.chiffreTransaction != null) {
					this.chiffreTransaction = (data.chiffreTransaction).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					data.partCommune = (data.chiffreTransaction * this.parts.partCommune / 100).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					data.partMondataire = (data.chiffreTransaction * this.parts.partMondataire / 100).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
					data.taxe = (data.chiffreTransaction * this.parts.partMontant / 100).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
				}
			});
		
	
		if (totalItems > itemsPerPage1) {
			this.temp=true
		  const PDF = new jsPDF("p", "mm", "a5");
		  setTimeout(() => {
			const spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
			let dataIndex = 0;
			let i = 5;
			this.dataOrigin
			
			const generatePage = () => {
			  const endIndex = Math.min(dataIndex + itemsPerPage, totalItems);
			  if (dataIndex < totalItems) {
				this.dataOrigin;
				this.toPrint2 = {
				  data: this.dataOrigin[0].slice(i, i + itemsPerPage),
				};
				this.dataOrigin
			
				const elementId = dataIndex === 0 ? "htmlData" : "htmlData2";
				const canvasPromise = html2canvas(document.getElementById(elementId), {});
				this.dataOrigin
				
				canvasPromise.then((canvas) => {
				  const FILEURI = canvas.toDataURL("image/png");
				  let fileWidth = PDF.internal.pageSize.getWidth();
				  let fileHeight = (canvas.height * fileWidth) / canvas.width;
				  if (dataIndex > 0) {
					PDF.addPage();
				  }
				  PDF.addImage(FILEURI, "PNG", 0, 0, fileWidth, fileHeight);
				  dataIndex += itemsPerPage1;
				  i += 2;
				  generatePage();
				});
			  } else {
				PDF.save("Reçu N° " + this.toPrint.numBon + ".pdf");
				this.spinnerService.stop(spinnerRef);
			  }
			};
			generatePage();
		  }, 250);
		}
		else {
			this.temp=false

			this.dataOrigin
			
		  this.toPrint = data
		  setTimeout(() => {
			var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
			let DATA: any = document.getElementById("htmlData");
	
			html2canvas(DATA, {}).then((canvas) => {
			  const FILEURI = canvas.toDataURL("image/png");
			  let PDF = new jsPDF("p", "mm", "a5");
			  let fileWidth = PDF.internal.pageSize.getWidth();
			  let fileHeight = (canvas.height * fileWidth) / canvas.width;
			  let position = 0;
			  PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
			  PDF.save("Reçu N° " + this.toPrint.numBon + ".pdf");
			  this.spinnerService.stop(spinnerRef);
			});
		  }, 250);
		}}
	  }
	
	
	
	
	


	Payer(id:any){
		
		Swal.fire({

			title:'Voulez vous payer ce pesé?',
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant('PAGES.PESEE.OUI'),
			cancelButtonText: this.translate.instant('PAGES.PESEE.NON'),
		}).then((result) => {

			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.peseeService.patchPesee(id).subscribe((res)=>{
					console.log("res ==> ",res.body)
					Swal.fire({
					  position: "center",
					  icon: "success",
					  title:this.translate.instant('PAGES.PESEE.MESSAGE_SUCCES_SUPPR'),
					  showConfirmButton: false,
					  timer: 2500,
		  
					});
					location.reload()
				},error => {
					console.log("error ===> ",error)
					Swal.fire({
					  position: "center",
					  icon: "error",
					  title:this.translate.instant('PAGES.PESEE.MESSAGE_ERROR'),
					  showConfirmButton: false,
					  timer: 2500,
					});
				})
      

			}
      else{
        Swal.fire({
					position: "center",
					icon: "error",
					title:this.translate.instant('PAGES.PESEE.MESSAGE_ERROR_SUPPR'),
					showConfirmButton: false,
					timer: 2500,
				});
      }
		});

	}
}
