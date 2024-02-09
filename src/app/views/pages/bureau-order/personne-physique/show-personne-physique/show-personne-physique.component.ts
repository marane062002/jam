import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { BoServiceService } from '../../../utils/bo-service.service';

@Component({
  selector: 'kt-show-personne-physique',
  templateUrl: './show-personne-physique.component.html',
  styleUrls: ['./show-personne-physique.component.scss']
})
export class ShowPersonnePhysiqueComponent implements OnInit {

	detailOrigine: any;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private service: BoServiceService
	) {}

	ngOnInit() {
		let origineId = window.localStorage.getItem("personneId");
		if (!origineId) {
			alert("Invalid action.");
			this.router.navigate([
				"personne-physique/list-personne-physique",
			]);
			return;
		}
		this.service
			.getObjectById("/origineCourierEntrants/show/", +origineId)
			.subscribe(
				(data) => {
					console.log(data);
					this.detailOrigine = data;
				},
				(error) => console.log(error)
			);
	}
	back() {
		this.location.back();
	}
	// ============================================
	//
	// ============================================
	editOriginCourrierSortant(): void {
		let origineId = window.localStorage.getItem("personneId");
		if (!origineId) {
			alert("Invalid action.");
			this.router.navigate(["personne-physique/list-personne-physique"]);
			return;
		}
		window.localStorage.removeItem("personneId");
		window.localStorage.setItem("personneId",origineId);
		this.router.navigate(["personne-physique/edit-personne-physique"]);
	}

}
