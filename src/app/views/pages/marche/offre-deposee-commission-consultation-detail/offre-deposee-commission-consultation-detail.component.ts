import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultationService } from '../../shared/consultation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'kt-offre-deposee-commission-consultation-detail',
  templateUrl: './offre-deposee-commission-consultation-detail.component.html',
  styleUrls: ['./offre-deposee-commission-consultation-detail.component.scss']
})
export class OffreDeposeeCommissionConsultationDetailComponent implements OnInit {

  constructor(private service : ConsultationService,private router: Router,
    private activatedRoute: ActivatedRoute) { }
    displayedColumnsODEvAdmin1=['id', 'NomOrganisme','rc','tele','statut','reserve'];
    displayedColumnsODEvAdmin=['id', 'NomOrganisme','rc','tele','statut','reserve','actions'];
    dataSourceODEvTechnique: MatTableDataSource<any>;
    dataSourceODEvFinanciere: MatTableDataSource<any>;
    idconsultation;
    idtypeCommission;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
  

    
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idconsultation= params['id'];
      this.idtypeCommission=params['typecommission'];
     });
     this.getOffres();
  }

  async getOffres(){
    if(this.idtypeCommission==3){
      await this.service. getAllOffreDeposee(this.idconsultation).subscribe(data => {
         this.dataSourceODEvTechnique= new MatTableDataSource(data);
       })
    }
    if(this.idtypeCommission==4){
      await this.service.getAllOffreDeposeeByStatutTech(this.idconsultation).subscribe(data => {
         this.dataSourceODEvFinanciere= new MatTableDataSource(data);
       })
    }
}

    showoffre(offreId){

    }

}
