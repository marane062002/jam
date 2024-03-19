import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from '../../utils/pagination/page';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DemandesService } from '../../utils/demandes.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { SpinnerService } from '../../utils/spinner.service';
import { DatePipe } from '@angular/common';
import { CustomPaginationService } from '../../utils/pagination/services/custom-pagination.service';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { StatusChangeDialogComponent } from '../status-change-dialog/status-change-dialog.component';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface DemandesTabs {
  label: string;
  content: string;
}
@Component({
  selector: 'kt-list-demandes-licenses',
  templateUrl: './list-demandes-licenses.component.html',
  styleUrls: ['./list-demandes-licenses.component.scss']
})
export class ListDemandesLicensesComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //tabs 
  asyncTabs: Observable<DemandesTabs[]>;
  selected = new FormControl(0);
  selected2= new FormControl(0);
  asyncTabs2: Observable<DemandesTabs[]>;
  typeSelected: string="ASSOCIATION";
  statusSelected: string="EN_COURS";

  // ============================================
  demandes: any;
  columns: any[];
  footerData: any[][] = [];
  dataSize: any;
  // ============================================
  // Presentation de datasource
  // ============================================
  // displayedColumns: string[] = ["uniqueCode", "submissionDate", "status", "prioriter", "associationId", "licenseType", "dateOrganisation", "typeActivite", "actions"];
  displayedColumns: string[] = ["prioriter", "nom", "uniqueCode", "submissionDate", "status", "action", "actions"];
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

  // ============================================
  // Constructeur
  // ============================================
  constructor(private paginationService: CustomPaginationService, public dialog: MatDialog,
    private demandeService: DemandesService, private translate: TranslateService, private router: Router, private notification: NotificationService, private fileService: FilesUtilsService, private spinnerService: SpinnerService, private datePipe: DatePipe) {
    this.asyncTabs = new Observable(
      (observer: Observer<DemandesTabs[]>) => {
        setTimeout(() => {
          observer.next([
            {
              label: "PAGES.DEMANDE.ENCOURS",
              content: "EN_COURS",

            },
            {
              label: "PAGES.DEMANDE.Accept",
              content: "ACCEPTEE"
            },
            {
              label: "PAGES.DEMANDE.REFUSE",
              content: "REFUSEE"
            },
            // {
            //   label: "PAGES.DEMANDE.cancel",
            //   content: "4"
            // },
          ]);
        }, 300);
      }
    );

    this.asyncTabs2 = new Observable(
      (observer: Observer<DemandesTabs[]>) => {
        setTimeout(() => {
          observer.next([
            {
              label: "PAGES.DEMANDE.ASSOCIATION",
              content: "ASSOCIATION",

            },
            {
              label: "PAGES.DEMANDE.PERSONNE_MORALE",
              content: "PMSource"
            },
            {
              label: "PAGES.DEMANDE.PERSONNE_MORALE_PRIVE",
              content: "PMSourcePRIV",

            },
            {
              label: "PAGES.DEMANDE.PPSOURCE",
              content: "PPSource"
            },
           
          ]);
        }, 300);
      }
    );

    //this.getDemandes();
  }
  getDemandes() {
    this.isLoading = true;
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
    this.demandeService.getAllDemandesByPage('/demande/getAllLicenseDemandesPageable', this.page.pageable)
      .pipe(
        finalize(() => {
          this.spinnerService.stop(spinnerRef); // stop spinner
        })
      )
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this.page = data;
          this.dataSource.data = this.page.content;
          this.sizeData = data.totalElements;
          this.isLoadingResults = false;
        },
        (err) => {
          this.isLoading = false;
          console.log(err);
          this.isLoadingResults = false;

        });

  }
  openDialog(row: any): void {
    const dialogRef = this.dialog.open(StatusChangeDialogComponent, {
      width: '250px',
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload the component
      // this.getDemandes();
      // this.getDemandes();
     // this.applyFilterByStatus(this.statusSelected);
     this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
    });
  }
  // ============================================
  // Filter by Status
  //=============================================
  setSelectedValue(event: any) {
    if (event == 0) {
      this.statusSelected = "EN_COURS";
      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
      // this.applyFilterByStatus(this.statusSelected);
    }
    else if (event == 1) {
      this.statusSelected = "ACCEPTEE";
      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
      // this.applyFilterByStatus(this.statusSelected);
    } else if (event == 2) {
       this.statusSelected = "REFUSEE";
       this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
      // this.applyFilterByStatus(this.statusSelected);
    }
    console.log("statusSelected", this.statusSelected);
  }
  setSelectedValue2(event: any) {
    if (event == 0) {
      this.typeSelected = "ASSOCIATION";
      this.displayedColumns= ["prioriter","nom", "uniqueCode", "submissionDate", "status", "action", "actions"];
      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
      // this.applyFilterByStatus(this.statusSelected);
    }
    else if (event == 1) {
      this.typeSelected = "PMSource";
      this.displayedColumns= [ "uniqueCode", "nomPM", "rc", "identifiantFiscal", "submissionDate", "status", "action", "actions"];
      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
      // this.applyFilterByStatus(this.statusSelected);
    }else if(event==2){
      this.typeSelected = "PMSourcePRIV";
      this.displayedColumns= [ "uniqueCode", "nomPM", "rc", "identifiantFiscal", "submissionDate", "status", "action", "actions"];
      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
    }
    else if(event==3){
      this.typeSelected = "PPSource";
      this.displayedColumns= [ "uniqueCode", "cin", "nomPP","prenomPP","submissionDate", "status", "action", "actions"];
      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
    }
    console.log("type selected", this.statusSelected);
  }
  applyFilterByStatus(status: string) {
    this.statusSelected = status;
    this.demandeService.getDemandesByStatus(this.page.pageable, this.statusSelected).subscribe((res: any) => {
      this.isLoading = false;
      this.page = res;
      this.dataSource.data = this.page.content;
      this.sizeData = res.totalElements;
    })
  }
  applyFilterByStatusAndType(status: string, type: string) {
    this.statusSelected = status;
    this.typeSelected = type;
    this.demandeService.getDemandeLicenseByStatusAndDemandeType(this.page.pageable, this.statusSelected, this.typeSelected).subscribe((res: any) => {

      this.isLoading = false;
      this.page = res;
      this.dataSource.data = this.page.content;
      this.sizeData = res.totalElements;
    })
  }
  // ============================================
  // Filter de recherche
  // ============================================
  motCle = ''
  applyFilter(filterValue: string) {
    this.motCle = filterValue;
    this.demandeService.findByMotCle(this.page.pageable, this.motCle).subscribe((res: any) => {

      this.isLoading = false;
      this.page = res;
      this.dataSource.data = this.page.content;
      console.log("res filtering is", this.dataSource.data);
      this.sizeData = res.totalElements;


    })
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //     this.dataSource.paginator.firstPage();
    // }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  public getNextPage(): void {
    //console.log("Filter : " + this.dataSource.filter)
    console.log("Page : " + this.page.pageable.pageNumber)
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.isLoading = true;
    this.getDemandes();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.isLoading = true;
    this.getDemandes();
  }

  public getPageInNewSize(pageSize: number): void {

    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.isLoading = true;
    this.getDemandes();
  }
  getRowButtonColor(status: string): string {
    if (status === 'ACCEPTEE') {
      return 'accent'; 
    } else if (status === 'REFUSEE') {
      return 'warn'; 
    } else {
      return 'primary'; 
    }
  }
}
