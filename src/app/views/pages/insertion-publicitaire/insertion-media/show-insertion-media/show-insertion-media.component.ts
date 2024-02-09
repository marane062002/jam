import { Component, OnInit } from '@angular/core';
import { InsertPubService } from '../../../utils/insert-pub.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-show-insertion-media',
  templateUrl: './show-insertion-media.component.html',
  styleUrls: ['./show-insertion-media.component.scss']
})
export class ShowInsertionMediaComponent implements OnInit {
	id: number;
	details: any;
	isLoading = true;
	pjs;
	constructor(
		private service: InsertPubService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		let medId = window.localStorage.getItem("medId");
		if (!medId) {
			alert("Invalid action.");
			this.router.navigate(["list-insertion-media"]);
			return;
		}
		this.service
			.getObjectById("/MediaPublicitaires/show/", +medId)
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
		this.router.navigate(["/insertion-media/list-insertion-media"]);
	}
	// ============================================
	// Methode de modification Medias
	// ============================================
	editMedias(){
		let medId = window.localStorage.getItem("medId");
		if (!medId) {
			alert("Invalid action.");
			this.router.navigate(["list-insertion-media"]);
			return;
		}
		window.localStorage.removeItem("medId");
		window.localStorage.setItem("medId",medId);
		this.router.navigate(["/insertion-media/edit-insertion-media"]);
	}
	// ============================================
	// Print methode using PDFMAKE library
	// ============================================
	print(){


	}
}
