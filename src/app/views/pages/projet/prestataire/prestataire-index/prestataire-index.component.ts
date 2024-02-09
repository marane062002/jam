import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProjetService } from '../../services/projet.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import { AoService } from '../../../shared/ao.service';

@Component({
  selector: 'kt-prestataire-index',
  templateUrl: './prestataire-index.component.html',
  styleUrls: ['./prestataire-index.component.scss']
})
export class PrestataireIndexComponent implements OnInit {


  displayedColumns: string[] = ['nom', 'tel', 'mail', 'rc', 'ice', 'idFisc', 'adresse','actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private service: ProjetService,
    private translate: TranslateService,
    private router: Router,
    private notification: NotificationService,
    private serviceMarche: AoService, ) { }


  ngOnInit() {
    this.getPrestataire();

  }

  public getPrestataire() {
    // this.service.getPrestataires()
    this.service.getPrestataires()
      .then(data => {
        this.dataSource = new MatTableDataSource(data);
        this.isLoadingResults = false;
        this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  show(id) {
    this.router.navigate(['/prestataire/prestataire-show'], { queryParams: { id: id } })
  }

  update(id) {
    this.router.navigate(['/prestataire/prestataire-edit'], { queryParams: { id: id } })
  }

  public prestataireDelete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deletePrestataire(id)
        .subscribe(
          data => {
            console.log(data),
              //          this.router.navigateByUrl('prestataire/prestataire-index') 
              this.getPrestataire();
          },
          error => console.log(error));
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }

  }


}
