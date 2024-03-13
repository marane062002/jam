import { element } from 'protractor';
import { InitFormPatrimoineDTO } from './../dtos/InitFormPatrimoineDTO';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { NotificationType } from '../../../shared/NotificationMessage.service';
import { PatrimoineService } from '../../services/patrimoine.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ModelAddTypeComponent } from '../model-add-type/model-add-type.component';
import * as $ from "jquery";


@Component({
  selector: 'kt-patrimoine-new',
  templateUrl: './patrimoine-new.component.html',
  styleUrls: ['./patrimoine-new.component.scss']
})
export class PatrimoineNewComponent implements OnInit {
  // ==================================================================
  //
  // ==================================================================
  loading = false;
  patrimoineForm: FormGroup;
  divisions: any[] = [];
  origines: any[] = [];
  types: any[] = [];
  references: any[] = [];
  villes: any[] = [];
  arrondissements: any[] = [];

  allpjs = [];

  showAddDoc = false;

  displayedColumns1 = ["nomDoc", "actions"];


  formPj = { selecetedFile: {} };

  animal: string;
  name: string;
  dataSource1: MatTableDataSource<any>;

  typesEspaceVert: any = [
    { libelle: "Lampadaire", total: 0 },
    { libelle: "Chaises", total: 0 },
    { libelle: "Poubelles", total: 0 },
    { libelle: "Statuts", total: 0 },
    { libelle: "Arbres", total: 0 },
    { libelle: "Panneaupublicitaire", total: 0 },
    { libelle: "Panneausignalétique", total: 0 },
    { libelle: "voieries", total: 0 },
    { libelle: "Pont", total: 0 },
    { libelle: "Rondpoint", total: 0 },
    { libelle: "Fontaine", total: 0 },
    { libelle: "Passagesousterrain", total: 0 },
    { libelle: "Tremie", total: 0 }
  ]


  openDialog(): void {
    const dialogRef = this.dialog.open(ModelAddTypeComponent, {
      width: '500px',
      data: this.typesEspaceVert,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.patrimoineForm.get("categorieMeubles").setValue(result);
      //  console.log(result);
    });
  }

  // ==================================================================
  //
  // ==================================================================
  constructor(
    private service: PatrimoineService,
    private notification: NotificationService,
    private translate: TranslateService,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.getData()
  }
  // ==================================================================
  //
  // ==================================================================
  ngOnInit() {

    this.patrimoineForm = this.fb.group({

      libelle: [''],
      observation: [null],
      numEnregistrement: [''],
      dateEnregistrement: [new Date().toISOString()],
      dateInscription: [new Date().toISOString()],
      typeSpecialite: [''],
      superficie: [0],
      adresse: [null],
      prixAquisition: [null],
      dateEnreCF: [],
      idDivision: [12, Validators.required],
      numEnregistrementCF: [null],
      type: [null, Validators.required],
      //originPatrimoin: [null, Validators.required],
      originPatrimoinText: [null, Validators.required],
      refFonciere: [null, Validators.required],
      ville: [null, Validators.required],
      arrondissement: [null],
      naturePAtrimoine: [null],
      categorieMarche: [null],
      categorieVoies: [null],
      typeCategorieMarche: [null],
      classeMarche: [null],
      typeEspaceVert: [null],
      categorieMeubles: [null],
      statutMarche: [null],
      createurUser: [window.localStorage.getItem("fullnameUser")],
      typePropriete: [null],
      typeProprieteLibre: [null]
    })

    this.patrimoineForm.get('arrondissement').disable();

  }
  // ==================================================================
  //
  // ==================================================================
  get f() { return this.patrimoineForm ? this.patrimoineForm.controls : null; }
  // ==================================================================
  //
  // ==================================================================
  getData() {
    this.service.getInitformPatrimoine()
      .subscribe((obj: InitFormPatrimoineDTO) => {
        this.origines = obj.origines;
        this.types = obj.typepatrimoines;
        this.divisions = obj.divisions;
        this.references = obj.typeReferenceFoncieres;
        //this.specialites = data[4];
        this.villes = obj.villePatrimoines;
        this.arrondissements = obj.arrondissementPatrimoines;

      }, err => {
        console.log(err);
      }
      );
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

  onDeletePj(id: number): void {
    this.allpjs.splice(id, 1);
    if (this.allpjs.length > 0) {
      this.dataSource1 = new MatTableDataSource(this.allpjs);
    } else {
      this.dataSource1 = null;
    }
  }


  onSelecteTypePatrimoine(event) {
    this.patrimoineForm.get("categorieMarche").setValue(null);
    this.patrimoineForm.get("categorieVoies").setValue(null);
    this.patrimoineForm.get("typeCategorieMarche").setValue(null);
    this.patrimoineForm.get("typeEspaceVert").setValue(null);
    this.patrimoineForm.get("categorieMeubles").setValue(null);
  }

  getTypesByNaturePAtrimoine(): any[] {
    //  console.log(this.patrimoineForm.value);
    if (this.patrimoineForm.value.naturePAtrimoine)
      return this.types.filter((element) => element.naturePatrimoine == this.patrimoineForm.value.naturePAtrimoine);
    return [];
  }
  // ==================================================================
  //
  // ==================================================================
  onSelectVille() {
    let ville = this.patrimoineForm.get('ville').value;


    if (ville.id == 1) {
      this.patrimoineForm.get('arrondissement').enable();
      this.patrimoineForm.get('arrondissement').reset();

    }
    else {
      this.patrimoineForm.get('arrondissement').disable();
      this.patrimoineForm.get('arrondissement').reset();

    }
  }
  addTopeEspace(objetChoisi: any) {

    this.modalService.open(objetChoisi, { size: 'xl' });

  }
  // ==================================================================
  //
  // ==================================================================
  ajouterMvmL() {
    /*   this.l.push(this.fb.group({
       libelle: ['', Validators.compose([
               Validators.required,
                   ])
                   ],
       dateActe:[null, Validators.required],

       montant:[null],
       duree:[null],
       datePaiement:[null],
       dateFinActe:[null],

           })); */
  }
  // ==================================================================
  //
  // ==================================================================
  onSubmit() {
    if (this.patrimoineForm.get('typeProprieteLibre').value != null) {
      this.patrimoineForm.get('typePropriete').setValue(this.patrimoineForm.get('typeProprieteLibre').value);
      this.patrimoineForm.get('typeProprieteLibre').reset();
    }
    const formValues = this.patrimoineForm.value
    const controls = this.patrimoineForm.controls;
    /** check form */
    if (this.patrimoineForm.invalid) {

      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    const patrimoine: any = Object.assign({}, formValues);
    console.log('patrimoin data : ' + patrimoine)
    this.service.savePatrimoine(patrimoine)
      .subscribe(data => {
        if (this.allpjs.length > 0) {
          for (var i = 0; i < this.allpjs.length; i++) {
            this.service.nouvellepj(this.allpjs[i].selecetedFile, data["id"], "Pc")
              .subscribe((data) => {
                console.log("C: " + JSON.stringify(data, null, 2));
              });
          }
        }

        this.notification.sendMessage({
          message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
          type: NotificationType.success
        });

        if (this.patrimoineForm.get('naturePAtrimoine').value == "publique") {
          this.router.navigate(['patrimoine/exploitation-domaine-public-new'], { queryParams: { id: data["id"] } })
        }

        if (this.patrimoineForm.get('naturePAtrimoine').value == "prive") {

          if (this.patrimoineForm.get('type').value.id == "8") {
            this.router.navigate(['/marche/marche-new'], { queryParams: { id: data["id"] } })
            localStorage.setItem('idPatrimoine', JSON.stringify(data["id"]));
          }
          else {
            this.router.navigate(['patrimoine/exploitation-domaine-public-new'], { queryParams: { id: data["id"] } })
            //  this.router.navigate(['patrimoine/exploitation-domaine-prive-new'] , { queryParams: { id: data["id"] } })  
          }
        }
      },
        error => console.error(error)
      );
  }
  // ==================================================================
  //
  // ==================================================================
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.patrimoineForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  save(event: any): void {
    $("#test").val(event.target.files[0].name);
    this.formPj.selecetedFile = event.target.files;
  }

  validerPj() {
    this.allpjs.push(this.formPj);
    console.log(this.allpjs);
    this.dataSource1 = new MatTableDataSource(this.allpjs);
    this.showAddDoc = false;
    this.formPj = { selecetedFile: {} };
    $("#test").val(null);
  }


  back() {
    let id = parseInt(localStorage.getItem('idPatrimoine11122'));
    let id1 = parseInt(localStorage.getItem('idPatrimoine11133'));
    if (isNaN(id) && isNaN(id1)) {
      this.router.navigate(["/patrimoine/patrimoine-index"]);
    }
    if (!isNaN(id)) {
      this.router.navigate(['/patrimoine/patrimoine-show'], { queryParams: { id: id } })
    }
    if (!isNaN(id1)) {
      this.router.navigate(['/patrimoine/patrimoine-show'], { queryParams: { id: id1 } })
    }
  }
}



