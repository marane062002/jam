
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { IMarque } from '../common/models/marque.model';
import { ICategorieVehicule } from '../common/models/categorie-vehicule.model';
import { TypeCarburant } from '../common/enumerations/type-carburant.model';
import { EtatVehicule } from '../common/enumerations/etat-vehicule.model';
import { IAccessoireVehicule } from '../common/models/accessoire-vehicule.model';
import { MarqueService } from '../../gestion-parc-auto/parametrage/marques/service/marque.service';
import { CategorieVehiculeService } from '../../gestion-parc-auto/parametrage/categorie-vehicule/services/categorie-vehicule.service';
import { VehiculeService } from '../../pesee/Services/vehicule.service';
import { AccessoireVehiculeService } from '../../gestion-parc-auto/parametrage/accessoireVehicule/services/accessoire-vehicule.service';
import { IVehicule, Vehicule } from '../common/models/vehicule.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { StatutVehicule } from '../common/enumerations/statut-vehicule.model';
import { DATE_TIME_FORMAT } from '../common/config/input.constants';
import dayjs from 'dayjs/esm';
// import {IMarque} from "../../../../common/models/marque.model";
// import {MarqueService} from "../../../marques/service/marque.service";
// import {ICategorieVehicule} from "../../../../common/models/categorie-vehicule.model";
// import {TypeCarburant} from "../../../../common/enumerations/type-carburant.model";
// import {EtatVehicule} from "../../../../common/enumerations/etat-vehicule.model";
// import {IAccessoireVehicule} from "../../../../common/models/accessoire-vehicule.model";
// import { finalize, mergeMap ,map } from 'rxjs/operators';
// import { HttpResponse } from '@angular/common/http';
// import { CategorieVehiculeService } from '../../../categorie-vehicule/services/categorie-vehicule.service';
// import { AccessoireVehiculeService } from '../../../accessoireVehicule/services/accessoire-vehicule.service';
// import { VehiculeService } from '../../services/vehicule.service';
// import dayjs from 'dayjs/esm';
// import { DATE_TIME_FORMAT } from '../../../../common/config/input.constants';
// import { IVehicule, Vehicule }  from '../../../../../../../core/_base/layout/models/vehicule';;
// import Swal, { SweetAlertResult } from 'sweetalert2';
// import { Observable } from 'rxjs';
// import { StatutVehicule } from '../../../../common/enumerations/statut-vehicule.model';


@Component({
  selector: 'kt-add-vehicules',
  templateUrl: './add-vehicules.component.html',
  styleUrls: ['./add-vehicules.component.scss']
})
export class AddVehiculesComponent implements OnInit {
  editForm:FormGroup;
  marquesSharedCollection: IMarque[] = [];
  categorieVehiculesSharedCollection: ICategorieVehicule[] = [];
  typeCarburantValues = Object.keys(TypeCarburant);
  etatVehiculeValues = Object.keys(EtatVehicule);
  dropdownList: any[] = [];
  selectedItems: any[];
  accessoireVehiculesSharedCollection: IAccessoireVehicule[] = [];
  constructor(protected fb: FormBuilder,protected marqueService: MarqueService,
    protected categorieVehiculeService: CategorieVehiculeService,
    protected vehiculeService: VehiculeService,
    protected accessoireVehiculeService: AccessoireVehiculeService,) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
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
     // vidange: [null, [Validators.required, Validators.min(0)]],
      marque: [null, Validators.required],
      categorieVehicule: [null, Validators.required],
      accessoireVehicules: [null, Validators.required],
    });
    this.loadRelationshipsOptions();
  }

  trackMarqueById(_index: number, item: IMarque): number {
    return item.id!;
  }
  trackCategorieVehiculeById(_index: number, item: ICategorieVehicule): number {
    return item.id!;
  }
  selectAccessoires(event:any){
    console.log(event)
  }

  ajouterInfoVehicule() {
    this.save();
  }
  save(): void {
    //this.isSaving = true;
    const vehicule = this.createFromForm();
    if (vehicule.id != null && vehicule.id !== undefined) {
      this.subscribeToSaveResponse(this.vehiculeService.updateVehicule(vehicule));
    } else {
      this.subscribeToSaveResponse(this.vehiculeService.createVehicule(vehicule));
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

    let id = this.editForm.get(["id"])!.value;
    let title: String = id != null && id !== undefined  ? "Le Vehicule a été modifié avec succés"   : "Le Vehicule a été ajoutée avec succés";
          Swal.fire({
            title: title,
            icon: "success",
          })
    
  }

  previousState(): void {}

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    //this.isSaving = false;
  }

  protected createFromForm(): any {
    return {
      ...new Vehicule(),
      id: this.editForm.get(["id"])!.value,
      numInventaire: this.editForm.get(["numInventaire"])!.value,
      matricule: this.editForm.get(["matricule"])!.value,
      matriculeAr: this.editForm.get(["matriculeAr"])!.value,
      cartegriseVehicule: this.editForm.get(["cartegriseVehicule"])!.value,
      modele: this.editForm.get(["modele"])!.value,
      carburant: this.getValueEnumCarburant(this.editForm.get(["carburant"])!.value) ,
     statutVehicule: StatutVehicule['Disponible'],
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

}

