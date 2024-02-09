import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit, ViewChild } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
 

import {
  ASC,
  DESC,
  ITEMS_PER_PAGE,
  SORT,
} from "../../../common/constants/pagination.constants";

import { ActivatedRoute, Router } from "@angular/router";

import { combineLatest, Observable, of, EMPTY } from "rxjs";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { finalize, mergeMap } from "rxjs/operators";
import { CarteJawaz, CarteJawazCriteria, ICarteJawaz } from "../../../common/models/carte-jawaz.model"; 
import { CarteJawazService } from "../service/carte-jawaz.service";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-pa-carte-jawaz",
  templateUrl: "./cartes-jawaz.component.html",
  styleUrls: ["./cartes-jawaz.component.scss"],
})
export class CartesJawazComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort1: MatSort;
  displayedColumns: string[] = [
		"id",
		"reference",
		"soldedepart",
    "soldeactuel" 
	];
  datasize=0;
  carteJawazs: ICarteJawaz[];
  carteJawaz: ICarteJawaz;
  isSaving = false;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;

  ngbPaginationPage = 0;

  currentPage = 0;

  carteJawazCriteria: CarteJawazCriteria = new CarteJawazCriteria();

 



  constructor(
    protected carteJawazService: CarteJawazService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected fb: FormBuilder,
    private translate:TranslateService
  ) {}

  ngOnInit(): void {
    this.handleNavigation();
  }
  addNow(){
    this.router.navigateByUrl("/gestionParcAuto/cartes-jawaz/new")
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  /*
   * Start List */
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page? page : this.page ;
    const criteria = [];
    criteria.push({
      key: "deleted.equals",
      value: false,
    });
    this.carteJawazService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
        sort: this.sort(),
        criteria
      })
      .subscribe({
        next: (res: HttpResponse<ICarteJawaz[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  trackId(_index: number, item: ICarteJawaz): number {
    return item.id!;
  }

  delete(carteJawaz: ICarteJawaz): void {
    // const modalRef = this.modalService.open(carteJawazDeleteDialogComponent, {
    //   size: "lg",
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.carteJawaz = carteJawaz;
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
    data: ICarteJawaz[] | null,
    headers: HttpHeaders,
    page: number,
    navigate: boolean
  ): void {
    this.totalItems = Number(headers.get("X-Total-Count"));
    this.page = page;
    if (navigate) {
      this.router.navigate(["/home/gestion-parc-auto/cartes-jawaz"], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + "," + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.carteJawazs = data ;
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
    if (this.carteJawazCriteria.areSet()) {
      const criteria = [];

      if (
        this.carteJawazCriteria.reference != null &&
        this.carteJawazCriteria.reference !== ""
      ) {
        criteria.push({
          key: "reference.contains",
          value: this.carteJawazCriteria.reference,
        });
      }
      if (
        this.carteJawazCriteria.soldeactuel != null &&
        this.carteJawazCriteria.soldeactuel >= 0
      ) {
        criteria.push({
          key: "soldeactuel.equals",
          value: this.carteJawazCriteria.soldeactuel,
        });
      }
      if (
        this.carteJawazCriteria.soldedepart != null &&
        this.carteJawazCriteria.soldedepart  >= 0
      ) {
        criteria.push({
          key: "soldedepart.equals",
          value: this.carteJawazCriteria.soldedepart,
        });
      }
      criteria.push({
        key: "deleted.equals",
        value: false,
      });
      this.carteJawazService
        .query({
          page: this.currentPage,
          size: this.itemsPerPage,
          sort: this.sort(),
          criteria,
        })
        .subscribe({
          next: (res: HttpResponse<ICarteJawaz[]>) => {
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
    reference: [null, [Validators.required]],
    soldedepart: [null, [Validators.required, Validators.min(0)]],
    soldeactuel: [null, [Validators.required, Validators.min(0)]],
  });

  save(): void {
    this.isSaving = true;
    const carteJawaz = this.createFromForm();
    if (carteJawaz.id != null && carteJawaz.id !== undefined) {
      this.subscribeToSaveResponse(this.carteJawazService.update(carteJawaz));
    } else {
      this.subscribeToSaveResponse(this.carteJawazService.create(carteJawaz));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<ICarteJawaz>>
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
        ? "La Carte Jawaz a été modifié avec succés"
        : "La Carte Jawaz a été ajoutée avec succés";
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

  protected updateForm(carteJawaz: ICarteJawaz): void {
    this.editForm.patchValue({
      id: carteJawaz.id,
      reference: carteJawaz.reference,
      soldedepart: carteJawaz.soldedepart,
      soldeactuel: carteJawaz.soldeactuel,
    });
  }

  protected createFromForm(): ICarteJawaz {
    return {
      ...new CarteJawaz(),
      id: this.editForm.get(["id"])!.value,
      reference: this.editForm.get(["reference"])!.value,
      soldedepart: this.editForm.get(["soldedepart"])!.value,
      soldeactuel: this.editForm.get(["soldeactuel"])!.value,
    };
  }

  /**       **
   * End Edit*
   **       **/
  /*--------------------------------------------------------------------------------------------- */

  modalAjouterCarteJawaz(content: any) {
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailCarteJawaz(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (carteJawaz) => {
        this.carteJawaz = carteJawaz;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  modalModifierCarteJawaz(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (carteJawaz) => {
        this.updateForm(carteJawaz);
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  getItemById(id: number): Observable<ICarteJawaz> | Observable<never> {
    if (id) {
      return this.carteJawazService.find(id).pipe(
        mergeMap((carteJawaz: HttpResponse<CarteJawaz>) => {
          if (carteJawaz.body) {
            return of(carteJawaz.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new CarteJawaz());
  }

  modalSupprimerCarteJawaz(content: any, data: any) {
    this.getItemById(data).subscribe(
      (carteJawaz) => {
        this.carteJawaz = carteJawaz;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  confirmDelete(data: any): void {
    this.carteJawazService.delete(data).subscribe(() => {
      this.modalService.dismissAll();
      Swal.fire({
        title: "La Carte Jawaz avec l'identifiant "+ this.carteJawaz.reference +" a été supprimé",
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

  ajouterInfoCarteJawaz() {
    this.save();
  }

  modifierInfoCarteJawaz() {
    this.save();
  }

  supprimerInfoCarteJawaz() {
    this.confirmDelete(this.carteJawaz.id);
  }
}
