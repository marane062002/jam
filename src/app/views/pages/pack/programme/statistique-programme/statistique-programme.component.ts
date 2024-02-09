import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import * as _ from 'lodash';
import { ProgrammeService } from '../../../shared/ProgrammeService';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'kt-statistique-programme',
  templateUrl: './statistique-programme.component.html',
  styleUrls: ['./statistique-programme.component.scss']
})
export class StatistiqueProgrammeComponent implements OnInit {
  searchForm?: FormGroup;
  searchForm2?: FormGroup;
  selectedValueCherche: string[] = [""];
  selectedValueCherche2: string[] = [""];
  idCoutGlobal6A: any;
  idContributionCommune6A: any;
  idContributionPartenaires6A: any;
  idCoutGlobal3A: any;
  idContributionCommune3A: any;
  idContributionPartenaires3A: any;
  idMontantDispoCommune3PA: any;
  idMontantIndispoCommune3PA: any;
  idContributionCommunePA: any;
  idCoutGlobalPA: any;
  idContributionCommuneDA: any;
  idCoutGlobalDA: any;
  idContributionCommuneTA: any;
  idCoutGlobalTA: any;


  idProgrammeGlobal: any;
  idProgrammePhase1: any;
  idProgrammePhase2: any;

  isNombreProjetsSelected: boolean = false;
  isCoutGlobalSelected: boolean = false;
  isContributionCommuneSelected: boolean = false;

  isSelected: boolean = false;

  constructor(private fb: FormBuilder,
    private programeServie: ProgrammeService,
    private translateService: TranslateService
  ) {
    this.searchForm = this.fb.group({
      tabcherches: [[],],
      tabcherches2: [[],],
    })
    this.searchForm2 = this.fb.group({
      dateDebut: new FormControl(''),
      dateFin: new FormControl('')
    })
  }

  programmes: any;

  ngOnInit() {
    this.programeServie.all().subscribe(res => {
      console.log("Res: " + JSON.stringify(res));
      this.programmes = res;
      this.countNombreProjetsByOrientationsEtatAvancement('', '');
      this.countCoutProjetsByOrientationsEtatAvancement('', '');
      this.countContributionTotaleCommuneByOrientationsEtatAvancement('', '');
      this.fillChartByParam1(this.chartType1);
      this.fillChartByParam2(this.chartType2);
    }, err => {
      console.log("Error: " + err)
    })

  }

  doSomething(event: any) {
    this.selectedValueCherche = event;
    if (!event.includes('COUT_GLOBAL_6_ANS')) {
      this.idCoutGlobal6A = undefined;
      this.isSelected = false;
    }
    if (!event.includes('CONTRIBUTION_COMMUNE_6_ANS')) {
      this.idContributionCommune6A = undefined;
      this.isSelected = false;
    }
    if (!event.includes('CONTRIBUTION_PARTENAIRES_6_ANS')) {
      this.idContributionPartenaires6A = undefined;
      this.isSelected = false;
    }
    if (!event.includes('COUT_GLOBAL_3_ANS')) {
      this.idCoutGlobal3A = undefined;
      this.isSelected = false;
    }
    if (!event.includes('CONTRIBUTION_COMMUNE_3_ANS')) {
      this.idContributionCommune3A = undefined;
      this.isSelected = false;
    }
    if (!event.includes('CONTRIBUTION_PARTENAIRES_3_ANS')) {
      this.idContributionPartenaires3A = undefined;
      this.isSelected = false;
    }
    if (!event.includes('MONTANT_DISPONIBLE_COMMUNE_3PAMAINE')) {
      this.idMontantDispoCommune3PA = undefined;
      this.isSelected = false;
    }
    if (!event.includes('MONTANT_INDISPONIBLE_COMMUNE_3_ANS')) {
      this.idMontantIndispoCommune3PA = undefined;
      this.isSelected = false;
    }
    if (!event.includes('CONTRIBUTION_COMMUNE_A_1')) {
      this.idContributionCommunePA = undefined;
      this.isSelected = false;
    }
    if (!event.includes('COUT_GLOBAL_A_1')) {
      this.idCoutGlobal3A = undefined;
      this.isSelected = false;
    }
    if (!event.includes('CONTRIBUTION_COMMUNE_A_2')) {
      this.idContributionCommuneDA = undefined;
      this.isSelected = false;
    }
    if (!event.includes('COUT_GLOBAL_A_2')) {
      this.idCoutGlobalDA = undefined;
      this.isSelected = false;
    }
    if (!event.includes('CONTRIBUTION_COMMUNE_A_3')) {
      this.idContributionCommuneTA = undefined;
      this.isSelected = false;
    }
    if (!event.includes('COUT_GLOBAL_A_3')) {
      this.idCoutGlobalTA = undefined;
      this.isSelected = false;
    }
  }
  doSomething2(event: any) {
    this.selectedValueCherche2 = event;
    if (!event.includes('PROGRAMME_GLOBAL_6_ANS')) {
      this.idProgrammeGlobal = undefined;
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false
    }
    if (!event.includes('PROGRAMME_PREMIERE_PHASE')) {
      this.idProgrammePhase1 = undefined;
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false
    }
    if (!event.includes('PROGRAMME_DEUXIEME_PHASE')) {
      this.idProgrammePhase2 = undefined;
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false
    }
  }
  sommeCouts;
  formattedNumber;
  formattedNumber1: number = 0;
  formattedNumber2;
  formattedNumber3;
  onChangeCoutGlobal6A(event: any) {
    this.idCoutGlobal6A = event;
    this.ngOnInit();
    if (this.idCoutGlobal6A != 'PREMIERE_ORIENTATION' && this.idCoutGlobal6A != 'DEUXIEME_ORIENTATION' && this.idCoutGlobal6A != 'TROISIEME_ORIENTATION' && this.idCoutGlobal6A != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }

    if (this.idCoutGlobal6A == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        this.sommeCouts += this.programmes[i].cout;
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobal6A == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        this.sommeCouts += this.programmes[i].cout;
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobal6A == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        this.sommeCouts += this.programmes[i].cout;
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobal6A == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        this.sommeCouts += this.programmes[i].cout;
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobal6A == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        this.sommeCouts += this.programmes[i].cout;
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
  }

  onChangeContributionCommune6A(event: any) {
    this.ngOnInit();
    this.idContributionCommune6A = event;
    if (this.idContributionCommune6A != 'PREMIERE_ORIENTATION' && this.idContributionCommune6A != 'DEUXIEME_ORIENTATION' && this.idContributionCommune6A != 'TROISIEME_ORIENTATION' && this.idContributionCommune6A != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idContributionCommune6A == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idContributionCommune6A == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idContributionCommune6A == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idContributionCommune6A == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idContributionCommune6A == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
  }

  onChangeContributionPartenaires6A(event: any) {
    this.idContributionPartenaires6A = event;
    if (this.idContributionPartenaires6A == 'PREMIERE_ORIENTATION') {

    }
    if (this.idContributionPartenaires6A == 'DEUXIEME_ORIENTATION') {

    }
    if (this.idContributionPartenaires6A == 'TROISIEME_ORIENTATION') {

    }
    if (this.idContributionPartenaires6A == 'QUATRIEME_ORIENTATION') {

    }
    if (this.idContributionPartenaires6A == 'TOTAL_ORIENTATION') {

    }
  }

  onChangeCoutGlobal3A(event: any) {
    this.ngOnInit();
    this.idCoutGlobal3A = event;
    if (this.idCoutGlobal3A != 'PREMIERE_ORIENTATION' && this.idCoutGlobal3A != 'DEUXIEME_ORIENTATION' && this.idCoutGlobal3A != 'TROISIEME_ORIENTATION' && this.idCoutGlobal3A != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idCoutGlobal3A == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContribution;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idCoutGlobal3A == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContribution;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idCoutGlobal3A == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContribution;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idCoutGlobal3A == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContribution;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idCoutGlobal3A == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContribution;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
  }

  onChangeContributionCommune3A(event: any) {
    this.ngOnInit();
    this.idContributionCommune3A = event;
    if (this.idContributionCommune3A != 'PREMIERE_ORIENTATION' && this.idContributionCommune3A != 'DEUXIEME_ORIENTATION' && this.idContributionCommune3A != 'TROISIEME_ORIENTATION' && this.idContributionCommune3A != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idContributionCommune3A == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommune3A == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommune3A == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommune3A == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommune3A == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeContributionPartenaires3A(event: any) {
    this.ngOnInit();
    this.idContributionPartenaires3A = event;
    if (this.idContributionPartenaires3A != 'PREMIERE_ORIENTATION' && this.idContributionPartenaires3A != 'DEUXIEME_ORIENTATION' && this.idContributionPartenaires3A != 'TROISIEME_ORIENTATION' && this.idContributionPartenaires3A != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idContributionPartenaires3A == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionPartenaires;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionPartenaires3A == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionPartenaires;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionPartenaires3A == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionPartenaires;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionPartenaires3A == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionPartenaires;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionPartenaires3A == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionPartenaires;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeMontantDisponibleCommune3PA(event: any) {
    this.ngOnInit();
    this.idMontantDispoCommune3PA = event;
    if (this.idMontantDispoCommune3PA != 'PREMIERE_ORIENTATION' && this.idMontantDispoCommune3PA != 'DEUXIEME_ORIENTATION' && this.idMontantDispoCommune3PA != 'TROISIEME_ORIENTATION' && this.idMontantDispoCommune3PA != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idMontantDispoCommune3PA == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantDispoCommune3PA;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idMontantDispoCommune3PA == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantDispoCommune3PA;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idMontantDispoCommune3PA == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantDispoCommune3PA;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idMontantDispoCommune3PA == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantDispoCommune3PA;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idMontantDispoCommune3PA == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantDispoCommune3PA;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeMontantIndisponibleCommune3PA(event: any) {
    this.ngOnInit();
    this.idMontantIndispoCommune3PA = event;
    if (this.idMontantIndispoCommune3PA != 'PREMIERE_ORIENTATION' && this.idMontantIndispoCommune3PA != 'DEUXIEME_ORIENTATION' && this.idMontantIndispoCommune3PA != 'TROISIEME_ORIENTATION' && this.idMontantIndispoCommune3PA != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idMontantIndispoCommune3PA == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantIndispoCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idMontantIndispoCommune3PA == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantIndispoCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idMontantIndispoCommune3PA == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantIndispoCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idMontantIndispoCommune3PA == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantIndispoCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idMontantIndispoCommune3PA == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].montantIndispoCommune;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeContributionCommuneA1(event: any) {
    this.ngOnInit();
    this.idContributionCommunePA = event;
    if (this.idContributionCommunePA != 'PREMIERE_ORIENTATION' && this.idContributionCommunePA != 'DEUXIEME_ORIENTATION' && this.idContributionCommunePA != 'TROISIEME_ORIENTATION' && this.idContributionCommunePA != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idContributionCommunePA == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune1;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommunePA == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune1;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommunePA == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune1;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommunePA == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 423; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune1;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommunePA == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune1;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeCoutGlobalA1(event: any) {
    this.ngOnInit();
    this.idCoutGlobalPA = event;
    if (this.idCoutGlobalPA != 'PREMIERE_ORIENTATION' && this.idCoutGlobalPA != 'DEUXIEME_ORIENTATION' && this.idCoutGlobalPA != 'TROISIEME_ORIENTATION' && this.idCoutGlobalPA != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idCoutGlobalPA == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionPremiereAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalPA == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionPremiereAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalPA == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionPremiereAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalPA == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionPremiereAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalPA == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionPremiereAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeContributionCommuneA2(event: any) {
    this.ngOnInit();
    this.idContributionCommuneDA = event;
    this.isSelected = true;
    if (this.idContributionCommuneDA != 'PREMIERE_ORIENTATION' && this.idContributionCommuneDA != 'DEUXIEME_ORIENTATION' && this.idContributionCommuneDA != 'TROISIEME_ORIENTATION' && this.idContributionCommuneDA != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idContributionCommuneDA == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommuneDA == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommuneDA == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommuneDA == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommuneDA == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune2;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeCoutGlobalA2(event: any) {
    this.ngOnInit();
    this.idCoutGlobalDA = event;
    if (this.idCoutGlobalDA != 'PREMIERE_ORIENTATION' && this.idCoutGlobalDA != 'DEUXIEME_ORIENTATION' && this.idCoutGlobalDA != 'TROISIEME_ORIENTATION' && this.idCoutGlobalDA != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idCoutGlobalDA == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionDeuxiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalDA == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionDeuxiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalDA == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionDeuxiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalDA == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionDeuxiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalDA == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionDeuxiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeContributionCommuneA3(event: any) {
    this.ngOnInit();
    this.idContributionCommuneTA = event;
    if (this.idContributionCommuneTA != 'PREMIERE_ORIENTATION' && this.idContributionCommuneTA != 'DEUXIEME_ORIENTATION' && this.idContributionCommuneTA != 'TROISIEME_ORIENTATION' && this.idContributionCommuneTA != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idContributionCommuneTA == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune3;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommuneTA == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune3;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommuneTA == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune3;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommuneTA == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune3;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idContributionCommuneTA == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionComune3;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }

  onChangeCoutGlobalA3(event: any) {
    this.ngOnInit();
    this.idCoutGlobalTA = event;
    if (this.idCoutGlobalTA != 'PREMIERE_ORIENTATION' && this.idCoutGlobalTA != 'DEUXIEME_ORIENTATION' && this.idCoutGlobalTA != 'TROISIEME_ORIENTATION' && this.idCoutGlobalTA != 'QUATRIEME_ORIENTATION') {
      this.isSelected = false;
    }
    if (this.idCoutGlobalTA == 'PREMIERE_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 74;
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionTroisiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalTA == 'DEUXIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 171;
      for (let i = 74; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionTroisiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalTA == 'TROISIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 335;
      for (let i = 171; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionTroisiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalTA == 'QUATRIEME_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      this.programmes.length = 423;
      for (let i = 335; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionTroisiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
    if (this.idCoutGlobalTA == 'TOTAL_ORIENTATION') {
      this.isSelected = true;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].totalContributionTroisiemeAnnee;
        }
      }
      this.formattedNumber = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }


  onChangeProgrammeGlobal6A(event: any) {
    this.idProgrammeGlobal = event;
    if (this.idProgrammeGlobal != 'NOMBRE_PROJET' && this.idProgrammeGlobal != 'COUT_GLOBAL' && this.idProgrammeGlobal != 'CONTRIBUTION_COMMUNE') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false
    }
    if (this.idProgrammeGlobal == 'NOMBRE_PROJET') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = true;
      this.formattedNumber1 = 0;
      this.formattedNumber1 = this.programmes.length;
    }
    if (this.idProgrammeGlobal == 'COUT_GLOBAL') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = true;
      this.isNombreProjetsSelected = false;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        this.sommeCouts += this.programmes[i].cout;
      }
      this.formattedNumber2 = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idProgrammeGlobal == 'CONTRIBUTION_COMMUNE') {
      this.isContributionCommuneSelected = true;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false;
      this.sommeCouts = 0;
      this.formattedNumber3 = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
          this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionCommune;
        }
      }
      this.formattedNumber3 = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }
  onChangeContProgrammePremierePhase(event: any) {
    this.idProgrammePhase1 = event;
    console.log("AAAA: " + this.idProgrammeGlobal);
    if (this.idProgrammePhase2 != 'NOMBRE_PROJET' && this.idProgrammePhase2 != 'COUT_GLOBAL' && this.idProgrammePhase2 != 'CONTRIBUTION_COMMUNE') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false
    }
    if (this.idProgrammePhase1 == 'NOMBRE_PROJET') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = true;
      this.formattedNumber1 = 0;
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].phase == '1') {
          this.formattedNumber1 += 1;
        }
      }
    }
    if (this.idProgrammePhase1 == 'COUT_GLOBAL') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = true;
      this.isNombreProjetsSelected = false;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].phase == '1') {
          this.sommeCouts += this.programmes[i].cout;
        }
      }
      this.formattedNumber2 = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idProgrammePhase1 == 'CONTRIBUTION_COMMUNE') {
      this.isContributionCommuneSelected = true;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false;
      this.sommeCouts = 0;
      this.formattedNumber3 = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].phase == '1') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionCommune;
          }
        }
      }
      this.formattedNumber3 = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }

  }
  onChangeProgrammeDeuxiemePhase(event: any) {
    this.idProgrammePhase2 = event;
    if (this.idProgrammePhase2 != 'NOMBRE_PROJET' && this.idProgrammePhase2 != 'COUT_GLOBAL' && this.idProgrammePhase2 != 'CONTRIBUTION_COMMUNE') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false
    }
    if (this.idProgrammePhase2 == 'NOMBRE_PROJET') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = true;
      this.formattedNumber1 = 0;
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].phase == '2') {
          this.formattedNumber1 += 1;
        }
      }
    }
    if (this.idProgrammePhase2 == 'COUT_GLOBAL') {
      this.isContributionCommuneSelected = false;
      this.isCoutGlobalSelected = true;
      this.isNombreProjetsSelected = false;
      this.sommeCouts = 0;
      this.formattedNumber = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].phase == '2') {
          this.sommeCouts += this.programmes[i].cout;
        }
      }
      this.formattedNumber2 = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })
    }
    if (this.idProgrammePhase2 == 'CONTRIBUTION_COMMUNE') {
      this.isContributionCommuneSelected = true;
      this.isCoutGlobalSelected = false;
      this.isNombreProjetsSelected = false;
      this.sommeCouts = 0;
      this.formattedNumber3 = '0';
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].phase == '2') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.sommeCouts += this.programmes[i].programmePhaseBudgets[j].contributionCommune;
          }
        }
      }
      this.formattedNumber3 = this.sommeCouts.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
    }
  }
  nbProjetOrien1Encours: number = 0;
  nbProjetOrien1Nlances: number = 0;
  nbProjetOrien1Acheves: number = 0;
  nbProjetOrien1Programmes: number = 0;
  nbProjetOrien2Encours: number = 0;
  nbProjetOrien2Nlances: number = 0;
  nbProjetOrien2Acheves: number = 0;
  nbProjetOrien2Programmes: number = 0;
  nbProjetOrien3Encours: number = 0;
  nbProjetOrien3Nlances: number = 0;
  nbProjetOrien3Acheves: number = 0;
  nbProjetOrien3Programmes: number = 0;
  nbProjetOrien4Encours: number = 0;
  nbProjetOrien4Nlances: number = 0;
  nbProjetOrien4Acheves: number = 0;
  nbProjetOrien4Programmes: number = 0;
  nbProjetTotalEncours: number = 0;
  nbProjetTotalNlances: number = 0;
  nbProjetTotalAcheves: number = 0;
  nbProjetTotalProgrammes: number = 0;


  coutProjetOrien1Encours: number = 0;
  coutProjetOrien1Nlances: number = 0;
  coutProjetOrien1Acheves: number = 0;
  coutProjetOrien1Programmes: number = 0;
  coutProjetOrien2Encours: number = 0;
  coutProjetOrien2Nlances: number = 0;
  coutProjetOrien2Acheves: number = 0;
  coutProjetOrien2Programmes: number = 0;
  coutProjetOrien3Encours: number = 0;
  coutProjetOrien3Nlances: number = 0;
  coutProjetOrien3Acheves: number = 0;
  coutProjetOrien3Programmes: number = 0;
  coutProjetOrien4Encours: number = 0;
  coutProjetOrien4Nlances: number = 0;
  coutProjetOrien4Acheves: number = 0;
  coutProjetOrien4Programmes: number = 0
  coutProjetTotalProgrammes: number = 0;
  coutProjetTotalEncours: number = 0;
  coutProjetTotalNlances: number = 0;
  coutProjetTotalAcheves: number = 0;

  contributionTotaleCommuneOrien1Encours: number = 0;
  contributionTotaleCommuneOrien1Nlances: number = 0;
  contributionTotaleCommuneOrien1Acheves: number = 0;
  contributionTotaleCommuneOrien1Programmes: number = 0;
  contributionTotaleCommuneOrien2Encours: number = 0;
  contributionTotaleCommuneOrien2Nlances: number = 0;
  contributionTotaleCommuneOrien2Acheves: number = 0;
  contributionTotaleCommuneOrien2Programmes: number = 0;
  contributionTotaleCommuneOrien3Encours: number = 0;
  contributionTotaleCommuneOrien3Nlances: number = 0;
  contributionTotaleCommuneOrien3Acheves: number = 0;
  contributionTotaleCommuneOrien3Programmes: number = 0;
  contributionTotaleCommuneOrien4Encours: number = 0;
  contributionTotaleCommuneOrien4Nlances: number = 0;
  contributionTotaleCommuneOrien4Acheves: number = 0;
  contributionTotaleCommuneOrien4Programmes: number = 0;
  contributionTotaleCommuneOrien1: number = 0;
  contributionTotaleCommuneOrien2: number = 0;
  contributionTotaleCommuneOrien3: number = 0;
  contributionTotaleCommuneOrien4: number = 0;
  contributionTotaleCommune: number = 0;


  chartType1 = "bar";
  chartType2 = "pie";
  appliquer() {
    this.nbProjetOrien1Encours = 0;
    this.nbProjetOrien1Nlances = 0;
    this.nbProjetOrien1Acheves = 0;
    this.nbProjetOrien1Programmes = 0;
    this.nbProjetOrien2Encours = 0;
    this.nbProjetOrien2Nlances = 0;
    this.nbProjetOrien2Acheves = 0;
    this.nbProjetOrien2Programmes = 0;
    this.nbProjetOrien3Encours = 0;
    this.nbProjetOrien3Nlances = 0;
    this.nbProjetOrien3Acheves = 0;
    this.nbProjetOrien3Programmes = 0;
    this.nbProjetOrien4Encours = 0;
    this.nbProjetOrien4Nlances = 0;
    this.nbProjetOrien4Acheves = 0;
    this.nbProjetOrien4Programmes = 0;
    this.nbProjetTotalEncours = 0;
    this.nbProjetTotalAcheves = 0;
    this.nbProjetTotalNlances = 0;
    this.nbProjetTotalProgrammes = 0;

    this.coutProjetOrien1Encours = 0;
    this.coutProjetOrien1Nlances = 0;
    this.coutProjetOrien1Acheves = 0;
    this.coutProjetOrien1Programmes = 0;
    this.coutProjetOrien2Encours = 0;
    this.coutProjetOrien2Nlances = 0;
    this.coutProjetOrien2Acheves = 0;
    this.coutProjetOrien2Programmes = 0;
    this.coutProjetOrien3Encours = 0;
    this.coutProjetOrien3Nlances = 0;
    this.coutProjetOrien3Acheves = 0;
    this.coutProjetOrien3Programmes = 0;
    this.coutProjetOrien4Encours = 0;
    this.coutProjetOrien4Nlances = 0;
    this.coutProjetOrien4Acheves = 0;
    this.coutProjetOrien4Programmes = 0;
    this.coutProjetTotalProgrammes = 0;
    this.coutProjetTotalNlances = 0;
    this.coutProjetTotalEncours = 0;
    this.coutProjetTotalAcheves = 0;



    this.contributionTotaleCommuneOrien1Encours = 0;
    this.contributionTotaleCommuneOrien1Nlances = 0;
    this.contributionTotaleCommuneOrien1Acheves = 0;
    this.contributionTotaleCommuneOrien1Programmes = 0;
    this.contributionTotaleCommuneOrien2Encours = 0;
    this.contributionTotaleCommuneOrien2Nlances = 0;
    this.contributionTotaleCommuneOrien2Acheves = 0;
    this.contributionTotaleCommuneOrien2Programmes = 0;
    this.contributionTotaleCommuneOrien3Encours = 0;
    this.contributionTotaleCommuneOrien3Nlances = 0;
    this.contributionTotaleCommuneOrien3Acheves = 0;
    this.contributionTotaleCommuneOrien3Programmes = 0;
    this.contributionTotaleCommuneOrien4Encours = 0;
    this.contributionTotaleCommuneOrien4Nlances = 0;
    this.contributionTotaleCommuneOrien4Acheves = 0;
    this.contributionTotaleCommuneOrien4Programmes = 0;
    this.contributionTotaleCommuneOrien1 = 0;
    this.contributionTotaleCommuneOrien2 = 0;
    this.contributionTotaleCommuneOrien3 = 0;
    this.contributionTotaleCommuneOrien4 = 0;
    this.contributionTotaleCommune = 0;

    let dateDebut = this.searchForm2.value.dateDebut;
    let dateFin = this.searchForm2.value.dateFin;
    this.countNombreProjetsByOrientationsEtatAvancement(dateDebut, dateFin);
    this.countCoutProjetsByOrientationsEtatAvancement(dateDebut, dateFin);
    this.countContributionTotaleCommuneByOrientationsEtatAvancement(dateDebut, dateFin);


    this.fillChartByParam1(this.chartType1);
    this.fillChartByParam2(this.chartType2);
  }


  countNombreProjetsByOrientationsEtatAvancement(dateDebut: any, dateFin: any) {
    if (dateDebut != '' || dateFin != '') {
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien1Encours += 1;
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien1Acheves += 1;
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien1Nlances += 1;
        }

        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien2Encours += 1;
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien2Acheves += 1;
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien2Nlances += 1;
        }

        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien3Encours += 1;
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien3Acheves += 1;
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien3Nlances += 1;
        }

        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien4Encours += 1;
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien4Acheves += 1;
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.nbProjetOrien4Nlances += 1;
        }
      }
      this.nbProjetOrien1Programmes = this.nbProjetOrien1Encours + this.nbProjetOrien1Nlances + this.nbProjetOrien1Acheves;
      this.nbProjetOrien2Programmes = this.nbProjetOrien2Encours + this.nbProjetOrien2Nlances + this.nbProjetOrien2Acheves;
      this.nbProjetOrien3Programmes = this.nbProjetOrien3Encours + this.nbProjetOrien3Nlances + this.nbProjetOrien3Acheves;
      this.nbProjetOrien4Programmes = this.nbProjetOrien4Encours + this.nbProjetOrien4Nlances + this.nbProjetOrien4Acheves;
      this.nbProjetTotalProgrammes = this.nbProjetOrien1Programmes + this.nbProjetOrien2Programmes + this.nbProjetOrien3Programmes + this.nbProjetOrien4Programmes;
      this.nbProjetTotalNlances = this.nbProjetOrien1Nlances + this.nbProjetOrien2Nlances + this.nbProjetOrien3Nlances + this.nbProjetOrien4Nlances;
      this.nbProjetTotalEncours = this.nbProjetOrien1Encours + this.nbProjetOrien2Encours + this.nbProjetOrien3Encours + this.nbProjetOrien4Encours;
      this.nbProjetTotalAcheves = this.nbProjetOrien1Acheves + this.nbProjetOrien2Acheves + this.nbProjetOrien3Acheves + this.nbProjetOrien4Acheves;
    }
    else {
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'EN_COURS') {
          this.nbProjetOrien1Encours += 1;
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'ACHEVES') {
          this.nbProjetOrien1Acheves += 1;
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'NON_LANCES') {
          this.nbProjetOrien1Nlances += 1;
        }

        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'EN_COURS') {
          this.nbProjetOrien2Encours += 1;
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'ACHEVES') {
          this.nbProjetOrien2Acheves += 1;
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'NON_LANCES') {
          this.nbProjetOrien2Nlances += 1;
        }

        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'EN_COURS') {
          this.nbProjetOrien3Encours += 1;
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'ACHEVES') {
          this.nbProjetOrien3Acheves += 1;
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'NON_LANCES') {
          this.nbProjetOrien3Nlances += 1;
        }

        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'EN_COURS') {
          this.nbProjetOrien4Encours += 1;
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'ACHEVES') {
          this.nbProjetOrien4Acheves += 1;
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'NON_LANCES') {
          this.nbProjetOrien4Nlances += 1;
        }
      }
      this.nbProjetOrien1Programmes = this.nbProjetOrien1Encours + this.nbProjetOrien1Nlances + this.nbProjetOrien1Acheves;
      this.nbProjetOrien2Programmes = this.nbProjetOrien2Encours + this.nbProjetOrien2Nlances + this.nbProjetOrien2Acheves;
      this.nbProjetOrien3Programmes = this.nbProjetOrien3Encours + this.nbProjetOrien3Nlances + this.nbProjetOrien3Acheves;
      this.nbProjetOrien4Programmes = this.nbProjetOrien4Encours + this.nbProjetOrien4Nlances + this.nbProjetOrien4Acheves;
      this.nbProjetTotalProgrammes = this.nbProjetOrien1Programmes + this.nbProjetOrien2Programmes + this.nbProjetOrien3Programmes + this.nbProjetOrien4Programmes;
      this.nbProjetTotalNlances = this.nbProjetOrien1Nlances + this.nbProjetOrien2Nlances + this.nbProjetOrien3Nlances + this.nbProjetOrien4Nlances;
      this.nbProjetTotalEncours = this.nbProjetOrien1Encours + this.nbProjetOrien2Encours + this.nbProjetOrien3Encours + this.nbProjetOrien4Encours;
      this.nbProjetTotalAcheves = this.nbProjetOrien1Acheves + this.nbProjetOrien2Acheves + this.nbProjetOrien3Acheves + this.nbProjetOrien4Acheves;
      
    }
  }

  countCoutProjetsByOrientationsEtatAvancement(dateDebut: any, dateFin: any) {
    if (dateDebut != '' || dateFin != '') {
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien1Encours += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien1Acheves += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien1Nlances += this.programmes[i].cout;
        }

        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien2Encours += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien2Acheves += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien2Nlances += this.programmes[i].cout;
        }

        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien3Encours += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien3Acheves += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien3Nlances += this.programmes[i].cout;
        }

        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien4Encours += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien4Acheves += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          this.coutProjetOrien4Nlances += this.programmes[i].cout;
        }
      }
      this.coutProjetOrien1Programmes = this.coutProjetOrien1Encours + this.coutProjetOrien1Nlances + this.coutProjetOrien1Acheves;
      this.coutProjetOrien2Programmes = this.coutProjetOrien2Encours + this.coutProjetOrien2Nlances + this.coutProjetOrien2Acheves;
      this.coutProjetOrien3Programmes = this.coutProjetOrien3Encours + this.coutProjetOrien3Nlances + this.coutProjetOrien3Acheves;
      this.coutProjetOrien4Programmes = this.coutProjetOrien4Encours + this.coutProjetOrien3Nlances + this.coutProjetOrien4Acheves;
      this.coutProjetTotalProgrammes = this.coutProjetOrien1Programmes + this.coutProjetOrien2Programmes + this.coutProjetOrien3Programmes + this.coutProjetOrien4Programmes;;
      this.coutProjetTotalNlances = this.coutProjetOrien1Nlances + this.coutProjetOrien2Nlances + this.coutProjetOrien3Nlances + this.coutProjetOrien4Nlances;
      this.coutProjetTotalAcheves = this.coutProjetOrien1Acheves + this.coutProjetOrien2Acheves + this.coutProjetOrien3Acheves + this.coutProjetOrien4Acheves;
      this.coutProjetTotalEncours = this.coutProjetOrien1Encours + this.coutProjetOrien2Encours + this.coutProjetOrien3Encours + this.coutProjetOrien4Encours;
    }
    else {
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'EN_COURS') {
          this.coutProjetOrien1Encours += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'ACHEVES') {
          this.coutProjetOrien1Acheves += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'NON_LANCES') {
          this.coutProjetOrien1Nlances += this.programmes[i].cout;
        }

        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'EN_COURS') {
          this.coutProjetOrien2Encours += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'ACHEVES') {
          this.coutProjetOrien2Acheves += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'NON_LANCES') {
          this.coutProjetOrien2Nlances += this.programmes[i].cout;
        }

        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'EN_COURS') {
          this.coutProjetOrien3Encours += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'ACHEVES') {
          this.coutProjetOrien3Acheves += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'NON_LANCES') {
          this.coutProjetOrien3Nlances += this.programmes[i].cout;
        }

        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'EN_COURS') {
          this.coutProjetOrien4Encours += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'ACHEVES') {
          this.coutProjetOrien4Acheves += this.programmes[i].cout;
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'NON_LANCES') {
          this.coutProjetOrien4Nlances += this.programmes[i].cout;
        }
      }
      this.coutProjetOrien1Programmes = this.coutProjetOrien1Encours + this.coutProjetOrien1Nlances + this.coutProjetOrien1Acheves;
      this.coutProjetOrien2Programmes = this.coutProjetOrien2Encours + this.coutProjetOrien2Nlances + this.coutProjetOrien2Acheves;
      this.coutProjetOrien3Programmes = this.coutProjetOrien3Encours + this.coutProjetOrien3Nlances + this.coutProjetOrien3Acheves;
      this.coutProjetOrien4Programmes = this.coutProjetOrien4Encours + this.coutProjetOrien3Nlances + this.coutProjetOrien4Acheves;
      this.coutProjetTotalProgrammes = this.coutProjetOrien1Programmes + this.coutProjetOrien2Programmes + this.coutProjetOrien3Programmes + this.coutProjetOrien4Programmes;;
      this.coutProjetTotalNlances = this.coutProjetOrien1Nlances + this.coutProjetOrien2Nlances + this.coutProjetOrien3Nlances + this.coutProjetOrien4Nlances;
      this.coutProjetTotalAcheves = this.coutProjetOrien1Acheves + this.coutProjetOrien2Acheves + this.coutProjetOrien3Acheves + this.coutProjetOrien4Acheves;
      this.coutProjetTotalEncours = this.coutProjetOrien1Encours + this.coutProjetOrien2Encours + this.coutProjetOrien3Encours + this.coutProjetOrien4Encours;
    }
  }



  countContributionTotaleCommuneByOrientationsEtatAvancement(dateDebut: any, dateFin: any) {
    if (dateDebut != '' || dateFin != '') {
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien1Encours += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien1Acheves += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien1Nlances += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }

        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien2Encours += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien2Acheves += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien2Nlances += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien3Encours += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien3Acheves += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien3Nlances += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }

        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'EN_COURS' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien4Encours += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'ACHEVES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien4Acheves += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'NON_LANCES' && (new Date(this.programmes[i].date) >= new Date(dateDebut) || new Date(this.programmes[i].dateFin) <= new Date(dateFin))) {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien4Nlances += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
      }
      this.contributionTotaleCommuneOrien1Programmes = this.contributionTotaleCommuneOrien1Encours + this.contributionTotaleCommuneOrien1Nlances + this.contributionTotaleCommuneOrien1Acheves;
      this.contributionTotaleCommuneOrien2Programmes = this.contributionTotaleCommuneOrien2Encours + this.contributionTotaleCommuneOrien2Nlances + this.contributionTotaleCommuneOrien2Acheves;
      this.contributionTotaleCommuneOrien3Programmes = this.contributionTotaleCommuneOrien3Encours + this.contributionTotaleCommuneOrien3Nlances + this.contributionTotaleCommuneOrien3Acheves;
      this.contributionTotaleCommuneOrien4Programmes = this.contributionTotaleCommuneOrien4Encours + this.contributionTotaleCommuneOrien4Nlances + this.contributionTotaleCommuneOrien4Acheves;
      this.contributionTotaleCommuneOrien1 = this.contributionTotaleCommuneOrien1Acheves + this.contributionTotaleCommuneOrien1Encours + this.contributionTotaleCommuneOrien1Nlances + this.contributionTotaleCommuneOrien1Programmes + this.contributionTotaleCommuneOrien4Programmes;
      this.contributionTotaleCommuneOrien2 = this.contributionTotaleCommuneOrien2Acheves + this.contributionTotaleCommuneOrien2Encours + this.contributionTotaleCommuneOrien2Nlances + this.contributionTotaleCommuneOrien2Programmes + this.contributionTotaleCommuneOrien4Programmes;
      this.contributionTotaleCommuneOrien3 = this.contributionTotaleCommuneOrien3Acheves + this.contributionTotaleCommuneOrien3Encours + this.contributionTotaleCommuneOrien3Nlances + this.contributionTotaleCommuneOrien3Programmes + this.contributionTotaleCommuneOrien4Programmes;
      this.contributionTotaleCommune = this.contributionTotaleCommuneOrien1 + this.contributionTotaleCommuneOrien2 + this.contributionTotaleCommuneOrien3+ this.contributionTotaleCommuneOrien4;
    }
    else {
      for (let i = 0; i < this.programmes.length; i++) {
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'EN_COURS') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien1Encours += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'ACHEVES') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien1Acheves += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville authentique, intégrée et tournée vers l'avenir " && this.programmes[i].etatAvancement == 'NON_LANCES') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien1Nlances += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'EN_COURS') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien2Encours += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'ACHEVES') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien2Acheves += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Ville résiliente et durable" && this.programmes[i].etatAvancement == 'NON_LANCES') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien2Nlances += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'EN_COURS') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien3Encours += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'ACHEVES') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien3Acheves += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Développement du capital humain " && this.programmes[i].etatAvancement == 'NON_LANCES') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien3Nlances += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
      

        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'EN_COURS') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien4Encours += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'ACHEVES') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien4Acheves += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
        if (this.programmes[i].orientationStrategique == "Une économie prospère et diversifiée" && this.programmes[i].etatAvancement == 'NON_LANCES') {
          for (let j = 0; j < this.programmes[i].programmePhaseBudgets.length; j++) {
            this.contributionTotaleCommuneOrien4Nlances += this.programmes[i].programmePhaseBudgets[j].totalContributionCommunePh1Ph2;
          }
        }
      }
      this.contributionTotaleCommuneOrien1Programmes = this.contributionTotaleCommuneOrien1Encours + this.contributionTotaleCommuneOrien1Nlances + this.contributionTotaleCommuneOrien1Acheves;
      this.contributionTotaleCommuneOrien2Programmes = this.contributionTotaleCommuneOrien2Encours + this.contributionTotaleCommuneOrien2Nlances + this.contributionTotaleCommuneOrien2Acheves;
      this.contributionTotaleCommuneOrien3Programmes = this.contributionTotaleCommuneOrien3Encours + this.contributionTotaleCommuneOrien3Nlances + this.contributionTotaleCommuneOrien3Acheves;
      this.contributionTotaleCommuneOrien4Programmes = this.contributionTotaleCommuneOrien4Encours + this.contributionTotaleCommuneOrien4Nlances + this.contributionTotaleCommuneOrien4Acheves;
      this.contributionTotaleCommuneOrien1 = this.contributionTotaleCommuneOrien1Acheves + this.contributionTotaleCommuneOrien1Encours + this.contributionTotaleCommuneOrien1Nlances + this.contributionTotaleCommuneOrien1Programmes + this.contributionTotaleCommuneOrien4Programmes;
      this.contributionTotaleCommuneOrien2 = this.contributionTotaleCommuneOrien2Acheves + this.contributionTotaleCommuneOrien2Encours + this.contributionTotaleCommuneOrien2Nlances + this.contributionTotaleCommuneOrien2Programmes + this.contributionTotaleCommuneOrien4Programmes;
      this.contributionTotaleCommuneOrien3 = this.contributionTotaleCommuneOrien3Acheves + this.contributionTotaleCommuneOrien3Encours + this.contributionTotaleCommuneOrien3Nlances + this.contributionTotaleCommuneOrien3Programmes + this.contributionTotaleCommuneOrien4Programmes;
      this.contributionTotaleCommune = this.contributionTotaleCommuneOrien1 + this.contributionTotaleCommuneOrien2 + this.contributionTotaleCommuneOrien3+ this.contributionTotaleCommuneOrien4;
    }
  }

  reset() {
    if (this.dash1 != undefined || this.dash2 != undefined) {
      this.dash1.destroy();
      this.dash2.destroy();
    }
    this.searchForm2 = this.fb.group({
      dateDebut: new FormControl(''),
      dateFin: new FormControl('')
    })

    this.nbProjetOrien1Encours = 0;
    this.nbProjetOrien1Nlances = 0;
    this.nbProjetOrien1Acheves = 0;
    this.nbProjetOrien1Programmes = 0;
    this.nbProjetOrien2Encours = 0;
    this.nbProjetOrien2Nlances = 0;
    this.nbProjetOrien2Acheves = 0;
    this.nbProjetOrien2Programmes = 0;
    this.nbProjetOrien3Encours = 0;
    this.nbProjetOrien3Nlances = 0;
    this.nbProjetOrien3Acheves = 0;
    this.nbProjetOrien3Programmes = 0;
    this.nbProjetOrien4Encours = 0;
    this.nbProjetOrien4Nlances = 0;
    this.nbProjetOrien4Acheves = 0;
    this.nbProjetOrien4Programmes = 0;
    this.nbProjetTotalEncours = 0;
    this.nbProjetTotalAcheves = 0;
    this.nbProjetTotalNlances = 0;
    this.nbProjetTotalProgrammes = 0;

    this.coutProjetOrien1Encours = 0;
    this.coutProjetOrien1Nlances = 0;
    this.coutProjetOrien1Acheves = 0;
    this.coutProjetOrien1Programmes = 0;
    this.coutProjetOrien2Encours = 0;
    this.coutProjetOrien2Nlances = 0;
    this.coutProjetOrien2Acheves = 0;
    this.coutProjetOrien2Programmes = 0;
    this.coutProjetOrien3Encours = 0;
    this.coutProjetOrien3Nlances = 0;
    this.coutProjetOrien3Acheves = 0;
    this.coutProjetOrien3Programmes = 0;
    this.coutProjetOrien4Encours = 0;
    this.coutProjetOrien4Nlances = 0;
    this.coutProjetOrien4Acheves = 0;
    this.coutProjetOrien4Programmes = 0;
    this.coutProjetTotalProgrammes = 0;
    this.coutProjetTotalNlances = 0;
    this.coutProjetTotalEncours = 0;
    this.coutProjetTotalAcheves = 0;



    this.contributionTotaleCommuneOrien1Encours = 0;
    this.contributionTotaleCommuneOrien1Nlances = 0;
    this.contributionTotaleCommuneOrien1Acheves = 0;
    this.contributionTotaleCommuneOrien1Programmes = 0;
    this.contributionTotaleCommuneOrien2Encours = 0;
    this.contributionTotaleCommuneOrien2Nlances = 0;
    this.contributionTotaleCommuneOrien2Acheves = 0;
    this.contributionTotaleCommuneOrien2Programmes = 0;
    this.contributionTotaleCommuneOrien3Encours = 0;
    this.contributionTotaleCommuneOrien3Nlances = 0;
    this.contributionTotaleCommuneOrien3Acheves = 0;
    this.contributionTotaleCommuneOrien3Programmes = 0;
    this.contributionTotaleCommuneOrien4Encours = 0;
    this.contributionTotaleCommuneOrien4Nlances = 0;
    this.contributionTotaleCommuneOrien4Acheves = 0;
    this.contributionTotaleCommuneOrien4Programmes = 0;
    this.contributionTotaleCommuneOrien1 = 0;
    this.contributionTotaleCommuneOrien2 = 0;
    this.contributionTotaleCommuneOrien3 = 0;
    this.contributionTotaleCommuneOrien4 = 0;
    this.contributionTotaleCommune = 0;
  }

  fillChartByParam1(chartType) {
    if (this.nbProjetTotalProgrammes != 0 || this.nbProjetTotalNlances != 0 || this.nbProjetTotalAcheves != 0 || this.nbProjetTotalEncours != 0) {
      let libelle = [this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.PROJETSPROGRAMMES"), this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.PROJETSACHEVES"), this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.PROJETSENCOURS"), this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.PROJETSNONLANCES")];
      let id = [this.nbProjetTotalProgrammes, this.nbProjetTotalAcheves, this.nbProjetTotalEncours, this.nbProjetTotalNlances];
      this.chartOptionBar(libelle, id, chartType);
    }

  }
  fillChartByParam2(chartType) {
    if (this.nbProjetTotalProgrammes != 0 || this.nbProjetTotalNlances != 0 || this.nbProjetTotalAcheves != 0 || this.nbProjetTotalEncours != 0) {
      const _this = this;
      let tauxProjetsAcheves = 0;
      let tauxProjetsNlances = 0;
      let tauxProjetsEncours = 0
      tauxProjetsAcheves = this.nbProjetTotalAcheves / this.nbProjetTotalProgrammes * 100;
      tauxProjetsNlances = this.nbProjetTotalNlances / this.nbProjetTotalProgrammes * 100;
      tauxProjetsEncours = this.nbProjetTotalEncours / this.nbProjetTotalProgrammes * 100;

      let libelle = [this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.PROJETSACHEVES"), this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.PROJETSENCOURS"), this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.PROJETSNONLANCES")];
      let id = [tauxProjetsAcheves, tauxProjetsEncours, tauxProjetsNlances];
      this.chartOptionPie(libelle, id, chartType);
    }
  }


  dash1;
  dash2;
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
  }
  chartOptionBar(libelle, id, type) {
    var ctx = document.getElementById("canvas1");
    const labelColors = {
      'Projets en cours': 'yellow',
      'Projets non lancés': 'red', 
      'Projets achevés': 'green',
      'Projets programmés': '#7030a0',
      'المشاريع المنطلقة': 'yellow',
      'المشاريع التي لم تنطلق': 'red', 
      'المشاريع المنتهية': 'green',
      'المشاريع المبرمجة': '#7030a0',
    };
    this.dash1 = new Chart(ctx, {
      type: type,
      data: {
        labels: libelle, // date par ex
        datasets: [
          {
            label: this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.BILANPLANACTIONCOMMUNEMARRAKECH"),
            data: id,
            backgroundColor: libelle.map((label) => labelColors[label]),
            borderWidth: 0,
            fill: true,
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  chartOptionPie(libelle, id, type) {
    var ctx = document.getElementById("canvas2");
    const labelColors = {
      'Projets en cours': 'yellow',
      'Projets non lancés': 'red', 
      'Projets achevés': 'green',
      'المشاريع المنطلقة': 'yellow',
      'المشاريع التي لم تنطلق': 'red', 
      'المشاريع المنتهية': 'green',
    };
    this.dash2 = new Chart(ctx, {
      type: type,
      data: {
        labels: libelle, // date par ex
        datasets: [
          {
            label: this.translateService.instant("PAGES.PROGRAMME.STATISTIQUE.BILANPLANACTIONCOMMUNEMARRAKECH"),
            data: id,
            backgroundColor: libelle.map((label) => labelColors[label]),
            borderWidth: 0,
            fill: true,
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
      },
    });
  }
}
