import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionTypeMarcheService } from '../../Services/gestion-type-marche.service';

@Component({
  selector: 'kt-edit-type-marche',
  templateUrl: './edit-type-marche.component.html',
  styleUrls: ['./edit-type-marche.component.scss']
})
export class EditTypeMarcheComponent implements OnInit {

 
  id
typeMarche={
  libelle:''
}  
constructor(private activatedRoute: ActivatedRoute,private service:GestionTypeMarcheService,private router: Router,	) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
			// this.idConsultation = params["idC"];
		});
    this.service.findById(this.id).subscribe((res)=>{
      
      this.typeMarche=res
    })
  }
	onSubmit() {
    this.typeMarche
	

		this.service.update(this.typeMarche).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["parametrage/list-type-marche"]);
		
		});
	}
}
