import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionQualificationService } from '../../Services/gestion-qualification.service';

@Component({
  selector: 'kt-edit-qualification',
  templateUrl: './edit-qualification.component.html',
  styleUrls: ['./edit-qualification.component.scss']
})
export class EditQualificationComponent implements OnInit {

  id
typeAo={
  libelle:''
}  
constructor(private activatedRoute: ActivatedRoute,private service:GestionQualificationService,private router: Router,	) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
			// this.idConsultation = params["idC"];
		});
    this.service.findById(this.id).subscribe((res)=>{
      
      this.typeAo=res
    })
  }
	onSubmit() {
    this.typeAo
	

		this.service.update(this.typeAo).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["parametrage/list-qualification"]);
		
		});
	}
}

