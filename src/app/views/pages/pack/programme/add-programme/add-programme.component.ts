import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2';
import { ConventionMarcheService } from '../../../shared/conventionService';
import { ProgrammePhase } from '../../../shared/ProgrammePhase';
import { ProgrammeService } from '../../../shared/ProgrammeService';
import * as _ from 'lodash';
import * as $ from "jquery";
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { Observable } from 'rxjs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { Location } from '@angular/common';
import { NatureService } from '../../../shared/Nature.service';
import { themeService } from '../../../shared/theme.service';
import { sousThemeService } from '../../../shared/sous-theme.service';
import { ArrondissementService } from '../../../shared/arrondissement.service';
@Component({
  selector: 'kt-add-programme',
  templateUrl: './add-programme.component.html',
  styleUrls: ['./add-programme.component.scss']
})
export class AddProgrammeComponent implements OnInit {
  arabicPattern = /^[\u0600-\u06FF\s]+$/;
  listeNature
  listeArrondissement
  listeSousTheme 
  checkLang = localStorage.getItem('language');
  formGroup: FormGroup;
  minDate: string;
  minDateReel: string;
  minDatePrevisionnel: string;
  programmePhaseBudgets: FormArray;
  sousProjets: FormArray;
  listConvention: any
  listPhase;
  programme_id: number = 0;
  showInputP2: boolean = false;
  showInputP1: boolean = false;
  isUpdate: boolean = false;
  disabled: boolean = false
  formPj = { type: 0, selecetedFile: {} };

  allpjs = [];
  codes = ["A", "B", "C", "D", "E", "F", "G", " H", "I", " J", "K", "L", "M", "N", " O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", " Y", "Z"]
  constructor(private Natureservice: NatureService, private arrondissementService: ArrondissementService,
    private router: Router, private location: Location,
    private conventionMarcheService: ConventionMarcheService,
    private translate: TranslateService,
    private fileUtils: FilesUtilsService,
    private programmeService: ProgrammeService,
    private programmePhase: ProgrammePhase,
    private Themeservice: themeService,
    private sousThemeservice: sousThemeService,
    private fB: FormBuilder,
    private activatedRoute: ActivatedRoute) {
    this.formGroup = new FormGroup({
      id: new FormControl(''),
      convention: new FormControl([]),
      programmePhaseBudgets: new FormArray([]),
      sousProjets: new FormArray([]),
      date: new FormControl(''),
      orientationStrategique: new FormControl(''),
      orientationStrategiqueAr: new FormControl(''),
      codeOrientation: new FormControl(''),
      axe: new FormControl(''),
      axeAr: new FormControl(''),
      codeAxe: new FormControl(''),
      objectifStrategique: new FormControl(''),
      objectifStrategiqueAr: new FormControl(''),
      objectifOperationnel: new FormControl(''),
      objectifOperationnelAr: new FormControl(''),
      numeroprojet: new FormControl(''),
      codeProjet: new FormControl(''),
      nameProjet: new FormControl(''),
      nameProjetAr: new FormControl(''),
      localisation: new FormControl(''),
      localisationAr: new FormControl(''),
      cout: new FormControl(''),
      montantReel: new FormControl(''),
      delai: new FormControl(''),
      montantRealisePA: new FormControl(''),
      montantRealiseDA: new FormControl(''),
      montantRealiseTA: new FormControl(''),
      montantRealiseQA: new FormControl(''),
      montantRealiseCA: new FormControl(''),
      montantRealiseSA: new FormControl(''),
      montantRealiseTotal: new FormControl(''),
      tauxContributionCommune: new FormControl(''),
      phase: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFin: new FormControl(''),
      description: new FormControl(''),
      chefProjet: new FormControl(''),
      chefProjetAr: new FormControl(''),
      nature: new FormGroup({ id: new FormControl('') }),
      theme: new FormGroup({ id: new FormControl('') }),
      sousTheme: new FormGroup({ id: new FormControl('') }),
      arrondissement: new FormGroup({ id: new FormControl('') }),
      niveau: new FormControl(''),
      maitreOuvrage: new FormControl(''),
      maitreOuvrageDelegue: new FormControl(''),
      sousProjet: new FormControl(''),
      etatAvancement: new FormControl(''),
      acheveDate: new FormControl('')
    });

    this.formGroup.get('dateDebut').valueChanges.subscribe((dateDebut: string) => {
      this.minDate = dateDebut;
    });
  }

  programmeEdit
  Visible: any;
  VisibleSousProjet: any;
  files: Observable<any>;
  files1: Observable<any>;

  etatAvanc: string = '';
  pageIndex
  pageSize
  isSelected: boolean = false;
  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == "ar") {
        this.checkLang = "ar";
      } else if (event.lang == "fr") {
        this.checkLang = "fr";
      }
    });
    this.Natureservice.findAll().then((res) => {
      this.listeNature = res

    })
    this.arrondissementService.findAllByPages().then((res: any) => {
      this.listeArrondissement = res.content

    })
    this.formGroup.get('dateDebut').valueChanges.subscribe((dateDebut: string) => {
      this.minDate = dateDebut;
    });
    localStorage.removeItem("eventCC");
    localStorage.removeItem("eventCP");
    this.activatedRoute.queryParams.subscribe(params => {
      this.programme_id = params['id'];
      this.pageIndex = params['pageIndex'];
      this.pageSize = params['pageSize'];

      if (this.programme_id != undefined && this.programme_id != 0) {
        this.isUpdate = true;
        this.programmeService.findById(this.programme_id).subscribe((res: any) => {
          if (res.cout != null) {
            res.cout = Number(res.cout);

          }

          for (let i = 0; i < res.sousProjets.length; i++) {
            if (res.sousProjets[i].constibutionC != null) {
              res.sousProjets[i].constibutionC = Number(res.sousProjets[i].constibutionC);

            }
          }



          for (let i = 0; i < res.programmePhaseBudgets.length; i++) {
            if (res.programmePhaseBudgets[i].contributionComune1 != null) {
              res.programmePhaseBudgets[i].contributionComune1 = res.programmePhaseBudgets[i].contributionComune1.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionComune2 != null) {
              res.programmePhaseBudgets[i].contributionComune2 = res.programmePhaseBudgets[i].contributionComune2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionComune3 != null) {
              res.programmePhaseBudgets[i].contributionComune3 = res.programmePhaseBudgets[i].contributionComune3.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionCommune != null) {
              res.programmePhaseBudgets[i].contributionCommune = res.programmePhaseBudgets[i].contributionCommune.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionPartenaires1 != null) {
              res.programmePhaseBudgets[i].contributionPartenaires1 = res.programmePhaseBudgets[i].contributionPartenaires1.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionPartenaires2 != null) {
              res.programmePhaseBudgets[i].contributionPartenaires2 = res.programmePhaseBudgets[i].contributionPartenaires2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionPartenaires3 != null) {
              res.programmePhaseBudgets[i].contributionPartenaires3 = res.programmePhaseBudgets[i].contributionPartenaires3.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionPartenaires != null) {
              res.programmePhaseBudgets[i].contributionPartenaires = res.programmePhaseBudgets[i].contributionPartenaires.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].totalContributionPremiereAnnee != null) {
              res.programmePhaseBudgets[i].totalContributionPremiereAnnee = res.programmePhaseBudgets[i].totalContributionPremiereAnnee.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee != null) {
              res.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee = res.programmePhaseBudgets[i].totalContributionDeuxiemeAnnee.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].totalContributionTroisiemeAnnee != null) {
              res.programmePhaseBudgets[i].totalContributionTroisiemeAnnee = res.programmePhaseBudgets[i].totalContributionTroisiemeAnnee.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].totalContribution != null) {
              res.programmePhaseBudgets[i].totalContribution = res.programmePhaseBudgets[i].totalContribution.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].montantDispoCommune3PA != null) {
              res.programmePhaseBudgets[i].montantDispoCommune3PA = res.programmePhaseBudgets[i].montantDispoCommune3PA.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].montantDispoCommune3DA != null) {
              res.programmePhaseBudgets[i].montantDispoCommune3DA = res.programmePhaseBudgets[i].montantDispoCommune3DA.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].montantIndispoCommune != null) {
              res.programmePhaseBudgets[i].montantIndispoCommune = res.programmePhaseBudgets[i].montantIndispoCommune.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }


            if (res.programmePhaseBudgets[i].contributionComune1P2 != null) {
              res.programmePhaseBudgets[i].contributionComune1P2 = res.programmePhaseBudgets[i].contributionComune1P2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionComune2P2 != null) {
              res.programmePhaseBudgets[i].contributionComune2P2 = res.programmePhaseBudgets[i].contributionComune2P2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionComune3P2 != null) {
              res.programmePhaseBudgets[i].contributionComune3P2 = res.programmePhaseBudgets[i].contributionComune3P2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionCommuneP2 != null) {
              res.programmePhaseBudgets[i].contributionCommuneP2 = res.programmePhaseBudgets[i].contributionCommuneP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionPartenaires1P2 != null) {
              res.programmePhaseBudgets[i].contributionPartenaires1P2 = res.programmePhaseBudgets[i].contributionPartenaires1P2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionPartenaires2P2 != null) {
              res.programmePhaseBudgets[i].contributionPartenaires2P2 = res.programmePhaseBudgets[i].contributionPartenaires2P2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionPartenaires3P2 != null) {
              res.programmePhaseBudgets[i].contributionPartenaires3P2 = res.programmePhaseBudgets[i].contributionPartenaires3P2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].contributionPartenairesP2 != null) {
              res.programmePhaseBudgets[i].contributionPartenairesP2 = res.programmePhaseBudgets[i].contributionPartenairesP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].totalContributionPremiereAnneeP2 != null) {
              res.programmePhaseBudgets[i].totalContributionPremiereAnneeP2 = res.programmePhaseBudgets[i].totalContributionPremiereAnneeP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].totalContributionDeuxiemeAnneeP2 != null) {
              res.programmePhaseBudgets[i].totalContributionDeuxiemeAnneeP2 = res.programmePhaseBudgets[i].totalContributionDeuxiemeAnneeP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].totalContributionTroisiemeAnneeP2 != null) {
              res.programmePhaseBudgets[i].totalContributionTroisiemeAnneeP2 = res.programmePhaseBudgets[i].totalContributionTroisiemeAnneeP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].totalContributionPh2 != null) {
              res.programmePhaseBudgets[i].totalContributionPh2 = res.programmePhaseBudgets[i].totalContributionPh2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].montantDispoCommune3PAP2 != null) {
              res.programmePhaseBudgets[i].montantDispoCommune3PAP2 = res.programmePhaseBudgets[i].montantDispoCommune3PAP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].montantDispoCommune3DAP2 != null) {
              res.programmePhaseBudgets[i].montantDispoCommune3DAP2 = res.programmePhaseBudgets[i].montantDispoCommune3DAP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
            if (res.programmePhaseBudgets[i].montantIndispoCommuneP2 != null) {
              res.programmePhaseBudgets[i].montantIndispoCommuneP2 = res.programmePhaseBudgets[i].montantIndispoCommuneP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
            }
          }
          this.programmeEdit = res;
          this.formGroup.patchValue(_.pickBy(res));
          this.formGroup.patchValue({
            nature: res.sousTheme.theme[0].nature[0],
            theme: res.sousTheme.theme[0],
            sousTheme: res.sousTheme

          })

          this.formGroup

          this.NatureChange(res.sousTheme.theme[0].nature[0].id)

          this.ThemeChange(res.sousTheme.theme[0].id)
          this.etatAvancement = res.etatAvancement;
          console.log(this.formGroup)
          if (res.sousProjets.length > 0) {
            this.initializArrayP(res.sousProjets);
            for (let i = 0; i < res.sousProjets.length; i++) {
              if (res.sousProjets[i].arrondissement != null) {
                this.Arrondissement1Change(res.sousProjets[i].arrondissement.id)
              }

            }

          } else {
            console.log("hjjjjjjjjjjjjjjjjjjj")
            this.addItemP();
          }
          if (res.programmePhaseBudgets.lenght != 0) {
            if (res.programmePhaseBudgets.length == 2) {
              this.initializArray1(res.programmePhaseBudgets[0]);
              this.initializArray2(res.programmePhaseBudgets[1]);
            }
            if (res.programmePhaseBudgets.length == 1) {
              if (res.programmePhaseBudgets[0].phase.id == 1) {
                this.initializArray1(res.programmePhaseBudgets[0]);
                this.addItem2();
              }
              if (res.programmePhaseBudgets[0].phase.id == 2) {
                this.addItem();
                this.initializArray2(res.programmePhaseBudgets[0]);

              }
            }
          } else {
            this.addItem();
            this.addItem2();
          }
          if (res.convention != null) {
            this.Visible = 1;
          }
          else {
            this.Visible = 0;
          }
          if (res.sousProjets.length != 0) {
            for (let i = 0; i < res.sousProjets.length; i++) {
              if (res.sousProjets[i].convention != null) {
                this.VisibleSousProjet = 1
              } else {
                this.VisibleSousProjet = 0

              }
            }
          }


        }, err => {
          console.log(err);
        })
      } else {
        this.addItem();
        this.addItem2();
        this.addItemP();

      }
      if (this.isUpdate == true) {
        this.files = this.programmeService.getByIdFiles(this.programme_id);
        this.programmeService.getByIdFiles(this.programme_id).subscribe(res => {
          this.files1 = res;
        })
      }
    }
    );

    this.conventionMarcheService.all().subscribe(res => {
      this.listConvention = res;
    })

    this.programmePhase.getPhases().subscribe(res => {
      this.listPhase = res;
    })

  }
  selectedNature(p1, p2) {
    if (p1 == p2) {

      return true;
    } else return false

  }
  selectedArrondissement(p1, p2) {
    if (p1 == p2) {

      return true;
    } else return false

  }
  selectedArrondissement1(p1, p2) {
    if (p1.id == p2.id) {

      return true;
    } else return false

  }
  etatAvancementRes;
  etatAvancement: any = "NON_LANCES";
  isP1: boolean = false;
  isP2: boolean = false;
  getValuePhase(event: any) {
    this.isP1 = false;
    this.isP2 = false;
    if (event == 1) {
      this.isP1 = true;
      this.isP2 = false;
    }
    if (event == 2) {
      this.isP2 = true;
      this.isP1 = false;
    }
  }
  onEtatAvancementChange(event) {
    if (this.programmeEdit.etatAvancement != this.etatAvancementRes) {
      this.etatAvancement = event.value;

    } else {
      this.etatAvancement = this.etatAvancement
    }
  }
  onEtatAvancementSousProjetChange(event) {

    this.etatAvancement = event.value

  }
  listeTheme = []
  NatureChange(e) {
    this.Themeservice.findByNature_Id(e).subscribe((res) => {
      this.listeTheme = res
    })
  }
  ThemeChange(e) {
    this.sousThemeservice.findByTheme_Id(e).subscribe((res) => {
      this.listeSousTheme = res

    })


  }
  formPhaseP1
  addItem(): void {
    this.formPhaseP1 = this.fB.group({
      phase: new FormGroup({
        id: new FormControl('')
      }),
      contributionComune1: new FormControl(''),
      contributionComune2: new FormControl(''),
      contributionComune3: new FormControl(''),
      contributionCommune: new FormControl(''),
      contributionPartenaires1: new FormControl(''),
      contributionPartenaires2: new FormControl(''),
      contributionPartenaires3: new FormControl(''),
      contributionPartenaires: new FormControl(''),
      totalContributionPremiereAnnee: new FormControl(''),
      totalContributionDeuxiemeAnnee: new FormControl(''),
      totalContributionTroisiemeAnnee: new FormControl(''),
      totalContribution: new FormControl(''),
      montantDispoCommune3PA: new FormControl(''),
      montantDispoCommune3DA: new FormControl(''),
      montantIndispoCommune: new FormControl(''),
    });


    this.getFormArray().push(this.formPhaseP1);
    this.sousProjets = this.getFormArray();
  }
  formPhaseP2
  addItem2(): void {
    this.formPhaseP2 = this.fB.group({
      phase: new FormGroup({
        id: new FormControl('')
      }),

      contributionComune1P2: new FormControl(''),
      contributionComune2P2: new FormControl(''),
      contributionComune3P2: new FormControl(''),
      contributionCommuneP2: new FormControl(''),
      contributionPartenaires1P2: new FormControl(''),
      contributionPartenaires2P2: new FormControl(''),
      contributionPartenaires3P2: new FormControl(''),
      contributionPartenairesP2: new FormControl(''),
      totalContributionPremiereAnneeP2: new FormControl(''),
      totalContributionDeuxiemeAnneeP2: new FormControl(''),
      totalContributionTroisiemeAnneeP2: new FormControl(''),
      totalContributionPh2: new FormControl(''),
      montantDispoCommune3PAP2: new FormControl(''),
      montantDispoCommune3DAP2: new FormControl(''),
      montantIndispoCommuneP2: new FormControl(''),
    });


    this.getFormArray().push(this.formPhaseP2);
    this.sousProjets = this.getFormArray();
  }

  form
  addItemP() {
    this.form = this.fB.group({
      id: new FormControl(''),
      object: new FormControl(''),
      numero: new FormControl(''),
      constibutionC: new FormControl(''),
      constibutionP: new FormControl(''),
      chefProjet: new FormControl(''),
      lieu: new FormControl(''),
      dateDebut: new FormControl(''),
      dateFine: new FormControl(''),
      dateDebutReel: new FormControl(''),
      dateFinReel: new FormControl(''),
      montantPrevisionnel: new FormControl(''),
      montantReel: new FormControl(''),
      tauxRealisation: new FormControl(''),
      arrondissement: new FormControl(),

      delais: new FormControl(''),
      codeSousProjet: new FormControl(''),
      delaisReel: new FormControl(''),
      observation: new FormControl(''),
      etatAvancement: new FormControl('NON_LANCES'),
      convention: new FormControl([]),
      maitreOuvrageDelegue: new FormControl(''),
    })
    this.form.get('dateDebut').valueChanges.subscribe((dateDebut: string) => {
      this.minDatePrevisionnel = dateDebut;
    });
    this.form.get('dateDebutReel').valueChanges.subscribe((dateDebutReel: string) => {
      this.minDateReel = dateDebutReel;
    });
    this.getFormArraySousProjet().push(this.form);
    this.programmePhaseBudgets = this.getFormArraySousProjet();
  }
  CalculTauxRealisation() {
    const montantReel = this.form.value.montantReel
    const montantPrevisionnel = this.form.value.montantPrevisionnel
    const tauxRealisation = (montantReel / montantPrevisionnel) * 100
    this.form.patchValue({ tauxRealisation: tauxRealisation });

  }
  updateDelaisReel() {
    const dateDebutReel = new Date(this.form.value.dateDebutReel);
    const dateFinReel = new Date(this.form.value.dateFinReel);
    const differenceInDays: number = Math.ceil((dateFinReel.getTime() - dateDebutReel.getTime()) / (1000 * 60 * 60 * 24));

    this.form.patchValue({ delaisReel: differenceInDays });
  }
  updateDelaisPrevisionnel() {
    const dateDebut = new Date(this.form.value.dateDebut);
    const dateFine = new Date(this.form.value.dateFine);
    const differenceInDays: number = Math.ceil((dateFine.getTime() - dateDebut.getTime()) / (1000 * 60 * 60 * 24));

    this.form.patchValue({ delais: differenceInDays });
  }
  CalculSommeCCp1() {
    const contributionComune1 = this.formPhaseP1.value.contributionComune1;
    const contributionComune2 = this.formPhaseP1.value.contributionComune2;
    const contributionComune3 = this.formPhaseP1.value.contributionComune3;
    const contributionCommune: number = contributionComune1 + contributionComune2 + contributionComune3;

    this.formPhaseP1.patchValue({ contributionCommune: contributionCommune });
  }
  CalculSommeMontantRealise() {
    const montantRealisePA = this.formGroup.value.montantRealisePA;
    const montantRealiseDA = this.formGroup.value.montantRealiseDA;
    const montantRealiseTA = this.formGroup.value.montantRealiseTA;
    const montantRealiseQA = this.formGroup.value.montantRealiseQA;
    const montantRealiseCA = this.formGroup.value.montantRealiseCA;
    const montantRealiseSA = this.formGroup.value.montantRealiseSA;
    const montantRealiseTotal: number = montantRealisePA + montantRealiseDA + montantRealiseTA + montantRealiseQA + montantRealiseCA + montantRealiseSA;
    const tauxContributionCommune: number = (this.formPhaseP1.value.totalContribution + this.formPhaseP2.value.totalContributionPh2) / this.formGroup.value.cout;

    this.formGroup.patchValue({ montantRealiseTotal: montantRealiseTotal });
    this.formGroup.patchValue({ tauxContributionCommune: tauxContributionCommune });
  }
  CalculSommeCCp2() {
    const contributionComune1P2 = this.formPhaseP2.value.contributionComune1P2;
    const contributionComune2P2 = this.formPhaseP2.value.contributionComune2P2;
    const contributionComune3P2 = this.formPhaseP2.value.contributionComune3P2;
    const contributionCommuneP2: number = contributionComune1P2 + contributionComune2P2 + contributionComune3P2;

    this.formPhaseP2.patchValue({ contributionCommuneP2: contributionCommuneP2 });
  }
  CalculSommeCPp1() {
    const contributionPartenaires1 = this.formPhaseP1.value.contributionPartenaires1;
    const contributionPartenaires2 = this.formPhaseP1.value.contributionPartenaires2;
    const contributionPartenaires3 = this.formPhaseP1.value.contributionPartenaires3;
    const contributionComune3 = this.formPhaseP1.value.contributionComune3;
    const contributionComune1 = this.formPhaseP1.value.contributionComune1;
    const contributionComune2 = this.formPhaseP1.value.contributionComune2;

    const contributionPartenaires: number = contributionPartenaires1 + contributionPartenaires2 + contributionPartenaires3;
    const totalContributionPremiereAnnee: number = contributionPartenaires1 + contributionComune1;
    const totalContributionDeuxiemeAnnee: number = contributionPartenaires2 + contributionComune2;

    const totalContributionTroisiemeAnnee: number = contributionPartenaires3 + contributionComune3;
    this.formPhaseP1.patchValue({ totalContributionTroisiemeAnnee: totalContributionTroisiemeAnnee });

    this.formPhaseP1.patchValue({ contributionPartenaires: contributionPartenaires });
    this.formPhaseP1.patchValue({ totalContribution: totalContributionTroisiemeAnnee + totalContributionPremiereAnnee + totalContributionDeuxiemeAnnee });
  }
  CalculSommeCPp2() {
    const contributionPartenaires1P2 = this.formPhaseP2.value.contributionPartenaires1P2;
    const contributionPartenaires2P2 = this.formPhaseP2.value.contributionPartenaires2P2;
    const contributionPartenaires3P2 = this.formPhaseP2.value.contributionPartenaires3P2;
    const contributionComune3P2 = this.formPhaseP2.value.contributionComune3P2;
    const contributionComune1P2 = this.formPhaseP2.value.contributionComune1P2;
    const contributionComune2P2 = this.formPhaseP2.value.contributionComune2P2;

    const contributionPartenairesP2: number = contributionPartenaires1P2 + contributionPartenaires2P2 + contributionPartenaires3P2;
    const totalContributionPremiereAnneeP2: number = contributionPartenaires1P2 + contributionComune1P2;
    const totalContributionDeuxiemeAnneeP2: number = contributionPartenaires2P2 + contributionComune2P2;

    const totalContributionTroisiemeAnneeP2: number = contributionPartenaires3P2 + contributionComune3P2;
    this.formPhaseP2.patchValue({ totalContributionTroisiemeAnneeP2: totalContributionTroisiemeAnneeP2 });
    this.formPhaseP2.patchValue({ contributionPartenairesP2: contributionPartenairesP2 });
    this.formPhaseP2.patchValue({ totalContributionPh2: totalContributionTroisiemeAnneeP2 + totalContributionPremiereAnneeP2 + totalContributionDeuxiemeAnneeP2 });
  }
  CalculSommeCPAp1() {
    const contributionPartenaires1 = this.formPhaseP1.value.contributionPartenaires1;
    const contributionComune1 = this.formPhaseP1.value.contributionComune1;
    const totalContributionPremiereAnnee: number = contributionPartenaires1 + contributionComune1;
    this.formPhaseP1.patchValue({ totalContributionPremiereAnnee: totalContributionPremiereAnnee });
  }
  CalculSommeCPAp2() {
    const contributionPartenaires1P2 = this.formPhaseP2.value.contributionPartenaires1P2;
    const contributionComune1P2 = this.formPhaseP2.value.contributionComune1P2;
    const totalContributionPremiereAnneeP2: number = contributionPartenaires1P2 + contributionComune1P2;
    this.formPhaseP2.patchValue({ totalContributionPremiereAnneeP2: totalContributionPremiereAnneeP2 });
  }
  CalculSommeCDAp1() {
    const contributionPartenaires2 = this.formPhaseP1.value.contributionPartenaires2;
    const contributionComune2 = this.formPhaseP1.value.contributionComune2;
    const totalContributionDeuxiemeAnnee: number = contributionPartenaires2 + contributionComune2;
    this.formPhaseP1.patchValue({ totalContributionDeuxiemeAnnee: totalContributionDeuxiemeAnnee });
  }
  CalculSommeCDAp2() {
    const contributionPartenaires2P2 = this.formPhaseP2.value.contributionPartenaires2P2;
    const contributionComune2P2 = this.formPhaseP2.value.contributionComune2P2;
    const totalContributionDeuxiemeAnneeP2: number = contributionPartenaires2P2 + contributionComune2P2;
    this.formPhaseP2.patchValue({ totalContributionDeuxiemeAnneeP2: totalContributionDeuxiemeAnneeP2 });
  }
  initializArray(phases: any[]) {
    phases.forEach(item => {
      console.log(item.phase)
      let phasevalue = { id: item.phase.id, name: item.phase.name };
      this.getFormArray().push(this.fB.group({
        id: { id: item.phase.id, name: item.phase.name },
        phase: { id: item.phase.id, name: item.phase.name },
        contributionComune1: item.contributionComune1,
        contributionComune2: item.contributionComune2,
        contributionComune3: item.contributionComune3,
        contributionCommune: item.contributionCommune,
        contributionPartenaires1: item.contributionPartenaires1,
        contributionPartenaires2: item.contributionPartenaires2,
        contributionPartenaires3: item.contributionPartenaires3,
        contributionPartenaires: item.contributionPartenaires,
        totalContributionPremiereAnnee: item.totalContributionPremiereAnnee,
        totalContributionDeuxiemeAnnee: item.totalContributionDeuxiemeAnnee,
        totalContributionTroisiemeAnnee: item.totalContributionTroisiemeAnnee,
        totalContribution: item.totalContribution,
        montantDispoCommune3PA: item.montantDispoCommune3PA,
        montantDispoCommune3DA: item.montantDispoCommune3DA,
        montantIndispoCommune: item.montantIndispoCommune,

        contributionComune1P2: item.contributionComune1P2,
        contributionComune2P2: item.contributionComune2P2,
        contributionComune3P2: item.contributionComune3P2,
        contributionCommuneP2: item.contributionCommuneP2,
        contributionPartenaires1P2: item.contributionPartenaires1P2,
        contributionPartenaires2P2: item.contributionPartenaires2P2,
        contributionPartenaires3P2: item.contributionPartenaires3P2,
        contributionPartenairesP2: item.contributionPartenairesP2,
        totalContributionPremiereAnneeP2: item.totalContributionPremiereAnneeP2,
        totalContributionDeuxiemeAnneeP2: item.totalContributionDeuxiemeAnneeP2,
        totalContributionTroisiemeAnneeP2: item.totalContributionTroisiemeAnneeP2,
        totalContributionPh2: item.totalContributionPh2,
        montantDispoCommune3PAP2: item.montantDispoCommune3PAP2,
        montantDispoCommune3DAP2: item.montantDispoCommune3DAP2,
        montantIndispoCommuneP2: item.montantIndispoCommuneP2
      })
      );
    });
  }
  initializArray1(item: any) {
    this.getFormArray().push(this.fB.group({
      id: item.id,
      contributionComune1: item.contributionComune1,
      contributionComune2: item.contributionComune2,
      contributionComune3: item.contributionComune3,
      contributionCommune: item.contributionCommune,
      contributionPartenaires1: item.contributionPartenaires1,
      contributionPartenaires2: item.contributionPartenaires2,
      contributionPartenaires3: item.contributionPartenaires3,
      contributionPartenaires: item.contributionPartenaires,
      totalContributionPremiereAnnee: item.totalContributionPremiereAnnee,
      totalContributionDeuxiemeAnnee: item.totalContributionDeuxiemeAnnee,
      totalContributionTroisiemeAnnee: item.totalContributionTroisiemeAnnee,
      totalContribution: item.totalContribution,
      montantDispoCommune3PA: item.montantDispoCommune3PA,
      montantDispoCommune3DA: item.montantDispoCommune3DA,
      montantIndispoCommune: item.montantIndispoCommune,
    })
    );
  }

  initializArray2(item: any) {
    this.getFormArray().push(this.fB.group({
      id: item.id,
      phase: { id: item.phase.id, name: item.phase.name },
      contributionComune1P2: item.contributionComune1P2,
      contributionComune2P2: item.contributionComune2P2,
      contributionComune3P2: item.contributionComune3P2,
      contributionCommuneP2: item.contributionCommuneP2,
      contributionPartenaires1P2: item.contributionPartenaires1P2,
      contributionPartenaires2P2: item.contributionPartenaires2P2,
      contributionPartenaires3P2: item.contributionPartenaires3P2,
      contributionPartenairesP2: item.contributionPartenairesP2,
      totalContributionPremiereAnneeP2: item.totalContributionPremiereAnneeP2,
      totalContributionDeuxiemeAnneeP2: item.totalContributionDeuxiemeAnneeP2,
      totalContributionTroisiemeAnneeP2: item.totalContributionTroisiemeAnneeP2,
      totalContributionPh2: item.totalContributionPh2,
      montantDispoCommune3PAP2: item.montantDispoCommune3PAP2,
      montantDispoCommune3DAP2: item.montantDispoCommune3DAP2,
      montantIndispoCommuneP2: item.montantIndispoCommuneP2,
    })
    );
  }
  initializArrayP(suusProjet: any) {
    suusProjet.forEach(item => {
      this.getFormArraySousProjet().push(this.fB.group({
        id: item.id,
        object: item.object,
        numero: item.numero,
        constibutionC: item.constibutionC,
        constibutionP: item.constibutionP,
        chefProjet: item.chefProjet,
        lieu: item.lieu,
        dateDebut: item.dateDebut,
        dateFine: item.dateFine,
        dateDebutReel: item.dateDebutReel,
        dateFinReel: item.dateFinReel,
        delaisReel: item.delaisReel,
        tauxRealisation: item.tauxRealisation,
        codeSousProjet: item.codeSousProjet,
        arrondissement: item.arrondissement,
        montantPrevisionnel: item.montantPrevisionnel,
        montantReel: item.montantReel,
        delais: item.delais,
        observation: item.observation,
        etatAvancement: item.etatAvancement,
        convention: item.convention,
        maitreOuvrageDelegue: item.maitreOuvrageDelegue,

      })
      );

    });
  }

  deleteItem(index: number) {
    console.log(this.getFormArray().controls.length)
    if (this.getFormArray().controls.length > 1) {
      this.getFormArray().removeAt(index);

      this.programmePhaseBudgets = this.getFormArray();
    }

  }
  deleteItemP(index: number) {
    if (this.getFormArraySousProjet().controls.length > 1) {
      this.getFormArraySousProjet().removeAt(index);

      this.sousProjets = this.getFormArraySousProjet();
    }

  }
  getFormArray(): FormArray {
    return this.formGroup.get('programmePhaseBudgets') as FormArray;
  }
  getFormArraySousProjet(): FormArray {
    return this.formGroup.get('sousProjets') as FormArray;
  }
  RetourEmbalages(): void {
    this.router.navigate(['/programme/list-programme'], { queryParams: { pageIndex: parseInt(this.pageIndex) } });
  }

  selectedConvontion($event) {
    this.formGroup.removeControl('convention');
  }

  selectedConvontionSousProjet($event) {
    this.form.removeControl('convention');
  }
  selectedConvontionc($even) {
    this.formGroup.registerControl("convention", this.fB.group({ id: [''] }));
  }
  selectedConvontioncSousProjet($even) {
    this.form.registerControl("convention", this.fB.group({ id: [''] }));
  }
  formatDate() {
    const dateRegex = /^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[+-]\d{4}\s\(UTC[+-]\d{2}:\d{2}\)$/;
    if (dateRegex.test(this.formGroup.value.date) && (this.formGroup.value.date != "" || this.formGroup.value.date != null)) {
      this.formGroup.value.date.setDate(this.formGroup.value.date.getDate() + 1);
      this.formGroup.value.date.setUTCHours("00");
    }
  }
  ConventionChangeProjet(e) {
    this.formGroup.value.convention = e.value

  }
  convention
  ConventionChangeSousProjet(e) {
    this.convention = e.value

  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  onSubmit() {
    this.formGroup

    this.formatDate();
    this.formGroup.value.etatAvancement = this.etatAvancement;
    const myArray1 = this.formGroup.get('sousProjets') as FormArray;
    const values1 = myArray1.length;

    const myArray2 = this.formGroup.get('programmePhaseBudgets') as FormArray;
    const values2 = myArray2.length;
    if (this.formGroup.value.id != null) {
      for (let i = 0; i < values1; i++) {
        myArray1.value[i].convention = this.convention
      }
    }

    if (this.isUpdate == true) {
      if (this.formGroup.value.convention) {
        if (this.formGroup.value.convention.id == '') {
          this.formGroup.value.convention = null;
        }
      }
    }

    if (this.formGroup.value.programmePhaseBudgets.length != 0) {
      for (let i = 0; i < this.formGroup.value.programmePhaseBudgets.length; i++) {
        this.formGroup.value.programmePhaseBudgets[i].phase.id = i + 1;
      }
      if (this.formGroup.value.programmePhaseBudgets[1] != undefined) {
        if (this.formGroup.value.programmePhaseBudgets[1].contributionCommuneP2 == "" || isNaN(this.formGroup.value.programmePhaseBudgets[1].contributionCommuneP2)) {
          this.formGroup.value.programmePhaseBudgets.splice(1, 1);
        }
      }

      if (this.formGroup.value.programmePhaseBudgets[0] != undefined) {
        if (this.formGroup.value.programmePhaseBudgets[0].contributionCommune === "" || isNaN(this.formGroup.value.programmePhaseBudgets[0].contributionCommune)) {
          this.formGroup.value.programmePhaseBudgets.splice(0, 1);
        }
      }
    }
    if (this.isUpdate == true) {
      this.formGroup.value.etatAvancement = this.etatAvancement;
    }
    this.formGroup.value.programmePhaseBudgets
    this.programmeService.save(this.formGroup.value).subscribe((res: any) => {
      console.log(res);
      console.log(this.allpjs);
      if (this.allpjs2.length > 0 && this.formGroup.value.id != undefined) {
        this.programmeService.nouvellepj(this.allpjs2, this.formGroup.value.id, "ProgrammeMarche")
          .subscribe((data) => {
            console.log("C: " + JSON.stringify(data, null, 2));
          });
      }
      Swal.fire({
        icon: 'success',
        title: ' été bien enregistré',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/programme/list-programme'], { queryParams: { pageIndex: parseInt(this.pageIndex) } });
    }, err => {
      console.log(err)
    })
  }
  SousThemeChange(e) {
    this.formGroup.get('sousTheme.id').setValue(e);
  }
  ArrondissementChange(e) {
    this.formGroup.get('arrondissement.id').setValue(e);
  }
  Arrondissement1Change(e) {
    this.form.get('arrondissement').get('id').setValue(e);
  }
  onClickPjName(a, e, id) {
    console.log("You clicked: " + e);
    var r = e.substring(0, e.length - 4);
    console.log(r);
    this.programmeService.downoldFile(r, a);
  }

  onDeleteFile(id: number): void {
    Swal.fire({
      title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
      icon: 'question',
      iconHtml: '?',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
      cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON")
    }).then((result) => {
      if (result.isConfirmed) {
        this.programmeService
          .deleteByIdFiles(id)
          .subscribe(res => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
              showConfirmButton: false,
              timer: 1500
            })
            this.ngOnInit();
          }, (err: HttpErrorResponse) => {
            console.log(err.status);
            console.log(err.headers);

            if (err.status == 500) {

              Swal.fire({
                position: 'center',
                icon: 'error',
                title: "impossible de supprimer cette enregistrement",
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
      }
    })
  }


  onDeleteFile2(id: number): void {
    this.allpjs2.splice(id, 1);
  }
  FileName(file) {
    return this.fileUtils.getFileName(file);
  }

  FileExtension(file) {
    return this.fileUtils.getExtensionFile(file);
  }

  compareObjects(o1: any, o2: any) {
    if (o1.name == o2.name && o1.id == o2.id)
      return true;
    else return false
  }
  save(event: any): void {
    $("#test").val(event.target.files[0].name);
    this.formPj.selecetedFile = event.target.files;
    this.allpjs.push(this.formPj);

  }

  allpjs2 = [];
  addFile() {
    for (let i = 0; i < this.allpjs.length; i++) {
      this.allpjs2.push(this.allpjs[i].selecetedFile[i]);
      $("#test").val(null);
      this.allpjs = [];
    }
  }
}
