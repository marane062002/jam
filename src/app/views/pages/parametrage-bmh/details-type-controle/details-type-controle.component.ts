import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeControleService } from '../services/type-controle.service';

@Component({
  selector: 'kt-details-type-controle',
  templateUrl: './details-type-controle.component.html',
  styleUrls: ['./details-type-controle.component.scss']
})
export class DetailsTypeControleComponent implements OnInit {
  info: any;
  id: any;
  constructor(private route: ActivatedRoute,private router:Router,private service:TypeControleService) { }

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
		this.router.navigate(["/bmh/list-type-controle"]);
	}
  
}
