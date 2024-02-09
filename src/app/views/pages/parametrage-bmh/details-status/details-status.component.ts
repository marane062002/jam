import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'kt-details-status',
  templateUrl: './details-status.component.html',
  styleUrls: ['./details-status.component.scss']
})
export class DetailsStatusComponent implements OnInit {

  info:any;
  id:any;
  constructor(private router:Router,private route:ActivatedRoute,private service:StatusService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupération de l'ID à partir des paramètres de l'URL
      this.service.getById(this.id).subscribe(
        (data: any) => {
          this.info = data; // Stocker les informations récupérées dans la variable 'info'
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );
    });
  }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-status"]);
	}

}
