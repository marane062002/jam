import { Component, OnInit } from '@angular/core';
import { ControleurService } from '../services/controleur.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kt-details-controleur',
  templateUrl: './details-controleur.component.html',
  styleUrls: ['./details-controleur.component.scss']
})
export class DetailsControleurComponent implements OnInit {

  info: any;
  id: any;
  constructor(private route: ActivatedRoute,private router:Router,private service:ControleurService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupération de l'ID à partir des paramètres de l'URL
      this.service.details(this.id).subscribe(
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
		this.router.navigate(["/bmh/list-controleur"]);
	}


}
