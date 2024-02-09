import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NouveauNeService } from '../services/nouveau-ne.service';
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kt-details-nouveau-ne',
  templateUrl: './details-nouveau-ne.component.html',
  styleUrls: ['./details-nouveau-ne.component.scss']
})
export class DetailsNouveauNeComponent implements OnInit {

  info:any;
  id:any;
  dataSource2 = new MatTableDataSource<any>();
  displayedColumns2=['nomDoc','titre','dow']
  AlfresscoURL = environment.API_ALFRESCO_URL
  constructor(private httpClient: HttpClient,private datePipe:DatePipe, private route:ActivatedRoute,private service:NouveauNeService,private router:Router) { }
  details
  ngOnInit() {
    this.route.params.subscribe(params => {
       
      this.id = params['id']; // Récupération de l'ID à partir des paramètres de l'URL
       
      this.service.getById(this.id).subscribe(
        (data: any) => {
          this.info = data; 
              this.info.value 
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );
    });
    this.getAllPjImm(this.id)
  }
	async getAllPjImm(ide) {
    await this.httpClient.get(`${this.AlfresscoURL}/bmh-nouveau/index/${ide}`)
          .subscribe(
                  (data:any) => {
                    // debugger
                      this.dataSource2 = new MatTableDataSource(data);
                  },
                  (error) => console.log(error)
              );
          }
          onClickPj(e, id) {
              var r = e.substring(0, e.length - 4);
              window.open(this.AlfresscoURL + "/bmh-nouveau/" + r, "_blank");
          }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-nouveauNe"]);
	}
}
