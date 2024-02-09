import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProjetService } from '../../services/projet.service';
import { Router } from '@angular/router';

import { PersonnelService } from '../../../rh/services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';

import * as $ from "jquery";
import { MatSelect, MatSelectChange } from '@angular/material';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { AoService } from '../../../shared/ao.service';
import { ProgrammeService } from '../../../shared/ProgrammeService';
import { ConventionMarcheService } from '../../../shared/conventionService';

interface natureDepense {
  id: number;
  libelle: string;
  libelleFR: string;
}

@Component({
  selector: 'kt-projet-new',
  templateUrl: './projet-new.component.html',
  styleUrls: ['./projet-new.component.scss']
})
export class ProjetNewComponent implements OnInit {

  //natureDepenses: natureDepense[];
  natureDepenses: any;
  loading = false;
  projetForm: FormGroup;
  divisions: any;
  isSelected:false;
  isVisible=1;
  isVisible3=1;
  services: any;
  arrondissements: any;
  prestataires: any;
  types: any;
  sousTypes: any;
  sources: any;
  sousSources: any;
  souSources: any;
  statuts: any;
  personnels: any;
  dateErr = false;
  addForm2: FormGroup;
  uploadFiles2: Array<File>;
  type2: string;

  selectedList: string;
  selected: number;

  addFormphase: FormGroup;
  uploadFilesphase: Array<File>;
  type: string;
  checkLang: string;

  convertPerstataire: number;
  listprogramme;
  listConvention
  listMarches

  // ==========================================================
  //
  // ==========================================================
  // Select change paramettre
  @ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  // ==========================================================
  //
  // ==========================================================
  constructor(private service: ProjetService,
    private servicePersonnel: PersonnelService,
    private organisationService: OrganisationService,
    private serviceMarche: AoService,
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService,
    private fileUtil: FilesUtilsService,
    private serviceAo: AoService,
    private conventionMarcheService:ConventionMarcheService
  ) {
    this.checkLang = window.localStorage.getItem("language");
   
    this.getData();
    this.getArrondissement();
    this.getAllAdjudicataire();
  
    //  this.getDivisions()
    // liste des natures depenses
    /*
    this.natureDepenses = [
      { id: 1, libelle: "صفقة", libelleFR: "Marché" },
      { id: 2, libelle: "أمر شراء", libelleFR: "Bon de commande" },
      { id: 3, libelle: "إتفاقية", libelleFR: "Convention" },
    ];
    */
  }
  // ==========================================================
  //
  // ==========================================================
  ngOnInit() {
    this.getPrestataire();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.checkLang = 'ar';
      } else if (event.lang == 'fr') {
        this.checkLang = 'fr';
      }
    });

  this.serviceAo.getAllMarche().then((data) => {
    this.listMarches=data;
}).catch(error => {

})

this.conventionMarcheService.all().subscribe(res=>{
  this.listConvention=res;
},err=>{
  console.log(err)
})
    this.projetForm = this.fb.group({

      designation: ['', Validators.required],
      numeroMarche: ['', Validators.required],
      dateDebutPrevue: [null],
      dateFinPrevue: [null],
      dureeEstimee: [0],
      dateDebutReelle: [null],
      dateFinReelle: [null],
      dureeReelle: [0],
      //typeFinancement: [''],
      //     arrondissement : [null],
      arrondissements: [{}, Validators.required],
      bureau_d_etude: [null],
      bureau_de_controle: [null],
      architecte: [null],
      laboratoire: [null],
      //commune: [null],
      natureDepence: [null, Validators.required],
      //      idResponsableProjet:[{value: null, disabled: true},Validators.required],
      idResponsableProjet: [ ],
      // idMarche: [{ value: null }, Validators.required],
      //      idService:[{value: null, disabled: true}, Validators.required],
      idService: [{ value: null }, Validators.required],

      idDivision: [null, Validators.required],
      budgetProjet: [0],
      prestataire: [null],
     
      type: [null, Validators.required],
      statut: [null, Validators.required],
      sousType: [null, Validators.required],
      //     souSource:[null, Validators.required],
      //    souSource:[{}, Validators.required],
      souSources: [null, Validators.required],
       souSource: [null, Validators.required],
       idProgrammme: [null],
       idConvention: [null],
      phases: new FormArray([])

    })
    this.addForm2 = this.fb.group({
      _file: []
    });

    this.fileUtil.fileSizeDetector();

  }
  // ==========================================================
  //
  // ==========================================================
  get f() { return this.projetForm ? this.projetForm.controls : null; }
  get p() { return this.f ? this.f.phases as FormArray : null; }
  // ==========================================================
  //
  // ==========================================================
  getData() {
    this.service.getDataProjet()
      .then(data => {
        console.log(data)
        this.types = data[0];
        this.statuts = data[1];
        this.divisions = data[2];
        this.sources = data[3];
        this.natureDepenses = data[4];
      }, err => {
        console.log(err);

      }
      );
  }
  public getPrestataire() {
    // this.service.getPrestataires()
    this.service.getPrestataires()
      .then(data => {
       
this.prestataires=data;
console.log(this.prestataires)
      }, err => {
        console.log(err);
      });
  }
  // ==========================================================
  //
  // ==========================================================
  getAllAdjudicataire() {
    this.serviceMarche.getAllAttributeurs().then(
      (data) => {
        this.prestataires = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // ==========================================================
  //
  // ==========================================================
  dateChange() {
    let dateFp = this.projetForm.controls['dateFinPrevue'].value
    let dateDp = this.projetForm.controls['dateDebutPrevue'].value

    if (dateFp && dateDp) {
      if (dateFp >= dateDp) {

        let diffc = dateFp.getTime() - dateDp.getTime();
        let duree = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
        this.projetForm.controls['dureeEstimee'].setValue(duree)

      } else
        this.dateErr = true
    }
  }
  // ==========================================================
  //
  // ==========================================================
  dateRChange() {
    let dateFp = this.projetForm.controls['dateFinReelle'].value
    let dateDp = this.projetForm.controls['dateDebutReelle'].value

    if (dateFp && dateDp) {
      if (dateFp >= dateDp) {
        let diffc = dateFp.getTime() - dateDp.getTime();
        let duree = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
        this.projetForm.controls['dureeReelle'].setValue(duree)
      } else
        this.dateErr = true
    }
  }
  // ==========================================================
  //
  // ==========================================================
  datePhaseChange(i) {

    let dateFp = this.p.controls[i].get('dateFinPrevue').value
    let dateDp = this.p.controls[i].get('dateDebutPrevue').value

    if (dateFp && dateDp) {
      if (dateFp >= dateDp) {

        let diffc = dateFp.getTime() - dateDp.getTime();
        let duree = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
        this.p.controls[i].get('dureeEstimee').setValue(duree)

      } else
        this.dateErr = true

    }
  }
  // ==========================================================
  //
  // ==========================================================
  datePhaseRChange(i) {

    let dateFp = this.p.controls[i].get('dateFinReelle').value
    let dateDp = this.p.controls[i].get('dateDebutReelle').value

    if (dateFp && dateDp) {
      if (dateFp >= dateDp) {

        let diffc = dateFp.getTime() - dateDp.getTime();
        let duree = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
        this.p.controls[i].get('dureeReelle').setValue(duree)

      } else
        this.dateErr = true
    }
  }
  // ==========================================================
  //
  // ==========================================================
  ajouterPhase() {
    this.p.push(this.fb.group({
      designation: ['', Validators.compose([
        Validators.required,
      ])
      ],
      descriptif: [null],

      dateDebutPrevue: [null],
      dateFinPrevue: [null],
      dureeEstimee: [0],
      dateDebutReelle: [null],
      dateFinReelle: [null],
      dureeReelle: [0],
      budgetPhase: [0],
      //    statut:[null, Validators.required],
      statut: [null],
    }));

    /*  this.addFormphase = this.fb.group({
       _file: []
     }); */
  }
  // ==========================================================
  //
  // ==========================================================
  deletePhase(i) {
    this.p.removeAt(i)
  }
  // ==========================================================
  //
  // ==========================================================
  getArrondissement() {
    this.service.getArrondissement()
      .then(data => { this.arrondissements = data })
  }
  // ==========================================================
  //
  // ==========================================================
  onSubmit() {
    this.convertPerstataire = + this.projetForm.get('prestataire').value;
    this.projetForm.get('prestataire').setValue(this.convertPerstataire);
    const formValues = this.projetForm.value
    const controls = this.projetForm.controls;
    /** check form */
    if (this.projetForm.invalid) {

      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    const projet: any = Object.assign({}, formValues);
    //console.log("PROJET TEST ::: " + JSON.stringify(projet, null, 2))

    this.service.saveProjet(projet)
      .subscribe(data => {
        console.log(projet)
        let m: any = Object.assign({}, data);

        if (this.uploadFiles2)
          this.service.updloadFilet(this.uploadFiles2, m.id, this.type2, '/PjProjets/multiplefile')
            .subscribe(resp => { console.log(resp) },
              error => console.log(error))
        this.router.navigate(['projet/projet-index'])
      },
        error => console.log(error)
      );
  }

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.projetForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  // ==========================================================
  //
  // ==========================================================
  getSousTypes(ob) {

    const id = ob.value.id
    console.log(id)
    if (id != null) {

      this.service.getSousTypes(id)
        .subscribe(data => {
          this.sousTypes = data,
            console.log(this.sousTypes)
        },
          error => console.log(error)
        );
    }
  }
  // ==========================================================
  //
  // ==========================================================
  getSousSources(ob) {

    const id = ob.value.id
    console.log(id)
    if (id != null) {

      this.service.getSousSources(id)
        .subscribe(data => {
          this.souSources = data,
            console.log(this.souSources)
        },
          error => console.log(error)
        );
    }
  }
  // ==========================================================
  //
  // ==========================================================
  //// SouSSOurce based on child/parent Compenet////

  onChange: any = () => { };
  onTouched: any = () => { };

  selectionTypeChanged(event: MatSelectChange) {
    this.selectionChange.emit(
      new MatSelectChange(this.matSelect, event.value)
    );
    this.valueChange.emit(event.value);
    this.onChange(event.value);
    this.onTouched();
    console.log("value changed : " + event.value);
    this.selected = event.value;
    console.log("touched type");
    this.getSousSources(this.selected);
  }
  // ==========================================================
  //
  // ==========================================================
  onChangeDivision() {

    const id = this.projetForm.get('idDivision').value
    if (id != 0) {
      this.projetForm.get('idResponsableProjet').enable()
      this.projetForm.get('idService').enable()
      this.organisationService.getDivisionServices(id)
        .subscribe(data => {
          this.services = data
          console.log(this.services)
        },
          error => console.log(error)
        );

      // this.servicePersonnel.getPersonnelsByDivision(id)
      // .then(data =>{ this.personnels =data   
      //   console.log(this.personnels)
      //    },
      //   error => console.log(error)
      // );

    } else {
      this.projetForm.get('idService').setValue(null)
      //   this.projetForm.get('idService').disable()

      this.projetForm.get('idResponsableProjet').setValue(null)
      //   this.projetForm.get('idResponsableProjet').disable()
    }

  }
  // ==========================================================
  //
  // ==========================================================
  onChangeService() {
    const id = this.projetForm.get('idService').value
    if (id != 0) {
      this.projetForm.get('idResponsableProjet').enable()
      this.servicePersonnel.getPersonnelsByService(id)
        //  this.servicePersonnel.getPersonnelsByDivision(id)
        .subscribe(data => {
          this.personnels = data
          console.log(this.personnels)
        },
          error => console.log(error)
        );
    } else {
      this.projetForm.get('idResponsableProjet').setValue(null)
      //   this.projetForm.get('idResponsableProjet').disable()
    }
  }

  // ============================================
  // Upload file event
  // ============================================

  fileChange2(event, type) {
    this.uploadFiles2 = event.target.files;
    this.type2 = type

    if (event.target.files.length > 0) {
      console.log("target : " + event.target.files.length);

      this.addForm2.patchValue(this.uploadFiles2);

    }
  }
  fileChangephase(event, type) {
    this.uploadFilesphase = event.target.files;
    this.type = type

    if (event.target.files.length > 0) {
      console.log("target : " + event.target.files.length);

      this.addFormphase.patchValue(this.uploadFilesphase);

    }
  }
}
/*
export interface Adjudicataire {
	id: string;
	nom: string;
	type: String;
	adresse: string;
	arrondissement: string;
  quartier: string;
}
*/