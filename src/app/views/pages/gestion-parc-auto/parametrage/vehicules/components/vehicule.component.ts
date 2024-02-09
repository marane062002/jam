import { IVehicule, Vehicule, VehiculeCriteria } from './../../../common/models/vehicule.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../../common/constants/pagination.constants';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { combineLatest, Observable, of, EMPTY } from 'rxjs';
import { finalize, mergeMap ,map } from 'rxjs/operators';
import { VehiculeService } from '../services/vehicule.service';
import { MarqueService } from '../../marques/service/marque.service';
import { CategorieVehiculeService } from '../../categorie-vehicule/services/categorie-vehicule.service';
import { EtatVehicule } from '../../../common/enumerations/etat-vehicule.model';
import { StatutVehicule } from '../../../common/enumerations/statut-vehicule.model';
import { TypeCarburant } from '../../../common/enumerations/type-carburant.model';
import { ICategorieVehicule } from '../../../common/models/categorie-vehicule.model';
import { IMarque } from '../../../common/models/marque.model';
import { DATE_TIME_FORMAT } from '../../../common/config/input.constants';
import dayjs from 'dayjs/esm';
import { AccessoireVehiculeService } from '../../accessoireVehicule/services/accessoire-vehicule.service';
import { IAccessoireVehicule } from '../../../common/models/accessoire-vehicule.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pa-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort1: MatSort;

  datasize=0;
  dropdownList: any[] = [];
  selectedItems: any[];
  dropdownSettings: IDropdownSettings;

  vehicules: IVehicule[];
  vehicule: IVehicule;
  isSaving = false;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;

  ngbPaginationPage = 0;

  currentPage = 0;

  vehiculeCriteria: VehiculeCriteria = new VehiculeCriteria();


  displayedColumns: string[] = [
		"matricule",
    "numeroChassis",
		"marque",
		"modele",
    "etatVehicule",
    "action"
	];

  actions: any = {
    canDetail: true,
    canDelete: true,
    canModify: true,
    canAdd: true,
    withAction: true,
  };

  typeCarburantValues = Object.keys(TypeCarburant);
  statutVehiculeValues = Object.keys(StatutVehicule);
  etatVehiculeValues = Object.keys(EtatVehicule);

  marquesSharedCollection: IMarque[] = [];
  categorieVehiculesSharedCollection: ICategorieVehicule[] = [];
  accessoireVehiculesSharedCollection: IAccessoireVehicule[] = [];

  ngOnInit() {

    this.handleNavigation();


  // this.loadRelationshipsOptions();
  }

  constructor(
    protected vehiculeService: VehiculeService,
    protected marqueService: MarqueService,
    protected categorieVehiculeService: CategorieVehiculeService,
    protected accessoireVehiculeService: AccessoireVehiculeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private translate:TranslateService,
    protected modalService: NgbModal,
    protected fb: FormBuilder
  ) {}


dataDettalies:any

  showVehicule(content:any,data:any){
    console.log(data)
    this.dataDettalies = data
    this.modalService.open(content, {
      size: "xl",
    });
  }




  deletesejour(id: number): void {
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
				this.vehiculeService.delete(id).subscribe(
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
    this.vehiculeService
      .query({
        page: pageToLoad,
        size: this.itemsPerPage,
        sort: this.sort(),
        criteria
      })
      .subscribe({
        next: (res: HttpResponse<IVehicule[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  trackId(_index: number, item: IVehicule): number {
    return item.id!;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  delete(Vehicule: IVehicule): void {
    // const modalRef = this.modalService.open(VehiculeDeleteDialogComponent, {
    //   size: "lg",
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.Vehicule = Vehicule;
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
    data: IVehicule[] | null,
    headers: HttpHeaders,
    page: number,
    navigate: boolean
  ): void {
    this.totalItems = Number(headers.get("X-Total-Count"));
    this.page = page;
    if (navigate) {
      this.router.navigate(["/home/gestion-parc-auto/vehicules"], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + "," + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.vehicules = data ;
    this.ngbPaginationPage = this.page;
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
addNow(){
  this.router.navigateByUrl("gestionParcAuto/vehicules/new")
}
  searchBy() {
    if (this.vehiculeCriteria.areSet()) {
      const criteria = [];

      if (
        this.vehiculeCriteria.matricule != null &&
        this.vehiculeCriteria.matricule !== ""
      ) {
        criteria.push({
          key: "matricule.contains",
          value: this.vehiculeCriteria.matricule,
        });
      }
      if (
        this.vehiculeCriteria.cartegriseVehicule != null &&
        this.vehiculeCriteria.cartegriseVehicule !== ""
      ) {
        criteria.push({
          key: "cartegriseVehicule.contains",
          value: this.vehiculeCriteria.cartegriseVehicule,
        });
      }
      if (
        this.vehiculeCriteria.modele != null &&
        this.vehiculeCriteria.modele !== ""
      ) {
        criteria.push({
          key: "modele.contains",
          value: this.vehiculeCriteria.modele,
        });
      }
      if (
        this.vehiculeCriteria.marque != null &&
        this.vehiculeCriteria.marque !== null
      ) {
        criteria.push({
          key: "marqueId.equals",
          value: this.vehiculeCriteria.marque.id,
        });
      }
      if (
        this.vehiculeCriteria.categorieVehicule != null &&
        this.vehiculeCriteria.categorieVehicule !==null
      ) {
        criteria.push({
          key: "categorieVehiculeId.equals",
          value: this.vehiculeCriteria.categorieVehicule.id,
        });
      }
      if (
        this.vehiculeCriteria.etatVehicule != null
      ) {
        criteria.push({
          key: "etatVehicule.equals",
          value: this.getValueEnumEtatVehicule(this.vehiculeCriteria.etatVehicule),
        });
      }
      

      criteria.push({
        key: "deleted.equals",
        value: false,
      });

      this.vehiculeService
        .query({
          page: this.currentPage,
          size: this.itemsPerPage,
          sort: this.sort(),
          criteria,
        })
        .subscribe({
          next: (res: HttpResponse<IVehicule[]>) => {
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
  
  trackMarqueById(_index: number, item: IMarque): number {
    return item.id!;
  }

  trackCategorieVehiculeById(_index: number, item: ICategorieVehicule): number {
    return item.id!;
  }

  editForm = this.fb.group({
    id: [],
    numInventaire:[null,[Validators.required]],
    matricule: [null, [Validators.required]],
    matriculeAr: [null, [Validators.required]],
    cartegriseVehicule: [],
    modele: [],
    carburant: [null, [Validators.required]],
    statutVehicule: [null, [Validators.required]],
    puissanceFiscale: [null, [Validators.required]],
    nombrePlaces: [
      null,
      [Validators.required, Validators.min(1), Validators.max(100)],
    ],
    dateAcquisition: [null, [Validators.required]],
    entiteBenificiaire: [null, [Validators.required]],
    entiteBenificiaireAR: [null, [Validators.required]],
    compteur: [null, [Validators.required, Validators.min(0)]],
    consommation: [null, [Validators.required]],
    numeroChassis: [null, [Validators.required]],
    origin: [null, [Validators.required]],
    etatVehicule: [null, [Validators.required]],
    vidange: [null, [Validators.required, Validators.min(0)]],
    marque: [null, Validators.required],
    categorieVehicule: [null, Validators.required],
    accessoireVehicules: [null, Validators.required],
  });

  trackAccessoireVehiculeById(_index: number, item: IAccessoireVehicule): number {
    return item.id!;
  }

  getSelectedAccessoireVehicule(option: IAccessoireVehicule, selectedVals?: IAccessoireVehicule[]): IAccessoireVehicule {
    if (selectedVals) {
      for (const selectedVal of selectedVals) {
        if (option.id === selectedVal.id) {
          return selectedVal;
        }
      }
    }
    return option;
  }

  save(): void {
    this.isSaving = true;
    const vehicule = this.createFromForm();
    if (vehicule.id != null && vehicule.id !== undefined) {
      this.subscribeToSaveResponse(this.vehiculeService.update(vehicule));
    } else {
      this.subscribeToSaveResponse(this.vehiculeService.create(vehicule));
    }
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IVehicule>>
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
        ? "Le Vehicule a été modifié avec succés"
        : "Le Vehicule a été ajoutée avec succés";
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

  protected updateForm(vehicule: IVehicule): void {
    this.editForm.patchValue({
      id: vehicule.id,
      numInventaire:vehicule.numInventaire,
      matricule: vehicule.matricule,
      matriculeAr: vehicule.matriculeAr,
      cartegriseVehicule: vehicule.cartegriseVehicule,
      modele: vehicule.modele,
      carburant: this.getKeyEnumCarburant(vehicule.carburant) ,
      statutVehicule: vehicule.statutVehicule,
      puissanceFiscale: vehicule.puissanceFiscale,
      nombrePlaces: vehicule.nombrePlaces,
      dateAcquisition: vehicule.dateAcquisition
        ? vehicule.dateAcquisition.format(DATE_TIME_FORMAT)
        : null,
      entiteBenificiaire: vehicule.entiteBenificiaire,
      entiteBenificiaireAR: vehicule.entiteBenificiaireAR,
      compteur: vehicule.compteur,
      consommation: vehicule.consommation,
      numeroChassis: vehicule.numeroChassis,
      origin: vehicule.origin,
      etatVehicule: this.getKeyEnumEtatVehicule(vehicule.etatVehicule),
      vidange: vehicule.vidange,
      marque: vehicule.marque,
      categorieVehicule: vehicule.categorieVehicule,
      accessoireVehicules: vehicule.accessoireVehicules,
    });

    this.marquesSharedCollection = this.marqueService.addMarqueToCollectionIfMissing(this.marquesSharedCollection, vehicule.marque);
    this.categorieVehiculesSharedCollection = this.categorieVehiculeService.addCategorieVehiculeToCollectionIfMissing(
      this.categorieVehiculesSharedCollection,
      vehicule.categorieVehicule
    );
    this.accessoireVehiculesSharedCollection = this.accessoireVehiculeService.addAccessoireVehiculeToCollectionIfMissing(
      this.accessoireVehiculesSharedCollection
    );
  }

  selectAccessoires(event:any){
    console.log(event)
  }
  protected loadRelationshipsOptions(): void {
    const criteria = [];
    criteria.push({
      key: "deleted.equals",
      value: false,
    });
    this.marqueService
      .query({
        criteria
      })
      .pipe(map((res: HttpResponse<IMarque[]>) => res.body))
      .pipe(
        map((marques: IMarque[]) =>
          this.marqueService.addMarqueToCollectionIfMissing(
            marques,
            this.editForm.get("marque")!.value
          )
        )
      )
      .subscribe(
        (marques: IMarque[]) => (this.marquesSharedCollection = marques)
      );

    this.categorieVehiculeService
      .query({
        criteria
      })
      .pipe(map((res: HttpResponse<ICategorieVehicule[]>) => res.body ))
      .pipe(
        map((categorieVehicules: ICategorieVehicule[]) =>
          this.categorieVehiculeService.addCategorieVehiculeToCollectionIfMissing(
            categorieVehicules,
            this.editForm.get("categorieVehicule")!.value
          )
        )
      )
      .subscribe(
        (categorieVehicules: ICategorieVehicule[]) =>
          (this.categorieVehiculesSharedCollection = categorieVehicules)
      );

      this.accessoireVehiculeService
      .query({
        criteria
      })
      .pipe(map((res: HttpResponse<IAccessoireVehicule[]>) => res.body ))
      .pipe(
        map((accessoireVehicules: IAccessoireVehicule[]) =>
          this.accessoireVehiculeService.addAccessoireVehiculeToCollectionIfMissing(
            accessoireVehicules,
            (this.editForm.get('accessoireVehicules')!.value)
          )
        )
      )
      .subscribe((accessoireVehicules: IAccessoireVehicule[]) => (this.accessoireVehiculesSharedCollection = accessoireVehicules));

  }
  private getValueEnumCarburant(key:String):any{
    if(key){
      if(key==='Diesel') {
        return TypeCarburant.Diesel
      }
      if(key==='Essence') {
        return TypeCarburant.Essence
      }
      if(key==='Melange') {
        return TypeCarburant.Melange
      }
      if(key==='Sans Plomb') {
        return TypeCarburant['Sans Plomb']
      }
    }
    return null;
  }
  private getKeyEnumCarburant(value:any):any{
    if(value){
      if(value==='DIESEL') {
        return value==='Diesel';
      }
      if(value==='ESSENCE') {
        return 'Essence';
      }
      if(value==='MELANGE') {
        return 'Melange';
      }
      if(value==='SANSPLOMB') {
        return 'Sans Plomb';
      }
    }
    return null;
  }
  private getValueEnumEtatVehicule(key:any):any{
    if(key){
      if(key==='Bien') {
        return EtatVehicule.Bien;
      }
      if(key==='En panne') {
        return EtatVehicule['En panne'];
      }
      if(key==='En dommage') {
        return EtatVehicule['En dommage'];
      }
    }
    return null;
  }

  private getKeyEnumEtatVehicule(key:any):any{
    if(key){
      if(key=== 'BIEN') {
        return'Bien';
      }
      if(key=== 'EN_PANNE') {
        return 'En panne';
      }
      if(key=== 'ENDOMMAGE') {
        return 'En dommage';
      }
    }
    return null;
  }

  protected createFromForm(): IVehicule {
    return {
      ...new Vehicule(),
      id: this.editForm.get(["id"])!.value,
      numInventaire: this.editForm.get(["numInventaire"])!.value,
      matricule: this.editForm.get(["matricule"])!.value,
      matriculeAr: this.editForm.get(["matriculeAr"])!.value,
      cartegriseVehicule: this.editForm.get(["cartegriseVehicule"])!.value,
      modele: this.editForm.get(["modele"])!.value,
      carburant: this.getValueEnumCarburant(this.editForm.get(["carburant"])!.value) ,
      statutVehicule: this.editForm.get(["statutVehicule"])!.value ? this.editForm.get(["statutVehicule"])!.value : StatutVehicule['Disponible'],
      puissanceFiscale: this.editForm.get(["puissanceFiscale"])!.value,
      nombrePlaces: this.editForm.get(["nombrePlaces"])!.value,
      dateAcquisition: this.editForm.get(["dateAcquisition"])!.value
        ? dayjs(this.editForm.get(["dateAcquisition"])!.value, DATE_TIME_FORMAT)
        : undefined,
      entiteBenificiaire: this.editForm.get(["entiteBenificiaire"])!.value,
      entiteBenificiaireAR: this.editForm.get(["entiteBenificiaireAR"])!.value,
      compteur: this.editForm.get(["compteur"])!.value,
      consommation: this.editForm.get(["consommation"])!.value,
      numeroChassis: this.editForm.get(["numeroChassis"])!.value,
      origin: this.editForm.get(["origin"])!.value,
      etatVehicule: this.getValueEnumEtatVehicule(this.editForm.get(["etatVehicule"])!.value),
      vidange: 0 ,
      marque: this.editForm.get(["marque"])!.value,
      categorieVehicule: this.editForm.get(["categorieVehicule"])!.value,
      accessoireVehicules: this.editForm.get(['accessoireVehicules'])!.value,
    };
  }

  /**       **
   * End Edit*
   **       **/
  /*--------------------------------------------------------------------------------------------- */

  modalAjouterVehicule(content: any) {
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailVehicule(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (Vehicule) => {
        this.vehicule = Vehicule;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  modalModifierVehicule(content: any, data: any) {
    this.getItemById(data.id).subscribe(
      (Vehicule) => {
        console.log(Vehicule)
        this.updateForm(Vehicule);

     console.log(this.selectedItems)
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  getItemById(id: number): Observable<IVehicule> | Observable<never> {
    if (id) {
      return this.vehiculeService.find(id).pipe(
        mergeMap((Vehicule: HttpResponse<Vehicule>) => {
          if (Vehicule.body) {
            return of(Vehicule.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(new Vehicule());
  }

  modalSupprimerVehicule(content: any, data: any) {
    this.getItemById(data).subscribe(
      (Vehicule) => {
        this.vehicule = Vehicule;
        this.modalService.open(content, {
          size: "lg",
        });
      },
      (err) => {},
      () => {}
    );
  }

  confirmDelete(data: any): void {
    this.vehiculeService.delete(data).subscribe(() => {
      this.modalService.dismissAll();
      Swal.fire({
        title: "Le Vehicule avec l'identifiant "+ this.vehicule.matricule +" a été supprimé",
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

  ajouterInfoVehicule() {
    this.save();
  }

  modifierInfoVehicule() {
    this.save();
  }

  supprimerInfoVehicule() {
    this.confirmDelete(this.vehicule.id);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
