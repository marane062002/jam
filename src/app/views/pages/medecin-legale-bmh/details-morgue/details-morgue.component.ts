import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MorgueService } from '../services/morgue.service';
import { environment } from "../../../../../environments/environment";
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'kt-details-morgue',
  templateUrl: './details-morgue.component.html',
  styleUrls: ['./details-morgue.component.scss']
})
export class DetailsMorgueComponent implements OnInit {
  displayedColumns2=['nomDoc','titre','dow']
  dataSource2 = new MatTableDataSource<any>();
  info:any;
  id:any;
  AlfresscoURL = environment.API_ALFRESCO_URL
  constructor(private httpClient: HttpClient,private route:ActivatedRoute,private service:MorgueService,private router:Router) { }

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
    await this.httpClient.get(`${this.AlfresscoURL}/bmh-morgue/index/${ide}`)
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
    window.open(this.AlfresscoURL + "/bmh-morgue/" + r, "_blank");
}
  RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-morgue"]);
	}


}
