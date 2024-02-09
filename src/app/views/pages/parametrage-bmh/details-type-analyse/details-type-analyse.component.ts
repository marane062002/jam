import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListTypeAnalyseService } from '../services/list-type-analyse.service';

@Component({
  selector: 'kt-details-type-analyse',
  templateUrl: './details-type-analyse.component.html',
  styleUrls: ['./details-type-analyse.component.scss']
})
export class DetailsTypeAnalyseComponent implements OnInit {

  info: any;
  id: any;
  constructor(private route: ActivatedRoute,private router:Router,private service:ListTypeAnalyseService) { }

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
		this.router.navigate(["/bmh/list-type-analyse"]);
	}
}
