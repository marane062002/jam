import { Component, OnInit, ViewChild } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'kt-reunion-bureau-form',
  templateUrl: './reunion-bureau-form.component.html',
  styleUrls: ['./reunion-bureau-form.component.scss']
})
export class ReunionBureauFormComponent implements OnInit {

  timeDebutReunion ={hour:10 , minute:10};
  timeFinReunion ={hour:10 , minute:10};
  date = new FormControl(new Date());
	serializedDate = new FormControl(new Date().toISOString());
  formData={"id":0,"session":{"nomSession":"","id":0},"heureFin":null,
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

    this.service.getSessionOperationnelle().subscribe(data=>{
      for(var i=0;i<data.length ; i++){
        this.sessionIds.push(data[i])
      }
    })

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
  }

  send(){

    this.formData.heureDebut=new Date('2000/12/12'+' '+this.timeDebutReunion.hour+':'+this.timeDebutReunion.minute);
    this.formData.heureFin=new Date('2000/12/12'+' '+this.timeFinReunion.hour+':'+this.timeFinReunion.minute);
    this.service.sendreunionBureau(this.formData).subscribe(data=>{
      this.router.navigate(['/affaires-conseil/reunion-bureau-list'] );
    })
  /* forkJoin(this.service.sendPoints(this.dataSource.data),this.service.sendReunion(this.formData))
    .pipe(
      flatMap((res) => this.sendPresenceEtPoints(res[0],res[1])),)
    .subscribe((resfork) => { 
      this.router.navigate(['/affaires-conseil/reunion-bureau-list'] )

    })*/
 
  }

}
