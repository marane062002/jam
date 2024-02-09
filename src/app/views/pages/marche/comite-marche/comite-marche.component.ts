import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { ActivatedRoute } from '@angular/router';
import { OrganisationService } from '../../organisation/organisation.service';
import { PersonnelService } from '../../rh/services/personnel.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'kt-comite-marche',
  templateUrl: './comite-marche.component.html',
  styleUrls: ['./comite-marche.component.scss']
})
export class ComiteMarcheComponent implements OnInit {
  // =======================================================
  //
  // =======================================================
  constructor(
    private service: AoService,
    private service2: OrganisationService,
    private activatedRoute: ActivatedRoute,
    private service1: PersonnelService,
    private translate: TranslateService,
    private notification: NotificationService,) { }
  // =======================================================
  //
  // =======================================================
  dataSourcePI: MatTableDataSource<any>;
  displayedColumnsPI = ['nom', 'division', 'service', 'role', 'actions'];
  idmarche;
  allcomites;
  showComiteTable = 0;
  selectedStatus = 0;
  participantInterne = {
    "division": 0, "service": 0, "personnel": 0,
    "role": { "id": 0 }, "marche": { "id": 1 }
  };
  roleCommissionAll;
  divisions;
  services;
  personnels;
  typeBien = [{ "id": 1, "libelle": "service1" }, { "id": 2, "libelle": "service2" }];
  typeBien1 = [{ "id": 1, "libelle": "division 1" }, { "id": 2, "libelle": "division 2" }];
  personnel = [{ "id": 1, "nom": " pers1" }, { "id": 2, "nom": "pers2" }];
  PI: any[] = [];
  pIdata = [];
  // =======================================================
  //
  // =======================================================
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idmarche = params['id'];
    });
    this.service.getAllRoleCommission().subscribe(data => {
      this.roleCommissionAll = data;
    });
    this.populate();
    this.getDivisions();
  }
  // =======================================================
  //
  // =======================================================
  getDivisions() {
    this.service2.getRessource('/divisions/index')
      .subscribe(data => this.divisions = data);
  }
  // =======================================================
  //
  // =======================================================
  onChangeDivision(f) {
    const idDivision = f.value;
    this.participantInterne.service = 0;
    if (idDivision != 0) {
      this.service2.getRessourceById(idDivision, '/services/divisions/')
        .subscribe(data => {
          this.services = data
        },
          error => console.log(error)
        );
    } else {
      this.services = null;
    }
  }
  // =======================================================
  //
  // =======================================================
  onChangeService(f) {
    const idService = f.value;
    if (idService != 0) {
      this.service1.getRessourceById(idService, '/personnels/service/')
        .then(data => {
          this.personnels = data
        },
          error => console.log(error)
        )
    }
  }
  // =======================================================
  //
  // =======================================================
  populate() {
    this.service.getAllComiteMarche(this.idmarche).subscribe(data => {
      console.log("#DATA :: " + JSON.stringify(data, null, 1))
      if (data.length) {
        this.showComiteTable = 1;
        this.PI = [];
        this.dataSourcePI = new MatTableDataSource(this.PI);
        this.pIdata = data;
        for (let i = 0; i < this.pIdata.length; i++) {
          this.PI.push(
            this.createNewPI(i)
          );
        }
        console.log("#PI :: " + JSON.stringify(this.PI, null, 1))
        this.dataSourcePI = new MatTableDataSource(this.PI);
      }else{
        this.dataSourcePI = new MatTableDataSource(null);
        this.showComiteTable = 0;
      }
    });
  }
  // =======================================================
  //
  // =======================================================
  nouveauParticipant() {
    this.selectedStatus = 1;
  }
  // =======================================================
  //
  // =======================================================
  onClick(f) {
    this.participantInterne.marche.id = this.idmarche;
    this.selectedStatus = 0;
    this.service.sendComiteMarche(this.participantInterne).subscribe(data => {
      this.populate();
      this.participantInterne = {
        "division": 0, "service": 0, "personnel": 0,
        "role": { "id": 0 }, "marche": { "id": 1 }
      };
    })
    this.populate();
  }
  // =======================================================
  //
  // =======================================================
  async getPersonnel(iduser, i) {
    await
      this.service1.getProfileById(iduser)
        .subscribe(data => {
          this.PI[i].nom = data[0].nom + " " + data[0].prenom;
        })
  }
  // =======================================================
  //
  // =======================================================
  async getDivision(idDivsion, i) {
    await
      this.service2.findEntityById(idDivsion, "/divisions/find/")
        .subscribe(dataD => {
          console.log("#DATA DIVISION :: " + JSON.stringify(dataD, null, 1))
          this.PI[i].libelleD = dataD.libelleFR;
        })
  }
  // =======================================================
  //
  // =======================================================
  async getService(idService, i) {
    await
      this.service2.findEntityById(idService, "/services/find/")
        .subscribe(dataS => {
          console.log("#DATA DIVISION :: " + JSON.stringify(dataS, null, 1))
          this.PI[i].libelleS = dataS.libelleFR;
        })
  }
  // =======================================================
  //
  // =======================================================
  createNewPI(i: number): any {
    this.getPersonnel(this.pIdata[i].personnel, i);
    this.getDivision(this.pIdata[i].division, i);
    this.getService(this.pIdata[i].service, i);
    return {
      id: this.pIdata[i].id,
      role: this.pIdata[i].role.libelle,
    };
  }
  // =======================================================
  //
  // =======================================================
  editComite(id) {

  }
  // =======================================================
  //
  // =======================================================
  deleteComite(id) {
    console.log("#ID: " + id);
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service
        .deleteComiteMarche(id)
        .subscribe((r) => {
          this.populate();
          console.log("Comite marche deleted : " + id);
        }, (err) => {
          console.log(err);
        });
      this.notification.warn(
        this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      );
    }
  }
}
