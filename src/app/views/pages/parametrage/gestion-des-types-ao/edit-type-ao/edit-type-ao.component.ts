import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionDesTypesAoService } from '../../Services/gestion-des-types-ao.service';

@Component({
  selector: 'kt-edit-type-ao',
  templateUrl: './edit-type-ao.component.html',
  styleUrls: ['./edit-type-ao.component.scss']
})
export class EditTypeAoComponent implements OnInit {
id
typeAo={
  libelle:''
}  
constructor(private activatedRoute: ActivatedRoute,private service:GestionDesTypesAoService,private router: Router,	) { }

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

		
			this.router.navigate(["parametrage/list-type-ao"]);
		
		});
	}
}
