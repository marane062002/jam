import { ImmobilisationService } from './../../../utils/immobilisation.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'kt-show-reforme',
  templateUrl: './show-reforme.component.html',
  styleUrls: ['./show-reforme.component.scss']
})
export class ShowReformeComponent implements OnInit {
// =====================================
	// Declarations
	// =====================================
	details : any;
	pjs;
	constructor(
		private immoService: ImmobilisationService,
		private router: Router,
		private location: Location
	) {}
	// =====================================
	// Afficher les details immobilisation
	// =====================================
	ngOnInit() {
		let immoId = window.localStorage.getItem("immobilisation-showId");
		if (!immoId) {
			alert("Invalid action.");
			this.router.navigate(["immobilisation/list-immobilisation"]);
			return;
		}
		this.immoService.getObjectById("/immobilisation/show/", +immoId)
			.subscribe(
				data => {
					console.log(data);
					this.details = data;
				},
				error => console.log(error)
			);

			this.immoService.getByIdImmobilisationFiles(immoId).subscribe(m => {
				this.pjs=m;
				console.log("file log :" + this.pjs.id)
			});
	}

	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
// ============================================
	// Methode de modification des immobilisations
	// ============================================
	editImmobilisation(): void {
		let immoId = window.localStorage.getItem("immobilisation-showId");
		if (!immoId) {
			alert("Invalid action.");
			this.router.navigate(["immobilisation"]);
			return;
		}
		window.localStorage.removeItem("editImmobilisationId");
		window.localStorage.setItem("editImmobilisationId",immoId);
		this.router.navigate(["immobilisation/edit-immobilisation"]);
	}
}
