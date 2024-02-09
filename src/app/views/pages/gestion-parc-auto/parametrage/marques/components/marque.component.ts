import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { IMarque, Marque, MarqueCriteria } from '../../../common/models/marque.model';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../../common/constants/pagination.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { MarqueService } from '../service/marque.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { combineLatest, EMPTY, of } from "rxjs";
import { FormBuilder,Validators } from '@angular/forms';

import { Observable } from "rxjs";
import { finalize, mergeMap } from "rxjs/operators";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pa-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.scss']
})
export class MarqueComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort1: MatSort;
  marques: IMarque[];
  marque : IMarque;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  datasize=0;
  isSaving = false;
  currentPage = 0;

  marqueCriteria: MarqueCriteria = new MarqueCriteria();


  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    name: [null, [Validators.required]],
  });

  displayedColumns: string[] = [
    "id",
		"name",
    "code",
    "actions"
	];
 

 


  constructor(protected marqueService: MarqueService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected fb: FormBuilder,
    private translate:TranslateService,
    protected modalService: NgbModal) { }
/*
 * START list
 */
    loadPage(page?: number, dontNavigate?: boolean): void {
      this.isLoading = true;
      const pageToLoad: number = page? page : this.page ;

      const criteria = [];
      criteria.push({
        key: "deleted.equals",
        value: false,
      });
      this.marqueService
        .query({
          page: pageToLoad,
          size: this.itemsPerPage,
          sort: this.sort(),
          criteria
        })
        .subscribe({
          next: (res: HttpResponse<IMarque[]>) => {
            this.isLoading = false;
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          error: () => {
            this.isLoading = false;
            this.onError();
          },
        });
    }
  
    ngOnInit(): void {
      this.handleNavigation();
    }
    addNow(){
      this.router.navigateByUrl("gestionParcAuto/marques/new");
    }
    trackId(_index: number, item: IMarque): number {
      return item.id!;
    }

    protected sort(): string[] {
      const result = [this.predicate + "," + (this.ascending ? ASC : DESC)];
      if (this.predicate !== "id") {
        result.push("id");
      }
      return result;
    }

    deleteAutorisation(id: number): void {
      Swal.fire({
        title: this.translate.instant("PAGES.SUPPRIMER.MESSAGE_SUPPRESSION"),
        icon: "question",
        iconHtml: "?",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Non",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log(" supprimer ");
          this.marqueService.delete(id).subscribe(
            (res) => {
              location.reload();
            },
            (error) => {
              console.log("error ===============================================> ", error);
              Swal.fire({
                position: "center",
                icon: "error",
                title: this.translate.instant("PAGES.GENERAL.MSG_DEL_NOCONFIRMED_MESSAGE"),
                showConfirmButton: false,
                timer: 2500,
              });
            }
          );
          Swal.fire({
            position: "center",
            icon: "success",
            title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
            showConfirmButton: false,
            timer: 2500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: this.translate.instant("PAGES.GENERAL.MSG_DEL_NOCONFIRMED"),
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
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
        const ascending = sort[1] === ASC;
        if (
          pageNumber !== this.page ||
          predicate !== this.predicate ||
          ascending !== this.ascending
        ) {
          this.predicate = predicate;
          this.ascending = ascending;
          this.loadPage(pageNumber, true);
        }
      });
    }
  
    protected onSuccess(
      data: IMarque[] | null,
      headers: HttpHeaders,
      page: number,
      navigate: boolean
    ): void {
      this.totalItems = Number(headers.get("X-Total-Count"));
      this.page = page;
      if (navigate) {
        this.router.navigate(["/home/gestion-parc-auto/marque"], {
          queryParams: {
            page: this.page,
            size: this.itemsPerPage,
            sort: this.predicate + "," + (this.ascending ? ASC : DESC),
          },
        });
      }
      this.marques = data ;
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
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
    searchBy() {
      if (this.marqueCriteria.areSet()) {
        const criteria = [];
  
        if (
          this.marqueCriteria.name != null &&
          this.marqueCriteria.name !== ""
        ) {
          criteria.push({
            key: "name.contains",
            value: this.marqueCriteria.name,
          });
        }
        if (
          this.marqueCriteria.code != null &&
          this.marqueCriteria.code !== ""
        ) {
          criteria.push({
            key: "code.contains",
            value: this.marqueCriteria.code,
          });
        }
        criteria.push({
          key: "deleted.equals",
          value: false,
        });
        this.marqueService
          .query({
            page: this.currentPage,
            size: this.itemsPerPage,
            sort: this.sort(),
            criteria,
          })
          .subscribe({
            next: (res: HttpResponse<IMarque[]>) => {
              this.onSuccess(res.body, res.headers, this.currentPage, false);
            },
            error: () => {
              this.onError();
            },
          });
      }
    }

    dataDettalies:any;
    showVehicule(content:any,data:any){
      console.log(data)
      this.dataDettalies = data
      this.modalService.open(content, {
        size: "xl",
      });
    }
  


    pageCurrentChange(event: any) {
      this.currentPage = event;
      this.loadPage(this.currentPage, true);
    }
  
    sizeCurrentChange(event: any) {
      this.itemsPerPage = event;
      this.loadPage(this.currentPage, true);
    }  
  /**
   * end List
   */

  /**
   * 
   * EDIT and CREATE
   */
   save(): void {
    this.isSaving = true;
    const marque = this.createFromForm();
    if (marque.id != null && marque.id !== undefined) {
      this.subscribeToSaveResponse(this.marqueService.update(marque));
    } else {
      this.subscribeToSaveResponse(this.marqueService.create(marque));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IMarque>>
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
        ? "La Marque a été modifié avec succés"
        : "La Marque a été ajoutée avec succés";
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

  protected previousState(): void {
    window.history.back();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(marque: IMarque): void {
    this.editForm.patchValue({
      id: marque.id,
      code: marque.code,
      name: marque.name,
    });
  }

  protected createFromForm(): IMarque {
    return {
      ...new Marque(),
      id: this.editForm.get(["id"])!.value,
      code: this.editForm.get(["code"])!.value,
      name: this.editForm.get(["name"])!.value,
    };
  }
  
  modalAjouterMarque(content: any) {
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailMarque(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (marque) => {
        this.marque = marque;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  modalModifierMarque(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (marque) => {
        this.updateForm(marque);
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  getItemById(id: number): Observable<IMarque> | Observable<never> {
    if (id) {
      return this.marqueService.find(id).pipe(
        mergeMap((marque: HttpResponse<Marque>) => {
          if (marque.body) {
            return of(marque.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new Marque());
  }

  modalSupprimerMarque(content: any, data: any) {
    this.getItemById(data).subscribe(
      (marque) => {
        this.marque = marque;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  confirmDelete(data: any): void {
    this.marqueService.delete(data).subscribe(() => {
      this.modalService.dismissAll();
      Swal.fire({
        title: "Le Marque avec l'identifiant "+ this.marque.name +" a été supprimé",
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

  ajouterInfoMarque() {
    this.save();
  }

  modifierInfoMarque() {
    this.save();
  }

  supprimerInfoMarque() {
    this.confirmDelete(this.marque.id);
  }

}
