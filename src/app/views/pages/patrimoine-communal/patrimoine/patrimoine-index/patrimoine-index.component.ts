import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PatrimoineService } from '../../services/patrimoine.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import Swal from 'sweetalert2';
import { SpinnerService } from '../../../utils/spinner.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'kt-patrimoine-index',
  templateUrl: './patrimoine-index.component.html',
  styleUrls: ['./patrimoine-index.component.scss']
})
export class PatrimoineIndexComponent implements OnInit {
  // ============================================================
  // 
  // ============================================================
  displayedColumns: string[] = ['naturePAtrimoine', 'dateEnregistrement', 'type', 'arrondissement', 'typeSpecialite', 'superficie', 'dateEnreCF', 'actions'];
  // ============================================================
  // 
  // ============================================================
  counter: number = 0;
  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ============================================================
  // 
  // ============================================================
  constructor(
    private service: PatrimoineService,
    private translate: TranslateService,
    private router: Router,
    private spinnerService: SpinnerService,
  ) { this.getPatrimoine(); }
  // ============================================================
  // 
  // ============================================================
  ngOnInit() {
  }
  // ============================================================
  // 
  // ============================================================
  async getPatrimoine() {
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
    await this.service.getPatrimoines()
      .pipe(finalize(() => {
        this.spinnerService.stop(spinnerRef);// stop spinner
      })) 
      .subscribe(data => { 
        console.log("patrimoine : " + JSON.stringify(data, null, 2))
        this.dataSource = new MatTableDataSource(data[0]);
        this.counter = data[0].length;
        this.isLoadingResults = false;
        this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


  dataPaginator(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.counter = data.length;
    this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    this.isLoadingResults = false;
  }
  // ============================================================
  // 
  // ============================================================
  delete(id: number): void {
    Swal.fire({
      title: this.translate.instant("PAGES.GENERAL.MSG_DELETED"),
      icon: 'question',
      iconHtml: '؟',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: this.translate.instant("PAGES.BUREAU_ORDRE.BOOLEAN_YES"),
      cancelButtonText: this.translate.instant("PAGES.BUREAU_ORDRE.BOOLEAN_NO"),
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service
          .deletePatrimoine(id)
          .subscribe((data) => {
            this.getPatrimoine();
          });
      }
    })
  }
  // ============================================================
  // 
  // ============================================================
  show(id) {
    this.router.navigate(['/patrimoine/patrimoine-show'], { queryParams: { id: id } })
    localStorage.setItem('idPatrimoine2', JSON.stringify(id));
  }
  // ============================================================
  // 
  // ============================================================
  update(id) {
    this.router.navigate(['/patrimoine/patrimoine-edit'], { queryParams: { id: id } })
    localStorage.setItem('idPatrimoine', JSON.stringify(id));
    localStorage.removeItem('idPatrimoine2');
    localStorage.removeItem('idPatrimoine11122');
    localStorage.removeItem('idPatrimoine11133');
  }

  addNew(){
    this.router.navigate(['/patrimoine/patrimoine-new'])
    localStorage.removeItem('idPatrimoine11122');
    localStorage.removeItem('idPatrimoine11133');
  }
  // ============================================================
  // 
  // ============================================================
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      console.log(this.dataSource.paginator)
    }
  }

}
