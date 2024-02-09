import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface CourriersTabs {
	label: string;
	content: string;
}

@Component({
	selector: "kt-show-courriers",
	templateUrl: "./show-courriers.component.html",
	styleUrls: ["./show-courriers.component.scss"],
})
export class ShowCourriersComponent implements OnInit {
	id:number;
	asyncTabs: Observable<CourriersTabs[]>;
	selected = new FormControl(0);
	pid:number;
	constructor(private router: Router,private route: ActivatedRoute) {

		//get personnel id
		this.route.queryParams.subscribe(params => {this.pid= params['id'];});
		//this.pid = this.id;
		console.log("id personne : "+ this.pid)
		// tabs courriers
		this.asyncTabs = new Observable(
			(observer: Observer<CourriersTabs[]>) => {
				setTimeout(() => {
					observer.next([
						{
							label: "PAGES.BUREAU_ORDRE.PERSONNEL_COURRIER.MES_COURRIERS_ENT",
							content: "1",
						},
					 	{
							label: "PAGES.BUREAU_ORDRE.PERSONNEL_COURRIER.MES_COURRIERS_SOR",
							content: "2"
						},
						{
						   label: "PAGES.BUREAU_ORDRE.PERSONNEL_COURRIER.MES_COURRIERS_REF",
						   content: "3"
					   },
					   {
						label: "PAGES.BUREAU_ORDRE.PERSONNEL_COURRIER.MES_COURRIERS_CONV",
						content: "4"
					},
					 ]);
				}, 300);
			}
		);
	}

	ngOnInit() {

	}
}
