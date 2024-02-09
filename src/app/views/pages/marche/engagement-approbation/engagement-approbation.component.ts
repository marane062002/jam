import { Component, OnInit, ViewChild } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
	selector: "kt-engagement-approbation",
	templateUrl: "./engagement-approbation.component.html",
	styleUrls: ["./engagement-approbation.component.scss"],
})
export class EngagementApprobationComponent implements OnInit {
	idmarche;
	//marche = { id: "", dateEngagement: "", dateApprobation: "", dateNotifApprobation: "", marche: { id: 1 }, statutMarche: { id:1} };
	marche;
	engagement = 0;
	approbation = 0;
	sizeData = 0;
	showList = 0;
	dataSource: MatTableDataSource<any>;
	isLoading: boolean = true;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	displayedColumns = ["numMarche", "dateEngagement", "dateApprobation", "dateNotifApprobation", "statutMarche", "actions"];
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idmarche = params["id"];
		});
		this.service.getMarcheById(this.idmarche).subscribe((data) => {
			this.marche = data;
			//console.log("ENGAGEMENT & APPROBATION  : " + JSON.stringify(data, null, 2));
		});

		this.getData();
	}
	// *******************************************************
	getData() {
		const _this = this;
		this.isLoading = true;
		this.service.getMarcheById(this.idmarche).subscribe((data) => {
			if (data != null) {
				console.log("MISE EN DEMEURE & RESILIATION : " + JSON.stringify(data, null, 2));
				this.showList = 1;
				var x = [data];
				if (data.dateApprobation != null || data.dateEngagement != null || data.dateNotifApprobation != null) {
					_this.sizeData = x.length;
					this.dataSource = new MatTableDataSource(x);
				} else {
					_this.sizeData = 0;
					this.dataSource = new MatTableDataSource(null);
				}
			}
			this.isLoading = false;
		}, (err) => {
			_this.sizeData = 0;
			this.isLoading = false;
			console.log(err);
		});
	}
	// *************************************************
	showEngagementForm() {
		this.engagement = 1;
		this.approbation = 0;
	}
	// *************************************************
	showApprobationForm() {
		this.engagement = 0;
		this.approbation = 1;
	}
	// *************************************************
	engagerMarcher() {
		this.engagement = 0;
		this.approbation = 0;
		//alert("تمت العملية بنجاح");
		this.marche.statutMarche.id = 3;
		this.marche.dateEngagement = this.marche.dateEngagement;
		this.service.engagerMarche(this.marche).subscribe((data) => {
			this.getData();
			this.router.navigate(
				["marches/marche-detail/engagement-approbation"],
				{
					queryParams: { id: this.idmarche },
				}
			);
		});
	}
	approuverMarcher() {
		this.engagement = 0;
		this.approbation = 0;
		//alert("تمت العملية بنجاح");
		this.marche.statutMarche.id = 2;
		this.service.approuverMarche(this.marche).subscribe((data) => {
			this.getData();
			this.router.navigate(
				["marches/marche-detail/engagement-approbation"],
				{
					queryParams: { id: this.idmarche },
				}
			);
		});
	}
}
