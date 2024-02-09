import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { delay, first } from 'rxjs/operators';
import { Page } from '../../../utils/pagination/page';
import { CustomPaginationService } from '../../../utils/pagination/services/custom-pagination.service';

@Component({
  selector: 'kt-show-destinataire-interne',
  templateUrl: './show-destinataire-interne.component.html',
  styleUrls: ['./show-destinataire-interne.component.scss']
})
export class ShowDestinataireInterneComponent implements OnInit {

  // =================================================================
  // declaration des Attributs
  // =================================================================
  validate: number;
  loading = false;
  btnloading = false;
  editForm: FormGroup;
  detailscourrier;
  submitted = false;
  courrierId: number;
  form = false;
  divisions: any;
  services: any;
  personnels: any;
  _data;
  data_size: number
  idCourrier;
  idDivision;
  idPerson;
  page: Page<any> = new Page();

  // =================================================================
  // Constructeur
  // =================================================================
  constructor(		
    private paginationService: CustomPaginationService,
    private service: BoServiceService,
    private notification: NotificationService,
    private translate: TranslateService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    this.formBuild();
  }
  // =================================================================
  // methode d'initialisation de fourmulaire
  // =================================================================
  ngOnInit() {
    this.paginationService.currentMessage.subscribe((message) => {
			this.page = message;
		});
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idCourrier = params["id"];
      this.idPerson = params["idPers"];
      this.idDivision = params["div"];
      window.localStorage.removeItem("courrId");
      window.localStorage.setItem("courrId",this.idCourrier.toString());
    });
    if (!this.idCourrier) {
      alert("Invalid action.");
      this.router.navigate(["list-courriers-entrants"]);
      return;
    }
    const _this = this;
    this.service
      .getObjectById("/courrierEntrants/show/", this.idCourrier)
      .subscribe(
        (data) => {
          _this._data = data;
          this.detailscourrier = data;
          console.log("Courrier entrant info :: " + JSON.stringify(this.detailscourrier, null, 2))
        },
        (error) => console.log(error)
      );
    this.getData();
  }
  // =================================================================
  //
  // =================================================================
  back() {
    this.router.navigate(["personnel-courriers/show-courriers"], {
      queryParams: { id: this.idPerson, div: this.idDivision },
    });
  }
  // ====================================
  //
  //=====================================
  dataSource: any;
  displayedColumns: string[] = [
    //"idDivision",
    "idService",
    "idPersonne",
    "actions",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // ====================================
  //
  //=====================================
  onCreate() {
    this.router.navigate(["destinataire-courrier/add-destinataire-interne"], {
      queryParams: { div: this.idDivision,chefDiv: this.idPerson  },
    });
  }
  // ====================================
  //
  //=====================================
  onEdit(dest: any) {
    this.router.navigate(["destinataire-courrier/edit-destinataire-interne"], {
      queryParams: { id: dest },
    });
  }
  // ====================================
  //
  //=====================================
  onDelete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteObject("/destinataireCouriers/delete/", id)
        .subscribe((data) => {
          console.log("getId :" + id);
          this.getData();
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
  sizeData
  // =================================================================
  // Recuperer tous les destinataire des courriers entrants
  // =================================================================
  private getData() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idCourrier = params["id"];
    });
    if (!this.idCourrier) {
      alert("Invalid action.");
      this.router.navigate(["list-courriers-entrants"]);
      return;
    }
    const _this = this;
    
    //document.getElementById("destinataire").style.display = "none";
    this.service
      .getAllDestinataireInterneByIdCourrierEntrant("/destinataireCouriers/find/", this.idCourrier,this.page.pageable)
      .pipe(delay(300))
      .subscribe(
        (data:any) => {
          this.page = data;
						// this.dataSource.data = data;
						this.sizeData = data.length;
          _this.data_size =data.length;
          if (data.length > 0) {
            _this.validate = 1;
          } else {
            _this.validate = 0;
          }
          //document.getElementById("destinataire").style.display ="inline";
          this.loading = false;
          this.dataSource = new MatTableDataSource(data);
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
        (error) => console.log(error)
      );
  }
  // ====================================
  //
  //=====================================
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }
  // ============================================================
  //
  // ============================================================
  formBuild() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idCourrier = params["id"];
    });
    this.editForm = this.fb.group({
      id: [this.idCourrier],
      statut: [""],
    });
    this.editForm
      .get("statut")
      .setValue(
        this.translate.instant("PAGES.BUREAU_ORDRE.IS_DISPATCHING")
      );
  }
  // ============================================================
  //
  // ============================================================
  dispatching() {
    console.log("statut :" + JSON.stringify(this.editForm.value, null, 2));
    this.btnloading = true;
    this.service
      .updateObject(
        "/courrierEntrants/dispatching/",
        this.editForm.value
      )
      .pipe(first())
      .subscribe(
        (data) => {

          this.router.navigate(["personnel-courriers/show-courriers"], {
            queryParams: { id: this.idPerson, div: this.idDivision },
          });

          this.notification.warn(
            this.translate.instant(
              "PAGES.GENERAL.MSG_SAVED_CONFIRMED"
            )
          );
          this.btnloading = false;
        },
        (error) => {
          alert(error);
        }
      );
  }

}
