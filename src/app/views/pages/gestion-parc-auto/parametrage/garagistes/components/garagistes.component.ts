import { GaragisteCriteria } from "./../../../common/models/garagiste.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, ViewChild } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { Garagiste, IGaragiste } from "../../../common/models/garagiste.model";
import {
  ASC,
  DESC,
  ITEMS_PER_PAGE,
  SORT,
} from "../../../common/constants/pagination.constants";
import { ActivatedRoute, Router } from "@angular/router";
import { GaragisteService } from "../service/garagiste.service";

import { combineLatest, Observable, of, EMPTY } from "rxjs";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { finalize, mergeMap } from "rxjs/operators";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-pa-garagistes",
  templateUrl: "./garagistes.component.html",
  styleUrls: ["./garagistes.component.scss"],
})
export class GaragistesComponent implements OnInit {
  displayedColumns: string[] = ['nomFr', 'telephone','contact' ,'adresse', 'rc','actions'];

  garagiste: IGaragiste;
  isSaving = false;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;

  ngbPaginationPage = 0;

  currentPage = 0;

  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort1: MatSort;
  datasize: number = 0;
  garagistes: IGaragiste[];

  garagisteCriteria: GaragisteCriteria = new GaragisteCriteria();


 

  constructor(
    protected garagisteService: GaragisteService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected fb: FormBuilder,private  translate:TranslateService
  ) {}

  ngOnInit(): void {
    this.handleNavigation();
   // this.paginator._intl.itemsPerPageLabel="Test String";
  }
  addNow(){
    this.router.navigate(['gestionParcAuto/garagistes/new']);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort1;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  /* Start List */
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page? page : this.page ;
    const criteria = [];
    criteria.push({
      key: "deleted.equals",
      value: false,
    });
    this.garagisteService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
        sort: this.sort(),
        criteria
      })
      .subscribe({
        next: (res: HttpResponse<IGaragiste[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  trackId(_index: number, item: IGaragiste): number {
    return item.id!;
  }

  delete(garagiste: IGaragiste): void {
    // const modalRef = this.modalService.open(GaragisteDeleteDialogComponent, {
    //   size: "lg",
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.garagiste = garagiste;
    // // unsubscribe not needed because closed completes on modal close
    // modalRef.closed.subscribe((reason) => {
    //   if (reason === "deleted") {
    //     this.loadPage();
    //   }
    // });
  }

  protected sort(): string[] {
    const result = [this.predicate + "," + (this.ascending ? ASC : DESC)];
    if (this.predicate !== "id") {
      result.push("id");
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([
      this.activatedRoute.data,
      this.activatedRoute.queryParamMap,
    ]).subscribe(([data, params]) => {
      const page = params.get("page");
      const pageNumber = +(page );
      const sort = (params.get(SORT) ? params.get(SORT): data["defaultSort"]).split(",");
      const predicate = sort[0];
      const ascending = sort[1] === DESC;
      if (pageNumber !== this.page) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(
    data: IGaragiste[] | null,
    headers: HttpHeaders,
    page: number,
    navigate: boolean
  ): void {
    this.totalItems = Number(headers.get("X-Total-Count"));
    this.page = page;
    if (navigate) {
      this.router.navigate(["/home/gestion-parc-auto/garagistes"], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + "," + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.garagistes = data ;
    this.ngbPaginationPage = this.page;
    this.dataSource = new MatTableDataSource(data);
    this.isLoading = false;
    this.datasize = data.length;
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
    this.dataSource.sort = this.sort1;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ;
  }

  searchBy() {
    if (this.garagisteCriteria.areSet()) {
      const criteria = [];

      if (
        this.garagisteCriteria.nomFr != null &&
        this.garagisteCriteria.nomFr !== ""
      ) {
        criteria.push({
          key: "nomFr.contains",
          value: this.garagisteCriteria.nomFr,
        });
      }
      if (
        this.garagisteCriteria.nomAr != null &&
        this.garagisteCriteria.nomAr !== ""
      ) {
        criteria.push({
          key: "nomAr.contains",
          value: this.garagisteCriteria.nomAr,
        });
      }
      if (
        this.garagisteCriteria.adresse != null &&
        this.garagisteCriteria.adresse !== ""
      ) {
        criteria.push({
          key: "adresse.contains",
          value: this.garagisteCriteria.adresse,
        });
      }
      if (
        this.garagisteCriteria.telephone != null &&
        this.garagisteCriteria.telephone !== ""
      ) {
        criteria.push({
          key: "telephone.contains",
          value: this.garagisteCriteria.telephone,
        });
      }
      if (this.garagisteCriteria.rc != null) {
        criteria.push({
          key: "rc.contains",
          value: this.garagisteCriteria.rc,
        });
      }
      criteria.push({
        key: "deleted.equals",
        value: false,
      });
      this.garagisteService
        .query({
          page: this.currentPage,
          size: this.itemsPerPage,
          sort: this.sort(),
          criteria,
        })
        .subscribe({
          next: (res: HttpResponse<IGaragiste[]>) => {
            this.onSuccess(res.body, res.headers, this.currentPage, false);
          },
          error: () => {
            this.onError();
          },
        });
    }
  }

  pageCurrentChange(event: any) {
    this.currentPage = event;
    this.loadPage(this.currentPage, true);
  }

  sizeCurrentChange(event: any) {
    this.itemsPerPage = event;
    this.loadPage(this.currentPage, true);
  }

  /**       **
   * End List*
   **       **/
  /*--------------------------------------------------------------------------------------------- */
  /**       **
   * Start Edit*
   **       **/

  editForm = this.fb.group({
    id: [],
    nomFr: [null, [Validators.required]],
    nomAr: [null, [Validators.pattern("[\u0600-\u06FF ]*")]],
    telephone: [null, [Validators.required,Validators.pattern('[- +()0-9]+')]],
    contact: [],
    adresse: [],
    rc: [],
  });

  save(): void {
    this.isSaving = true;
    const garagiste = this.createFromForm();
    if (garagiste.id != null && garagiste.id !== undefined) {
      this.subscribeToSaveResponse(this.garagisteService.update(garagiste));
    } else {
      this.subscribeToSaveResponse(this.garagisteService.create(garagiste));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IGaragiste>>
  ): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.modalService.dismissAll();
    let id = this.editForm.get(["id"])!.value;
    let title: String =
      id != null && id !== undefined
        ? "Garagiste a été modifié avec succés"
        : "Garagiste a été ajoutée avec succés";
    Swal.fire({
      title: "title",
      icon: "success",
    })
      .then((sweetAlert: SweetAlertResult) => {
        if (sweetAlert.isConfirmed) {
        }
        if (sweetAlert.isDenied) {
        }
        if (sweetAlert.isDismissed) {
        }
        if (sweetAlert.dismiss) {
        }
        this.editForm.reset();
        this.loadPage();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  previousState(): void {}

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(garagiste: IGaragiste): void {
    this.editForm.patchValue({
      id: garagiste.id,
      nomFr: garagiste.nomFr,
      nomAr: garagiste.nomAr,
      telephone: garagiste.telephone,
      contact: garagiste.contact,
      adresse: garagiste.adresse,
      rc: garagiste.rc,
    });
  }

  protected createFromForm(): IGaragiste {
    return {
      ...new Garagiste(),
      id: this.editForm.get(["id"])!.value,
      nomFr: this.editForm.get(["nomFr"])!.value,
      nomAr: this.editForm.get(["nomAr"])!.value,
      telephone: this.editForm.get(["telephone"])!.value,
      contact: this.editForm.get(["contact"])!.value,
      adresse: this.editForm.get(["adresse"])!.value,
      rc: this.editForm.get(["rc"])!.value,
    };
  }

  /**       **
   * End Edit*
   **       **/
  /*--------------------------------------------------------------------------------------------- */

  modalAjouterGaragiste(content: any) {
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailGaragiste(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (garagiste) => {
        this.garagiste = garagiste;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  modalModifierGaragiste(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (garagiste) => {
        this.updateForm(garagiste);
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  getItemById(id: number): Observable<IGaragiste> | Observable<never> {
    if (id) {
      return this.garagisteService.find(id).pipe(
        mergeMap((garagiste: HttpResponse<Garagiste>) => {
          if (garagiste.body) {
            return of(garagiste.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new Garagiste());
  }

  modalSupprimerGaragiste(content: any, data: any) {
    this.getItemById(data).subscribe(
      (garagiste) => {
        this.garagiste = garagiste;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }



  showGaragistes(content:any,data:any){
    console.log(data)
    this.garagiste = data
    this.modalService.open(content, {
      size: "xl",
    });
  }


  

  confirmDelete(data: any): void {
    this.garagisteService.delete(data).subscribe(() => {
      this.modalService.dismissAll();
      Swal.fire({
        title: "Le Garagiste avec l'identifiant "+ this.garagiste.nomFr +" a été supprimé",
        icon: "success",
      })
        .then((sweetAlert: SweetAlertResult) => {
          if (sweetAlert.isConfirmed) {
          }
          if (sweetAlert.isDenied) {
          }
          if (sweetAlert.isDismissed) {
          }
          if (sweetAlert.dismiss) {
          }
          this.editForm.reset();
          this.loadPage();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  close() {
    this.modalService.dismissAll();
  }

  ajouterInfoGaragiste() {
    this.save();
  }

  modifierInfoGaragiste() {
    this.save();
  }

  supprimerInfoGaragiste() {
    this.confirmDelete(this.garagiste.id);
  }
}
