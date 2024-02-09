import { Component, OnInit } from '@angular/core';
import { ProduitUtiliseService } from '../services/produit-utilise.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kt-details-produit-utilise',
  templateUrl: './details-produit-utilise.component.html',
  styleUrls: ['./details-produit-utilise.component.scss']
})
export class DetailsProduitUtiliseComponent implements OnInit {

  info: any;
  id: any;
  constructor(private service:ProduitUtiliseService,private route:ActivatedRoute,private router:Router) { }

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
		this.router.navigate(["/bmh/list-produit-utilise"]);
	}

}
