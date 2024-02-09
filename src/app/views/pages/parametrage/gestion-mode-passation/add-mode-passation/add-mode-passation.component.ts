import { Component, OnInit } from '@angular/core';
import { GestionModePassationService } from '../../Services/gestion-mode-passation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-add-mode-passation',
  templateUrl: './add-mode-passation.component.html',
  styleUrls: ['./add-mode-passation.component.scss']
})
export class AddModePassationComponent implements OnInit {

  modePassation={ 
    libelle:''
  }
  constructor(private service:GestionModePassationService,private router: Router,) { }

  ngOnInit() {
  }
	onSubmit() {

	

		this.service.create(this.modePassation).subscribe((data) => {
			console.log(data);

		
			this.router.navigate(["/parametrage/list-mode-passation"]);
		
		});
	}
}