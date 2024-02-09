import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../../rh/services/personnel.service';
import { OrganisationService } from '../../organisation/organisation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
export interface Personnel360Tab {
  label: string;
  content: string;
}
@Component({
  selector: 'kt-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // =====================================
  // Declarations
  // =====================================
  checkLang: string;
  asyncTabs: Observable<Personnel360Tab[]>;
  selected = new FormControl(0);
  id: number;
  personnel: any;
  divisionLibelle: any;
  serviceLibelle: any;
  constructor(private service: PersonnelService,
    private service1: OrganisationService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    // check manguage SI
    this.checkLang = window.localStorage.getItem("language");
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getPersonnel()
    this.asyncTabs = new Observable(
      (observer: Observer<Personnel360Tab[]>) => {
        setTimeout(() => {
          observer.next([
            {
              label: "MENU.PRESENCES",
              content: '1',
            },
            {
              label: "MENU.PERMANENCES",
              content: "2"
            },
            {
              label: "MENU.NOTATIONS",
              content: "3"
            },
            {
              label: "MENU.ATTESTATIONS",
              content: "4"
            }/* ,
               {
                label: "PAGES.ASSOCIATION.TAB_CONVENTION",
                content: "5"
              } */
          ]);
        }, 1000);
      }
    );
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.checkLang = 'ar';
      } else if (event.lang == 'fr') {
        this.checkLang = 'fr';
      }
      this.getPersonnel();
    });
  }

  async getPersonnel() {
    await
      this.service.getProfileById(this.id)
        .subscribe(data => {
          this.personnel = data[0]
          console.log("Personnel: " + JSON.stringify(this.personnel, null, 4))
          if (this.personnel.idDivision != 0) {
            this.service1.findEntityById(this.personnel.idDivision, '/divisions/find/')
              .subscribe(d => {
                if (this.checkLang == 'ar')
                  this.divisionLibelle = d.libelle
                if (this.checkLang == 'fr')
                  this.divisionLibelle = d.libelleFR
              })

          }
          if (this.personnel.idService != 0) {
            this.service1.findEntityById(this.personnel.idService, '/services/find/')
              .subscribe(s => {
                if (this.checkLang == 'ar')
                  this.serviceLibelle = s.libelle
                if (this.checkLang == 'fr')
                  this.serviceLibelle = s.libelleFR
              })

          }
        }

          , error => console.log(error));

  }
  public delete(id: number) {
    this.service.deleteRessource(id, '/personnels/delete/')
      .subscribe(
        data => {
          console.log(data),
            this.router.navigate(['personnel/personnel-index'])

        },
        error => console.log(error));
  }


  update() {
    this.router.navigate(['/personnel/personnel-edit'], { queryParams: { id: this.id } })
  }

  changePwd() {
    let idUser = window.localStorage.getItem("idUser");
    console.log("user id! " + idUser)
    this.router.navigate(['/user/user-edit-pwd'], { queryParams: { id: idUser } })
  }

}
