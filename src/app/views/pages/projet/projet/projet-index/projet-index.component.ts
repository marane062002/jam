import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ProjetService } from '../../services/projet.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'kt-projet-index',
  templateUrl: './projet-index.component.html',
  styleUrls: ['./projet-index.component.scss']
})
export class ProjetIndexComponent implements OnInit {

  displayedColumns: string[] = ['numeroMarche', 'designation', 'budgetProjet', 'dateDebutPrevue', 'dateFinPrevue', 'actions'];


  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private service: ProjetService,
    private translate: TranslateService,
    private notification: NotificationService,
    private router: Router) { this.getProjet(); }



  ngOnInit() {


  }

  public getProjet() {
    this.service.getProjets()
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

  public delete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteProjet(id)
        .subscribe(
          data => {
            console.log(data),
              //          this.router.navigateByUrl('projet/projet-index')
              this.getProjet();
          },
          error => console.log(error));
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }

  }

  /*
    public projetDelete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteProjet(id)
      .subscribe(
        data => {
          console.log(data),
//          this.router.navigateByUrl('projet-projet-index') 
          this.getProjet();
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }
  */

  updateFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(id) {
    this.router.navigate(['/projet/projet-edit'], { queryParams: { id: id } })
  }

  show(id) {
    this.router.navigate(['/projet/projet-show'], { queryParams: { id: id } })
  }


  
  generateOrdreServiceSuivi(id) {
    this.service.generateOrdreServiceSuivi(id).subscribe(data => {
      const file: any = new Blob([data as unknown as BlobPart], {
        type: "application/pdf",
      });
      const readfile = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.download = "OrdreServiceSuivi.docx";
      link.href = readfile;
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      setTimeout(() => {
        window.URL.revokeObjectURL(file);
        link.remove();
      }, 100);
      console.log("OrdreServiceSuivi generated !! " )
     
 
    },
      (err) => {
        console.log(err);
      });
  }
}
