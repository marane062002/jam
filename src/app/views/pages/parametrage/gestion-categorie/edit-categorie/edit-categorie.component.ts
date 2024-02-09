import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionCategorieService } from '../../Services/gestion-categorie.service';

@Component({
  selector: 'kt-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  id
categorie={
  libelle:''
}  
constructor(private activatedRoute: ActivatedRoute,private service:GestionCategorieService,private router: Router,	) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
			// this.idConsultation = params["idC"];
		});
    this.service.findById(this.id).subscribe((res)=>{
      
      this.categorie=res
    })
  }
	onSubmit() {
    this.categorie
	

		this.service.update(this.categorie).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["parametrage/list-categorie"]);
		
		});
	}
}
