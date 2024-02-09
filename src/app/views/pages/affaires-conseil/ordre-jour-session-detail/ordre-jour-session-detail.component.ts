import { Component, OnInit, ViewChild } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

@Component({
	selector: "kt-ordre-jour-session-detail",
	templateUrl: "./ordre-jour-session-detail.component.html",
	styleUrls: ["./ordre-jour-session-detail.component.scss"],
})
export class OrdreJourSessionDetailComponent implements OnInit {
	// =======================================================================
	//
	// =======================================================================
	displayedColumns = [
		"id",
		"ordre",
		"origine",
		//"budget",
		"statut",
		"actions",
	];
	// =======================================================================
	//
	// =======================================================================
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// =======================================================================
	//
	// =======================================================================
	isLoading = true;
	idOrdreJour;
	statutsPoints;
	points;
	statutPoint;
	ordres = [];
	formData = {
		id: 0,
		nomOrdreJour: "",
		statut: "مقترح",
		session: { id: 0, nomSession: "" },
	};
	statutOrdreJour = [
		"مقترح",
		"مصادق عليه من طرف المكتب",
		"مرسل إلى الولاية",
		"مصادق عليه من طرف الولاية",
		"محصور",
	];
	// =======================================================================
	//
	// =======================================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// =======================================================================
	//
	// =======================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idOrdreJour = params["id"];
		});
		this.service.getAllStatutsPoint().subscribe((data) => {
			this.statutsPoints = data;
		});
		this.service
			.getOrdreJourSessionById(this.idOrdreJour)
			.subscribe((data) => {
				this.formData = data;
				this.getAllPoints();
			});
	}
	// =======================================================================
	//
	// =======================================================================
	onChange(ordre1, row, index) {
		for (var i = 0; i < this.dataSource.data.length; i++) {
			if (this.dataSource.data[i].ordre == ordre1 && i != index) {
				this.dataSource.data[i].ordre = this.ordres[index];
				this.ordres[index] = ordre1;
				this.ordres[i] = this.dataSource.data[i].ordre;
			}
		}
	}
	// =======================================================================
	//
	// =======================================================================
	onChangeofOptions(statutPoint) {
		this.service
			.PointByStatutEtSession(statutPoint, this.formData.session.id)
			.subscribe((res) => {
				console.log(res);
				this.dataSource = new MatTableDataSource(res);
			});
	}
	// =======================================================================
	//
	// =======================================================================
	async getAllPoints() {
		await this.service
			.getAllPointBySession(this.formData.session.id)
			.subscribe((res) => {
				console.log(res);
				this.points = res;
				this.dataSource = new MatTableDataSource(res);
				this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
				this.paginator._intl.nextPageLabel = "الصفحة التالية";
				this.paginator._intl.previousPageLabel = "الصفحة السابقة";
				this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
				this.paginator._intl.firstPageLabel = "الصفحة الأولى";
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				for (var i = 0; i < res.length; i++) {
					this.ordres.push(res[i].ordre);
				}
			});
	}
	// =======================================================================
	//
	// =======================================================================
	nouveauPoint() {
		this.router.navigate(["/affaires-conseil/point-form"]);
	}
	// =======================================================================
	//
	// =======================================================================
	showPoint(idPoint) {
		this.router.navigate(["/affaires-conseil/point-detail"], {
			queryParams: { id: idPoint },
		});
	}
	// =======================================================================
	//
	// =======================================================================
	valider() {
		this.service.sendOrdreJourSession(this.formData).subscribe((res) => {
			this.service.sendPoints(this.dataSource.data).subscribe((res) => {
				this.router.navigate([
					"/affaires-conseil/ordre-jour-session-list",
				]);
			});
		});
	}
}
