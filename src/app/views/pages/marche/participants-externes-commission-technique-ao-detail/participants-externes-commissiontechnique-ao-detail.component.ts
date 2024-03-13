import { Component, OnInit, ViewChild } from '@angular/core';
import { AoService } from '../../shared/ao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'kt-participants-externes-commission-technique-ao-detail',
  templateUrl: './participants-externes-commission-technique-ao-detail.component.html',
  styleUrls: ['./participants-externes-commission-technique-ao-detail.component.scss']
})
export class ParticipantsExternesCommissionTechniqueAoDetailComponent implements OnInit {
  // =================================================================
  //
  // =================================================================
  dataSize: number = 0;
  isLoading = true;
  idao;
  typeCommission
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumnsPE = ['nom', 'organisme', 'tele', 'role', 'present', 'justif', 'actions'];
  dataSourcePE: MatTableDataSource<any>;
  TypeCommission = 0;
  // =================================================================
  //
  // =================================================================
  constructor(private service: AoService, private router: Router,
    private activatedRoute: ActivatedRoute) { this.getParticipants(); }
  // =================================================================
  //
  // =================================================================
  ngOnInit() {

  }
  // =================================================================
  //
  // =================================================================
  getParticipants() {
    const _this = this;
    /* this.activatedRoute.queryParams.subscribe(params => {
      this.idao = params['id'];
    }); */
    this.service.data$.subscribe(res=>this.typeCommission=res);

    this.service.data$.subscribe(res=>this.idao=res);
    this.service.getPEbyEtatMembre('MEMBRE_TECHNIQUE',this.idao).then(data => {
            // this.TypeCommission = data[0].commission.typeCommission.id;
            _this.dataSize = data.totalElements;
            this.isLoading = false;
      this.dataSourcePE = new MatTableDataSource(data.content);
    }, (err) => {
      _this.dataSize = 0;
      console.log(err);
      this.isLoading = false; 
    })
  }
  /**
   * 
   * @param idCommission 
   * @param nom 
   * @param prenom 
   */
  // type commission : 1: overture des plis, 2:Administratif, 3: technique, 4: financier, 5: final
  // generer une convoation
  convocation(idCommission,nom,prenom) {
    this.service.data$.subscribe(res=>this.typeCommission=res);

    this.service.getPEbyEtatMembre('MEMBRE_TECHNIQUE',idCommission).then(data => {

    console.log("id Comm :: " + this.idao + " / "+ idCommission)
    // this.service.getPEbyAo(idCommission).then(data => {
      let fullname = nom + " " + prenom; 
      console.log("participant :: " + fullname)
      let idAo = data.content[0].ao.id;
      // let etape = data[0].commission.typeCommission.id;
      this.convocationTraitement(idAo,fullname,this.typeCommission);
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
