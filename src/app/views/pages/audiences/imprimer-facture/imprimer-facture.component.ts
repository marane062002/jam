import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'kt-imprimer-facture',
  templateUrl: './imprimer-facture.component.html',
  styleUrls: ['./imprimer-facture.component.scss']
})
export class ImprimerFactureComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  back() {
		this.router.navigate(["pages/audiences/edit-facture"]);
	}

}
