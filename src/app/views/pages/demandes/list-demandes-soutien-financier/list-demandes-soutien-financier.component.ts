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
import { StatusFinancierDialogComponent } from '../status-financier-dialog/status-financier-dialog.component';

export interface DemandesTabs {
  label: string;
  content: string;
}
@Component({
  selector: 'kt-list-demandes-soutien-financier',
  templateUrl: './list-demandes-soutien-financier.component.html',
  styleUrls: ['./list-demandes-soutien-financier.component.scss']
})
export class ListDemandesSoutienFinancierComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //tabs 
  asyncTabs: Observable<DemandesTabs[]>;
  selected = new FormControl(0);

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
  statusSelected: string;
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
          ]);
        }, 300);
      }
    );


  }
  openDialog(row: any): void {
    const dialogRef = this.dialog.open(StatusFinancierDialogComponent, {
      width: '250px',
      data: row,
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload the component
      // this.getDemandes();
      // this.getDemandes();
      this.applyFilterByStatus(this.statusSelected);
    });
  }
  setSelectedValue(event: any) {
    if (event == 0) {
      this.statusSelected = "EN_COURS";
      this.applyFilterByStatus(this.statusSelected);
    }
    else if (event == 1) {
      this.statusSelected = "ACCEPTEE";
      this.applyFilterByStatus(this.statusSelected);
    } else if (event == 2) {
      this.statusSelected = "REFUSEE";
      this.applyFilterByStatus(this.statusSelected);
    }
    console.log("statusSelected", this.statusSelected);
  }
  applyFilterByStatus(status: string) {
    this.statusSelected = status;
    this.demandeService.getDemandesSoutienFinancierByStatus(this.page.pageable, this.statusSelected).subscribe((res: any) => {
      this.isLoading = false;
      this.page = res;
      this.dataSource.data = this.page.content;
      this.sizeData = res.totalElements;
    })
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  public getNextPage(): void {
    //console.log("Filter : " + this.dataSource.filter)
    console.log("Page : " + this.page.pageable.pageNumber)
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.isLoading = true;
    this.applyFilterByStatus(this.statusSelected);
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.isLoading = true;
    this.applyFilterByStatus(this.statusSelected);
  }

  public getPageInNewSize(pageSize: number): void {

    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.isLoading = true;
    this.applyFilterByStatus(this.statusSelected);
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
