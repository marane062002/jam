import { Component, OnInit } from '@angular/core';
import { QuantiteService } from '../services/quantite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kt-details-quantite',
  templateUrl: './details-quantite.component.html',
  styleUrls: ['./details-quantite.component.scss']
})
export class DetailsQuantiteComponent implements OnInit {

  info: any;
  id: any;
  constructor(private service:QuantiteService,private route:ActivatedRoute,private router:Router) { }

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
		this.router.navigate(["/bmh/list-quantite"]);
	}

}
