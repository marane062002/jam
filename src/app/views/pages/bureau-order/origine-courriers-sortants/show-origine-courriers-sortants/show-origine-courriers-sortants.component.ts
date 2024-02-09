import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { BoServiceService } from "../../../utils/bo-service.service";
import { SpinnerService } from '../../../utils/spinner.service';
import { finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: "kt-show-origine-courriers-sortants",
	templateUrl: "./show-origine-courriers-sortants.component.html",
	styleUrls: ["./show-origine-courriers-sortants.component.scss"],
})
export class ShowOrigineCourriersSortantsComponent implements OnInit {
	// ============================================================
	// 
	// ============================================================
	detailOrigine: any;
	// ============================================================
	// 
	// ============================================================
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private service: BoServiceService,
		private spinnerService: SpinnerService,
		private translate: TranslateService,
	) {}
	// ============================================================
	// 
	// ============================================================
	ngOnInit() {
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		let origineId = window.localStorage.getItem(
			"personneMoralId"
		);
		if (!origineId) {
			alert("Invalid action.");
			this.router.navigate([
				"origine-courriers-sortants/list-origine-courriers-sortants",
			]);
			return;
		}
		this.service
			.getObjectById("/origineCourierEntrants/show/", +origineId)
			.pipe(finalize(() => {
				this.spinnerService.stop(spinnerRef);// stop spinner
			}))
			.subscribe(
				(data) => {
					console.log(data);
					this.detailOrigine = data;
				},
				(error) => console.log(error)
			);
	}
	// ============================================================
	// 
	// ============================================================
	back() {
		this.location.back();
	}
	// ============================================
	//
	// ============================================
	editOriginCourrierSortant(): void {
		let origineId = window.localStorage.getItem("personneMoralId");
		if (!origineId) {
			alert("Invalid action.");
			this.router.navigate(["origine-courriers-sortants"]);
			return;
		}
		window.localStorage.removeItem("editCourrierSortantId");
		window.localStorage.setItem("editCourrierSortantId",origineId);
		this.router.navigate(["origine-courriers-sortants/edit-origine-courriers-sortants"]);
	}
}
