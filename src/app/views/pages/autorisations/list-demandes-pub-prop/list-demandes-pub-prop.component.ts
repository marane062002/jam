import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, Observer } from 'rxjs';
import { Page } from '../../utils/pagination/page';
import { SpinnerService } from '../../utils/spinner.service';
import { DatePipe } from '@angular/common';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { NotificationService } from '../../shared/notification.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CustomPaginationService } from '../../utils/pagination/services/custom-pagination.service';
import { DemandesService } from '../../utils/demandes.service';
import { StatusChangeDialogComponent } from '../status-change-dialog/status-change-dialog.component';



export interface DemandesTabs {
  label: string;
  content: string;
}
@Component({
  selector: 'kt-list-demandes-pub-prop',
  templateUrl: './list-demandes-pub-prop.component.html',
  styleUrls: ['./list-demandes-pub-prop.component.scss']
})
export class ListDemandesPubPropComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //tabs 
  asyncTabs: Observable<DemandesTabs[]>;
  selected = new FormControl(0);
  selected2 = new FormControl(0);
  asyncTabs2: Observable<DemandesTabs[]>;
  typeSelected: string = "PPSource";
  statusSelected: string = "EN_COURS";
  // ============================================
  demandes: any;
  columns: any[];
  footerData: any[][] = [];
  dataSize: any;

  // ============================================
  // Presentation de datasource
  // ============================================
  // displayedColumns: string[] = ["uniqueCode", "submissionDate", "status", "prioriter", "associationId", "licenseType", "dateOrganisation", "typeActivite", "actions"];
  displayedColumns: string[] = ["uniqueCode", "cin", "nomPP", "prenomPP", "submissionDate", "status", "action", "actions"];
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
              label: "PAGES.DEMANDE.PPSOURCE",
              content: "PPSource"
            },
            {
              label: "PAGES.DEMANDE.PERSONNE_MORALE_PRIVE",
              content: "PMSourcePRIV",

            },

          ]);
        }, 300);
      }
    );

  }
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
      this.typeSelected = "PPSource";
      this.displayedColumns = ["uniqueCode", "cin", "nomPP", "prenomPP", "submissionDate", "status", "action", "actions"];
      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
      // this.applyFilterByStatus(this.statusSelected);
    }
    else if (event == 1) {
      this.typeSelected = "PMSourcePRIV";
      this.displayedColumns = ["uniqueCode", "nomPM", "rc", "identifiantFiscal", "submissionDate", "status", "action", "actions"];
      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
      // this.applyFilterByStatus(this.statusSelected);
    }
    console.log("type selected", this.statusSelected);
  }
  applyFilterByStatusAndType(status: string, type: string) {
    this.statusSelected = status;
    this.typeSelected = type;
    this.demandeService.getDemandesPubPropByStatusAndDemandeType(this.page.pageable, this.statusSelected, this.typeSelected).subscribe((res: any) => {

      this.isLoading = false;
      this.page = res;
      this.dataSource.data = this.page.content;
      this.sizeData = res.totalElements;
    })
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  openDialog(row: any): void {
    const dialogRef = this.dialog.open(StatusChangeDialogComponent, {
      width: '250px',
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {

      this.applyFilterByStatusAndType(this.statusSelected, this.typeSelected);
    });
  }
  public getNextPage(): void {
    //console.log("Filter : " + this.dataSource.filter)
    console.log("Page : " + this.page.pageable.pageNumber)
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.isLoading = true;
    //this.getDemandes();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.isLoading = true;
    //this.getDemandes();
  }

  public getPageInNewSize(pageSize: number): void {

    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.isLoading = true;
    //this.getDemandes();
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
