import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { PatrimoineService } from '../../services/patrimoine.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import Swal from 'sweetalert2';
import { SpinnerService } from '../../../utils/spinner.service';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ExcelServiceService } from '../../../utils/excel-service.service';

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

  formGroup: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ============================================================
  // 
  // ============================================================

  language = localStorage.getItem('language');
  constructor(
    private excelService: ExcelServiceService,
    private service: PatrimoineService,
    private translate: TranslateService,
    private router: Router,
    private spinnerService: SpinnerService,
    private fb: FormBuilder
  ) {
    // this.getPatrimoine();

  }
  // ============================================================
  // 
  // ============================================================
  ngOnInit() {
    this.formGroup = this.fb.group({
      typePropriete: new FormControl(''),
      typeProprieteLibre: new FormControl(''),
      originPatrimoinText: new FormControl(''),
      naturePAtrimoine: new FormControl('')
    });
    this.getAllPatrimoineCommunal();
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

  getAllPatrimoineCommunal() {
    this.service.research(0, 5, this.formGroup.value).subscribe((data: any) => {
      console.log("patrimoine : " + JSON.stringify(data, null, 2))
      this.dataSource = new MatTableDataSource(data.content);
      this.counter = data.totalElements;
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
      this.sizeData = data.totalElements;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  handlePageEvent(event: PageEvent) {
    let pageSize = event.pageSize;
    let pageIndex = event.pageIndex;
    this.service.research(pageIndex, pageSize, this.formGroup.value).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data.content);
      this.counter = data.totalElements;
      this.isLoadingResults = false;
      this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    })
  }

  isSelectedAutre: boolean = false;
  selectedTypePropriete(event: any) {
    if (event == 'Autre') {
      this.isSelectedAutre = true;
    }
    else {
      this.isSelectedAutre = false;
    }
  }

  dataPaginator(data: any) {
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

  addNew() {
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
  sizeData: any = 0;

  onSubmit() {
    this.formGroup.value
    if (this.formGroup.get('typeProprieteLibre').value != '') {
      this.formGroup.get('typePropriete').setValue(this.formGroup.get('typeProprieteLibre').value);
      this.formGroup.get('typeProprieteLibre').reset();
    }
    this.service.research(0, 5, this.formGroup.value).subscribe((res: any) => {
      console.log(res.content);
      this.dataSource.data = res.content;
      this.counter = res.totalElements;
      this.sizeData = res.totalElements;
      this.isLoadingResults = false;
    }, err => {
      this.isLoadingResults = false;
      console.log(err);
    })
  }


  clear() {
    this.ngOnInit();
  }
  footerData: any[][] = [];
  columns: any[] = [];

  exportTable() {
    if (this.language == 'fr') {
      this.service.getPatrimoines()
        .subscribe((res: any) => {
          let data: any[] = res[0];
          let json = data.map((item) => new excelData(item));
          (this.columns = ["Numéro d'enregistrement", "Date d'enregistrement", "classé", "Statut", "Statut du marché", "Genre du patrimoine", "Type patrimoine", "Type de proprièté", "Origine du patrimoine", "Type d’espace vert", "Catégorie de marché", "Type de marché", "Catégorie de voie", "Spécialities ", "Référence fonciére", "Ville ", "Arrondissement", "Adresse", "Superficie", "Prix d'aquisition", "N° d'enregistrement à la conservation foncière ", "Date d'inscription CF"]),
            this.excelService.exportAsExcelPatrimoineCommunalFr("LISTE DU PATRIMOINE COMMUNAL", "", this.columns, json, this.footerData, "LISTE DU PATRIMOINE COMMUNAL", this.translate.instant("MENU.LISTEPATRIMOINES"));


        }, err => {
          console.log(err);
        });
    }
    if (this.language == 'ar') {
      this.service.getPatrimoines()
        .subscribe((res: any) => {
          let data: any[] = res[0];
          let json = data.map((item) => new excelData(item));
          (this.columns = ["رقم التسجيل", "تاريخ التسجيل", "القسم", "مصنف", "الوضعية", "وضعية السوق", "طبيعة الملك", "نوع الملك", "اصل الممتلك", "أصل الملك", "نوع المساحات الخضراء", "فئة السوق", "نوع السوق", "فئة المسار", "التخصيص", "المرجع العقاري", "المدينة", "مقاطعة", "العنوان", "	المساحة", "ثمن الكراء", "رقم الرسم العقاري", "تاريخ تسجيله بإدارة المحافظة"]),
            this.excelService.exportAsExcelPatrimoineCommunalAr("قائمة الممتلكات الجماعية", "", this.columns, json, this.footerData, "قائمة الممتلكات الجماعية", this.translate.instant("MENU.LISTEPATRIMOINES"));


        }, err => {
          console.log(err);
        });
    }
  }

}

export class excelData {
  numEnregistrement: string;
  dateEnregistrement: string;
  classeMarche: string;
  statutMarcheText: string;
  statutMarche: string;
  naturePAtrimoine: string;
  type: string;
  typePropriete: string;
  originPatrimoin: string;
  typeEspaceVert: string;
  categorieMarche: string;
  typeCategorieMarche: string;
  categorieVoies: string;
  typeSpecialite: string;
  refFonciere: string;
  ville: string;
  arrondissement: string;
  adresse: string;
  superficie: string;
  prixAquisition: string;
  numEnregistrementCF: string;
  dateEnreCF: string;
  constructor(item: any) {
    if (item.numEnregistrement != null) {
      this.numEnregistrement = item.numEnregistrement;
    }
    else {
      this.numEnregistrement = '-';
    }

    if (item.dateEnregistrement != null) {
      this.dateEnregistrement = item.dateEnregistrement;
    }
    else {
      this.dateEnregistrement = '-';
    }

    if (item.classeMarche != null) {
      this.classeMarche = item.classeMarche;
    }
    else {
      this.classeMarche = '-';
    }

    if (item.statutMarche != null) {
      if (item.statutMarche === '1') {
        this.statutMarcheText = 'Immatriculé';
      }
      if (item.statutMarche === '2') {
        this.statutMarcheText = 'Non immatriculé';
      }
      if (item.statutMarche === '3') {
        this.statutMarcheText = 'En cours d’immatriculation';
      }
    }
    else {
      this.statutMarcheText = '-';
    }

    if (item.statutMarche != null) {
      this.statutMarche = item.statutMarche;
    }
    else {
      this.statutMarche = '-';
    }

    if (item.naturePAtrimoine != null) {
      this.naturePAtrimoine = item.naturePAtrimoine;
    }
    else {
      this.naturePAtrimoine = '-';
    }

    if (item.type != null) {
      this.type = item.type.libelle;
    }
    else {
      this.type = '-';
    }

    if (item.typePropriete != null) {
      this.typePropriete = item.typePropriete;
    }
    else {
      this.typePropriete = '-';
    }

    if (item.originPatrimoin != null) {
      this.originPatrimoin = item.originPatrimoin;
    }
    else {
      this.originPatrimoin = '-';
    }

    if (item.typeEspaceVert != null) {
      this.typeEspaceVert = item.typeEspaceVert;
    }
    else {
      this.typeEspaceVert = '-';
    }

    if (item.categorieMarche != null) {
      if (item.categorieMarche === 'MARCHEGROS') {
        this.categorieMarche = 'Marché de gros';
      }
      if (item.categorieMarche === 'MARCHEPRES') {
        this.categorieMarche = 'Marché de prés';
      }
      if (item.categorieMarche === 'MARCHEAUTRE') {
        this.categorieMarche = 'Autres marchés';
      }
    }
    else {
      this.categorieMarche = '-';
    }

    if (item.typeCategorieMarche != null) {
      if (item.typeCategorieMarche === '1') {
        this.typeCategorieMarche = 'السمك';
      }
      if (item.typeCategorieMarche === '2') {
        this.typeCategorieMarche = 'الخضر والفواكه';
      }
      if (item.typeCategorieMarche === '3') {
        this.typeCategorieMarche = 'الحبوب';
      }
    }
    else {
      this.typeCategorieMarche = '-';
    }

    if (item.categorieVoies != null) {
      if (item.categorieVoies === '1') {
        this.categorieVoies = 'طرق التهيئة';
      }
      if (item.categorieVoies === '2') {
        this.categorieVoies = 'طرق التجزئة';
      }
      if (item.categorieVoies === '3') {
        this.categorieVoies = 'المسالك';
      }
    }
    else {
      this.categorieVoies = '-';
    }

    if (item.typeSpecialite != null) {
      this.typeSpecialite = item.typeSpecialite;
    }
    else {
      this.typeSpecialite = '-';
    }

    if (item.refFonciere != null) {
      this.refFonciere = item.refFonciere.libelle;
    }
    else {
      this.refFonciere = '-';
    }

    if (item.ville != null) {
      this.ville = item.ville.libelle;
    }
    else {
      this.ville = '-';
    }

    if (item.arrondissement != null) {
      this.arrondissement = item.arrondissement.libelle;
    }
    else {
      this.arrondissement = '-';
    }

    if (item.adresse != null) {
      this.adresse = item.adresse;
    }
    else {
      this.adresse = '-';
    }

    if (item.superficie != null) {
      this.superficie = item.superficie;
    }
    else {
      this.superficie = '-';
    }

    if (item.prixAquisition != null) {
      this.prixAquisition = item.prixAquisition;
    }
    else {
      this.prixAquisition = '-';
    }

    if (item.numEnregistrementCF != null) {
      this.numEnregistrementCF = item.numEnregistrementCF;
    }
    else {
      this.numEnregistrementCF = '-';
    }

    if (item.dateEnreCF != null) {
      this.dateEnreCF = item.dateEnreCF;
    }
    else {
      this.dateEnreCF = '-';
    }
  }
}
