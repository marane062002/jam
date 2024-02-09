import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeExamenService } from '../services/type-examen.service';

@Component({
  selector: 'kt-details-type-examen',
  templateUrl: './details-type-examen.component.html',
  styleUrls: ['./details-type-examen.component.scss']
})
export class DetailsTypeExamenComponent implements OnInit {

  info:any;
  id:any;
  constructor(private router:Router,private route:ActivatedRoute,private service:TypeExamenService) { }

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
		this.router.navigate(["/bmh/list-type-examen"]);
	}

}
