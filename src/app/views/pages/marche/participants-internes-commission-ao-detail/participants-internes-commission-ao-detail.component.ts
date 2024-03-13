import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnelService } from '../../rh/services/personnel.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'kt-participants-internes-commission-ao-detail',
  templateUrl: './participants-internes-commission-ao-detail.component.html',
  styleUrls: ['./participants-internes-commission-ao-detail.component.scss']
})
export class ParticipantsInternesCommissionAoDetailComponent implements OnInit {
  // =================================================================
  //
  // =================================================================
  TypeCommission  = 0;
  dataSize: number = 0;
  idao;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumnsPI = ['nom', 'role', 'present', 'justif', 'actions'];
  dataSourcePI: MatTableDataSource<any>;
  PI: any[] = [];
  pIdata = [];
  isLoading = true;
  // =================================================================
  //
  // =================================================================
  constructor(private service: AoService, private router: Router,
    private activatedRoute: ActivatedRoute, private service1: PersonnelService) { this.getParticipants(); }
  // =================================================================
  //
  // =================================================================
  ngOnInit() {
  }
  // =================================================================
  //
  // =================================================================
  typeCommission
  getParticipants() {
    const _this = this;
    /* this.activatedRoute.queryParams.subscribe(params => {
      this.idao = params['id'];
    }); */
    this.service.data$.subscribe(res=>this.idao=res);
    this.service.data$.subscribe(res=>this.typeCommission=res);
    
    this.PI = [];
    this.service.getPIbyEtatMembre('MEMBRE_NON_TECHNIQUE',this.idao).then(data => {
      _this.dataSize = data.totalElements;
      if(_this.dataSize > 0){
          // this.TypeCommission = data[0].commission.typeCommission.id;
          this.pIdata = data.content;
          console.log("Part ext: " + JSON.stringify(this.pIdata, null,2))
          for (let i = 0; i < this.pIdata.length; i++) {
            this.PI.push(
              this.createNewPI(i)
            );
          }
          console.log("PI: " + JSON.stringify(this.PI, null,2))
          this.dataSourcePI = new MatTableDataSource(this.PI);
      }else{
          _this.dataSize = 0;
      }
      this.isLoading = false;
    }, (err) => {
      _this.dataSize = 0;
      console.log(err);
      this.isLoading = false;
    })
  }
  // =================================================================
  //
  // =================================================================
  async getPersonnel(iduser, i) {
    await
      this.service1.getProfileById(iduser)
        .subscribe(data => {
          this.PI[i].nom = data[0].nom + " " + data[0].prenom;
          console.log("this.PI[i].nom: " + JSON.stringify(this.PI[i].nom, null,2))
          if (this.pIdata[i].present == true) {
            this.PI[i].present = "Oui";
          }
          else if (this.pIdata[i].present == false) { this.PI[i].present = "Non"; }
          else { this.PI[i].present = ""; }
          if (i == this.pIdata.length - 1) {
          }
        })
  }
  // =================================================================
  //
  // =================================================================
  createNewPI(i: number): any {
    this.getPersonnel(this.pIdata[i].idPersonnel, i);
    return {
      id: this.pIdata[i].id,
      justif: this.pIdata[i].justif,
      role: this.pIdata[i].role.libelle,
    };
  }
  page
// generer une convoation
convocation(idCommission,nomComplet) {
  this.service.data$.subscribe(res=>this.typeCommission=res);

  this.service.getPIbyEtatMembre('MEMBRE_NON_TECHNIQUE',idCommission).then(data => {
  // this.service.getPIbyAo(idCommission).then(data => {
    let idAo = data.content[0].ao.id;
    // let etape = data[0].commission.typeCommission.id;
    this.convocationTraitement(idAo,nomComplet,this.typeCommission);
  }, (err) => {
    console.log(err);
  })
}

	// ================================================================
	//
	// ================================================================
	convocationTraitement(idAo,participant,type) {
		this.service.convocationCommissionAoGenerator("convocationCommissionAo/", idAo, participant,type).subscribe((res) => {
			const file = new Blob([(res as unknown) as BlobPart], {
				type: "application/pdf",
			});
			const fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		},
			(err) => {
				console.log(err);
			});
	}
}
