import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgrammePhase } from '../../../shared/ProgrammePhase';
import { ProgrammeService } from '../../../shared/ProgrammeService';
import { NewPhaseComponent } from './new-phase/new-phase.component';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FilesUtilsService } from '../../../utils/files-utils.service';
import { ExcelAssociationService } from '../../../utils/excel-association.service';
import { TranslateService } from '@ngx-translate/core';
import { ConsistanceConventionService } from '../../../../../views/pages/shared/consistance-convention.service';
import { ExecutionProjetService } from '../../../../../views/pages/shared/execution-projet.service';

@Component({
  selector: 'kt-detaille-programme',
  templateUrl: './detaille-programme.component.html',
  styleUrls: ['./detaille-programme.component.scss']
})
export class DetailleProgrammeComponent implements OnInit {
  language = localStorage.getItem('language');
  id;
  programme
  // ============================================
  // Presentation de datasource
  // ============================================
  displayedColumns: string[] = [
    "phase",
    "bgcomune",
    "bgpartenaires",
    "totalCA1",
    "totalCA2",
    "totalCA3",
    "totalC"
  ];
  displayedColumns1: string[] = [
    "object",
    "numero",
    "constibutionC"
    //"constibutionP"
  ];
  // ============================================
  // Declarations
  // ============================================
  dataSource = new MatTableDataSource<any>();
  dataSource1 = new MatTableDataSource<any>();
  constructor(public consistanceConvention: ConsistanceConventionService, public executionProjet: ExecutionProjetService,
    private translate: TranslateService, private router: Router, private excelService: ExcelAssociationService, private activatedRoute: ActivatedRoute,
    private fileUtils: FilesUtilsService,
    public dialog: MatDialog,
    private ProgrammeService: ProgrammeService, private programmePhase: ProgrammePhase) { }
  files: Observable<any>;
  data2: any[] = null;
  data3: any[] = null;

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
      this.ProgrammeService.findById(this.id).subscribe((res: any) => {
        console.log("Res: " + JSON.stringify(res));
        if (res.cout != null) {
          res.cout = res.cout.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
        }
        for (let i = 0; i < res.sousProjets.length; i++) {
          if (res.sousProjets[i].constibutionC != null) {
            res.sousProjets[i].constibutionC = res.sousProjets[i].constibutionC.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
          }
        }
        for (let i = 0; i < res.programmePhaseBudgets.length; i++) {
          if (res.programmePhaseBudgets[i].contributionComune1 != null) {
            res.programmePhaseBudgets[i].contributionComune1 = res.programmePhaseBudgets[i].contributionComune1.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
          }
          if (res.programmePhaseBudgets[i].contributionComune2 != null) {
            res.programmePhaseBudgets[i].contributionComune2 = res.programmePhaseBudgets[i].contributionComune2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
          }
          if (res.programmePhaseBudgets[i].contributionComune != null) {
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



         
          if (res.programmePhaseBudgets[i].contributionCommuneP2 != null) {
            res.programmePhaseBudgets[i].contributionCommuneP2 = res.programmePhaseBudgets[i].contributionCommuneP2.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
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
        }
        this.programme = res;
        this.dataSource = new MatTableDataSource(res.programmePhaseBudgets);
        this.dataSource1 = new MatTableDataSource(res.sousProjets);

        if (res.convention != null) {
          this.consistanceConvention.all(res.convention.id).subscribe((res: any) => {
            this.data2 = res;
          }, err => {
            console.log(err)
          })
          this.executionProjet.all(res.convention.id).subscribe(res => {
            this.data3 = res;
          }, err => {
            console.log(err)
          })
        }
      }, err => {
        console.log(err);
      })
      this.files = this.ProgrammeService.getByIdFiles(this.id);
      console.log("files: " + this.files);
    });

  }

  FileName(file) {
    return this.fileUtils.getFileName(file);
  }

  FileExtension(file) {
    return this.fileUtils.getExtensionFile(file);
  }

  onClickPjName(a, e, id) {
    console.log("You clicked: " + e);
    var r = e.substring(0, e.length - 4);
    console.log(r);
    //window.open(environment.API_ALFRESCO_URL + "/MarcheConvention/"+r);
    this.ProgrammeService.downoldFile(r, a);
  }

  EtatAvancement: Array<etatAvancement> = [
    {
      type: "ACHEVES",
      color: "#ffd433",
    },
    {
      type: "EN_COURS",
      color: "#acdbb7",
    },
    {
      type: "NON_LANCES",
      color: "#acdcd7",
    },
    {
      type: "EN_ARRET",
      color: "#b4c6e7",
    },
    {
      type: "ANNULE",
      color: "#e7c1b4",
    }
  ];

  getTypeColor(type) {
    let t = this.EtatAvancement.find((t) => t.type == type);
    if (!t) {
      return "#ffffff";
    }


    return t.color;
  }

  /* EtatAvancement: Array<etatAvancement> = [
    {
      type: "ACHEVES",
      color: "#ffd433",
    },
    {
      type: "EN_COURS",
      color: "#acdbb7",
    },
    {
      type: "NON_LANCES",
      color: "#acdcd7",
    },
  ];

  getTypeColor(type) {
    let t = this.EtatAvancement.find((t) => t.type == type);
    if (!t) {
      return "#ffffff";
    }


    return t.color;
  } */
  RetourEmbalages(): void {
    this.router.navigate(["pages/Programme/list-programme"]);

  }
  PP(): void {
    this.router.navigate(["pages/Convention/detaille-convention"]);

  }
  addNew() {
    const dialogRef = this.dialog.open(NewPhaseComponent, {
      width: '800px',
      data: {
        id: this.id
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      //console.log("Res: "+ JSON.stringify(res,null,2))
      this.ngOnInit();

    });
  }
  columns: any[];
  footerData: any[][] = [];

  imprimerFicheProjet() {
    if (localStorage.getItem('language') == 'fr') {
      this.ProgrammeService.findById(this.id).subscribe((res: any) => {
        console.log(res);
        let data: any = res;
        let json = new excelDateProgramme(data, this.data2, this.data3);
        this.columns = [
          "Objet du projet", "Objectifs", "Consistance et composantes du projet","Coûts", "Financement",
          "Montage financier","Partie prenante du projet","Maître d'ouvrage", "Maître d'ouvrage délégué",
          "Délais d’exécution",
          "Coût global du projet", "Date début", "Date fin"
        ],
          this.excelService.exportFicheProjetAsExcelFile('Fiche Projet', '', this.columns, json, this.footerData, 'Fiche Projet', this.translate.instant("PAGES.PROGRAMME.FICHE_PROJET"))

      }, err => {
        console.log(err)
      })
    }
    if (localStorage.getItem('language') == 'ar') {
      this.ProgrammeService.findById(this.id).subscribe((res: any) => {
        console.log(res);
        
        let data: any = res;
        
        let json = new excelDateProgramme(data,this.data2,this.data3);
        
        this.columns = [
          "موضوع المشروع", "الاهداف", "تكوين ومكونات المشروع","التكاليف","التمويل",
          "ترتيبات التمويل","أصحاب المصلحة في المشروع","صاحب المشروع", "صاحب المشروع المنتدب","الوقت المتاح للتنفيذ",
          "تكلفة المشروع الإجمالية", "تاريخ البدء", "تاريخ الانتهاء"
        ],
          this.excelService.exportFicheProjetAsExcelFileAr('ورقة المشروع', '', this.columns, json, this.footerData, 'Fiche Projet', this.translate.instant("PAGES.PROGRAMME.FICHE_PROJET"))

      }, err => {
        console.log(err)
      })
    }
  }
}
export class excelDateProgramme {

  objetProjet: string;
  objectifs: string;
  consistanceEtComposantsProjet: string;
  couts:string;
  financement:string;
  montageFinancier:string;
  partiePrenanteProjet:string;
  maitreOuvrage: string;
  maitreOuvrageDelegue: string;
  delai:string;
  coutGlobalProjet: string;
  dateDebut: string;
  dateFin: string;

  constructor(item: any, item2, item3) {

    if (localStorage.getItem('language') == 'fr') {

      if (item.nameProjet == null) {
        this.objetProjet = '';
      }
      else if (item.nameProjet != null) {
        this.objetProjet = item.nameProjet;
      }


      if (item.objectifStrategique == null && item.objectifOperationnel == null) {

        this.objectifs = '';
      }
      else if (item.objectifStrategique != null && item.objectifOperationnel == null) {

        this.objectifs = item.objectifStrategique;
      }
      else if (item.objectifStrategique == null && item.objectifOperationnel != null) {

        this.objectifs = item.objectifOperationnel;
      }

      else if (item.objectifStrategique != null && item.objectifOperationnel != null) {

        this.objectifs = item.objectifStrategique + ' , ' + item.objectifOperationnel;
      }


      if (item2 == null) {
        this.consistanceEtComposantsProjet = '';
      }
      else if (item2 != null) {
        this.consistanceEtComposantsProjet = '';
        for (let i = 0; i < item2.length; i++) {
          if (i < item2.length - 1) {
            this.consistanceEtComposantsProjet += item2[i].composante + " , ";
          }
          if (i == item2.length - 1) {
            this.consistanceEtComposantsProjet += item2[i].composante
          }
        }
      }

      this.couts='';
      this.financement='';
      this.montageFinancier='';
      this.partiePrenanteProjet='';


      if (item3 == null) {
        this.maitreOuvrage = '';
        this.maitreOuvrageDelegue = '';
      } else if (item3 != null) {
        this.maitreOuvrage = '';
        this.maitreOuvrageDelegue = '';
        for (let i = 0; i < item3.length; i++) {
          if (i < item3.length - 1) {
            this.maitreOuvrage += item3[i].proprietaire + " , ";
            this.maitreOuvrageDelegue += item3[i].proprietaireAssigne + " , ";
          }
          if (i == item3.length - 1) {
            this.maitreOuvrage += item3[i].proprietaire;
            this.maitreOuvrageDelegue += item3[i].proprietaireAssigne;
          }
        }
      }

      if(item.delai==null){
        this.delai='';
      }
      else if(item.delai!=null){
        this.delai=item.delai;
      }


      if (item.cout == null) {
        this.coutGlobalProjet = '';
      } else if (item.cout != null) {
        this.coutGlobalProjet = item.cout;
      }



      if (item.date == null) {
        this.dateDebut = '';
      } else if (item.date != null) {
        this.dateDebut = item.date;
      }



      if (item.dateFin == null) {
        this.dateFin = '';
      } else if (item.dateFin != null) {
        this.dateFin = item.dateFin;
      }

    }
    if (localStorage.getItem('language') == 'ar') {
      if (item.nameProjetAr == null) {
        this.objetProjet = '';
      }
      else if (item.nameProjetAr != null) {
        this.objetProjet = item.nameProjetAr;
      }


      if (item.objectifStrategiqueAr == null && item.objectifOperationnelAr == null) {

        this.objectifs = '';
      }
      else if (item.objectifStrategiqueAr != null && item.objectifOperationnelAr == null) {

        this.objectifs = item.objectifStrategiqueAr;
      }
      else if (item.objectifStrategiqueAr == null && item.objectifOperationnelAr != null) {

        this.objectifs = item.objectifOperationnelAr;
      }

      else if (item.objectifStrategiqueAr != null && item.objectifOperationnelAr != null) {

        this.objectifs = item.objectifStrategiqueAr + ' , ' + item.objectifOperationnelAr;
      }


      if (item2 == null) {
        this.consistanceEtComposantsProjet = '';
      }
      else if (item2 != null) {
        this.consistanceEtComposantsProjet = '';
        for (let i = 0; i < item2.length; i++) {
          if (i < item2.length - 1) {
            this.consistanceEtComposantsProjet += item2[i].composante + " , ";
          }
          if (i == item2.length - 1) {
            this.consistanceEtComposantsProjet += item2[i].composante
          }
        }
      }

      
      this.couts='';
      this.financement='';
      this.montageFinancier='';
      this.partiePrenanteProjet='';



      if (item3 == null) {
        this.maitreOuvrage = '';
        this.maitreOuvrageDelegue = '';
      } else if (item3 != null) {
        this.maitreOuvrage = '';
        this.maitreOuvrageDelegue = '';
        for (let i = 0; i < item3.length; i++) {
          if (i < item3.length - 1) {
            this.maitreOuvrage += item3[i].proprietaire + " , ";
            this.maitreOuvrageDelegue += item3[i].proprietaireAssigne + " , ";
          }
          if (i == item3.length - 1) {
            this.maitreOuvrage += item3[i].proprietaire;
            this.maitreOuvrageDelegue += item3[i].proprietaireAssigne;
          }
        }
      }


      if(item.delai==null){
        this.delai='';
      }
      else if(item.delai!=null){
        this.delai=item.delai;
      }


      if (item.cout == null) {
        this.coutGlobalProjet = '';
      } else if (item.cout != null) {
        this.coutGlobalProjet = item.cout;
      }



      if (item.date == null) {
        this.dateDebut = '';
      } else if (item.date != null) {
        this.dateDebut = item.date;
      }



      if (item.dateFin == null) {
        this.dateFin = '';
      } else if (item.dateFin != null) {
        this.dateFin = item.dateFin;
      }
    }
  }
}




export class etatAvancement {
  type?: string;
  color?: string;
  cssClass?: string;
}
