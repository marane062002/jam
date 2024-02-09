import { Component, OnInit, ViewChild } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'kt-reunion-commission-conseil-form',
  templateUrl: './reunion-commission-conseil-form.component.html',
  styleUrls: ['./reunion-commission-conseil-form.component.scss']
})
export class ReunionCommissionConseilFormComponent implements OnInit {
  
  timeDebutReunion ={hour:10 , minute:10};
  timeFinReunion ={hour:10 , minute:10};
  date = new FormControl(new Date());
	serializedDate = new FormControl(new Date().toISOString());
  formData={"id":0,"commission":{"nomCommission":"","id":0},"session":{"nomSession":"","id":0},"heureFin":null,
  "heureDebut":null,"dateReunion":null,"libelleReunion":"","remarques":""};
  sessionIds=[];
  commissions={};
  statuts;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSourcePE: MatTableDataSource<any>;
  dataSourcePI: MatTableDataSource<any>;
  displayedColumns = ['id', 'session','objet', 'budget','dateRealisation','statut','recommandations'];
  dataSource: MatTableDataSource<any>;
  displayedColumnsPE = ['nom','tele','role', 'present','justif'];
  displayedColumnsPI = ['nom', 'division','service', 'role', 'present','justif'];
  
  constructor(private service : AffairesConseilService , private router: Router) { }

  ngOnInit() {

    $(function () {

      // We can attach the `fileselect` event to all file inputs on the page
      $(document).on('change', ':file', function () {
        var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label =  (new String(input.val())).replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
      });

      // We can watch for our custom `fileselect` event like this
      $(document).ready(function () {
        $(':file').on('fileselect', function (event, numFiles, label) {

          var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' وثائق مختارة' : label;

          if (input.length) {
            input.val(log);
          } else {
            if (log) alert(log);
          }

        });
      });

    });

    this.service.getSessionOperationnelle().subscribe(data=>{
      for(var i=0;i<data.length ; i++){
        this.sessionIds.push(data[i])
      }
    })

    this.service.getAllCommissionActuelles().subscribe(data=>{
      console.log(data)
      this.commissions=data;
    })

    this.service.getStatutsPoint(4).subscribe(data=>{
      this.statuts=data;
      console.log(data)
    })
  
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onChangeofOptionsCommission(commissionId){
          console.log(commissionId.value)
          this.service.getMembreConseilCommissionByCommission(commissionId.value)
          .subscribe(data=>{console.log(data)
            this.dataSourcePE=new MatTableDataSource(data);  })
          this.service.getPersonnelCommissionByCommission(commissionId.value)
          .subscribe(data=>{
            this.dataSourcePI=new MatTableDataSource(data);
            console.log(data)})
          this.service.getPointByCommissionEtStatut(commissionId.value).subscribe(data=>{
            this.dataSource=new MatTableDataSource(data);
                     console.log(data)
          })
  }

  sendPresenceEtPoints(points,reunion){
    var arr=[];
    var arr2=[];
    var arr3=[];
    for(var i=0;i<this.dataSourcePE.data.length;i++){
      var m={"membre":{"id":this.dataSourcePE.data[i].id},"present":this.dataSourcePE.data[i].present,
      "justif":this.dataSourcePE.data[i].justif,"reunion":{"id":reunion.id}
      }
      arr.push(m)
    }
    for(var i=0;i<this.dataSourcePI.data.length;i++){
      var m2={"personnel":{"id":this.dataSourcePI.data[i].id},"present":this.dataSourcePI.data[i].present,
      "justif":this.dataSourcePI.data[i].justif,"reunion":{"id":reunion.id}
      }
      arr2.push(m2)
    }
    for(var i=0;i<this.dataSource.data.length;i++){
      var m3={"point":{"id":this.dataSource.data[i].id},"reunion":{"id":reunion.id} }
      arr3.push(m3)
    }
    return forkJoin(this.service.sendPointReunion(arr3),this.service.sendMembreReunion(arr),
    this.service.sendPersonnelReunion(arr2));
   
  }

  send(){

    this.formData.heureDebut=new Date('2000/12/12'+' '+this.timeDebutReunion.hour+':'+this.timeDebutReunion.minute);
    this.formData.heureFin=new Date('2000/12/12'+' '+this.timeFinReunion.hour+':'+this.timeFinReunion.minute);
    this.service.sendReunion(this.formData).subscribe(data=>{
      this.router.navigate(['/affaires-conseil/reunion-commission-list'] );
          console.log(data)
    })
  /* forkJoin(this.service.sendPoints(this.dataSource.data),this.service.sendReunion(this.formData))
    .pipe(
      flatMap((res) => this.sendPresenceEtPoints(res[0],res[1])),)
    .subscribe((resfork) => { 
      this.router.navigate(['/affaires-conseil/reunion-commission-list'] )

    })*/
 
  }

}
