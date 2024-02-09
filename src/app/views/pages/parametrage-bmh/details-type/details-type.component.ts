import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeServiceService } from '../services/type-service.service';

@Component({
  selector: 'kt-details-type',
  templateUrl: './details-type.component.html',
  styleUrls: ['./details-type.component.scss']
})
export class DetailsTypeComponent implements OnInit {
  info: any;
  id: any;

  constructor(private route: ActivatedRoute,private router:Router,private service:TypeServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupération de l'ID à partir des paramètres de l'URL
      this.service.getTypeDetailsById(this.id).subscribe(
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
		this.router.navigate(["/bmh/list-types"]);
	}
  
}
