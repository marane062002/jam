import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipeService } from '../services/equipe.service';

@Component({
  selector: 'kt-details-equipe',
  templateUrl: './details-equipe.component.html',
  styleUrls: ['./details-equipe.component.scss']
})
export class DetailsEquipeComponent implements OnInit {

  info: any;
  id: any;
  constructor(private route: ActivatedRoute,private router:Router,private service:EquipeService) { }

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
		this.router.navigate(["/bmh/list-equipe"]);
	}


}
