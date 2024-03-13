import { Component, OnInit, ViewChild } from '@angular/core';
import { PatrimoineService } from '../../services/patrimoine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { seanceService } from '../../../shared/seance.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { mgService } from '../../../shared/magasin.service';
import { environment } from "../../../../../../environments/environment";
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../../utils/spinner.service';

export interface PatrimoineTab {
  label: string;
  content: string;
}
@Component({
  selector: 'kt-patrimoine-show',
  templateUrl: './patrimoine-show.component.html',
  styleUrls: ['./patrimoine-show.component.scss']
})
export class PatrimoineShowComponent implements OnInit {
  // =========================================================
  //
  // =========================================================
  asyncTabs: Observable<PatrimoineTab[]>;
  dataSource: MatTableDataSource<MAGASIN>;
  dataSource2: MatTableDataSource<SEANCE>;
  dataSource3: MatTableDataSource<any>;

  dataSource4: MatTableDataSource<any>;


  selected = new FormControl(0);
  id: number;
  patrimoine: any;
  divisionLibelle;

  dataSource1: MatTableDataSource<any>;

  displayedColumns1 = ["nomDoc", "dow"];

  // =========================================================
  //
  // =========================================================
  constructor(
    private service: PatrimoineService,
    private service2: BienscommunalService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private seanceService: seanceService,
    private magasinService: mgService,
    private notification: NotificationService,
    private spinnerService: SpinnerService,
    private service1: OrganisationService) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    })
    this.getAllPjImm(this.id);
    // =========================================================
    //
    // =========================================================
    this.asyncTabs = new Observable(
      (observer: Observer<PatrimoineTab[]>) => {
        setTimeout(() => {
          observer.next([
            {
              label: "PAGES.GENERAL.PATRIMOINE_MVML",
              content: '1',
            },
            {
              label: "PAGES.GENERAL.PATRIMOINE_MVMT",
              content: "2"
            }
          ]);
        }, 1000);
      }
    );
  }
  // =========================================================
  //
  // =========================================================
  idPatrimoine;
  idMarche;
  isLoading = true;
  dataShow: any[];
  dataSize = 0;
  isLoading2 = true;
  dataShow2: any[];
  dataSize2 = 0;

  seance;
  magasin;

  displayedColumns = [
    "Nom",
    "Prenom",
    "organisme",
    "autorisation",
    "actions"
  ];

  displayedColumns2 = [
    "Nom",
    "Prenom",
    "organisme",
    "autorisation",
    "actions"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /*  @ViewChild(MatPaginator, { static: true }) paginator2: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort2: MatSort; */
  async ngOnInit() {
    this.getPatrimoine();
    this.idPatrimoine = parseInt(localStorage.getItem('idPatrimoine2'));
    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

    await this.service2.getMarcheById(this.idPatrimoine)
      .pipe(finalize(() => {
        this.spinnerService.stop(spinnerRef);
      }))
      .subscribe(res => {
        console.log(res);
        localStorage.setItem('idMarche2', res[0].id);
        this.idMarche = parseInt(localStorage.getItem('idMarche2'));
        this.seanceService.findById(this.idMarche).subscribe(res => {
          this.dataShow2 = res;
          this.isLoading2 = false;
          this.dataSize2 = this.dataShow2.length;
          this.dataSource2 = new MatTableDataSource(this.dataShow2);

        }, err => {
          console.log(err)
        })
        this.magasinService.findById(this.idMarche).subscribe(res => {
          this.dataShow = res;
          this.isLoading = false;
          this.dataSize = this.dataShow.length;
          this.dataSource = new MatTableDataSource(this.dataShow);

        }, err => {
          console.log(err)
        })
      },
        err => {
          console.log(err)
        })

  }
  // =========================================================
  //
  // =========================================================
  async getPatrimoine() {
    await this.service.getPatrimoineById(this.id)
      .subscribe(data => {
        console.log(data)
        this.patrimoine = data[0];
        this.getDivisionEtService();

      }, error => console.log(error));
  }


  onClickPj(a, e, id) {
    console.log("You clicked: " + e);
    var r = e.substring(0, e.length - 4);
    console.log(r);
    this.service.downoldFile(r, a);
  }
  async getAllPjImm(id) {
    await this.service.getAllPjImm(id).subscribe(data => {
      this.dataSource1 = new MatTableDataSource(data);
    }, error => console.log(error));

  }


  async getDivisionEtService() {
    if (this.patrimoine.idDivision != 0)
      await this.service1
        .findEntityById(this.patrimoine.idDivision, "/divisions/find/")
        .subscribe((d) => {
          this.divisionLibelle = d.libelle;
        },
          (err) => {
            this.divisionLibelle = "";
            console.log(err);
          });
  }
  // =========================================================
  //
  // =========================================================
  public delete(id: number) {
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
  // =========================================================
  //
  // =========================================================
  update(id) {
    this.router.navigate(['/patrimoine/patrimoine-edit'], { queryParams: { id: id } })
    localStorage.setItem("idPatrimoine11122", JSON.stringify(id))
  }

  add() {
    this.router.navigate(['/patrimoine/patrimoine-new'])
    localStorage.setItem("idPatrimoine11133", JSON.stringify(parseInt(localStorage.getItem("idPatrimoine2"))))
  }
  // =========================================================
  //
  // =========================================================
  newMvmL(id) {
    this.router.navigate(['/patrimoine/mvmlocation-new'], { queryParams: { id: id } })
  }
  // =========================================================
  //
  // =========================================================
  newMvmT(id) {
    this.router.navigate(['/patrimoine/mvmtransaction-new'], { queryParams: { id: id } })
  }
  newExploitationDomainePublic(id) {
    this.router.navigate(['/patrimoine/exploitation-domaine-public-new'], { queryParams: { id: id } })
  }
  newExploitationDomainePrive(id) {
    this.router.navigate(['/patrimoine/exploitation-domaine-prive-new'], { queryParams: { id: id } })
  }
  // ============================================
  // Historique
  // ============================================
  showHitory() {

    Swal.fire({
      title: 'Informations',
      icon: 'info',
      confirmButtonText: 'Fermer',
      html: '<table width="100%"  style="direction: ltr; text-align: left;">' +
        '<tbody>' +
        '<tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">Créer par </th>' +
        '<td style="font-size: 15px;" class="donnee_show">: ' + this.getCreator(this.patrimoine.createurUser) + '</td>' +
        '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">Date création </th>' +
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">: ' + this.getDates(this.patrimoine.creationDate) + '</td>' +
        '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">Date modification </th>' +
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">: ' + this.getDates(this.patrimoine.updateDate) + '</td>' +
        '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">Modifier par </th>' +
        '<td style="font-size: 15px; direction: initial;" class="donnee_show">: ' + this.getModificator(this.patrimoine.modificateurUser) + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>',
    })
  }
  // ============================================
  // get Creator
  // ============================================
  getCreator(user): string {
    var result = "Pas d'information";
    if (user != null) {
      result = this.patrimoine.createurUser;
    }
    return result;
  }
  // ============================================
  // get Modificator
  // ============================================
  getModificator(user): string {
    var result = "Pas d'information";
    if (user != null) {
      result = this.patrimoine.modificateurUser;
    }
    return result;
  }
  // ============================================
  // Date format
  // ============================================
  getDates(date): string {
    var result = "Pas d'information";
    if (date != null) {
      result = formatDate(date, 'dd/MM/yyyy HH:mm', 'ar-MA');
    }
    return result;
  }

  onClickPj2(a, e, id) {
    console.log("You clicked: " + e);
    var r = e.substring(0, e.length - 4);
    console.log(r);
    //window.open(environment.API_ALFRESCO_URL + "/MarcheConvention/"+r);
    this.magasinService.downoldFile(r, a);
  }
  async getAllPjImm2(id) {
    await this.magasinService.getAllPjImm(id).subscribe(data => {
      if (data.length != 0) {
        this.dataSource3 = new MatTableDataSource(data);
      }
      else {
        this.dataSource3 = null;
      }
    }, error => console.log(error));

  }
  Show: boolean = false;
  showPj(id: number) {
    this.magasinService.findOneById(this.idMarche, id).subscribe(res => {
      this.magasin = res;
      this.Show = true;
    })
    this.getAllPjImm2(id);
  }

  onClickPj3(a, e, id) {
    console.log("You clicked: " + e);
    var r = e.substring(0, e.length - 4);
    console.log(r);
    //window.open(environment.API_ALFRESCO_URL + "/MarcheConvention/"+r);
    this.seanceService.downoldFile(r, a);
  }
  async getAllPjImm3(id) {
    await this.seanceService.getAllPjImm(id).subscribe(data => {
      if (data.length != 0) {
        this.dataSource4 = new MatTableDataSource(data);
      }
      else {
        this.dataSource4 = null;
      }
    }, error => console.log(error));

  }

  ShowSeance: boolean = false;
  showPj2(id: number) {
    this.seanceService.findOneById(this.idMarche, id).subscribe(res => {
      this.seance = res;
      this.ShowSeance = true;

    })
    this.getAllPjImm3(id);
  }

  applyFilter(filterValue: string) {
    if (filterValue != "") {
      this.magasinService.findByIdAndNumMagasin(this.idMarche, filterValue).subscribe(res => {
        this.dataShow = res;
        this.isLoading = false;
        this.dataSize = this.dataShow.length;
        this.dataSource = new MatTableDataSource(this.dataShow);
        this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, err => {
        console.log(err)
      })
    }
    else {
      this.magasinService.findById(this.idMarche).subscribe(res => {
        this.dataShow = res;
        this.isLoading = false;
        this.dataSize = this.dataShow.length;
        this.dataSource = new MatTableDataSource(this.dataShow);
      }, err => {
        console.log(err)
      })
    }
  }

  applyFilter2(filterValue: string) {
    if (filterValue != "") {
      this.seanceService.findByIdAndNumSeance(this.idMarche, filterValue).subscribe(res => {
        this.dataShow = res;
        this.isLoading = false;
        this.dataSize = this.dataShow.length;
        this.dataSource2 = new MatTableDataSource(this.dataShow);
        this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');

        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;

      }, err => {
        console.log(err)
      })
    } else {
      this.seanceService.findById(this.idMarche).subscribe(res => {
        this.dataShow2 = res;
        this.isLoading2 = false;
        this.dataSize2 = this.dataShow2.length;
        this.dataSource2 = new MatTableDataSource(this.dataShow2);
      }, err => {
        console.log(err)
      })
    }
  }
}

export interface SEANCE {
  numSeance: string;
  superficieSeance: number;
  localisation: string;
  nomLocSeance: string
}

export interface MAGASIN {
  numMagasin: string;
  superficieMag: number;
  localisation: string;
  nomLocataireMAG: string
}
