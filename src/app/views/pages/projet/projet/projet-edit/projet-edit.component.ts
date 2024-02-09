import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../../services/projet.service';
import { PersonnelService } from '../../../rh/services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import * as $ from "jquery";
import { JsonPipe, Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { AoService } from '../../../shared/ao.service';
import { NgxSpinnerService } from 'ngx-spinner';


interface natureDepense {
  id: number;
  libelle: string;
  libelleFR: string;
}

@Component({
  selector: 'kt-projet-edit',
  templateUrl: './projet-edit.component.html',
  styleUrls: ['./projet-edit.component.scss']
})
export class ProjetEditComponent implements OnInit {

  convertPerstataire: number;
  //natureDepenses: natureDepense[];
  natureDepenses: any;
  loading = false;
  projetForm: FormGroup;
  divisions: any;
  prestataires: any;
  sousSources: any;
  souSources: any;
  sousTypes: any;
  sources: any;
  types: any;
  services: any;
  statuts: any;
  personnels: any;
  arrondissements: any;
  dateErr = false;
  addForm2: FormGroup;
  uploadFiles2: Array<File>;
  type2: string;

  addFormphase: FormGroup;
  uploadFilesphase: Array<File>;
  type: string;
  id: number;
  ob: any;
  checkLang: string;
  adjudicataire: Adjudicataire[] = [];
  adjudicataireArray: any;
  // ==========================================================
  //
  // ==========================================================
  constructor(private service: ProjetService,
    private servicePersonnel: PersonnelService,
    private organisationService: OrganisationService,
    private serviceMarche: AoService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private translate: TranslateService,
    private fileUtil: FilesUtilsService,
    private SpinnerService: NgxSpinnerService,
  ) {
    this.checkLang = window.localStorage.getItem("language");

    // liste des natures depenses
    /*
    this.natureDepenses = [
      { id: 1, libelle: "صفقة", libelleFR: "Marché" },
      { id: 2, libelle: "أمر شراء", libelleFR: "Bon de commande" },
      { id: 3, libelle: "إتفاقية", libelleFR: "Convention" },
    ];
    */
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.projetForm = this.fb.group({
      id: [this.id],
      designation: ['', Validators.required],
      numeroMarche: ['', Validators.required],
      dateDebutPrevue: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      dureeEstimee: ['', Validators.required],
      dateDebutReelle: ['', Validators.required],
      dateFinReelle: ['', Validators.required],
      dureeReelle: ['', Validators.required],
      idResponsableProjet: ['', Validators.required],
      idDivision: ['', Validators.required],
      idService: ['', Validators.required],
      budgetProjet: ['', Validators.required],
      arrondissements: [],
     // souSources: this.fb.group({ id: [], source: this.fb.group({ id: [] }) }),
      prestataire: [''],
      type: this.fb.group({ id: [] }),
      //source: this.fb.group({ id: [] }),
      statut: this.fb.group({ id: [] }),
      sousType: this.fb.group({ id: [], type: this.fb.group({ id: [] }) }),
      //souSource: this.fb.group({ id: [], source: this.fb.group({ id: [] }) }),
      souSources: [null, Validators.required],
      souSource: [null, Validators.required],
      types: ['', Validators.required],
      // sources: ['', Validators.required],
      natureDepence: this.fb.group({ id: [] }),
      bureau_d_etude: [''],
      bureau_de_controle: [''],
      architecte: [''],
      laboratoire: [''],
      phases: new FormArray([])

    })

    this.addForm2 = this.fb.group({
      _file: []
    });

    setTimeout(() => { this.SpinnerService.show() }, 25);

    this.service.
      getProjetById(this.id)
      .then(data => {
        console.log('data : ' + JSON.stringify(data, null, 4));
        this.projetForm.patchValue(data);
        this.projetForm.get('dateDebutPrevue').patchValue(new Date(data.dateDebutPrevue).toISOString())
        this.projetForm.get('dateDebutReelle').patchValue(new Date(data.dateDebutReelle).toISOString())
        this.projetForm.get('dateFinPrevue').patchValue(new Date(data.dateFinPrevue).toISOString())
        this.projetForm.get('dateFinReelle').patchValue(new Date(data.dateFinReelle).toISOString())
        if(data.souSources!=null){
          this.projetForm.get('souSource').patchValue(data.souSources.source);
          this.projetForm.get('souSources').patchValue(data.souSources);
        }


        console.log(this.projetForm.value)
        //this.projetForm.get('type').patchValue('stypeource');
        //this.projetForm.get('sousType').patchValue('sousType');
        setTimeout(() => { this.SpinnerService.hide() }, 2000);
      }, error => {
        console.log(error);
        setTimeout(() => { this.SpinnerService.hide() }, 2000);
      })

    this.getData();
    this.getArrondissement();
    this.getAllAdjudicataire();

    this.projetForm.get('sousType').valueChanges.subscribe(
      value => {
        if (value.type.id != null) {
          this.service.getSousTypes(value.type.id)
            .subscribe(data => {
              _this.sousTypes = data
            },
              error => console.log(error)
            );
        }
      }
    );

    this.projetForm.get('souSource').valueChanges.subscribe(
      value => {
        if (value.id != null) {
          this.service.getSousSources(value.id)
            .subscribe(data => {
              _this.souSources = data
            },
              error => console.log(error)
            );
        }
      }
    );

    const _this = this; // important !!!
    this.projetForm.get('idDivision').valueChanges.subscribe(
      value => {
        if (value != 0) {
          this.organisationService.getRessourceById(value, '/services/divisions/')
            .subscribe(data => {
              _this.services = data;
            },
              error => console.log(error)
            );
        }
      }
    );

    this.projetForm.get('idService').valueChanges.subscribe(
      value => {
        if (value != 0) {
          this.servicePersonnel.getRessourceById(value, '/personnels/service/')
            .then(data => {
              _this.personnels = data;
            },
              error => console.log(error)
            );
        }
        this.projetForm.get('idDivision').valueChanges.subscribe(
          value => {
            if (value != 0) {
              this.servicePersonnel.getRessourceById(value, '/personnels/division/')
                .then(data => {
                  _this.personnels = data;
                },
                  error => console.log(error)
                );
            }
          }
        );
      }
    );
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

    this.fileUtil.fileSizeDetector();
  }
  compareWithID(val1, val2) {
    if(val1 && val2)
    return val1.id === val2.id;

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
  getDivisions() {
    this.service
      .getProjets()
      .then((data) => (this.divisions = data));
  }
  // ==========================================================
  //
  // ==========================================================
  getServices(ob) {
    const id = ob.value.id
    this.organisationService.getDivisionServices(id)
      .subscribe(data => this.services = data)
  }
  // ==========================================================
  //
  // ==========================================================
  getPersonnels(ob) {
    const id = ob.value.id
    this.servicePersonnel.getPersonnelsByService(id)
      .subscribe(data => this.services = data)
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
  getSousSources(ob) {

    const id = ob.value.id
    // console.log("Sous sources :: " +JSON.stringify(ob,null,2))
    let sou = this.projetForm.get('souSources').value;
    console.log("Sous sources :: " + JSON.stringify(sou, null, 2))
    if (sou != null) {
      this.service.getSousSources(sou.source.id)
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
  getSousTypes(ob) {

    const id = ob.value
    console.log("Type projet : " + id)
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
  compare(val1, val2) {
    if (val1 && val2)
      return val1.id === val2.id;

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
        this.types = data[0];
        this.statuts = data[1];
        this.divisions = data[2];
        //this.prestataires = data[3];
        this.sources = data[3];
        this.natureDepenses = data[4];
      }, err => {
        console.log(err);
      }
      );
  }

  // ==========================================================
  //
  // ==========================================================
  getAllAdjudicataire() {
    this.adjudicataire = [];
    this.serviceMarche.getAllAttributeurs().then(
      (data) => {
        this.adjudicataireArray = data;
        //console.log("Tableau :: "+ JSON.stringify(this.adjudicataireArray,null,2));
        for (let i = 0; i < this.adjudicataireArray.length; i++) {
          this.adjudicataire.push(this.createNewLigne(i));
        }
        this.prestataires = this.adjudicataire;
        // console.log("Prestataire :: "+ JSON.stringify(this.prestataires,null,2));
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createNewLigne(i: number): Adjudicataire {
    return {
      id: +this.adjudicataireArray[i][0],
      nom: this.adjudicataireArray[i][1],
      tel: this.adjudicataireArray[i][2],
      mail: this.adjudicataireArray[i][3],
      rc: this.adjudicataireArray[i][4],
      ice: this.adjudicataireArray[i][5],
      idFisc: this.adjudicataireArray[i][6],
      adresse: this.adjudicataireArray[i][7],
    };
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
      dureeEstimee: [null],
      dateDebutReelle: [null],
      dateFinReelle: [null],
      dureeReelle: [null],
      budgetPhase: [null],
      statut: [null, Validators.required],
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
  onSubmit() {

    this.convertPerstataire = + this.projetForm.get('prestataire').value;
    this.projetForm.get('prestataire').setValue(this.convertPerstataire);
    const formValues = this.projetForm.value
    console.log("PROJET :: " + JSON.stringify(formValues, null, 2));
   
    /** check form */
  /*   if (this.projetForm.invalid) {
      console.log("invalide form")
      Object.keys(this.projetForm.controls).forEach(controlName =>
        this.projetForm.controls[controlName].markAsTouched()
      );
      return;
    } */
    this.loading = true;
    const projet: any = Object.assign({}, formValues);
    console.log(projet)

    this.service.updateProjet(projet, projet.id)
      // this.service.saveProjet(projet)
      .subscribe(data => {
        console.log(data)
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
  // ==========================================================
  //
  // ==========================================================
  back() {
    this.location.back()
  }
  // ==========================================================
  //
  // ==========================================================
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
  onChangeDivision() {

    const idDivision = this.projetForm.get('idDivision').value;
    if (idDivision != 0) {
      this.servicePersonnel
        .getRessourceById(idDivision, "/personnels/division/")
        .then(
          (data) => {
            this.personnels = data;
          },
          (error) => console.log(error)
        );
      this.organisationService
        .getRessourceById(idDivision, "/services/divisions/")
        .subscribe(
          (data) => {
            this.services = data;
          },
          (error) => console.log(error)
        );
    } else {
      this.services = null;
      this.personnels = null;
    }
    // =============================================
    // if (id != 0) {
    //   this.projetForm.get('idResponsableProjet').enable()
    //   this.projetForm.get('idService').enable()
    //   this.organisationService.getDivisionServices(id)
    //     .subscribe(data => {
    //       this.services = data
    //       console.log(this.services)
    //     },
    //       error => console.log(error)
    //     );

    //   // this.servicePersonnel.getPersonnelsByDivision(id)
    //   // .then(data =>{ this.personnels =data   
    //   //   console.log(this.personnels)
    //   //    },
    //   //   error => console.log(error)
    //   // );

    // } else {
    //   this.projetForm.get('idService').setValue(null)
    //   //    this.projetForm.get('idService').disable()

    //   this.projetForm.get('idResponsableProjet').setValue(null)
    //   //    this.projetForm.get('idResponsableProjet').disable()
    // }

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
      //    this.projetForm.get('idResponsableProjet').disable()
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
export interface Adjudicataire {
  id: number;
  nom: string;
  tel: string;
  mail: string;
  rc: string;
  ice: string;
  idFisc: string;
  adresse: string;
}