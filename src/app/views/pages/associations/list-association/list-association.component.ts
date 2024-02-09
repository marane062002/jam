import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Router } from "@angular/router";
import { AssociationService } from "../../utils/association.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../shared/notification.service";
import { finalize } from "rxjs/operators";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { ConventionService } from "../../utils/convention.service";
import { SpinnerService } from "../../utils/spinner.service";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { ExcelAssociationService } from "../../utils/excel-association.service";
import { Page } from "../../utils/pagination/page";
import { CustomPaginationService } from "../../utils/pagination/services/custom-pagination.service";
 
@Component({
    selector: "kt-list-association",
    templateUrl: "./list-association.component.html",
    styleUrls: ["./list-association.component.scss"],
})
export class ListAssociationComponent implements OnInit {
    assoc: any;
    data: excelData[] = [];
    columns: any[];
    footerData: any[][] = [];
	dataSize:any;
    // ============================================
    // Presentation de datasource
    // ============================================
    displayedColumns: string[] = ["num", "nom", "nomPresident", "fax", "dateCreation", "email", "adresseLocal", "typeActiviteAssociation", "annexeAdministratif", "datePvChangementBureau", "actions"];
    // ============================================
    // Declarations
    // ============================================
    dataSource = new MatTableDataSource<any>();
    isLoadingResults = true;
    isLoading = true;
	page: Page<any> = new Page();
    sizeData
    // ============================================
    // Controles pagination
    // ============================================
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    // ============================================
    // Constructeur
    // ============================================
    constructor(		private paginationService: CustomPaginationService,
        private associationService: AssociationService, private service2: ConventionService, private translate: TranslateService, private router: Router, private notification: NotificationService, private fileService: FilesUtilsService, private spinnerService: SpinnerService, private datePipe: DatePipe, private excelService: ExcelAssociationService) {
        this.getAssociation();
    }

    ngOnInit() {
        this.paginationService.currentMessage.subscribe((message) => {
			this.page = message;
		});
        this.columns = ["رقم", "الإسم الكامل", "إسم الرئيس", "مجال الإشتغال", "عنوان المقر", "الملحقة", "الهاتف", "تاريخ التأسيس", "آخرتجديد للمكتب", "إنتهاء صلاحية المكتب", "البريد الإلكتروني"];
    }
    ngOnDestroy() {
		this.paginationService.updateMessage(this.page);
		// localStorage.setItem('page',JSON.stringify(this.page))
	}
    // ============================================
    // Recuperer tous les association
    // ============================================
    public getAssociation() {
        this.isLoading = true;
        var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
        
        this.associationService
            // .getAllAssociationByPage("/association/page", this.page.pageable)
            .findByMotCle(this.page.pageable,this.motCle)
            .pipe(
                finalize(() => {
                    this.spinnerService.stop(spinnerRef); // stop spinner
                })
            )
            .subscribe(
                (data:any) => {
                    this.isLoading = false;
                    this.page = data;
                    this.dataSource.data = this.page.content;
                    this.sizeData = data.totalElements;
                    //console.log('Liste Ass : ' + JSON.stringify(data, null, 2))
                    // this.isLoading = false;
                    // this.assoc = data;
                    
                    // for (let i = 0; i < this.assoc.length; i++) {
                    //     this.data.push(this.createDataJson(i));
                    // }
                    //  this.dataSource = new MatTableDataSource(data);

                     this.isLoadingResults = false;
                    // this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
                    // this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
                    // this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
                    // this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
                    // this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
                    // this.dataSource.paginator = this.paginator;
                    // this.dataSource.sort = this.sort;
                },
                (err) => {
                    this.isLoading = false;
                    console.log(err);
                    this.isLoadingResults = false;
                }
            );
    }
	public getNextPage(): void {
        //console.log("Filter : " + this.dataSource.filter)
        
        this.page.pageable = this.paginationService.getNextPage(this.page);
        this.isLoading = true;
        this.getAssociation();
    }

    public getPreviousPage(): void {
        this.page.pageable = this.paginationService.getPreviousPage(this.page);
        this.isLoading = true;
        this.getAssociation();
    }

    public getPageInNewSize(pageSize: number): void {
        
        this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
        this.isLoading = true;
        this.getAssociation();
    }
    // ============================================
    // Filter de recherche
    // ============================================
    motCle=''
    applyFilter(filterValue: string) {
        this.motCle=filterValue;
        this.associationService.findByMotCle(this.page.pageable, this.motCle).subscribe((res:any)=>{

            this.isLoading = false;
            this.page = res;
            this.dataSource.data = this.page.content;
            this.sizeData = res.totalElements;


        })
        // this.dataSource.filter = filterValue.trim().toLowerCase();

        // if (this.dataSource.paginator) {
        //     this.dataSource.paginator.firstPage();
        // }
    }

    // ============================================
    // Methode de suppression des associations
    // ============================================
    deleteAssociation(id: number): void {
        Swal.fire({
            title: "هل تريد مسح هذه الجمعية ؟",
            icon: "question",
            iconHtml: "؟",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: "نعم",
            cancelButtonText: "لا",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.associationService.deleteObject("/association/delete/", id).subscribe((data) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.getAssociation();
                });
                this.associationService.deletefiles("/PjAssociation/ByIdAssociation/", id).subscribe((data) => {
                    console.log("File deleted : " + id);
                });
            }
        });
    }

	// ============================================
	// Methode d'insertion des associations
	// ============================================
	addAssociation(): void {
		this.router.navigate(["associations/add-association"]);
	}
	// ============================================
	// Export data as excel
	// ============================================
	exportTable() {
		//this.fileService.exportToExcel("exportData", this.translate.instant("PAGES.ASSOCIATION.TITRE_INDEX"));
		console.log(this.data);
		this.excelService.exportAsExcelFile2("لائحة الجمعيات", "", this.columns, this.data, this.footerData, "Liste-association", this.translate.instant("PAGES.ASSOCIATION.TITRE_INDEX"));
	}
	createDataJson(i: number): excelData {
		return {
			id: this.assoc[i].id,
			nom: this.assoc[i].nom,
			nomPresident: this.assoc[i].nomPresident,
			typeActiviteAssociation: this.assoc[i].typeActiviteAssociation,
			adresseLocal: this.assoc[i].typeOrigine,
			annexeAdministratif: this.assoc[i].annexeAdministratif,
			fax: this.assoc[i].fax,
			dateCreation: this.datePipe.transform(this.assoc[i].dateCreation, "dd-MM-yyyy"),
			datePvChangementBureau: this.datePipe.transform(this.assoc[i].datePvChangementBureau, "dd-MM-yyyy"),
			dateFinMandat: this.datePipe.transform(this.assoc[i].dateFinMandat, "dd-MM-yyyy"),
			email: this.assoc[i].email,
		};
	}
}
export interface excelData {
    id: string;
    nom: string;
    nomPresident: String;
    typeActiviteAssociation: string;
    adresseLocal: string;
    annexeAdministratif: string;
    fax: string;
    dateCreation: string;
    datePvChangementBureau: string;
    dateFinMandat: string;
    email: string;
}