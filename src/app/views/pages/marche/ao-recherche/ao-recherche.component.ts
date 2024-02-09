import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'kt-ao-recherche',
  templateUrl: './ao-recherche.component.html',
  styleUrls: ['./ao-recherche.component.scss']
})
export class AoRechercheComponent implements OnInit {
  // ============================================
  // Presentation de datasource
  // ============================================
  displayedColumns: string[] = [
    "numAo",
		"objet",
		"budgetEstimatif",
    "typeMarche",
    "dateOuverturePlis",
		"statutAo",
    "actions",
  ];
  // ============================================
  // Declarations
  // ============================================
  dataSource = new MatTableDataSource<any>();
  isLoadingResults = true;
  isLoading = false;
  datasize = 0;
  searchForm: FormGroup;
  // ============================================
  // Controles pagination
  // ============================================
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ============================================
  // Constructeur
  // ============================================
  constructor(
    private aoService: AoService,
    private translate: TranslateService,
    private router: Router,
    private notification: NotificationService,
    private fileService: FilesUtilsService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    // this.getAssociation();
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      dateDebut: ["", Validators.required],
      dateFin: ["", Validators.required],
    });
  }
  // ============================================
  // Recuperer tous les association
  // ============================================
  public getAo(data: any) {
    this.isLoading = true;
    const _this = this;
    this.aoService
      .getAllAo()
      .then(
        (data) => {
          console.log('Liste Ao : ' + JSON.stringify(data, null, 2))
          this.isLoading = false;
          _this.datasize = data.length
          this.dataSource = new MatTableDataSource(data);
          this.isLoadingResults = false;

          /*
          this.paginator._intl.itemsPerPageLabel = this.translate.instant(
            "PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
          );
          this.paginator._intl.nextPageLabel = this.translate.instant(
            "PAGES.GENERAL.NEXT_PAGE_LABEL"
          );
          this.paginator._intl.previousPageLabel = this.translate.instant(
            "PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
          );
          this.paginator._intl.lastPageLabel = this.translate.instant(
            "PAGES.GENERAL.LAST_PAGE_LABEL"
          );
          this.paginator._intl.firstPageLabel = this.translate.instant(
            "PAGES.GENERAL.FIRST_PAGE_LABEL"
          );
          */
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          this.isLoading = false;
          _this.datasize = 0;
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  // ============================================
  // OnSubmit
  // ============================================
  onSubmit() {
    const controls = this.searchForm.controls;
    /** check form */
    if (this.searchForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    var dateDebut = this.searchForm.get("dateDebut").value;
    var dateFin = this.searchForm.get("dateFin").value;
    //dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
    //dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");

    console.log("date D ::"+ dateDebut + " " + "date F ::"+ dateFin)

    this.isLoading = true;
    const _this = this;
    this.aoService
      .getAoBetweenDates(dateDebut, dateFin)
      .pipe(delay(300))
      .subscribe(
        (data) => {
          console.log('Liste Ass : ' + JSON.stringify(data, null, 2))
          this.isLoading = false;
          _this.datasize = data.length
          this.dataSource = new MatTableDataSource(data);
          this.isLoadingResults = false;
          this.paginator._intl.itemsPerPageLabel = this.translate.instant(
            "PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
          );
          this.paginator._intl.nextPageLabel = this.translate.instant(
            "PAGES.GENERAL.NEXT_PAGE_LABEL"
          );
          this.paginator._intl.previousPageLabel = this.translate.instant(
            "PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
          );
          this.paginator._intl.lastPageLabel = this.translate.instant(
            "PAGES.GENERAL.LAST_PAGE_LABEL"
          );
          this.paginator._intl.firstPageLabel = this.translate.instant(
            "PAGES.GENERAL.FIRST_PAGE_LABEL"
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          this.isLoading = false;
          _this.datasize = 0;
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
	// ====================================================
	//
	//=====================================================
	showao(idAo) {
		this.router.navigate(["/marches/ao-detail"], {
			queryParams: { id: idAo },
		});
	}
}
