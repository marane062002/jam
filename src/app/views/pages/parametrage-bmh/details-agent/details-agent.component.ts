import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../services/agent.service';

@Component({
  selector: 'kt-details-agent',
  templateUrl: './details-agent.component.html',
  styleUrls: ['./details-agent.component.scss']
})
export class DetailsAgentComponent implements OnInit {

  constructor(private route:ActivatedRoute,private service:AgentService,private router:Router) { }

  id:any;
  info:any;
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
		this.router.navigate(["/bmh/list-agent"]);
	}

}
