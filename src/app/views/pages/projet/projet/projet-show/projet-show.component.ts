import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../services/projet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { PersonnelService } from '../../../rh/services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';
import { AoService } from '../../../shared/ao.service';
import { NgxSpinnerService } from 'ngx-spinner';
export interface ProjetTab {
  label: string;
  content: string;
}
@Component({
  selector: 'kt-projet-show',
  templateUrl: './projet-show.component.html',
  styleUrls: ['./projet-show.component.scss']
})
export class ProjetShowComponent implements OnInit {
  // ============================================================
  // Declarations
  // ============================================================
  asyncTabs: Observable<ProjetTab[]>;
  selected = new FormControl(0);
  id: number;
  projet: any;
  pjs: any;
  checkLang: string;
  divisionLibelle: any;
  serviceLibelle: any;
  personnelLibelle: any;
  attributaireLibelle: any;
  // ============================================================
  // 
  // ============================================================
  constructor(private service: ProjetService,
    private router: Router, private route: ActivatedRoute,
    private translate: TranslateService,
    private notification: NotificationService,
    private servicePersonnel: PersonnelService,
    private organisationService: OrganisationService,
    private serviceAo: AoService,
    private SpinnerService: NgxSpinnerService,
  ) {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.checkLang = window.localStorage.getItem("language");

    this.getProjet(this.id)

    this.asyncTabs = new Observable(
      (observer: Observer<ProjetTab[]>) => {
        setTimeout(() => {
          observer.next([
            {
              label: "PAGES.GENERAL.PHASES_PROJET",
              content: '1',
            },
            {
              label: "PAGES.GENERAL.PJS",
              content: "2"
            }
          ]);
        }, 1000);
      }
    );
    this.getPjProjet(this.id);
  }
  // ============================================================
  // 
  // ============================================================
  ngOnInit() {
    //this.getPjProjet(this.id);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.checkLang = 'ar';
      } else if (event.lang == 'fr') {
        this.checkLang = 'fr';
      }
      this.getDivisionEtService();
    });
  }

  async getDivisionEtService() {
    await this.organisationService
      .findEntityById(this.projet.idDivision, "/divisions/find/")
      .subscribe((d) => {
        if (this.checkLang == 'ar') {
          this.divisionLibelle = d.libelle;
        }
        if (this.checkLang == 'fr') {
          this.divisionLibelle = d.libelleFR;
        }
      });

    await this.organisationService
      .findEntityById(this.projet.idService, "/services/find/")
      .subscribe((s) => {
        if (this.checkLang == 'ar') {
          this.serviceLibelle = s.libelle;
        }
        if (this.checkLang == 'fr') {
          this.serviceLibelle = s.libelleFR;
        }

      });

    await this.servicePersonnel.getProfileById(this.projet.idResponsableProjet)
      .subscribe((p) => {
        console.log("personne :: " + JSON.stringify(p, null, 2))
        if (this.checkLang == 'ar') {
          this.personnelLibelle = p[0].nom + " " + p[0].prenom;
        }
        if (this.checkLang == 'fr') {
          this.personnelLibelle = p[0].nom + " " + p[0].prenom;
        }

      });
  }
  // ============================================================
  // 
  // ============================================================
  getProjet(id) {
    setTimeout(() => { this.SpinnerService.show() }, 25);
    this.service.getDataShowProjetById(id)
      .then(data => {
        this.projet = data;
        this.getDivisionEtService();
        this.getAttributaire(data.prestataire);
        setTimeout(() => { this.SpinnerService.hide() }, 2000);
      }, error => {
        console.log(error);
        setTimeout(() => { this.SpinnerService.hide() }, 2000);
      });
  }

  getAttributaire(id) {
    this.serviceAo.getPrestataireById(id).subscribe((dataPrest) => {
      console.log("PRESTATAIRE: " + JSON.stringify(dataPrest, null, 2));
      this.attributaireLibelle = dataPrest.nom;
    });
  }
  // ============================================================
  // 
  // ============================================================
  getPjProjet(id) {
    this.service.getPjsProjetById(id)
      .then(data => {
        this.pjs = data;
      }, error => console.log(error));
  }
  // ============================================================
  // 
  // ============================================================
  onClickPjName(e, id) {
    console.log('You clicked: ' + e);
    var r = e.substring(0, e.length - 4);
    window.open(environment.API_ALFRESCO_URL + '/PjProjets/' + r);
  }
  // ============================================================
  // 
  // ============================================================
  update() {
    this.router.navigate(['/projet/projet-edit'], { queryParams: { id: this.id } })
  }
  // ============================================================
  // 
  // ============================================================
  delete(): void {
    console.log(this.id)
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteProjet(this.id)
        .subscribe(data => {
          console.log(data.id)
          //         this.router.navigateByUrl('projet/projet-index')
          this.router.navigate(['/projet/projet-index']);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
}