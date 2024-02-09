import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionModePassationService } from '../../Services/gestion-mode-passation.service';

@Component({
  selector: 'kt-edit-mode-passation',
  templateUrl: './edit-mode-passation.component.html',
  styleUrls: ['./edit-mode-passation.component.scss']
})
export class EditModePassationComponent implements OnInit {
 
  id
modePassation={
  libelle:''
}  
constructor(private activatedRoute: ActivatedRoute,private service:GestionModePassationService,private router: Router,	) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
			// this.idConsultation = params["idC"];
		});
    this.service.findById(this.id).subscribe((res)=>{
      
      this.modePassation=res
    })
  }
	onSubmit() {
    this.modePassation
	

		this.service.update(this.modePassation).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["parametrage/list-mode-passation"]);
		
		});
	}
}
