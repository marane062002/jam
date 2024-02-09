import { Component, OnInit } from "@angular/core";
import { AssociationService } from '../../utils/association.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from "@angular/common";

@Component({
	selector: "kt-show-membre",
	templateUrl: "./show-membre.component.html",
	styleUrls: ["./show-membre.component.scss"],
})
export class ShowMembreComponent implements OnInit {
	// =====================================
	// Declarations
	// =====================================
	id: number;
	details;
	isLoadingResults = true;

	constructor(
		private service: AssociationService,
		private router: Router,
		private route: ActivatedRoute,
		private location: Location,
		private notification: NotificationService,
		private translate: TranslateService
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.service
			.getObjectById("/membreBureau/show/", this.id)
			.subscribe(
				(data) => {
					this.details = data;
				},

				(error) => {
					console.log(error);
				}
			);
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
		//this.router.navigate(["/associations/list-association"]);
	}
	// ============================================
	// Methode de modification des membre
	// ============================================
	editMembre(): void {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["associations/edit-membre/"+ this.id]);
	}
}
