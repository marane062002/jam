import { Component, OnInit, ViewChild } from "@angular/core";
import { ConsultationService } from "../../shared/consultation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AoService } from "../../shared/ao.service";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";

@Component({
	selector: "kt-prestataires-consultation",
	templateUrl: "./prestataires-consultation.component.html",
	styleUrls: ["./prestataires-consultation.component.scss"],
})
export class PrestatairesConsultationComponent implements OnInit {
	constructor(
		private service: ConsultationService,
		private service1: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	displayedColumns = ["nom", "rc", "adresse", "mail", "prenom", "actions"];
	dataArray = [];
	prestataires;
	showArticleRef = false;
	idConsultation;
	valueToSend;
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idConsultation = params["id"];
		});
		this.service1.getAllPrestatairesAll().subscribe((data) => {
			this.prestataires = data;
			this.dataArray = data;
		});
		this.populate();
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	onChangeofOptions1(a) {
		console.log(a.value);
		this.valueToSend = a.value;

		//this.formData.article.id=a.value;
	}

	send() {
		var offre = {
			prestataire: { id: this.valueToSend },
			consultation: { id: this.idConsultation },
		};
		this.service.sendOffreDeposee(offre).subscribe((data) => {
			console.log("Prestataire: " + JSON.stringify(data, null, 2));
			this.populate();
		});
	}

	nouvelleLigne() {
		this.showArticleRef = true;
		//document.getElementById("frmLigne").style.display="inline"
	}

	onKey(value) {
		this.dataArray = [];
		this.selectSearch(value);
	}
	selectSearch(value) {
		let filter = value;
		for (let i = 0; i < this.prestataires.length; i++) {
			let option = this.prestataires[i].rc;
			if (
				option.toLowerCase().indexOf(filter) >= 0 ||
				option.toUpperCase().indexOf(filter) >= 0
			) {
				this.dataArray.push(this.prestataires[i]);
			}
		}
	}

	populate() {
		this.service
			.getAllOffreDeposee(this.idConsultation)
			.subscribe((data) => {
				console.log(data);
				this.dataSource = new MatTableDataSource(data);
				this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
				this.paginator._intl.nextPageLabel = "الصفحة التالية";
				this.paginator._intl.previousPageLabel = "الصفحة السابقة";
				this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
				this.paginator._intl.firstPageLabel = "الصفحة الأولى";
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
	}
}
