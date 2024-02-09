import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { BoServiceService } from "../../../utils/bo-service.service";
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';

// Ar lang
import { registerLocaleData, DatePipe } from '@angular/common';
import localeAr from '@angular/common/locales/ar-MA';
import { Page } from "../../../utils/pagination/page";
import { CustomPaginationService } from '../../../utils/pagination/services/custom-pagination.service';
import { Pageable } from '../../../utils/pagination/pageable';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpinnerService } from '../../../utils/spinner.service';
import { finalize } from 'rxjs/operators';
registerLocaleData(localeAr, 'ar');

@Component({
  selector: 'kt-search-courriers-entrants',
  templateUrl: './search-courriers-entrants.component.html',
  styleUrls: ['./search-courriers-entrants.component.scss']
})
export class SearchCourriersEntrantsComponent implements OnInit {

  // ============================================
  // Presentation de datasource
  // ============================================
  displayedColumns: string[] = [
    "numero",
    "objet",
    "dateReception",
    "criticiteEntr",
    "typeOrigine",
    'origineCourierEntrant',
    "statut",
    "actions",
  ];
  // ============================================
  // Declarations
  // ============================================
  referenceOrigin: string = "";
  dateEmissionOrigin: any;
  divisionLibelle;
  serviceLibelle;
  page: Page<any> = new Page();
  dataSource = new MatTableDataSource<any>();
  courrier = [];
  type: any;
  now: any;
  start: any;
  diff: any;
  oneDay: any;
  day: any;
  reference: any;
  isLoading = false;
  isLoading2 = true;
  searchForm: FormGroup;
  dataSourceSize = 0;
  valOut: any;
  // ============================================
  // Controles pagination
  // ============================================
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('inputFile', { static: true }) inputFile: ElementRef;
  // ============================================
  // Constructeur
  // ============================================
  constructor(
    private service: BoServiceService,
    private router: Router,
    private translate: TranslateService,
    private notification: NotificationService,
    private paginationService: CustomPaginationService,
    // private SpinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private spinnerService: SpinnerService,
  ) {
    // this.getCourriersEntrants();
  }
  // ============================================
  // ngOninit
  // ============================================
  ngOnInit() {
    this.searchForm = this.fb.group({
      refOrigine: [""],
      dateEmissionOrigine: [null],
      // dateFin: [""],
    });

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
    this.referenceOrigin = this.searchForm.get("refOrigine").value;
    var dt = this.searchForm.get("dateEmissionOrigine").value;

    if (dt == null) {
      this.dateEmissionOrigin = ""
    } else {
      this.dateEmissionOrigin = this.datePipe.transform(dt ? dt : '', "yyyy-MM-dd");
    }
    console.log(" PARAM : " + this.referenceOrigin + " | " + this.dateEmissionOrigin)
    if (this.referenceOrigin != "" || this.dateEmissionOrigin != "")
      this.getFilterData(this.referenceOrigin, this.dateEmissionOrigin);
  }
  // ============================================
  // Recuperer tous les courriers entrants
  // ============================================
  private getCourriersEntrants() {
    // setTimeout(() => { this.SpinnerService.show() }, 25);
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
    this.service
      .getAllObjectByPage("/courrierEntrants/index", this.page.pageable)
      .pipe(finalize(() => {
        this.spinnerService.stop(spinnerRef);// stop spinner
      }))
      .subscribe((data) => {
        this.page = data;
        this.isLoading = false;
        this.dataSourceSize = data.size;
        this.dataSource.data = this.page.content;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // setTimeout(() => { this.SpinnerService.hide() }, 500);
      },
        (err) => {
          // setTimeout(() => { this.SpinnerService.hide() }, 500);
          this.isLoading = false;
          console.log(err);
        });
  }
  // ============================================
  // Navigation
  // ============================================
  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.isLoading = true;
    this.getFilterData(this.referenceOrigin, this.dateEmissionOrigin);
  }
  // ============================================
  // 
  // ============================================
  reset() {
    //this.dataSource.data = [];
    this.searchForm.reset();
  }
  // ============================================
  // 
  // ============================================
  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.isLoading = true;
    this.getFilterData(this.referenceOrigin, this.dateEmissionOrigin);
  }
  // ============================================
  // 
  // ============================================
  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.isLoading = true;
    this.getFilterData(this.referenceOrigin, this.dateEmissionOrigin);
  }
  // ============================================
  // 
  // ============================================
  public updateProjectsList(): void {
    this.dataSource.filter = '';
    this.inputFile.nativeElement.value = '';
    this.getCourriersEntrants();
    this.page.pageable.pageNumber = Pageable.FIRST_PAGE_NUMBER;
  }
  // ============================================
  // Methode de suppression des courrier entrants
  // ============================================
  deleteCourrierEntrant(id: number): void {
    Swal.fire({
      title: 'هل تريد مسح هذه المراسلة ؟',
      icon: 'question',
      iconHtml: '؟',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service
          .deleteObject("/destinataireCouriers/deleteByIdCourrier/", id)
          .subscribe(data => {
            console.log("Destinataire Deleted  : " + id);
          });
        this.service
          .deleteObject("/courrierEntrants/delete/", id)
          .subscribe(data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
              showConfirmButton: false,
              timer: 1500
            })
            this.getCourriersEntrants();
          });
        this.service
          .deletefiles("/PjCourriersEntrants/ByIdCourriersEntrants/", id)
          .subscribe(data => {
            console.log("File courrier deleted : " + id);
          });
      }
    })
  }
  // ============================================
  // Methode de modification des courriers entrants
  // ============================================
  editCourrierEntrant(courrier: any): void {
    window.localStorage.removeItem("courrId");
    window.localStorage.setItem("courrId", courrier.id.toString());
    this.router.navigate(["courriers-entrants/edit-courriers-entrants"]);
  }
  // ============================================
  // Methode d'insertion des courriers entrants
  // ============================================
  addCourrierEntrant(): void {
    this.router.navigate(["add-courrier-entrant"]);
  }
  // ============================================
  // Details courriers
  // ============================================
  detailsCourrierEntrant(courrier: any): void {
    window.localStorage.removeItem("courrId");
    window.localStorage.setItem("courrId", courrier.id.toString());
    this.router.navigate(["courriers-entrants/courriers-entrants-show"]);
  }
  // ============================================
  // Destinataire courrier details
  // ============================================
  destinataireCourrierEntrant(courrier: any): void {
    window.localStorage.removeItem("courrId");
    window.localStorage.setItem("courrId", courrier.id.toString());
    this.router.navigate(["destinataire-courrier/add-destinataire-courrier"]);
  }
  // ============================================
  // Filter datasource
  // ============================================
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(" MSG : " + this.dataSource.filter)
    // this.getFilterData(this.dataSource.filter);
  }
  // ============================================
  // Filter 
  // ============================================
  getFilterData(ref, dt): void {
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
    this.service
      .filterByRefOrDatePage("/courrierEntrants/search", ref, dt, this.page.pageable)
      .pipe(finalize(() => {
        this.spinnerService.stop(spinnerRef);// stop spinner
      }))
      .subscribe((data) => {
        this.page = data;
        this.dataSourceSize = data.totalElements;
        //console.log(" DATA : " + JSON.stringify(this.page, null, 2))
        this.dataSource.data = this.page.content;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // setTimeout(() => { this.SpinnerService.hide() }, 500);
        this.isLoading = false;

      },
        (err) => {
          // setTimeout(() => { this.SpinnerService.hide() }, 500);
          this.isLoading = false;
          this.dataSourceSize = 0;
          console.log(err);
        });
  }
  // ============================================
  // Methode refresh
  // ============================================
  refresh() {
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
    this.service
      .getAllObject("/courrierEntrants/index")
      .pipe(finalize(() => {
        this.spinnerService.stop(spinnerRef);// stop spinner
      }))
      .subscribe((data) => {
        this.courrier = data;
      });
  }
  // ============================================
  //
  // ============================================
  getNumeroCourrier(): string {
    this.now = new Date();
    this.start = new Date(this.now.getFullYear(), 0, 0);
    this.diff = this.now - this.start;
    this.oneDay = 1000 * 60 * 60 * 24;
    this.day = Math.floor(this.diff / this.oneDay);
    console.log("Day of year" + this.day);
    return new Date().getFullYear() + "-" + this.day;
  }
  // ============================================
  // Ajouter un nouveau courrier avec un numéro enérique
  // ============================================
  addNewCourrierEntrant() {
    this.router.navigate(["courriers-entrants/add-courriers-entrants"]);
  }
  // ============================================
  // Export data as excel
  // ============================================
  exportTable() {
    this.service.exportToExcel("exportData", this.translate.instant("PAGES.BUREAU_ORDRE.COURRIER_ENTRANT.TITRE_INDEX"));
  }

}
