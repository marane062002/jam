import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AssociationService } from '../../utils/association.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { delay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'kt-mandat-filter',
  templateUrl: './mandat-filter.component.html',
  styleUrls: ['./mandat-filter.component.scss']
})
export class MandatFilterComponent implements OnInit {
  // ============================================
  // Presentation de datasource
  // ============================================
  displayedColumns: string[] = [
    "num",
    "nom",
    "nomPresident",
    "fax",
    "dateCreation",
    "email",
    "adresseLocal",
    "typeActiviteAssociation",
    "annexeAdministratif",
    "datePvChangementBureau",
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
  statuts: any;
  typeActivites: any;

  originalListAssociations: any[];
  // ============================================
  // Controles pagination
  // ============================================
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ============================================
  // Constructeur
  // ============================================
  constructor(
    private associationService: AssociationService,
    private service: AssociationService,
    private translate: TranslateService,
    private router: Router,
    private notification: NotificationService,
    private fileService: FilesUtilsService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.getAssociation();
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      type: ["", Validators.required],
      statut: ["", Validators.required],
    });
    this.getData();
  }

  getData() {
    this.service.getData().subscribe(
      (data) => {
        this.statuts = data[0];
        this.typeActivites = data[1];
        //this.annexesAdmin = data[3];
        console.log(data[1]);
      },
      (err) => {
        console.log(err);
      });

  }

  refresh() {
    this.searchForm = this.fb.group({
      type: ["", Validators.required],
      statut: ["", Validators.required],
    });
    this.dataSource = new MatTableDataSource(this.originalListAssociations);
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
  }


  // ============================================
  // Recuperer tous les association
  // ============================================
  public getAssociation() {
    this.isLoading = true;
    const _this = this;
    this.associationService
      .getRessource("/association/index2")
      .pipe(delay(300))
      .subscribe(
        (data) => {
          this.originalListAssociations = data;
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

    var type = this.searchForm.get("type").value;
    var statut = this.searchForm.get("statut").value;
    this.isLoading = true;
    this.dataSource=new MatTableDataSource(null)
    this.associationService.getAssociationbytypeAndSttatus(this.listTypeActivite, statut).pipe(delay(300)).subscribe(data => {
      console.log(data)
      const _this = this;
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
    }, (err) => {
      this.isLoading = false;
      console.log(err);
      this.isLoadingResults = false;
    })
    //dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
    //dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");

    /* console.log("date D ::"+ dateDebut + " " + "date F ::"+ dateFin)

    this.isLoading = true;
    const _this = this;
    this.associationService.getMondatBureauBetweenDates(dateDebut, dateFin)
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
      ); */
  }

  listTypeActivite=[];
  selectedOptionsTA: string[] = [];
  addTypeActivite(event: any) {
		if (event[0] == 'ALL') {
      for(let i=0;i<this.typeActivites.length;i++){
			this.listTypeActivite .push(this.typeActivites[i].id);
      }
			this.selectedOptionsTA = this.listTypeActivite.concat(event[0]);
			event[0] = [];
		}
		else if (event.length == this.typeActivites.length) {
			this.listTypeActivite = [];
			this.selectedOptionsTA = [];
		}
		else {
			this.listTypeActivite = event;
			this.selectedOptionsTA = event;
		}
	}
}
