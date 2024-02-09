import { ImmobilisationService } from './../../../utils/immobilisation.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'kt-show-emplacement',
  templateUrl: './show-emplacement.component.html',
  styleUrls: ['./show-emplacement.component.scss']
})
export class ShowEmplacementComponent implements OnInit {
// =====================================
	// Declarations
	// =====================================
	details : any;
	constructor(
		private immoService: ImmobilisationService,
		private router: Router,
		private location: Location
	) {}
	// =====================================
	// Afficher les details immobilisation
	// =====================================
	ngOnInit() {
		let immoId = window.localStorage.getItem("emplacement-showId");
		if (!immoId) {
			alert("Invalid action.");
			this.router.navigate(["emplacement/list-emplacement"]);
			return;
		}
		this.immoService.getObjectById("/emplacement/show/", +immoId)
			.subscribe(
				data => {
					console.log(data);
					this.details = data;
				},
				error => console.log(error)
			);

	}

	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
}
