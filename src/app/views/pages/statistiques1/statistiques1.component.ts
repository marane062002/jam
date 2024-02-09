import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'kt-statistiques1',
  templateUrl: './statistiques1.component.html',
  styleUrls: ['./statistiques1.component.scss']
})
export class StatistiquesComponent implements OnInit {

  constructor(private route:Router) { }

  go(){
		this.route.navigate(['/dashboard']); // navigate to other page
	}
  
  ngOnInit() {
  }

 

}
