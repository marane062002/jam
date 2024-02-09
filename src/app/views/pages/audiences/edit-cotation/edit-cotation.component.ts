import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'kt-edit-cotation',
  templateUrl: './edit-cotation.component.html',
  styleUrls: ['./edit-cotation.component.scss']
})
export class EditCotationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back() {
		this.router.navigate(["pages/audiences/list-cotation"]);
	}


}
