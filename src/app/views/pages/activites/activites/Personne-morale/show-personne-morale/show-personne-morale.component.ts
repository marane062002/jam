import { ActivitesService } from './../../../../utils/activites.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatAccordion } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable, Observer, BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";


export interface Association360Tab {
	label: string;
	content: string;
}


@Component({
  selector: 'kt-show-personne-morale',
  templateUrl: './show-personne-morale.component.html',
  styleUrls: ['./show-personne-morale.component.scss']
})
export class ShowPersonneMoraleComponent implements OnInit {
	@ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;


	id: number;
	details: any;
	/*displayedColumns: string[] = [
		"dateDebut",
		"dateFin",
		"dureeMandat",
		"president",
		//"vicePresident",
		"nbrMmbr",
		"nbrH",
		"nbrF",
		"actions",
	];
	asyncTabs: Observable<Association360Tab[]>;*/
	selected = new FormControl(0);
	
	isLoadingResults = true;
	files: Observable<any>;

	public obs$: Observable<any[]>

	myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	constructor(
		private service: ActivitesService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		this.id = this.route.snapshot.params["id"];
		if (!this.id) {
			alert("Invalid action.");
			this.router.navigate([
				"activites/list-personne-morale",
			]);
			return;
		}

			
		

				
	}
	// =====================================
	// ngOnInit
	// =====================================
	ngOnInit() {
		this.service.getObjectById("/pmActivite/show/", this.id).subscribe(
			(data) => {
				this.details = data;
			},
			(error) => console.log(error)
		);
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.router.navigate([
			"activites/list-personne-morale",
		]);
	}

}
