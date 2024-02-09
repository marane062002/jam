import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterfaceConstateur } from '../list-constateur/list-constateur.component';
import { ConstateurService } from '../services/constateur.service';

@Component({
  selector: 'kt-details-constateur',
  templateUrl: './details-constateur.component.html',
  styleUrls: ['./details-constateur.component.scss']
})
export class DetailsConstateurComponent implements OnInit {

  info: any;
  id: any;
  constructor(private route: ActivatedRoute,private router:Router,private service:ConstateurService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupération de l'ID à partir des paramètres de l'URL
      this.service.detailsConstateur(this.id).subscribe(
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
		this.router.navigate(["/bmh/list-constateur"]);
	}

}
