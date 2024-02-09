import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenService } from '../services/examen.service';

@Component({
  selector: 'kt-details-examen',
  templateUrl: './details-examen.component.html',
  styleUrls: ['./details-examen.component.scss']
})
export class DetailsExamenComponent implements OnInit {

  info:any;
  id:any;
  constructor(private router:Router,private route:ActivatedRoute,private service:ExamenService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       
      this.id = params['id']; // Récupération de l'ID à partir des paramètres de l'URL
       
      this.service.getById(this.id).subscribe(
        (data: any) => {
          this.info = data; // Stocker les informations récupérées dans la variable 'info'
              this.info.value 
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des données :', error);
        }
      );
    });
  }
  RetourEmbalages(){
    this.router.navigate(["/bmh1/list-examen"])
  }

}
