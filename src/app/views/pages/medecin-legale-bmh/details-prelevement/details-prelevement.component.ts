import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrelevementService } from '../services/prelevement.service';

@Component({
  selector: 'kt-details-prelevement',
  templateUrl: './details-prelevement.component.html',
  styleUrls: ['./details-prelevement.component.scss']
})
export class DetailsPrelevementComponent implements OnInit {
  info:any;
  id:any;
  constructor(private route:ActivatedRoute,private service:PrelevementService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       
      this.id = params['id']; // Récupération de l'ID à partir des paramètres de l'URL
       
      this.service.getById(this.id).subscribe(
        (data: any) => {
          this.info = data;
              this.info.value 
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );
    });
  }

  RetourEmbalages(): void {
		this.router.navigate(["/bmh1/list-prelevement"]);
	}

}
