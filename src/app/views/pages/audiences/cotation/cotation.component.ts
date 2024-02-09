import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'kt-cotation',
  templateUrl: './cotation.component.html',
  styleUrls: ['./cotation.component.scss']
})
export class CotationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back() {
		this.router.navigate(["pages/audiences/list-cotation"]);
	}

}
