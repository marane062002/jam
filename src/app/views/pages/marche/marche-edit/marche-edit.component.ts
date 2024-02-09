import { Component, OnInit } from '@angular/core';
import { AoService } from '../../shared/ao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganisationService } from '../../organisation/organisation.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SpinnerService } from '../../utils/spinner.service';
import { finalize } from 'rxjs/operators';
 
@Component({
  selector: 'kt-marche-edit',
  templateUrl: './marche-edit.component.html',
  styleUrls: ['./marche-edit.component.scss']
})
export class MarcheEditComponent implements OnInit {
  checkLang: string;
  // =======================================================
  //
  // =======================================================
  constructor(
    private service: AoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service2: OrganisationService,
    private spinnerService: SpinnerService,
    private translate: TranslateService,
  ) { this.checkLang = window.localStorage.getItem("language"); }
  // =======================================================
  //
  // =======================================================
  formData = {
    id: 1,
    ao: { id: 1 },
    numAo: "",
    prestataire: {
      id: 1,
      nom: "",
      tel: "",
      rc: "",
      mail: "",
      adresse: "",
    },
    adjucataire: {
      id: 1,
      nom: "",
      prenom: "",
      adresse: "",
      mail: "",
      rc: "",
    },
    statutMarche: { id: 1, libelle: "" },
    descriptif: "",
    responsableMarche: 0,
    service: 0,
    division: 0,
    dateNotification: null,
    mntEngage: 0,
    plafondRetenu: 0,
    prctRetenu: 0,
    cautionDefinitive: 0,
    delaisExecution: 0,
    dateDebutMarche: null,
    modePassation: { id: 0, libelle: "" },
    objet: "",
    mntAdjucataire: 0,
    numMarche: "",
    modificateurUser: "",
  };

  typeBien = [
    { id: 1, libelle: "service1" },
    { id: 2, libelle: "service2" },
  ];
  typeBien1 = [
    { id: 1, libelle: "division 1" },
    { id: 2, libelle: "division 2" },
  ];
  personnel = [
    { id: 1, libelle: " pers1" },
    { id: 2, libelle: "pers2" },
  ];
  // =======================================================
  //
  // =======================================================
  idmarche;
  AllModePassation;
  idOffreDeposee;
  ao;
  offreAdjucataire;
  divisions;
  services;
  // =======================================================
  //
  // =======================================================
  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (event.lang == 'ar') {
        this.checkLang = 'ar';
      } else if (event.lang == 'fr') {
        this.checkLang = 'fr';
      }
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idmarche = params["id"];
    });

    this.getDivisions();

    var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner

    this.service.getMarcheById(this.idmarche)
      .pipe(finalize(() => {
        this.spinnerService.stop(spinnerRef);// stop spinner
      }))
      .subscribe((data) => {
        this.formData = data;
        this.formData.id = data.id;
        if (this.formData.dateDebutMarche != null)
          this.formData.dateDebutMarche = new Date(data.dateDebutMarche).toISOString();
        if (this.formData.dateNotification != null)
          this.formData.dateNotification = new Date(data.dateNotification).toISOString();
        this.service2.getRessourceById(this.formData.division, "/services/divisions/")
          .subscribe((data2) => {
            this.services = data2;
          });

      },
        (err) => {
          console.log(err);
        });
  }
  // =======================================================
  //
  // =======================================================
  getDivisions() {
    this.service2.getRessource("/divisions/index").subscribe((data) => {
      this.divisions = data;
    });
  }
  // =======================================================
  //
  // =======================================================
  onChangeDivision(f) {
    const idDivision = f.value;
    this.formData.service = 0;
    if (idDivision != 0) {
      this.service2
        .getRessourceById(idDivision, "/services/divisions/")
        .subscribe(
          (data) => {
            this.services = data;
          },
          (error) => console.log(error)
        );
    } else {
      this.services = null;
    }
  }
  // =======================================================
  //
  // =======================================================
  onSubmit(form: NgForm) {
    this.formData.modificateurUser = window.localStorage.getItem("fullnameUser");
    this.service.updateMarche(this.formData).subscribe((data) => {
      this.router.navigate(["/marches/marches-list"]);
    });
  }
  // =======================================================
  //
  // =======================================================
  backAo() {
    this.router.navigate(["/marches/marches-list"]);
  }

}
