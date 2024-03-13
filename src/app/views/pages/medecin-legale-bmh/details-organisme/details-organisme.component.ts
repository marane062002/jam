import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismeService } from '../services/organisme.service';
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kt-details-organisme',
  templateUrl: './details-organisme.component.html',
  styleUrls: ['./details-organisme.component.scss']
})
export class DetailsOrganismeComponent implements OnInit {

  info:any;
  id:any;
  dataSource2 = new MatTableDataSource<any>();
  displayedColumns2=['nomDoc','titre','dow']
  AlfresscoURL = environment.API_ALFRESCO_URL
  constructor(private httpClient: HttpClient ,private route:ActivatedRoute,private service:OrganismeService,private router:Router) { }

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
    await this.httpClient.get(`${this.AlfresscoURL}/bmh-organisme/index/${ide}`)
          .subscribe(
                  (data:any) => {
                    // 
                      this.dataSource2 = new MatTableDataSource(data);
                  },
                  (error) => console.log(error)
              );
          }
      onClickPj(e, id) {
          var r = e.substring(0, e.length - 4);
          window.open(this.AlfresscoURL + "/bmh-organisme/" + r, "_blank");
      }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-organisme"]);
	}

}
