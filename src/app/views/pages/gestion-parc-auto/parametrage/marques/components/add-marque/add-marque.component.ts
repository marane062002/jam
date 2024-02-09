import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IMarque, Marque} from "../../../../common/models/marque.model";
import {MarqueService} from "../../service/marque.service";
import {Observable} from "rxjs";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import Swal, {SweetAlertResult} from "sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ASC, DESC, ITEMS_PER_PAGE} from "../../../../common/constants/pagination.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.scss']
})
export class AddMarqueComponent implements OnInit {
  editForm:FormGroup;
  isSaving: boolean=false;
   isLoading: boolean=false;
  marques: IMarque[];
  itemsPerPage = ITEMS_PER_PAGE;
  predicate!: string;
  ngbPaginationPage = 1;
  ascending!: boolean;
  totalItems = 0;
  page?: number;
  constructor(private fb:FormBuilder,private marqueService:MarqueService,protected modalService: NgbModal,private router:Router) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [],
      code: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }

  ajouterInfoMarque() {
    this.save();
  }
  protected createFromForm(): IMarque {
    return {
      ...new Marque(),
      id: this.editForm.get(["id"])!.value,
      code: this.editForm.get(["code"])!.value,
      name: this.editForm.get(["name"])!.value,
    };
  }
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
  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSaveError(): void {
    // Api for inheritance.
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
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ? this.page : 1;

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
  protected sort(): string[] {
    const result = [this.predicate + "," + (this.ascending ? ASC : DESC)];
    if (this.predicate !== "id") {
      result.push("id");
    }
    return result;
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
    this.marques = data;
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?this.page: 1;
  }

}
