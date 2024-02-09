import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../../common/constants/pagination.constants';
import { CarteCarbucarte, CarteCarbucarteCriteria, ICarteCarbucarte } from '../../../common/models/carte-carbucarte.model';
import { CarteCarbucarteService } from '../service/carte-carbucarte.service';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { combineLatest, Observable, of, EMPTY } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';
import { DATE_TIME_FORMAT } from '../../../common/config/input.constants';
import dayjs from 'dayjs/esm';

@Component({
  selector: 'app-carbucartes',
  templateUrl: './carbucartes.component.html',
  styleUrls: ['./carbucartes.component.scss']
})
export class CarbucartesComponent implements OnInit {

  carteCarbucartes: ICarteCarbucarte[];
  carteCarbucarte: ICarteCarbucarte;
  isSaving = false;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;

  ngbPaginationPage = 0;

  currentPage = 0;

  carteCarbucarteCriteria: CarteCarbucarteCriteria = new CarteCarbucarteCriteria();

  headerData:any=[
    { name: "Référence", content: "reference" },
    { name: "Montant initial", content: "montantInitial" },
    { name: "Montant final", content: "montantFinal" },
    { name: "Date d'acquisition", content: "dateAcquisition" },
    { name: "Code PIN", content: "codePin" },
    { name: "Véhicule", content: "vehicule" },
  ]


  actions: any = {
    canDetail: true,
    canDelete: true,
    canModify: true,
    canAdd: true,
    withAction: true,
  };

  constructor(
    protected carteCarbucarteservice: CarteCarbucarteService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.handleNavigation();
  }

  /*
   * Start List */
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?page: this.page ;
    const criteria = [];
    criteria.push({
      key: "deleted.equals",
      value: false,
    });
    this.carteCarbucarteservice
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
        sort: this.sort(),
        criteria
      })
      .subscribe({
        next: (res: HttpResponse<ICarteCarbucarte[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  trackId(_index: number, item: ICarteCarbucarte): number {
    return item.id!;
  }

  delete(carteCarbucarte: ICarteCarbucarte): void {
    // const modalRef = this.modalService.open(carteCarbucarteDeleteDialogComponent, {
    //   size: "lg",
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.carteCarbucarte = carteCarbucarte;
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
      const pageNumber = +(page);
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
    data: ICarteCarbucarte[] | null,
    headers: HttpHeaders,
    page: number,
    navigate: boolean
  ): void {
    this.totalItems = Number(headers.get("X-Total-Count"));
    this.page = page;
    if (navigate) {
      this.router.navigate(["/home/gestion-parc-auto/cartes-carbucarte"], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + "," + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.carteCarbucartes = data ;
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ;
  }

  searchBy() {
    if (this.carteCarbucarteCriteria.areSet()) {
      const criteria = [];

      if (
        this.carteCarbucarteCriteria.reference != null &&
        this.carteCarbucarteCriteria.reference !== ""
      ) {
        criteria.push({
          key: "reference.contains",
          value: this.carteCarbucarteCriteria.reference,
        });
      }
      if (
        this.carteCarbucarteCriteria.montant != null &&
        this.carteCarbucarteCriteria.montant  >= 0
      ) {
        criteria.push({
          key: "montant.equals",
          value: this.carteCarbucarteCriteria.montant,
        });
      }
      if (
        this.carteCarbucarteCriteria.pin != null &&
        this.carteCarbucarteCriteria.pin  !== ""
      ) {
        criteria.push({
          key: "pin.equals",
          value: this.carteCarbucarteCriteria.pin,
        });
      }
      if (
        this.carteCarbucarteCriteria.soldeactuel != null &&
        this.carteCarbucarteCriteria.soldeactuel >= 0
      ) {
        criteria.push({
          key: "soldeactuel.equals",
          value: this.carteCarbucarteCriteria.soldeactuel,
        });
      }
      if (
        this.carteCarbucarteCriteria.annee != null &&
        this.carteCarbucarteCriteria.annee  >= 0
      ) {
        criteria.push({
          key: "annee.equals",
          value: this.carteCarbucarteCriteria.annee,
        });
      }
      
      criteria.push({
        key: "deleted.equals",
        value: false,
      });

      this.carteCarbucarteservice
        .query({
          page: this.currentPage,
          size: this.itemsPerPage,
          sort: this.sort(),
          criteria,
        })
        .subscribe({
          next: (res: HttpResponse<ICarteCarbucarte[]>) => {
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
    montant: [null, [Validators.required, Validators.min(0)]],
    dateAcquisition: [null, [Validators.required]],
    pin: [],
    soldeactuel: [null, [Validators.required, Validators.min(0)]],
    annee: [null, [Validators.required, Validators.min(0)]],
  });

  save(): void {
    this.isSaving = true;
    const carteCarbucarte = this.createFromForm();
    if (carteCarbucarte.id != null && carteCarbucarte.id !== undefined) {
      this.subscribeToSaveResponse(this.carteCarbucarteservice.update(carteCarbucarte));
    } else {
      this.subscribeToSaveResponse(this.carteCarbucarteservice.create(carteCarbucarte));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<ICarteCarbucarte>>
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
        ? "La Carte carbucarte a été modifié avec succés"
        : "La Carte carbucarte a été ajoutée avec succés";
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

  protected updateForm(carteCarbucarte: ICarteCarbucarte): void {
    this.editForm.patchValue({
      id: carteCarbucarte.id,
      reference: carteCarbucarte.reference,
      montant: carteCarbucarte.montant,
      dateAcquisition: carteCarbucarte.dateAcquisition
        ? carteCarbucarte.dateAcquisition.format(DATE_TIME_FORMAT)
        : null,
      pin: carteCarbucarte.pin,
      soldeactuel: carteCarbucarte.soldeactuel,
      annee: carteCarbucarte.annee,
    });
  }

  protected createFromForm(): ICarteCarbucarte {
    return {
      ...new CarteCarbucarte(),
      id: this.editForm.get(["id"])!.value,
      reference: this.editForm.get(["reference"])!.value,
      montant: this.editForm.get(["montant"])!.value,
      dateAcquisition: this.editForm.get(["dateAcquisition"])!.value
        ? dayjs(this.editForm.get(["dateAcquisition"])!.value, DATE_TIME_FORMAT)
        : undefined,
      pin: this.editForm.get(["pin"])!.value,
      soldeactuel: this.editForm.get(["soldeactuel"])!.value,
      annee: this.editForm.get(["annee"])!.value,
    };
  }

  /**       **
   * End Edit*
   **       **/
  /*--------------------------------------------------------------------------------------------- */

  modalAjouterCarteCarbucarte(content: any) {
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailCarteCarbucarte(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (carteCarbucarte) => {
        this.carteCarbucarte = carteCarbucarte;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  modalModifierCarteCarbucarte(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (carteCarbucarte) => {
        this.updateForm(carteCarbucarte);
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  getItemById(id: number): Observable<ICarteCarbucarte> | Observable<never> {
    if (id) {
      return this.carteCarbucarteservice.find(id).pipe(
        mergeMap((carteCarbucarte: HttpResponse<CarteCarbucarte>) => {
          if (carteCarbucarte.body) {
            return of(carteCarbucarte.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new CarteCarbucarte());
  }

  modalSupprimerCarteCarbucarte(content: any, data: any) {
    this.getItemById(data).subscribe(
      (carteCarbucarte) => {
        this.carteCarbucarte = carteCarbucarte;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  confirmDelete(data: any): void {
    this.carteCarbucarteservice.delete(data).subscribe(() => {
      this.modalService.dismissAll();
      Swal.fire({
        title: "La Carte carbucarte avec l'identifiant "+ this.carteCarbucarte.reference +" a été supprimé",
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

  ajouterInfoCarteCarbucarte() {
    this.save();
  }

  modifierInfoCarteCarbucarte() {
    this.save();
  }

  supprimerInfoCarteCarbucarte() {
    this.confirmDelete(this.carteCarbucarte.id);
  }

}


