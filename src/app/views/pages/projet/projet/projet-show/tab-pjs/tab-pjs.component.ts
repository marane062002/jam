import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { ProjetService } from '../../../services/projet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'kt-tab-pjs',
  templateUrl: './tab-pjs.component.html',
  styleUrls: ['./tab-pjs.component.scss']
})
export class TabPjsComponent implements OnInit {
  // ============================================================
  // 
  // ============================================================
  pjs;
  isLoading = true;
  files: Observable<any>;
  start: boolean = true;

  id: number;
  displayedColumns: string[] = ['id', 'nom', 'type', 'download'];
  docs = [{ 'type': 'DEC', 'libelle': 'قرار' }, { 'type': 'ACT', 'libelle': 'عقد إجار' }, { 'type': 'REC', 'libelle': 'إصال الأداء' }, { 'type': 'DOC', 'libelle': 'وثيقة' }];
  dataSource: MatTableDataSource<any>;
  isLoadingResults = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ============================================================
  // 
  // ============================================================
  constructor(private service: ProjetService,
    private translate: TranslateService,
    private router: Router, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    setTimeout(() => {
      if (this.id != null)
        this.files = this.service.getFilesById(this.id, '/PjProjets/allById/');
      this.start = false;
    }, 1000);

    //this.getPjs(this.id)
  }
  // ============================================================
  // get file name
  // ============================================================
  FileName(file) {
    return this.service.getFileName(file);
  }
  // ============================================================
  // get file extension & icons
  // ============================================================
  FileExtension(file) {
    return this.service.getExtensionFile(file);
  }
  // ============================================================
  // 
  // ============================================================
  ngOnInit() {

  }
  // ============================================================
  // 
  // ============================================================
  /*
  getPjs(id) {
    console.log(id)
    this.service.getFilesById(id, '/PjProjets/allById/')
      .then(data => {
        this.dataSource = new MatTableDataSource(data);
        this.isLoadingResults = false;
        this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
        this.paginator._intl.nextPageLabel = 'الصفحة التالية';
        this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
        this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
        this.paginator._intl.firstPageLabel = "الصفحة الأولى";
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
        error => console.log(error))
  }
  */
  // ============================================================
  // 
  // ============================================================
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // ============================================================
  // 
  // ============================================================
  findLibelleType(type) {
    const resultat = this.docs.find(doc => doc.type === type);
    return resultat
  }
  // ============================================================
  // 
  // ============================================================
  onClickPjName(e, id) {
    //console.log('You clicked: '+e) ;
    var r = e.substring(0, e.length - 4);
    window.open(environment.API_ALFRESCO_URL + '/PjProjets/' + r);
  }
}
