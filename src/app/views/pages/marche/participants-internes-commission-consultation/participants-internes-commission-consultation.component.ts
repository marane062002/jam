import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultationService } from '../../shared/consultation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonnelService } from '../../rh/services/personnel.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'kt-participants-internes-commission-consultation',
  templateUrl: './participants-internes-commission-consultation.component.html',
  styleUrls: ['./participants-internes-commission-consultation.component.scss']
})
export class ParticipantsInternesCommissionConsultationComponent implements OnInit {
  
  idao;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumnsPI = ['nom','role', 'present','justif'];
  dataSourcePI: MatTableDataSource<any>;
  PI: any[] = [];
  pIdata=[];
  isLoading = true;
  
  constructor(private service : ConsultationService,private router: Router,
    private activatedRoute: ActivatedRoute, private service1:PersonnelService)
   {this.getParticipants(); }

  ngOnInit() {
  }

  getParticipants(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.idao= params['id'];
     });
     this.PI= [];
     this.service.getPIbyConsultation(this.idao).then(data => {
       console.log(data)
       this.isLoading=false;
        
      this.pIdata=data;
      for (let i = 0; i < this.pIdata.length; i++) { 
        this.PI.push(
          this.createNewPI(i)
        );  
     }
     this.dataSourcePI = new MatTableDataSource(this.PI);
     this.dataSourcePI.sort = this.sort;
     })
  }


  async getPersonnel(iduser,i){
    await 
    this.service1.getProfileById(iduser)
    .subscribe(data =>{ 
      this.PI[i].nom=data[0].nom + " " +data[0].prenom;
      if(this.pIdata[i].present==true){
        this.PI[i].present="نعم";
      }
      else if(this.pIdata[i].present==false){this.PI[i].present="لا";}
      else{this.PI[i].present="";}
      if(i==this.pIdata.length-1){
      }
     })}
 
  createNewPI(i: number): any {
    this.getPersonnel(this.pIdata[i].idPersonnel,i);
    return {
      id: this.pIdata[i].id,
      justif:this.pIdata[i].justif,
      role:this.pIdata[i].role.libelle,
    };
  } 


}
